import { Container, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import BlogAccordionContent from '../../../components/BlogAccordionContent/BlogAccordionContent';
import BlogIntroSection from '../../../components/BlogIntroSection/BlogIntroSection';
import BlogTitledBox from '../../../components/BlogTitledBox/BlogTitledBox';
import CustomAccordionForBlogs from '../../../components/CustomAccordionForBlogs/CustomAccordionForBlogs';

const Wrapper = styled(Box)(({ theme }) => ({
   marginBottom: '1rem',
}));
const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-around',
   alignItems: 'stretch',
}));

const text1 = `A grid-connected system is a simple setup that makes use of a
grid-connected inverter. It's great for individuals who want to
install solar panels in their homes. We can use net metering to
send any excess energy back to the grid. Customers will only be
charged for the difference in energy used in this manner. The key
benefit of using a grid-connected solar PV system is that it is
less expensive than other solar PV systems. Furthermore, because
the system does not have to supply all of the household's
demands, it provides design flexibility. PV systems that are
connected to the grid do not require battery storage. However,
the addition of a battery to a grid-connected PV system gives the
home more energy independence. It means less reliance on grid
electricity and energy dealers, as well as the certainty that
electricity may be drawn from the grid if the solar system isn't
producing enough.`;

const text2 = `A standalone PV system (also known as an off-grid solar system) is one that is not connected to the electrical grid. As a result, a battery storage solution is required. Rural areas that have trouble connecting to the grid can benefit from stand-alone PV installations. These systems are appropriate for powering applications such as water pumps, ventilation fans, and solar thermal heating systems because they do not rely on electrical energy storage.
`;

const text3 = `
A hybrid PV system combines different power sources to improve power availability and utilization. A system like this can use energy from the wind, the sun, or even hydrocarbons. In addition, to enhance the system's efficiency, hybrid PV systems are frequently backed up with a battery. The presence of multiple energy sources indicates that the system is not reliant on a single source of energy.
`;

const PvSystems = () => {
   return (
      <Wrapper>
         <BlogIntroSection title='Types of PV Systems' />
         <Container maxWidth='lg'>
            <Typography sx={{ mb: 2 }}>
               PV systems that are connected to the grid do not require battery
               storage. A battery can, however, be added to a grid-connected
               solar system at any time.
            </Typography>
            {/*  accordion 1 */}
            <CustomAccordionForBlogs title='1. Grid-Connect Systems'>
               <BlogAccordionContent
                  text={text1}
                  imageUrl='https://i.ibb.co/PtW7Myq/image-10.png'
               />
            </CustomAccordionForBlogs>

            <Flex>
               <BlogTitledBox title='METERING SYSTEM' sx={{ mr: 3 }}>
                  The meter is used for measuring the electricity produced by
                  your system before being exported to the grid, as is the case
                  in most of India. The electricity will run through your meter
                  before reaching the switchboard and not after it. The consumer
                  is then charged for net electricity used over a month or year
                  period.
               </BlogTitledBox>
               <BlogTitledBox title='ELECTRICITY GRID'>
                  Electricity that is sent to the grid from your solar system
                  can then be used by other consumers on the grid (your
                  neighbours). When your solar system is not operating, or you
                  are using more electricity than your system is producing, you
                  will start importing or consuming electricity from the grid.
                  Unlike hybrid systems, On-grid solar systems are not able to
                  function or generate electricity during blackout for safety
                  reasons.
               </BlogTitledBox>
            </Flex>

            <CustomAccordionForBlogs
               title='2. Standalone Systems'
               text={text2}
               sx={{ mt: 3 }}
            >
               <BlogAccordionContent
                  text={text1}
                  imageUrl='https://i.ibb.co/sJkr4XW/image-28.png'
               />
            </CustomAccordionForBlogs>

            <Flex>
               <BlogTitledBox title='BATTERY BANK' sx={{ mr: 3 }}>
                  Once solar power is used by the appliances in your property,
                  any excess power will be sent to your battery bank. Once the
                  battery is full it will stop receiving power from the solar
                  system. When your solar system is not working (night time or
                  cloudy days), your appliances will draw power from the
                  batteries.
               </BlogTitledBox>
               <BlogTitledBox title='BANKUP GENERATOR'>
                  For times of the year when the batteries are low on charge and
                  the weather is very cloudy you will generally need a backup
                  power source, such as a backup generator. The size of the
                  backup generator (measured in kVA) should be adequate to
                  supply your house and charge the batteries at the same time.
               </BlogTitledBox>
            </Flex>

            <CustomAccordionForBlogs
               title='3. Hybrid PV Systems'
               text={text2}
               sx={{ mt: 3 }}
            >
               <BlogAccordionContent
                  text={text3}
                  imageUrl='https://i.ibb.co/djR2Nb1/image-29.png'
               />
            </CustomAccordionForBlogs>

            <Flex>
               <BlogTitledBox title='BATTERY BANK' sx={{ mr: 3 }}>
               In a hybrid system once the solar power is used by the appliances in your property, any excess power will be sent to the battery bank. Once the battery bank is fully charged, it will stop receiving power from the solar system. The energy from the battery can then be discharged and used to power your home, usually during the peak evening period when the cost of electricity is typically at its highest.
               </BlogTitledBox>
               <BlogTitledBox title='ELECTRICITY GRID'>
               Depending on how your hybrid system is set up and whether your utility allows it, once your batteries are fully charged excess solar power not required by your appliances can be exported to the grid via your meter. When your solar system is not in use, and if you have drained the usable power in your batteries your appliances will then start drawing power from the grid.
               </BlogTitledBox>
            </Flex>
         </Container>
      </Wrapper>
   );
};

export default PvSystems;
