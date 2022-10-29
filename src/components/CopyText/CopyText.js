import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { nodeURL } from "../../utils/axiosInstance";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  width: "100%",
  maxWidth: "500px",
  borderRadius: "4px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  overflow: "hidden",
  background: "#ffffff",

  "@media (max-width: 600px)": {},
}));

const TextToBeCopied = styled(Typography)(({ theme }) => ({
  flex: 4,
  overflow: "hidden",
  textWrapping: "wrap",
  whiteSpace: "nowrap",
  padding: "10px",
  "@media (max-width: 400px)": {
    fontSize: "0.8rem",
  },
}));

const Copy = styled(Typography)(({ theme, copied }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#FFD05A",
  cursor: "pointer",
  whiteSpace: "nowrap",
  color: copied ? "#507041" : "#444",
  "&:hover": {
    background: "#FFD05A",
    color: copied ? "#507041" : "#000",
  },
}));

const CopyText = ({ title }) => {
  const [copied, setCopied] = useState(false);

  // const domain =
  //    process.env.NODE_ENV === 'development'
  //       ? 'http://localhost:3000/'
  //       : nodeURL;

  const url = `${nodeURL}${title}`;

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 6000);
    }
  }, [copied]);

  return (
    <Wrapper>
      <TextToBeCopied>
        {url.length > 45 ? url.slice(0, 45) + "..." : url}
      </TextToBeCopied>
      <Copy
        copied={copied}
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </Copy>
    </Wrapper>
  );
};

export default CopyText;
