import { AvatarBox } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';
import { Avatar, Box, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import SmsIcon from '@mui/icons-material/Sms';
import FeatureDetail from '../FeatureDetail/FeatureDetail';
import ListIcon from '@mui/icons-material/List';
import PhoneIcon from '@mui/icons-material/Phone';
// import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
// import { axiAuth } from '../../utils/axiosInstance';
// import Loader from '../Loader/Loader';
// icons
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LanguageIcon from '@mui/icons-material/Language';
// import React, { useEffect, useState } from 'react';
// import BusinessIcon from '@mui/icons-material/Business';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import TimelineIcon from '@mui/icons-material/Timeline';
// import CategoryIcon from '@mui/icons-material/Category';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import EventIcon from '@mui/icons-material/Event';
// import SubjectIcon from '@mui/icons-material/Subject';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const ConsultationModalContent = ({ data }) => {
   console.log(data);
   return (
      <Box>
         <AvatarBox>
            <Avatar
               src='https://pbs.twimg.com/profile_images/732870043894226944/cPycYUfA_400x400.jpgk'
               style={{
                  width: '60px',
                  height: '60px',
                  marginRight: '1.5rem',
               }}
               sx={{
                  backgroundColor: 'primary.dark',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
               }}
               alt={data.name}
            />

            <div>
               <Typography variant='h6' sx={{ my: 1 }}>
                  {data?.name || 'n/a'} <br /> Consultation Id: &nbsp; #
                  {data?.id || 'n/a'}
               </Typography>
               <Box sx={{ display: 'flex' }}>
                  {data?.email && (
                     <PrimaryButton sx={{ mr: 2, px: 2 }} IconStart={EmailIcon}>
                        Email
                     </PrimaryButton>
                  )}

                  {data?.mobile && (
                     <PrimaryButton sx={{ mr: 2, px: 2 }} IconStart={CallIcon}>
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
                     icon={<SmsIcon />}
                     title='Message'
                     value={data?.message || 'n/a'}
                  />
                  <FeatureDetail
                     icon={<EmailIcon />}
                     title='E-mail'
                     value={data?.email}
                  />
                  {
                     data.address && <FeatureDetail
                     icon={<BusinessIcon />}
                     title='Address'
                     value={data?.address}
                  />
                  }
               </Box>
               <Box>
                  <FeatureDetail
                     icon={<PhoneIcon />}
                     title='Mobile'
                     value={data?.mobile}
                  />
                  <FeatureDetail
                     icon={<ListIcon />}
                     title='Service types'
                     value={data?.service_type || 'n/a'}
                  />
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default ConsultationModalContent;
