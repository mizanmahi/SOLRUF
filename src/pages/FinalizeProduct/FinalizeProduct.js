import { Button, Container, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HorizontalProductCard from '../../components/HorizontalProductCard/HorizontalProductCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';

const Wrapper = styled('div')(({ theme }) => ({}));

const FinalizeProduct = ({ nextHandler }) => {
   return (
      <Wrapper>
         <Button
            startIcon={<ArrowBackIcon />}
            sx={{ color: '#000000', mt: 2 }}
            onClick={() => nextHandler(1)}
         >
            Back
         </Button>

         <Container maxWidth='xl'>
            <Grid container spacing={3} alignItems='center' sx={{ mt: 2 }}>
               <Grid item xs={12} md={5} lg={4}>
                  <Typography
                     variant='h4'
                     textAlign='center'
                     fontWeight={600}
                     sx={{ mb: 3 }}
                  >
                     Card View
                  </Typography>
                  {/* <ProductCard noModal={true} /> */}
               </Grid>
               <Grid item xs={12} md={7} lg={8}>
                  <Typography
                     variant='h4'
                     textAlign='center'
                     fontWeight={600}
                     sx={{ mb: 3 }}
                  >
                     List View
                  </Typography>

                  {/* <HorizontalProductCard noModal={true} /> */}
               </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
               <PrimaryButton sx={{ px: 8, py: 1, mb: 2 }}>Next</PrimaryButton>
            </Box>
         </Container>
      </Wrapper>
   );
};

export default FinalizeProduct;
