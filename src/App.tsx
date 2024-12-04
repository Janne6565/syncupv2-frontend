import RouterComponent from "components/technical/RouterComponent/RouterComponent.tsx";
import useAuthentication, {
  authTokenCookieName,
} from "hooks/useAuthentication/useAuthentication.tsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "main.tsx";
import { useCookies } from "react-cookie";

const App = () => {
  const { verifyAuthentication } = useAuthentication();
  const authContext = useContext(AuthContext);
  const [cookies] = useCookies([authTokenCookieName]);

  useEffect(() => {
    const check = async () => await verifyAuthentication();
    check().then((authResponse) => {
      if (authResponse != undefined) {
        authContext.setData({
          authToken: cookies[authTokenCookieName],
          isLoggedIn: true,
          email: authResponse.email,
          userName: authResponse.usertag,
          userid: authResponse.id,
        });
      } else {
        authContext.setData({
          isLoggedIn: false,
        });
      }
    });
  }, [cookies]);

  return <RouterComponent />;
};

export default App;
