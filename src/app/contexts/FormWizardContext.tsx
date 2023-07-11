"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type Step = {
  id: number;
  visited: boolean;
};

interface WizardState<TFormData = unknown> {
  currentStep: Step;
  totalSteps: number;
  data: Partial<TFormData>;
  getStep(step: number): Step;
  setData: (data: Partial<TFormData>) => void;
  setDataAndGoToNextStep: (data: Partial<TFormData>) => void;
  nextStep: () => void;
  goToStep: (step: number) => void;
  previousStep: () => void;
}

const WizardContext = createContext<WizardState | undefined>(undefined);

const FormWizardContextProvider = <TFormData,>({
  children,
  totalSteps,
}: {
  children: ReactNode;
  totalSteps: number;
}) => {
  const [steps, setSteps] = useState<Record<number, Omit<Step, "id">>>({});

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<TFormData>>({});

  const nextStep = () => {
    goToStep(Math.min(currentStep + 1, totalSteps));
  };

  const goToStep = (step: number) => {
    if (step < 0 || step > totalSteps) {
      return;
    }

    setSteps((prevSteps) => ({
      ...prevSteps,
      [step]: { ...prevSteps[step], visited: true },
    }));
    setCurrentStep(step);
  };

  const previousStep = () => {
    goToStep(Math.max(currentStep - 1, 0));
  };

  const setDataAndGoToNextStep = (data: Partial<TFormData>) => {
    setData(data);
    nextStep();
  };

  const getStep = (step: number) => {
    return { id: step, ...steps[step] };
  };

  return (
    <WizardContext.Provider
      value={{
        totalSteps,
        currentStep: getStep(currentStep),
        data,
        getStep,
        setData,
        setDataAndGoToNextStep,
        nextStep,
        goToStep,
        previousStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

const useFormWizardContext = <
  TFormData = unknown,
>(): WizardState<TFormData> => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export { useFormWizardContext, FormWizardContextProvider };
