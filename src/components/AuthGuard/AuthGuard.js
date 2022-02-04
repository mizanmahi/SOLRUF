import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
   setLoginMode,
   setRegisterMode,
   setVerificationMode,
   setVerificationMode2,
} from '../../redux/slices/loginStepSlice';
import { axiosInstance } from '../../utils/axiosInstance';
import SolrufTextField from '../TextField/TextField';
import YellowButton from '../YellowButton/YellowButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { saveUser } from '../../redux/slices/userSlice';
import { closeLoginModal } from '../../redux/slices/loginModalSlice';

const Wrapper = styled(Box)(({ theme }) => ({}));
const Form = styled(Box)(({ theme }) => ({}));
const FormTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.5rem',
   fontWeight: 'bold',
   marginBottom: '1rem',
}));
const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '1rem',
   '& p': {
      textTransform: 'uppercase ',
      fontSize: '11px',
      fontWeight: 'bold',
   },
   '& svg': {
      cursor: 'pointer',
      color: 'gray',
   },
}));

const UserNameBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   marginBottom: '1rem',
}));

const RoleBox = styled(Box)(({ theme }) => ({
   margin: '1rem 0',
   display: 'flex',
   justifyContent: 'space-between',
   flexDirection: 'column',
   alignItems: 'center',
}));

const UserTypeBox = styled(Box)(({ theme }) => ({
   display: 'block',
   padding: '1rem 0',
}));

const UserBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   background: '#D0D7D9',
   padding: '.5rem',
   borderRadius: '6px',
   border: '2px solid #000000',

   cursor: 'pointer',
   flex: 1,
   '&:hover': {
      opacity: '0.9',
   },
}));
const VendorBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   background: '#D0D7D9',
   padding: '.5rem',
   borderRadius: '6px',
   border: '2px solid #000000',
   cursor: 'pointer',
   marginBottom: '1rem',
   flex: 1,
   '&:hover': {
      opacity: '0.9',
   },
}));

const Text = styled(Box)(({ theme }) => ({
   textAlign: 'right',
   flex: '1',
}));

const Circle = styled(Box)(({ theme }) => ({
   width: '1.5rem',
   height: '1.5rem',
   borderRadius: '50%',
   border: '2px solid #000000',
   marginRight: '1rem',
}));

const AuthGuard = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
   console.log(errors);

   const { loginMode, registerMode, verificationMode, verificationMode2 } =
      useSelector((state) => state.loginStep); // mode switching state

   const dispatch = useDispatch();

   const [phone, setPhone] = useState('');
   const [sendingOtp, setSendingOtp] = useState(false);
   const [verifying, setVerifying] = useState(false);
   const [registering, setRegistering] = useState(false);
   const [role, setRole] = useState('Vendor');
   const [otpError, setOtpError] = useState('');
   const [registerError, setRegisterError] = useState('');
   console.log(role);

   const handleUserClick = (event) => {
      setRole('User');
   };
   const handleVendorClick = (event) => {
      setRole('Vendor');
   };

   const handleRegister = async (userInputs) => {
      const { phone, otp, first_name, last_name, email } = userInputs;

      if (loginMode) {
         try {
            setSendingOtp(true);
            const { data } = await axiosInstance.post('api/login', {
               mobile: phone,
            });
            if (data.message === 'OTP Sent') {
               console.log('OTP Sent');
               setPhone(phone);
               dispatch(setLoginMode(false));
               setSendingOtp(false);
               dispatch(setVerificationMode(true));
            }
         } catch (error) {
            // console.log(error.response);
            setPhone(phone);
            dispatch(setLoginMode(false));
            dispatch(setRegisterMode(true));
            setSendingOtp(false);
         }
      }

      if (verificationMode || verificationMode2) {
         try {
            setVerifying(true);
            const { data } = await axiosInstance.post('api/verify-otp', {
               mobile: phone,
               otp,
            });

            if (data.message === 'OTP Verified') {
               console.log('OTP Verified');
               setOtpError('');
               dispatch(setVerificationMode(false));
               dispatch(setVerificationMode2(false));
               dispatch(setLoginMode(true));
               setVerifying(false);
               dispatch(saveUser(data));
               dispatch(closeLoginModal());
            }
         } catch (error) {
            setOtpError('Invalid OTP');
            setVerifying(false);
         }
      }

      if (registerMode) {
         try {
            setRegistering(true);
            const { data } = await axiosInstance.post('api/register', {
               first_name,
               last_name,
               mobile: phone,
               email: email ? email : '',
               role,
            });
            console.log(data);
            if (data.message === 'Success') {
               console.log('OTP Sent');
               setRegisterError('');
               setPhone(phone);
               setRegistering(false);
               dispatch(setRegisterMode(false));
               dispatch(setVerificationMode2(true));
            }
         } catch (error) {
            setRegisterError(error.response.data.message);
            setRegistering(false);
         }
      }
   };

   const backHandler = () => {
      setOtpError('');
      if (verificationMode) {
         dispatch(setVerificationMode(false));
         dispatch(setLoginMode(true));
      } else if (registerMode) {
         setRegisterError('');
         dispatch(setRegisterMode(false));
         dispatch(setLoginMode(true));
      }
   };

   const backToRegisterHandler = () => {
      setOtpError('');
      dispatch(setVerificationMode2(false));
      dispatch(setRegisterMode(true));
   };

   const resendOtpHandler = async () => {
      try {
         const { data } = await axiosInstance.post('api/login', {
            mobile: phone,
         });
         if (data.message === 'OTP Sent') {
            console.log('OTP Resend');
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Wrapper>
         <Form component={'form'} onSubmit={handleSubmit(handleRegister)}>
            {loginMode && (
               <>
                  <FormTitle>Sign Up / Log In</FormTitle>
                  <SolrufTextField
                     type='number'
                     label='Enter Your Number'
                     {...register('phone', {
                        required: {
                           value: true,
                           message: 'Please input a number to continue',
                        },
                        minLength: {
                           value: 10,
                           message:
                              'Number must be at least 10 characters long',
                        },
                        maxLength: {
                           value: 10,
                           message: 'Number must be at most 10 characters long',
                        },
                     })}
                     error={errors.phone}
                     helperText={errors.phone && errors.phone.message}
                  />
                  {sendingOtp ? (
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
                        Join Solruf
                     </YellowButton>
                  )}
               </>
            )}

            {verificationMode && (
               <>
                  <FormTitle>Verify OTP</FormTitle>
                  <Nav>
                     <ArrowBackIcon onClick={backHandler} />
                     <Typography>Enter OTP sent to {phone}</Typography>
                  </Nav>
                  <SolrufTextField
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
                           value: 4,
                           message: 'OTP must be at least 4 characters long',
                        },
                        maxLength: {
                           value: 4,
                           message: 'OTP must be at most 4 characters long',
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
            )}

            {verificationMode2 && (
               <>
                  <FormTitle>Verify OTP</FormTitle>
                  <Nav>
                     <ArrowBackIcon onClick={backToRegisterHandler} />
                     <Typography>Enter OTP sent to {phone}</Typography>
                  </Nav>
                  <SolrufTextField
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
                           value: 4,
                           message: 'OTP must be at least 4 characters long',
                        },
                        maxLength: {
                           value: 4,
                           message: 'OTP must be at most 4 characters long',
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
            )}

            {registerMode && (
               <>
                  <FormTitle>Register</FormTitle>
                  <Nav>
                     <ArrowBackIcon onClick={backHandler} />
                  </Nav>
                  <UserNameBox>
                     <SolrufTextField
                        sx={{ mr: 2 }}
                        type='text'
                        label='First Name'
                        {...register('first_name', {
                           required: {
                              value: true,
                              message: 'First name is required',
                           },
                        })}
                        error={errors.first_name}
                        helperText={
                           errors.first_name && errors.first_name.message
                        }
                     />
                     <SolrufTextField
                        type='text'
                        label='Last Name'
                        {...register('last_name', {
                           required: {
                              value: true,
                              message: 'Last name is required',
                           },
                        })}
                        error={errors.last_name}
                        helperText={
                           errors.last_name && errors.last_name.message
                        }
                     />
                  </UserNameBox>

                  <SolrufTextField
                     sx={{ mb: 2 }}
                     type='email'
                     label='Email (Optional)'
                     {...register('email', {
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                           message: 'Invalid email address',
                        },
                     })}
                     error={errors.email}
                     helperText={errors.email && errors.email.message}
                  />

                  <SolrufTextField
                     type='number'
                     value={phone}
                     label='Mobile Number'
                     {...register('phone', {
                        required: {
                           value: true,
                           message: 'Please input a number to continue',
                        },
                     })}
                     // error={errors.phone}
                     // helperText={errors.phone && errors.phone.message}
                  />

                  <RoleBox>
                     <Typography variant='h5' fontWeight={600}>
                        Register as{' '}
                     </Typography>

                     <UserTypeBox>
                        <VendorBox
                           sx={{
                              background:
                                 role === 'Vendor' ? '#ffd05b' : '#D0D7D9',
                           }}
                           onClick={handleVendorClick}
                        >
                           <Circle
                              sx={{
                                 background:
                                    role === 'Vendor' ? '#000000' : '#D0D7D9',
                              }}
                           ></Circle>
                           <Text>
                              <Typography variant='h6' fontWeight={600}>
                                 {' '}
                                 Solar Installer / Vendor
                              </Typography>
                              <Typography variant='body2'>
                                 You have a solar product/service company and
                                 woulkd like to promote yout business along with
                                 procurement.
                              </Typography>
                           </Text>
                        </VendorBox>
                        <UserBox
                           sx={{
                              background:
                                 role === 'User' ? '#ffd05b' : '#D0D7D9',
                           }}
                           onClick={handleUserClick}
                        >
                           <Circle
                              sx={{
                                 background:
                                    role === 'User' ? '#000000' : '#D0D7D9',
                              }}
                           ></Circle>
                           <Text>
                              <Typography variant='h6' fontWeight={600}>
                                 {' '}
                                 Purchase consumer
                              </Typography>
                              <Typography variant='body2'>
                                 You are here to purchase solar products.
                              </Typography>
                           </Text>
                        </UserBox>
                     </UserTypeBox>
                  </RoleBox>

                  {/*  error text */}
                  {registerError && (
                     <Typography
                        sx={{ color: 'error.main', textAlign: 'center' }}
                     >
                        The Mobile number or Email has already been taken!
                     </Typography>
                  )}

                  {registering ? (
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
                        Register
                     </YellowButton>
                  )}
               </>
            )}
         </Form>
      </Wrapper>
   );
};

export default AuthGuard;
