export const steps = [
  { name: "YOUR INFO", locked: false },
  { name: "SELECT PLAN", locked: true },
  { name: "ADD-ONS", locked: true },
  { name: "SUMMARY", locked: true },
];

// export const steps = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];
export const plans = [
  {
    title: "Arcade",
    monthlyPrice: "$9/mo",
    yearlyPrice: "$90/yr",
  },
  {
    title: "Advanced",
    monthlyPrice: "$12/mo",
    yearlyPrice: "$120/yr",
  },
  {
    title: "Pro",
    monthlyPrice: "$15/mo",
    yearlyPrice: "$150/yr",
  },
];

export const addons = [
  {
    title: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: "+$1/mo",
    yearlyPrice: "+$10/уг",
  },
  {
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: "+$2/mo",
    yearlyPrice: "+$20/уг",
  },
  {
    title: "Customizable Profile",
    description: "Custom theme on your profile",
    monthlyPrice: "+$2/mo",
    yearlyPrice: "+$20/уг",
  },
];
