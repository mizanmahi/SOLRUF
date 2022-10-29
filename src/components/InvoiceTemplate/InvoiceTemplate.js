import React from 'react';
import { Box, Container, Stack, styled, Typography } from '@mui/material';
import Template4 from '../../pages/Templates/Template4';

const BillTo = styled(Box)(({ theme }) => ({
   width: '50%',
   marginRight: '2rem',
}));
const ShipTo = styled(Box)(({ theme }) => ({
   width: '50%',
}));

const InvoiceTemplate = ({ data }) => {
   const quotation = {
      id: 6,
      name: 'New Quotation',
      invoice_no: '5',
      customer_id: 15,
      due_in: '0',
      buyer_name: 'Solruf',
      buyer_phone: '0162070575',
      buyer_email: 'mizanmahi24@gmail.com',
      buyer_address: '269/15, North Goran, Khilgaon',
      buyer_website: null,
      buyer_gst: '7897456123789451',
      shipping_name: 'Md. Mizanur Rahman',
      shipping_phone: '0155231469',
      shipping_email: 'mizanmahi24@gmail.com',
      shipping_address: '269/15, North Goran, Khilgaon',
      bank_beneficiary_name: 'Mika',
      bank_name: 'City Bank',
      bank_account_no: '789456123',
      bank_ifsc: '789546',
      bank_upi_address: 'U7844658',
      terms_conditions: [
         'We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.',
         'Any additional or deleted services or supplies shall be stated separately in the invoice.',
         'Company is not responsible for any transit damages is done!',
      ],
      items: [
         {
            id: 76,
            quotation_id: 6,
            product_name: 'mizan mahi',
            product_price: 100,
            hsn_sac_code: '0',
            units_per_quantity: 1,
            igst: 18,
            cgst: 18,
            sgst: 18,
            created_at: '27/Sep/2022 08:29 PM',
         },
      ],
      created_at: '27/Sep/2022 08:11 PM',
   };
 
   return (
      <Container
         maxWidth='md'
         sx={{
            my: 3,
         }}
      >
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
            }}
         >
            <Box>
               <Stack>
                  <Typography
                     sx={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                     }}
                  >
                     Company Name
                  </Typography>
                  <Typography
                     sx={{
                        fontWeight: 'bold',
                        fontSize: '1rem',
                     }}
                  >
                     Street Address
                  </Typography>
                  <Typography
                     sx={{
                        fontWeight: 'bold',
                        fontSize: '1rem',
                     }}
                  >
                     Web Site
                  </Typography>
               </Stack>
            </Box>
            <Box>
               <Stack>
                  <Typography
                     sx={{
                        fontWeight: 'bold',
                        fontSize: '1.8rem',
                        color: 'primary.main',
                        textTransform: 'uppercase',
                     }}
                  >
                     Invoice
                  </Typography>
                  <Typography>Date: 12/12/2021</Typography>
                  <Typography>Invoice# 200587489</Typography>
                  <Typography>Customer Id: 192168</Typography>
               </Stack>
            </Box>
         </Box>

         <Box
            sx={{
               display: 'flex',
               width: '100%',
               maxWidth: '600px',
               justifyContent: 'space-between',
               mt: '2rem',
            }}
         >
            <BillTo>
               <Typography
                  sx={{
                     fontWeight: 'bold',
                     fontSize: '1.1rem',
                     textTransform: 'uppercase',
                     backgroundColor: 'primary.main',
                     color: 'primary.dark',
                     p: 1,
                  }}
               >
                  Bill To
               </Typography>
            </BillTo>
            <ShipTo>
               <Typography
                  sx={{
                     fontWeight: 'bold',
                     fontSize: '1.1rem',
                     textTransform: 'uppercase',
                     backgroundColor: 'primary.main',
                     color: 'primary.dark',
                     p: 1,
                  }}
               >
                  Ship To
               </Typography>
            </ShipTo>
         </Box>

         <Template4 quoteData={quotation} />
      </Container>
   );
};

export default InvoiceTemplate;
