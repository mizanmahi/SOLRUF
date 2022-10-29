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

const LightningArrestor = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(
        changeSteps({ stepName: "lightningArrestor", isInView: inView })
      );
    }
  }, [inView, dispatch]);

  return (
    <Box ref={ref} id="lightningArrestor">
      <ArticleHeader>
        <Typography>LIGHTNING ARRESTOR</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <img src="https://i.ibb.co/Ky1780B/image-38.png" alt="" />
        <Box sx={{ ml: 2 }}>
          <Para>
            Lightning (surge) arrestors are designed to absorb voltage spikes
            caused by electrical storms (or out-of-spec utility power), and
            effectively allow the surge to bypass power wiring and your
            equipment by providing a safe path for the lightning current into
            the ground. ‘Lightning Arresters’ or ‘Lightning Rods’ are an
            integral part of a complete lightning protection system that
            includes lightning arresters at the top of a structure, the
            conductors, the earth or ground rods, and surge protection devices
            (SPD’s). Arrestors are made for various voltages for both AC and DC.
            The types of lightning arrestors are given below:
          </Para>
        </Box>
      </Flex>

      <BlogTitledBox
        variant="image"
        title="Spike Rod "
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/DpQBLp5/image-65-1.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Spike Lightning Arrestor is a metal rod, made of copper and, used
              as part of lightning safety to protect tall or isolated
              structures. Spike rod arrestor consists of a rod, spiked ball
              receiver and copper brass plate that can be screwed to the
              structure on which the rod is easily fitted.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Rod Gap "
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/c6pGQfz/image-66-1.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Rod Gap Arrester is a very simple type of lightning arrester,
              which consists of 2 rods that are bent at an angle 90° with a gap
              in between them as depicted in the diagram. One end of the
              lightning arrester connected to the line and another end of the
              rod connected to the earth. The distance between rod and insulator
              must not be less than 1/3 of the gap length so the arc may not
              reach the insulator and damage it.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Horn Gap"
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/CWBJD1P/image-66-2.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Horn gap arrestor has two metal rods located on ceramic insulators
              in horn-shaped manner around a small air gap. The gap among the
              horns can be adjusted so that the usual supply voltage is not
              sufficient to cause an arc.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Multi-Gap"
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/wdF95GX/image-42.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Multi-Gap arresters are designed with a sequence of metal
              cylinders that are insulated and divided through air gaps with
              each other. Some of the gaps among the next cylinders grab a surge
              when there is a surplus of voltage.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Valve-Type"
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/c2VWdcs/image-43.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Valve-Type arresters are applicable to electrical systems that are
              high-powered. These devices include two main parts like a sequence
              of spark gaps as well as a series of non-linear resistor discs.
              Whenever an extreme voltage causes the spark gaps to stroke &
              non-linear resistors hold the voltage within the ground.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Expulsion Type lightning"
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/ZXqXW86/image-44.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Expulsion type lightning arrestor are also called protector tubes
              and are normally used on the voltage up to 33KV. This type of
              arrester consists of a rod gap in series with an additional gap
              which is enclosed in a fiber tube.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>
    </Box>
  );
};

export default LightningArrestor;
