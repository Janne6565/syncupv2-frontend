import {
  createContext,
  Dispatch,
  SetStateAction,
  StrictMode,
  useEffect,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RouterComponent from "./components/techincal/RouterComponent/RouterComponent.tsx";
import config from "./config.json";
import { ThemeProvider } from "@mui/material";
import Theme from "theme/Theme.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import useAuthentication from "hooks/useAuthentication/useAuthentication.tsx";
import App from "App.tsx";

interface AuthContextType {
  setData: Dispatch<SetStateAction<AuthType>>;
  data: AuthType;
}

interface AuthType {
  isLoggedIn: boolean;
  authToken?: string;
  userid?: string;
  refreshToken?: string;
}

const ConfigContext = createContext({
  baseUrl: undefined,
});

const AuthContext = createContext<AuthContextType>({
  data: undefined,
  setData: undefined,
});

const queryClient = new QueryClient();

const MainElement = () => {
  const [authData, setAuthData] = useState<AuthType | undefined>({
    isLoggedIn: undefined,
  });

  return (
    <StrictMode>
      <BrowserRouter>
        <ConfigContext.Provider value={config}>
          <AuthContext.Provider
            value={{ data: authData, setData: setAuthData }}
          >
            <ThemeProvider theme={Theme}>
              <QueryClientProvider client={queryClient}>
                <SnackbarProvider hideIconVariant autoHideDuration={4000}>
                  <App />
                </SnackbarProvider>
              </QueryClientProvider>
            </ThemeProvider>
          </AuthContext.Provider>
        </ConfigContext.Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<MainElement />);

export { ConfigContext, AuthContext, AuthContextType, AuthType };
