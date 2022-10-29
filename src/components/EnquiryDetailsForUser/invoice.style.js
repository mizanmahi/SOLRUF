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
  gap: "1rem",
  display: "none",
  flexDirection: "column",
  alignItems: "flex-end",
  border: "1px solid rgba(0,0,0,0.2)",
  "@media (max-width: 600px)": { border: "0" },
  marginTop: "-1px",
  marginLeft: "-1px",
  margin: "2rem",
}));

export const CompanyWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

export const InvoiceDetailsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
}));

export const RowWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

export const AboutBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  width: "100%",
  fontSize: "0.7rem",
}));

export const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "600",
  border: "1px solid black",
  padding: "0.5rem",
  fontSize: "0.7rem",
}));

export const Cell = styled(TableCell)(({ theme }) => ({
  border: "1px solid black",
  padding: "0.5rem",
  fontSize: "0.8rem",
}));

export const PageWrapper = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0,0,0,0.2)",
  margin: "2rem",
}));

export const AmountWordsWrapper = styled(Box)(({ theme }) => ({
  borderTop: "1px solid rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "4rem",
  rowGap: "1rem",
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
  padding: "0.5rem",
  rowGap: "0.5rem",
}));

export const StripWrapper = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0,0,0,0.2)",
  borderLeft: "0",
  borderRight: "0",
  textAlign: "center",
  width: "100%",
}));
