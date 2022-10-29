import { Button, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const Wrapper = styled(Box)(({ theme }) => ({
  background: "#ffffff",
  margin: "0 auto",
  width: "90%",
  borderRadius: "10px",
  position: "relative",
  boxSizing: "border-box",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "0 1.5rem 2rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    borderRadius: 0,
  },
}));

const TopLeftBox = styled(Box)(({ theme }) => ({
  border: "4px solid #ffd05b",
  background: "#f3f3f3",
  borderRadius: "10px",
  position: "absolute",
  padding: ".5rem",
  textAlign: "center",
  width: "30%",
  transform: "translateY(-50%)",
  left: "-5%",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  minHeight: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& p": {
    color: "#000",
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    width: "100%",
    transform: "translateY(-30%)",
    left: "1%",
  },
}));

const Flex = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "1.5rem",
  // flexWrap: 'nowrap',
  "& p": {
    color: "#000",
  },
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

const DownloadIconBox = styled(Box)(({ theme }) => ({
  flex: "2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "10px",
  },
}));

const DescriptionBox = styled(Box)(({ theme }) => ({
  flex: "6",
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  background: "#000000",
  color: "#ffffff",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  padding: ".4rem .5rem",

  "&:hover": {
    background: "#000000",
  },
}));

const DownloadFeatureBox = ({
  title,
  downloadButtonText,
  buttonUrl,
  description,
  children,
  sx,
}) => {
  return (
    <Box sx={{ mt: 9, ...sx }}>
      <Wrapper>
        <TopLeftBox>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {title}
          </Typography>
        </TopLeftBox>
        <Flex
          sx={{
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          <DownloadIconBox>
            <DownloadButton
              endIcon={<DownloadForOfflineIcon />}
              variant="contained"
            >
              {downloadButtonText}
            </DownloadButton>
          </DownloadIconBox>
          <DescriptionBox>
            <Typography>{description}</Typography>
          </DescriptionBox>
        </Flex>
        {children}
      </Wrapper>
    </Box>
  );
};

export default DownloadFeatureBox;
