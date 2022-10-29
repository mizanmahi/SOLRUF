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

const SolarInverters = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "inverters", isInView: inView }));
    }
  }, [inView, dispatch]);

  return (
    <Box ref={ref} id="inverters">
      <ArticleHeader>
        <Typography>SOLAR INVERTERS</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <Para sx={{ padding: { sm: 0, xs: "20px" } }}>
          A solar inverter or PV inverter converts the variable direct current
          (DC) output of a photovoltaic (PV) solar panel into a utility
          frequency alternating current (AC) that can be fed into a commercial
          electrical grid or used by a local, off-grid electrical network. Solar
          power inverters have special functions adapted for use with
          photovoltaic arrays, including maximum power point tracking and
          anti-islanding protection. The inverter is the most sophisticated part
          of any common on-grid solar system and unfortunately, it’s also the
          part most likely to have issues due to being typically installed
          outside under extreme weather conditions including rain, humidity and
          high temperatures. The classification of solar inverters can be done
          based on the application which includes the following
        </Para>
        <img src="https://i.ibb.co/N2tqxfj/image-35.png" alt="" />
      </Flex>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <BlogTitledBox title="GRID TIED" sx={{ mr: { sm: 3, xs: 0 } }}>
          A grid-tie inverter converts DC electricity into an alternating
          current (AC) that is suitable for injecting into an electrical power
          grid. The frequency of the current produced ranges 50-60 Hz in India.
          If there is a utility loss to grid supply, a grid-tie inverter is
          designed to automatically shut down. They do not provide backup power
          during utility outages. Solar panels, wind turbines, hydro-electric
          systems, and the grid all use grid tie inverters.
        </BlogTitledBox>
        <BlogTitledBox title="OFF-GRID (STAND-ALONE)">
          Off-grid inverters are used in isolated (remote) systems where the
          inverter draws its DC energy from batteries charged by photovoltaic
          arrays and converts it to AC power. Many stand-alone inverters also
          incorporate integral battery chargers to replenish the battery from an
          AC source or solar panels, when available. Normally these do not
          interface in any way with the utility grid, and as such, are not
          required to have anti-islanding protection.
        </BlogTitledBox>
      </Flex>

      <BlogTitledBox title="BATTERY BACKUP">
        Battery backup inverters are uni-directional which are designed to draw
        energy from a battery, manage the battery charge via an onboard charger,
        and export excess energy to the utility grid. These inverters are
        capable of supplying AC energy and give non-stop operation to selected
        loads during a utility outage, and are required to have anti-islanding
        protection. The role of this inverter is to convert DC battery power
        into AC power and to feed it into your switchboard to replace a grid
        power.
      </BlogTitledBox>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <BlogTitledBox title="HYBRID" sx={{ mr: { sm: 3, xs: 0 } }}>
          Central Inverters are ideal for larger commercial plants and
          industrial installations or even utility-scale solar farms and handle
          power management from a centrally located device. These are related to
          string inverters however they are larger & support additional strings
          of solar panels. The range of these inverters is from MWs to the
          hundreds of KWs with each inverter resembling a large metal cabinet,
          being able to handle around 500kW of power
        </BlogTitledBox>
        <BlogTitledBox title="HYBRID">
          Hybrid inverter manage photovoltaic arrays, battery storage and
          utility grid, which are all coupled directly to the unit. These modern
          all-in-one systems are usually highly versatile and can be used for
          grid-tie, stand-alone or backup applications but their primary
          function is self-consumption with the use of storage. This inverter is
          also known as a multi-mode inverter and allows plugging batteries into
          the solar power system.
        </BlogTitledBox>
      </Flex>

      <BlogTitledBox title="MICRO">
        These modern inverters are very small, portable and also typically used
        for commercial and residential purposes. They are housed on the back of
        an individual solar panel with one inverter connection per solar panel
        having all the features of a central inverter. Their capacity can be as
        low as 240 W each. This is great because it allows you to optimize each
        panel to get the most energy from an array in case you have a shade over
        most solar panels or an incomplete shade solution.
      </BlogTitledBox>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        While solar panels have no moving parts and can be expected to continue
        working past 25 years, inverters are arguably the most likely part of
        the PV system to fail. Solar inverters are usually warrantied for a
        period ranging from 5 to 15 years, with an average standard warranty
        period of 10 years. Some companies offer the possibility to extend this
        period to up to 20 years. If you’re looking for added peace of mind,
        many inverter manufacturers offer extended warranties for an additional
        price
      </BlogTitledBox>
    </Box>
  );
};

export default SolarInverters;
