import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import PrimaryButton from "../../components/Custom/PrimaryButton/PrimaryButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SubsidyBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 4,
        mb: 5,
        px: 4,
        py: 4,
        backgroundColor: "primary.main",
        borderRadius: 4.5,
        position: "relative",
        "@media (max-width: 600px)": {
          margin: "1rem",
          py: 2,
          px: 2,
        },
      }}
    >
      <Avatar
        src="https://solruf.s3.ap-south-1.amazonaws.com/Group+1864.svg"
        alt="save icon"
        sx={{
          position: "absolute",
          width: "240px",
          height: "240px",
          left: "100px",
          borderRadius: "0",
          top: "-27px",
          "@media (max-width: 900px)": {
            position: "static",
            width: "150px",
            height: "150px",
            marginRight: "1rem",
          },
          "@media (max-width: 600px)": {
            position: "static",
            width: "100px",
            height: "100px",
            marginRight: "1rem",
          },
        }}
      />

      <Box
        sx={{
          width: "60%",
          "@media (max-width: 900px)": {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: 1.5,
        }}
      >
        <Typography
          sx={{
            color: "primary.dark",
            fontWeight: 600,
            fontSize: ["1.1rem", "2rem"],
          }}
        >
          Subsidy Scheme on Solar Panel is also available.
        </Typography>
        <PrimaryButton
          sx={{
            backgroundColor: "primary.dark",
            color: "primary.main",
            borderRadius: "36px",
            padding: "0.8rem 1.8rem",
            fontWeight: "600",
            fontSize: "1rem",
            "@media (max-width: 600px)": {
              fontSize: "1rem",
              padding: "0.6rem 1.5rem",
            },
            "&:hover": {
              backgroundColor: "#000000",
            },
          }}
          IconEnd={NavigateNextIcon}
        >
          Apply Now
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default SubsidyBox;
