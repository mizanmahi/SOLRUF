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

const SolarChargeController = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "chargeController", isInView: inView }));
    }
  }, [inView, dispatch]);

  return (
    <Box id="chargeController" ref={ref}>
      <ArticleHeader>
        <Typography>SOLAR CHARGE CONTROLLER</Typography>
      </ArticleHeader>

      {/* <Flex>
            <img src='https://i.ibb.co/4FZhrLj/image-58.png' alt='' />
            <Para>
            A solar charge controller is fundamentally a voltage or current controller to charge the battery and keep electric cells from overcharging. It manages the power going into the battery bank from the solar array.  It ensures that the deep cycle batteries are not overcharged during the day, and that the power doesn’t run backwards to the solar panels overnight and drain the batteries. Some charge controllers are available with additional capabilities, like lighting and load control, but managing the power is its primary job. A solar charge controller is available in two different technologies, PWM and MPPT.

            </Para>
         </Flex> */}

      <BlogTitledBox
        variant="image"
        title="SOLAR CHARGE CONTROLLER"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/4FZhrLj/image-58.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              A solar charge controller is fundamentally a voltage or current
              controller to charge the battery and keep electric cells from
              overcharging. It manages the power going into the battery bank
              from the solar array. It ensures that the deep cycle batteries are
              not overcharged during the day, and that the power doesn’t run
              backwards to the solar panels overnight and drain the batteries.
              Some charge controllers are available with additional
              capabilities, like lighting and load control, but managing the
              power is its primary job. A solar charge controller is available
              in two different technologies, PWM and MPPT.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>
      <BlogTitledBox
        variant="image"
        title="Pulse Width Modulation (PWM)"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/pw6FJQs/image-65-4.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              PWM solar charge controllers are the standard type of charge
              controller available to solar shoppers. They are simpler than MPPT
              controllers, and thus generally less expensive. PWM controllers
              work by slowly reducing the amount of power going into your
              battery as it approaches capacity. When your battery is full, PWM
              controllers maintain a state of “trickle”, which means they supply
              a tiny amount of power constantly to keep the battery topped off.
              With a PWM controller, your solar panel system and your home
              battery need to have matching voltages. PWM controllers are more
              suited for small DIY solar systems with a couple of low voltage
              panels and a small battery.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Maximum Power Point Tracking (MPPT)"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/ftxx6tz/image-66-7.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              MPPT solar charge controllers are a more expensive and complex
              charge controller option. They provide the same switch-like
              protection that a PWM controller does, and will reduce the power
              flowing to your home battery as it nears capacity. Unlike PWM
              controllers, MPPT charge controllers can pair non-matching
              voltages from panels and batteries. MPPT controllers adjust their
              input to bring in the maximum power possible from your solar
              array, and can also vary their output power to match the attached
              battery.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        Charge Controllers have an equipment warranty of 5-15 years provided by
        the company.
      </BlogTitledBox>
    </Box>
  );
};

export default SolarChargeController;
