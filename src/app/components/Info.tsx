import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Grid,
  Typography,
  OutlinedInput,
  FormHelperText,
  Box,
} from "@mui/material";
import type { Info, Wizard } from "../helpers/types";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import ButtonNavigation from "./subComponents/ButtonNavigation";

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

// TODO: Need to improve useForm hook logic
// TODO: Need to improve zod validation logic
// TODO: Reduce Code Duplication

const Info = () => {
  const {
    infoContext,
    setInfoContext,
    wizards,
    setCompletedWizards,
    handleNext,
  } = useFormWizardContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Info>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: infoContext?.name || "",
      email: infoContext?.email || "",
      phoneNumber: infoContext?.phoneNumber || "",
    },
  });

  const onSubmit: SubmitHandler<Info> = (data) => {
    const updatedSteps = wizards.map((step: Wizard) =>
      step.name === "SELECT PLAN" ? { ...step, locked: false } : step
    );

    setCompletedWizards(updatedSteps);

    setInfoContext(data);
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

      <ButtonNavigation />
    </Box>
  );
};

export default Info;
