"use client";
import { useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Container,
  Paper,
  Stepper,
  StepButton,
  Step,
  Button,
} from "../../lib/mui";
import { steps } from "../helpers/constants";
import CopyRight from "./CopyRight";
import Info from "./Info";
import SelectPlan from "./SelectPlan";
import AddOns from "./AddOns";
import Summary from "./Summary";
import Complete from "./Complete";

const StepSection = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const FormWrapper = styled("div")({
  height: "100%",
  width: "100%",
});

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Info />;
    case 1:
      return <SelectPlan />;
    case 2:
      return <AddOns />;
    case 3:
      return <Summary />;
    case 4:
      return <Complete />;
    default:
      throw new Error("Unknown step");
  }
}

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleBack = () => {
    if (!isFirstStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps();
  };
  const isFirstStep = () => {
    return activeStep === 0;
  };

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 6 }}>
        <Paper
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url('/assets/images/bg-sidebar-desktop.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              height: "55vh",
              width: "50%",
            }}
          >
            <StepSection>
              <Stepper
                activeStep={activeStep}
                nonLinear
                orientation="vertical"
                sx={{
                  pt: 3,
                  pb: 5,
                  color: "#fff",
                }}
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      color="inherit"
                      onClick={handleStep(index)}
                      sx={{ color: "white" }}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </StepSection>
          </Box>

          <FormWrapper>
            {getStepContent(activeStep)}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              {activeStep !== steps.length && (
                <>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    disabled={activeStep === steps.length}
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </Button>
                </>
              )}
            </Box>
          </FormWrapper>
        </Paper>
        <CopyRight />
      </Container>
    </>
  );
};

export default Home;
