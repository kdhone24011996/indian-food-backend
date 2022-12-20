// #region Global Imports
import { createTheme } from "@mui/material/styles";
// #endregion Global Imports
const dark_blue = "#0080F6";
const light_blue = "#91D2FE";
const gray = "#E8EAF0";
const light_gray = "#F4F5F9";
const white = "#FFFFFF";
const green = "#7BD08C";
const dark_gray = "#A8AFBD";

let theme = createTheme({
  // overridding material ui default styles

  typography: {
    fontFamily: "Rubik",
    h1: {
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: "30px",
    },
    h2: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: "20px",
    },
    h3: {
      fontWeight: 400,
      lineHeight: "20px",
      fontSize: "1rem",
    },
    h4: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: "20px",
    },
    h6: {
      fontWeight: 500,
      color: dark_blue,
    },
    body1: {
      fontFamily: "Rubik",
    },
  },
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          padding: "2px",
          margin: "6px",
          borderRadius: "5px",
          position: "relative",
          top: "calc(50% - 8px)",
        },
        determinate: {
          backgroundColor: light_gray,
        },
        bar: {
          color: green,
          backgroundColor: green,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          border: "2px solid " + dark_blue,
          color: "white",
          backgroundColor: "white",
          width: "20px",
          height: "20px",
          marginRight: "6px",
        },
      },
    },

    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: green,
          padding: "0px",
          margin: "0px 1px",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontsize: "12px",
          lineHeight: "16px",
          fontWeight: "400",
          color: "white",
          backgroundColor: dark_blue,
          border: "none",
          marginTop: "10px",
        },
        deleteIcon: {
          backgroundColor: light_blue,
          color: "white",
          border: "none",
        },
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
        label: {
          color: "#2F2F32",
          fontSize: "1rem",
          fontWeight: "300",
          lineHeight: "0.875rem",
          fontFamily: "Rubik",
        },
      },
    },
  },
  palette: {
    primary: {
      main: dark_blue,
      light: light_blue,
      dark: green,
    },
    secondary: {
      main: gray,
      light: light_gray,
      dark: dark_gray,
    },
  },

  colors: {
    primary: "rgb(0,128,0)",
    secondary: "#808080",
    blue_line: "#00a3d1",
  },
  // declaring new theme constants
  bg: {
    main: "#fff",
    light: "#F4F5F7",
  },
  text: {
    main: "#172B4D",
    light: "#262930",
  },
});

// theme = responsiveFontSizes(theme);
export { theme };
