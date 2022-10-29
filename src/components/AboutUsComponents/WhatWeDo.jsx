import { Typography } from "@mui/material";
import React from "react";
import { ContentWrapper } from "./WWDStyle";

const WhatWeDo = () => {
  return (
    <ContentWrapper>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        What we do?
      </Typography>
      <Typography
        variant="p"
        sx={{
          textAlign: "center",
          fontSize: "1.2rem",
          "@media (max-width: 400px)": {
            fontSize: "1.1rem",
          },
        }}
      >
        SOLRUF is India’s largest solar marketplace, supplying solar
        products/services sourced straight from first-class suppliers, along
        with government / private tender support. We only onboard certified
        manufacturers/distributors as vendors for cut-rate pricing on
        products/services. We digitize the end-to-end solar procurement process
        by enabling multiple vendors to bid on enquiries for the lowest pricing
        along with nationwide delivery.
      </Typography>
      <Typography
        variant="p"
        sx={{
          textAlign: "center",
          fontSize: "1.2rem",
          "@media (max-width: 400px)": {
            fontSize: "1.1rem",
          },
        }}
      >
        Growth in the Indian solar industry due to the recent shift from fossil
        fuel to renewable energy policies has increased the demand for solar
        products trade and clean power generation. We aim to amplify and
        facilitate this process.We believe that encouraging simplified
        communication between buyer/seller along with widespread visibility for
        vendor offerings is the foundation for increasing solar adoption and
        promoting free trade in India.
      </Typography>
      <Typography
        variant="p"
        sx={{
          textAlign: "center",
          fontSize: "1.2rem",
          "@media (max-width: 400px)": {
            fontSize: "1.1rem",
          },
        }}
      >
        Our marketplace platform streamlines the technical specifications of
        solar products and develops curated vendor offerings for a personalized
        and accelerated shopping experience.We cater to all solar
        products/services required in the rooftop and ground-mounted solar
        installation categories. Through SOLRUF, solar installers would save
        time and resources on procurement, thereby improving the service
        quality.
      </Typography>
    </ContentWrapper>
  );
};

export default WhatWeDo;
