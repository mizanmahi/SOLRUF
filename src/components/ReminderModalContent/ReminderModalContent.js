import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { axiAuth } from '../../utils/axiosInstance';
import { AvatarBox, Wrapper } from './reminderModalContent.style';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import Loader from '../Loader/Loader';
import FeatureDetail from '../FeatureDetail/FeatureDetail';
// icons
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LanguageIcon from '@mui/icons-material/Language';
// import PhoneIcon from '@mui/icons-material/Phone';
// import BusinessIcon from '@mui/icons-material/Business';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import TimelineIcon from '@mui/icons-material/Timeline';
// import CategoryIcon from '@mui/icons-material/Category';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import SubjectIcon from '@mui/icons-material/Subject';
import DateRangeIcon from '@mui/icons-material/DateRange';

const ReminderModalContent = ({ customerId }) => {
   const [customerDetails, setCustomerDetails] = useState(null);
   const [customerDetailsLoading, setCustomerDetailsLoading] = useState(true);

   useEffect(() => {
      setCustomerDetailsLoading(true);
      axiAuth
         .get(`api/vendor/customers/${customerId}`)
         .then(({ status, data }) => {
            if (status === 200) {
               console.log(data);
               setCustomerDetails(data.customer);
               setCustomerDetailsLoading(false);
            }
         })
         .catch((err) => {
            console.log(err.message);
            setCustomerDetailsLoading(false);
         });
   }, [customerId]);

   return (
      <Wrapper>
         {customerDetailsLoading ? (
            <Loader />
         ) : (
            <>
               <AvatarBox>
                  <Avatar
                     alt='Remy Sharp'
                     src='https://pbs.twimg.com/profile_images/732870043894226944/cPycYUfA_400x400.jpg'
                     style={{
                        width: '70px',
                        height: '70px',
                        marginRight: '1.5rem',
                     }}
                  />
                  <div>
                     <Typography variant='h6' sx={{ my: 1 }}>
                        {customerDetails?.name || 'n/a'} <br /> Customer Id:
                        &nbsp; #{customerId || 'n/a'}
                     </Typography>
                     <Box sx={{ display: 'flex' }}>
                        {customerDetails?.email && (
                           <PrimaryButton
                              sx={{ mr: 2, px: 2 }}
                              IconStart={EmailIcon}
                           >
                              Email
                           </PrimaryButton>
                        )}

                        {customerDetails?.phone && (
                           <PrimaryButton
                              sx={{ mr: 2, px: 2 }}
                              IconStart={CallIcon}
                           >
                              Call
                           </PrimaryButton>
                        )}
                     </Box>
                  </div>
               </AvatarBox>
               <Box>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        p: 2,
                        mt: 2,
                     }}
                  >
                     <Box
                        sx={{
                           mr: 2,
                           minWidth: '50%',
                        }}
                     >
                        <FeatureDetail
                           icon={<EventIcon />}
                           title='Appointment'
                           value={customerDetails.reminder?.appointment_at}
                        />
                        <FeatureDetail
                           icon={<SubjectIcon />}
                           title='Subject'
                           value={customerDetails.reminder?.subject}
                        />
                     </Box>
                     <Box>
                        <FeatureDetail
                           icon={<DateRangeIcon />}
                           title='Meeting Type'
                           value={customerDetails.reminder?.meeting_type?.label}
                        />
                     </Box>
                  </Box>
               </Box>
            </>
         )}

         {/*  ===================== reminder details ===================== */}
      </Wrapper>
   );
};

export default ReminderModalContent;
