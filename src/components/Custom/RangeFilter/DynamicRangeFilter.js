import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useState } from 'react';
import SolrufTextField from '../../TextField/TextField';
import RangeAccordion from './RangeAccordion';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

const DynamicRangeFilter = ({
   rangeFilters: rangeFilter,
   setSetRangeFilters,
   id,
   applyFilter,
   name,
   sx,
}) => {
   const currentElement = rangeFilter.filter((item) => item.id === id)[0];

   const [invalidRange, setInvalidRange] = useState('');

   const [rangeFilterValue, setRangeFilterValue] = useState({
      from: currentElement.from,
      to: currentElement.to,
   });

   const handleRangeFilterValueChange = (e) => {
      const { name, value } = e.target;
      setRangeFilterValue({ ...rangeFilterValue, [name]: value });
   };

   const applyFilterValue = () => {
      setInvalidRange('');

      let isValidRange = true;

      if (+rangeFilterValue.from > +rangeFilterValue.to) {
         setInvalidRange('From value should be less than To value');

         isValidRange = false;
      }

      if (rangeFilterValue.from === '' || rangeFilterValue.to === '') {
         setInvalidRange('Please enter valid range');

         isValidRange = false;
      }

      if (
         rangeFilterValue.from < currentElement.min ||
         rangeFilterValue.to > currentElement.max
      ) {
         setInvalidRange(
            'Value should be between ' +
               currentElement.min +
               ' and ' +
               currentElement.max
         );

         isValidRange = false;
      }

      if (isValidRange) {
         setSetRangeFilters(
            rangeFilter.map((item) => {
               if (item.id === id) {
                  return {
                     ...item,
                     from: rangeFilterValue.from,
                     to: rangeFilterValue.to,
                     isValid: true,
                  };
               } else {
                  return item;
               }
            })
         );
      } else {
         setSetRangeFilters(
            rangeFilter.map((item) => {
               if (item.id === id) {
                  return {
                     ...item,
                     from: rangeFilterValue.from,
                     to: rangeFilterValue.to,
                     isValid: false,
                  };
               } else {
                  return item;
               }
            })
         );
      }
   };

   return (
      <Box sx={{ ...sx }}>
         <RangeAccordion title={name} priceRange={currentElement}>
            <Flex sx={{ justifyContent: 'space-between' }}>
               <SolrufTextField
                  size='small'
                  label='From'
                  sx={{ mr: 2 }}
                  onChange={handleRangeFilterValueChange}
                  name='from'
                  value={rangeFilterValue.from}
                  type='number'
               ></SolrufTextField>
               <SolrufTextField
                  size='small'
                  label='To'
                  onChange={handleRangeFilterValueChange}
                  name='to'
                  value={rangeFilterValue.to}
                  type='number'
               ></SolrufTextField>
            </Flex>

            {/*  ============================================================ */}

            {invalidRange && (
               <Typography
                  color='error'
                  variant='body2'
                  sx={{ mt: 1, textAlign: 'center' }}
               >
                  {invalidRange}
               </Typography>
            )}
            <Flex sx={{ mt: 1.5, justifyContent: 'flex-end' }}>
               <PrimaryButton variant='secondary' onClick={applyFilterValue}>
                  Reset
               </PrimaryButton>
               <PrimaryButton variant='secondary' onClick={applyFilterValue}>
                  Apply
               </PrimaryButton>
            </Flex>
         </RangeAccordion>
      </Box>
   );
};

export default DynamicRangeFilter;
