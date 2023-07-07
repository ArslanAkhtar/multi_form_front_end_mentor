import { useState, useEffect } from "react";
import { Grid, Typography, Box } from "../../lib/mui";

import { addons } from "../helpers/constants";
import { AddOnsType, Wizard } from "../helpers/types";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import { useForm } from "react-hook-form";
import ButtonNavigation from "./subComponents/ButtonNavigation";

import AddOnCard from "./subComponents/AddOnCard";

const FormContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const AddOns = () => {
  const { handleSubmit } = useForm();

  const {
    planContext,
    addOnsContext,
    setAddOnsContext,
    wizards,
    setCompletedWizards,
    handleNext,
  } = useFormWizardContext();
  const [selected, setSelected] = useState<AddOnsType[]>([]);

  const handleSelect = (addon: AddOnsType) => {
    if (selected.includes(addon)) {
      const newArr = selected.filter((item) => item !== addon);
      setSelected(newArr);
      return;
    }
    addon.price =
      planContext?.type === "monthly" ? addon.monthlyPrice : addon.yearlyPrice;
    const newArr = [...selected, addon];
    setSelected(newArr);
  };

  const onSubmit = () => {
    const updatedSteps = wizards.map((step: Wizard) =>
      step.name === "SUMMARY" ? { ...step, locked: false } : step
    );
    setCompletedWizards(updatedSteps);

    setAddOnsContext(selected);
    handleNext();
  };

  useEffect(() => {
    setSelected(addOnsContext);
  }, [addOnsContext]);
  return (
    <Box sx={FormContainer} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Pick add-ons
        </Typography>
        <Typography variant="subtitle2" color={"#656565"} gutterBottom>
          Add-ons help enhance your gaming experience.
        </Typography>
        <Grid container spacing={3}>
          {addons.map((addon, index) => (
            <AddOnCard
              addon={addon}
              index={index}
              selected={selected}
              handleSelect={handleSelect}
              key={index}
            />
          ))}
        </Grid>
      </Box>
      <ButtonNavigation />
    </Box>
  );
};

export default AddOns;
