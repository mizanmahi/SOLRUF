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

const PvMeter = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  console.log(inView);

  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(changeSteps({ stepName: "pvMeter", isInView: inView }));
    }
  }, [inView, dispatch]);

  return (
    <Box id="pvMeter" ref={ref}>
      <ArticleHeader>
        <Typography>PV METER</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <Box sx={{ mr: 2 }}>
          <Para sx={{ padding: { sm: 0, xs: "20px" } }}>
            A Photovoltaic (PV) meter collects PV yield production to measure
            how much electricity your solar system generates and analyze PV
            plant performance. This is a one-directional meter which accurately
            measures exactly how much usable electricity your system is
            generating. PV meters often come with a monitoring function to
            collect Plant data which provides a concise presentation of PV
            yields, monetary savings and plant performance.
          </Para>
        </Box>
        <img src="https://i.ibb.co/qnkNjMx/image-45.png" alt="" />
      </Flex>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        PV Meters have an equipment warranty of 1-2 years provided by the
        company.
      </BlogTitledBox>
    </Box>
  );
};

export default PvMeter;
