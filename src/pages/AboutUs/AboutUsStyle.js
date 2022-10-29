import { Box } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export const SpheresBackground = styled(Box)(({ theme }) => ({
  background: "#F3F3F3",
  position: "relative",
  overflow: "hidden",
}));

export const BlurBackground = styled(Box)(({ theme }) => ({
  backdropFilter: "blur(8px)",
}));

export const Sphere1 = styled(Box)(({ theme }) => ({
  width: "40rem",
  height: "40rem",
  borderRadius: "40rem",
  background:
    "linear-gradient(180deg, rgba(255, 208, 91, 0.65) 0%, rgba(208, 215, 217, 0) 100%)",
  filter: "blur(20px)",
  position: "absolute",
  transform: "translate(-18rem,-15rem)",
}));

export const Sphere2 = styled(Box)(({ theme }) => ({
  width: "40rem",
  height: "40rem",
  borderRadius: "40rem",
  position: "absolute",
  background:
    "linear-gradient(180deg, rgba(255, 208, 91, 0.65) 0%, rgba(208, 215, 217, 0) 100%)",
  filter: "blur(20px)",
  transform: "translate(18rem,100vh)",
  right: "0",
}));

export const Sphere3 = styled(Box)(({ theme }) => ({
  width: "40rem",
  height: "40rem",
  borderRadius: "40rem",
  position: "absolute",
  background:
    "linear-gradient(180deg, rgba(255, 208, 91, 0.65) 0%, rgba(208, 215, 217, 0) 100%)",
  filter: "blur(20px)",
  transform: "translate(-18rem,180vh)",
}));

export const Sphere4 = styled(Box)(({ theme }) => ({
  width: "40rem",
  height: "40rem",
  borderRadius: "40rem",
  position: "absolute",
  background:
    "linear-gradient(180deg, rgba(255, 208, 91, 0.65) 0%, rgba(208, 215, 217, 0) 100%)",
  filter: "blur(20px)",
  transform: "translate(25rem,280vh)",
  right: "0",
}));
