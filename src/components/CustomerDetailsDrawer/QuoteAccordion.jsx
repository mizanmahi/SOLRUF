import { Accordion, Box, IconButton, styled } from "@mui/material";
import React from "react";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import { NoteBox } from "../Custom/CustomAccordionForDrawer/customAccordionForDrawer.style";

const CustomizedAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  background: "transparent",
  "&::before": {
    background: "transparent",
  },
  "& .MuiAccordionSummary-root": {
    // background: theme.palette.secondary.light,
    background: "#ffffff",
    borderRadius: "10px 10px",
    padding: "0.5rem .8rem",
    border: 0,
    borderBottom: "1px solid #E5E5E5",
  },
  "& .Mui-expanded": {
    borderRadius: "10px 10px 0 0",
    //   background: '#ffd05b',
  },
}));

const QuoteAccordion = ({
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!note && (
            <Typography variant="h6" sx={{ fontWeight: 600, ...titleStyle }}>
              {title}{" "}
              {iconButton && iconButton === "edit" && (
                <IconButton>
                  <EditIcon fontSize="small" sx={{ color: "#666F73" }} />
                </IconButton>
              )}
              {iconButton && iconButton === "delete" && (
                <IconButton>
                  <DeleteIcon fontSize="small" sx={{ color: "#666F73" }} />
                </IconButton>
              )}
              {iconButton && iconButton === "reply" && (
                <IconButton>
                  <QuickreplyIcon fontSize="small" sx={{ color: "#666F73" }} />
                </IconButton>
              )}
            </Typography>
          )}
          {extentTitle && extentTitle}
          {note && (
            <>
              <NoteBox>
                <span>{note?.index + 1}</span>
                <Typography>{note?.item?.text}</Typography>
              </NoteBox>
            </>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: noPadding ? "1rem 0" : "8px 16px 16px",
          p: paddingOff && !pt ? 0 : pt ? ".5rem 0 0 0" : "8px 16px 16px",

          background: "#ffffff",
          borderRadius: "0 0 10px 10px",
        }}
      >
        {children}
      </AccordionDetails>
    </CustomizedAccordion>
  );
};

export default QuoteAccordion;
