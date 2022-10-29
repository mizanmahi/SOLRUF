import { Box } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  height: "100%",
}));

export const TotalContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "0.3rem 2rem",
  width: "100%",
  rowGap: "0.3rem",
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxHeight: "60vh",
  "@media (max-width: 600px)": { maxHeight: "80vh" },
  overflowY: "auto",
  marginTop: "1rem",
  rowGap: "1rem",
  padding: "1rem",
}));

export const ProductsContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: "40vh",
  maxHeight: "70vh",
  "@media (max-width: 600px)": { maxHeight: "75vh" },
  overflowY: "auto",
  marginTop: "1rem",
  padding: "1rem",
}));

export const ActionsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  width: "100%",
  columnGap: "1rem",
}));

export const ColumnWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  rowGap: "0.8rem",
}));

export const ProductsWrapper = styled(Box)(({ theme }) => ({
  flexDirection: "column",
  width: "100%",
  rowGap: "0.8rem",
  display: "none",
  "@media (max-width: 900px)": {
    display: "flex",
  },
}));

export const WrapWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "flex-start",

    rowGap: "0.5rem",
    columnGap: "0rem",
  },
  width: "100%",
  columnGap: "0.5rem",
}));

export const RowWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  columnGap: "0.5rem",
}));

export const PriceRowWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "center",
  columnGap: "10rem",
  "@media (max-width: 600px)": {
    columnGap: "4rem",
  },
}));

export const FileInputBox = styled(Box)(({ theme }) => {
  return {
    border: "2px solid #FFD05B",
    borderRadius: "8px",
    padding: "0.5rem",
    display: "flex",
    justifyContent: "center",
    columnGap: "1rem",
    alignItems: "center",
    position: "relative",
  };
});
