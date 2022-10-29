import {
   Box,
   Table,
   TableBody,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
// import useInWords from '../../hooks/useInWords';
import {
   AboutBox,
   AmountWordsWrapper,
   Cell,
   CompanyWrapper,
   DeclarationWrapper,
   InvoiceDetailsWrapper,
   Logo,
   RowWrapper,
   StripWrapper,
   TableHeaderCell,
   TCWrapper,
} from './invoice.style';
import { axiAuth } from '../../utils/axiosInstance';

const Invoice = ({ quoteData, templateRef }) => {
   const [seller, setSeller] = useState({
      logo: 'https://i.ibb.co/rpxqJQB/Sol-Ruf-animated-Logo-1.png',
      name: '',
      address: '',
      email: '',
      phone: '',
      gstin: '',
   });

   console.log(quoteData);

   // const inWords = useInWords();

   const calculateTotal = (items) => {
      return items
         .reduce((accumulator, item) => {
            // return (
            //   accumulator +
            //   ((parseFloat(item.cgst) / 100) * parseFloat(item.product_price) +
            //     (parseFloat(item.igst) / 100) * parseFloat(item.product_price) +
            //     (parseFloat(item.sgst) / 100) * parseFloat(item.product_price) +
            //     parseFloat(item.product_price)) *
            //     item.units_per_quantity
            // );

            return (
               accumulator +
               item.product_price *
                  item.units_per_quantity *
                  (parseFloat(item.cgst) / 100 +
                     parseFloat(item.igst) / 100 +
                     parseFloat(item.sgst) / 100 +
                     1)
            );
         }, 0)
         .toFixed(2);
   };

   useEffect(() => {
      axiAuth
         .get('api/vendor/profile')
         .then(async (res) => {
            const { portfolio } = res.data;
            setSeller({
               name: portfolio.name,
               phone: portfolio.mobile,
               email: portfolio.email,
               address: `${portfolio.location}, ${portfolio.city}, ${portfolio.state}, ${portfolio.pincode},`,
               gstin: portfolio.gst,
               logo: portfolio.logo,
            });
         })
         .catch((err) => {
            console.log('Portfolio data error', err);
         });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Box
      // maxWidth="md"
      sx={{
         background: '#ffffff',
         width: '100%',
         display: 'none',
         flexDirection: 'column',
         border: '1px solid rgba(0,0,0,0.2)',
         '@media (max-width: 600px)': { border: '0' },
         margin: '2rem',
      }}
   >
         <Box padding={2} ref={templateRef}>
            <RowWrapper>
               <CompanyWrapper padding={1}>
                  <Logo>
                     <img src={'https://i.ibb.co/rpxqJQB/Sol-Ruf-animated-Logo-1.png'} alt='' />
                  </Logo>

                  <Typography
                     variant='p'
                     sx={{ fontWeight: '600', fontSize: '1rem' }}
                  >
                     Solruf India Private limited
                  </Typography>
                  <Typography
                     variant='p'
                     sx={{ fontWeight: '600', fontSize: '0.8rem' }}
                  >
                     Solruf India Private limited, World trade center, Mumbai, MH, 400005
                  </Typography>
                  <Typography
                     variant='p'
                     sx={{ fontWeight: '600', fontSize: '0.8rem' }}
                  >
                     Phone: {seller.phone}
                  </Typography>
                  <Typography
                     variant='p'
                     sx={{ fontWeight: '600', fontSize: '0.8rem' }}
                  >
                     Email: support@solruf.com
                  </Typography>
                  <Typography
                     variant='p'
                     sx={{ fontWeight: '600', fontSize: '0.8rem' }}
                  >
                     GST: {seller.gstin}
                  </Typography>
               </CompanyWrapper>

               <InvoiceDetailsWrapper padding={1}>
                  <Typography
                     variant='h4'
                     sx={{ color: '#FFD05B', fontWeight: 'bold' }}
                  >
                     {quoteData?.type === 'TAX_INVOICE'
                        ? 'Tax Invoice'
                        : 'Proforma Invoice'}
                  </Typography>

                 
                  <Typography variant='p'>
                     Created At - {new Date().toLocaleDateString().replace(/\//g, '-')}
                     {/* {`${today.getDate()} | ${today.getMonth()} | ${
                    today.getYear() + 1900
                  }`} */}
                  </Typography>
                  <Typography variant='p'>
                     Due In - 2 days
                     {/* {`${today.getDate()} | ${today.getMonth()} | ${
                    today.getYear() + 1900
                  }`} */}
                  </Typography>
               </InvoiceDetailsWrapper>
            </RowWrapper>
            <RowWrapper
               sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
               }}
            >
               <AboutBox>
                  <Typography
                     variant='p'
                     padding={1}
                     sx={{
                        backgroundColor: '#ffedc4',
                        borderBottom: '1px solid black',
                        fontWeight: 'bold',
                        color: 'black',
                     }}
                  >
                     SELLER
                  </Typography>
                  <Box
                     sx={{ display: 'flex', flexDirection: 'column' }}
                     padding={1}
                  >
                     <Typography variant='p' sx={{ fontWeight: '600' }}>
                        {quoteData?.vendor?.name}
                     </Typography>
                     <Typography variant='p'>
                        Address: {quoteData?.vendor?.location}
                     </Typography>
                     <Typography variant='p'>Phone: {quoteData?.vendor?.mobile}</Typography>
                     <Typography variant='p'>Email: {quoteData?.vendor?.email}</Typography>
                     <Typography variant='p'>GST: {quoteData?.vendor?.gst}</Typography>
                  </Box>
               </AboutBox>

               <AboutBox>
                  <Typography
                     variant='p'
                     padding={1}
                     sx={{
                        backgroundColor: '#ffedc4',
                        borderBottom: '1px solid black',
                        fontWeight: 'bold',
                        color: 'black',
                     }}
                  >
                     BUYER
                  </Typography>
                  <Box
                     sx={{ display: 'flex', flexDirection: 'column' }}
                     padding={1}
                  >
                     <Typography variant='p' sx={{ fontWeight: '600' }}>
                        {quoteData.buyer_name}
                     </Typography>
                     <Typography variant='p' sx={{}}>
                        Contact Number: {quoteData.buyer_phone}
                     </Typography>
                     <Typography variant='p' sx={{}}>
                        Email: {quoteData.buyer_email}
                     </Typography>
                     <Typography variant='p' sx={{}}>
                        Address: {quoteData.buyer_address}
                     </Typography>
                     {quoteData.buyer_website && (
                        <Typography variant='p' sx={{}}>
                           Website: {quoteData.buyer_website}
                        </Typography>
                     )}
                     <Typography variant='p' sx={{}}>
                        GST: {quoteData.buyer_gst}
                     </Typography>
                  </Box>
               </AboutBox>
            </RowWrapper>
            <RowWrapper
               sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
               }}
            >
               <AboutBox>
                  <Typography
                     variant='p'
                     padding={1}
                     sx={{
                        backgroundColor: '#ffedc4',
                        borderBottom: '1px solid black',
                        fontWeight: 'bold',
                        color: 'black',
                     }}
                  >
                     SHIP TO
                  </Typography>
                  <Box
                     sx={{ display: 'flex', flexDirection: 'column' }}
                     padding={1}
                  >
                     <Typography variant='p' sx={{ fontWeight: '600' }}>
                        {quoteData.shipping_name}
                     </Typography>
                     <Typography variant='p' sx={{}}>
                        Contact Number: {quoteData.buyer_phone}
                     </Typography>
                     <Typography variant='p' sx={{}}>
                        Email: {quoteData.buyer_email}
                     </Typography>
                     <Typography variant='p' sx={{}}>
                        Address: {quoteData.buyer_address}
                     </Typography>
                  </Box>
               </AboutBox>

               <AboutBox>
                  <Typography
                     variant='p'
                     padding={1}
                     sx={{
                        backgroundColor: '#ffedc4',
                        borderBottom: '1px solid black',
                        fontWeight: 'bold',
                        color: 'black',
                     }}
                  >
                     BANK DETAILS FOR PAYMENT
                  </Typography>
                  <Box
                     sx={{ display: 'flex', flexDirection: 'column' }}
                     padding={1}
                  >
                     <Typography variant='p' sx={{ fontWeight: '600' }}>
                        A/C Number: {quoteData.bank_account_no}
                     </Typography>
                     <Typography variant='p' sx={{}}>
                        Beneficiary Name: {quoteData.bank_beneficiary_name}
                     </Typography>
                    
                     <Typography variant='p' sx={{}}>
                        IFSC: {quoteData.bank_ifsc}
                     </Typography>
                     <Typography variant='p'>
                        UPI: {quoteData.bank_upi_address}
                     </Typography>
                  </Box>
               </AboutBox>
            </RowWrapper>
            <TableContainer sx={{ width: '100%' }}>
               <Table>
                  <TableHead sx={{ backgroundColor: '#ffedc4' }}>
                     <TableRow>
                        <TableHeaderCell>Sr. No.</TableHeaderCell>
                        <TableHeaderCell>Product Name</TableHeaderCell>
                        <TableHeaderCell>Price (Rs.)</TableHeaderCell>
                        <TableHeaderCell>HSN/SAC</TableHeaderCell>
                        <TableHeaderCell>Units</TableHeaderCell>
                        <TableHeaderCell>Unit Type</TableHeaderCell>
                        <TableHeaderCell>SGST (%)</TableHeaderCell>
                        <TableHeaderCell>CGST (%)</TableHeaderCell>
                        <TableHeaderCell>IGST (%)</TableHeaderCell>
                        <TableHeaderCell>Amount (Rs.)</TableHeaderCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {quoteData.items.map((item, index) => (
                        <TableRow
                           key={item.product_name + index}
                           sx={{
                              backgroundColor: index % 2 !== 0 ? '#fff8ea' : '',
                           }}
                        >
                           <Cell>{index + 1}</Cell>
                           <Cell>{item.product_name}</Cell>
                           <Cell>
                              {parseFloat(item.product_price).toFixed(2)}
                           </Cell>
                           <Cell>{item.hsn_sac_code}</Cell>
                           <Cell>{item.units_per_quantity}</Cell>
                           <Cell>{item.unit_type}</Cell>
                           <Cell>{parseFloat(item.cgst).toFixed(2)}</Cell>
                           <Cell>{parseFloat(item.igst).toFixed(2)}</Cell>
                           <Cell>{parseFloat(item.sgst).toFixed(2)}</Cell>
                           <Cell>
                              {(parseFloat(item.product_price) *
                                 parseFloat(item.units_per_quantity) *
                                 (1 +
                                    (parseFloat(item.cgst) + parseFloat(item.sgst) + parseFloat(item.igst)) / 100)).toFixed(2)}
                           </Cell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
               }}
               padding={1}
            >
               <Typography
                  sx={{
                     color: 'black',
                  }}
               >
                  Grand Total:{' '}
                  <span style={{ fontWeight: 'bold' }}>
                     ₹{calculateTotal(quoteData.items)}
                  </span>
               </Typography>
               <Typography
                  sx={{
                     color: 'black',
                  }}
               >
                  Total Invoice Value:{' '}
                  <span style={{ fontWeight: 'bold' }}>
                     ₹{calculateTotal(quoteData.items)}
                  </span>
               </Typography>
            </Box>
            <AmountWordsWrapper padding={1}>
               <Typography
                  sx={{
                     color: 'black',
                  }}
               >
                  Amount in Words:
               </Typography>
               {/* <Typography
                  variant='p'
                  sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
               >
                  {inWords(
                     parseInt(
                        `${calculateTotal(quoteData.items)}`.split('.')[0]
                     )
                  )?.toUpperCase() +
                     ' RUPEES' +
                     (`${calculateTotal(quoteData.items)}`.split('.')[1] !==
                     '00'
                        ? ' AND ' +
                          inWords(
                             parseInt(
                                `${calculateTotal(quoteData.items)}`.split(
                                   '.'
                                )[1]
                             )
                          )?.toUpperCase() +
                          ' PAISE'
                        : '') +
                     ' ONLY'}
               </Typography> */}
            </AmountWordsWrapper>
            <TCWrapper>
               <Typography
                  sx={{
                     color: 'black',
                  }}
               >
                  Terms & Conditions:
               </Typography>

               {quoteData.terms_conditions.map((ele, idx) => (
                  <Typography sx={{ fontSize: '0.8rem' }} key={'tncr' + idx}>
                     {idx + 1}. {ele}
                  </Typography>
               ))}
            </TCWrapper>
            <DeclarationWrapper>
               <Typography
                  sx={{
                     color: 'black',
                  }}
               >
                  Declaration:
               </Typography>
               <Typography sx={{ fontSize: '0.8rem' }}>
                  We declare that this invoice shows actual price of the goods
                  described inclusive of taxes and that all particulars are true
                  and correct. In case you find Selling Price on this invoice to
                  be more than MRP mentioned on product, please inform{' '}
                  <span style={{ fontWeight: '600', color: 'black' }}>
                     support@solruf.com
                  </span>
               </Typography>
               <Typography
                  sx={{
                     color: 'black',
                     fontWeight: 'bold',
                     textAlign: 'center',
                  }}
               >
                  SOLRUF CUSTOMER CARE: +91-8600694140
               </Typography>
            </DeclarationWrapper>
            <StripWrapper>
               <Typography
                  sx={{
                     color: 'black',
                     fontSize: '0.9rem',
                  }}
               >
                  THIS IS A COMPUTER GENERATED INVOICE AND DOES NOT REQUIRE
                  SIGNATURE
               </Typography>
            </StripWrapper>
         </Box>
      </Box>
   );
};

export default Invoice;
