import { Typography } from '@mui/material';
import React from 'react';

const CustomErrorText = ({ errorMessage, sx }) => {
   return (
      <>
         {errorMessage ? (
            <Typography
               variant='body2'
               color='error'
               sx={{ height: '1.5rem', fontSize: '0.75rem', marginTop: '3px', marginRight: '14px', marginLeft: '14px',...sx }}
               
            >
               {errorMessage}
            </Typography>
         ) : (
            <Typography variant='body2' color='error' sx={{ height: '1.5rem' }}>
               {` `}
            </Typography>
         )}
      </>
   );
};

export default CustomErrorText;
