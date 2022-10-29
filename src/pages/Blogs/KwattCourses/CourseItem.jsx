import { Box, Button, Typography } from "@mui/material";
import React from "react";
import kwattCourse from "../../../assets/kwatt-course.jpeg";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

const CourseItem = ({ right }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: right ? "row-reverse" : "",
      }}
    >
      <img
        src={kwattCourse}
        alt=""
        style={{ width: "30rem", borderRadius: "17px" }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: right ? "flex-end" : "flex-start",
          mx: "2rem",
          justifyContent: "start",
          rowGap: "0.7rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "500", textAlign: right ? "right" : "" }}
        >
          Amet minim mollit non deserunt ullamco est sit aliqua dolor
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
            color: "primary.dark",
            textAlign: right ? "right" : "",
          }}
        >
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
          by Dinesh Mehra
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "1rem" }}>
          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            ₹12,000
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              color: "primary.dark",
              textDecoration: "line-through",
            }}
          >
            ₹15,000
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              backgroundColor: "primary.main",
              px: "0.5rem",
            }}
          >
            20% Discount
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "1rem" }}>
          <Button
            sx={{
              color: "primary.light",
              backgroundColor: "primary.dark",
              columnGap: "0.5rem",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Download Document
            <SystemUpdateAltIcon />
          </Button>
          <Button
            sx={{
              color: "primary.light",
              backgroundColor: "primary.dark",
              columnGap: "0.5rem",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Enroll Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseItem;
