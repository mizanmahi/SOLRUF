import { Box, Button, Typography } from "@mui/material";
import React from "react";
import kwattCourse from "../../../assets/kwatt-course.jpeg";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

const CourseItem = ({ right, title, description, price, prevPrice }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "start",
        flexDirection: right ? "row-reverse" : "",
        "@media (max-width: 900px)": {
          flexDirection: "column",
        },
        "&:hover": {
          "& img": {
            transition: "scale 0.3s",
            scale: "1.1",
          },
        },
      }}
    >
      <Box
        sx={{
          width: "46rem",
          borderRadius: "17px",
          "@media (max-width: 900px)": {
            width: "100%",
          },
          overflow: "hidden",
          "& img": {
            transition: "scale 0.2s",
            "&:hover": {
              scale: "1.1",
            },
          },
        }}
      >
        <img src={kwattCourse} alt="" style={{ width: "100%" }} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: right ? "flex-end" : "flex-start",
          mx: "2rem",
          "@media (max-width: 900px)": {
            my: "1.5rem",
            alignItems: "flex-start",
          },
          justifyContent: "start",
          rowGap: "0.7rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            textAlign: right ? "right" : "",
            "@media (max-width: 900px)": {
              textAlign: "left",
              fontSize: "1.4rem",
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontWeight: "500",
            color: "primary.dark",
            textAlign: right ? "right" : "",
            maxHeight: "7.3rem",

            "@media (max-width: 900px)": {
              textAlign: "left",
              fontSize: "1rem",
              maxHeight: "20rem",
            },
            overflowY: "hidden",
            fontSize: "1.2rem",
          }}
        >
          {description}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
          by Dinesh Mehra
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "1rem" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
              "@media (max-width: 900px)": {
                fontSize: "1.2rem",
              },
            }}
          >
            ₹{price}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              color: "primary.dark",
              textDecoration: "line-through",
              "@media (max-width: 900px)": {
                fontSize: "1rem",
              },
            }}
          >
            ₹{prevPrice}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              backgroundColor: "primary.main",
              px: "0.5rem",
              "@media (max-width: 900px)": {
                fontSize: "1rem",
              },
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
              "@media (max-width: 900px)": {
                fontSize: "0.8rem",
                columnGap: "0.2rem",
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
              "@media (max-width: 900px)": {
                fontSize: "0.8rem",
                columnGap: "0.2rem",
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
