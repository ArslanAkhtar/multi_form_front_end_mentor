"use client";
import { styled } from "@mui/system";
import {
  Box,
  Container,
  Paper,
  Stepper,
  StepButton,
  Step,
  useMediaQuery,
  useTheme,
  Typography,
} from "@/lib/mui";
import CopyRight from "./CopyRight";

import { getStepContent } from "../helpers/helper";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import { Wizard } from "../helpers/types";

const StepSection = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

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

const FormNavigation = {
  backgroundImage: `url('/assets/images/bg-sidebar-desktop.svg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  height: "500px",
  width: "50%",

  "@media (max-width:800px)": {
    backgroundSize: "cover",
    marginRight: "20px",
  },
};

const FormNavigationMobile = {
  backgroundImage: `url('/assets/images/bg-sidebar-mobile.svg')`,
  backgroundRepeat: "no-repeat",
  width: "100%",
  backgroundSize: "cover",
  height: "200px",
  position: "absolute",
  zIndex: 0,
  top: 0,
  left: 0,
};

const Home = () => {
  const {
    wizards,
    activeStep,
    totalSteps,
    handleBack,
    handleNext,
    handleStep,
  } = useFormWizardContext();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 6 }}>
        {isMobile && (
          <Box sx={FormNavigationMobile}>
            <StepSection>
              <Stepper
                activeStep={activeStep}
                nonLinear
                orientation="horizontal"
                sx={{
                  pt: 3,
                  pb: 5,
                  color: "#fff",
                  borderTop: "none",
                }}
              >
                {wizards.map((item: Wizard, index: number) => (
                  <Step key={item.name}>
                    <StepButton
                      color="inherit"
                      disabled={item.locked}
                      onClick={handleStep(index)}
                      sx={{ color: "white" }}
                    />
                  </Step>
                ))}
              </Stepper>
            </StepSection>
          </Box>
        )}
        <Paper sx={FormContainer}>
          {!isMobile && (
            <Box sx={FormNavigation}>
              <StepSection>
                <Stepper
                  activeStep={activeStep}
                  nonLinear
                  orientation="vertical"
                  sx={{
                    color: "#fff",
                    ".MuiStepConnector-lineVertical": {
                      border: "none",
                    },
                  }}
                >
                  {wizards.map((item: Wizard, index: number) => (
                    <Step
                      key={item.name}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <StepButton
                        color="inherit"
                        disabled={item.locked}
                        onClick={handleStep(index)}
                        sx={{
                          color: "white",
                          width: "auto",
                        }}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="subtitle2" color="#7d78ff">
                          STEP {index + 1}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="#fff"
                          sx={{ fontWeight: "bold" }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </Step>
                  ))}
                </Stepper>
              </StepSection>
            </Box>
          )}

          <FormWrapper>
            {getStepContent(activeStep, totalSteps, handleBack, handleNext)}
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
