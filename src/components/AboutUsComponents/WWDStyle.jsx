import { Box } from "@mui/material";
import styled from "styled-components";

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "2rem",
  width: "100%",
  height: "100%",
  padding: "4rem 1rem",
}));
