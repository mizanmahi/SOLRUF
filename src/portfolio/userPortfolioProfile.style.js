import { Avatar, Box, Button, Tab, TextField, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { tooltipClasses } from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import { LocationMarkerIcon } from "@heroicons/react/outline";

export const CertificateList = styled("li")(({ theme }) => ({
  marginBottom: theme.spacing(1),
  "&::marker": {
    color: "#0339A6",
  },
  "& a": {
    fontWeight: 500,
    color: "#0339A6",
    fontSize: "1.1rem",
    "& svg": {
      width: "1rem",
      marginBottom: ".5rem",
      marginLeft: ".5rem",
    },
  },
}));

export const ConsultTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.primary.dark,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  width: "100%",
  marginTop: "1rem",
}));

export const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    //   color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    //   fontSize: theme.typography.pxToRem(12),
    //   border: '1px solid #dadde9',
    padding: 0,
    margin: 0,
  },
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  fontSize: ".8rem",
  "&.Mui-selected": {
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
}));

export const ProfilePhoto = styled(Box)(({ theme }) => ({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  "& img": {
    width: "100%",
  },
}));

export const MobileDescription = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3.9),
  bgcolor: "#D0D7D9",
  margin: `${theme.spacing(3.5)}px 0`,
  borderRadius: 2,
  border: 0,

  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  maxHeight: "400px",
  overflowY: "auto",
}));

export const CertificateButtonMobile = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.secondary.main,
  background: theme.palette.secondary.light,
  "&:hover": {
    background: theme.palette.primary.main,
    color: "#ffffff",
  },
}));

export const ConsultBookingHeader = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
    },
  };
});

export const ModalWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#D0D7D9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}));

export const useStyles = makeStyles((theme) => {
  return {
    bookingFormBox: {
      width: "100%",
      mx: "auto",
      padding: "2rem",
      background: "#f3f3f3",
      borderRadius: 10,
      margin: "2rem auto",
      position: "relative",
      transition: "all 0.9s ease-in-out",
      "@media (max-width: 600px)": {
        padding: "1.2rem",
        background: "transparent",
      },
    },

    closeBtn: {
      position: "absolute",
      top: "0.5rem",
      right: "0.5rem",
      cursor: "pointer",
      color: "#000",
      height: "2rem",
      fontWeight: "bold",
      transition: "all 0.3s ease-in-out",
      "@media (max-width: 600px)": {
        height: "1rem",
      },
    },
    phonePanel: {
      display: "flex",
      maxWidth: "400px",
      justifyContent: "space-around",
      background: (props) => (props.openPhonePanel ? "#FFD05B" : "#fff"),
      padding: theme.spacing(2),
      borderRadius: "10px",
      textAlign: "right",
      "@media (max-width: 600px)": {
        textAlign: "center",
        padding: ".5rem",
        marginRight: ".5rem",
      },
      alignItems: "flex-start",
      cursor: "pointer",
      border: "2px solid #000",
    },
    addressPanel: {
      display: "flex",
      maxWidth: "400px",
      justifyContent: "space-around",
      background: (props) => (props.openPhonePanel ? "#fff" : "#FFD05B"),
      padding: theme.spacing(2),
      borderRadius: "10px",
      textAlign: "right",
      "@media (max-width: 600px)": {
        textAlign: "center",
        padding: ".5rem",
      },
      alignItems: "flex-start",
      cursor: "pointer",
      border: "2px solid #000",
    },
    circle: {
      minWidth: 25,
      height: 25,
      borderRadius: "50%",
      background: (props) => (props.openPhonePanel ? "#000" : ""),
      border: "2px solid #000",
      display: "inline-block",
      "@media (max-width: 600px)": {
        height: 15,
        minWidth: 15,
      },
    },
    circle2: {
      background: (props) => (!props.openPhonePanel ? "#000" : ""),
      border: "2px solid #000",
      display: "inline-block",
      height: 25,
      minWidth: 25,
      borderRadius: "50%",
      "@media (max-width: 600px)": {
        height: 15,
        minWidth: 15,
      },
    },
  };
});

export const ProfileErrorWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "4px 0",
}));

export const InnerWrapper = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  maxWidth: "1536px",
  position: "relative",
}));

export const ProfileTopBox = styled(Box)(({ theme }) => ({
  background: "#ffffff",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
}));

export const StarsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
}));

export const ContactWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  columnGap: "2.5px",
}));

export const ServicesWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
}));

export const DescWrapper = styled(Box)(({ theme }) => ({
  background: "#D0D7D9",
  border: "3px solid #FFD05B",
}));

export const BrainIcon = styled(Avatar)(({ theme }) => ({
  width: "70px",
  height: "70px",
}));

export const LocationMarkIcon = styled(LocationMarkerIcon)(({ theme }) => ({
  height: "1.7rem",
  minHeight: "23px",
  minWidth: "23px",
  marginRight: "0.5rem",
}));

export const BookWrapper = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${"https://i.ibb.co/TWWwvwv/pexels-pixabay-356049-1.png"})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  boxShadow: "7px 7px 30px rgba(0, 0, 0, 0.13)",
}));
