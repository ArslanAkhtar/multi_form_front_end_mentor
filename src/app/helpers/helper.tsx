import { AddOnsType, Plan } from "./types";
import Info from "../components/Info";
import SelectPlan from "../components/SelectPlan";
import AddOns from "../components/AddOns";
import Summary from "../components/Summary";
import Complete from "../components/Complete";

export const totalCost = (
  planContext: Plan | null,
  addOnsContext: AddOnsType[] | []
) => {
  const planCost = Number(planContext?.price?.match(/\d+/)?.[0] || 0);
  const addOnsCost =
    addOnsContext?.map((item: AddOnsType) =>
      Number(item.price?.match(/\d+/)?.[0] || 0)
    ) || [];
  const sumOfAddOns = addOnsCost.reduce((a: number, b: number) => a + b, 0);
  return `+$${planCost + sumOfAddOns}/${
    planContext?.type === "monthly" ? "mo" : "yr"
  }`;
};

export const getStepContent = (
  step: number,
  totalSteps: number,
  handleBack: () => void,
  handleNext: () => void
): React.ReactNode => {
  const componentsMap: { [key: number]: React.ReactNode } = {
    0: (
      <Info
        activeStep={step}
        totalSteps={totalSteps}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    ),
    1: (
      <SelectPlan
        activeStep={step}
        totalSteps={totalSteps}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    ),
    2: (
      <AddOns
        activeStep={step}
        totalSteps={totalSteps}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    ),
    3: (
      <Summary
        activeStep={step}
        totalSteps={totalSteps}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    ),
    4: <Complete />,
  };

  const component = componentsMap[step];
  if (!component) {
    throw new Error("Unknown step");
  }

  return component;
};
