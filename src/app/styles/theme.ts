import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColor: {
      main: string;
      secondary: string;
    };
  }
  interface PaletteOptions {
    customColor: {
      main: string;
      secondary: string;
    };
  }
}

declare module "@mui/material/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    customVariant: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: "Ubuntu-reg, Ubuntu-medium, Ubuntu-bold",
  },
  palette: {
    primary: {
      main: "#174a8b",
    },
    secondary: {
      main: "#bee1fd",
    },
    customColor: {
      main: "#ff0000", // Replace with your custom color
      secondary: "#00ff00", // Replace with another custom color
    },
  },
  components: {
    // Name of the component
    MuiStepButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "5rem",
          color: "white",
        },
      },
    },
  },
});
