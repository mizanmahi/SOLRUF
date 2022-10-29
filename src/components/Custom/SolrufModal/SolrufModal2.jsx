import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { styled, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  height: "100%",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  "@media (min-width: 600px)": {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "900px",
    borderRadius: "5px",
    height: "auto",
  },
};

const ModalTopBar = styled(Box)(({ theme }) => ({
  top: 0,
  padding: "0.3rem 0.8rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#D0D7D9",
  "@media (min-width: 600px)": {
    background: "#ffd05b",
    borderRadius: "5px 5px 0 0",
    boxShadow: "4px 4px 5px 0px rgba(0, 0, 0, 0.15)",
    padding: "0.7rem",
  },
}));

const SolrufModal2 = ({ children, open, onClose, sx, mobileTitle, title }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "@media (min-width: 600px)": { margin: "0 0.5rem" },
        }}
      >
        <Box sx={{ ...style, ...sx }}>
          <ModalTopBar>
            <Typography
              sx={{ "@media (max-width: 600px)": { display: "none" } }}
            ></Typography>
            <KeyboardBackspaceIcon
              sx={{
                fontSize: "1.5rem",
                cursor: "pointer",
                "@media (min-width: 600px)": { display: "none" },
              }}
              onClick={onClose}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "0.9rem",
                "@media (min-width: 600px)": { display: "none" },
              }}
            >
              {mobileTitle}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "0.9rem",
                "@media (max-width: 600px)": { display: "none" },
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{ "@media (min-width: 600px)": { display: "none" } }}
            ></Typography>
            <CloseIcon
              sx={{
                fontSize: "1.5rem",
                cursor: "pointer",
                "@media (max-width: 600px)": { display: "none" },
              }}
              onClick={onClose}
            />
          </ModalTopBar>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default SolrufModal2;
