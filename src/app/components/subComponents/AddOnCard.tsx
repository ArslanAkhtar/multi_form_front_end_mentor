import { Box, Button, Grid, Typography } from "@/lib/mui";
import { AddOnsType } from "../../helpers/types";
import { styled } from "@mui/system";
import { useFormWizardContext } from "@/app/contexts/FormWizardContext";

interface AddOnCardProps {
  addon: AddOnsType;
  index: number;
  selected: AddOnsType[];
  handleSelect: (addon: AddOnsType) => void;
}

const ButtonTitle = styled("div")({
  display: "flex",
  flexDirection: "column",
  minWidth: "180px",

  "@media (max-width:600px)": {
    minWidth: "170px",
  },
});
const AddOnCard = ({
  addon,
  index,
  selected,
  handleSelect,
}: AddOnCardProps) => {
  const { planContext } = useFormWizardContext();

  return (
    <Grid item xs={12} key={index}>
      <Box
        variant={selected.includes(addon) ? "contained" : "outlined"}
        component={Button}
        size="large"
        sx={{ mt: 2, display: "flex", flexDirection: "row" }}
        onClick={() => handleSelect(addon)}
      >
        <ButtonTitle>
          <Typography
            variant="h6"
            gutterBottom
            color={selected.includes(addon) ? "#fff" : "#000"}
            sx={{ fontSize: "12px", fontWeight: "bold" }}
          >
            {addon.title}
          </Typography>

          <Typography
            variant="subtitle2"
            color={selected.includes(addon) ? "#fff" : "#656565"}
            sx={{ fontSize: "10px" }}
          >
            {addon.description}
          </Typography>
        </ButtonTitle>
        <Typography
          variant="h6"
          gutterBottom
          color={selected.includes(addon) ? "#fff" : "#000"}
          sx={{
            marginLeft: "20px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {planContext?.type === "monthly"
            ? addon.monthlyPrice
            : addon.yearlyPrice}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AddOnCard;
