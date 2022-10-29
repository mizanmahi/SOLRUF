import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";
export const Portfolio = styled(Container)(({ theme }) => ({
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  background: "#ffffff",
  padding: theme.spacing(2),
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  minHeight: "337px",
  "@media (max-width: 1000px)": {
    flexDirection: "column",
    alignItems: "center",
  },
  "@media (max-width: 600px)": {
    padding: theme.spacing(1),
  },
}));

export const InstallerInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: ".5rem",
  "& svg": {
    marginRight: `${theme.spacing(0.5)}`,
  },
}));

export const Cards = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "2rem",
}));
export const DashboardCard = styled("div")(({ theme }) => ({
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(2),
  borderRadius: "10px",
  backgroundImage: "linear-gradient(to bottom, #FFD05B -100%, #f3f3f3)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "180px",
  width: "100%",
  maxWidth: "150px",
}));
export const Circle = styled("div")(({ theme }) => ({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background: "#ffd05b",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  backgroundImage: "linear-gradient(to bottom, #f3f3f3 -50%, #FFD05B)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const UpcomingMeetings = styled(Container)(({ theme }) => ({
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(2),
  borderRadius: "10px",
  background: "#ffffff",
  display: "none", // hide for now
}));

export const MeetingDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const TopDetailedImageBox = styled(Box)(({ theme }) => ({
  display: "block",
  marginTop: "4rem",
  "@media (max-width: 1000px)": {
    display: "none",
  },
}));

export const BottomDetailedImage = styled("div")(({ theme }) => ({
  display: "none",
  marginTop: "1rem",
  "@media (max-width: 1000px)": {
    display: "block",
  },
}));
