import { Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const FeatureDetail = ({ icon, title, value, style, valueStyle }) => {
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   return (
      <Box
         sx={{
            display: 'flex',
            alignItems: 'flex-start',
            mb: 2,
            '& svg': { mr: 1, fontSize: '28px', color: '#666F73' },
            ...style,
         }}
      >
         {icon}
         <Box>
            <Typography fontWeight={400} sx={{ fontSize: '15px' }}>
               {title}
            </Typography>
            <Typography
               fontWeight={500}
               sx={{
                  fontSize: '15px',
                  color: 'black',
                  maxWidth: !matches ? '400px' : '120px',
                  flexWrap: 'wrap',
                  wordWrap: 'break-word',
                  ...valueStyle,
               }}
            >
               {value}
            </Typography>
         </Box>
      </Box>
   );
};

export default FeatureDetail;
