import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import BlogIntroSection from '../../../components/BlogIntroSection/BlogIntroSection';

const Wrapper = styled(Box)(({ theme }) => ({

}));

const SolarSteps = () => {
   return <Wrapper>
       <BlogIntroSection title='What Steps do I Need to Take Before Solar power system Installation?' />
   </Wrapper>;
};

export default SolarSteps;
