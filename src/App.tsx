import RouterComponent from "components/techincal/RouterComponent/RouterComponent.tsx";
import useAuthentication, {
  authTokenCookieName,
} from "hooks/useAuthentication/useAuthentication.tsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "main.tsx";
import { useCookies } from "react-cookie";

const App = () => {
  const { isAuthenticated } = useAuthentication();
  const authContext = useContext(AuthContext);
  const [cookies, setCookie, removeCookies] = useCookies([authTokenCookieName]);

  useEffect(() => {
    const check = async () => await isAuthenticated();
    check().then((authenticated) => {
      authContext.setData((prevState) => {
        return { ...prevState, isLoggedIn: authenticated };
      });
    });
  }, [...Object.values(authContext.data), cookies]);

  return <RouterComponent />;
};

export default App;
