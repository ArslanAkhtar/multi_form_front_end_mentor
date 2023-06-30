import { Grid, Typography, OutlinedInput, FormHelperText } from "../../lib/mui";
import { styled } from "@mui/system";

const FormContainer = styled("div")({
  height: "100%",
  width: "100%",
});

export default function Info() {
  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        Personal info
      </Typography>
      <Typography variant="subtitle2" color={"#656565"} gutterBottom>
        Please provide your name, email address, and phone number.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormHelperText sx={{ fontWeight: "bold" }}>Full Name</FormHelperText>
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
            Email Address
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
            Phone Number
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
    </FormContainer>
  );
}
