import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
// import Slide from "@mui/material/Slide";
import { Box, styled } from "@mui/system";
import ArrowBack from "@mui/icons-material/ArrowBack";

// import CloseIcon from '@mui/icons-material/Close';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const DialogHeader = styled(Box)(({ theme }) => ({
  background: "#D0D7D9",
  minHeight: "58px",
  position: "relative",
  display: "flex",
  //   justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: "10px",
  //   "& svg": {
  //     position: "absolute",
  //     top: "20%",
  //     left: "0",
  //     fontSize: "30px",
  //     cursor: "pointer",
  //     color: "rgba(0,0,0,0.8)",
  //   },
}));

export default function FullScreenDialog({
  handleClose,
  open,
  height = "100%",
  top="0",
  bar = false,
  sx,
  children,
  text,
  backText,
}) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      // TransitionComponent={Transition}
      hideBackdrop={true}
      sx={{
        "& .MuiDialog-paper": {
          height: height,
          top:top,
          background: "#f2f0f0",
          //   borderRadius: "22px 22px 0 0",
          //   padding: "20px 20px 0px 20px",
        },
        "& .MuiDialog-container": { alignItems: "flex-end" },
        ...sx,
      }}
    >
      <DialogHeader>
        <ArrowBack sx={{ marginRight: "10px" }} onClick={handleClose} />
        <Typography variant="h6">{backText}</Typography>
      </DialogHeader>
      {/* <Box
        sx={{ width: "100%", height: "1px", border: "1px solid black" }}
      ></Box> */}
      {children}
    </Dialog>
  );
}
