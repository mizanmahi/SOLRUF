import { Box, Typography, Checkbox } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import BackToButton from '../../components/BackToButton/BackToButton';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

// icons
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

const TitleText = styled(Typography)(({ theme }) => ({
   fontSize: '24px',
   fontWeight: 'bold',
   textAlign: 'center',
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'center',
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
         background: '#f3f3f3',
      },
   },
}));

const CompanyDetails = ({ formData, setPage }) => {
   const clickHandler = () => {
      console.log('first');
      setPage(0);
   };

   return (
      <Box>
         <TitleText>Company Details</TitleText>
         <BackToButton onClick={clickHandler}>Back</BackToButton>
         <Ul>
            <li>
               <Typography fontWeight={600}>
                  <PersonIcon sx={{ mr: 1 }} /> Name
               </Typography>
               <Typography>Mizan Mahi</Typography>
            </li>
            <li>
               <Typography fontWeight={600}>
                  <EmailIcon sx={{ mr: 1 }} /> E-mail
               </Typography>
               <Typography>mizanmahi24@gmail.com</Typography>
            </li>
            <li>
               <Typography fontWeight={600}>
                  <PhoneIcon sx={{ mr: 1 }} /> Phone
               </Typography>
               <Typography>455487875</Typography>
            </li>
            <li>
               <Typography fontWeight={600}>
                  <LocationOnIcon sx={{ mr: 1 }} /> Location
               </Typography>
               <Typography>192, Dhaka, Bd</Typography>
            </li>
            <li>
               <Typography fontWeight={600}>
                  <ApartmentIcon sx={{ mr: 1 }} /> City
               </Typography>
               <Typography>Bangladesh</Typography>
            </li>
         </Ul>
         <Flex sx={{ my: 3 }}>
            <Checkbox
               checked={true}
               // onChange={handleAcceptChange}
               inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography sx={{ color: '#000000' }}>
               Accept Products from other Brand?
            </Typography>
         </Flex>

         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <SubmitButton onClick={() => setPage(2)}>Submit</SubmitButton>
         </Box>
      </Box>
   );
};

export default CompanyDetails;
