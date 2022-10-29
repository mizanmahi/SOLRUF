import { Accordion, styled } from "@mui/material";
import React from "react";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomizedAccordion = styled(Accordion)(({ theme }) => ({
  background: "transparent",
  "&::before": {
    background: "transparent",
  },
  "& .MuiButtonBase-root": {
    background: theme.palette.secondary.light,
    borderRadius: "12px",
    padding: "0.2rem .8rem",
    border: 0,
  },
  "& .Mui-expanded": {
    background: "#ffd05b",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0px",
  },
}));

const CustomAccordionForBlogs = ({
  children,
  title,
  noPadding,
  open,
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
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: noPadding ? "1rem 0" : "8px 16px 16px",
          background: "#F3F3F3",
        }}
      >
        {children}
      </AccordionDetails>
    </CustomizedAccordion>
  );
};

export default CustomAccordionForBlogs;
