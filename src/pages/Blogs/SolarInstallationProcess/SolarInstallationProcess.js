import { Container, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BlogAccordionContent from "../../../components/BlogAccordionContent/BlogAccordionContent";
import BlogIntroSection from "../../../components/BlogIntroSection/BlogIntroSection";
import CustomAccordionForBlogs from "../../../components/CustomAccordionForBlogs/CustomAccordionForBlogs";

const Wrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.light,
}));

const text1 = `
The first step is to fix the mounts that will support the Solar Panels. Depending on the application, it can be roof-ground mounts or flush mounts. This foundation gives stability and support. The orientation in which the PV panels are mounted is carefully considered. A minor tilt in the mounting framework is required. To get the most sunshine exposure, the tilt angle could be anything from 18 to 36 degrees.
`;

const text2 = `The solar panels must then be attached to the mounting structure. Tightening nuts and bolts  accomplishes this. It's important to secure the entire construction properly so that it's solid and long-lasting.`;

const text3 = `Universal Connectors like MC4 are used during wiring because these connectors can be connected with all types of solar panels.`;

const text4 = `The system must then be connected to a solar inverter. It's usually mounted near the main panel and can be found both indoor and outdoor. When inverters are kept in a colder environment, they perform better. The positive wire from the solar panel is linked to the inverter's Positive terminal, while the negative wire is connected to the inverter's Negative terminal. To transport and store electricity, the solar inverter is connected to the Solar Battery and Grid input.`;

const text5 = `The battery and inverter are connected to the battery terminals (Positive & Negative) of the charge controller.`;

const text6 = `The inverter must then be connected to the grid. A generation meter should also be installed to track the amount of electricity generated by the solar panels. You can examine the functioning of your solar system using your computer. You can, for instance, look at how much electricity you create at different times and determine when the best time is to use your washing machine or other utilities.`;

const text7 = `Most solar inverters will have a digital display to show you stats regarding generation and usage of solar units.`;

const text8 = `Finally, a member of your town's planning and zoning commission will come to your home to check your solar installation and sign certified that everything was done correctly and in accordance with local standards. Your solar firm will send someone to meet with the officials and go through all of the technical information with them. Your solar system is officially ready to be linked to the grid once these experts have evaluated it and given it the green light.`;

const SolarInstallationProcess = () => {
  return (
    <Wrapper>
      <BlogIntroSection
        title="SOLAR INSTALLATION PROCESS"
        sx={{ mb: 8 }}
        backgroundImageUrl="https://i.ibb.co/QjvsMp5/image-6-3.png"
      />
      <Container maxWidth="lg" sx={{ padding: { sm: "20px", xs: 0 } }}>
        <Typography sx={{ mb: 2, padding: { xs: "20px", sm: 0 } }}>
          Here we will discuss the process of installing a photovoltaic
          system.The most common location for the installation of solar PV
          panels is the roof. Most roofs typically have the desired
          specifications for the installation, so that panels get the maximum
          sunlight. Nevertheless, if installation on the roof is not applicable
          or desired, the solar panels could also be mounted on the ground. You
          just need to make sure that there are no objects blocking access to
          the sun.
        </Typography>

        <CustomAccordionForBlogs
          title="1. Mount Installation"
          sx={{ mb: 2 }}
          defaultExpanded={true}
        >
          <BlogAccordionContent
            text={text1}
            imageUrl="https://i.ibb.co/qMGWfLY/image-18.png"
          />
        </CustomAccordionForBlogs>
        <CustomAccordionForBlogs
          title="2. Install the solar Panels"
          sx={{ mb: 2 }}
          defaultExpanded={true}
        >
          <BlogAccordionContent
            text={text2}
            imageUrl="https://i.ibb.co/FBmyDDq/image-19.png"
          />
        </CustomAccordionForBlogs>
        <CustomAccordionForBlogs title="3. do electrical wiring" sx={{ mb: 2 }}>
          <BlogAccordionContent
            text={text3}
            imageUrl="https://i.ibb.co/p3YCj71/image-20.png"
          />
        </CustomAccordionForBlogs>
        <CustomAccordionForBlogs
          title="4. connect the system to solar inverter"
          sx={{ mb: 2 }}
        >
          <BlogAccordionContent
            text={text4}
            imageUrl="https://i.ibb.co/34J1fHC/image-21.png"
          />
        </CustomAccordionForBlogs>
        <CustomAccordionForBlogs
          title="5. connect solar inverter and solar battery"
          sx={{ mb: 2 }}
        >
          <BlogAccordionContent
            text={text5}
            imageUrl="https://i.ibb.co/PFJsG8V/image-22.png"
          />
        </CustomAccordionForBlogs>
        <CustomAccordionForBlogs
          title="6. connect solar inverter to the grid"
          sx={{ mb: 2 }}
        >
          <BlogAccordionContent
            text={text6}
            imageUrl="https://i.ibb.co/HDpw0jL/image-23.png"
          />
        </CustomAccordionForBlogs>
        <CustomAccordionForBlogs title="7. start solar inverter" sx={{ mb: 2 }}>
          <BlogAccordionContent
            text={text7}
            imageUrl="https://i.ibb.co/HnS4dCN/image-24.png"
          />
        </CustomAccordionForBlogs>
        <CustomAccordionForBlogs
          title="8. city inspection, approval & interconnection"
          sx={{ mb: 2 }}
        >
          <BlogAccordionContent
            text={text8}
            imageUrl="https://i.ibb.co/wLvCbNZ/image-25.png"
          />
        </CustomAccordionForBlogs>
      </Container>
    </Wrapper>
  );
};

export default SolarInstallationProcess;
