import { Container, styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import BlogAccordionContent from '../../../components/BlogAccordionContent/BlogAccordionContent';
import BlogIntroSection from '../../../components/BlogIntroSection/BlogIntroSection';
import CustomAccordionForBlogs from '../../../components/CustomAccordionForBlogs/CustomAccordionForBlogs';

const Wrapper = styled(Box)(({ theme }) => ({
    background: '#F3F3F3'
}));

const text1 = `Once you have decided on your requirement for solar power system, it is time to identify a trustworthy solar company. We would advise you to do your research for the solar company you want to get a solar plant from because it is a product for a lifetime, and you would not want to run everywhere in case of a breakdown. Do check product warranties.
`;
const text2 = `The site assessment is the initial step in every residential solar installation. When you  contact a solar installer to inquire about installation, a professional will come to your property to assess its characteristics. The engineer will take measurements, and collect information on shade and sunshine availability on your house's roof, among other places. To calculate the required solar system capacity, the engineer will use your electric bill and the total wattage of all of your equipment. The engineer will also inspect the roof's structure to ensure that the solar panels can be installed without endangering its structural integrity.`;

const text3 = `Different solar panel technologies and designs, as well as different inverters, may be recommended by your installer. They'll explain why each of these solar system components is the superior option for your situation. Before finalizing the design and obtaining the appropriate permits, your installer will seek your approval. Your solar system installation will proceed to the next phase once you approve the design.`;

const text4 = `You’ll need to apply for permits with your local planning and zoning commission before your solar installer can go ahead with the installation. Copies of the permit can be a requirement for certain incentive and financing programs. Your installer will be an excellent source of information about building permit regulations specific to residential areas. The time frame for this step is mainly dependent on how long it takes your installer to get it all finished and submitted.
`;

const text5 = `
The equipment order will be based on the approved design finalized after your site assessment. This equipment order includes two major components: inverters and solar panels. Homeowners should consider price, aesthetics, durability and efficiency before choosing any brand. Once the equipment has been ordered, your home will be added to your installer’s queue. Once your equipment arrives at the installer’s headquarters, the permits are in hand, and your home is at the top of the queue, it’s time for installation.`;

const SolarSteps = () => {
   return (
      <Wrapper>
         <BlogIntroSection
            title='What Steps do I Need to Take Before Solar power system Installation?'
            sx={{ mb: 14 }}
         />
         <Container maxWidth='lg'>
            <CustomAccordionForBlogs title='1. Choose Your Solar Developer' defaultExpanded={true}>
               <BlogAccordionContent
                  text={text1}
                  imageUrl='https://i.ibb.co/wBDgwRm/image-12.png'
               />
            </CustomAccordionForBlogs>
            <CustomAccordionForBlogs title='2. Site and Roof Assessment' sx={{my: 3}} defaultExpanded={true}>
               <BlogAccordionContent
                  text={text2}
                  imageUrl='https://i.ibb.co/CK3VW0P/image-13.png'
               />
            </CustomAccordionForBlogs>
            <CustomAccordionForBlogs title='3. Design Approval'>
               <BlogAccordionContent
                  text={text3}
                  imageUrl='https://i.ibb.co/16MnXhn/image-14.png'
               />
            </CustomAccordionForBlogs>
            <CustomAccordionForBlogs title='4. Permits & Paperwork' sx={{my: 3}}>
               <BlogAccordionContent
                  text={text4}
                  imageUrl='https://i.ibb.co/QrPHh2M/image-15.png'
               />
            </CustomAccordionForBlogs>
            <CustomAccordionForBlogs title='5. ordering solar system equipment' sx={{mb: 3}}>
               <BlogAccordionContent
                  text={text5}
                  imageUrl='https://i.ibb.co/wBDgwRm/image-12.png'
               />
            </CustomAccordionForBlogs>
         </Container>
      </Wrapper>
   );
};

export default SolarSteps;
