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
  alignItems: "center",
  border: "1.5px solid rgba(0,0,0,0.2)",
  "@media (max-width: 600px)": { border: "0" },

  margin: "2rem",
}));

export const CompanyWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: "1.5px solid rgb(0,0,0,0.5)",
  width: "50%",
}));

export const InvoiceDetailsWrapper = styled(Box)(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0",
}));

export const RowWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

export const AboutBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: "1.5px solid rgb(0,0,0,0.5)",
  width: "100%",
  fontSize: "0.7rem",
}));

export const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "600",
  border: "1.5px solid rgb(0,0,0,0.5)",
  padding: "0.5rem",
  fontSize: "0.7rem",
}));

export const Cell = styled(TableCell)(({ theme }) => ({
  border: "1.5px solid rgb(0,0,0,0.5)",
  padding: "0.5rem",
  fontSize: "0.8rem",
}));

export const PageWrapper = styled(Box)(({ theme }) => ({
  border: "1.5px solid rgba(0,0,0,0.2)",
  margin: "2rem",
}));

export const AmountWordsWrapper = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "8rem",
  rowGap: "1rem",
  padding: "0.5rem",
}));

export const TotalWrapper = styled(Box)(({ theme }) => ({
  border: "1.5px solid rgba(0,0,0,0.5)",
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
  borderTop: "1.5px solid rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  rowGap: "0.5rem",
  padding: "0.5rem",
}));

export const StripWrapper = styled(Box)(({ theme }) => ({
  border: "1.5px solid rgba(0,0,0,0.2)",
  borderLeft: "0",
  borderRight: "0",
  textAlign: "center",
  width: "100%",
}));

export const SmallDetailBox = styled(Box)(({ theme }) => ({
  border: "1.5px solid rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: "0",
  padding: "0.2rem",
}));
