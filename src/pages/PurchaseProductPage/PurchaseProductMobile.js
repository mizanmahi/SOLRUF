

import { Tab, Tabs, Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CopyTextNew from '../../components/CopyText/CopyTextNew';
import CustomBottomBar from '../../components/CustomBottomBar/CustomBottomBar';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import YellowButton from '../../components/YellowButton/YellowButton';
import {
   FeatureBox,
   FeatureItemBoxMobile,
   Flex,
   ProductFeaturesMobile,
} from '../EnquiryPage/enquiryPage.style';
import QuantityControllerForPurchaseProduct from './QuantityControllerForPurchaseProduct';

function PurchaseProductMobile({ product, showDetailModal }) {
   const images = [
      'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
      'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
      'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
      'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
   ];

   const [tabValue, setTabValue] = React.useState(0);
   // const [purchaseQuantity, setPurchaseQuantity] = useState(1);
   const [quantityError, setQuantityError] = useState('');

   const handleChange = (e, newValue) => {
      setTabValue(newValue);
   };
   return (
      <Box sx={{ bgcolor: '#fff', pb: 10 }}>
         <Box sx={{ p: 3 }}>
            <ProductSlider
               images={product?.images.map((img) => img.image_url) || images}
            ></ProductSlider>
            <Box
               sx={{
                  fontWeight: '500',
                  color: 'black',
                  fontSize: '1.1rem',
                  py: 1,
                  mt: 3,
                  mb: 2,
               }}
            >
               {product.product_name || 'Product Name'}
               <Box sx={{ color: 'green' }}>In stock</Box>
            </Box>
            <CopyTextNew url={'www.google.com'} />
         </Box>
         <Box
            sx={{
               bgcolor: '#fff',
               boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
               mt: 3,
            }}
         >
            <Tabs
               value={tabValue}
               onChange={handleChange}
               sx={{ width: '100%' }}
            >
               <Tab
                  label='Purchase'
                  sx={{
                     width: '50%',
                     textTransform: 'capitalize',
                     borderBottom: '1px solid black',
                     fontSize: '.8rem',
                     '&.Mui-selected': {
                        fontWeight: 'bold',
                        color: 'secondary.main',
                     },
                  }}
               />
               <Tab
                  label='Book'
                  sx={{
                     width: '50%',
                     textTransform: 'capitalize',
                     borderBottom: '1px solid black',
                     fontSize: '.8rem',
                     '&.Mui-selected': {
                        fontWeight: 'bold',
                        color: 'secondary.main',
                     },
                  }}
               />
            </Tabs>

            {tabValue === 0 && (
               <Box sx={{ p: 2 }}>
                  👉 <strong>Stock Availability</strong>:- 400 Pieces / 20 kW
                  <Box sx={{ pt: 2 }}>
                     <strong style={{ fontSize: '1.2rem' }}>Rs. 56,000</strong>
                  </Box>
                  <Box>
                     <span style={{ color: '#3FB500', fontWeight: '600' }}>
                        50% OFF{' '}
                     </span>{' '}
                     GST @5% at Rs. 75,000
                  </Box>
                  <Flex justifyContent={'space-between'}>
                     <Grid>
                        <Typography variant='h6' sx={{ mr: 5 }}>
                           Quantity
                        </Typography>
                        <Typography fontSize={'0.8rem'}>
                           Min:2 Max:20
                        </Typography>
                     </Grid>
                     <Grid>
                        <QuantityControllerForPurchaseProduct
                           quantity={1}
                           // setQuantity={setPurchaseQuantity}
                           setQuantityError={setQuantityError}
                           quantityError={quantityError}
                           purchaseBookingTab={0}
                           product_slug={product?.product_slug}
                        />
                     </Grid>
                  </Flex>
                  <table className='table rounded my-4'>
                     <tbody>
                        <tr>
                           <td>
                              {' '}
                              <input type='radio' />{' '}
                           </td>
                           <td> 18-23 </td>
                           <td> 5% </td>
                           <td> Rs. 56,005 </td>
                        </tr>
                        <tr>
                           <td>
                              {' '}
                              <input type='radio' />{' '}
                           </td>
                           <td> 18-23 </td>
                           <td> 5% </td>
                           <td> Rs. 56,005 </td>
                        </tr>
                        <tr>
                           <td>
                              {' '}
                              <input type='radio' />{' '}
                           </td>
                           <td> 18-23 </td>
                           <td> 5% </td>
                           <td> Rs. 56,005 </td>
                        </tr>
                        <tr>
                           <td>
                              {' '}
                              <input type='radio' />{' '}
                           </td>
                           <td> 18-23 </td>
                           <td> 5% </td>
                           <td> Rs. 56,005 </td>
                        </tr>
                     </tbody>
                  </table>
               </Box>
            )}
            {tabValue === 1 && (
               <Box sx={{ px: 2 }}>
                  <Box sx={{ py: 1 }}>
                     👉 <strong>Booking Period:-</strong> 15 Days-1 Month
                  </Box>
                  <Box sx={{ py: 1 }}>
                     👉 <strong>Advanced Payment</strong>:- 20% off Order Value
                  </Box>
                  <Box sx={{ py: 1 }}>
                     👉 <strong>Stock Availability</strong>:- 400 Pieces / 20 kW
                  </Box>
                  <Box sx={{ pt: 2 }}>
                     <strong style={{ fontSize: '1.2rem' }}>
                        Booking Price <br />
                        Rs. 56,000 <br />
                        Rs. 22,000
                     </strong>
                  </Box>
                  <Box>
                     <span style={{ color: '#3FB500', fontWeight: '600' }}>
                        50% OFF{' '}
                     </span>{' '}
                     GST @5% at Rs. 75,000
                  </Box>
                  <Flex justifyContent={'space-between'}>
                     <Grid>
                        <Typography variant='h6' sx={{ mr: 5 }}>
                           Quantity
                        </Typography>
                        <Typography fontSize={'0.8rem'}>
                           Min:2 Max:20
                        </Typography>
                     </Grid>
                     <Grid>
                        <QuantityControllerForPurchaseProduct
                           quantity={1}
                           // setQuantity={setPurchaseQuantity}
                           setQuantityError={setQuantityError}
                           quantityError={quantityError}
                           purchaseBookingTab={0}
                           product_slug={product?.product_slug}
                        />
                     </Grid>
                  </Flex>
               </Box>
            )}
         </Box>
         <ProductFeaturesMobile
            sx={{ bgcolor: 'background: rgba(255, 208, 91, 1);' }}
         >
            <Box className='featuresHeader'>
               <Typography variant='h6'>Product Features</Typography>
            </Box>
            <FeatureBox>
               {product.attributes?.length > 0 &&
                  product.attributes.map((attribute, index) => (
                     <FeatureItemBoxMobile key={index} i={index}>
                        <Typography variant='body'>{attribute.name}</Typography>
                        <Typography variant='body'>
                           {attribute.attribute_values[0].value}
                        </Typography>
                     </FeatureItemBoxMobile>
                  ))}
            </FeatureBox>
            <Box sx={{ textAlign: 'end' }}>
               <Button
                  onClick={showDetailModal}
                  sx={{
                     width: '100px',
                     my: 1,
                     color: '#black',
                     bgcolor: '#FFD05B',
                     fontSize: '0.6rem',
                  }}
                  variant='contained'
                  // endIcon={<DownloadIcon />}
               >
                  View More
               </Button>
            </Box>
         </ProductFeaturesMobile>

         <Box sx={{ p: 2, bgcolor: '#F4F0E4' }}>
            <Typography variant='h4' textAlign={'center'}>
               Product Document
            </Typography>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               {[...Array(3)].map((item, index) => (
                  <Button
                     key={index}
                     sx={{
                        width: '100px',
                        my: 1,
                        color: '#f3f3f3',
                        bgcolor: 'black',
                        fontSize: '0.4rem',
                     }}
                     component='a'
                     href='https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing'
                     target='_blank'
                     variant='contained'
                     // endIcon={<DownloadIcon />}
                  >
                     Certificate name
                  </Button>
               ))}
            </Box>
            <Box sx={{ py: 2 }}>
               Description: Lorem ipsum dolor sit amet, consectetur adipiscing
               elit. Amet bibendum id et tellus, est nisl massa. Tortor lorem
               massa vitae tortor quis. Faucibus consequat, suspendisse ....
            </Box>
            <Box sx={{ textAlign: 'end' }}>
               <Button
                  onClick={showDetailModal}
                  sx={{
                     width: '100px',
                     my: 1,
                     color: '#black',
                     bgcolor: '#FFD05B',
                     fontSize: '0.6rem',
                  }}
                  variant='contained'
                  // endIcon={<DownloadIcon />}
               >
                  View More
               </Button>
            </Box>
         </Box>
         <Box sx={{ p: 2, my: 2 }}>
            <Typography variant='h4' textAlign={'center'}>
               Warranty Card
            </Typography>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               {[...Array(3)].map((item, index) => (
                  <Button
                     key={index}
                     sx={{
                        width: '100px',
                        my: 1,
                        color: '#f3f3f3',
                        bgcolor: 'black',
                        fontSize: '0.4rem',
                     }}
                     component='a'
                     href='https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing'
                     target='_blank'
                     variant='contained'
                     // endIcon={<DownloadIcon />}
                  >
                     Certificate name
                  </Button>
               ))}
            </Box>
            <Box sx={{ py: 2 }}>
               Description: Lorem ipsum dolor sit amet, consectetur adipiscing
               elit. Amet bibendum id et tellus, est nisl massa. Tortor lorem
               massa vitae tortor quis. Faucibus consequat, suspendisse ....
            </Box>
            <Box sx={{ textAlign: 'end' }}>
               <Button
                  onClick={showDetailModal}
                  sx={{
                     width: '100px',
                     my: 1,
                     color: '#black',
                     bgcolor: '#FFD05B',
                     fontSize: '0.6rem',
                  }}
                  variant='contained'
                  // endIcon={<DownloadIcon />}
               >
                  View More
               </Button>
            </Box>
         </Box>

         <Box sx={{ p: 2, bgcolor: '#F4F0E4' }}>
            <Typography variant='h4' textAlign={'center'}>
               Booking Document
            </Typography>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               {[...Array(3)].map((item, index) => (
                  <Button
                     key={index}
                     sx={{
                        width: '100px',
                        my: 1,
                        color: '#f3f3f3',
                        bgcolor: 'black',
                        fontSize: '0.4rem',
                     }}
                     component='a'
                     href='https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing'
                     target='_blank'
                     variant='contained'
                     // endIcon={<DownloadIcon />}
                  >
                     Certificate name
                  </Button>
               ))}
            </Box>
            <Box sx={{ py: 2 }}>
               Description: Lorem ipsum dolor sit amet, consectetur adipiscing
               elit. Amet bibendum id et tellus, est nisl massa. Tortor lorem
               massa vitae tortor quis. Faucibus consequat, suspendisse ....
            </Box>
            <Box sx={{ textAlign: 'end' }}>
               <Button
                  sx={{
                     width: '100px',
                     my: 1,
                     color: '#black',
                     bgcolor: '#FFD05B',
                     fontSize: '0.6rem',
                  }}
                  variant='contained'
                  // endIcon={<DownloadIcon />}
               >
                  onClick={showDetailModal}
                  View More
               </Button>
            </Box>
         </Box>
         <BottomButtons />
      </Box>
   );
}
function BottomButtons() {
   return (
      <>
         <CustomBottomBar>
            <YellowButton
               style={{
                  color: '#4D4D4D',
                  background: '#fff',
                  fontSize: '18px',
                  width: '100%',
                  borderRadius: 'none',
               }}
            >
               {' '}
               Add To Cart
            </YellowButton>
            <YellowButton
               style={{
                  background: '#FFD05B',
                  fontSize: '18px',
                  width: '100%',
                  borderRadius: 'none',
               }}
            >
               {' '}
               Purchase
            </YellowButton>
         </CustomBottomBar>
      </>
   );
}

export default PurchaseProductMobile;
