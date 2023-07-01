import { useState } from "react";
import { Grid, Typography, Button, Box } from "../../lib/mui";
import { styled } from "@mui/system";
import { addons } from "../helpers/constants";
import { FormDataProps, AddOns } from "../helpers/types";

const FormContainer = styled("div")({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const ButtonTitle = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const AddOns = ({
  activeStep,
  totalSteps,
  handleBack,
  handleNext,
}: FormDataProps) => {
  const [selected, setSelected] = useState<AddOns[]>([]);

  const handleSelect = (addon: AddOns) => {
    console.log(addon);
    const newArr = [...selected, addon]; // <-- Use the 'addon' parameter here, not 'AddOns'
    setSelected(newArr);
  };

  return (
    <FormContainer>
      <Box>
        <Typography variant="h5" gutterBottom>
          Pick add-ons
        </Typography>
        <Typography variant="subtitle2" color={"#656565"} gutterBottom>
          Add-ons help enhance your gaming experience.
        </Typography>
        <Grid container spacing={3}>
          {addons.map((addon, index) => (
            <Grid item xs={12} key={index}>
              <Box
                variant={selected.includes(addon) ? "contained" : "outlined"}
                component={Button}
                //variant="outlined"
                size="large"
                sx={{ mt: 2, display: "flex", flexDirection: "row" }}
                onClick={() => handleSelect(addon)}
              >
                <ButtonTitle>
                  <Typography variant="h6" gutterBottom>
                    {addon.title}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color={selected.includes(addon) ? "#fff" : "#656565"}
                  >
                    {addon.description}
                  </Typography>
                </ButtonTitle>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginLeft: "40px" }}
                >
                  {addon.price}
                </Typography>
              </Box>
            </Grid>
          ))}
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

export default AddOns;
