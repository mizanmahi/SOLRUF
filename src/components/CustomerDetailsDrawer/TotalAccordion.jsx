import { Accordion, Box, styled } from "@mui/material";
import React from "react";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomizedAccordion = styled(Accordion)(({ theme }) => ({
  "@media (min-width: 600px)": { display: "none" },
  background: "transparent",
  "&::before": {
    background: "transparent",
  },
  "& .MuiAccordionSummary-root": {
    background: theme.palette.primary.main,
    padding: "0 1rem",
    border: "0",
  },
  "& .Mui-expanded": {},
}));

const TotalAccordion = ({
  children,
  title,
  noPadding,
  allPaddingOff,
  paddingOff,
  open,
  titleStyle,
  pt,
  extentTitle,
  iconButton,
  note,
  ...rest
}) => {
  return (
    <CustomizedAccordion {...rest} disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ color: "#000000", fontSize: "2rem" }} />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, ...titleStyle }}>
            {title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: "0.3rem",
          boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          borderRadius: "0 0 10px 10px",
        }}
      >
        {children}
      </AccordionDetails>
    </CustomizedAccordion>
  );
};

export default TotalAccordion;
