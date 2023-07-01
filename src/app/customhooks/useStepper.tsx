import { useState } from "react";
import { steps } from "../helpers/constants";

const useStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = steps.length;

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

  const isLastStep = () => {
    return activeStep === totalSteps;
  };

  const isFirstStep = () => {
    return activeStep === 0;
  };

  return {
    activeStep,
    handleBack,
    handleNext,
    handleStep,
    totalSteps,
  };
};

export default useStepper;
