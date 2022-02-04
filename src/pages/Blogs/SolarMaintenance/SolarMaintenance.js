import { Box, Container, styled, Typography } from '@mui/material';
import React from 'react';
import BlogIntroSection from '../../../components/BlogIntroSection/BlogIntroSection';

const Wrapper = styled(Box)(({ theme }) => ({
   // background: '#D0D7D9',
}));

const SolarMaintenance = () => {
   return (
      <Wrapper>
         <BlogIntroSection title='Solar Maintenance' />
         <Container maxWidth='xl'>
            <Typography sx={{my: 10}}>
               Solar panels require extremely little maintenance because they
               have no moving parts. However, you should check them a few times
               a year for dirt or other debris that may have accumulated on top.
               You should check the warranty conditions with your installer
               before washing the panels yourself. If any self-cleaning is done,
               some solar panel manufacturers may void the guarantee. You can
               simply wash the face of the panels with a regular garden hose for
               a general cleaning. Also, do not shower them with cold water
               while they are still hot. You should get your system checked by
               an installation every 4-6 years to see if there are any issues
               that need to be fixed, or something similar.
            </Typography>
         </Container>
      </Wrapper>
   );
};

export default SolarMaintenance;
