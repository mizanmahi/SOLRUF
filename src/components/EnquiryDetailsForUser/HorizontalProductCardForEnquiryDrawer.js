import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';
import { HorizontalProductCardWrapper } from './horizontalProductCardForEnquiryDrawer.style';

const HorizontalProductCardForEnquiryDrawer = ({
   product,
   productImage,
   sx,
   type,
   productName,
   attributes,
   productId,
}) => {
   console.log('>>>>>>>>>>>>>>>>', product);

  

   console.log({ productId });

   

   return (
      <HorizontalProductCardWrapper sx={{ ...sx }}>
         <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
               <Box sx={{ width: '100%', height: '200px' }}>
                  {/* <ProductSlider images={[...product?.productImages?.map((image)=> image.image_url)]} /> */}
                  <img
                     src={productImage}
                     alt=''
                     style={{
                        maxWidth: '100%',
                        height: '100%',
                        objectFit: 'cover',
                     }}
                  />
               </Box>
            </Grid>
            <Grid
               item
               xs={12}
               sm={8}
               onClick={() =>
                  window.open(`/products/${productId}/${product?.productSlug}`, '_blank')
               }
            >
               <Box>
                  <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
                     {productName ? productName : 'New Product'}
                  </Typography>

                  {attributes?.length > 0 &&
                     attributes
                        .slice(0, 4)
                        .map((attribute) => (
                           <ProductDetailList
                              list={attribute.name}
                              description={`${
                                 attribute?.attribute_values[
                                    attribute?.attribute_values.length - 1
                                 ]?.value
                              } ${
                                 attribute?.attribute_values[
                                    attribute?.attribute_values.length - 1
                                 ]?.value_unit
                              }`}
                           />
                        ))}

                  <RoundedDarkButton
                     title='Check Details'
                     style={{ marginTop: '1rem' }}
                  />
               </Box>
            </Grid>
         </Grid>
      </HorizontalProductCardWrapper>
   );
};

export default HorizontalProductCardForEnquiryDrawer;
