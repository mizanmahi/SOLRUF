import { Grid, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Flex } from "../../pages/EnquiryPage/enquiryPage.style";
import isDev from "../../utils/process";
import { nodeURL } from "../../utils/axiosInstance";
import copyNew from "../../assets/copyNew.svg";

const Wrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(108.58deg, #F4F0E4 -22.48%, #FFD05B 49.85%)`,
  padding: theme.spacing(1),
  minWidth: "300px",
  borderRadius: theme.spacing(1),
}));

const UrlBox = styled(Box)(({ theme }) => ({
  background: "#edf4ff",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .url": {
    display: "flex",
    alignItems: "center",
    "& > svg": {
      marginRight: theme.spacing(1),
    },
  },
  position: "relative",
}));

const imageStyle = {
  marginTop: "-2.5rem",
  position: "absolute",
  left: 0,
  top: -10,
};

const CopyTextNew = ({ path, sx }) => {
  const [copied, setCopied] = useState(false);

  const domain = isDev() ? "http://localhost:3000/" : nodeURL;
  const url = `${domain}${path}`;

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  }, [copied]);

  return (
    <Wrapper sx={{ ...sx, mx: 0 }}>
      <Flex justifyContent={"center"} mb={2}>
        <Grid xs={4}>
          <img src={copyNew} style={imageStyle} alt="circle" />
        </Grid>
        <Grid xs={5}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "black",
              mb: 1,
              pl: 1,
              lineHeight: 1.1,
            }}
          >
            Share product link
          </Typography>
        </Grid>
      </Flex>
      <UrlBox>
        <Box className="url">
          <InsertLinkIcon />
          <Typography>
            {url.length > 60 ? url.slice(0, 60) + "..." : url}
          </Typography>
        </Box>
        <Box>
          <PrimaryButton
            sx={{
              px: 2,
              borderRadius: "8px",
              position: "absolute",
              height: "100%",
              right: "0",
              top: "0",
            }}
            onClick={() => {
              navigator.clipboard.writeText(url);
              setCopied(true);
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </PrimaryButton>
        </Box>
      </UrlBox>
    </Wrapper>
  );
};

export default CopyTextNew;
