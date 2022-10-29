import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';

import ProductDetailList from '../ProductDetailList/ProductDetailList';
import ProductSlider from '../ProductSlider/ProductSlider';
import { ProductCardWrapper } from './productCard.style';

const shoes = [
   'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
   'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
   'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
   'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
];

const ProductCard = ({ product, bookingOn, sx, editable, actionType }) => {
   const { product_name = 'New Product', product_slug = 'na' } = product || {};
   const navigate = useNavigate();

   console.log(product);

   return (
      <ProductCardWrapper
         sx={{
            ...sx,
         }}
      >
         <img
            src={`${
               bookingOn
                  ? 'https://i.ibb.co/YNmYkyg/Frame-169-1.png'
                  : 'https://i.ibb.co/PDPmLL2/sale-1-1.png'
            }`}
            alt=''
            style={{
               position: 'absolute',
               top: '2%',
               left: '2%',
               zIndex: 1000,
            }}
         />
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
            <ProductDetailList list='Price/Watt' description='Rs 256/sq.ft.' />
            <ProductDetailList list='Price Of Panel' description='Rs 2500000' />
            <ProductDetailList list='Power Capacity' description='1024 Watts' />
            <ProductDetailList list='Power Capacity' description='1024 Watts' />
         </Box>
         {editable && (
            <PrimaryButton variant='secondary' fullWidth>
               Edit
            </PrimaryButton>
         )}

         {actionType === 'purchase' && (
            <PrimaryButton
               fullWidth
               onClick={() => navigate(`/purchaseProduct/${product_slug}`)}
            >
               Purchase
            </PrimaryButton>
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

export default ProductCard;

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
