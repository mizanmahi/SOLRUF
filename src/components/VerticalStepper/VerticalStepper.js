import * as React from "react";
import Box from "@mui/material/Box";

import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Wrapper = styled(Box)(({ theme }) => ({
  background: "#ffffff",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  padding: "1rem 1.5rem",
  margin: "2rem 0",
  position: "sticky",
  top: "154px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StepBox = styled(Box)(({ theme }) => ({
  borderLeft: ".5rem solid #D0D7D9",
  borderRadius: "8px",
  padding: ".7rem 0",
}));

const Step = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "2rem",
  marginLeft: "-1rem",
  "& a": {
    marginLeft: ".7rem",
    fontSize: "1.2rem",
    color: "#666f73",
    textDecoration: "none",
  },
  "&:last-child": {
    marginBottom: 0,
  },
}));

const Circle = styled(Box)(({ theme }) => ({
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
  background: "#666f73",
  boxSizing: "content-box",
  flexShrink: 0,
}));

const VerticalStepper = () => {
  const { scrollSteps } = useSelector((state) => state.scrollSteps);
  console.log(scrollSteps);
  const [activeStep, setActiveStep] = useState({});

  useEffect(() => {
    setActiveStep(scrollSteps.find((step) => step.isInView));
  }, [scrollSteps]);

  console.log(activeStep);

  return (
    <Wrapper sx={{ maxWidth: 400 }}>
      <Typography
        fontWeight={600}
        sx={{ color: "#000000", mb: 1.5, fontSize: "1.3rem" }}
      >
        Chapters
      </Typography>
      <StepBox>
        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "panels" && activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "panels" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#panels">
            Solar Panels
          </Typography>
        </Step>

        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "inverters" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "inverters" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#inverters">
            SOLAR INVERTERS
          </Typography>
        </Step>

        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "batteries" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "batteries" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#batteries">
            SOLAR BATTERIES
          </Typography>
        </Step>

        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "lightningArrestor" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "lightningArrestor" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#lightningArrestor">
            LIGHTENING ARRESTORS
          </Typography>
        </Step>

        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "pvMeter" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "pvMeter" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#pvMeter">
            PV METER
          </Typography>
        </Step>
        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "netMeter" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "netMeter" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#netMeter">
            NET METER
          </Typography>
        </Step>

        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "cables&wires" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "cables&wires" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#cables&wires">
            CABLES & WIRES
          </Typography>
        </Step>
        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "solarJunction" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "solarJunction" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#solarJunction">
            SOLAR JUNCTION BOX
          </Typography>
        </Step>
        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "earthingKit" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "earthingKit" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#earthingKit">
            EARTHING KIT
          </Typography>
        </Step>

        <Step
          sx={{
            marginLeft:
              activeStep?.stepName === "chargeController" &&
              activeStep?.isInView === true
                ? "-20px"
                : "",
          }}
        >
          <Circle
            sx={{
              border:
                activeStep?.stepName === "chargeController" &&
                activeStep?.isInView === true
                  ? "4px solid #ffd05b"
                  : "",
            }}
          ></Circle>
          <Typography component="a" href="#chargeController">
            SOLAR CHARGE CONTROLLER
          </Typography>
        </Step>
      </StepBox>
    </Wrapper>
  );
};

export default VerticalStepper;
