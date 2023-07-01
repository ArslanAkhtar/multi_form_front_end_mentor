import { Grid, Typography, Button, Box } from "../../lib/mui";
import { styled } from "@mui/system";
import { addons } from "../helpers/constants";

const FormContainer = styled("div")({
  height: "100%",
  width: "100%",
});

const ButtonTitle = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const AddOns = () => {
  return (
    <FormContainer>
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
              //variant={selected ? 'contained' : 'outlined'}
              component={Button}
              variant="outlined"
              size="large"
              sx={{ mt: 2, display: "flex", flexDirection: "row" }}
              //onClick={handleSelect}
            >
              <ButtonTitle>
                <Typography variant="h6" gutterBottom>
                  {addon.title}
                </Typography>

                <Typography variant="subtitle2" color={"#656565"}>
                  {addon.description}
                </Typography>
              </ButtonTitle>
              <Typography variant="h6" gutterBottom sx={{ marginLeft: "40px" }}>
                {addon.price}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </FormContainer>
  );
};

export default AddOns;
