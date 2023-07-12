import { useFormWizardContext } from "@/app/contexts/FormWizardContext";
import { steps } from "@/app/helpers/constants";
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

const StepperDesktop = () => {
  const { currentStep, totalSteps, goToStep, getStep } = useFormWizardContext();

  return (
    <Box sx={FormNavigation}>
      <StepSection>
        <Stepper
          activeStep={currentStep.id}
          nonLinear
          orientation="vertical"
          sx={{
            color: "#fff",
            ".MuiStepConnector-lineVertical": {
              border: "none",
            },
          }}
        >
          {[...Array(totalSteps)].map((__, index: number) => (
            <Step
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <StepButtonCustom
                disabled={!getStep(index).visited}
                onClick={() => goToStep(index)}
                sx={{
                  color: "secondary.main",
                  width: "auto",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="subtitle2"
                    color="#7d78ff"
                    sx={{ fontFamily: "Ubuntu-reg" }}
                  >
                    STEP {index + 1}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="#fff"
                    sx={{ fontFamily: "Ubuntu-bold" }}
                  >
                    {steps[index].name}
                  </Typography>
                </Box>
              </StepButtonCustom>
            </Step>
          ))}
        </Stepper>
      </StepSection>
    </Box>
  );
};

export default StepperDesktop;
