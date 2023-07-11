import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "../../lib/mui";

import { addons } from "../helpers/constants";
import { AddOnsType, FormValues, Wizard } from "../helpers/types";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import { useForm, SubmitHandler } from "react-hook-form";
import ButtonNavigation from "./subComponents/ButtonNavigation";

import AddOnCard from "./subComponents/AddOnCard";

const FormContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

type AddOns = {
  addons: string[];
};

const AddOns = () => {
  const { setDataAndGoToNextStep, data } = useFormWizardContext<FormValues>();

  const { handleSubmit, register } = useForm<Partial<FormValues>>({
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    setDataAndGoToNextStep(data);
  };

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
          {addons.map((addon: AddOnsType, index: number) => (
            <FormControlLabel
              control={<Checkbox />}
              label={addon.title}
              key={index}
              value={addon.id}
              {...register("addonsIds")}
            />
          ))}
        </Grid>
      </Box>
      <ButtonNavigation />
    </Box>
  );
};

export default AddOns;
