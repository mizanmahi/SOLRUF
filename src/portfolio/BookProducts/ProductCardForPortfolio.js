import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import ProductDetailList from '../../components/ProductDetailList/ProductDetailList';
import ProductSlider from '../../components/ProductSlider/ProductSlider';

import { ProductCardWrapper } from './productCardForPortfolio.style';

const shoes = [
   'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
   'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
   'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
   'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
];

const ProductCardForPortfolio = ({
   product,
   sx,
   editable,
   actionType,
   vendorSlug,
   openPurchaseModal,
   closePurchaseModal,
}) => {
   const { product_name = 'New Product', product_slug = 'na' } = product || {};
   const navigate = useNavigate();

   const [attributes, setAttributes] = useState([]);

   // console.log(product);

   const findExclusiveAttr = product?.attributes?.find(
      (attr) => attr.name === 'exclusive'
   );

   const exclusive =
      findExclusiveAttr?.attribute_values[
         findExclusiveAttr?.attribute_values.length > 0 ? 1 : 0
      ]?.value === '1';

  

   useEffect(() => {
      if (product.attributes && product.attributes.length > 0) {
         setAttributes(
            product.attributes.filter(
               (attribute) =>
                  attribute?.attribute_values[
                     attribute?.attribute_values?.length - 1
                  ]?.views?.portfolio_card?.visibility
            )
         );
      }
   }, [product.attributes]);

   return (
      <ProductCardWrapper
         sx={{
            ...sx,
         }}
         exclusive={exclusive}
      >
         {product.details.booking_availability && (
            <img
               src='https://i.ibb.co/YNmYkyg/Frame-169-1.png'
               alt=''
               style={{
                  position: 'absolute',
                  top: '2%',
                  left: '2%',
                  zIndex: 10,
               }}
            />
         )}
         {product?.images ? (
            <ProductSlider
               images={product?.images.map((img) => img.image_url)}
            />
         ) : (
            <ProductSlider images={shoes} />
         )}

         <Box sx={{ mb: 3, mt: 1.5 }}>
            <Typography
               variant='h6'
               sx={{ fontWeight: '600', textAlign: 'center' }}
            >
               {product_name.length > 20
                  ? `${product_name.substring(0, 20)}...`
                  : product_name}
            </Typography>

            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
               }}
            >
               <Box>
                  {attributes.length > 0 &&
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
               </Box>
               {exclusive && (
                  <Box
                     sx={{
                        alignSelf: 'flex-end',
                     }}
                  >
                     <img
                        src='https://solruf.s3.ap-south-1.amazonaws.com/image+84.svg'
                        alt='exclusive'
                        style={{
                           width: '60px',
                        }}
                     />
                  </Box>
               )}
            </Box>
         </Box>
         {editable && (
            <PrimaryButton variant='secondary' fullWidth>
               Edit
            </PrimaryButton>
         )}

         {actionType === 'purchase' && (
            <Fragment>
               <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
                  <PrimaryButton
                     fullWidth
                     onClick={() =>
                        navigate(
                           `/purchase-product/${vendorSlug}/${product_slug}`
                        )
                     }
                  >
                     Purchase
                  </PrimaryButton>
               </Box>
               <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                  <PrimaryButton
                     sx={{
                        background: exclusive ? '#328EBA' : '#primary.main',
                        color: exclusive ? '#ffffff' : '#000000',
                     }}
                     fullWidth
                     onClick={() => openPurchaseModal(product)}
                  >
                     Purchase
                  </PrimaryButton>
               </Box>
            </Fragment>
         )}

         {actionType === 'enquiry' && (
            <PrimaryButton
               fullWidth
               onClick={() => navigate(`/products/${product_slug}`)}
            >
               Enquiry
            </PrimaryButton>
         )}
      </ProductCardWrapper>
   );
};

export default ProductCardForPortfolio;

/* 

{/* <img
               src={`${
                  bookingOn
                     ? 'https://i.ibb.co/YNmYkyg/Frame-169-1.png'
                     : 'https://i.ibb.co/PDPmLL2/sale-1-1.png'
               }`}
               alt=''
               style={{ position: 'absolute', top: '3%' }}
            /> 
*/
