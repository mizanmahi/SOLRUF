import {
   Button,
   Container,
   Grid,
   MenuItem,
   styled,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ItemList from '../../components/ItemList/ItemList';
// steppers
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SolrufTextField from '../../components/TextField/TextField';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
// select
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import YellowButton from '../../components/YellowButton/YellowButton';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BlurLinearOutlinedIcon from '@mui/icons-material/BlurLinearOutlined';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useForm } from 'react-hook-form';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ItemContainer = styled('div')(({ theme }) => ({
   width: '100%',
   overflowY: 'auto',
   padding: theme.spacing(1),
   height: '700px',
   marginBottom: '1rem',
}));

const TotalPriceContainer = styled('div')(({ theme }) => ({
   background: theme.palette.secondary.light,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-around',
   borderRadius: '8px',
   padding: theme.spacing(2),
}));

const StepperBox = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   borderRadius: '8px',
   padding: theme.spacing(3),
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.23)',
}));

const Form = styled(Box)(({ theme }) => ({}));

const DeliveredToBox = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   borderRadius: '8px',
   padding: '3rem 3rem',
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.23)',
   marginTop: '1rem',
   marginBottom: '1rem',
}));

const OtpBox = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   borderRadius: '8px',
   padding: theme.spacing(3),
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.23)',
   marginTop: '1rem',
   marginBottom: '1rem',
}));

const BankDetailBox = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   borderRadius: '8px',
   padding: theme.spacing(3),
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.23)',
   marginTop: '1rem',
   marginBottom: '1rem',
}));

const OtpInputBox = styled('div')(({ theme }) => ({
   width: '100%',
   display: 'flex',
   alignItems: 'stretch',
   border: `2px solid ${theme.palette.primary.main}`,
   borderRadius: '8px',
   overflow: 'hidden',
   margin: '2rem auto',
   '& input': {
      width: '60%',
      padding: '.3rem .6rem',
      border: 'none',
      outline: 'none',
      fontSize: '1.1rem',
      fontWeight: 600,
      '&::placeholder': {
         color: 'gray',
         fontWeight: 400,
      },
   },
   '& span': {
      width: '15%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
   },
   '& button': {
      width: '25%',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      fontFamily: 'inherit',
      border: 0,
      outline: 0,
   },
}));

const Ul = styled('ul')(({ theme }) => ({
   listStyle: 'none',
   padding: 0,
   margin: '1rem 0',
   '& li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      padding: '.8rem .5rem',
      borderRadius: '8px',
      '&:nth-of-type(odd)': {
         background: '#ffffff',
      },
   },
}));

const StepNavigatorBox = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
}));

const steps = [
   'Step 1 - Address',
   'Step 2 - OTP Confirmation',
   'Step 3 - Payment',
];

const Checkout = () => {
   const [state, setState] = React.useState('');
   const [district, setDistrict] = React.useState('');
   const [activeState, setActiveState] = useState(0);
   const [pinCode, setPinCode] = useState('');
   const [debouncedPinCode] = useDebounce(pinCode, 3000);
   const [otp, setOtp] = useState('');
   const [phone, setPhone] = useState('');
   const [userData, setUserData] = useState({});

   // const handleStateChange = (event) => {
   //    setState(event.target.value);
   // };

   const handleActiveStateChange = (e) => {
      if (activeState === 0) {
         setActiveState(1);
      } else if (activeState === 1) {
         setActiveState(2);
      }
   };

   const handleBack = (e) => {
      e.stopPropagation();
      console.log('back');
      setActiveState(activeState - 1);
   };

   useEffect(() => {
      if (debouncedPinCode.length !== 6) return;
      const options = {
         method: 'POST',
         url: 'https://pincode.p.rapidapi.com/',
         headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'pincode.p.rapidapi.com',
            'x-rapidapi-key':
               '53d3e51015msh53a0f06a2fd9375p1c3484jsnd53c4f58cf42',
         },
         data: { searchBy: 'pincode', value: debouncedPinCode },
      };
      axios
         .request(options)
         .then(({ data }) => {
            console.log(data);
            setState(data[0].circle);
            setDistrict(data[0].district);
         })
         .catch((error) => {
            console.log({ error });
         });
   }, [debouncedPinCode]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const submitHandler = (formData) => {
      console.log('submitting');
      if (!pinCode) return;

      if (activeState === 0) {
         setPhone(formData.phone);
         setUserData(formData);
         axios
            .post('https://api-dev.solruf.com/api/login', {
               mobile: formData.phone,
            })
            .then(({ data }) => {
               console.log(data);
            })
            .catch((err) => console.log(err));
      }

      console.log({ formData });
      handleActiveStateChange();
   };

   console.log(errors);

   return (
      <div>
         <Container maxWidth='xl'>
            <Grid container spacing={2}>
               <Grid item xs={12} md={6}>
                  <ItemContainer>
                     <ItemList />
                     <ItemList />
                     <ItemList />
                  </ItemContainer>
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
               </Grid>
               <Grid item xs={12} md={6}>
                  <StepperBox sx={{ width: '100%' }}>
                     <Stepper activeStep={activeState} alternativeLabel>
                        {steps.map((label) => (
                           <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                           </Step>
                        ))}
                     </Stepper>
                  </StepperBox>
                  {/* ================== changing area ================== */}
                  <Form component='form' onSubmit={handleSubmit(submitHandler)}>
                     {activeState === 0 && (
                        <DeliveredToBox component='form'>
                           <Typography
                              variant='h4'
                              fontWeight={600}
                              textAlign='center'
                              sx={{ mb: '2rem' }}
                           >
                              Delivered To
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
                              error={errors.name ? true : false}
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
                                 error={errors.userEmail ? true : false}
                                 helperText={errors.userEmail && errors.userEmail.message}
                              />
                              <SolrufTextField
                                 type='number'
                                 {...register('phone', {
                                    required: {
                                       value: true,
                                       message: 'Phone is Required',
                                    },
                                 })}
                                 label='Phone Number'
                                 sx={{ background: '#ffffff' }}
                              />
                           </Box>
                           <CustomTextArea
                              placeholder='Address'
                              style={{ marginTop: 5, background: '#ffffff' }}
                              {...register('address', {
                                 required: {
                                    value: true,
                                    message: 'Address is required',
                                 },
                              })}
                           />
                           <Box sx={{ display: 'flex', mt: 0.5, mb: 1.6 }}>
                              <SolrufTextField
                                 label='Pin code'
                                 sx={{ background: '#ffffff', mr: 1 }}
                                 onChange={(e) => setPinCode(e.target.value)}
                                 // {...register('pinCode', {required: {value: true, message: 'Pin Code is required'}})}
                                 // error={errors.pinCode ? true : false}
                                 // helperText={errors.pinCode && errors.pinCode.message}
                              />
                              <SolrufTextField
                                 label='City/District/Town'
                                 sx={{ background: '#ffffff' }}
                                 value={district}
                              />
                           </Box>
                           {/* <FormControl fullWidth>
                              <InputLabel id='demo-simple-select-label'>
                                 State
                              </InputLabel>
                              <Select
                                 labelId='demo-simple-select-label'
                                 id='demo-simple-select'
                                 value={state}
                                 label='State'
                                 onChange={handleStateChange}
                                 sx={{
                                    background: '#ffffff',
                                    borderColor: 'red',
                                 }}
                              >
                                 <MenuItem value={state}>{state}</MenuItem>
                                 <MenuItem value={20}>Twenty</MenuItem>
                                 <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                           </FormControl> */}
                           <SolrufTextField
                              label='State'
                              value={state}
                              sx={{ background: '#fff' }}
                           />
                        </DeliveredToBox>
                     )}
                     {activeState === 1 && (
                        <OtpBox>
                           <Typography
                              variant='h6'
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
                              <input type='text' placeholder='Enter OTP' />
                              <span>00:45</span>
                              <button>Resent Otp</button>
                           </OtpInputBox>

                           <Typography
                              variant='h5'
                              fontWeight={600}
                              textAlign='center'
                           >
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
                                 <Typography>{userData.address}</Typography>
                              </li>
                              <li>
                                 <Typography fontWeight={600}>
                                    <ApartmentIcon sx={{ mr: 1 }} /> City
                                 </Typography>
                                 <Typography>{state}</Typography>
                              </li>
                           </Ul>
                        </OtpBox>
                     )}

                     {activeState === 2 && (
                        <BankDetailBox>
                           <Typography
                              variant='h5'
                              fontWeight={600}
                              textAlign='center'
                           >
                              Confirm Bank Details
                           </Typography>

                           <Ul>
                              <li>
                                 <Typography fontWeight={600}>
                                    <AccountBalanceWalletIcon sx={{ mr: 1 }} />{' '}
                                    Account Number
                                 </Typography>
                                 <Typography>201548788778</Typography>
                              </li>
                              <li>
                                 <Typography fontWeight={600}>
                                    <ShieldOutlinedIcon sx={{ mr: 1 }} />{' '}
                                    Beneficiary Name
                                 </Typography>
                                 <Typography>Jamal Jain</Typography>
                              </li>
                              <li>
                                 <Typography fontWeight={600}>
                                    <AccountBalanceOutlinedIcon
                                       sx={{ mr: 1 }}
                                    />{' '}
                                    IFSC Code
                                 </Typography>
                                 <Typography>AUC545465486587</Typography>
                              </li>
                              <li>
                                 <Typography fontWeight={600}>
                                    <BlurLinearOutlinedIcon sx={{ mr: 1 }} />{' '}
                                    UPI Address
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
                        </BankDetailBox>
                     )}

                     <StepNavigatorBox>
                        {activeState !== 0 && (
                           <YellowButton
                              style={{
                                 width: '100%',
                                 background: '#F3F3F3',
                                 marginRight: '1rem',
                              }}
                              onClick={handleBack}
                              type='button'
                           >
                              <ArrowBackIcon /> Back
                           </YellowButton>
                        )}
                        <YellowButton
                           style={{ width: '100%' }}
                           // onClick={handleActiveStateChange}
                           type='submit'
                        >
                           Next <ArrowForwardIcon />
                        </YellowButton>
                     </StepNavigatorBox>
                  </Form>
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 3}}>
                     <Button variant='outlined' fullWidth sx={{mr: 1}} color='secondary'startIcon={<ContentCopyIcon />}>Copy</Button>
                     <Button variant='outlined' fullWidth color='secondary' startIcon={<ShareIcon />}>Share</Button>
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};

export default Checkout;
