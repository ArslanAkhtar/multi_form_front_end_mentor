import { useState } from "react";
import {
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Stack,
  Switch,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "../../lib/mui";
import { styled } from "@mui/system";
import { Wizard, type Plan, FormValues } from "../helpers/types";
import PlanCard from "./subComponents/PlanCard";

import { plans } from "../helpers/constants";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import ButtonNavigation from "./subComponents/ButtonNavigation";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import { get } from "http";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const FormContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const CardWrapper = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",

  "@media (max-width:600px)": {
    flexDirection: "column",
  },
});

const SelectPlan = () => {
  const { setDataAndGoToNextStep, data } = useFormWizardContext();

  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    formState: { isDirty, dirtyFields },
  } = useForm<Partial<FormValues>>({
    defaultValues: { planDuration: false, ...data } as Partial<FormValues>,
  });

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    setDataAndGoToNextStep(data);
  };

  return (
    <>
      <Box
        sx={FormContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            Select your plan
          </Typography>
          <Typography variant="subtitle2" color={"#656565"} gutterBottom>
            You have the option of monthly or yearly billing.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CardWrapper>
                <Controller
                  name="planId"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {plans.map((plan, index) => (
                        <FormControlLabel
                          key={index}
                          control={<Radio value={plan.id} />}
                          label={plan.title}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </CardWrapper>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="planDuration"
                control={control}
                render={({ field }) => (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Monthly</Typography>
                    <AntSwitch
                      inputProps={{ "aria-label": "ant design" }}
                      {...field}
                      defaultChecked={getValues("planDuration")}
                      // onChange={(e) => {
                      //   setPlanDuration(e.target.checked ? "yearly" : "monthly");
                      // }}
                    />
                    <Typography>Yearly</Typography>
                  </Stack>
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <ButtonNavigation />
      </Box>
      <DevTool control={control} />
    </>
  );
};

export default SelectPlan;
