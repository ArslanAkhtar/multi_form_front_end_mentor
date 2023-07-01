import { Grid, Typography, Paper, Box, Link, Divider } from "../../lib/mui";
import { styled } from "@mui/system";

const FormContainer = styled("div")({
  height: "100%",
  width: "100%",
});

const ButtonTitle = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Summary = () => {
  return (
    <FormContainer>
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
    </FormContainer>
  );
};

export default Summary;
