import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    bold: {
      fontWeight: "bold",
    },
    boldBlack: {
      color: "#000000",
    },
    button: {
      textTransform: "none",
      letterSpacing: 0,
    },
    notification: {
      fontSize: 10,
      color: "#FFFFFF",
      letterSpacing: -0.5,
      lineHeight: 1,
    },
    sidebarHeading: {
      letterSpacing: -0.2,
    },
    sidebarSubheading: {
      fontSize: 12,
      color: "#9CADC8",
      letterSpacing: -0.17,
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  spacing:  [0, 8.5, 17, 27],
  palette: {
    primary: { main: "#3A8DFF", light: "#3F92FF" },
    secondary: { main: "#B0B0B0" },
  }
}); 
