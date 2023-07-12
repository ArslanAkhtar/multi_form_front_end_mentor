import { useState, useEffect } from "react";
import { Grid, Typography, Box, Checkbox } from "../../lib/mui";

import { addons } from "../helpers/constants";
import { FormValues } from "../helpers/types";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ButtonNavigation from "./subComponents/ButtonNavigation";

import { DevTool } from "@hookform/devtools";

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
  const [addonsIdsChanged, setAddonsIdsChanged] = useState<number | null>(null);

  const { handleSubmit, control, getValues, setValue } = useForm<
    Partial<FormValues>
  >({
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    setDataAndGoToNextStep(data);
  };

  const ButtonTitle = {
    display: "flex",
    flexDirection: "column",
    minWidth: "180px",

    "@media (max-width:600px)": {
      minWidth: "auto",
    },
  };

  const cardStyle = {
    minWidth: 155,
    cursor: "pointer",
    border: "1px solid",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "10px",
    padding: "20px",
    borderColor: "#e0e0e0",
    justifyContent: "space-between",
    "@media (max-width:600px)": {
      minWidth: "auto",
      gap: "0px",
      padding: "10px",
    },
    "&:hover": {
      borderColor: "#3f51b5",
      backgroundColor: "#f8f9fe",
    },
  };

  const handleAddOnClick = (id: string): void => {
    const oldVal = getValues("addonsIds") || [];
    if (oldVal.includes(id)) {
      const newVal = oldVal.filter((item) => item !== id);
      setValue("addonsIds", newVal);
      return;
    } else {
      setValue("addonsIds", [...oldVal, id]);
    }
    setAddonsIdsChanged((prevKey) => (prevKey === null ? 0 : prevKey + 1));
  };

  return (
    <Box sx={FormContainer} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h1" gutterBottom>
          Pick add-ons
        </Typography>
        <Typography variant="subtitle2" color={"#656565"} gutterBottom>
          Add-ons help enhance your gaming experience.
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{ mt: "10px", ml: "1px", width: "100%" }}
        >
          <Controller
            key={addonsIdsChanged}
            name="addonsIds"
            control={control}
            render={() => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  "@media (max-width:600px)": {
                    gap: "15px",
                  },
                }}
              >
                {addons.map((addon, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      ...cardStyle,
                      borderColor: getValues("addonsIds")?.includes(addon.id)
                        ? "#3f51b5"
                        : "#e0e0e0",
                      backgroundColor: getValues("addonsIds")?.includes(
                        addon.id
                      )
                        ? "#f8f9fe"
                        : "#fff",
                    }}
                    onClick={() => handleAddOnClick(addon.id)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "35px",
                        "@media (max-width:600px)": {
                          gap: "15px",
                        },
                      }}
                    >
                      <Checkbox
                        value={addon.id}
                        checked={getValues("addonsIds")?.includes(addon.id)}
                      />
                      <Box sx={ButtonTitle}>
                        <Typography
                          variant="h6"
                          sx={{
                            "@media (max-width:600px)": {
                              fontSize: "12px",
                            },
                          }}
                          gutterBottom
                        >
                          {addon.title}
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "#bebec8",
                            "@media (max-width:600px)": {
                              fontSize: "12px",
                            },
                          }}
                        >
                          {addon.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      color="#5b4fc2"
                      sx={{
                        "@media (max-width:600px)": {
                          fontSize: "12px",
                        },
                      }}
                      gutterBottom
                    >
                      +$
                      {getValues("planDuration")
                        ? addon.monthlyPrice
                        : addon.yearlyPrice}
                      /{getValues("planDuration") ? "yr" : "mo"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          />
        </Grid>
      </Box>
      <ButtonNavigation />
      <DevTool control={control} />
    </Box>
  );
};

export default AddOns;
