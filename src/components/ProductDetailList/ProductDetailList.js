import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CheckIcon, LibraryIcon } from '@heroicons/react/solid';

const ProductDetailList = ({
   list,
   description,
   hand,
   home,
   sx,
   fontSize1,
   fontSize2,
}) => {
   if (home) {
      return (
         <>
            <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
               <LibraryIcon style={{ width: '25px', marginRight: '.5rem' }} />

               <Typography
                  variant='body1'
                  sx={{ fontSize: `${fontSize1 ? fontSize1 : '0.9rem'}` }}
               >
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
               <CheckIcon
                  style={{
                     width: '25px',
                     color: '#3FB500',
                     fontWeight: 'bolder',
                     marginRight: '1rem',
                  }}
               />
            ) : (
               <Box sx={{ mr: '0.9rem' }}>&#128073;</Box>
            )}
            <Typography
               sx={{ fontSize: `${fontSize2 ? fontSize2 : '1rem'}` }}
            >
               <strong>{list}</strong> {description}
            </Typography>
         </Box>
      </>
   );
};

export default ProductDetailList;
