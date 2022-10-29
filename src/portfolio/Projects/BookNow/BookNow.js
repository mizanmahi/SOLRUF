import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import YellowButton from "../../../components/YellowButton/YellowButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import bookNow from "../../../assets/booknow.svg";

const useStyle = makeStyles((theme) => {
  return {
    bannerBox: {
      width: "100%",
      height: "200px",
      justifyContent: "center",
      alignItems: "center",
      // display: "flex",
      "@media (max-width: 600px)": {
        flexDirection: "column",
        alignItems: "center",
        flexBasis: "100%",
        borderRadius: "20px",
      },
    },
    mainBanner: {
      boxShadow: "7px 7px 30px rgba(0, 0, 0, 0.13)",
      background: `linear-gradient(108.58deg, #F4F0E4 -22.48%, #FFD05B 49.85%)`,
      // backgroundImage:
      //   "linear-gradient(to right,rgba(246, 211, 101, .8) 0%, rgba(253, 160, 133, .8) 100%) ",
      borderRadius: "20px",
    },
    buttonBox: {
      width: "100%",
      height: "100%",
      // display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRadius: "0 20px 20px 0",
      // background: "#ffffff",
      // boxShadow: "7px 7px 30px rgba(0, 0, 0, 0.13)",
    },
  };
});

const BookNow = ({ onClick }) => {
  const classes = useStyle();
  const navigate = useNavigate();

  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const clickHandlerOnMobile = (e) => {
    e.preventDefault();
    console.log("clicked mobile handler");
    navigate("/product-booking");
  };

  const ref1 = useRef(null);
  // const ref2 = useRef(null);

  const isInViewport1 = useIsInViewport(ref1);
  console.log("isInViewport1: ", isInViewport1);

  function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) =>
          setIsIntersecting(entry.isIntersecting)
        ),
      []
    );

    useEffect(() => {
      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }, [ref, observer]);

    return isIntersecting;
  }

  useEffect(() => {
    console.log("IN VIEWPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", isInViewport1);
  }, [isInViewport1]);

  return (
    <Box ref={ref1} sx={{ mb: 10, mx: { sm: "auto", xs: 2 } }}>
      <Grid
        container
        className={classes.mainBanner}
        sx={{ display: ["none", "flex"] }}
        rowSpacing={2}
      >
        <Grid item md={3} lg={3} sx={{ textAlign: "center" }}>
          <img src={bookNow} alt="book now" />
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <Box className={classes.bannerBox} sx={{ display: ["none", "flex"] }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "#000", fontSize: ["2rem"] }}
            >
              Book your product for Future Delivery
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} md={3} lg={2}>
          <Box className={classes.buttonBox} sx={{ display: ["none", "flex"] }}>
            <YellowButton
              style={{ background: "#F3F3F3", borderRadius: "36px" }}
              onClick={onClick}
            >
              BOOK PRODUCT
            </YellowButton>
          </Box>
        </Grid>
      </Grid>

      {matches && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: `linear-gradient(108.58deg, #F4F0E4 -22.48%, #FFD05B 49.85%)`,
            borderRadius: 5,
            py: 2,
          }}
        >
          <img src={bookNow} width="140" alt="book now" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "#000",
                fontSize: ["1.4rem"],
                mb: 2,
              }}
            >
              Book your product for Future Delivery
            </Typography>
            {matches && (
              <YellowButton
                onClick={clickHandlerOnMobile}
                style={{ background: "#F3F3F3", borderRadius: "24px" }}
              >
                BOOK PRODUCT
              </YellowButton>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BookNow;
