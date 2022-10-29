import { Box, styled, Typography } from "@mui/material";
import React from "react";

const Wrapper = styled(Box)(({ theme }) => ({
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  position: "relative",
  marginTop: "4rem",
  flex: "1",
  width: { sm: "auto", xs: "100%" },
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0px",
  },
}));

const Title = styled(Box)(({ theme }) => ({
  // background: theme.palette.primary.main,
  padding: ".7rem 1rem",
  borderRadius: "7px",
  position: "absolute",
  top: "0",
  width: "fit-content",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "& p": {
    color: "#000000",
    fontSize: "1.4rem",
    fontWeight: "600",
    textAlign: "center",
  },
}));

const BlogTitledBox = ({ title, sx, variant, children }) => {
  const isSecondary = variant === "secondary";
  const isTertiary = variant === "tertiary";

  return (
    <Wrapper sx={{ ...sx, background: isSecondary ? "#D0D7D9" : "#ffffff" }}>
      <Title
        sx={{
          background: isSecondary ? "#ffffff" : "#ffd05b",
          border: isSecondary ? "2px solid #ffd05b" : "",
        }}
      >
        <Typography>{title}</Typography>
      </Title>

      {!isTertiary ? (
        <Typography sx={{ color: "#000000", mt: 2.5, textAlign: "center" }}>
          {children}
        </Typography>
      ) : (
        <Box sx={{ mt: 2 }}>{children}</Box>
      )}
    </Wrapper>
  );
};

export default BlogTitledBox;
