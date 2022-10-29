import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import MailSentSvg from "../../media/Svg/MailSent.svg";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100%",
  width: "100%",
}));

const Success = () => {
  return (
    <Wrapper>
      <Box
        sx={{
          "@media (max-width: 600px)": {
            width: "70%",
          },
        }}
      >
        <img
          style={{
            width: "100%",
          }}
          src={MailSentSvg}
          alt="enquiry sent"
        />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", mt: 3 }}>
        Enquiry Sent!
      </Typography>
      <Typography
        sx={{
          mt: 2,
          mb: 5,
          fontSize: "1.5rem",
          display: { xs: "block", sm: "none" },
          textAlign: "center",
        }}
      >
        We will Provide you with the bids from
        <br /> 10 best Vendors in 60 min
      </Typography>
      <Typography
        sx={{
          mt: 2,
          mb: 5,
          fontSize: "1.5rem",
          display: { xs: "none", sm: "block" },
        }}
      >
        We will Provide you with the bids <br />
        from 10 best Vendors in 60 min
      </Typography>
    </Wrapper>
  );
};

export default Success;
