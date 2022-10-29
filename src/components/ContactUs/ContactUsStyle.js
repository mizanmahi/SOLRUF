import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography } from "antd";

export const ContactUsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  "@media (max-width: 900px)": {
    alignItems: "center",
    flexDirection: "column",
  },
}));

export const ContactDetails = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "flex-start",
  rowGap: "2rem",
  marginLeft: "1rem",
  "@media (max-width: 900px)": {
    marginBottom: "1.5rem",
    marginLeft: "0",
  },
}));

export const Title = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  rowGap: "1.2rem",
}));

export const ContactList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textDecoration: "none",
  rowGap: "0.8rem",
}));

export const LinkListWithIcon = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  "&:hover": {
    color: theme.palette.primary.main,
  },
  textDecoration: "none",
  display: "flex",
  fontSize: "1.2rem",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  "@media (max-width: 600px)": {
    fontSize: "1rem",
  },
}));

export const SocialIcons = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  color: theme.palette.primary.light,
  columnGap: "1rem",
  '& a': {
    color: theme.palette.primary.light,
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  "@media (max-width: 900px)": {
    justifyContent: "center",
  },
}));

export const ContactForm = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "35rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  rowGap: "1.2rem",
  padding: "3rem 2rem",
  backgroundColor: theme.palette.primary.light,
  borderRadius: "8px",
}));

export const FormLabel = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
}));

export const FormField = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  rowGap: "0.5rem",
}));
