import { Box, Typography } from '@mui/material';
import React from 'react';

const InactiveProductOverlay = () => {
   return (
      <Box
         sx={{
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 100,
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '0.5rem',
         }}
      >
         <Box
            sx={{
               background: '#E21F30',
               p: 2,
               borderRadius: '8px',
               boxShadow: '0px 4px 24px  0 rgba(0, 69, 184, 0.15)',
               backdropFilter: 'blur(10px)',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               maxWidth: '700px',
            }}
         >
            <Typography
               sx={{
                  fontSize: '1.5rem',
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
               }}
            >
               This product is not available for enquiry!
            </Typography>
         </Box>
      </Box>
   );
};

export default InactiveProductOverlay;
