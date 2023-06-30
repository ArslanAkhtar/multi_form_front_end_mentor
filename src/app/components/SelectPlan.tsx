import { useState } from "react";
import {
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "../../lib/mui";
import { styled } from "@mui/system";
import { type Plan } from "../helpers/types";
import PlanCard from "./PlanCard";

import { plans } from "../helpers/constants";

const FormContainer = styled("div")({
  height: "100%",
  width: "100%",
});

const CardWrapper = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});

const SelectPlan = () => {
  const [selectedType, setSelectedType] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setSelectedType(newType);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        Select your plan
      </Typography>
      <Typography variant="subtitle2" color={"#656565"} gutterBottom>
        You have the option of monthly or yearly billing.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardWrapper>
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                plan={plan}
                selectedType={selectedType}
                onSelect={handleSelectPlan}
              />
            ))}
          </CardWrapper>
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            value={selectedType}
            exclusive
            onChange={handleTypeChange}
            aria-label="Plan Type Toggle"
            sx={{ mt: 2, mb: 4 }}
          >
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default SelectPlan;
