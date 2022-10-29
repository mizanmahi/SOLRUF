import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CheckIcon, ShareIcon } from '@heroicons/react/solid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PaymentTerms = ({ purchaseDrawerData }) => {
   const [showTooltip, setShowTooltip] = useState(false);

   const handleCopyClick = () => {
      const dummyText = `Solruf Payment for OrderId #${purchaseDrawerData?.others?.order_id}
  
  --------------------------------
  Product name : ${purchaseDrawerData.product_name}
  Order amount : ${purchaseDrawerData.others?.total_price}
  --------------------------------
  Payment methods applicable: 
  UPI,IMPS, NEFT/RTGS
  --------------------------------
  
  Account details:
  
  Account Number: 2223330043141250
  Beneficiary Name: SOLRUF INDIA PRIVATE LIMITED
  IFSC: RATN0VAAPIS
  UPI Address: rpy.paysolruf79885857321@icici
  ---------------------------------
  Payment Terms:
  
  1. Select a payment method
  2. Fill in the details
  3. Confirm the payment
  `;
      const textarea = document.getElementById('payDetails');
      textarea.value = dummyText;
      textarea.select();
      document.execCommand('copy');

      setShowTooltip(true);
      setTimeout(() => {
         setShowTooltip(false);
      }, 2000);
   };
   return (
      <>
         <Box
            sx={{
               display: 'flex',
               my: 2,
               justifyContent: 'space-between',
            }}
         >
            <Typography fontWeight={'bold'} variant='h6'>
               Terms
            </Typography>
            <Box
               sx={{
                  display: 'flex',
                  columnGap: 1,
                  alignItems: 'center',
               }}
            >
               <Box sx={{ position: 'relative' }}>
                  {showTooltip && (
                     <Box
                        sx={{
                           position: 'absolute',
                           py: 0,
                           px: 1,
                           bottom: '-100%',
                           left: '-50%',
                           borderRadius: 2,
                           color: '#3FB500',
                           display: 'flex',
                        }}
                     >
                        <CheckIcon
                           style={{
                              width: '22px',
                              color: '#3FB500',
                              fontWeight: 'bolder',
                              marginRight: '0rem',
                           }}
                        />
                        Copied
                     </Box>
                  )}
                  <IconButton onClick={() => handleCopyClick()}>
                     <ContentCopyIcon width={'24px'} />
                  </IconButton>
               </Box>
               <IconButton>
                  <ShareIcon width={'24px'} />
               </IconButton>
            </Box>
         </Box>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               columnGap: 1,
               mb: 1,
            }}
         >
            <Box
               sx={{
                  bgcolor: '#3FB500',
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                  flexShrink: 0,
               }}
            >
               <CheckIcon
                  style={{
                     width: '25px',
                     color: 'white',
                     fontWeight: 'bolder',
                     marginRight: '1rem',
                  }}
               />
            </Box>
            <Typography fontWeight={500}>
               Please transfer the money to the bank account details given in
               the purchase order section.
            </Typography>
         </Box>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               columnGap: 1,
               mb: 1,
            }}
         >
            <Box
               sx={{
                  bgcolor: '#3FB500',
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
               }}
            >
               <CheckIcon
                  style={{
                     width: '25px',
                     color: 'white',
                     fontWeight: 'bolder',
                     marginRight: '1rem',
                  }}
               />
            </Box>
            <Typography fontWeight={500}>
               Exact order amount should be transferred, or else the money will
               be refunded to source account.
            </Typography>
         </Box>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               columnGap: 1,
               mb: 1,
            }}
         >
            <Box
               sx={{
                  bgcolor: '#3FB500',
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
               }}
            >
               <CheckIcon
                  style={{
                     width: '25px',
                     color: 'white',
                     fontWeight: 'bolder',
                     marginRight: '1rem',
                  }}
               />
            </Box>
            <Typography fontWeight={500}>
               {' '}
               As soon as payment is received by Solruf, we will confirm the
               order for further processing and delivery.
            </Typography>
         </Box>
      </>
   );
};

export default PaymentTerms;
