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

const NetMeter = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.5,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "netMeter", isInView: inView }));
    }
  }, [inView, dispatch]);

  return (
    <Box id="netMeter" ref={ref}>
      <ArticleHeader>
        <Typography>NET METER</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <img src="https://i.ibb.co/NFqPNG3/image-46.png" alt="" />
        <Box sx={{ ml: 2 }}>
          <Para>
            Net meters work by continuously sampling how much electricity is
            being generated and how much electricity is consumed at your home.
            The data is then accumulated in the appropriate register over the
            billing cycle. A net-meter is needed to avail benefits of the
            net-metering policy offered the grids for customers having installed
            solar PV systems on their property. Net Metering gives solar energy
            owners credits for the power that they add to the grid which can be
            ‘taken back’ when the solar plants are not functioning.
          </Para>
        </Box>
      </Flex>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        Net-Meters have an equipment warranty of 1-2 years provided by the
        company.
      </BlogTitledBox>
    </Box>
  );
};

export default NetMeter;
