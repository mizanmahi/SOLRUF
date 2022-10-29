import { KeyboardBackspace } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import CompanyModalContents from "../components/DashboardComponents/dashboardCompanyModalContents";

const AboutTextExpanded = ({
  modalTopBackButtonStyle,
  setAboutTextExpanded,
  videoUrl,
  portfolio,
  certificates,
}) => {
  return (
    <Box>
      <Box
        sx={modalTopBackButtonStyle}
        onClick={() => setAboutTextExpanded(false)}
      >
        <KeyboardBackspace />
        <Box>Back</Box>
      </Box>
      <CompanyModalContents
        portfolioData={{ ...portfolio, certificates }}
        videoUrl={videoUrl}
      />
    </Box>
  );
};

export default AboutTextExpanded;
