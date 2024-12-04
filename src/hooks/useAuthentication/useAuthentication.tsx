import { useCookies } from "react-cookie";
import { useContext } from "react";
import { AuthContext } from "main.tsx";
import useApi from "hooks/useApi/useApi.tsx";
import { enqueueSnackbar } from "notistack";
import { components } from "api/schema";

const authTokenCookieName = "authToken";

const useAuthentication = () => {
  const authContext = useContext(AuthContext);
  const [cookies, setCookie, removeCookies] = useCookies([authTokenCookieName]);
  const { getAuth } = useApi();

  const getToken = (): components["schemas"]["AuthenticationResponse"] => {
    return authTokenCookieName in cookies
      ? cookies[authTokenCookieName]
      : undefined;
  };

  const getAuthContext = () => {
    return authContext.data;
  };

  const isLoggedIn = () => {
    return authContext.data.isLoggedIn;
  };

  const verifyAuthentication = async () => {
    const token = getToken();
    if (!token) {
      return undefined;
    }

    if (token) {
      return await getAuth(token.access_token, token.user_id);
    }
  };

  const authenticate = async (
    authData: components["schemas"]["AuthenticationResponse"],
  ) => {
    const { access_token, refresh_token, user_id } = authData;
    const response = await getAuth(access_token, user_id);
    const isValid = response !== undefined;

    if (isValid) {
      setCookie(authTokenCookieName, authData);
      authContext.setData((prevState) => {
        return {
          ...prevState,
          authToken: access_token,
          refreshToken: refresh_token,
          userid: user_id,
          userName: response.usertag,
          email: response.email,
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
    authContext.setData({ isLoggedIn: false });
  };

  return {
    verifyAuthentication,
    getToken,
    authenticate,
    logout,
    isLoggedIn,
    getAuthContext,
  };
};

export { authTokenCookieName };
export default useAuthentication;
