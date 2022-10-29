import { Fragment, useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import FlagIcon from '@mui/icons-material/Flag';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import BusinessDetail from '../../../media/Svg/BusinessDetail.svg';
import PrimaryButton from '../../../components/Custom/PrimaryButton/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { axiAuth } from '../../../utils/axiosInstance';
import { setProfileData } from '../../../redux/slices/ProfileSlice';
import AccountDetail from './AccountDetail';
import BusinessDetails from './BusinessDetail';
import { motion } from 'framer-motion';
import BackdropLoader from '../../../components/Custom/BackdropLoader/BackdropLoader';

const ProfileBox = styled('div')(({ theme }) => ({
   background: '#FFFF',
   borderRadius: '8px',
   padding: theme.spacing(3),
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.23)',

   width: '80%',
   margin: '1rem auto',
   '@media (max-width: 680px)': {
      width: '100%',
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
         background: '#F3F3F3 !important',
      },
   },
}));

const EditProfileStyle = styled('div')(({ theme }) => ({
   marginLeft: '11rem',
   marginTop: '1.8rem',
   fontSize: '1.7rem',
   color: '#000000',
   '@media (max-width: 690px)': {
      marginLeft: '1rem',
      marginTop: '1rem',
      fontSize: '1.5rem',
   },
}));

const Profile = () => {
   const [userData, setUserData] = useState([]);
   const [businessData, setBusinessData] = useState([]);
   const [accountDefaultValue, setAccountDefaultValue] = useState({
      loaded: false,
   });
   const [businessDefaultValue, setBusinessDefaultValue] = useState({
      loaded: false,
   });
   const { profileData: data, loading } = useSelector((state) => state.profile);

   const dispatch = useDispatch();
   const { role } = useSelector((state) => state.user);
   const [isEdit, setIsEdit] = useState({
      businessEdit: false,
      accountEdit: false,
   });

   const businessDataSet = (data) => {
      let busData = data.business;
      setBusinessDefaultValue({
         company_name: busData.company_name,
         phone: busData.phone,
         gstin: busData.gstin,
         pincode: busData.pincode,
         state: busData.state,
         city: busData.city,
         address: busData.address,
         loaded: true,
         photo: busData.photo,
      });
   };

   const accountDataSet = (secData) => {
      setAccountDefaultValue({
         firstName: secData.first_name,
         lastName: secData.last_name,
         phone: secData.mobile,
         userEmail: secData.email,
         role: secData.role,
         loaded: true,
      });
   };

   const editHandler = (type) => {
      if (type === 'business') {
         setIsEdit({ ...isEdit, businessEdit: !isEdit.businessEdit });
      } else if (type === 'account') {
         setIsEdit({ ...isEdit, accountEdit: !isEdit.accountEdit });
      }
   };

   

   useEffect(() => {
      if (!data || !data?.business || !data.mobile) {
         axiAuth
            .get('/api/profile')
            .then((res) => {
               let secData = res.data.data;
               secData['role'] = role;
               if (secData.business) {
                  businessDataSet(secData);
                  accountDataSet(secData);
                  dispatch(setProfileData(secData));
                  console.log('Business data exist!!!');
               } else {
                  accountDataSet(secData);
                  setBusinessDefaultValue({ loaded: true });
                  setUserData(secData);
                  dispatch(setProfileData(data));
                  editHandler('business');
                  toast.info('Please create your business profile!!');
                  console.log('Business data not exist!!!');
               }
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         accountDataSet(data);
         setBusinessData(data.business);
         setUserData(data);
         businessDataSet(data);
         console.log('Data exist!!!');
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, dispatch, role]);

   return (
      <Fragment>
         {loading && <BackdropLoader />}
         <Typography variant='h4' fontWeight={600}>
            <EditProfileStyle>My Profile</EditProfileStyle>
         </Typography>

         {isEdit.businessEdit ? (
            businessDefaultValue.loaded && (
               <motion.div
                  initial={{ x: '5vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
               >
                  <BusinessDetails
                     defaultValue={businessDefaultValue}
                     setEditTrue={editHandler}
                     setIsEdit={setIsEdit}
                     isEdit={isEdit}
                  />
               </motion.div>
            )
         ) : (
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
               }}
            >
               <ProfileBox>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                     }}
                  >
                     <Typography
                        variant='h6'
                        fontWeight={500}
                        textAlign='center'
                     >
                        <img
                           src={BusinessDetail}
                           width='28'
                           alt='business detail'
                           style={{
                              marginRight: '0.7rem',
                           }}
                        />{' '}
                        Business details
                     </Typography>

                     <PrimaryButton
                        onClick={() => editHandler('business')}
                        sx={{
                           px: 3.5,
                           py: 0.5,
                           background: 'transparent',
                           border: '3px solid #4D4D4D',
                           borderRadius: '8px',
                           '&:hover': {
                              border: '3px solid transparent',
                           },
                        }}
                     >
                        Edit
                     </PrimaryButton>
                  </Box>

                  <Ul>
                     <li>
                        <Typography fontWeight={600}>
                           <BusinessIcon sx={{ mr: 1 }} /> Company Name
                        </Typography>
                        <Typography>{businessData.company_name}</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <ReceiptLongRoundedIcon sx={{ mr: 1 }} /> GST No
                        </Typography>
                        <Typography>{businessData.gstin}</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <LocationCityIcon sx={{ mr: 1 }} /> City
                        </Typography>
                        <Typography>{businessData.city}</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <FlagIcon sx={{ mr: 1 }} /> Pincode/Zipcode
                        </Typography>
                        <Typography>{businessData.pincode}</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <AccountBalanceIcon sx={{ mr: 1 }} /> State
                        </Typography>
                        <Typography>{businessData.state}</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <LocationOnIcon sx={{ mr: 1 }} /> Street
                        </Typography>
                        <Typography>{businessData.address}</Typography>
                     </li>
                  </Ul>
               </ProfileBox>
            </Box>
         )}

         {isEdit.accountEdit ? (
            accountDefaultValue.loaded && (
               <motion.div
                  initial={{ x: '5vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
               >
                  <AccountDetail
                     defaultValue={accountDefaultValue}
                     setEditTrue={editHandler}
                  />
               </motion.div>
            )
         ) : (
            <div className='d-flex justify-content-center'>
               <ProfileBox>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                     }}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                        }}
                     >
                        <PersonIcon sx={{ mr: 1 }} />
                        <Typography
                           variant='h6'
                           fontWeight={600}
                           textAlign='center'
                        >
                           Account details
                        </Typography>
                     </Box>
                     <PrimaryButton
                        onClick={() => editHandler('account')}
                        sx={{
                           px: 3.5,
                           py: 0.5,
                           background: 'transparent',
                           border: '3px solid #4D4D4D',
                           borderRadius: '8px',
                           '&:hover': {
                              border: '3px solid transparent',
                           },
                        }}
                     >
                        Edit
                     </PrimaryButton>
                  </Box>

                  <Ul>
                     <li>
                        <Typography fontWeight={600}>
                           <PersonIcon sx={{ mr: 1 }} /> Name
                        </Typography>
                        <Typography>
                           {userData.first_name} {userData.last_name}
                        </Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <EmailIcon sx={{ mr: 1 }} /> Email
                        </Typography>
                        <Typography>
                           {userData.email ? userData.email : 'N/A'}
                        </Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <PhoneIcon sx={{ mr: 1 }} /> Phone Number
                        </Typography>
                        <Typography>{userData.mobile}</Typography>
                     </li>
                     <li>
                        <Typography fontWeight={600}>
                           <BadgeIcon sx={{ mr: 1 }} /> User Type
                        </Typography>
                        <Typography>{userData.role}</Typography>
                     </li>
                  </Ul>
               </ProfileBox>
            </div>
         )}
      </Fragment>
   );
};

export default Profile;
