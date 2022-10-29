import React from "react";

import { Box, Typography, Card } from "@mui/material";
import { styled } from "@mui/system";

const ImageBox = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "contain",
  borderRadius: "10px",
}));

const StyledStepCards = styled(Card)(({ theme }) => ({
  background: "rgba(244, 240, 228, 0)",
  boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
  padding: "16px",
  display: "flex",
  alignItems: "center",
}));

const MarketplaceFeatureBlobs = ({
  featureImages,
  featureTitle,
  featureContent,
  order,
  imageOrder,
  textOrder,
  styledStepCardsXAlign,
  textXAlign,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      order={order}
      sx={{
        width: { xs: "100%", md: "34%", lg: "36%", xl: "40%" },
        height: { md: "420px" },
      }}
    >
      {featureTitle.map(
        (title, index) =>
          featureContent[index] &&
          featureImages[index] && (
            <StyledStepCards
              key={index}
              sx={{
                justifyContent: styledStepCardsXAlign,
                mx: { xs: "4px", md: "10px", xl: "12px" },
                marginBottom: {
                  xs: "8px",
                  sm: "6px",
                  md: "20px",
                  lg: "30px",
                },
                width: { xs: "360px", sm: "440px", md: "100%", lg: "90%" },
                height: {
                  xs: "120px",
                  sm: "110px",
                  md: "100px",
                  lg: "90px",
                },
              }}
            >
              <ImageBox
                src={featureImages[index]}
                sx={{
                  order: imageOrder,
                  height: { xs: "56px", sm: "52px", md: "58px" },
                  width: { xs: "56px", sm: "52px", md: "58px" },
                  objectFit: "contain",
                }}
              />
              <Box
                sx={{
                  order: textOrder,
                  display: "flex",
                  flexDirection: "column",
                  px: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  textAlign={textXAlign}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "80%",
                      md: "100%",
                    },
                    fontSize: { md: "14px", lg: "15px" },
                    lineHeight: { xs: "1.2" },
                    letterSpacing: { xs: "-0.6px", sm: "-0.2px" },
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  variant="body1"
                  fontWeight={500}
                  textAlign={textXAlign}
                  sx={{
                    mt: { xs: "6px", lg: "8px" },
                    width: {
                      xs: "100%",
                      sm: "75%",
                      md: "100%",
                    },
                    fontSize: { md: "12px", lg: "14px" },
                    lineHeight: { xs: "1.2" },
                    letterSpacing: { xs: "-0.5px", sm: "-0.2px" },
                  }}
                >
                  {featureContent[index]}
                </Typography>
              </Box>
            </StyledStepCards>
          )
      )}
    </Box>
  );
};

export default MarketplaceFeatureBlobs;
