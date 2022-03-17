import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const FeatureDetail = ({ icon, title, value, style }) => {
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
            <Typography fontWeight={600}>{title}</Typography>
            <Typography
               fontWeight={600}
               sx={{ fontSize: '1.2rem', color: 'black', maxWidth: '400px' }}
            >
               {value}
            </Typography>
         </Box>
      </Box>
   );
};

export default FeatureDetail;
