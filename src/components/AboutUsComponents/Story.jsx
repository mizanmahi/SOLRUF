import { Typography } from "@mui/material";
import React from "react";
import { ContentWrapper, Wrapper } from "./StoryStyle";

const Story = () => {
  return (
    <Wrapper>
      <img
        style={{
          borderRadius: "1.4rem",
          width: "50%",
        }}
        className="story-image"
        src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/vision.jpg"
        alt=""
      />
      <ContentWrapper>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Our Vision
        </Typography>
        <img
          style={{
            borderRadius: "1.4rem",
            width: "100%",
          }}
          className="story-mobile-image"
          src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/vision.jpg"
          alt=""
        />

        <Typography
          variant="p"
          sx={{
            fontSize: "1.2rem",
            "@media (max-width: 400px)": {
              fontSize: "1.1rem",
            },
          }}
        >
          Solruf is a B2B solar marketplace where solar installers can instantly
          create & share their business portfolios, get quality leads and
          procure products directly from verified manufacturers/distributors. We
          aim to enable access and build solar infrastructure for the transition
          to clean energy for the next billion consumers.
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "1.2rem",
            "@media (max-width: 400px)": {
              fontSize: "1.1rem",
            },
          }}
        >
          In the rapidly developing solar industry, installers need simplified
          communication with customers & referrals to provide premium quality of
          services and grow their business. Solar businesses require nationwide
          access of certified vendors and last-mile delivery on purchases to
          improve their profit margins.
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "1.2rem",
            "@media (max-width: 400px)": {
              fontSize: "1.1rem",
            },
          }}
        >
          With Solruf, Solar installers can expand their business 9X by their
          solar specialised portfolios & get 10 verified vendor bids within 60
          min of their product enquiry for procurement. convenience.
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "1.2rem",
            "@media (max-width: 400px)": {
              fontSize: "1.1rem",
            },
          }}
        >
          Our Mission is to fast-track progress to the greener future by
          providing access to clean energy products and services with strong
          focus on price and
        </Typography>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Story;
