import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useProduct from '../../hooks/useProduct';
import Loader from '../Loader/Loader';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';

const Wrapper = styled(Box)(({ theme }) => ({
   maxWidth: '500px',
   padding: theme.spacing(2),
   borderRadius: theme.spacing(1),
   boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',
   margin: '1rem auto',
   position: 'relative',
   backgroundColor: 'white',
   height: '280px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   width: '100%',
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

const HorizontalProductCardForMobile = ({ productMeta }) => {
   // const navigate = useNavigate();
   const {
      product: { product },
      productLoading,
   } = useProduct(productMeta.vendor_slug, productMeta.product_slug);

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
   return (
      <Wrapper>
         <Typography fontSize={15} fontWeight={'bold'} gutterBottom>
            {product.product_name}
         </Typography>
         <DottedLine></DottedLine>
         <Flex sx={{ flexGrow: '1', alignItems: 'center' }}>
            <Box sx={{ width: '40%', pt: 2 }}>
               <Box
                  sx={{
                     width: '125px',
                     height: '115px',
                     borderRadius: 3,
                     overflow: 'hidden',
                  }}
               >
                  <img
                     src={`${
                        product.default_image ||
                        'https://i.ibb.co/rksxWy4/image-47.png'
                     }`}
                     alt=''
                     style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                     }}
                  />
               </Box>
            </Box>

            <Box sx={{ width: '60%' }}>
               {attributes?.slice(0, 3).map((attribute) => (
                  <ProductDetailList
                     key={attribute.id}
                     list={attribute.name}
                     description={attribute?.description}
                  />
               ))}
            </Box>
         </Flex>
         <RoundedDarkButton
            title='Check Details'
            style={{ marginTop: '1rem' }}
            onClick={() =>
                window.open(`/products/${product?.product_slug}`, '_blank')
             }
         />
      </Wrapper>
   );
};

export default HorizontalProductCardForMobile;
