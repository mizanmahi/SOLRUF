import { KeyboardBackspace } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Typography } from "antd";
import React from "react";

const PolicyDialog = ({
  modalTopBackButtonStyle,
  setShowPolicyDialog,
  paraStyle,
  portfolio,
}) => {
  return (
    <Box>
      <Box
        sx={modalTopBackButtonStyle}
        onClick={() => setShowPolicyDialog(false)}
      >
        <KeyboardBackspace />
        <Box>Back</Box>
      </Box>
      <Box sx={{ bgColor: "#F3F3F3", px: 3 }}>
        <Box>
          <img
            src="https://res.cloudinary.com/dpfoirokh/image/upload/v1656264426/8590_1_fdgn0z.svg"
            alt=""
            style={{ maxWidth: "100%" }}
          />
        </Box>
        <Box style={paraStyle}>
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            After Sale And Service Policy
          </Typography>
          <Typography
            sx={{
              mt: 2,
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {portfolio.return_policy}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PolicyDialog;
