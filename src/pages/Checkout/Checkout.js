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

const Form = styled('div')(({ theme }) => ({}));

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
      fontSize: '1.3rem',
      fontWeight: 'bold',
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
      '&:nth-child(odd)': {
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
   const [activeState, setActiveState] = useState(0);
   const [pinCode, setPinCode] = useState('');
   const [debouncedPinCode] = useDebounce(pinCode, 3000);
   const [otp, setOtp] = useState('');
   const [number, setNumber] = useState('');

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

   const handleBack = () => {
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
         })
         .catch((error) => {
            console.log({ error });
         });
   }, [debouncedPinCode]);



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
                  <Form component='form'>
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
                              sx={{ background: '#ffffff' }}
                           />
                           <Box sx={{ display: 'flex', my: 1 }}>
                              <SolrufTextField
                                 label='E-mail Address'
                                 sx={{ mr: 1, background: '#ffffff' }}
                              />
                              <SolrufTextField
                                 label='Phone Number'
                                 sx={{ background: '#ffffff' }}
                              />
                           </Box>
                           <CustomTextArea
                              placeholder='Address'
                              style={{ marginTop: 5, background: '#ffffff' }}
                           />
                           <Box sx={{ display: 'flex', mt: 0.5, mb: 1.6 }}>
                              <SolrufTextField
                                 label='Pin code'
                                 sx={{ background: '#ffffff', mr: 1 }}
                                 onChange={(e) => setPinCode(e.target.value)}
                              />
                              <SolrufTextField
                                 label='City/District'
                                 sx={{ background: '#ffffff' }}
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
                              Sent to +91 25-665-668
                           </Typography>

                           <OtpInputBox>
                              <input type='text' />
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
                                    <PersonIcon /> Name
                                 </Typography>
                                 <Typography>Mizanur Rahman</Typography>
                              </li>
                              <li>
                                 <Typography fontWeight={600}>
                                    <PersonIcon /> Name
                                 </Typography>
                                 <Typography>Mizanur Rahman</Typography>
                              </li>
                              <li>
                                 <Typography fontWeight={600}>
                                    <PersonIcon /> Name
                                 </Typography>
                                 <Typography>Mizanur Rahman</Typography>
                              </li>
                              <li>
                                 <Typography fontWeight={600}>
                                    <PersonIcon /> Name
                                 </Typography>
                                 <Typography>Mizanur Rahman</Typography>
                              </li>
                              <li>
                                 <Typography fontWeight={600}>
                                    <PersonIcon /> Name
                                 </Typography>
                                 <Typography>Mizanur Rahman</Typography>
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
                           <YellowButton style={{width: '100%', display:'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 600}}> <LockIcon sx={{mr: 1}} />Pay Rs, 56005</YellowButton>
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
                           >
                              <ArrowBackIcon /> Back
                           </YellowButton>
                        )}
                        <YellowButton
                           style={{ width: '100%' }}
                           onClick={handleActiveStateChange}
                        >
                           Next <ArrowForwardIcon />
                        </YellowButton>
                     </StepNavigatorBox>
                  </Form>
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};

export default Checkout;
