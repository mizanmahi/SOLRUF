import {
   Box,
   IconButton,
   Stack,
   Step,
   StepLabel,
   Stepper,
   Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
   OtpInputBox,
   StepperBox,
   TotalPriceContainer,
   Ul,
   Wrapper,
} from './enquiryConfirmation.style';
import { useForm } from 'react-hook-form';
import CustomTextArea from '../../CustomTextArea/CustomTextArea';
import SolrufTextField from '../../TextField/TextField';
import PrimaryButton from '../../Custom/PrimaryButton/PrimaryButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import YellowButton from '../../YellowButton/YellowButton';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BlurLinearOutlinedIcon from '@mui/icons-material/BlurLinearOutlined';
import { axiAuth, axiosInstance } from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import SolrufModal from '../../Custom/SolrufModal/SolrufModal';

import CheckoutImg from '../../../media/Svg/CheckoutImg.svg';
import Statement1 from '../../../media/Svg/Statement1.svg';
import Statement2 from '../../../media/Svg/Statement2.svg';
import Statement3 from '../../../media/Svg/Statement3.svg';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const steps = [
   'Step 1 - Address',
   'Step 2 - OTP Confirmation',
   'Step 3 - Payment',
];

const EnquiryConfirmation = ({
   enquiryDetails,
   setShowConfirmation,
   selectedBid,
   onClose,
   // bidDocuments
}) => {
   const [activeState, setActiveState] = useState(0);
   const [otp, setOtp] = useState('');
   const [hash, setHash] = useState('');
   const [checkModal, setCheckModal] = useState(false);

   const { profileData: profData } = useSelector((state) => state.profile);

   // const navigate = useNavigate();

   // console.log(profileData, '=======>>>>>>>=====>>>>');

   const [userData, setUserData] = useState(profData || {});

   console.log({ enquiryDetails, selectedBid, userData });

   const [profileData, setProfileData] = useState({});

   useEffect(() => {
      axiAuth
         .get('api/profile')
         .then((res) => {
            setProfileData(res.data.data);
         })
         .catch((err) => {});
   }, [hash]);

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();

   const [sendingOtp, setSendingOtp] = useState(false);

   const submitHandler = (formData) => {
      console.log('submitting');

      if (activeState === 0) {
         setUserData(formData);
         setSendingOtp(true);
         axiosInstance
            .post(`api/mobile/send-otp`, {
               mobile: formData.phone,
               type: 'checkout',
            })
            .then(({ data }) => {
               console.log(data);
               setHash(data.hash);
               setActiveState(1);
               setSendingOtp(false);
            })
            .catch((err) => {
               setSendingOtp(false);
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
            })
            .catch((err) => {
               console.log(err.message);
               toast.warn(err.response.data.message);
            });
         console.log('verifying');
      }

      console.log({ formData });
   };

   const verifyHandle = () => {
      setCheckModal(true);
      setActiveState(2 - 1);
   };

   const [name, email, phone] = watch(['name', 'userEmail', 'phone']);

   const checkUnderStandHandle = async () => {
      setCheckModal(false);

      const orderData = {
         vendor_id: selectedBid.id,
         type: 'ENQUIRY',
         enquiry_id: enquiryDetails.id,
         expected_delivery: enquiryDetails.delivery_date,
         booking_price: (
            selectedBid?.bid?.price *
            enquiryDetails?.quantity *
            (selectedBid?.bid?.advance_payment / 100)
         ).toFixed(3),
         warranty_years: selectedBid?.bid?.warranty_years,
         bid_details: {
            vendor_name: selectedBid?.portfolio?.name,
            description: selectedBid?.bid?.description,
         },
         customer_details: {
            city: enquiryDetails?.others?.user_address?.city,
            state: enquiryDetails?.others?.user_address?.state,
            pincode: enquiryDetails?.others?.user_address?.pin_code,
            street: enquiryDetails?.others?.user_address?.address,
            accept_other_brand:
               enquiryDetails?.others?.accept_other_brands === 1 ? true : false,
            share_company_info:
               enquiryDetails?.others?.share_company_information === 1
                  ? true
                  : false,
            name,
            email,
            phone,
         },
         details: [
            {
               product_id: enquiryDetails?.others?.product?.other.productId,
               item_price: selectedBid?.bid?.price,
               quantity: enquiryDetails?.quantity,
               advance_payment: selectedBid?.bid?.advance_payment,
               product: {
                  ...enquiryDetails?.others?.product?.other,
                  enquiry_id: enquiryDetails.id,
               },

               cgst: enquiryDetails?.others?.product?.other?.tax_cgst,
               sgst: enquiryDetails?.others?.product?.other?.tax_sgst,
               igst: enquiryDetails?.others?.product?.other?.tax_igst,
            },
         ],
         billing: {
            company_name: profileData?.business?.company_name,
            gst_no: profileData?.business?.gstin,
            pincode: profileData?.business?.pincode,
            address: profileData?.business?.address,

            city: profileData?.business?.city,
            state: profileData?.business?.state,
         },
      };

      console.log(orderData);
      // return;
      try {
         const { status, data } = await axiAuth.post('api/orders', orderData);
         if (status === 200) {
            toast.success('Order placed successfully');
            console.log(data);
            setShowConfirmation(false);
            setActiveState(2);
            onClose();
            // refresh the page
            // window.location.reload();
         }
      } catch (error) {
         console.log(error.message);
      }
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
            console.log(data);
            setHash(data.hash);
            toast.success('OTP resent successfully');
         })
         .catch((err) => console.log(err.message));
   };

   return (
      <Wrapper>
         <IconButton
            sx={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={() => setShowConfirmation(false)}
         >
            <CloseIcon />
         </IconButton>
         <Typography variant='h6' fontWeight={600} sx={{ mb: 1.5 }}>
            Vendor Bids
         </Typography>

         <TotalPriceContainer>
            <Stack columnGap={2}>
               <Typography variant='h4' fontWeight={600}>
                  Name
               </Typography>
               <Typography
                  variant='h6'
                  fontWeight={600}
                  sx={{ color: '#4D4D4D' }}
               >
                  {selectedBid?.portfolio?.name}
               </Typography>
            </Stack>
            <Stack>
               <Typography variant='h4' fontWeight={600}>
                  Bid Value
               </Typography>
               <Typography
                  variant='h6'
                  fontWeight={600}
                  sx={{ color: '#4D4D4D' }}
               >
                  {'₹ ' + selectedBid?.bid?.price * enquiryDetails?.quantity}
               </Typography>
            </Stack>
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

         <Box component='form' onSubmit={handleSubmit(submitHandler)}>
            {activeState === 0 && (
               <Box>
                  <Typography variant='h4' fontWeight={600} sx={{ mb: '2rem' }}>
                     Delivered To :
                  </Typography>
                  <SolrufTextField
                     size='small'
                     label='Name'
                     {...register('name', {
                        required: {
                           value: true,
                           message: 'Name is required',
                        },
                     })}
                     error={errors?.name}
                     helperText={errors.name && errors.name.message}
                  />

                  <SolrufTextField
                     size='small'
                     label='E-mail Address'
                     sx={{ my: 2 }}
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
                     helperText={errors.userEmail && errors.userEmail.message}
                  />
                  <SolrufTextField
                     size='small'
                     type='number'
                     {...register('phone', {
                        required: {
                           value: true,
                           message: 'Phone is Required',
                        },
                     })}
                     error={errors?.phone}
                     helperText={errors.phone && errors.phone.message}
                     label='Phone Number'
                     sx={{}}
                  />

                  <SolrufTextField
                     size='small'
                     label='Pin code'
                     sx={{ mt: 2 }}
                     value={enquiryDetails?.others?.user_address?.pin_code}
                  />
                  <SolrufTextField
                     size='small'
                     label='City/District/Town'
                     sx={{ my: 2 }}
                     value={enquiryDetails?.others?.user_address?.city}
                  />
                  <SolrufTextField
                     size='small'
                     label='State'
                     value={enquiryDetails?.others?.user_address?.state}
                  />
                  <CustomTextArea
                     placeholder='Address'
                     style={{ marginTop: '1rem', marginBottom: 0 }}
                     value={enquiryDetails?.others?.user_address?.address}
                  />
                  <Box>
                     {/* <PrimaryButton
                        sx={{ px: 2 }}
                        IconEnd={ArrowForwardIcon}
                        type='submit'
                     >
                        Next Step
                     </PrimaryButton> */}

                     <PrimaryButton
                        type='submit'
                        loading={sendingOtp}
                        variant='outlined'
                        sx={{
                           width: ['100%', 'auto'],
                        }}
                     >
                        Next Step
                     </PrimaryButton>
                     {/* <LoadingButton
                        type='submit'
                        loading={sendingOtp}
                        variant='outlined'
                        sx={{
                           width:['100%','auto']
                        }}
                     >
                        Next Step
                     </LoadingButton> */}
                  </Box>
               </Box>
            )}

            {activeState === 1 && (
               <Box>
                  <Typography variant='h5' fontWeight={600} textAlign='center'>
                     Confirm Address Details
                  </Typography>
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
                        <Typography>{userData.userEmail}</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <PhoneIcon sx={{ mr: 1 }} /> Phone
                        </Typography>
                        <Typography>{userData.phone}</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <LocationOnIcon sx={{ mr: 1 }} /> Location
                        </Typography>
                        <Typography>
                           {enquiryDetails?.others?.user_address?.address}
                        </Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <ApartmentIcon sx={{ mr: 1 }} /> City
                        </Typography>
                        <Typography>
                           {enquiryDetails?.others?.user_address?.city}
                        </Typography>
                     </li>
                  </Ul>
                  <Typography variant='h5' fontWeight={600} textAlign='center'>
                     Enter OTP
                  </Typography>
                  <Typography
                     variant='body1'
                     fontWeight={500}
                     textAlign='center'
                  >
                     Sent to {userData.phone || `5455`}
                  </Typography>

                  <OtpInputBox>
                     <input
                        type='text'
                        placeholder='Enter OTP'
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                     />
                     {/* <span>00:45</span> */}
                     <button type='button' onClick={recentOtpHandler}>
                        Resent Otp
                     </button>
                  </OtpInputBox>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     <PrimaryButton
                        sx={{ px: 2, flex: 1, mr: 2 }}
                        IconStart={ArrowBackIcon}
                        onClick={() => setActiveState(0)}
                     >
                        Back
                     </PrimaryButton>
                     <PrimaryButton
                        sx={{ px: 2, flex: 1 }}
                        IconEnd={ArrowForwardIcon}
                        type='submit'
                     >
                        Verify & Proceed
                     </PrimaryButton>
                  </Box>
               </Box>
            )}

            {activeState === 2 && (
               <Box>
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
                           <ContentCopyIcon sx={{ color: '#4D4D4D' }} />
                        </IconButton>
                        <IconButton>
                           <ShareIcon sx={{ color: '#4D4D4D' }} />
                        </IconButton>
                     </Box>
                  </Box>

                  <Box sx={{ my: 2, ml: 2, fontWeight: '500' }}>
                     <p>
                        <CheckCircleRoundedIcon sx={{ color: '#3FB500' }} />{' '}
                        This order is valid for 12hr
                     </p>
                     <p>
                        <CheckCircleRoundedIcon sx={{ color: '#3FB500' }} /> We
                        will confirm the order within 30mins of Receiving
                     </p>
                     <p>
                        <CheckCircleRoundedIcon sx={{ color: '#3FB500' }} />{' '}
                        This order is valid for 12hr
                     </p>
                  </Box>

                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                     }}
                  >
                     <YellowButton
                        style={{
                           border: '3px solid #4D4D4D',
                           color: '#000000',
                           background: '#fff',
                           fontSize: '17px',
                           width: '30%',
                           borderRadius: '9PX',
                           padding: '8px',
                        }}
                     >
                        {' '}
                        <SimCardDownloadIcon /> Download Invoice
                     </YellowButton>
                  </Box>

                  <Ul>
                     <Typography
                        variant='h5'
                        fontWeight={600}
                        textAlign='center'
                        sx={{ my: '2rem', color: '#000000' }}
                     >
                        Bank Details
                     </Typography>
                     <li>
                        <Typography fontWeight={600}>
                           <AccountBalanceWalletIcon sx={{ mr: 1 }} /> Account
                           Number
                        </Typography>
                        <Typography>201548788778</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <ShieldOutlinedIcon sx={{ mr: 1 }} /> Beneficiary
                           Name
                        </Typography>
                        <Typography>Jamal Jain</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <AccountBalanceOutlinedIcon sx={{ mr: 1 }} /> IFSC
                           Code
                        </Typography>
                        <Typography>AUC545465486587</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <BlurLinearOutlinedIcon sx={{ mr: 1 }} /> UPI Address
                        </Typography>
                        <Typography>rpy.amanjain@bamkname</Typography>
                     </li>
                  </Ul>
                  <YellowButton
                     style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 600,
                     }}
                  >
                     {' '}
                     <LockIcon sx={{ mr: 1 }} />
                     Pay Rs, 56005
                  </YellowButton>
               </Box>
            )}
         </Box>

         {/* ====== modal area ====== */}
         <SolrufModal open={checkModal} onClose={() => setCheckModal(false)}>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
               }}
            >
               <img src={CheckoutImg} alt='I understand' />
               <Typography
                  sx={{ mt: 2 }}
                  variant='h5'
                  style={{
                     color: '#000000',
                     fontSize: '22px',
                     fontWeight: 600,
                  }}
               >
                  SOLRUF won’t take money from your bank Automatically
               </Typography>
               <Typography sx={{ mt: 2, fontWeight: 400 }} variant='h6'>
                  Manually transfer the money from your bank
               </Typography>
            </Box>
            <Stack sx={{ mt: 5 }}>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'flex-start',
                  }}
               >
                  <img width='35' src={Statement1} alt='statement1' />
                  <Typography
                     sx={{
                        ml: 2,
                     }}
                  >
                     Please transfer the money to the bank account details given
                     in the purchase order section.
                  </Typography>
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'flex-start',
                     my: 2,
                  }}
               >
                  <img width='35' src={Statement2} alt='statement2' />
                  <Typography
                     sx={{
                        ml: 2,
                     }}
                  >
                     Exact order amount should be transferred, or else the money
                     will be refunded to source account.
                  </Typography>
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'flex-start',
                  }}
               >
                  <img width='40' src={Statement3} alt='statement3' />
                  <Typography
                     sx={{
                        ml: 2,
                     }}
                  >
                     As soon as payment is received by Solruf, we will confirm
                     the order for further processing and delivery.
                  </Typography>
               </Box>
            </Stack>
            <YellowButton
               style={{ width: '100%', marginTop: '40px' }}
               onClick={checkUnderStandHandle}
               type='submit'
            >
               I Understand
            </YellowButton>
         </SolrufModal>
      </Wrapper>
   );
};

export default EnquiryConfirmation;
