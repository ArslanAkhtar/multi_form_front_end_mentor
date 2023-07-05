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
import { FormDataProps, Wizard, type Plan } from "../helpers/types";
import PlanCard from "./PlanCard";

import { plans } from "../helpers/constants";

import { useFormWizardContext } from "../contexts/FormWizardContext";

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
  gap: "20px",

  "@media (max-width:600px)": {
    flexDirection: "column",
  },
});

const SelectPlan = ({
  activeStep,
  totalSteps,
  handleBack,
  handleNext,
}: FormDataProps) => {
  const {
    planContext,
    setPlanContext,
    setAddOnsContext,
    wizards,
    setCompletedWizards,
  } = useFormWizardContext();
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

    const updatedSteps = wizards.map((step: Wizard) =>
      step.name === "ADD-ONS" ? { ...step, locked: false } : step
    );
    setCompletedWizards(updatedSteps);

    setPlanContext(selectedPlan);
    handleNext();
  };

  const NavigationContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    mb: "10px",
    mt: "20px",

    "@media (max-width:600px)": {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: "20px",
      backgroundColor: "#fff",
      marginBottom: 0,
    },
  };

  const ToggleWrapper = {
    mt: 2,
    mb: 4,
    "@media (max-width:600px)": {
      mt: 1,
      mb: 2,
    },
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
              sx={ToggleWrapper}
            >
              <ToggleButton value="monthly">Monthly</ToggleButton>
              <ToggleButton value="yearly">Yearly</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <Box sx={NavigationContainer}>
        {activeStep !== totalSteps && (
          <>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              disabled={activeStep === totalSteps}
              onClick={onSubmit}
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
