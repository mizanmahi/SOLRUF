import { Box, Chip, styled } from "@mui/material";

export const ServiceChip = styled(Chip)(({ theme }) => ({
  marginLeft: "0.5rem",
  marginBottom: "0.5rem",
  borderRadius: "0.25rem",
  backgroundColor: "#2448FC",
  fontWeight: 500,
  fontSize: "1.1rem",
  color: "#ffffff",
  "& .MuiSvgIcon-root": {
    color: "#ffffff",
    "&:hover": {
      color: "red",
    },
  },
}));

export const ExtraBox = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: "8px",
  marginTop: "1rem",
  boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.1)",
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
  padding: "1rem",
}));
