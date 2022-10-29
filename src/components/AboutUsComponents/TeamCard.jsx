import { Box, Typography } from "@mui/material";
import React from "react";
import { CardContentWrapper, CardWrapper, SocialLinks } from "./TeamStyle";
import { FacebookOutlined, Instagram, LinkedIn } from "@mui/icons-material";

const TeamCard = ({
  image,
  name,
  position,
  bio,
  linkedinUrl,
  facebookUrl,
  instagramUrl,
}) => {
  return (
    <Box sx={{ position: "relative", height: "400px" }}>
      <Box
        sx={{
          width: "255px",
          height: "320px",
          background: "white",
          boxShadow: "0px 0px 5px rgba(0, 0, 20, 0.2)",
          borderRadius: "10px",
          top: "80px",
          position: "relative",
        }}
      >
        <img
          style={{ width: "100%", top: "0" }}
          src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Cards/card-bg.svg"
          alt=""
        />
      </Box>
      <CardWrapper className="team-card">
        <img
          style={{ width: "100%", borderRadius: "10px" }}
          src={image}
          alt=""
        />
        <CardContentWrapper>
          <SocialLinks className="team-card_socials">
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                <LinkedIn style={{ color: "#0A66C2" }} />
              </a>
            )}
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noreferrer">
                <FacebookOutlined style={{ color: "#1877F2" }} />
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                <Instagram style={{ color: "#F40681" }} />
              </a>
            )}
          </SocialLinks>
          <Typography
            variant="p"
            sx={{
              fontWeight: "600",
              fontSize: "1rem",
              margin: "0",
              padding: "0",
              lineHeight: "1rem",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontWeight: "500",
              fontSize: "0.8rem",
              margin: "0",
              padding: "0",
              lineHeight: "1rem",
            }}
          >
            {position}
          </Typography>
          <Typography
            variant="p"
            sx={{
              textAlign: "center",
              fontSize: "0.8rem",
              margin: "0",
              padding: "0",
              lineHeight: "0.9rem",
              overflow: "hidden",
            }}
            className="team-card_bio"
          >
            {bio}
          </Typography>
        </CardContentWrapper>
      </CardWrapper>
    </Box>
  );
};

export default TeamCard;
