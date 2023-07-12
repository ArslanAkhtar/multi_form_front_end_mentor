import { Grid, Typography, Box } from "../../lib/mui";
import { styled } from "@mui/system";
import VerifiedIcon from "@mui/icons-material/Verified";

const FormContainer = styled("div")({
  height: "100%",
  width: "100%",
});

const ButtonTitle = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Complete = () => {
  return (
    <FormContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 10,
            }}
          >
            <VerifiedIcon
              sx={{
                fontSize: "70px",
                color: "red",
              }}
            />
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                color: "#022b58",
                textAlign: "center",
                mt: 2,
              }}
            >
              Thank You
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontWeight: "normal",
                textAlign: "center",
                color: "#a5a4ac",
                mb: 5,
              }}
            >
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@muhammadarslan.nl
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Complete;
