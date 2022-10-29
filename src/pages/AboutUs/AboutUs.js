import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import AboutUsCarousel from '../../components/AboutUsComponents/AboutUsCarousel';
import Advisors from '../../components/AboutUsComponents/Advisors';
import Specialize from '../../components/AboutUsComponents/Specialize';
import Story from '../../components/AboutUsComponents/Story';
import Team from '../../components/AboutUsComponents/Team';
import WhatWeDo from '../../components/AboutUsComponents/WhatWeDo';
import {
   BlurBackground,
   Sphere1,
   Sphere2,
   Sphere3,
   Sphere4,
   SpheresBackground,
   Wrapper,
} from './AboutUsStyle';



const AboutUs = () => {
   // scroll to top
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <Wrapper>
         <AboutUsCarousel />
         <SpheresBackground>
            <Sphere1 />
            <Sphere2 />
            <Sphere3 />
            <Sphere4 />
            <BlurBackground>
               <Container maxWidth='xl'>
                  <WhatWeDo />
                  <Specialize />
                  <Story />
                  <Advisors />
                  <Team />
               </Container>
            </BlurBackground>
         </SpheresBackground>
      </Wrapper>
   );
};

export default AboutUs;
