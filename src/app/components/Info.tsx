import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Grid,
  Typography,
  OutlinedInput,
  FormHelperText,
  Button,
  Box,
} from "@mui/material";
import type { FormDataProps, Info, Wizard } from "../helpers/types";

import { useMyContext } from "../contexts/AppContext";

const schema = z.object({
  name: z.string().nonempty("Full Name is required"),
  email: z
    .string()
    .nonempty("Email Address is required")
    .email("Invalid email format"),
  phoneNumber: z
    .string()
    .nonempty("Phone Number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

const FormContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const Info = ({
  activeStep,
  totalSteps,
  handleBack,
  handleNext,
}: FormDataProps) => {
  const { infoContext, setInfoContext, wizards, setCompletedWizards } =
    useMyContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Record<string, string>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: infoContext?.name || "",
      email: infoContext?.email || "",
      phoneNumber: infoContext?.phoneNumber || "",
    },
  });

  const onSubmit = (data: Record<string, string>) => {
    const updatedSteps = wizards.map((step: Wizard) =>
      step.name === "SELECT PLAN" ? { ...step, locked: false } : step
    );

    setCompletedWizards(updatedSteps);

    setInfoContext(data as unknown as Info);
    handleNext();
  };

  useEffect(() => {
    setValue("name", infoContext?.name || "");
    setValue("email", infoContext?.email || "");
    setValue("phoneNumber", infoContext?.phoneNumber || "");
  }, [infoContext, setValue]);

  return (
    <Box sx={FormContainer} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Personal info
        </Typography>
        <Typography variant="subtitle2" color="#656565" gutterBottom>
          Please provide your name, email address, and phone number.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormHelperText sx={{ fontWeight: "bold" }}>
              Full Name*
            </FormHelperText>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    placeholder="e.g. Stephen King"
                    aria-describedby="name-helper-text"
                    inputProps={{
                      "aria-label": "name",
                    }}
                  />
                  {errors.name && (
                    <Typography variant="body2" color="error">
                      {errors.name.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText sx={{ fontWeight: "bold" }}>
              Email Address*
            </FormHelperText>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    placeholder="e.g. stephenking@lorem.com"
                    aria-describedby="email-helper-text"
                    inputProps={{
                      "aria-label": "email",
                    }}
                  />
                  {errors.email && (
                    <Typography variant="body2" color="error">
                      {errors.email.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText sx={{ fontWeight: "bold" }}>
              Phone Number*
            </FormHelperText>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    placeholder="e.g. +1 234 567 890"
                    aria-describedby="phoneNumber-helper-text"
                    inputProps={{
                      "aria-label": "Phone Number",
                    }}
                  />
                  {errors.phoneNumber && (
                    <Typography variant="body2" color="error">
                      {errors.phoneNumber.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 4,
        }}
      >
        {activeStep !== totalSteps && (
          <>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={activeStep === totalSteps}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === totalSteps - 1 ? "Confirm" : "Next"}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Info;
