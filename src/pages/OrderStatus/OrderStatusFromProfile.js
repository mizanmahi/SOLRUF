import { Box, Container, Typography } from '@mui/material';
import SolrufTextField from '../../components/TextField/TextField';

import React, { useState } from 'react';
import { Form } from './orderStatus.style';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import { useForm } from 'react-hook-form';
import { axiAuth } from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import BackToButton from '../../components/BackToButton/BackToButton';
import PurchaseDetailsPage from './PurchaseDetailsPage';

const OrderStatusFromProfile = () => {
   const [step, setSteps] = useState(0);
   const [hash, setHash] = useState('');
   const {
      register,
      handleSubmit,
      watch,
      formState: { isSubmitting, errors: formErrors },
   } = useForm();

   const submitHandler = async (formData) => {
      console.log(formData);
      if (step === 0) {
         try {
            const { status, data } = await axiAuth.post(`api/mobile/send-otp`, {
               mobile: formData.phone,
               type: 'order',
            });
            if (status === 200) {
               setHash(data.hash);
               toast.success('OTP sent successfully');
               setSteps(1);
               return;
            }
         } catch (error) {
            toast.error(error.response.data.message);
         }
      } else {
         try {
            const { status } = await axiAuth.post(
               `api/mobile/verify-otp`,
               {
                  mobile: formData.phone,
                  otp: formData.otp,
                  hash,
               }
            );
            if (status === 200) {
               toast.success('OTP verified successfully');

               setSteps(2);

               return;
            }
         } catch (error) {
            toast.error('OTP verification failed');
         }
      }
   };

   const [order_reference, mobile] = watch(['orderReferenceNumber', 'phone']);

   const sentOtp = async () => {
      try {
         const { status } = await axiAuth.post(`api/mobile/send-otp`, {
            mobile,
            type: 'order',
         });
         if (status === 200) {
            toast.success('OTP re-sent successfully');
            setSteps(1);
            return;
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   if (step === 2) {
      return (
         <PurchaseDetailsPage
            order_reference={order_reference}
            mobile={mobile}
         />
      );
   }

   return (
      <Box>
         <Container maxWidth='xl'>
            <Typography variant='h4' sx={{ my: 5, textAlign: 'center' }}>
               Order Status
            </Typography>

            <Form component='form' onSubmit={handleSubmit(submitHandler)}>
               {step === 0 && (
                  <>
                     <SolrufTextField
                        label='Order reference number'
                        size='small'
                        {...register('orderReferenceNumber', {
                           required: {
                              value: true,
                              message: 'Please Input Order Reference Number',
                           },
                        })}
                        error={formErrors.orderReferenceNumber}
                        helperText={
                           formErrors.orderReferenceNumber
                              ? formErrors.orderReferenceNumber.message
                              : ''
                        }
                     />
                     <SolrufTextField
                        label='Phone number'
                        size='small'
                        sx={{ my: 2 }}
                        type='number'
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
                              message:
                                 'Number must be at most 10 characters long',
                           },
                        })}
                        error={formErrors.phone}
                        helperText={
                           formErrors.phone && formErrors.phone.message
                        }
                     />
                  </>
               )}

               {/* verification step */}
               {step === 1 && (
                  <>
                     <BackToButton
                        onClick={() => setSteps(0)}
                        sx={{ position: 'absolute', top: '0', left: '1.2rem' }}
                     >
                        Back
                     </BackToButton>
                     <SolrufTextField
                        label='OTP'
                        size='small'
                        type='number'
                        sx={{ mt: 1 }}
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
                        error={formErrors.otp}
                        helperText={
                           formErrors.otp ? formErrors.otp.message : ''
                        }
                     />
                     <Typography
                        sx={{
                           my: 2,
                           textAlign: 'center',
                           fontSize: '1rem',
                           cursor: 'pointer',
                           '&:hover': {
                              color: '#ffd05b',
                           },
                        }}
                        onClick={sentOtp}
                     >
                        Resent Otp
                     </Typography>
                  </>
               )}
               <PrimaryButton fullWidth type='submit' disabled={isSubmitting}>
                  {step === 0 ? 'Send OTP' : 'Verify OTP'}
               </PrimaryButton>
            </Form>
         </Container>
      </Box>
   );
};

export default OrderStatusFromProfile;
