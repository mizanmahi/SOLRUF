import { Box } from "@mui/material";
import styled from "styled-components";

export const TWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "1rem",
  margin: "4rem 0",
}));

export const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "flex-start",
  width: "255px",
  height: "320px",
  padding: "0.7rem",
  rowGap: "5px",
  position: "absolute",
  top: "80px",
}));

export const CardsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  overflowX: "auto",
  overflowY: "hidden",
  alignItems: "center",
  columnGap: "2rem",
  width: "100%",
  paddingBottom: "1rem",
}));

export const CardContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  width: "100%",
  height: "100%",
  rowGap: "5px",
}));

export const SocialLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  columnGap: "1rem",
  justifyContent: "center",
  width: "100%",
  overflow: "hidden",
}));
