import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import ProductSlider from '../ProductSlider/ProductSlider';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';
import { HorizontalProductCardWrapper } from './horizontalProductCard.style';

const shoes = [
   'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
   'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
   'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
   'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
];

const HorizontalProductCard = ({ product, sx, type }) => {
   console.log('>>>>>>>>>>>>>>>>', product);

   const [attributes, setAttributes] = useState([]);
   const [sliderImages, setSliderImages] = useState([]);

   useEffect(() => {
      console.log('changing attributes');
      if (type === 'procurement') {
         if (product.attributes && product.attributes.length > 0) {
            setAttributes(
               product.attributes.filter(
                  (attribute) =>
                     attribute?.attribute_values[0]?.views?.procurement_card
                        ?.visibility
               )
            );

            
         }

         setSliderImages(
            product?.images?.length
               ? product?.images.map((img) => img.image_url)
               : shoes
         );
      } else if (type === 'enquiry') {
         setAttributes(
            product?.other?.attributes?.filter(
               (attribute) =>
                  attribute?.attribute_values[0]?.views?.procurement_card
                     ?.visibility
            )
         );

         setSliderImages(
            product?.other?.productImages?.length
               ? product?.other?.productImages.map((img) => img.image_url)
               : shoes
         );
      }
   }, [product, type]);

   console.log(attributes);
   return (
      <HorizontalProductCardWrapper sx={{ ...sx }}>
         <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
               <Box sx={{ width: '300px' }}>
                  <ProductSlider images={sliderImages} />
               </Box>
            </Grid>
            <Grid
               item
               xs={12}
               sm={6}
               onClick={() =>
                  window.open(`/products/${product?.product_slug}`, '_blank')
               }
            >
               <Box>
                  <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
                     {product?.product_name
                        ? product?.product_name
                        : 'New Product'}
                  </Typography>

                  {attributes.length > 0 &&
                     attributes
                        .slice(0, 4)
                        .map((attribute) => (
                           <ProductDetailList
                              list={attribute.name}
                              description={`${attribute.attribute_values[0].value} ${attribute.attribute_values[0].value_unit}`}
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

export default HorizontalProductCard;
