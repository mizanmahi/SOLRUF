import React from "react";
import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const IntroSection = styled(Box)(({ theme }) => ({
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: "1.5rem",
  minHeight: "450px",
  marginBottom: "3.5rem",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "end",
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
  },
}));

const OverLay = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.3)",
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
}));

const SocialBox = styled(Box)(({ theme }) => ({
  //   position: "absolute",
  top: "40px",
  right: "40px",
  display: "flex",
  alignItems: "center",
  background: theme.palette.primary.main,
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  "& p": {
    marginRight: "1rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  "& svg": {
    marginRight: "1rem",
    fontSize: "2rem",
    "&:last-child": {
      marginRight: "0",
    },
  },
}));

const IntroTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#000000",
  //   position: "absolute",
  background: "#ffffff",
  borderRadius: "8px",
  padding: "0.5rem 1rem",
  zIndex: "1",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  width: "60%",
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    width: "80%",
  },
}));

const IntroTitle2 = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#000000",
  position: "absolute",
  bottom: "5%",
  right: "40px",
  // transform: 'translate(-50%, 50%)',
  background: "#ffffff",
  borderRadius: "8px",
  padding: "0.5rem 1rem",
  zIndex: "1",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "right",
  "@media (max-width: 600px)": {
    fontSize: "1.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    width: "80%",
  },
}));

const BlogIntroSection = ({
  title,
  backgroundImageUrl,
  subtitle,
  sx,
  icon,
}) => {
  return (
    <IntroSection
      sx={{
        ...sx,
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : "url(https://i.ibb.co/ZXMgkjT/image-6.png)",
      }}
    >
      <OverLay />
      <SocialBox>
        <Typography>Share</Typography>
        <TwitterIcon />
        <FacebookIcon />
        <LinkedInIcon />
        <InstagramIcon />
      </SocialBox>
      {!subtitle && <IntroTitle>{title.toUpperCase()}</IntroTitle>}
      {subtitle && (
        <IntroTitle2>
          {title} <br />
          {icon} {subtitle}
        </IntroTitle2>
      )}
    </IntroSection>
  );
};

export default BlogIntroSection;
