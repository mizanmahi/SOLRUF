import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';

const Wrapper = styled(Box)(({ theme }) => ({
   width: '450px',
   maxWidth: '100%',
   borderRadius: '5px',
   background: '#ffffff',
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
   padding: theme.spacing(1),
   marginTop: '1rem',
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

const ProductDetailsCardForMobile = () => {
   return (
      <Wrapper sx={{ mx: 'auto' }}>
         <Box>
            <Typography
               sx={{
                  color: 'green',
                  fontWeight: 500,
                  fontSize: '1rem',
               }}
            >
               Order id - #1234
            </Typography>
            <Typography
               sx={{ fontWeight: 600, mb: 2, pb: .5, borderBottom: '1px dashed gray' }}
            >
               24-inch Solar Cables (10x Powerful) fully ready to Functional
               Power Cables
            </Typography>

            <Flex sx={{ alignItems: 'center' }}>
               <img src='https://i.ibb.co/xL288r1/Rectangle-522.png' alt='' />
               <Box sx={{ ml: 2 }}>
                  <ProductDetailList
                     sx={{ mt: 0 }}
                     hand={true}
                     list='Price/Watt'
                     description='Rs 256/sq.ft.'
                  />
                  <ProductDetailList
                     hand={true}
                     list='Price/Watt'
                     description='Rs 256/sq.ft.'
                  />
                  <ProductDetailList
                     hand={true}
                     list='Price/Watt'
                     description='Rs 256/sq.ft.'
                  />
               </Box>
            </Flex>
            <Box sx={{ mt: 2 }}>
               <RoundedDarkButton
                  style={{ width: '100%' }}
                  title='Product Details'
               />
            </Box>
         </Box>
      </Wrapper>
   );
};

export default ProductDetailsCardForMobile;
