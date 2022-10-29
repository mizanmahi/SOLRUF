import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import ProductDetailList from '../ProductDetailList/ProductDetailList';

const Wrapper = styled(Box)(({ theme }) => ({
   maxWidth: '500px',
   padding: theme.spacing(2),
   borderRadius: theme.spacing(1),
   boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
   margin: '1rem auto',
   position: 'relative',
   backgroundColor: 'white',
   height: '270px',
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

const ProductCardForMobile = ({
   product,
   showBook = true,
   showPurchase = true,
}) => {
   const navigate = useNavigate();
   const [attributes, setAttributes] = useState([]);
   console.log(attributes);

   useEffect(() => {
      if (product.attributes && product.attributes.length > 0) {
         setAttributes(
            product.attributes.filter(
               (attribute) =>
                  attribute?.attribute_values[0]?.views?.procurement_card
                     ?.visibility
            )
         );
      }
   }, [product.attributes]);
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
                     list={attribute.name + ':'}
                        description={`${attribute.attribute_values[0].value} ${attribute.attribute_values[0].value_unit}`}
                  />
               ))}
            </Box>
         </Flex>
         {showPurchase && (
            <PrimaryButton
               fullWidth
               onClick={() => navigate(`/products/${product?.product_slug}`)}
            >
               Enquiry
            </PrimaryButton>
         )}
         {showBook && (
            <img
               src='https://i.ibb.co/hKxktYY/Frame-184.png'
               alt=''
               style={{ position: 'absolute', top: 0, right: 0 }}
            />
         )}
      </Wrapper>
   );
};

export default ProductCardForMobile;
