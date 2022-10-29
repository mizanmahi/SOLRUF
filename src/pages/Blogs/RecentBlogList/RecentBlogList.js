import { Box, Divider, styled, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import YellowButton from "../../../components/YellowButton/YellowButton";

const RecentBlogsList = styled(Box)(({ theme }) => ({
  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
  borderRadius: "10px",
  padding: "1rem",
  background: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0px",
  },
}));

const SingleBlogList = styled(Box)(({ theme }) => ({
  "& a": {
    color: "#000000",
    textDecoration: "none",
  },
}));

const RecentBlogList = () => {
  return (
    <RecentBlogsList>
      <SingleBlogList>
        <Typography sx={{ fontWeight: "bold", m: 0 }} variant="h6">
          Solar Products
        </Typography>
        <Typography sx={{ my: 1 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
          nostrum.
        </Typography>
        <Link to="/blogs/solarProducts">
          <YellowButton>Read More</YellowButton>
        </Link>
      </SingleBlogList>
      <Divider sx={{ my: 2 }} />
      <SingleBlogList>
        <Typography sx={{ fontWeight: "bold", m: 0 }} variant="h6">
          Solar Design
        </Typography>
        <Typography sx={{ my: 1 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
          nostrum.
        </Typography>
        <Link to="/blogs/solarDesign">
          <YellowButton>Read More</YellowButton>
        </Link>
      </SingleBlogList>
      <Divider sx={{ my: 2 }} />

      <SingleBlogList>
        <Typography sx={{ fontWeight: "bold", m: 0 }} variant="h6">
          Net Metering
        </Typography>
        <Typography sx={{ my: 1 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
          nostrum.
        </Typography>
        <Link to="/blogs/netMetering">
          <YellowButton>Read More</YellowButton>
        </Link>
      </SingleBlogList>
    </RecentBlogsList>
  );
};

export default RecentBlogList;
