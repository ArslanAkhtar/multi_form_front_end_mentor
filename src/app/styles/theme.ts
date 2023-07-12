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
    h1: {
      fontSize: "2.5rem",
      fontFamily: "Ubuntu-bold",
    },
    h2: {
      fontSize: "2rem",
      fontFamily: "Ubuntu-bold",
    },
    h3: {
      fontSize: "1.75rem",
      fontFamily: "Ubuntu-bold",
    },
    h4: {
      fontSize: "1.5rem",
      fontFamily: "Ubuntu-bold",
    },
    h5: {
      fontSize: "1.25rem",
      fontFamily: "Ubuntu-bold",
    },
    h6: {
      fontSize: "1rem",
      fontFamily: "Ubuntu-bold",
    },
    subtitle1: {
      fontSize: "1rem",
      fontFamily: "Ubuntu-medium",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontFamily: "Ubuntu-medium",
    },
    body1: {
      fontSize: "0.875rem",
      fontFamily: "Ubuntu-reg",
    },
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
});
