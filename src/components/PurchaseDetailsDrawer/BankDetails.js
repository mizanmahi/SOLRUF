import { Box, Typography } from '@mui/material';
import React from 'react';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BlurLinearOutlinedIcon from '@mui/icons-material/BlurLinearOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Ul } from '../../pages/Checkout/checkout.style';

const BankDetails = ({ bankDetails }) => {
   return (
      <Box sx={{ mb: 4 }}>
         <Ul>
            <Typography
               variant='h5'
               fontWeight={600}
               textAlign='center'
               sx={{
                  my: '2rem',
                  color: '#000000',
               }}
            >
               Bank Details
            </Typography>
            <li>
               <Typography
                  fontWeight={600}
                  sx={{
                     display: 'flex',

                     alignItems: 'center',
                  }}
               >
                  <AccountBalanceWalletIcon sx={{ mr: 1 }} /> Account Number
               </Typography>
               <Typography>
                  {' '}
                  {bankDetails?.account_no || '2223330058550280'}{' '}
               </Typography>
            </li>
            <li>
               <Typography
                  fontWeight={600}
                  sx={{
                     display: 'flex',
                  }}
               >
                  <ShieldOutlinedIcon sx={{ mr: 1 }} /> Beneficiary Name
               </Typography>
               <Typography>
                  {' '}
                  {bankDetails?.account_name ||
                     'SOLRUF INDIA PRIVATE LIMITED'}{' '}
               </Typography>
            </li>
            <li>
               <Typography
                  fontWeight={600}
                  sx={{
                     display: 'flex',
                  }}
               >
                  <AccountBalanceOutlinedIcon sx={{ mr: 1 }} /> IFSC Code
               </Typography>
               <Typography> {bankDetails?.ifsc || 'RATN0VAAPIS'} </Typography>
            </li>
            <li>
               <Typography
                  fontWeight={600}
                  sx={{
                     display: 'flex',
                  }}
               >
                  <BlurLinearOutlinedIcon sx={{ mr: 1 }} /> UPI Address
               </Typography>
               <Typography>
                  {bankDetails?.vpa_id || 'rpy.paysolrufsolrufguest@icici'}
               </Typography>
            </li>
         </Ul>
      </Box>
   );
};

export default BankDetails;
