"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import type { Info, Plan, AddOnsType, Wizard } from "../helpers/types";
import { steps } from "../helpers/constants";

// TODO:Improve step selection using context and update the steps selection and lock methods.
// TODO: Delete extra code create single array with steps object and array items representing the steps.
// TODO: Update the methods make it more generic and reusable.

interface AppContextData {
  wizards: Wizard[];
  setCompletedWizards: React.Dispatch<React.SetStateAction<Wizard[]>>;
  infoContext: Info | null;
  setInfoContext: React.Dispatch<React.SetStateAction<Info | null>>;
  planContext: Plan | null;
  setPlanContext: React.Dispatch<React.SetStateAction<Plan | null>>;
  addOnsContext: AddOnsType[];
  setAddOnsContext: React.Dispatch<React.SetStateAction<AddOnsType[]>>;

  activeStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  handleStep: (step: number) => () => void;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = steps.length;
  const [wizards, setCompletedWizards] = useState<Wizard[]>(steps);
  const [infoContext, setInfoContext] = useState<Info | null>(null);
  const [planContext, setPlanContext] = useState<Plan | null>(null);
  const [addOnsContext, setAddOnsContext] = useState<AddOnsType[]>([]);

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

  return (
    <AppContext.Provider
      value={{
        wizards,
        setCompletedWizards,
        infoContext,
        setInfoContext,
        planContext,
        setPlanContext,
        addOnsContext,
        setAddOnsContext,
        activeStep,
        totalSteps,
        handleBack,
        handleNext,
        handleStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useFormWizardContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export { useFormWizardContext, AppContextProvider };
