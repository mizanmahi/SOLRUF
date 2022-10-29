import { Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';
import SliderWIthThumbnail from '../SliderWIthThumbnail/SliderWIthThumbnail';

const Wrapper = styled(Box)(({ theme }) => ({
   margin: '1.5rem 0 ',
   background: '#fff',
   padding: '1.5rem 1rem 1.5rem 2rem',
   borderRadius: '30px',
   boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
}));

const shoes = [
   'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
   'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
   'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
   'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
];

const SingleProduct = ({ product }) => {
   console.log(product);
   const { product_name } = product || {};
   return (
      <Wrapper>
         <Grid container spacing={2} alignItems='center'>
            <Grid item md={6} lg={5}>
               {/* ================== Slider with custom image preview indicator */}
               <Box sx={{ maxWidth: '300px' }}>
                  <SliderWIthThumbnail images={shoes} />
               </Box>
            </Grid>
            {/*  === description list start === */}
            <Grid item md={6} lg={7}>
               <Box>
                  <Typography variant='h5' fontWeight={500}>
                     {product_name}
                  </Typography>
                  {/* ====== Nested Grid Start ====== */}
                  <Grid container item spacing={2}>
                     <Grid item sm={6}>
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
                     </Grid>
                     <Grid item sm={6}>
                        <ProductDetailList
                           list='Inverter Type'
                           description='Offgrid/ongrid'
                           hand='hand'
                        />
                        <ProductDetailList
                           list='Location'
                           description='Jaipur'
                           hand='hand'
                        />
                        <ProductDetailList
                           list='Company'
                           description='Amaron'
                           hand='hand'
                        />
                     </Grid>
                  </Grid>
                  {/* ====== Nested Grid Ends ====== */}
                  <Box sx={{ mt: 3 }}>
                     <RoundedDarkButton title='Check Detailed Portfolio' />
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Wrapper>
   );
};

export default SingleProduct;
