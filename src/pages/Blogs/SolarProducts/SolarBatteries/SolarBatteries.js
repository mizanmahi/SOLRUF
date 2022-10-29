import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import BlogTitledBox from "../../../../components/BlogTitledBox/BlogTitledBox";
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

const HandListBox = styled(Box)(({ theme }) => ({}));

const HandListItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
  "& p": {
    color: "#000000",
    marginLeft: "1rem",
  },
}));

const SolarBatteries = () => {
  const { ref, inView } = useInView({ // entry could be used here
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);
 

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "batteries", isInView: inView }));
    }
  }, [inView, dispatch]);
  return (
    <Box id="batteries" ref={ref}>
      <ArticleHeader>
        <Typography>SOLAR BATTERIES</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <img src="https://i.ibb.co/ynDcvQb/image-36.png" alt="" />
        <Box sx={{ ml: 2 }}>
          <Para>
            Solar battery is a device that reserves energy for later consumption
            that is charged by a connected solar system. The stored electricity
            is consumed after sundown, during energy demand peaks, or during a
            power outage. As soon as the power outage occurs, the battery
            system’s backup gateway will isolate the home from the grid and
            activate the battery to immediately provide power to the circuits
            it’s been connected to. Having a solar battery system can help
            mitigate the amount of electricity one would normally buy during
            demand charge billing or peak hours consumption by utilities. Demand
            charges are additional fees that utilities charge non-residential or
            commercial customers for maintaining constant supply of electricity.
            The characteristics of a solar battery storage system are given
            below:
          </Para>
        </Box>
      </Flex>

      <HandListBox sx={{ padding: { sm: 0, xs: "20px" } }}>
        <HandListItem>
          <span>👉🏻</span>
          <Typography>
            <strong>Battery life</strong>: A battery’s lifespan is usually
            measured in either a total number of full cycles or in years. Over
            time, it will lose some of its capacity as well. A battery’s
            lifespan is generally somewhere from five to 15 years.
          </Typography>
        </HandListItem>
        <HandListItem>
          <span>👉🏻</span>
          <Typography>
            <strong>Capacity & Power</strong>: A battery’s capacity is the total
            amount of electricity it can store measured in kilowatt-hours (kWh).
            The battery’s power rating will tell you the amount of electricity
            that the battery can deliver at one time measured in kilowatts (kW).
          </Typography>
        </HandListItem>
        <HandListItem>
          <span>👉🏻</span>
          <Typography>
            <strong> Depth of Discharge (DOD)</strong>: The DoD measures the
            degree to which a battery can be used relative to its total
            capacity. If a battery has a 94% DoD, it means one can use up to 94%
            of the battery capacity.
          </Typography>
        </HandListItem>
      </HandListBox>

      <BlogTitledBox
        variant="image"
        title="Lithium ion battery"
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/vzHf35z/image-65.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Lithium-ion batteries have the longest lifespan and higher DoD and
              are very compact and light compared to the other battery types.
              With all these benefits, however, they are the most expensive. One
              can charge and discharge lithium ion batteries hundreds or even
              thousands of times. Lithium ion batteries are most commonly used
              in home energy storage systems.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>
      <BlogTitledBox
        variant="image"
        title="Lead acid battery"
        sx={{ padding: "0 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src="https://i.ibb.co/cNMhRsW/image-66.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              A lead acid battery is a kind of rechargeable battery that stores
              electrical energy by using chemical reactions between lead, water,
              and sulfuric acid. Lead acid batteries have been used for decades
              in home energy storage systems and have the shortest lifespan and
              capacity. The downfall to buying this battery is that it is
              becoming outdated and has a lower DoD compared to other battery
              types.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        Solar batteries have an average equipment warranty of 5 years provided
        by the company. However some companies offer the possibility of
        extending the warranty upto 10 years.
      </BlogTitledBox>
    </Box>
  );
};

export default SolarBatteries;
