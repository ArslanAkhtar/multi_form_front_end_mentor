"use client";
import { styled } from "@mui/system";
import {
  Box,
  Container,
  Paper,
  Stepper,
  StepButton,
  Step,
} from "../../lib/mui";
import CopyRight from "./CopyRight";

import useStepper from "../customhooks/useStepper";
import { getStepContent } from "../helpers/helper";

import { useMyContext } from "../contexts/AppContext";
import { Wizard } from "../helpers/types";

const StepSection = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const FormWrapper = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
});

const Home = () => {
  const { activeStep, totalSteps, handleBack, handleNext, handleStep } =
    useStepper();

  const { wizards } = useMyContext();

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 6 }}>
        <Paper
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url('/assets/images/bg-sidebar-desktop.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              height: "500px",
              width: "50%",
            }}
          >
            <StepSection>
              <Stepper
                activeStep={activeStep}
                nonLinear
                orientation="vertical"
                sx={{
                  pt: 3,
                  pb: 5,
                  color: "#fff",
                }}
              >
                {wizards.map((item: Wizard, index: number) => (
                  <Step key={item.name}>
                    <StepButton
                      color="inherit"
                      disabled={item.locked}
                      onClick={handleStep(index)}
                      sx={{ color: "white" }}
                    >
                      {item.name}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </StepSection>
          </Box>

          <FormWrapper>
            {getStepContent(activeStep, totalSteps, handleBack, handleNext)}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            ></Box>
          </FormWrapper>
        </Paper>
        <CopyRight />
      </Container>
    </>
  );
};

export default Home;
