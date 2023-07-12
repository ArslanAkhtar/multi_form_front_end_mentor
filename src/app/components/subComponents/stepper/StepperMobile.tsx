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

const StepButtonCustom = styled(StepButton)({
  "& .MuiSvgIcon-root": {
    fontSize: "2.2rem",
    color: "transparent",
    border: "2px solid #bee1fd",
    borderRadius: "50%",

    "&.Mui-active": {
      color: "#bee1fd",
      border: "none",
      "& .MuiStepIcon-text": {
        fill: "#000",
      },
    },
  },
});

const StepperMobile = () => {
  const { totalSteps, getStep, goToStep, currentStep } = useFormWizardContext();

  return (
    <Box sx={FormNavigationMobile}>
      <StepSection>
        <Stepper
          activeStep={currentStep.id}
          nonLinear
          orientation="horizontal"
          sx={{
            pt: 3,
            pb: 5,
            color: "#fff",
            borderTop: "none",
          }}
        >
          {[...Array(totalSteps)].map((__, index: number) => (
            <Step key={index}>
              <StepButtonCustom
                color="inherit"
                disabled={!getStep(index).visited}
                onClick={() => goToStep(index)}
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
