import {
  Grid,
  Typography,
  Paper,
  Box,
  Link,
  Divider,
  Button,
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

const Summary = ({
  activeStep,
  totalSteps,
  handleBack,
  handleNext,
}: FormDataProps) => {
  return (
    <FormContainer>
      <Box>
        <Typography variant="h5" gutterBottom>
          Finishing up
        </Typography>
        <Typography variant="subtitle2" color={"#656565"} gutterBottom>
          Double-check everything looks OK before confirming.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ backgroundColor: "#f8f9fe" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "15px",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: "normal" }}
                  >
                    Arcade (Monthly)
                  </Typography>
                  <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      console.log("hi");
                    }}
                  >
                    Change
                  </Link>
                </Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ mt: 2, ml: 2, fontWeight: "bolder" }}
                >
                  $9/mo
                </Typography>
              </Box>

              <Divider variant="middle" />
              <Box sx={{ padding: "15px" }}>
                {/* Apply loop here  */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "normal",
                      color: "#c8c8d2",
                    }}
                  >
                    Online service
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "normal",

                      color: "#3e4a5e",
                    }}
                  >
                    +$1/mo
                  </Typography>
                </Box>
                {/* Remove this  */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "normal",
                      color: "#c8c8d2",
                    }}
                  >
                    Larger storage
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "normal",

                      color: "#3e4a5e",
                    }}
                  >
                    +$2/mo
                  </Typography>
                </Box>
              </Box>
            </Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  fontWeight: "normal",
                  color: "#b2b1b6",
                }}
              >
                Total (per month)
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  fontWeight: "normal",

                  color: "#6156e3",
                }}
              >
                +$12/mo
              </Typography>
            </Box>
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

export default Summary;
