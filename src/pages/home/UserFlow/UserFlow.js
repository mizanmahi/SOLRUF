import React from "react";

import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  StepConnector,
  Card,
} from "@mui/material";
import { styled } from "@mui/system";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const steps = ["Enquiry", "Get Bids", "Confirm Order"];
const stepsTitle = [
  "Instantly create a project scope based product enquiry.",
  "Get competitive vendor bids directly from manufacturers & distributors.",
  "Confirm best vendor bid & get timely delivery to your project site.",
];
const stepsContent = [
  [
    "Comprehensive product descriptions",
    "Custom filters for each product category",
    "Explore technical datasheets",
  ],
  [
    "Access Curated & shareable vendor business portfolios",
    "Receive bids within 60 min of enquiry",
    "Get Live product prices & stock availability from vendors",
  ],
  [
    "Make project scope based flexible bookings & purchases",
    "Safe & Last-mile delivery based on your project timeline",
    "Avail Hasslefree after-sales and warranty services.",
  ],
];

const stepsContentImages = [
  [
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/enquirya.png",
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/enquiryb.png",
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/enquiryc.png",
  ],
  [
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/bidsa.png",
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/bidsb.png",
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/bidsc.png",
  ],
  [
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/confirma.png",
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/confirmb.png",
    "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/confirmc.png",
  ],
];
const stepsImages = [
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/productImage.png",
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/bidImage.png",
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/deliverImage.png",
];

const ImageBox = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "contain",
  borderRadius: "10px",
}));

const DottedLine = styled(StepConnector)(({ theme }) => ({
  opacity: "0.3",
  // top: 10,
  // left: 'calc(-50% + 16px)',
  // right: 'calc(50% + 16px)',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  height: "44px",
  width: "44px",
  position: "absolute",
  top: "50%",
  backgroundColor: "#FEE7AC",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  color: "black",
}));

const StyledStepCards = styled(Card)(({ theme }) => ({
  padding: "12px",
  display: "flex",
  alignItems: "center",
  boxShadow: "0px 2px 12px rgba(22, 60, 158, 0.2)",
  borderRadius: "8px",
}));

const UserFlow = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % steps.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + steps.length) % steps.length
    );
  };

  const intervalRef = React.useRef();

  const autoSlideScroll = () => {
    intervalRef.current = setInterval(() => {
      if (true) {
        // clicked by user
        handleNext();
      }
    }, 3000);
    return () => clearInterval(intervalRef.current);
  };

  const stopAutoSlideScrollBack = () => {
    clearInterval(intervalRef.current);
    handleBack();

    setTimeout(() => {
      autoSlideScroll();
    }, 60000);
  };

  const stopAutoSlideScrollNext = () => {
    clearInterval(intervalRef.current);
    handleNext();

    setTimeout(() => {
      autoSlideScroll();
    }, 60000);
  };

  React.useEffect(autoSlideScroll, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        // backgroundColor: "#E9ECEF",
        padding: "10px 0px 40px 0px",
        borderRadius: "10px",
        marginTop: "100px",
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight={600}
        sx={{ py: 4, px: "10px" }}
      >
        Start procurement in 3 Simple Steps
      </Typography>
      {/*This is stepper box where we ARE showing our stepper and content. */}

      <Box>
        <Stepper
          nonLinear
          activeStep={activeStep}
          alternativeLabel
          connector={<DottedLine />}
        >
          {steps.map((label, index) => (
            <Step key={index} completed={activeStep > index}>
              <StepLabel>
                <Typography
                  variant="h6"
                  fontWeight={activeStep >= index ? 700 : 500}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: "50px",
          position: "relative",
          width: "80%",
        }}
      >
        <Box
          sx={{
            width: { md: "45%", xs: "100%" },
            marginBottom: { md: "0px", xs: "30px" },
            marginRight: { md: "20px", xs: "0px" },
          }}
        >
          <Box sx={{ height: "30px" }}></Box>

          <ImageBox
            src={stepsImages[activeStep]}
            sx={{ height: { xs: "250px", md: "400px" } }}
          />
        </Box>
        <Box sx={{ width: { md: "50%", xs: "100%" } }}>
          {/*This is stepper box where we WERE showing our stepper and content. */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "450px",
            }}
          >
            <Box sx={{ height: "30px" }}></Box>
            <Typography
              variant="h5"
              fontWeight={600}
              textAlign="left"
              sx={{
                height: { xs: "80px" },
                letterSpacing: { xs: "-1px", sm: "-0.2px" },
                "@media (max-width: 400px)": {
                  padding: "0 2rem",
                },
              }}
            >
              {stepsTitle[activeStep]}
            </Typography>
            <Box sx={{ height: "30px" }}></Box>
            <Typography
              variant="body1"
              sx={{
                marginLeft: { md: "24px" },
                mt: {
                  md: "0px",
                  xs: "20px",
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", lg: "600px", xl: "700px" },
                  display: "flex",
                  flex: { lg: "1 1 50%" },
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {stepsContent[activeStep].map(
                  (content, index) =>
                    stepsContentImages[activeStep][index] && (
                      <StyledStepCards
                        key={index}
                        sx={{
                          mx: { xs: "4px", md: "10px", xl: "12px" },
                          marginBottom: { xs: "20px" },
                          width: { xs: "320px", lg: "280px", xl: "320px" },
                          height: { xs: "74px" },
                        }}
                      >
                        <ImageBox
                          src={stepsContentImages[activeStep][index]}
                          sx={{
                            height: { xs: "34px", md: "42px" },
                            width: { xs: "34px", md: "42px" },
                            objectFit: "contain",
                          }}
                        />

                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{
                            padding: { xs: "8px" },
                          }}
                        >
                          {content}
                        </Typography>
                      </StyledStepCards>
                    )
                )}
              </Box>
            </Typography>
            <Box sx={{ height: "30px" }}></Box>
          </Box>
        </Box>

        <StyledIconButton
          aria-label="delete"
          sx={{
            left: { md: "-12%", xs: "-7%" },
            top: { xs: "52%" },
          }}
          onClick={stopAutoSlideScrollBack}
        >
          <ChevronLeftIcon />
        </StyledIconButton>
        <StyledIconButton
          aria-label="delete"
          sx={{
            right: { md: "-12%", xs: "-7%" },
            top: { xs: "52%" },
          }}
          onClick={stopAutoSlideScrollNext}
        >
          <ChevronRightIcon />
        </StyledIconButton>
      </Box>
    </Container>
  );
};

export default UserFlow;
