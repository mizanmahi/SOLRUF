import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import YellowButton from '../YellowButton/YellowButton';

const Wrapper = styled(Box)(({ theme }) => ({
   maxWidth: '500px',
   padding: theme.spacing(2),
   borderRadius: theme.spacing(1),
   boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
   margin: '1rem auto',
   position: 'relative'
}));

const DottedLine = styled(Box)(({ theme }) => ({
   borderBottom: '2px dashed gray',
}));
const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '1rem',
}));

const ProductCardForMobile = () => {
   return (
      <Wrapper>
         <Typography variant='h6' fontWeight={600} gutterBottom>
            2 Piece full automatic resizable electrodes
         </Typography>
         <DottedLine></DottedLine>
         <Flex>
            <Box sx={{ width: '40%' }}>
               <img
                  src='https://i.ibb.co/rksxWy4/image-47.png'
                  alt=''
                  style={{ width: '100%' }}
               />
            </Box>
            <Box>
               <ProductDetailList
                  list='Price/Watt'
                  description='Rs 256/sq.ft.'
               />
               <ProductDetailList
                  list='Price Of Panel'
                  description='Rs 2500000'
               />
               <ProductDetailList
                  list='Power Capacity'
                  description='1024 Watts'
               />
               <ProductDetailList
                  list='Inverter Type'
                  description='Offgrid/ongrid'
                  //   hand='hand'
               />
            </Box>
         </Flex>
         <YellowButton style={{ width: '80%', margin: '0 auto' }}>
            Purchase
         </YellowButton>
         <img src="https://i.ibb.co/hKxktYY/Frame-184.png" alt="" style={{position: 'absolute', top: 0, right: 0}} />
      </Wrapper>
   );
};

export default ProductCardForMobile;
