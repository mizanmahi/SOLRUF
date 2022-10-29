import { Box, Typography } from '@mui/material';
import React from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Wrapper } from './infoText.style.js';

const InfoText = ({ children, style, onClick, ...rest }) => {
   return (
      <Wrapper onClick={onClick} {...rest}>
         <Box
            sx={{
               cursor: 'pointer',
               display: 'flex',
               alignItems: 'center',
            }}
         >
            <Typography
               sx={{
                  color: '#000',
                  // fontWeight: 'bold',
               }}
            >
               {children}
            </Typography>
            <NotificationsActiveIcon
               sx={{
                  color: '#000',
                  fontSize: '35px',
                  marginLeft: '0.5rem',
               }}
            />
         </Box>
      </Wrapper>
   );
};

export default InfoText;
