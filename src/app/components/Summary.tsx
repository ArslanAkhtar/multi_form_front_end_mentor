import { Grid, Typography, Paper, Box, Link, Divider } from "../../lib/mui";

const FormContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

import { useForm } from "react-hook-form";

import { useFormWizardContext } from "../contexts/FormWizardContext";
import { totalCost } from "../helpers/helper";
import ButtonNavigation from "./subComponents/ButtonNavigation";

const Summary = () => {
  const { handleSubmit } = useForm();

  const { planContext, addOnsContext, handleBack, handleNext, handleStep } =
    useFormWizardContext();

  const sumOfCost = totalCost(planContext, addOnsContext);

  return (
    <Box
      sx={FormContainer}
      component="form"
      onSubmit={handleSubmit(handleNext)}
    >
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
                    {planContext?.title} ({planContext?.type})
                  </Typography>
                  <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      () => handleStep(1);
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
                  {planContext?.price}
                </Typography>
              </Box>
              {addOnsContext && addOnsContext.length > 0 && (
                <Divider variant="middle" />
              )}

              <Box sx={{ padding: "15px" }}>
                {addOnsContext?.map((addon, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: "normal" }}
                      >
                        {addon.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: "normal" }}
                      >
                        {addon.price}
                      </Typography>
                    </Box>
                  );
                })}
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
                {sumOfCost}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ButtonNavigation />
    </Box>
  );
};

export default Summary;
