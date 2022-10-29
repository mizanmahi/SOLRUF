import {
   Container,
   Grid,
   IconButton,
   Stack,
   Typography,
   MenuItem,
} from '@mui/material';
import { Box } from '@mui/system';
import ItemList from '../../components/ItemList/ItemList';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// steppers
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SolrufTextField from '../../components/TextField/TextField';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
// select

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';

// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useForm } from 'react-hook-form';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './Checkout.css';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import SolrufModal from '../../components/Custom/SolrufModal/SolrufModal';
import CheckoutImg from '../../media/Svg/CheckoutImg.svg';
import Statement1 from '../../media/Svg/Statement1.svg';
import Statement2 from '../../media/Svg/Statement2.svg';
import Statement3 from '../../media/Svg/Statement3.svg';
import { axiAuth, axiosInstance } from '../../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import {
   BankDetailBox,
   DeliveredToBox,
   Form,
   ItemContainer,
   OtpBox,
   OtpInputBox,
   StepNavigatorBox,
   StepperBox,
   TotalPriceContainer,
   Ul,
} from './checkout.style';
import { toast } from 'react-toastify';
import { removeCart } from '../../redux/slices/cart/cartSlice';
import useAuth from '../../hooks/useAuth';
import { CreateBusinessBox } from '../../components/EnquiryDetailsForUser/enquiryDetailsForUser.style';
import { useReactToPrint } from 'react-to-print';
import Invoice from '../../components/EnquiryDetailsForUser/Invoice';
import InfoText from '../../components/InfoText/InfoText';

const steps = [
   'Step 1 - Address',
   'Step 2 - OTP Confirmation',
   'Step 3 - Payment',
];

const Checkout = () => {
   const [district, setDistrict] = useState('');
   const [activeState, setActiveState] = useState(0);
   const dispatch = useDispatch();
   const { user, role } = useAuth();

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({
      defaultValues: {
         pinCode: '',
      },
   });

   const watchPinCode = watch('pinCode');
   console.log(watchPinCode);

   const [debouncedPinCode] = useDebounce(watchPinCode, 600);
   // const [otp, setOtp] = useState('');
   const [phone, setPhone] = useState('');
   const [userData, setUserData] = useState({});
   const [checkModal, setCheckModal] = useState(false);

   const { cart } = useSelector((state) => state.cart);
   const { profileData } = useSelector((state) => state.profile);

   console.log({ cart });

   const handleActiveStateChange = (e) => {
      if (activeState === 0) {
         setActiveState(1);
      } else if (activeState === 1) {
         setActiveState(2);
      }
   };

   const handleBack = (e) => {
      e.stopPropagation();
      setActiveState(activeState - 1);
   };
   const verifyHandle = () => {
      setCheckModal(true);
      setActiveState(2 - 1);
   };

   // const checkUnderStandHandle = () => {
   //    setCheckModal(false);
   //    setActiveState(2);
   //    console.log(activeState);
   // };

   useEffect(() => {
      if (debouncedPinCode.length !== 6) return;
      axiAuth
         .get(`api/pin-code/search?pin_code=${debouncedPinCode}`)
         .then(({ data }) => {
            console.log(data);
            setIndiaState(data.pin_code.state);
            setDistrict(data.pin_code.district);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [debouncedPinCode]);

   console.log(userData);
   const [otp, setOtp] = useState('');
   const [hash, setHash] = useState('');

   const submitHandler = async (formData, e) => {
      console.log(formData);
      console.log(cart);

      console.log('submitting');

      if (activeState === 0) {
         setPhone(formData.phone);
         setUserData(formData);
         axiosInstance
            .post(`api/mobile/send-otp`, {
               mobile: formData.phone,
               type: 'checkout',
            })
            .then(({ data }) => {
               console.log(data);
               setHash(data.hash);
               handleActiveStateChange();
            })
            .catch((err) => {
               console.log(err.message);
               toast.warn('Otp sent fail');
            });

         return;
      }

      if (activeState === 1) {
         // verify and proceed

         axiosInstance
            .post(`api/mobile/verify-otp`, {
               mobile: formData.phone,
               otp,
               hash,
            })
            .then((res) => {
               console.log(res.data);
               verifyHandle();
               setHash('');
               setActiveState(2);
            })
            .catch((err) => {
               console.log(err.message);
               toast.warn(err.response.data.message);
            });
         console.log('verifying');
      }

      if (activeState === 2) {
         const purchaseData = {
            vendor_id: cart[0].vendor_id,
            type: 'CART',
            enquiry_id: '',
            expected_delivery: new Date().toISOString(),
            booking_price: 0,
            warranty_years: '-',
            bid_details: {
               vendor_name: cart[0]?.product_meta?.vendor_name,
               description: '-',
            },
            customer_details: {
               city: district,
               state: indiaState,
               street: formData.address,
               pincode: formData.pinCode,
               email: formData.userEmail,
               accept_other_brand: false,
               share_company_info: false,
               ...formData,
            },
            details: [
               ...cart.map((item) => ({
                  product_id: item.product_id,
                  item_price: item.item_price,
                  quantity: item.quantity,
                  advance_payment: '100%',
                  product: {
                     ...item,
                  },
                  sgst: item?.product_meta?.sgst,
                  cgst: item?.product_meta?.cgst,
                  igst: item?.product_meta?.igst,
               })),
            ],
            billing: {
               company_name: profileData?.business.company_name,
               gst_no: profileData?.business.gstin,
               pincode: profileData?.business.pincode,
               address: profileData?.business.address,
               city: profileData?.business.city,
               state: profileData?.business.state,
            },
         };
         console.log({ purchaseData });

         if (user) {
            // user is logged in
            let data, status;
            try {
               const result = await axiAuth.post(`api/orders`, purchaseData);
               data = result.data;
               status = result.status;
            } catch (err) {
               console.log(err);
               toast.error(err.response.data.message);
            }

            if (status === 200) {
               toast.success('Order placed successfully');
               console.log(data);
               try {
                  const { status } = await axiAuth.get(`api/carts/clear`);
                  if (status === 200) {
                     dispatch(removeCart());
                  }
               } catch (error) {
                  console.log(error);
                  toast.error('Something went wrong when clearing the cart');
               }
            }
         } else {
            // user is not logged in
            const { data, status } = await axiAuth.post(
               `api/guest/orders`,
               purchaseData
            );

            if (status === 200) {
               toast.success('Order placed successfully');
               console.log(data);
               try {
                  const { status } = await axiAuth.get(`api/carts/clear`);
                  if (status === 200) {
                     dispatch(removeCart());
                  }
               } catch (error) {
                  console.log(error);
                  toast.error('Something went wrong when clearing the cart');
               }
            }
         }

         setCheckModal(false);
      }
   };

   const [indiaState, setIndiaState] = useState('state');

   const statesOfIndia = useSelector((state) => state.utils.statesOfIndia);

   const handleStateChange = (e) => {
      setIndiaState(e.target.value);
   };

   const watchPhone = watch('phone');

   const recentOtpHandler = (e) => {
      console.log(watchPhone);
      axiosInstance
         .post(`api/mobile/send-otp`, {
            mobile: watchPhone,
            type: 'checkout',
         })
         .then(({ data }) => {
            setHash(data.hash);
            toast.success('OTP resent successfully');
         })
         .catch((err) => console.log(err.message));
   };

   const [invoiceInfo, setInvoiceInfo] = useState(null);
   const invoiceTemplateRef = useRef(null);

   const handlePrint = useReactToPrint({
      content: () => invoiceTemplateRef.current,
      documentTitle: 'Invoice',
   });

   const downloadInvoiceHandler = async () => {
      console.log(cart);
      console.log(userData);

      let vendorData;

      try {
         const { data } = await axiAuth(
            `api/share/${cart[0]?.product_meta?.vendor_slug}`
         );
         vendorData = data?.data?.portfolio;
      } catch (error) {
         toast.error('Error fetching vendor data!');
      }

      if (user) {
         if (!profileData?.business) {
            // const inVoiceData = {
            //    vendor: 'vendor',
            //    due_in: '2',
            //    buyer_name: userData?.name,
            //    buyer_email: userData?.userEmail,
            //    buyer_phone: userData?.phone,
            //    buyer_address: userData?.address,
            //    buyer_website: userData?.website || 'n/a',
            //    buyer_gst: userData?.gst || 'n/a',
            //    shipping_name: userData?.name,
            //    shipping_address: userData?.address,
            //    shipping_email: userData?.email,
            //    shipping_phone: userData?.phone,
            //    bank_beneficiary_name: 'SOLRUF INDIA PRIVATE LIMITED',
            //    bank_name: 'Asd bank',
            //    bank_account_no: '2223330058550280',
            //    bank_ifsc: 'RATN0VAAPIS',
            //    bank_upi_address: 'rpy.paysolrufsolrufguest@icici',
            //    terms_conditions: [
            //       'Please transfer the money to the bank account details given in the purchase order section.',
            //       'Exact order amount should be transferred, or else the money will be refunded to source account.',
            //       'As soon as payment is received by Solruf, we will confirm the order for further processing and delivery.',
            //    ],
            //    items: cart?.map((item) => {
            //       return {
            //          product_name: item?.product_meta?.product_name,
            //          product_price: item?.item_price,
            //          hsn_sac_code: item?.hsn_sac_code || 'n/a',
            //          units_per_quantity: item?.quantity,
            //          igst: 0,
            //          cgst: 5,
            //          sgst: 5,
            //       };
            //    }),
            // };
         }

         const inVoiceData = {
            vendor: vendorData,
            due_in: '2',
            buyer_name: profileData?.business?.company_name,
            buyer_email: profileData?.email,
            buyer_phone: profileData?.mobile,
            buyer_address: profileData?.business?.address,
            buyer_website: profileData?.business?.website || 'n/a',
            buyer_gst: profileData?.business?.gstin,
            shipping_name: userData?.name,
            shipping_address: userData?.address,
            shipping_email: userData?.email,
            shipping_phone: userData?.phone,
            bank_beneficiary_name: 'SOLRUF INDIA PRIVATE LIMITED',
            bank_name: 'Asd bank',
            bank_account_no: '2223330058550280',
            bank_ifsc: 'RATN0VAAPIS',
            bank_upi_address: 'rpy.paysolrufsolrufguest@icici',
            terms_conditions: [
               'Please transfer the money to the bank account details given in the purchase order section.',
               'Exact order amount should be transferred, or else the money will be refunded to source account.',
               'As soon as payment is received by Solruf, we will confirm the order for further processing and delivery.',
            ],
            items: cart?.map((item) => {
               return {
                  product_name: item?.product_meta?.product_name,
                  product_price: item?.item_price,
                  hsn_sac_code: item?.hsn_sac_code || 'n/a',
                  units_per_quantity: item?.quantity,
                  igst: 0,
                  cgst: 5,
                  sgst: 5,
               };
            }),
         };
         setInvoiceInfo(inVoiceData);
      }
      if (!user) {
         const inVoiceData = {
            vendor: vendorData,
            due_in: '2',
            buyer_name: userData?.name,
            buyer_email: userData?.userEmail,
            buyer_phone: userData?.phone,
            buyer_address: userData?.address,
            buyer_website: userData?.website || 'n/a',
            buyer_gst: userData?.gst || 'n/a',
            shipping_name: userData?.name,
            shipping_address: userData?.address,
            shipping_email: userData?.email,
            shipping_phone: userData?.phone,
            bank_beneficiary_name: 'SOLRUF INDIA PRIVATE LIMITED',
            bank_name: 'Asd bank',
            bank_account_no: '2223330058550280',
            bank_ifsc: 'RATN0VAAPIS',
            bank_upi_address: 'rpy.paysolrufsolrufguest@icici',
            terms_conditions: [
               'Please transfer the money to the bank account details given in the purchase order section.',
               'Exact order amount should be transferred, or else the money will be refunded to source account.',
               'As soon as payment is received by Solruf, we will confirm the order for further processing and delivery.',
            ],

            items: cart?.map((item) => {
               return {
                  product_name: item?.product_meta?.product_name,
                  product_price: item?.item_price,
                  hsn_sac_code: item?.hsn_sac_code || 'n/a',
                  units_per_quantity: item?.quantity,
                  igst: 0,
                  cgst: 5,
                  sgst: 5,
               };
            }),
         };
         setInvoiceInfo(inVoiceData);
      }

      handlePrint();
   };

   return (
      <Box sx={{ py: 4, background: '#f3f3f3' }}>
         <Container maxWidth='xl' sx={{ p: [0, 2] }}>
            <Grid container spacing={2}>
               {/* ========= left side ========= */}

               <Grid item xs={12} md={6}>
                  <Typography
                     variant='h4'
                     textAlign='center'
                     fontWeight={600}
                     gutterBottom
                  >
                     Shopping Cart
                  </Typography>
                  <ItemContainer>
                     {cart.length > 0 &&
                        cart.map((cartItem) => <ItemList item={cartItem} />)}
                  </ItemContainer>
               </Grid>

               {/* ========= right side ========= */}

               <Grid item xs={12} md={6}>
                  <Box
                     sx={{
                        background: '#fff',
                        boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',
                        borderRadius: '8px',
                        mb: 2.5,
                     }}
                  >
                     <TotalPriceContainer>
                        <Typography variant='h4' fontWeight={600}>
                           Total Price
                        </Typography>
                        <Box>
                           <Typography variant='h6' fontWeight={600}>
                              Rs. 56,005
                           </Typography>
                           <Typography
                              variant='h5'
                              fontWeight={600}
                              sx={{ color: 'primary.dark' }}
                           >
                              GST @5% at Rs. 75,000
                           </Typography>
                        </Box>
                     </TotalPriceContainer>
                     <StepperBox
                        sx={{
                           width: '100%',
                           background: '#fff',
                           borderRadius: '8px',
                        }}
                     >
                        <Stepper
                           activeStep={activeState}
                           alternativeLabel
                           className='stepper__box'
                        >
                           {steps.map((label) => (
                              <Step key={label}>
                                 <StepLabel>{label}</StepLabel>
                              </Step>
                           ))}
                        </Stepper>
                     </StepperBox>
                     {/* ================== changing area ================== */}
                     <Form
                        component='form'
                        onSubmit={handleSubmit(submitHandler)}
                     >
                        {activeState === 0 && (
                           <DeliveredToBox component='form'>
                              <InfoText>
                                 Add your delivery details in order to generate
                                 proforma invoice.
                              </InfoText>
                              <Typography
                                 variant='h4'
                                 fontWeight={600}
                                 sx={{ mb: '2rem' }}
                              >
                                 Delivered To :
                              </Typography>
                              <SolrufTextField
                                 label='Name'
                                 sx={{
                                    '& .MuiOutlinedInput-root': {
                                       background: '#ffffff',
                                    },
                                 }}
                                 {...register('name', {
                                    required: {
                                       value: true,
                                       message: 'Name is required',
                                    },
                                 })}
                                 error={errors?.name}
                                 helperText={errors.name && errors.name.message}
                              />
                              <Box sx={{ display: 'flex', my: 1 }}>
                                 <SolrufTextField
                                    label='E-mail Address'
                                    sx={{ mr: 1, background: '#ffffff' }}
                                    {...register('userEmail', {
                                       required: {
                                          value: true,
                                          message: 'User Email is Required',
                                       },
                                       pattern: {
                                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                          message: 'Invalid email address',
                                       },
                                    })}
                                    error={errors?.userEmail}
                                    helperText={
                                       errors.userEmail &&
                                       errors.userEmail.message
                                    }
                                 />
                                 <SolrufTextField
                                    type='number'
                                    {...register('phone', {
                                       required: {
                                          value: true,
                                          message: 'Phone is Required',
                                       },
                                    })}
                                    error={errors?.phone}
                                    helperText={
                                       errors.phone && errors.phone.message
                                    }
                                    label='Phone Number'
                                    sx={{ background: '#ffffff' }}
                                 />
                              </Box>
                              <CustomTextArea
                                 placeholder='Address'
                                 style={{ background: '#ffffff', marginTop: 0 }}
                                 {...register('address', {
                                    required: {
                                       value: true,
                                       message: 'Address is required',
                                    },
                                 })}
                                 errorMessage={errors?.address?.message}
                              />
                              <Box sx={{ display: 'flex', mt: 2, mb: 1.6 }}>
                                 <SolrufTextField
                                    label='Pin code'
                                    sx={{ background: '#ffffff', mr: 1 }}
                                    {...register('pinCode', {
                                       required: {
                                          value: true,
                                          message: 'Pin Code is required',
                                       },
                                    })}
                                    error={errors.pinCode ? true : false}
                                    helperText={
                                       errors.pinCode && errors.pinCode.message
                                    }
                                 />
                                 <SolrufTextField
                                    label='City/District/Town'
                                    sx={{ background: '#ffffff' }}
                                    value={district}
                                 />
                              </Box>

                              <SolrufTextField
                                 label='State'
                                 value={indiaState}
                                 sx={{ background: '#fff' }}
                                 select
                                 onChange={handleStateChange}
                              >
                                 {statesOfIndia.map((state) => (
                                    <MenuItem value={state}>{state}</MenuItem>
                                 ))}
                              </SolrufTextField>
                           </DeliveredToBox>
                        )}
                        {activeState === 1 && (
                           <OtpBox>
                              {user && !profileData?.business && (
                                 <CreateBusinessBox
                                    onClick={() => {
                                       if (role === 'Vendor') {
                                          window.open(
                                             '/vendor/dashboard/profile',
                                             '_blank'
                                          );
                                       } else {
                                          window.open(
                                             '/user-dashboard/profile',
                                             '_blank'
                                          );
                                       }
                                    }}
                                    sx={{
                                       cursor: 'pointer',
                                       mb: 3,
                                    }}
                                 >
                                    <Typography
                                       sx={{
                                          color: '#fff',
                                          fontWeight: 'bold',
                                       }}
                                    >
                                       Create your business profile to confirm
                                       the order and download invoice!
                                    </Typography>
                                    <NotificationsActiveIcon
                                       sx={{
                                          color: '#fff',
                                          fontSize: '35px',
                                       }}
                                    />
                                 </CreateBusinessBox>
                              )}
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 3,
                                 }}
                              >
                                 <Typography variant='h5' fontWeight={600}>
                                    Confirm Address Details
                                 </Typography>
                                 <PrimaryButton
                                    onClick={downloadInvoiceHandler}
                                    disabled={cart.length === 0}
                                 >
                                    Download Invoice
                                 </PrimaryButton>
                              </Box>
                              <Ul>
                                 <li>
                                    <Typography fontWeight={600}>
                                       <PersonIcon sx={{ mr: 1 }} /> Name
                                    </Typography>
                                    <Typography>{userData.name}</Typography>
                                 </li>
                                 <li>
                                    <Typography fontWeight={600}>
                                       <EmailIcon sx={{ mr: 1 }} /> E-mail
                                    </Typography>
                                    <Typography>
                                       {userData.userEmail}
                                    </Typography>
                                 </li>
                                 <li>
                                    <Typography fontWeight={600}>
                                       <PhoneIcon sx={{ mr: 1 }} /> Phone
                                    </Typography>
                                    <Typography>{userData.phone}</Typography>
                                 </li>
                                 <li>
                                    <Typography fontWeight={600}>
                                       <LocationOnIcon sx={{ mr: 1 }} />{' '}
                                       Location
                                    </Typography>
                                    <Typography>{userData.address}</Typography>
                                 </li>
                                 <li>
                                    <Typography fontWeight={600}>
                                       <ApartmentIcon sx={{ mr: 1 }} /> City
                                    </Typography>
                                    <Typography>{district}</Typography>
                                 </li>
                              </Ul>
                              <Typography
                                 variant='h5'
                                 fontWeight={600}
                                 textAlign='center'
                              >
                                 Enter OTP
                              </Typography>
                              <Typography
                                 variant='body1'
                                 fontWeight={500}
                                 textAlign='center'
                              >
                                 Sent to {phone}
                              </Typography>

                              <OtpInputBox>
                                 <input
                                    type='text'
                                    placeholder='Enter OTP'
                                    onChange={(e) => setOtp(e.target.value)}
                                    value={otp}
                                 />
                                 {/* <span>00:45</span> */}
                                 <button
                                    type='button'
                                    onClick={recentOtpHandler}
                                 >
                                    Resent Otp
                                 </button>
                              </OtpInputBox>
                           </OtpBox>
                        )}

                        {activeState === 2 && (
                           <BankDetailBox>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                 }}
                              >
                                 <div></div>
                                 <Typography
                                    variant='h5'
                                    fontWeight={600}
                                    sx={{ ml: 8, color: '#000000' }}
                                 >
                                    Payment
                                 </Typography>
                                 <Box>
                                    <IconButton>
                                       <ContentCopyIcon
                                          sx={{ color: '#4D4D4D' }}
                                       />
                                    </IconButton>
                                    <IconButton>
                                       <ShareIcon sx={{ color: '#4D4D4D' }} />
                                    </IconButton>
                                 </Box>
                              </Box>

                              <Box sx={{ my: 2, ml: 2, fontWeight: '500' }}>
                                 <p>
                                    <CheckCircleRoundedIcon
                                       sx={{ color: '#3FB500' }}
                                    />{' '}
                                    This order is valid for 12hr
                                 </p>
                                 <p>
                                    <CheckCircleRoundedIcon
                                       sx={{ color: '#3FB500' }}
                                    />{' '}
                                    We will confirm the order within 30mins of
                                    Receiving
                                 </p>
                                 <p>
                                    <CheckCircleRoundedIcon
                                       sx={{ color: '#3FB500' }}
                                    />{' '}
                                    This order is valid for 12hr
                                 </p>
                              </Box>

                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                 }}
                              >
                                 <PrimaryButton
                                    sx={{
                                       py: 1.5,
                                    }}
                                    variant='secondary'
                                    IconStart={SimCardDownloadIcon}
                                    onClick={downloadInvoiceHandler}
                                 >
                                    Download Invoice
                                 </PrimaryButton>
                              </Box>

                              {
                                 <PrimaryButton
                                    sx={{
                                       width: '100%',
                                       backgroundColor: '#3FB500 !important',
                                       fontWeight: 600,
                                       py: 1.5,
                                       mt: 3,
                                       color: '#FFFFFF',
                                    }}
                                 >
                                    Please go to purchase page to compete the
                                    payment!
                                 </PrimaryButton>
                              }
                           </BankDetailBox>
                        )}

                        {activeState !== 2 && (
                           <StepNavigatorBox>
                              {activeState === 1 && (
                                 <PrimaryButton
                                    onClick={handleBack}
                                    IconStart={ArrowBackIcon}
                                    sx={{
                                       flex: '1',
                                       boxShadow: 'none',
                                       borderRadius: '0 0 0 8px',
                                       background: '#f3f3f3',
                                       py: [1.5, 1],
                                       position: ['fixed', 'relative'],
                                       bottom: 0,
                                       left: 0,
                                       width: '50%',
                                    }}
                                 >
                                    Previous
                                 </PrimaryButton>
                              )}
                              {activeState === 0 && (
                                 <PrimaryButton
                                    sx={{
                                       px: '4rem',
                                       ml: [0, 'auto'],
                                       mb: [0, 3],
                                       mr: [0, 5],
                                       py: 1,
                                       width: ['100%', 'auto'],
                                       position: ['fixed', 'relative'],
                                       bottom: 0,
                                    }}
                                    type='submit'
                                    IconEnd={ArrowForwardIcon}
                                 >
                                    Next Step
                                 </PrimaryButton>
                              )}
                              {activeState === 1 && (
                                 <PrimaryButton
                                    // onClick={verifyHandle}
                                    IconEnd={ArrowForwardIcon}
                                    sx={{
                                       flex: '1',
                                       boxShadow: 'none',
                                       borderRadius: '0 0 8px 0',
                                       py: [1.5, 1],
                                       position: ['fixed', 'relative'],
                                       bottom: 0,
                                       right: 0,
                                       width: '50%',
                                    }}
                                    type='submit'
                                 >
                                    Verify & Proceed
                                 </PrimaryButton>
                              )}
                           </StepNavigatorBox>
                        )}
                        {/* ====== modal area ====== */}
                        <SolrufModal
                           open={checkModal}
                           onClose={() => setCheckModal(false)}
                        >
                           <Box
                              sx={{
                                 textAlign: 'center',
                              }}
                           >
                              <img src={CheckoutImg} alt='I understand' />
                              <h5
                                 className='mt-4'
                                 style={{ color: '#000000', fontSize: '22px' }}
                              >
                                 SOLRUF won’t take money from your bank
                                 Automatically
                              </h5>
                              <p className='mt-3'>
                                 Manually transfer the money from your bank
                              </p>
                           </Box>
                           <Stack sx={{ mt: 5 }}>
                              <p>
                                 <img
                                    width='35'
                                    className='mr-2 mt-2'
                                    src={Statement1}
                                    alt='statement1'
                                 />{' '}
                                 Statement
                              </p>
                              <p>
                                 <img
                                    width='35'
                                    className='mr-2 mt-2'
                                    src={Statement2}
                                    alt='statement2'
                                 />{' '}
                                 Statement
                              </p>
                              <p>
                                 <img
                                    width='40'
                                    className='mr-1 mt-2'
                                    src={Statement3}
                                    alt='statement3'
                                 />{' '}
                                 Statement
                              </p>
                           </Stack>
                           <PrimaryButton
                              sx={{ width: '100%', marginTop: '40px' }}
                              onClick={() => handleSubmit(submitHandler)()}
                           >
                              I Understand
                           </PrimaryButton>
                        </SolrufModal>
                     </Form>
                  </Box>
               </Grid>
            </Grid>
            {invoiceInfo && (
               <Invoice
                  quoteData={invoiceInfo}
                  templateRef={invoiceTemplateRef}
               />
            )}
         </Container>
      </Box>
   );
};

export default Checkout;
