import { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "../../lib/mui";
import { styled } from "@mui/system";
import { addons } from "../helpers/constants";
import { AddOnsType, Wizard } from "../helpers/types";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import { useForm } from "react-hook-form";
import ButtonNavigation from "./subComponents/ButtonNavigation";

const FormContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const ButtonTitle = styled("div")({
  display: "flex",
  flexDirection: "column",
});

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
            <Grid item xs={12} key={index}>
              <Box
                variant={selected.includes(addon) ? "contained" : "outlined"}
                component={Button}
                size="large"
                sx={{ mt: 2, display: "flex", flexDirection: "row" }}
                onClick={() => handleSelect(addon)}
              >
                <ButtonTitle>
                  <Typography variant="h6" gutterBottom>
                    {addon.title}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color={selected.includes(addon) ? "#fff" : "#656565"}
                  >
                    {addon.description}
                  </Typography>
                </ButtonTitle>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginLeft: "40px" }}
                >
                  {planContext?.type === "monthly"
                    ? addon.monthlyPrice
                    : addon.yearlyPrice}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <ButtonNavigation />
    </Box>
  );
};

export default AddOns;
