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
  maxWidth: "300px",
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

const CablesAndWires = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "cables&wires", isInView: inView }));
    }
  }, [inView, dispatch]);

  return (
    <Box ref={ref} id="cables&wires">
      <ArticleHeader>
        <Typography>CABLES & WIRES</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <Box sx={{ mr: 2 }}>
          <Para sx={{ padding: { sm: 0, xs: "20px" } }}>
            A cable is a group of two or more conductors that are twisted or
            bonded together, surrounded by an insulating layer which itself is
            within a cable jacket, also called cable sheath. In DC circuits,
            cables commonly consist of a current-carrying live wire within an
            insulation layer that is usually colored red, and a negative wire
            usually surrounded by a black-colored insulation layer. In other
            applications such as AC systems, cables consist of a live wire that
            carries the current, a neutral wire that completes the electric
            circuit, carrying current away from the device, and also features a
            third ground wire which is usually colored green or yellow. The 2
            types of cables used in a PV system are given below:
          </Para>
        </Box>
        <img src="https://i.ibb.co/XkBvhsG/image-47.png" alt="" />
      </Flex>

      <BlogTitledBox
        variant="image"
        title="SOLAR DC CABLES"
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/VVWGpSZ/image-66-3.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              A solar DC cable is the interconnection cable used in photovoltaic
              power generation. Solar cables interconnect solar panels and other
              electrical components of a photovoltaic system. Solar cables are
              designed to be resistant to ultraviolet, ozone, severe temperature
              change,extreme weather and chemical erosion.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>
      <BlogTitledBox
        variant="image"
        title="SOLAR AC CABLES"
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/mSLVJSb/image-66-4.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              AC cables are employed when connecting an inverter to the grid.
              They are usually installed outdoors, so they also need the same
              protective characteristics as the DC cables. AC cable selection is
              mainly dependent on the relation between cable diameter and
              ampacity as well as on the power and current output of the
              inverter. Generally, systems with single-phase inverters require
              the use of three-core AC cables and systems with three-phase
              inverters require the use of five-core AC cables.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        Solar AC/DC Cables have an equipment warranty of 1-2 years provided by
        the company.
      </BlogTitledBox>
    </Box>
  );
};

export default CablesAndWires;
