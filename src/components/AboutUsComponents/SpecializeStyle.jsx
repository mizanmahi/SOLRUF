import { Box } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  "@media (max-width: 800px)": {
    flexDirection: "column",
    rowGap: "2rem",
  },
  justifyContent: "center",
  alignItems: "center",
  columnGap: "4rem",
  width: "100%",
  padding: "4rem 1rem",
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "2rem",
  width: "100%",
  height: "100%",
}));

export const CardWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.5rem",
  width: "180px",
  height: "180px",
  background: "#4D4D4D",
  boxShadow: "0px 13px 40px rgba(0, 0, 0, 0.23)",
  borderRadius: "7px",
  overflow: "hidden",
  padding: "1rem",
}));

export const CardsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "3rem",
  width: "50%",
  position: "relative",
}));

export const CardsRow1 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "1rem",
  width: "100%",
}));

export const CardsRow2 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "1rem",
  width: "100%",
}));
