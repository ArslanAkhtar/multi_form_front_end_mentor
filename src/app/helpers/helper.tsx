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
  const planCost = (planContext?.price as string)
    .match(/\d+/g)
    ?.map(Number)[0] || [0];

  const addOnsCost = addOnsContext?.map((item: AddOnsType) => {
    return (item.price as string).match(/\d+/g)?.map(Number)[0] || [0];
  }, 0) as number[];
  const sumOfAddOns = addOnsCost.reduce((a: number, b: number) => a + b, 0);
  return (
    "+$" +
    ((planCost as number) + sumOfAddOns) +
    "/" +
    (planContext?.type === "monthly" ? "mo" : "yr")
  );
};

export const getStepContent = (
  step: number,
  totalSteps: number,
  handleBack: () => void,
  handleNext: () => void
) => {
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
};
