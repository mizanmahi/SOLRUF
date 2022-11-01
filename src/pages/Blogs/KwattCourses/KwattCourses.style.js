import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  padding: "1rem 0",
}));
export const KwattLogoWrapper = styled(Box)(({ theme }) => ({
  background: "white",
  padding: "1rem",
  borderRadius: "14px",
  width: "20rem",
  "@media (max-width: 900px)": {
    width: "15rem",
  },
  transform: "translateY(-4rem)",
}));

export const CarouselWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "250px",
  backgroundSize: "cover",
  borderRadius: "6px",
  marginTop: "2rem",
}));

export const CarouselContentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.45)",
  borderRadius: "6px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const PoweredByWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  right: "5px",
  bottom: "5px",
  "@media (max-width: 600px)": {
    left: "0%",
  },
}));
