import { Typography } from "@mui/material";
import React from "react";
import { CardsWrapper, Wrapper } from "./AdvisorsStyle";

import AdvisorCard from "./AdvisorCard";

const Advisors = () => {
  return (
    <Wrapper>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        Our Advisors
      </Typography>
      <CardsWrapper>
        <AdvisorCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/anuj.jpeg"
          }
          name="Anuj Sharma"
          position="Founder @ ALSiSAR IMPACT"
          description="Catalysing Social Entrepreneurship for a more equitable world"
          linkedinUrl={"https://www.linkedin.com/in/anujgsharma/"}
        />
        <AdvisorCard
          image={
            "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Team/rajen.jpeg"
          }
          name="Rajen Ahuja"
          position="Business Head - New Commerce @ Purplle"
          description="Social Commerce Expert | Ex Co-founder, Frendy | Ex-OLX, Avon, Revlon, FICCI"
          linkedinUrl={"https://www.linkedin.com/in/rajenahuja/"}
        />
      </CardsWrapper>
    </Wrapper>
  );
};

export default Advisors;
