import { Container, Box, styled } from '@mui/material';
import React from 'react';

const FilterBox = styled(Box)(({ theme }) => ({
   background: '#D0D7D9',
}));

const CustomerLeads = () => {
   return (
      <Container maxWidth='xl'>
         <FilterBox>
             Customer Leads
         </FilterBox>
      </Container>
   );
};

export default CustomerLeads;
