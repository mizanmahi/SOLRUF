import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import CopyText from '../../components/CopyText/CopyText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const EnquiryProductDetails = ({ productDetails, showVendorName }) => {
  
   return (
      <Box>
         <Typography
            sx={{
               fontSize: '1.5rem',
               fontWeight: 'bold',
               color: '#000000',
            }}
         >
            {productDetails.product_name}
         </Typography>

         {showVendorName && (
            <Typography
               sx={{
                  color: 'gray',
                  fontSize: '12px',
               }}
            >
               {/*  this is the name of vendor not the product */}
               {productDetails.name}
            </Typography>
         )}

         <Box sx={{ mt: 4 }}>
            <Typography
               sx={{
                  color: '#000000',
                  fontSize: '12px',
                  mb: 1,
               }}
            >
               Share your personalized product link with your potential
               customers.
            </Typography>
            <Box>
               <CopyText title={`products/${productDetails?.product_id}/${productDetails?.product_slug}`} />
            </Box>
         </Box>

         <Stack
            direction='column'
            sx={{
               mt: 4,
            }}
            rowGap={2}
         >
            <Typography
               sx={{
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  color: '#000000',
               }}
            >
               Avg. Pricing - Rs. 2500
            </Typography>

            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               <LocalShippingIcon />

               <Typography
                  sx={{
                     color: '#000000',
                     fontSize: '12px',
                     fontWeight: 'bold',
                     ml: 2,
                  }}
               >
                  Fast Delivery
               </Typography>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               <MonetizationOnIcon />
               <Typography
                  sx={{
                     color: '#000000',
                     fontSize: '12px',
                     fontWeight: 'bold',
                     ml: 2,
                  }}
               >
                  Low amount of investment
               </Typography>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               <SupportAgentIcon />
               <Typography
                  sx={{
                     color: '#000000',
                     fontSize: '12px',
                     fontWeight: 'bold',
                     ml: 2,
                  }}
               >
                  24 x 7 Support
               </Typography>
            </Box>
         </Stack>
         <Typography
            color='error'
            sx={{
               fontSize: '12px',
               fontWeight: 'bold',
               mt: 4,
            }}
         >
            Get access to top 100 verified source suppliers for your enquiry.
         </Typography>
      </Box>
   );
};

export default EnquiryProductDetails;
