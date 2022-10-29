import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "2rem",
  "@media (max-width: 600px)": {
    height: "2.5rem",
  },
}));
