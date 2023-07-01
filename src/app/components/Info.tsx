import {
  Grid,
  Typography,
  OutlinedInput,
  FormHelperText,
  Button,
  Box,
} from "../../lib/mui";
import { styled } from "@mui/system";
import { FormDataProps } from "../helpers/types";

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
}: FormDataProps) => {
  return (
    <FormContainer>
      <Box>
        <Typography variant="h5" gutterBottom>
          Personal info
        </Typography>
        <Typography variant="subtitle2" color={"#656565"} gutterBottom>
          Please provide your name, email address, and phone number.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormHelperText sx={{ fontWeight: "bold" }}>
              Full Name*
            </FormHelperText>
            <OutlinedInput
              required
              fullWidth
              placeholder="e.g. Stephen King"
              //value={values.name}
              aria-describedby="outlined-name-helper-text"
              inputProps={{
                "aria-label": "name",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText sx={{ fontWeight: "bold" }}>
              Email Address*
            </FormHelperText>
            <OutlinedInput
              required
              fullWidth
              placeholder="e.g. stephenking@lorem.com"
              //value={values.email}
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                "aria-label": "email",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText sx={{ fontWeight: "bold" }}>
              Phone Number*
            </FormHelperText>
            <OutlinedInput
              required
              fullWidth
              placeholder="e.g. +1 234 567 890"
              //value={values.phoneNumber}
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                "aria-label": "Phone Number",
              }}
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
              variant="contained"
              disabled={activeStep === totalSteps}
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === totalSteps - 1 ? "Confirm" : "Next"}
            </Button>
          </>
        )}
      </Box>
    </FormContainer>
  );
};

export default Info;
