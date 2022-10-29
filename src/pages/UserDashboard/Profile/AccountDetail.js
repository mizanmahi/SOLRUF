import { Fragment, useEffect, useState } from 'react';
import { Button, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SolrufTextField from '../../../components/TextField/TextField';
import { useForm } from 'react-hook-form';
import YellowButton from '../../../components/YellowButton/YellowButton';
import DoneIcon from '@mui/icons-material/Done';
import UserType from './UserType';
import PersonIcon from '@mui/icons-material/Person';
import { toast } from 'react-toastify';
import { axiAuth } from '../../../utils/axiosInstance';
import MobileOtp from './MobileOtp';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import { updateUser } from '../../../redux/slices/userSlice';
import {
   loadingEnd,
   loadingStart,
   setProfileData,
} from '../../../redux/slices/ProfileSlice';
import MobileVerifyModal from './MobileVerifyModal';

const EditProfileBox = styled(Box)(({ theme }) => ({
   background: '#FFFFFF',
   borderRadius: '8px',
   padding: theme.spacing(3),
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.23)',
   marginTop: '1rem',
   marginBottom: '1rem',
   width: '80%',
   '@media (max-width: 680px)': {
      width: '100%',
      padding: theme.spacing(2),
   },
}));

const MobileVerifyButton = styled(Button)(({ theme }) => ({
   height: '55px !important',
   display: 'flex',
   minWidth: '90px !important',
   justifyContent: 'center',
   background: theme.palette.primary.main,
   color: '#000',
   boxShadow: 'none',
   '&:hover': {
      background: theme.palette.primary.main,
      boxShadow: 0.5,
   },
}));

const AccountDetail = ({ defaultValue, setEditTrue }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: defaultValue,
   });
   const [phone] = watch(['phone']);
   const [userRole, setUserRole] = useState({
      role: 'User',
      isOpen: false,
      title: 'Update user type?',
      message: 'User type will be updated permanently once you save!',
      cacheRole: 'User',
   });

   const [mobileVerified, setMobileVerified] = useState({
      isVerified: false,
      mobileNo: null,
   });
   const { role, token } = useSelector((state) => state.user);
   const { profileData } = useSelector((state) => state.profile);
   const [mobileVerifyOpen, setmobileVerifyOpen] = useState(false);

   const handleUserRoleClick = (user_role) => {
      setUserRole({ ...userRole, cacheRole: user_role, isOpen: true });
   };

   const onConfirmRole = () => {
      setUserRole({ ...userRole, role: userRole.cacheRole, isOpen: false });
   };
   useEffect(() => {
      if (phone === mobileVerified.mobileNo) {
         setMobileVerified({ ...mobileVerified, isVerified: true });
      } else {
         setMobileVerified({ ...mobileVerified, isVerified: false });
      }
   }, [phone, mobileVerified]);

   useEffect(() => {
      if (defaultValue?.phone) {
         setMobileVerified({
            ...mobileVerified,
            mobileNo: defaultValue.phone,
            isVerified: true,
         });
      }
      if (defaultValue?.role) {
         setUserRole({ ...userRole, role: defaultValue.role });
      }
   }, [defaultValue.role, defaultValue.phone, userRole, mobileVerified]);

   const submitAccount = (data) => {
      dispatch(loadingStart());
      if (!mobileVerified.isVerified) {
         toast.error('Please verify new phone number');
         dispatch(loadingEnd());
         return;
      }

      if (!watch('phone').match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
         toast.error('Invalid mobile no.!');
         dispatch(loadingEnd());
         return;
      }

      const profileDetails = {
         first_name: watch('firstName'),
         last_name: watch('lastName'),
         mobile: watch('phone'),
         role: userRole.role,
      };

      if (watch('userEmail')) {
         profileDetails.email = watch('userEmail');
      }

      axiAuth
         .post(`/api/profile`, profileDetails)
         .then(({ data }) => {
            dispatch(loadingEnd());
            if (data.message === 'Updated') {
               const upData = {
                  token: token,
                  user: { ...profileDetails, profile_image: null },
               };
               dispatch(updateUser(upData));
               dispatch(setProfileData({ ...profileData, ...profileDetails }));
               toast.success('Account details successfully updated!');
               setEditTrue('account');
               if (profileDetails.role !== role) {
                  console.log('role changed######');
                  navigate('/');
               }
            }
         })
         .catch((e) => {
            console.log(e);
            dispatch(loadingEnd());
            if (e.response.status === 422) {
               toast.error(e.response.data.message);
            } else {
               toast.error('Something went wrong!!');
            }
         });
   };

   return (
      <Fragment>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'center',
            }}
         >
            <EditProfileBox
               component='form'
               onSubmit={handleSubmit(submitAccount)}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     mb: 2,
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                     }}
                  >
                     <ArrowBackIcon
                        sx={{
                           fontSize: '30px',
                           fontWeight: 'bold',
                           mr: 1,
                           color: '#000000',
                           cursor: 'pointer',
                           ml: '-5px',
                        }}
                        onClick={() => setEditTrue('account')}
                     />

                     <PersonIcon sx={{ mr: 1 }} />

                     <Typography
                        variant='h5'
                        fontWeight={600}
                        textAlign='center'
                     >
                        Account details
                     </Typography>
                  </Box>
                  <YellowButton variant='contained' color='primary'>
                     Save
                  </YellowButton>
               </Box>

               <Box
                  sx={{
                     display: 'flex',
                     my: 1,
                     flexDirection: { md: 'row', xs: 'column' },
                  }}
               >
                  <SolrufTextField
                     type='text'
                     {...register('firstName', {
                        required: {
                           value: true,
                           message: 'First Name is Required',
                        },
                     })}
                     error={errors.firstName ? true : false}
                     helperText={errors.firstName && errors.firstName.message}
                     label='First Name'
                     sx={{ mr: { md: 2, xs: 0 }, background: '#ffffff' }}
                  />
                  <SolrufTextField
                     type='text'
                     {...register('lastName', {
                        required: {
                           value: true,
                           message: 'Last Name is Required',
                        },
                     })}
                     firstName
                     error={errors.lastName ? true : false}
                     helperText={errors.lastName && errors.lastName.message}
                     label='Last Name'
                     sx={{
                        background: '#ffffff',
                        marginTop: { md: 'auto', xs: '15px' },
                     }}
                  />
               </Box>

               <Box sx={{ display: 'flex', mt: 0.5, my: 2 }}>
                  <SolrufTextField
                     type='number'
                     {...register('phone', {
                        required: {
                           value: true,
                           message: 'Phone no. is Required',
                        },
                     })}
                     error={errors.phone ? true : false}
                     helperText={errors.phone && errors.phone.message}
                     label='Phone Number'
                     sx={{ background: '#ffffff' }}
                  />
                  <MobileVerifyButton
                     sx={{
                        color: mobileVerified.isVerified
                           ? 'green'
                           : 'rgba(0,0,0,0.8)',
                        background: mobileVerified.isVerified
                           ? '#ddffef'
                           : '#ffd05b',
                        textTransform: 'none',
                        ml: 2,
                        mr: 1,
                        mt: 0.3,
                        '& svg': {
                           color: mobileVerified.isVerified
                              ? 'green'
                              : 'rgba(0,0,0,0.8)',
                        },
                        pointerEvents: mobileVerified.isVerified
                           ? 'none'
                           : 'all',
                     }}
                     variant='contained'
                     // disabled = {mobileVerified.isVerified}
                     onClick={() => setmobileVerifyOpen(true)}
                     endIcon={
                        mobileVerified.isVerified && (
                           <DoneIcon sx={{ color: 'green' }} />
                        )
                     }
                  >
                     {mobileVerified.isVerified ? 'Verified' : 'Verify'}
                  </MobileVerifyButton>
               </Box>
               <SolrufTextField
                  label='E-mail Address'
                  sx={{ background: '#ffffff' }}
                  {...register('userEmail', {
                     pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address',
                     },
                  })}
                  error={errors.userEmail ? true : false}
                  helperText={errors.userEmail && errors.userEmail.message}
               />

               <UserType
                  userRole={userRole}
                  handleUserRoleClick={handleUserRoleClick}
               />
               <ConfirmDialog
                  confirmDialog={{ ...userRole, onConfirm: onConfirmRole }}
                  setConfirmDialog={setUserRole}
                  variant='warning'
               />
            </EditProfileBox>

            <MobileVerifyModal
               mobileVerifyOpen={mobileVerifyOpen}
               setmobileVerifyOpen={setmobileVerifyOpen}
            >
               <MobileOtp
                  newPhone={watch('phone')}
                  setMobileVerified={setMobileVerified}
                  setValue={setValue}
                  setmobileVerifyOpen={setmobileVerifyOpen}
               />
            </MobileVerifyModal>
         </Box>
      </Fragment>
   );
};

export default AccountDetail;
