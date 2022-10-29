import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { CheckIcon } from "@heroicons/react/outline";
import CloseIcon from "@mui/icons-material/Close";

const FileHeader = ({ file, onDelete, errors, progress, url, slider }) => {
  console.log(slider);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 0.5,
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <Typography
        variant="body1"
        component="a"
        href={url}
        target="_blank"
        sx={{ display: slider ? "none" : "block" }}
      >
        {file?.givenName
          ? file.givenName
          : file.name.length > 30
          ? `${file.name.slice(0, 20)}...`
          : file.name}
      </Typography>

      {progress < 100 && (
        <Button
          color="secondary"
          sx={{
            fontWeight: 600,
            fontSize: "1.2rem",
            borderBottom: "0 !important",
          }}
          onClick={() => onDelete(file)}
        >
          <CloseIcon />
        </Button>
      )}


      {progress === 100 && (
        <Box sx={{ display: slider ? "none" : "flex" }}>
          <CheckIcon style={{ width: 30, color: "green" }} />
          <Button
            color="secondary"
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              borderBottom: "0 !important",
            }}
            onClick={() => onDelete(file)}
          >
            <CloseIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileHeader;
