import { useFormWizardContext } from "@/app/contexts/FormWizardContext";
import { Wizard } from "@/app/helpers/types";
import { Box, Step, StepButton, Stepper, Typography, styled } from "@/lib/mui";

const StepSection = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const FormNavigation = {
  backgroundImage: `url('/assets/images/bg-sidebar-desktop.svg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  height: "500px",
  width: "50%",

  "@media (max-width:800px)": {
    backgroundSize: "cover",
    marginRight: "20px",
  },
};

const StepperDesktop = () => {
  const { wizards, activeStep, handleStep } = useFormWizardContext();

  return (
    <Box sx={FormNavigation}>
      <StepSection>
        <Stepper
          activeStep={activeStep}
          nonLinear
          orientation="vertical"
          sx={{
            color: "#fff",
            ".MuiStepConnector-lineVertical": {
              border: "none",
            },
          }}
        >
          {wizards.map((item: Wizard, index: number) => (
            <Step
              key={item.name}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <StepButton
                color="inherit"
                disabled={item.locked}
                onClick={handleStep(index)}
                sx={{
                  color: "white",
                  width: "auto",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle2" color="#7d78ff">
                  STEP {index + 1}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="#fff"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.name}
                </Typography>
              </Box>
            </Step>
          ))}
        </Stepper>
      </StepSection>
    </Box>
  );
};

export default StepperDesktop;
