import { Box, Typography } from "@mui/material";
import React from "react";
import { CardContentWrapper, CardWrapper } from "./AdvisorsStyle";
import { LinkedIn } from "@mui/icons-material";

const AdvisorCard = ({ image, name, position, description, linkedinUrl }) => {
  return (
    <Box>
      <CardWrapper>
        <a
          style={{
            color: "#0A66C2",
            position: "absolute",
            zIndex: "1",
            top: "260px",
            right: "5px",
          }}
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn style={{ fontSize: "2rem" }} />
        </a>
        <img style={{ width: "100%" }} src={image} alt="" />
        <div
          style={{
            width: "100%",
            height: "50px",
            background: "linear-gradient(to top, white , transparent)",
            position: "absolute",
            top: "250px",
          }}
        />
        <CardContentWrapper>
          <Typography
            variant="p"
            sx={{ fontWeight: "600", fontSize: "1.1rem" }}
          >
            {name}
          </Typography>
          <Typography variant="p" sx={{ fontWeight: "500", fontSize: "1rem" }}>
            {position}
          </Typography>
          <Typography variant="p">{description}</Typography>
        </CardContentWrapper>
      </CardWrapper>
    </Box>
  );
};

export default AdvisorCard;
