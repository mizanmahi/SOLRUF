import { Box, Button, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { KeyboardBackspace } from "@mui/icons-material";

const BottomSheetDialog = ({
  setShowBottomSheet,
  showBottomSheet,
  tabValue,
  handleChange,
  setScrollIndex,
  companyRef,
  portfolio,
  showTooltip2,
  setShowTooltip2,
  aboutRef,
  videoUrl,
  certificatesRef,
  descriptionRef,
}) => {
  return (
    <Box>
      <Box sx={{ position: "relative", height: "100%" }}>
        <Box
          sx={{
            position: "sticky",
            top: "-2px",
            zIndex: "1",
            width: "99%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              p: 1,
              color: "black",
              bgcolor: "#D0D7D9",
              textAlign: "start",
              fontWeight: "bold",
              display: "flex",
              columnGap: 1,
              cursor: "pointer",
            }}
            onClick={() => setShowBottomSheet(!showBottomSheet)}
          >
            <KeyboardBackspace />
            <Box>Back</Box>
          </Box>
          <Tabs
            sx={{
              position: "sticky",
              top: "35px",
              bgcolor: "#fff",
              zIndex: 100,
            }}
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
          >
            <Tab
              label="Company Details"
              sx={{
                borderBottom: "1px solid black",
                fontSize: ".8rem",
                "&.Mui-selected": {
                  fontWeight: "bold",
                  color: "secondary.main",
                },
              }}
              onClick={(e) => {
                setScrollIndex(0);
              }}
            />

            <Tab
              label="About"
              sx={{
                borderBottom: "1px solid black",
                fontSize: ".8rem",
                "&.Mui-selected": {
                  fontWeight: "bold",
                  color: "secondary.main",
                },
              }}
              onClick={(e) => {
                setScrollIndex(1);
              }}
            />
            <Tab
              label="Certificate"
              sx={{
                borderBottom: "1px solid black",
                fontSize: ".8rem",

                "&.Mui-selected": {
                  fontWeight: "bold",
                  color: "secondary.main",
                },
              }}
              onClick={(e) => {
                setScrollIndex(2);
              }}
            />
            <Tab
              label="Description"
              sx={{
                borderBottom: "1px solid black",
                fontSize: ".8rem",
                "&.Mui-selected": {
                  fontWeight: "bold",
                  color: "secondary.main",
                },
              }}
              onClick={(e) => {
                setScrollIndex(3);
              }}
            />
          </Tabs>
        </Box>
        <Box ref={companyRef} sx={{}}>
          {/* COMPANY */}
          <Box sx={{ pt: 13 }}>
            <Box sx={{ pl: 5 }}>
              <Box
                sx={{
                  textAlign: "start",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {" "}
                Company Details:{" "}
              </Box>
              <Typography sx={{ mb: 2, mt: 4 }}>
                <span style={{ fontWeight: "600" }}>Turn Over: -</span>
                {`${portfolio.turnover} ${portfolio.turnover_type}/Year`}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                <span style={{ fontWeight: "600" }}>Total Projects: -</span>
                {portfolio.total_projects}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                <span style={{ fontWeight: "600" }}>GST No: -</span>
                {portfolio.gst}
                <Tooltip
                  open={showTooltip2}
                  onOpen={() => setShowTooltip2(true)}
                  onClose={() => setShowTooltip2(false)}
                  title={
                    <div
                      style={{
                        color: "lightblue",
                        fontSize: "10px",
                      }}
                    >
                      GST Verified
                    </div>
                  }
                  placement="top"
                  arrow
                >
                  <img
                    onClick={() => setShowTooltip2(!showTooltip2)}
                    style={{
                      marginLeft: "1rem",
                    }}
                    src="https://i.ibb.co/pWNNjTt/vecteezy-profile-verification-check-marks-icons-vector-illustration-1-3.png"
                    alt=""
                  />
                </Tooltip>
              </Typography>
            </Box>
          </Box>
          {/* ABOUT */}
          <Box ref={aboutRef} sx={{ pt: 7 }}>
            <Box
              sx={{
                p: 3.9,
                bgcolor: "#F4F0E4",
              }}
            >
              <Box
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  p: 1,
                }}
              >
                About:
              </Box>
              <Box
                sx={{
                  bgcolor: "",
                  position: "relative",
                }}
              >
                <a href={videoUrl} target="_">
                  <iframe
                    style={{
                      borderRadius: "1rem",
                      maxWidth: "100%",
                    }}
                    height="170"
                    src={videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bgcolor: "",
                      width: "100%",
                      height: "100%",
                      opacity: 0.3,
                    }}
                  ></Box>
                </a>
              </Box>
              <Typography sx={{ fontSize: "1.1rem", mt: 1 }} onClick={() => {}}>
                {portfolio.description}
              </Typography>
            </Box>
          </Box>
          {/* CERTIFICATION */}
          <Box
            ref={certificatesRef}
            sx={{
              textAlign: "center",
              bgcolor: "white",
              py: 2,
              px: 1,
            }}
          >
            <Box
              sx={{
                textAlign: "start",
                fontWeight: "bold",
                fontSize: "1.1rem",
                p: 1,
              }}
            >
              {" "}
              Company Details:{" "}
            </Box>
            <Button
              sx={{
                width: "80%",
                mb: 1,
                color: "#f3f3f3",
                bgcolor: "black",
              }}
              component="a"
              href="https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing"
              target="_blank"
              variant="contained"
              endIcon={<DownloadIcon />}
            >
              Certificate Name1
            </Button>
            <Button
              sx={{
                width: "80%",
                mb: 1,
                color: "#f3f3f3",
                bgcolor: "black",
              }}
              component="a"
              href="https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing"
              target="_blank"
              variant="contained"
              endIcon={<DownloadIcon />}
            >
              Certificate Name2
            </Button>
            <Button
              sx={{
                width: "80%",
                mb: 1,
                color: "#f3f3f3",
                bgcolor: "black",
              }}
              component="a"
              href="https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing"
              target="_blank"
              variant="contained"
              endIcon={<DownloadIcon />}
            >
              Certificate Name3
            </Button>
          </Box>
          {/* DESCRIPTION */}
          <Box
            ref={descriptionRef}
            sx={{
              py: 3.9,
              bgcolor: "#F4F0E4",
            }}
          >
            <Box
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                p: 1,
              }}
            >
              Description:
            </Box>
            <Typography
              sx={{
                fontSize: "1.1rem",
                mt: 1,
                px: 3,
              }}
              onClick={() => {}}
            >
              {portfolio.description?.slice(0, 200)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomSheetDialog;
