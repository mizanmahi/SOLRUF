import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useEffect } from 'react';
import SolrufTextField from '../../TextField/TextField';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import RangeAccordion from './RangeAccordion';

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

const RangeFilter = ({
   priceRange,
   setPriceRange,
   invalidRange,
   setInvalidRange,
   sx,
}) => {
   const handlePriceRangeChange = (event) => {
      setPriceRange({
         ...priceRange,
         [event.target.name]: event.target.value,
      });
   };

   useEffect(() => {
      if (+priceRange.from > +priceRange.to) {
         setInvalidRange(true);
      } else {
         setInvalidRange(false);
      }

      if (priceRange.from === '' || priceRange.to === '') {
         setInvalidRange(false);
      }
   }, [priceRange, setInvalidRange]);

   return (
      <Box sx={{ ...sx }}>
         <RangeAccordion title='Price Range' priceRange={priceRange}>
            <Flex
               sx={{
                  justifyContent: 'space-between',
               }}
            >
               <SolrufTextField
                  size='small'
                  label='From'
                  sx={{ mr: 2 }}
                  onChange={handlePriceRangeChange}
                  name='from'
                  value={priceRange.from}
                  type='number'
               ></SolrufTextField>
               <SolrufTextField
                  size='small'
                  label='To'
                  onChange={handlePriceRangeChange}
                  name='to'
                  value={priceRange.to}
                  type='number'
               ></SolrufTextField>
            </Flex>
            {invalidRange && (
               <Typography
                  color='error'
                  variant='body2'
                  sx={{ mt: 1, textAlign: 'center' }}
               >
                  From can't be greater than to
               </Typography>
            )}
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
               }}
            >
               <PrimaryButton
                  sx={{ mt: 1, mr: 2, px: 0.3, py: 0.5 }}
                  fullWidth
                  variant='secondary'
                  // onClick={handleInvalidRange}
               >
                  Reset
               </PrimaryButton>
               <PrimaryButton
                  sx={{ mt: 1, px: 0.3, py: 0.5 }}
                  fullWidth
                  // onClick={handleInvalidRange}
               >
                  Apply
               </PrimaryButton>
            </Box>
         </RangeAccordion>
      </Box>
   );
};

export default RangeFilter;
