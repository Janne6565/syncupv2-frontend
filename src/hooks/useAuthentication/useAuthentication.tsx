import { useCookies } from "react-cookie";
import { useContext } from "react";
import { AuthContext, AuthType } from "main.tsx";
import useApi from "hooks/useApi/useApi.tsx";
import { enqueueSnackbar } from "notistack";
import { components } from "api/schema";

const authTokenCookieName = "authToken";

const useAuthentication = () => {
  const authContext = useContext(AuthContext);
  const [cookies, setCookie, removeCookies] = useCookies([authTokenCookieName]);
  const { checkAuth } = useApi();

  const getToken = (): components["schemas"]["AuthenticationResponse"] => {
    return cookies[authTokenCookieName];
  };

  const isLoggedIn = () => {
    return authContext.data.isLoggedIn;
  };

  const verifyAuthentication = async () => {
    const token = getToken();
    if (!token) {
      return false;
    }

    if (token) {
      return await checkAuth(token.access_token, token.user_id);
    }
  };

  const authenticate = async (
    authData: components["schemas"]["AuthenticationResponse"],
  ) => {
    const { access_token, refresh_token, user_id } = authData;
    const isValid = await checkAuth(access_token, user_id);

    if (isValid) {
      setCookie(authTokenCookieName, authData);
      authContext.setData((prevState) => {
        return {
          ...prevState,
          authToken: access_token,
          refreshToken: refresh_token,
          userid: user_id,
          isLoggedIn: true,
        };
      });
      return true;
    } else {
      authContext.setData((prevState) => {
        return { ...prevState, isLoggedIn: false };
      });
      enqueueSnackbar("Authentication failed", { variant: "error" });
      return false;
    }
  };

  const logout = () => {
    removeCookies(authTokenCookieName);
  };

  return {
    isAuthenticated: verifyAuthentication,
    getToken,
    authenticate,
    logout,
    isLoggedIn,
  };
};

export { authTokenCookieName };
export default useAuthentication;
