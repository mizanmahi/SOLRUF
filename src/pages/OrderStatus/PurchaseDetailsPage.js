import { Box, Divider, IconButton, useMediaQuery } from '@mui/material';
import React from 'react';
import { AmountBox, Flex, ListWrapper } from './purchaseDetailsPage.style.js';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Input,
   Radio,
   Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import SolrufTextField from '../../components/TextField/TextField';

import LockIcon from '@mui/icons-material/Lock';
import PageviewIcon from '@mui/icons-material/Pageview';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router';
import { axiAuth } from '../../utils/axiosInstance.js';
import CustomAccordionForDrawer from '../../components/Custom/CustomAccordionForDrawer/CustomAccordionForDrawer.js';
import { AnswerBox } from '../../components/SalesDetailsDrawer/salesDetailsDrawer.style.js';
import { DownloadChip } from '../../components/CustomerDetailsDrawer/customerDetailsDrawer.style.js';
import FeatureDetail from '../../components/FeatureDetail/FeatureDetail.js';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton.js';
import { paymentStatuses } from '../../components/PurchaseDetailsDrawer/constants.js';
import BankDetails from '../../components/PurchaseDetailsDrawer/BankDetails.js';
import PaymentTerms from '../../components/PurchaseDetailsDrawer/PaymentTerms.js';
import HorizontalProductCardForEnquiryDrawerCart from '../../components/EnquiryDetailsForUser/HorizontalProductCardForEnquiryDrawerCart.js';
import HorizontalProductCardForMobile from '../../components/EnquiryDetailsForUser/HorizontalProductCardForMobile.js';
import HorizontalProductCardForEnquiryDrawer from '../../components/EnquiryDetailsForUser/HorizontalProductCardForEnquiryDrawer.js';

import DescriptionIcon from '@mui/icons-material/Description';
import Loader from '../../components/Loader/Loader.js';
import SolrufModal from '../../components/Custom/SolrufModal/SolrufModal.js';
import YellowButton from '../../components/YellowButton/YellowButton.js';
import { useForm } from 'react-hook-form';
import VendorDetailsForPurchaseDetailsPage from '../../components/PurchaseDetailsDrawer/VendorDetailsForPurchaseDetailsPage.js';

const PurchaseDetailsPage = ({ order_reference, mobile, otp, otp_hash }) => {
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   console.log({otp_hash, otp});

   console.log({ order_reference, mobile });

   const [purchaseDrawerData, setPurchaseDrawerData] = useState({});
   const [loading, setLoading] = useState(true);

   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
   const [verifying, setVerifying] = useState(false);
   const [otpError, setOtpError] = useState('');

   const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
   } = useForm();

   console.log({ errors });

   useEffect(() => {
      const fetchPurchaseDetails = async () => {
         setLoading(true);
         try {
            const { data, status } = await axiAuth.get(
               `api/orders/${order_reference}?otp=${otp}&otp_hash=${otp_hash}&mobile=${mobile}`
            );

            if (status === 200) {
               setPurchaseDrawerData(data.order);
               setLoading(false);
               console.log(data);
            }
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      };
      fetchPurchaseDetails();
   }, [mobile, order_reference, otp, otp_hash]);

   // useEffect(() => {
   //    const fetchPurchaseDetails = async () => {
   //       setLoading(true);
   //       try {
   //          const { data, status } = await axiAuth.post('api/get-order', {
   //             order_reference: '838966856187',
   //             mobile: '9932383997',
   //          });

   //          if (status === 200) {
   //             setPurchaseDrawerData(data.order);
   //             setLoading(false);
   //          }
   //       } catch (error) {
   //          console.log(error);
   //          setLoading(false);
   //       }
   //    };
   //    fetchPurchaseDetails();
   // }, []);

   const [queries, setQueries] = useState([]);
   const [enquiryDocuments, setDocuments] = useState(null);
   const [selectedMethod, setSelectedMethod] = useState(null);
   // const [paymentMismatch, setPaymentMismatch] = useState(false);

   console.log({ selectedMethod });

   const [paymentStatus, setPaymentStatus] = useState(
      purchaseDrawerData?.status
   );

   useEffect(() => {
      setPaymentStatus(purchaseDrawerData?.status);
   }, [purchaseDrawerData?.status]);

   const [bankDetails, setBankDetails] = useState(null);

   const [txId, setTxId] = useState('');
   const methods = [
      { value: 'NEFT_RTGS', name: 'NEFT / RTGS' },
      { value: 'UPI', name: 'UPI' },
      { value: 'IMPS', name: 'IMPS' },
   ];

   useEffect(() => {
      axiAuth
         .get(`api/orders/${purchaseDrawerData?.order_id}/queries`)
         .then((res) => {
            setQueries(res.data.conversations);
         })
         .catch((err) => {
            toast.warn(err.response.data.message);
         });

      axiAuth
         .get(
            `https://api-dev.solruf.com/api/orders/${purchaseDrawerData?.order_id}/documents`
         )
         .then((res) => {
            setDocuments(res.data);
            console.log(enquiryDocuments.bid_documents);
         })
         .catch((err) => {});

      axiAuth
         .get(
            `https://api-dev.solruf.com/api/orders/${purchaseDrawerData?.order_id}/payment-methods`
         )
         .then((res) => {
            setBankDetails(res.data.data);
         })
         .catch((err) => {});
      if (purchaseDrawerData.status === paymentStatuses.confirmed) {
         setPaymentStatus(paymentStatuses.confirmed);
      }
      console.log({ purchaseDrawerData });
   }, [enquiryDocuments, purchaseDrawerData]);

   const [hash, setHash] = useState('');

   const sendOtp = async () => {
      try {
         const { status, data } = await axiAuth.post(`api/mobile/send-otp`, {
            mobile: purchaseDrawerData.customer_details.phone,
            type: 'order_payment',
            order_reference: purchaseDrawerData.reference,
         });
         if (status === 200) {
            setHash(data.hash);
            toast.success('OTP sent successfully');
            setConfirmModalOpen(true);
            return;
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   const watchOtp = watch('otp');

   const verifyOtp = async (formData) => {
      console.log(formData);

      setVerifying(true);
      try {
         const { status, data } = await axiAuth.put(
            `api/public/orders/${purchaseDrawerData.order_id}/payment`,
            {
               mobile: purchaseDrawerData.customer_details.phone,
               otp: watchOtp,
               type: 'checkout',
               otp_hash: hash,
               reference_id: txId,
               payment_mode: selectedMethod.value,
            }
         );
         if (status === 200) {
            setVerifying(false);
            console.log(data);
            toast.success('OTP verified successfully');
            setConfirmModalOpen(false);
            return;
         }
      } catch (error) {
         setVerifying(false);
         toast.error('OTP verification failed');
      }
   };

   // const saveTrans = async () => {
   //    axiAuth
   //       .put(
   //          `https://api-dev.solruf.com/api/orders/${purchaseDrawerData?.order_id}/payment`,
   //          {
   //             reference_id: txId,
   //             payment_mode: selectedMethod.value,
   //          }
   //       )
   //       .then((res) => {
   //          toast.success('Payment saved successfully');
   //          setPaymentMismatch(false);
   //          console.log(res.data);
   //          setPaymentStatus(paymentStatuses.confirmed);
   //       })
   //       .catch((err) => {
   //          toast.warn(err.response.data.message);
   //          setPaymentMismatch(true);
   //       });
   // };

   const navigate = useNavigate();

   const handleDetailsClick = (orderType) => {
      if (orderType === 'CART') {
         navigate(
            `/purchase-product/${purchaseDrawerData?.details?.[0].product.product_meta.vendor_slug}/${purchaseDrawerData?.details?.[0].product.product_meta.product_slug}`
         );
      }
   };

   console.log({ paymentStatus });
   console.log({ purchaseDrawerData });

   const resendOtpHandler = async () => {};

   if (loading) {
      return <Loader />;
   }

   return (
      <>
         <Box sx={{ mt: 2, mx: 'auto', width: '100%', maxWidth: '750px' }}>
            <Box
               sx={{
                  mb: 2,
                  // pr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               <Typography variant='h6' sx={{ mr: 2, fontWeight: 500 }}>
                  Order Reference:- <br />#{purchaseDrawerData?.reference}
               </Typography>

               <Box bgcolor='#3FB500' sx={{ px: 1, borderRadius: '5px' }}>
                  <Typography variant='h6' sx={{ color: '#fff' }}>
                     {paymentStatus === paymentStatuses.confirmed
                        ? 'Payment Confirmed'
                        : 'Order Confirmed'}
                  </Typography>
               </Box>
            </Box>

            {/*  product cart or list section */}
            <Box>
               {purchaseDrawerData?.type === 'ENQUIRY' ? (
                  <>
                     <HorizontalProductCardForEnquiryDrawer
                        productImage={
                           purchaseDrawerData?.details?.[0].product
                              ?.defaultImage
                        }
                        productName={
                           purchaseDrawerData?.details?.[0].product?.productName
                        }
                        attributes={
                           // no attributes is present in the product cart
                           purchaseDrawerData?.details?.[0]?.product?.attributes
                        }
                        sx={{ borderRadius: '25px' }}
                        type='enquiry'
                     />
                  </>
               ) : (
                  <>
                     {purchaseDrawerData?.details?.length === 1 && (
                        <>
                           {matches ? (
                              <HorizontalProductCardForMobile
                                 productMeta={
                                    purchaseDrawerData?.details[0]?.product
                                       ?.product_meta
                                 }
                              />
                           ) : (
                              <HorizontalProductCardForEnquiryDrawerCart
                                 productMeta={
                                    purchaseDrawerData?.details[0]?.product
                                       ?.product_meta
                                 }
                                 sx={{ borderRadius: '25px' }}
                              />
                           )}
                        </>
                     )}
                  </>
               )}

               {purchaseDrawerData?.details.length > 1 && (
                  <ListWrapper>
                     {purchaseDrawerData?.details.map((item, index) => (
                        <List
                           sx={{
                              width: '100%',
                              // maxWidth: 360,
                              bgcolor: 'background.paper',

                              backgroundColor: '#f3f3f3',
                              borderRadius: '8px',
                              mb: 1,
                           }}
                        >
                           <ListItem alignItems='flex-start'>
                              <ListItemAvatar>
                                 <Avatar
                                    alt='Remy Sharp'
                                    src={
                                       item.product.product_meta.product_image
                                    }
                                 />
                              </ListItemAvatar>
                              <ListItemText
                                 primary={
                                    purchaseDrawerData?.details?.[index].product
                                       .product_meta.product_name
                                 }
                                 secondary={
                                    <Box
                                       sx={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                       }}
                                    >
                                       <Typography
                                          sx={{ display: 'inline' }}
                                          component='span'
                                          variant='body2'
                                          color='text.primary'
                                       >
                                          {
                                             purchaseDrawerData?.details?.[0]
                                                .product.product_meta
                                                .vendor_name
                                          }
                                       </Typography>

                                       <IconButton
                                          sx={{
                                             mt: -3,
                                             background: '#e5e5ff',
                                          }}
                                          onClick={() =>
                                             handleDetailsClick(
                                                purchaseDrawerData.others.type
                                             )
                                          }
                                       >
                                          <PageviewIcon
                                             sx={{
                                                color: '#2e2ef6',
                                                fontSize: '35px',
                                             }}
                                          />
                                       </IconButton>
                                    </Box>
                                 }
                              />
                           </ListItem>
                        </List>
                     ))}
                  </ListWrapper>
               )}
            </Box>

            {/* //* payment section  ========================================== */}

            <Box sx={{ my: 4 }}>
               <CustomAccordionForDrawer
                  title='Payment Section'
                  noPadding={true}
                  paddingOff={true}
               >
                  <Box sx={{ px: 2 }}>
                     <AmountBox sx={{}}>
                        <Typography variant='h5' fontWeight={'bold'}>
                           Amount
                        </Typography>

                        <Typography variant='h5' fontWeight={'bold'}>
                           {purchaseDrawerData?.booking_price} {' INR'}
                        </Typography>
                     </AmountBox>

                     <Divider
                        sx={{
                           borderStyle: 'unset',
                        }}
                     />

                     {paymentStatus === paymentStatuses.open && (
                        <Box sx={{ px: 1 }}>
                           <PaymentTerms
                              purchaseDrawerData={purchaseDrawerData}
                           />
                           <Box sx={{ mt: 5 }}>
                              <Accordion
                                 defaultExpanded={true}
                                 sx={{
                                    boxShadow: 'none',
                                    // mt: 3,
                                    border: 'none',
                                 }}
                                 style={{ borderRadius: '10px' }}
                                 disableGutters
                              >
                                 <AccordionSummary
                                    sx={{
                                       bgcolor: '#FFD05B',
                                    }}
                                    expandIcon={
                                       <ExpandMoreIcon
                                          sx={{
                                             color: '#000000',
                                             fontSize: '2rem',
                                          }}
                                       />
                                    }
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                 >
                                    <Typography fontWeight={700} variant='h6'>
                                       Select a Payment Method
                                    </Typography>
                                 </AccordionSummary>
                                 <AccordionDetails sx={{ px: 0 }}>
                                    {methods?.map((mt, index) => (
                                       <Box
                                          key={index}
                                          sx={{
                                             display: 'flex',
                                             columnGap: 1,
                                             py: 1,
                                             borderRadius: 1,
                                             my: 1,
                                             alignItems: 'center',
                                             cursor: 'pointer',
                                          }}
                                          style={
                                             mt?.value === selectedMethod?.value
                                                ? {
                                                     background: '#FFD05B',
                                                  }
                                                : {
                                                     background: '#F3F3F3',
                                                  }
                                          }
                                          onClick={() => {
                                             if (
                                                selectedMethod?.value ===
                                                mt.value
                                             ) {
                                                setSelectedMethod(null);
                                             } else {
                                                setSelectedMethod(mt);
                                             }
                                          }}
                                       >
                                          <Radio
                                             checked={
                                                mt?.value ===
                                                selectedMethod?.value
                                             }
                                             sx={{
                                                color: '#666F73 !important',
                                             }}
                                          />
                                          {mt.name}
                                       </Box>
                                    ))}
                                 </AccordionDetails>
                              </Accordion>

                              <BankDetails bankDetails={bankDetails} />

                              <Divider
                                 sx={{
                                    borderStyle: 'unset',
                                 }}
                              />
                              <Box
                                 sx={{
                                    my: 2,
                                    mb: 2,
                                    textAlign: 'center',
                                 }}
                              >
                                 <Typography
                                    fontWeight={700}
                                    variant='h6'
                                    sx={{ mb: 3.5, mt: 2 }}
                                 >
                                    Transaction ID
                                 </Typography>

                                 <Input
                                    value={txId}
                                    onChange={(e) => setTxId(e.target.value)}
                                    disableUnderline={true}
                                    sx={{
                                       bgcolor: '#F3F3F3',
                                       borderRadius: 1,
                                       p: 1,
                                       outline: 'none',
                                       width: '100%',
                                       border: 0,
                                    }}
                                    placeholder='Transaction ID'
                                 />

                                 <PrimaryButton
                                    disabled={!selectedMethod || !txId.trim()}
                                    sx={{ mt: 1, py: 1.3 }}
                                    onClick={sendOtp}
                                    fullWidth
                                    IconStart={LockIcon}
                                 >
                                    Save
                                 </PrimaryButton>
                              </Box>
                           </Box>
                        </Box>
                     )}

                     {paymentStatus === paymentStatuses.processing && (
                        <Box>
                           <Box sx={{ my: 3, textAlign: 'center' }}>
                              <Typography fontWeight={700} variant='h5'>
                                 Transaction ID
                              </Typography>

                              <Typography fontWeight={700} color='black'>
                                 The payment for transaction ID is not
                                 confirmed. Please check if the ID entered is
                                 correct and wait for another 2hrs for
                                 confirmation.
                              </Typography>

                              <Input
                                 value={txId}
                                 // onChange={(e) => setTxId(e.target.value)}
                                 disableUnderline={true}
                                 sx={{
                                    bgcolor: '#F3F3F3',
                                    borderRadius: 2,
                                    p: 1,
                                    outline: 'none',
                                    width: '100%',
                                    border: 0,
                                    mt: 2,
                                 }}
                                 placeholder='Transaction ID'
                              />

                              <Box
                                 sx={{
                                    my: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                 }}
                              >
                                 <PrimaryButton
                                    variant='secondary'
                                    onClick={() =>
                                       setPaymentStatus(paymentStatuses.open)
                                    }
                                    sx={{ px: 5 }}
                                 >
                                    Edit
                                 </PrimaryButton>
                              </Box>
                           </Box>
                        </Box>
                     )}

                     {paymentStatus === paymentStatuses.confirmed && (
                        <Box>
                           <Box sx={{ my: 3, textAlign: 'center' }}>
                              <Typography fontWeight={700} variant='h5'>
                                 Transaction ID
                              </Typography>

                              <Input
                                 value={
                                    purchaseDrawerData?.transaction_reference
                                 }
                                 disableUnderline={true}
                                 sx={{
                                    bgcolor: '#F3F3F3',
                                    borderRadius: 2,
                                    p: 1,
                                    outline: 'none',
                                    width: '100%',
                                    border: 0,
                                    mt: 2,
                                    color: 'primary.dark',
                                 }}
                                 placeholder='Transaction ID'
                              />
                              <Box
                                 sx={{
                                    bgcolor: '#3FB500',
                                    py: 1,
                                    px: 2,
                                    borderRadius: 1,
                                    my: 3,
                                    width: 'fit-content',
                                    mx: 'auto',
                                 }}
                              >
                                 <Typography
                                    variant='h5'
                                    fontWeight={600}
                                    color={'white'}
                                 >
                                    Payment received by SOLRUF
                                 </Typography>
                              </Box>

                              <PrimaryButton
                                 variant='secondary'
                                 sx={{ px: 5 }}
                                 IconStart={DescriptionIcon}
                              >
                                 Tax Invoice
                              </PrimaryButton>
                           </Box>
                        </Box>
                     )}

                     {/* {paymentMismatch && (
                        <Typography color='error' textAlign='center' mb={2}>
                           Payment Mismatch!
                        </Typography>
                     )} */}
                  </Box>
               </CustomAccordionForDrawer>
            </Box>

            {/* //* order details */}
            <Box sx={{ my: 4 }}>
               <CustomAccordionForDrawer
                  title='Order Details'
                  noPadding={true}
                  paddingOff={true}
               >
                  <Box sx={{ p: 2 }}>
                     <Flex
                        sx={{
                           justifyContent: 'flex-start',
                           alignItems: 'flex-start',
                           mt: 1,
                        }}
                     >
                        <Box sx={{ mr: 2, minWidth: '50%' }}>
                           <FeatureDetail
                              icon={<ProductionQuantityLimitsIcon />}
                              title='Quantity'
                              value={purchaseDrawerData?.quantity}
                           />
                           <FeatureDetail
                              icon={<LocationCityIcon />}
                              title='City/District'
                              value={purchaseDrawerData?.customer_details?.city}
                           />
                           <FeatureDetail
                              icon={<LocationOnIcon />}
                              title='Address'
                              value={
                                 purchaseDrawerData?.customer_details?.street
                              }
                           />
                        </Box>
                        <Box>
                           <FeatureDetail
                              icon={<DateRangeIcon />}
                              title='Date'
                              value={purchaseDrawerData?.expected_delivery}
                           />

                           <FeatureDetail
                              icon={<FlagIcon />}
                              title='Pin Code / Zip Code'
                              value={
                                 purchaseDrawerData?.customer_details?.pincode
                              }
                           />
                        </Box>
                     </Flex>

                     {/* Download buttons  */}
                     <Flex sx={{ my: 2, flexWrap: 'wrap' }}>
                        {enquiryDocuments?.documents?.map((document) => (
                           <DownloadChip
                              sx={{ mr: 0.5, mb: 1 }}
                              label={document.name}
                              onClick={() => console.log('Clicked')}
                              component='a'
                              href={document.url}
                              target='_blank'
                           />
                        ))}
                     </Flex>
                     <Box
                        sx={{
                           flexDirection: 'column',
                           '& .MuiFormControlLabel-root': {
                              margin: 0,
                           },
                           mt: 0,
                        }}
                     ></Box>
                  </Box>
               </CustomAccordionForDrawer>
            </Box>

            {/* //* vendor details */}
            <CustomAccordionForDrawer title='Vendor Details' paddingOff={true}>
               <VendorDetailsForPurchaseDetailsPage
                  vendorData={purchaseDrawerData}
                  bid_documents={enquiryDocuments?.bid_documents}
                  enquiryId={purchaseDrawerData.id}
               />
            </CustomAccordionForDrawer>

            {queries.length > 0 && (
               <Box sx={{ my: 4 }}>
                  <CustomAccordionForDrawer title={'Customer Queries'}>
                     {queries.map((query) => (
                        <CustomAccordionForDrawer
                           title={query.question}
                           titleStyle={{ fontSize: '1rem' }}
                           sx={{
                              boxShadow: 0,
                              '& .MuiAccordionSummary-root': {
                                 borderBottom: '1px solid #D0D7D9',
                              },
                           }}
                        >
                           <AnswerBox>
                              <Typography variant='body1'>
                                 Ans.{' '}
                                 <span style={{ color: '#000' }}>
                                    {query.answer}
                                 </span>
                              </Typography>
                           </AnswerBox>
                        </CustomAccordionForDrawer>
                     ))}
                  </CustomAccordionForDrawer>
               </Box>
            )}
         </Box>

         <textarea style={{ opacity: '0' }} id='payDetails' rows='1'></textarea>

         <SolrufModal
            open={confirmModalOpen}
            sx={{ maxWidth: 400 }}
            onClose={() => setConfirmModalOpen(false)}
         >
            <Box component='form' onSubmit={handleSubmit(verifyOtp)}>
               <>
                  <Typography textAlign='center' variant='h5' gutterBottom>
                     Verify OTP
                  </Typography>

                  <Typography textAlign='center' sx={{ mb: 3 }}>
                     Enter OTP sent to{' '}
                     {purchaseDrawerData.customer_details.phone}
                  </Typography>

                  <SolrufTextField
                     size='small'
                     sx={{ appearance: 'none' }}
                     onChange={() => setOtpError('')}
                     type='number'
                     label='Enter OTP'
                     {...register('otp', {
                        required: {
                           value: true,
                           message: 'Please input OTP to continue',
                        },
                        minLength: {
                           value: 6,
                           message: 'OTP must be at least 6 characters long',
                        },
                        maxLength: {
                           value: 6,
                           message: 'OTP must be at most 6 characters long',
                        },
                     })}
                     error={errors.otp}
                     helperText={errors.otp ? errors.otp.message : ''}
                  />
                  <Typography
                     sx={{ mt: 1.5, textAlign: 'center', color: 'error.main' }}
                  >
                     {otpError}
                  </Typography>
                  <Box sx={{ my: 4 }}>
                     <Typography
                        variant='body2'
                        sx={{ color: 'gray', textAlign: 'center' }}
                     >
                        Didn't receive OTP?{' '}
                     </Typography>
                     <Typography
                        component='a'
                        sx={{
                           textDecoration: 'underline !important',
                           color: 'blue',
                           textAlign: 'center',
                           display: 'block',
                           cursor: 'pointer',
                        }}
                        onClick={resendOtpHandler}
                     >
                        Resend OTP
                     </Typography>
                  </Box>
                  {verifying ? (
                     <Loader />
                  ) : (
                     <YellowButton
                        style={{
                           display: 'block',
                           width: '100%',
                           marginTop: '1rem',
                           fontSize: '1.2rem',
                        }}
                        type='submit'
                     >
                        Submit
                     </YellowButton>
                  )}
               </>
            </Box>
         </SolrufModal>
      </>
   );
};

export default PurchaseDetailsPage;
