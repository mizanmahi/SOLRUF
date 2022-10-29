import { Box, styled, Typography } from "@mui/material";
import React from "react";
import BlogTitledBox from "../../../../components/BlogTitledBox/BlogTitledBox";
// import { useInView } from 'react-intersection-observer';
// import { useDispatch } from 'react-redux';
// import { changeSteps } from '../../../../redux/slices/blogScrollStepsSlice';

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

const ModuleMountingStructure = () => {
  //    const { ref, inView } = useInView({
  //       /* Optional options */
  //       threshold: 0.5,
  //    });

  //    console.log(inView);

  //    const dispatch = useDispatch();

  //    useEffect(() => {
  //       dispatch(changeSteps({ stepName: 'inverters', isInView: inView }));
  //    }, [inView, dispatch]);

  return (
    <>
      <ArticleHeader>
        <Typography>Module Mounting Structure</Typography>
      </ArticleHeader>

      <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
        <img src="https://i.ibb.co/Wyy5JNk/image-61.png" alt="" />
        <Para sx={{ ml: 2 }}>
          Solar modules need to be secured, mounted and tightened on a very
          stable and durable structure, protecting the array against impacts
          from snow, wind, hail, rain and even minor earthquakes. Photovoltaic
          mounting systems (also called solar module racking) are used to
          retrofit and fix solar panels on surfaces like roofs, building
          facades, or the ground. The arrangement of modules can either be
          Landscape or Portrait Orientated. Mounting systems are crucial to
          maximizing solar energy production, as well as providing panel/module
          stability. Regardless of where you mount the arrays, mounts are either
          fixed or tracking. Fixed mounts are preset for height and angle and do
          not move. Tracking arrays move east to west with the sun and adjust
          their angle to maintain the optimum as the sun moves. Module mounting
          structures are made of Hot Dip Galvanized Iron, Aluminum and Mild
          Steel (MS). Solar panels are joined into arrays and commonly mounted
          in one of three ways: on roofs; on poles in free standing arrays; or
          directly on the ground. These structures are described below:
        </Para>
      </Flex>

      <BlogTitledBox
        variant="image"
        title="Rooftop mounting structure"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/R6BxDJn/image-65-5.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Through Rooftop mounting structure, solar arrays of a PV system
              can be mounted on rooftops and parallel to the surface of the roof
              of a building. It can either be any residential building or any
              commercial/industrial building with a Concrete RCC roof, metal
              roof or an asbestos roof. If the panels are planned to be mounted
              before the construction of the roof, the roof can be designed
              accordingly by installing support brackets for the panels before
              the materials for the roof are installed. If the roof is already
              constructed, it is relatively easy to retrofit panels directly on
              top of existing roofing structures.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>
      <BlogTitledBox
        variant="image"
        title="Ground Mounting structure"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/X5mrG3y/image-66-10.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Ground-mounted solar is placed directly on the ground and consists
              of a steel or aluminum frame attached to a concrete foundation.
              Ground mounts are low, simple and offer flexibility in space and
              sizing, but can be bulky and require a foundation. Ground mounts
              are easier to access, but need more racking or frames attached to
              ground-based mounting supports. More air tends to circulate behind
              the solar panels of a ground-mounted array, leading the panels to
              stay cooler and outperform rooftop systems. Ground mounts are
              well-suited for rural, off-grid areas that don’t have heavy
              snowfall. Their ability to provide significant electrical power
              makes them great for utility-scale installations.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox
        variant="image"
        title="Shade Mounting structure"
        sx={{ padding: "1rem 1rem" }}
      >
        <Flex sx={{ flexDirection: { sm: "row", xs: "column" } }}>
          <img src=" https://i.ibb.co/yX3RRQF/image-66-11.png" alt="" />
          <Box sx={{ ml: 2 }}>
            <Para>
              Solar panels can also be mounted as shade structures where the
              solar panels can provide shade instead of patio covers. The cost
              of such shading systems are generally different from standard
              patio covers, especially in cases where the entire shade required
              is provided by the panels. Shade mounting structures are installed
              outdoors and are coated with anti-corrosive material for longer
              life. In such structures, the module mounting may need to be
              concealed to maintain the aesthetics of the shading structure
              along with simplified array access for maintenance. Growing vines
              around the structure must be avoided as they may come in contact
              with the wiring.
            </Para>
          </Box>
        </Flex>
      </BlogTitledBox>

      <BlogTitledBox title="WARRANTY" variant="secondary">
        Charge Controllers have an equipment warranty of 5-15 years provided by
        the company.
      </BlogTitledBox>
    </>
  );
};

export default ModuleMountingStructure;
