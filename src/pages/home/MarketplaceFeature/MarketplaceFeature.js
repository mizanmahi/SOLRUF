import React from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import MarketplaceFeatureBlobs from "./MarketplaceFeaturesBlobs";

const gif = [
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/mobile.gif",
];
const featureImagesLeft = [
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/marketplacea.png",
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/marketplaceb.png",
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/marketplacec.png",
];

const featureImagesRight = [
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/marketplaced.png",
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/marketplacee.png",
  "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/marketplacef.png",
];

const featureTitleLeft = [
  "PAN INDIA verified source suppliers",
  "Project scope based flexible product bookings",
  "Get top quality suppliers for your enquiry",
];

const featureTitleRight = [
  "Rooftop & ground-mounted solar products",
  "Curated & shareable supplier portfolios",
  "Timely & last-mile delivery",
];

const featureContentLeft = [
  "Across all product categories.",
  "With warranty & after-sales support.",
  "Through our specialized supplier recommendation system.",
];

const featureContentRight = [
  "Catering to all components used in a solar installation.",
  "Detailing their project expertise & real time product availability.",
  "At your project site.",
];

const ImageBox = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "contain",
  borderRadius: "10px",
}));

const MarketplaceFeature = () => {
  return (
    <Box
      sx={{
        background: "rgba(244, 240, 228, 0.5)",
        padding: "10px 0px 40px 0px",
        borderRadius: "10px",
        marginTop: "100px",
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight={600}
        sx={{ py: 4 }}
      >
        One-stop solar marketplace
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          width: "100%",
          margin: "0px",
          padding: "0px",
        }}
      >
        <MarketplaceFeatureBlobs
          featureImages={featureImagesLeft}
          featureTitle={featureTitleLeft}
          featureContent={featureContentLeft}
          order={{ xs: 2, sm: 2, md: 1, lg: 1, xl: 1 }}
          imageOrder={{ xs: 1, md: 2 }}
          textOrder={{ xs: 2, md: 1 }}
          styledStepCardsXAlign={{ xs: "center", md: "flex-end" }}
          textXAlign={{ xs: "left", sm: "left", md: "right" }}
        />

        {/* ImageBox */}
        <Box
          order={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
          sx={{
            mx: { xs: "auto", md: "auto", lg: "2px", xl: "12px" },
          }}
        >
          <ImageBox
            src={gif[0]}
            sx={{
              height: {
                xs: "420px",
                sm: "460px",
                md: "520px",
                lg: "520px",
              },
            }}
          />
        </Box>

        <MarketplaceFeatureBlobs
          featureImages={featureImagesRight}
          featureTitle={featureTitleRight}
          featureContent={featureContentRight}
          order={{ xs: 3, md: 3 }}
        />
      </Box>
    </Box>
  );
};

export default MarketplaceFeature;
