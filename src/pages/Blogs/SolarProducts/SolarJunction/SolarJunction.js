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

const SolarJunction = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "solarJunction", isInView: inView }));
    }
  }, [inView, dispatch]);

  return (
    <Box ref={ref} id="solarJunction">
      <ArticleHeader>
        <Typography>SOLAR JUNCTION BOX</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <img src="https://i.ibb.co/fxB4PHn/image-48.png" alt="" />
        <Box sx={{ ml: 2 }}>
          <Para>
            A Solar Junction Box is a protective box that is used to combine,
            connect, and terminate electrical components in a solar power
            system. It protects electrical connections against corrosion caused
            by the environment, unintentional damage, and short circuits.
            Ingress protection or IP ratings describe the amount of protection
            provided by these boxes in their working environment. The initials
            'IP' followed by two figures indicate the equipment's degree of
            protection, with the first number indicating protection against
            solids intrusion and the second number indicating protection against
            water ingress. The greater the box's IP rating, the better it
            protects against moisture and dust.
          </Para>
        </Box>
      </Flex>

      <BlogTitledBox
        variant="image"
        title="Alternating current distribution box (ACDB)"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/tM8SXBG/image-43-1.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              The ACDB receives the AC power from the solar inverter and directs
              it to AC loads through the distribution board. They include
              necessary surge protection devices (SPD) and MCCB to protect the
              solar inverter from any type of damage or failures on load side or
              heavy voltage. ACDB boxes should be installed at any dry and safe
              place between the solar inverter and electrical load/ LT panel.
              ACDB’s are designed to isolate inverter and AC loads from mains as
              and when required for repair and maintenance.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Direct current distribution box (DCDB)"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/2ngC1sm/image-44-1.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              DCDB combines the DC output of many PV module strings and supplies
              it to the inverter while providing a protective fuse or circuit
              breaker for each circuit. They include surge protection devices
              (SPD) and fuses of proper rating depending upon the capacity of
              the power plant and the inverter/ battery bank ratings. DCDB
              protects the solar panel, solar inverter and solar battery from
              any type of damage in a Photovoltaic system.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        Solar junction boxes such as ACDB/ DCDB have an equipment warranty of
        2-5 years provided by the company.
      </BlogTitledBox>
    </Box>
  );
};

export default SolarJunction;
