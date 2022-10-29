import { Box, styled } from "@mui/material";

export const LeadFormWrapper = styled(Box)(({ theme }) => ({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  rowGap: "1rem",
  "@media (max-width: 600px)": {
    rowGap: "0.5rem",
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({}));

export const ThanksWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  rowGap: "1rem",
  "@media (max-width: 600px)": {
    rowGap: "0.5rem",
  },
  padding: "3rem",
}));

export const Background = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  top: "0",
}));

export const EnquiryMSItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
  alignItems: "center",
  padding: "1rem",
  width: "10rem",
  height: "11rem",
  borderRadius: "8px",
  rowGap: "0.8rem",
  "@media (max-width: 600px)": {
    width: "8rem",
    height: "9rem",
    borderRadius: "8px",
    rowGap: "0.3rem",
  },

  "& .MuiSvgIcon-root": {
    border: "0.5px solid #D8D8D8",
    background: "white",
    borderRadius: "5px",
  },
  position: "relative",
}));

export const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const ActionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  columnGap: "1.5rem",
  marginTop: "2rem",
}));

export const RowWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  columnGap: "1rem",
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "1rem",
  padding: "1rem",
  "@media (max-width: 600px)": {
    padding: "0.3rem",
    rowGap: "0.5rem",
  },
}));

export const SendWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "2.5rem",
  padding: "1rem",
  "@media (max-width: 600px)": {
    display: "none",
  },
}));
