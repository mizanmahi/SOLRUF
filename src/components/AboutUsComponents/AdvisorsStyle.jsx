import { Box } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "4rem",
  width: "100%",
  padding: "1rem",
  margin: "4rem 0",
}));

export const CardsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  "@media (max-width: 600px)": {
    justifyContent: "start",
  },
  overflowX: "auto",
  alignItems: "center",
  columnGap: "2rem",
  width: "100%",
  paddingBottom: "1rem",
}));

export const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "flex-start",
  background: "#FFFFFF",
  border: "1px solid #FFD05B",
  borderRadius: "18px",
  width: "300px",
  position: "relative",
  height: "470px",
  overflow: "hidden",
}));

export const CardContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "flex-start",
  width: "100%",
  padding: "1rem",
  height: "100%",
}));
