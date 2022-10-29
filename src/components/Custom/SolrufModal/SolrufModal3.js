import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material";
// import { motion } from "framer-motion";

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "800px",
  bgcolor: "background.paper",
  boxShadow: 24,
  position: "relative",
  border: "1px solid #ffd05b",
  borderRadius: "12px",
  overflow: "hidden",
};

const CloseIconBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 5,
  right: "8px",
  background: "#efefef",
  borderRadius: "50%",
  height: "25px",
  width: "25px",
  padding: "5px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    background: "#ddd",
  },
}));

const SolrufModal3 = ({ children, open, onClose, sx }) => {
  //   const gifYouUp = {
  //     hidden: {
  //       opacity: 0,
  //       scale: 0,
  //     },
  //     visible: {
  //       opacity: 1,
  //       scale: 1,
  //       transition: {
  //         duration: 0.2,
  //         ease: "easeIn",
  //       },
  //     },
  //     exit: {
  //       opacity: 0,
  //       scale: 0,
  //       transition: {
  //         duration: 0.15,
  //         ease: "easeOut",
  //       },
  //     },
  //   };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          mx: 1,
        }}
      >
        <Box
          //  component={motion.div}
          //  variants={gifYouUp}
          //  initial="hidden"
          //  animate="visible"
          //  exit="exit"
          sx={{ ...style, ...sx }}
        >
          <CloseIconBox onClick={onClose}>
            <CloseIcon sx={{ fontSize: "1.3rem" }} />
          </CloseIconBox>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default SolrufModal3;
