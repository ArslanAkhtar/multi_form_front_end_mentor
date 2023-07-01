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
import { styled } from "@mui/system";
import { FormDataProps } from "../helpers/types";

// Define the Zod schema to validate the input fields
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

// Define the Props interface for the Info component
interface InfoProps extends FormDataProps {
  // Add any additional props specific to the Info component, if needed
}

const FormContainer = styled("div")({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const Info = ({
  activeStep,
  totalSteps,
  handleBack,
  handleNext,
}: InfoProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, string>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    handleNext();
  };

  return (
    <FormContainer>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" gutterBottom>
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
              defaultValue=""
              render={({ field }) => (
                <>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    placeholder="e.g. Stephen King"
                    aria-describedby="outlined-name-helper-text"
                    inputProps={{
                      "aria-label": "name",
                    }}
                  />
                  {errors.name && (
                    <Typography color="error">{errors.name.message}</Typography>
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
              defaultValue=""
              render={({ field }) => (
                <>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    placeholder="e.g. stephenking@lorem.com"
                    aria-describedby="outlined-email-helper-text"
                    inputProps={{
                      "aria-label": "email",
                    }}
                  />
                  {errors.email && (
                    <Typography color="error">
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
              defaultValue=""
              render={({ field }) => (
                <>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    placeholder="e.g. +1 234 567 890"
                    aria-describedby="outlined-phoneNumber-helper-text"
                    inputProps={{
                      "aria-label": "Phone Number",
                    }}
                  />
                  {errors.phoneNumber && (
                    <Typography color="error">
                      {errors.phoneNumber.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
        </Grid>
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
    </FormContainer>
  );
};

export default Info;
