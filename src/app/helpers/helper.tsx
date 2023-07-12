import { AddOnsType, Plan } from "./types";
import Info from "../components/Info";
import SelectPlan from "../components/SelectPlan";
import AddOns from "../components/AddOns";
import Summary from "../components/Summary";
import Complete from "../components/Complete";
import { addons, plans } from "./constants";

export const totalCost = (selectedPlan: Plan, selectedAddOns: AddOnsType[]) => {
  const planCost = Number(selectedPlan?.price);

  const addOnsCost =
    selectedAddOns?.map((item: AddOnsType) => Number(item.price)) || [];
  const sumOfAddOns = addOnsCost.reduce((a: number, b: number) => a + b, 0);
  return `+$${planCost + sumOfAddOns}/${
    selectedPlan?.type === "monthly" ? "mo" : "yr"
  }`;
};

export const getStepContent = (step: number): React.ReactNode => {
  const componentsMap: { [key: number]: React.ReactNode } = {
    0: <Info />,
    1: <SelectPlan />,
    2: <AddOns />,
    3: <Summary />,
    4: <Complete />,
  };

  const component = componentsMap[step];
  if (!component) {
    throw new Error("Unknown step");
  }

  return component;
};

export const createSelectPlan = (planId: string, planDuration: boolean) => {
  const SelectedPlan = plans.find((plan) => plan.id === planId);

  return {
    id: SelectedPlan?.id,
    title: SelectedPlan?.title,
    type: planDuration ? "yearly" : "monthly",
    price: planDuration
      ? SelectedPlan?.yearlyPrice
      : SelectedPlan?.monthlyPrice,
  };
};

export const createSelectedAddOns = (
  addOnsIds: string[],
  planDuration: boolean
) => {
  const selectedAddons = addOnsIds?.map((id: string) =>
    addons.find((addon) => addon.id === id)
  );

  return selectedAddons?.map((addon) => ({
    id: addon?.id,
    title: addon?.title,
    price: planDuration ? addon?.yearlyPrice : addon?.monthlyPrice,
  }));
};
