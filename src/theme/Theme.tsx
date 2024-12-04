import { createTheme } from "@mui/material";

const Colors = {
  primary: "hsl(242, 50%, 7%)",
  background: "hsl(242, 50%, 5%)",
  secondary: "hsl(242, 50%, 90%)",
  tertiary: "hsl(302, 80%, 80%)",
  accent: "hsl(177, 51%, 67%)",
};

const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: Colors.accent,
    },
    secondary: {
      main: Colors.secondary,
    },
    background: {
      default: Colors.background,
    },
  },
});

export { Colors };
export default Theme;
