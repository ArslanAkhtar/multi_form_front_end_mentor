import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Button,
} from "../../lib/mui";
import { styled } from "@mui/system";
import { FormDataProps, type Plan } from "../helpers/types";
import PlanCard from "./PlanCard";

import { plans } from "../helpers/constants";

import { useMyContext } from "../contexts/AppContext";

const FormContainer = styled("div")({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const CardWrapper = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});

const SelectPlan = ({
  activeStep,
  totalSteps,
  handleBack,
  handleNext,
}: FormDataProps) => {
  const { planContext, setPlanContext, setAddOnsContext } = useMyContext();
  const [selectedType, setSelectedType] = useState<string | undefined>(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (planContext !== null) {
      setSelectedType(planContext.type);
      setSelectedPlan(planContext);
    }
  }, [planContext]);

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setSelectedType(newType);
    setSelectedPlan(null);
    setAddOnsContext([]);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setError(false);
  };

  const onSubmit = () => {
    if (selectedPlan === null) {
      setError(true);
      return;
    }
    setPlanContext(selectedPlan);
    handleNext();
  };

  return (
    <FormContainer>
      <Box>
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
                  selectedPlan={selectedPlan}
                  selectedType={selectedType}
                  onSelect={handleSelectPlan}
                />
              ))}
            </CardWrapper>
            {error && (
              <Typography sx={{ mt: 2 }} color="error">
                Please select any plan
              </Typography>
            )}
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
              onClick={onSubmit}
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

export default SelectPlan;
