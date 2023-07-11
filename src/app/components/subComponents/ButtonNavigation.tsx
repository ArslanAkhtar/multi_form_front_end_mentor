import { Box, Button } from "@/lib/mui";
import { useFormWizardContext } from "../../contexts/FormWizardContext";

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

const ButtonNavigation = () => {
  const { currentStep, totalSteps, previousStep } = useFormWizardContext();

  return (
    <Box sx={NavigationContainer}>
      {currentStep.id !== totalSteps && (
        <>
          <Button
            color="inherit"
            disabled={currentStep.id === 0}
            onClick={previousStep}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={currentStep.id === totalSteps}
          >
            {currentStep.id === totalSteps - 1 ? "Confirm" : "Next"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default ButtonNavigation;
