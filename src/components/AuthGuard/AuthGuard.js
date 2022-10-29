import { Typography } from '@mui/material';
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
import { axiAuth, axiosInstance } from '../../utils/axiosInstance';
import SolrufTextField from '../TextField/TextField';
import YellowButton from '../YellowButton/YellowButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { saveUser } from '../../redux/slices/userSlice';
import {
   closeLoginModal,
   removeLoginRedirect,
} from '../../redux/slices/loginModalSlice';
import { useNavigate } from 'react-router';
import {
   Circle,
   FormTitle,
   Nav,
   RoleBox,
   Text,
   UserBox,
   UserNameBox,
   UserTypeBox,
   VendorBox,
} from './authGuard.style';
import { setProfileData } from '../../redux/slices/ProfileSlice';
import { migrateCart } from '../../redux/slices/cart/cartSlice';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';

const AuthGuard = () => {
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm();

   const { loginMode, registerMode, verificationMode, verificationMode2 } =
      useSelector((state) => state.loginStep); // mode switching state
   const { from } = useSelector((state) => state.loginModal); // modal state
   const { cart } = useSelector((state) => state.cart);

   const [differentVendorCartAlert, setDifferentVendorCartAlert] = useState({
      role: 'Cart From Different Vendor',
      isOpen: false,
      title: 'Delete The previous Cart?',
      message: 'Current cart will be stored in the new cart',
      cacheRole: 'Cart',
   });

   const onConfirmMigrateCart = async () => {
      const { status } = await axiAuth.get('api/carts/clear');
      if (status === 200) {
         console.log('cart cleared');
         axiAuth
            .post('api/carts', {
               carts: cart,
            })
            .then(({ status, data }) => {
               if (status === 200) {
                  console.log(data);
               }
            })
            .catch((err) => {
               console.log(err.message);
            });
         dispatch(migrateCart(cart));
         dispatch(closeLoginModal());
      }
   };

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [phone, setPhone] = useState('');
   const [sendingOtp, setSendingOtp] = useState(false);
   const [verifying, setVerifying] = useState(false);
   const [registering, setRegistering] = useState(false);
   const [role, setRole] = useState('Vendor');
   const [otpError, setOtpError] = useState('');
   const [registerError, setRegisterError] = useState('');

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

               console.log(data);

               //* setting profile data to state
               axiAuth
                  .get('/api/profile')
                  .then(async (res) => {
                     let profileData = res.data.data;
                     profileData['role'] = data.user.role;
                     dispatch(setProfileData(profileData));

                     // * Handling cart migration start
                     try {
                        const { status, data: prevCart } = await axiAuth.get(
                           'api/carts'
                        );
                        if (status === 200) {
                           // if the product exist update the quantity else add product to cart
                           console.log(prevCart);
                           console.log(cart);

                           if (
                              prevCart.carts.length === 0 &&
                              cart.length === 0
                           ) {
                              dispatch(closeLoginModal());
                              return; // * if no previous cart and no new cart then return
                           }

                           if (prevCart.carts.length === 0) {
                              toast.warn('Previous Cart is empty');

                              axiAuth
                                 .post('api/carts', {
                                    carts: cart,
                                 })
                                 .then(({ status, data }) => {
                                    if (status === 200) {
                                       console.log(data);
                                       dispatch(migrateCart(data.carts));
                                       dispatch(closeLoginModal());
                                       toast.success(
                                          'Only local cart migrated and saved to store'
                                       );
                                    }
                                 })
                                 .catch((err) => {
                                    console.log(err.message);
                                 });
                           } else if (cart.length === 0) {
                              console.log('no local cart', prevCart);
                              toast.warn('No local cart');
                              dispatch(migrateCart(prevCart.carts));
                              dispatch(closeLoginModal());
                           } else {
                              const isDiffer = prevCart.carts.some(
                                 (item) =>
                                    item.product_meta.vendor_slug !==
                                    cart[0].product_meta.vendor_slug
                              );

                              console.log('in else block of differ', isDiffer);

                              if (isDiffer) {
                                 const confirm = window.confirm(
                                    'You have item in the cart from another vendor. Do you want to replace it?'
                                 );

                                 if (confirm) {
                                    // clear the cart
                                    const { status } = await axiAuth.get(
                                       'api/carts/clear'
                                    );
                                    if (status === 200) {
                                       console.log('cart cleared');
                                       toast.success('Cart cleared');
                                       axiAuth
                                          .post('api/carts', {
                                             carts: cart,
                                          })
                                          .then(({ status, data }) => {
                                             if (status === 200) {
                                                console.log(data);
                                                dispatch(
                                                   migrateCart(data.carts)
                                                );
                                                dispatch(closeLoginModal());
                                             }
                                          })
                                          .catch((err) => {
                                             console.log(err.message);
                                          });
                                    }
                                 } else {
                                    // * if not confirm then keep only the prevCart
                                    dispatch(migrateCart(prevCart.carts));
                                    dispatch(closeLoginModal());
                                 }
                              } else {
                                 const combined = [...prevCart.carts, ...cart];

                                 console.log(
                                    'in else block out of differ',
                                    isDiffer
                                 );

                                 let tracker = [],
                                    merged = [],
                                    length = combined.length;

                                 for (let i = 0; i < length; i++) {
                                    if (
                                       tracker[
                                          combined[i]?.product_meta
                                             ?.product_name
                                       ]
                                    ) {
                                       merged.find(
                                          (item) =>
                                             item?.product_meta
                                                ?.product_name ===
                                             combined[i]?.product_meta
                                                ?.product_name
                                       ).quantity += combined[i]?.quantity;
                                       continue;
                                    }
                                    tracker[
                                       combined[i].product_meta.product_name
                                    ] = true;
                                    merged.push(combined[i]);
                                 }

                                 axiAuth
                                    .post('api/carts', {
                                       carts: merged,
                                    })
                                    .then(({ status, data }) => {
                                       if (status === 200) {
                                          console.log(data);
                                          dispatch(migrateCart(data.carts));
                                          dispatch(closeLoginModal());
                                       }
                                    })
                                    .catch((err) => {
                                       console.log(err.message);
                                    });
                              }
                           }
                        }
                     } catch (error) {
                        console.log(error);
                     }
                     // * Handling cart migration end
                  })
                  .catch((err) => {
                     console.log(err);
                  });

               if (from) {
                  navigate(from);
                  dispatch(removeLoginRedirect());
               }
            }
         } catch (error) {
            setOtpError(error.response.data.message);
            setVerifying(false);
         }
      }

      if (registerMode) {
         try {
            setRegistering(true);
            const registerData = {
               first_name,
               last_name,
               mobile: phone,
               role,
            };

            if (email) {
               registerData.email = email;
            }

            const { data } = await axiosInstance.post(
               // register  user
               'api/register',
               registerData
            );
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
            toast.success('OTP Resent');
            setValue('otp', '');
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   return (
      <Box>
         <Box component='form' onSubmit={handleSubmit(handleRegister)}>
            {loginMode && (
               <>
                  <FormTitle>Sign Up / Log In</FormTitle>
                  <SolrufTextField
                     size='small'
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
                        size='small'
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
                        size='small'
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
                     size='small'
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
                     size='small'
                     type='number'
                     value={phone}
                     disabled
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
         </Box>

         <ConfirmDialog
            confirmDialog={{
               ...differentVendorCartAlert,
               onConfirm: onConfirmMigrateCart,
            }}
            setConfirmDialog={setDifferentVendorCartAlert}
            variant='warning'
         />
      </Box>
   );
};

export default AuthGuard;
