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

const EarthingKits = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "earthingKit", isInView: inView }));
    }
  }, [inView, dispatch]);

  return (
    <Box ref={ref} id="earthingKit">
      <ArticleHeader>
        <Typography>EARTHING KIT</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <img src="https://i.ibb.co/nPbRxWX/image-53.png" alt="" />
        <Para sx={{ padding: { sm: 0, xs: "20px" } }}>
          Earthing is a way of transmitting any instant electricity discharge/
          lightning directly to the ground through low resistance wires,
          electrical cables or conductive materials. Earthing provides
          protection from lightning & voltage surges for personal protection,
          property protection, etc.. The earthing component is connected between
          the equipment body or enclosure and the earth pit which is placed
          under the earth surface. The solar modules, inverter and aluminum
          frames of a PV system should be grounded for protection from
          lightning. The components required for earthing of a PV system are:
        </Para>
      </Flex>

      <BlogTitledBox
        variant="image"
        title="Earth Cable"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/3CGSqhL/image-65-2.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Most earthing cables are made of copper strips instead of a single
              bare copper rod. This conductor is used to connect all the
              metallic parts of the PV system.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>
      <BlogTitledBox
        variant="image"
        title="Earthing Joint"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/z2x5tCv/image-66-5.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              The earthing joint includes the conductors that fixes the earthing
              conducted to the earth.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>
      <BlogTitledBox
        variant="image"
        title="Earth Plate"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/WgDb8hQ/image-66-6.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Earth plate is hidden underground and linked to the earthing
              joint. It can be a pipe, plate or metallic rod, or plate made of
              copper or iron rod and must be placed in wet earth. In the case
              where the moisture is of low content, then some water is to be
              poured into the earth plate. It is to be placed in the vertical
              position and the area around it covered with salt and charcoal
              lime. The types of earthing systems are given below:
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <ArticleHeader>
        <Typography>PLATE EARTHING SYSTEM</Typography>
      </ArticleHeader>

      <Typography sx={{ padding: { sm: 0, xs: "20px" } }}>
        Here the earthing plates that are made up of copper or GI (galvanized
        iron) are placed vertically in the ground pit less than 3m from the
        earth.
      </Typography>

      <BlogTitledBox
        variant="image"
        title="Plate Earthing"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/310czG0/image-65-3.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              This is the most common type of earthing system where a galvanized
              steel based pipe is placed vertically in a wet pit. The pipe size
              mainly depends on the soil type and magnitude of current. For
              rocky or dry soil, the pipe diameter should be greater than the
              ordinary soil pipe. The soil moisture will decide the pipe’s
              length to be placed in the earth.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Rod Earthing"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/ftxx6tz/image-66-7.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              The earthing joint includes the conductors that fixes the earthing
              conducted to the earth.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Chemical Earthing"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/FhzwQLB/image-66-8.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Earth plate is hidden underground and linked to the earthing
              joint. It can be a pipe, plate or metallic rod, or plate made of
              copper or iron rod and must be placed in wet earth. In the case
              where the moisture is of low content, then some water is to be
              poured into the earth plate. It is to be placed in the vertical
              position and the area around it covered with salt and charcoal
              lime. The types of earthing systems are given below:
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        Earthing kits have an equipment warranty of 10-15 years provided by the
        company.
      </BlogTitledBox>
    </Box>
  );
};

export default EarthingKits;
