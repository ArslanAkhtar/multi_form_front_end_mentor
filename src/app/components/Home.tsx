"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stepper,
  StepButton,
  Step,
  Button,
  Typography,
} from "../../lib/mui";
import CopyRight from "./CopyRight";

import { styled } from "@mui/system";

import Info from "./Info";
//import PaymentForm from './PaymentForm';
//import Review from './Review';

const StepSection = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const steps = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Info />;
    // case 1:
    //   return <PaymentForm />;
    // case 2:
    //   return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const FormWrapper = styled("div")({
    height: "100%",
    width: "100%",
  });

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
                  <Step key={label} completed={completed[index]}>
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
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you
              </Typography>
            </>
          ) : (
            <FormWrapper>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

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
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              </Box>
            </FormWrapper>
          )}
        </Paper>
        <CopyRight />
      </Container>
    </>
  );
}
