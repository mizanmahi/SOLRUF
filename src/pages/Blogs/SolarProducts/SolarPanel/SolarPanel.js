import { Box, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BlogTitledBox from "../../../../components/BlogTitledBox/BlogTitledBox";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { changeSteps } from "../../../../redux/slices/blogScrollStepsSlice";

const ArticleHeader = styled(Box)(({ theme }) => ({
  background: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  borderRadius: "10px",
  margin: "1rem auto",
  width: "100%",
  maxWidth: "250px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  "& p": {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
}));

const Flex = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const Para = styled(Typography)(({ theme }) => ({
  color: "#000000",
}));

const SolarPanel = () => {
  const { ref, inView, } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "panels", isInView: inView }));
    }
  }, [inView, dispatch]);

  return (
    <Box id="panels" ref={ref}>
      <ArticleHeader>
        <Typography>SOLAR PANEL</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <img src="https://i.ibb.co/P1HhcCL/image-34.png" alt="" />
        <Box sx={{ ml: 2 }}>
          <Para>
            A solar panel (also known as a solar module) consists of a layer of
            silicon cells, a metal frame, a glass casing unit, and wiring to
            transfer electric current from the silicon. These are built from a
            large number of individual solar cells, also called photovoltaic
            cells. The photovoltaic energy conversion process works through the
            following broad steps:
          </Para>
          <Box component="ul" sx={{ mt: 2, "& li": { marginBottom: "1rem" } }}>
            <li>
              <Para>
                The silicon photovoltaic solar cell absorbs solar radiation.
              </Para>
            </li>
            <li>
              <Para>
                When the sun’s rays interact with the silicon cell, electrons
                begin to move, creating a flow of electric current.
              </Para>
            </li>
            <li>
              <Para>
                Wires capture and feed this direct current (DC) electricity to a
                solar inverter to be converted to alternating current (AC)
                electricity.
              </Para>
            </li>
          </Box>
        </Box>
      </Flex>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        A solar panel has two warranties: a performance and equipment guarantee.
        A solar panel’s performance warranty will typically guarantee 90%
        production at 10 years and 80% at 25 years. A solar panel’s equipment
        warranty covers the integrity of the panel itself and protects you
        against problems such as manufacturing defects, environmental issues,
        premature wear and tear etc. Most equipment warranties of solar panels
        last between 10-15 years but some premium panels have warranties for
        upto 25 years.
      </BlogTitledBox>
    </Box>
  );
};

export default SolarPanel;
