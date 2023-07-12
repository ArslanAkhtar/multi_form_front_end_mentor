"use client";
import { styled } from "@mui/system";
import {
  Box,
  Container,
  Paper,
  useMediaQuery,
  CssBaseline,
  ThemeProvider,
} from "@/lib/mui";
import CopyRight from "./CopyRight";
import { getStepContent } from "../helpers/helper";
import { useFormWizardContext } from "../contexts/FormWizardContext";
import StepperMobile from "./subComponents/stepper/StepperMobile";
import StepperDesktop from "./subComponents/stepper/StepperDesktop";

import "../../../public/assets/fonts/fonts.css";
import { theme } from "../styles/theme";

const FormWrapper = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
});

const FormContainer = {
  my: { xs: 3, md: 6 },
  p: { xs: 2, md: 3 },
  display: "flex",
  width: "100%",

  "@media (max-width:600px)": {
    position: "relative",
    top: "100px",
    zIndex: 1,
  },
};

const Home = () => {
  const { currentStep } = useFormWizardContext();

  // const theme = useTheme();

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#ff0000", // Set your primary color
  //     },
  //     secondary: {
  //       main: "#00ff00", // Set your secondary color
  //     },
  //   },
  //   typography: {
  //     fontFamily: "Roboto, sans-serif", // Use the imported font name here
  //   },
  // });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 6 }}>
        {isMobile && <StepperMobile />}
        <Paper sx={FormContainer}>
          {!isMobile && <StepperDesktop />}
          <FormWrapper>
            {getStepContent(currentStep.id)}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            ></Box>
          </FormWrapper>
        </Paper>
        <CopyRight />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
