import { useFormWizardContext } from "@/app/contexts/FormWizardContext";
import { Wizard } from "@/app/helpers/types";
import { Box, Step, StepButton, Stepper, styled } from "@/lib/mui";

const StepSection = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const FormNavigationMobile = {
  backgroundImage: `url('/assets/images/bg-sidebar-mobile.svg')`,
  backgroundRepeat: "no-repeat",
  width: "100%",
  backgroundSize: "cover",
  height: "200px",
  position: "absolute",
  zIndex: 0,
  top: 0,
  left: 0,
};

const StepperMobile = () => {
  const { wizards, activeStep, handleStep } = useFormWizardContext();

  return (
    <Box sx={FormNavigationMobile}>
      <StepSection>
        <Stepper
          activeStep={activeStep}
          nonLinear
          orientation="horizontal"
          sx={{
            pt: 3,
            pb: 5,
            color: "#fff",
            borderTop: "none",
          }}
        >
          {wizards.map((item: Wizard, index: number) => (
            <Step key={item.name}>
              <StepButton
                color="inherit"
                disabled={item.locked}
                onClick={handleStep(index)}
                sx={{ color: "white" }}
              />
            </Step>
          ))}
        </Stepper>
      </StepSection>
    </Box>
  );
};

export default StepperMobile;
