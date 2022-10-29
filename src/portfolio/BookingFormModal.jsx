import { KeyboardBackspace } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import YellowButton from "../components/YellowButton/YellowButton";
import { ConsultTextField } from "./userPortfolioProfile.style";

const BookingFormModal = ({
  modalTopBackButtonStyle,
  setBookingFormModal,
  classes,
  setOpenPhonePanel,
  openPhonePanel,
  handleOpenBooking,
}) => {
  return (
    <Box>
      <Box
        sx={modalTopBackButtonStyle}
        onClick={() => setBookingFormModal(false)}
      >
        <KeyboardBackspace />
        <Box>Back</Box>
      </Box>
      <Box className={classes.bookingFormBox} sx={{ p: ["1rem", "2rem"] }}>
        <Box
          sx={{
            fontWeight: "bold",
            color: "black",
            fontSize: "18px",
          }}
        >
          Book for Consulting
        </Box>
        <Grid
          spacing={[0, 2, 2, 2]}
          container
          sx={{
            mt: 2.5,
            width: ["100%", "70%"],
            mx: ["auto", "auto", "auto", "auto"],
            flexWrap: "nowrap",
            justifyContent: "center",
          }}
        >
          <Grid item sm={6}>
            <Box
              className={classes.phonePanel}
              sx={{ mb: 2 }}
              onClick={() => setOpenPhonePanel(true)}
            >
              {/* <CheckCircleIcon style={{width: "20px"}} /> */}
              {<div className={`${classes.circle}`}></div>}
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{ fontSize: ["1rem", "1.2rem"] }}
                >
                  Phone Call
                </Typography>
                <Typography fontWeight={500} sx={{ fontSize: [10, 14] }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box
              className={classes.addressPanel}
              onClick={() => setOpenPhonePanel(false)}
            >
              {<div className={classes.circle2}></div>}
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{ fontSize: ["1rem", "1.2rem"] }}
                >
                  Site Visit
                </Typography>
                <Typography fontWeight={500} sx={{ fontSize: [10, 14] }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          component="form"
          sx={{
            width: ["100%", "80%"],
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ConsultTextField label="Name" />
          <ConsultTextField label="Phone Number" />
          <ConsultTextField label="Email (Optional)" />

          {!openPhonePanel && <ConsultTextField label="Address" />}

          <YellowButton
            onClick={handleOpenBooking}
            style={{ marginTop: "2.5rem", width: "100%" }}
          >
            Book Now
          </YellowButton>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingFormModal;
