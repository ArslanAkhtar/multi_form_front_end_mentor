import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  Switch,
  Radio,
  RadioGroup,
} from "../../lib/mui";
import { styled } from "@mui/system";
import { FormValues } from "../helpers/types";

import { plans } from "../helpers/constants";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import ButtonNavigation from "./subComponents/ButtonNavigation";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";

const schema = z.object({
  planDuration: z.boolean({
    required_error: "planDuration is required",
  }),
  planId: z
    .string({
      required_error: "Plan must be selected",
    })
    .nonempty("Plan must be selected"),
});

const AntSwitch = styled(Switch)(() => ({
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
        backgroundColor: "#02295a",
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
    backgroundColor: "#02295a",
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
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Partial<FormValues>>({
    resolver: zodResolver(schema),
    defaultValues: { planDuration: false, ...data } as Partial<FormValues>,
  });

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    setDataAndGoToNextStep(data);
  };

  const handlePlanClick = (planId: string): void => {
    setValue("planId", planId);
  };

  const [planDuration, setPlanDuration] = useState(getValues("planDuration"));

  const cardStyle = {
    minWidth: 155,
    cursor: "pointer",
    border: "1px solid",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "35px",
    borderRadius: "10px",
    padding: "20px",
    borderColor: "#e0e0e0",
    "@media (max-width:600px)": {
      gap: "15px",
      minWidth: "auto",
      width: "100%",
      padding: "10px 20px",
    },
    "&:hover": {
      borderColor: "#3f51b5",
      backgroundColor: "#f8f9fe",
    },
  };

  const cardContent = {
    display: "flex",
    flexDirection: "column",
    gap: "35px",

    "@media (max-width:600px)": {
      flexDirection: "row",
      gap: "35px",
      alignItems: "center",
    },
  };

  const cardWrap = {
    display: "flex",
    flexDirection: "row",
    gap: "35px",
    "@media (max-width:600px)": {
      gap: "15px",
    },
  };

  const cardTitle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      <Box
        sx={FormContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>
          <Typography variant="h1" gutterBottom>
            Select your plan
          </Typography>
          <Typography variant="subtitle2" color={"#656565"} gutterBottom>
            You have the option of monthly or yearly billing.
          </Typography>
          <Grid container spacing={3} sx={{ mt: "10px" }}>
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
                      sx={cardWrap}
                    >
                      {plans.map((plan, index) => (
                        <Box
                          onClick={() => handlePlanClick(plan.id)}
                          key={index}
                          sx={{
                            ...cardStyle,
                            borderColor:
                              getValues("planId") === plan.id
                                ? "#3f51b5"
                                : "#e0e0e0",
                            backgroundColor:
                              getValues("planId") === plan.id
                                ? "#f8f9fe"
                                : "#fff",
                          }}
                        >
                          <Radio
                            sx={{ display: "none" }}
                            value={plan.id}
                            checked={getValues("planId") === plan.id}
                          />

                          <Box sx={cardContent}>
                            <Image
                              src={`/assets/images/${plan.title}.svg`}
                              alt={plan.title}
                              width={32}
                              height={32}
                            />
                            <Box sx={cardTitle}>
                              <Typography
                                variant="h6"
                                component="div"
                                gutterBottom
                                color={"#1e3251"}
                              >
                                {plan.title}
                              </Typography>
                              <Typography variant="subtitle2" color={"#bcbcc6"}>
                                $
                                {planDuration
                                  ? plan.yearlyPrice
                                  : plan.monthlyPrice}
                                /{planDuration ? "yr" : "mo"}
                              </Typography>
                            </Box>
                            {planDuration && (
                              <Typography variant="subtitle2" color={"#1e3251"}>
                                2 months free
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </RadioGroup>
                  )}
                />
              </CardWrapper>
              {errors.planId && (
                <Typography variant="body2" color="error">
                  {errors.planId.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="planDuration"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "#f8f9fe",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      padding: "15px",
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        color={
                          getValues("planDuration") ? "#b0b0ba" : "#172b4f"
                        }
                      >
                        Monthly
                      </Typography>
                      <AntSwitch
                        inputProps={{ "aria-label": "ant design" }}
                        {...field}
                        onChange={(e) => {
                          setValue("planDuration", e.target.checked);
                          setPlanDuration(e.target.checked);
                        }}
                        defaultChecked={getValues("planDuration")}
                      />
                      <Typography
                        color={
                          getValues("planDuration") ? "#172b4f" : "#b0b0ba"
                        }
                      >
                        Yearly
                      </Typography>
                    </Stack>
                  </Box>
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
