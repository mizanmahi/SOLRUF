import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CheckCircleIcon, LibraryIcon } from '@heroicons/react/solid';

const ProductDetailList = ({ list, description, hand, home, sx }) => {
   if (home) {
      return (
         <>
            <Box sx={{ display: 'flex', alignItems: 'center', ...sx}}>
               <LibraryIcon style={{ width: '25px', marginRight: '.5rem' }} />

               <Typography variant='body1'>
                  <strong>{list}</strong> {description}
               </Typography>
            </Box>
         </>
      );
   }

   return (
      <>
         <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ...sx }}>
            {!hand ? (
               <CheckCircleIcon
                  style={{ width: '25px', color: 'green', marginRight: '1rem' }}
               />
            ) : (
               <Box sx={{ mr: '1rem' }}>&#128073;</Box>
            )}
            <Typography variant='body1'>
               <strong>{list}</strong> {description}
            </Typography>
         </Box>
      </>
   );
};

export default ProductDetailList;
