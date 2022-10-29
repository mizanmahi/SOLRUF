import { Box } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: "100%",
  height: "35rem",
  "@media (max-width: 400px)": {
    height: "85vh",
  },
  overflow: "hidden",
}));

export const CarouselWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

export const BackgroundImgWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "35rem",
  "@media (max-width: 400px)": {
    height: "85vh",
  },
  overflow: "hidden",
}));

export const BackgroundImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  animationDuration: "10s",
  animationName: "zoom",
  animationIterationCount: "infinite",
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "2rem",
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.65)",
  padding: "4rem",
  "@media (max-width: 400px)": {
    padding: "1.5rem",
  },
  color: "#F3F3F3",
}));
