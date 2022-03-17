import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import MailSentSvg from '../../media/Svg/MailSent.svg';

const Wrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
}));

const Success = () => {
   return (
      <Wrapper>
         <img src={MailSentSvg} alt='enquiry sent' />
         <Typography variant='h4' sx={{fontWeight: 'bold', mt: 3}}>Enquiry Sent!</Typography>
         <Typography variant='h6' sx={{mt: 2, mb: 5}}>
            We will Provide you with the bids <br /> from 10 best Vendors in 60 min
         </Typography>
      </Wrapper>
   );
};

export default Success;
