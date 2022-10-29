import { Box, TableCell } from "@mui/material";
import styled from "styled-components";

export const Logo = styled(Box)(({ theme }) => ({
  "& img": {
    maxHeight: "70px",
    maxWidth: "200px",
  },
}));

export const InvoicePageWrapper = styled(Box)(({ theme }) => ({
  background: "#ffffff",
  width: "100%",
  display: "none",
  flexDirection: "column",
  border: "1px solid rgba(0,0,0,0.2)",
  "@media (max-width: 600px)": { border: "0" },

  margin: "2rem",
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "1rem",
}));

export const HeadingWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
}));

export const CompanyWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "0.5rem 8rem",
}));

export const InvoiceDetailsWrapper = styled(Box)(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "2rem",
}));

export const RowWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

export const AboutBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "0.5rem",
  fontSize: "0.7rem",
}));

export const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  borderTop: "3px solid #ffd05b",
  padding: "0.5rem",
  fontSize: "0.7rem",
  color: "#ffd05b",
  fontWeight: "bold",
}));

export const Cell = styled(TableCell)(({ theme }) => ({
  padding: "0.5rem",
  fontSize: "0.8rem",
}));

export const PageWrapper = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0,0,0,0.2)",
  margin: "2rem",
}));

export const AmountWordsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem",
  width: "100%",
  minHeight: "8rem",
  rowGap: "1rem",
}));

export const TotalWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  width: "100%",
  minHeight: "8rem",
  padding: "0.5rem",
}));

export const TCWrapper = styled(Box)(({ theme }) => ({
  borderTop: "1px solid rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "0.5rem",
}));

export const DeclarationWrapper = styled(Box)(({ theme }) => ({
  borderTop: "1px solid rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  rowGap: "0.5rem",
  padding: "0.5rem",
}));

export const StripWrapper = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0,0,0,0.2)",
  borderLeft: "0",
  borderRight: "0",
  textAlign: "center",
  width: "100%",
}));

export const SmallDetailBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  margin: "0",
  padding: "0.2rem",
  columnGap: "2rem",
}));
