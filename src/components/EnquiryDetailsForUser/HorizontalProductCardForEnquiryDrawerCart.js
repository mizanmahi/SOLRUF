import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import useProduct from '../../hooks/useProduct';
import { axiAuth } from '../../utils/axiosInstance';
import Loader from '../Loader/Loader';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';
import { HorizontalProductCardWrapper } from './horizontalProductCardForEnquiryDrawer.style';

const HorizontalProductCardForEnquiryDrawerCart = ({ productMeta, sx }) => {
   // const { product: {product}, productLoading, } = useProduct(
   //    productMeta.vendor_slug,
   //    productMeta.product_slug
   // );

   const { productId, vendorId } = productMeta;

   const [product, setProduct] = useState({});
   const [productLoading, setProductLoading] = useState(true);
   const [productError, setProductError] = useState('');

   useEffect(() => {
      const fetchProduct = async () => {
         setProductLoading(true);
         // if (!vendorSlug || !productSlug) return;
         setProductError('');
         try {
            const { status, data } = await axiAuth(
               `api/vendor/${vendorId}/products/${productId}`
            );
            if (status === 200) {
               setProduct(data?.product);
               setProductError('');
               setProductLoading(false);
            }
         } catch (error) {
            setProductLoading(false);
            setProductError('Product not found');
         }
      };

      fetchProduct();
   }, [productId, vendorId]);

   console.log(product);

   const [attributes, setAttributes] = useState([]);

   useEffect(() => {
      if (product?.attributes && product?.attributes.length > 0) {
         setAttributes(
            product.attributes.filter(
               (attribute) =>
                  attribute?.attribute_values[
                     attribute?.attribute_values?.length - 1
                  ]?.views?.procurement_card?.visibility
            )
         );
      }
   }, [product?.attributes]);

   console.log({ product });

   if (productLoading) {
      return <Loader />;
   }
   if (productError) {
      return <Typography variant='h6'>{productError}</Typography>;
   }

   return (
      <HorizontalProductCardWrapper sx={{ ...sx }}>
         <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
               <Box sx={{ width: '100%', height: '200px' }}>
                  <img
                     src={product.default_image}
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
                  window.open(`/products/${product?.product_slug}`, '_blank')
               }
            >
               <Box>
                  <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
                     {product ? product.product_name : 'New Product'}
                  </Typography>

                  {attributes.length > 0 &&
                     attributes
                        ?.filter(
                           (attribute) =>
                              attribute?.attribute_values[
                                 attribute?.attribute_values?.length - 1
                              ]?.views?.procurement_card?.visibility
                        )
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

export default HorizontalProductCardForEnquiryDrawerCart;
