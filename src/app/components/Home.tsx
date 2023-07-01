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
} from "../../lib/mui";
import { steps } from "../helpers/constants";
import CopyRight from "./CopyRight";
import Info from "./Info";
import SelectPlan from "./SelectPlan";
import AddOns from "./AddOns";
import Summary from "./Summary";
import Complete from "./Complete";

import useStepper from "../customhooks/useStepper";

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

function getStepContent(
  step: number,
  totalSteps: number,
  handleBack: () => void,
  handleNext: () => void
) {
  switch (step) {
    case 0:
      return (
        <Info
          activeStep={step}
          totalSteps={totalSteps}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    case 1:
      return (
        <SelectPlan
          activeStep={step}
          totalSteps={totalSteps}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    case 2:
      return (
        <AddOns
          activeStep={step}
          totalSteps={totalSteps}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    case 3:
      return (
        <Summary
          activeStep={step}
          totalSteps={totalSteps}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    case 4:
      return <Complete />;
    default:
      throw new Error("Unknown step");
  }
}

const Home = () => {
  const [stepOneData, setStepOneData] = useState({});
  const { activeStep, totalSteps, handleBack, handleNext, handleStep } =
    useStepper();

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
              height: "500px",
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
