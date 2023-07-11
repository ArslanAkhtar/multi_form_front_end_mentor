"use client";
import { styled } from "@mui/system";
import { Box, Container, Paper, useMediaQuery, useTheme } from "@/lib/mui";
import CopyRight from "./CopyRight";
import { getStepContent } from "../helpers/helper";
import { useFormWizardContext } from "../contexts/FormWizardContext";
import StepperMobile from "./subComponents/stepper/StepperMobile";
import StepperDesktop from "./subComponents/stepper/StepperDesktop";

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

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
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
    </>
  );
};

export default Home;
