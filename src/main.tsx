import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RouterComponent from "./components/techincal/RouterComponent/RouterComponent.tsx";
import config from "./config.json";
import { ThemeProvider } from "@mui/material";
import Theme from "theme/Theme.tsx";

const ApplicationContext = createContext({
  baseUrl: undefined,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApplicationContext.Provider value={config}>
        <ThemeProvider theme={Theme}>
          <RouterComponent />
        </ThemeProvider>
      </ApplicationContext.Provider>
    </BrowserRouter>
  </StrictMode>,
);

export { ApplicationContext };
