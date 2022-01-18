import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CustomAccordion from '../../components/CustomAccordion/CustomAccordion';
import { Chip, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const LeftProductFilterBox = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   borderRadius: '10px',
   boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
   padding: '1rem',
}));

const LeftProductFilter = () => {
   const categories = [
      'Solar Panels',
      'Solar invertors',
      'Solar roofing',
      'Solar water heater',
      'Solar water tanks',
      'Solar water pipes',
   ];

   
   const [powerCapacity, setPowerCapacity] = React.useState('female');

   const handleChange = (event) => {
      setPowerCapacity(event.target.value);
   };

   return (
      <LeftProductFilterBox>

            {categories.map((category, index) => (
               <Chip
                  key={index}
                  label={category}
                  component='p'
                  href='#basic-chip'
                  variant='outlined'
                  clickable
                  sx={{ mb: 1, mr: 1 }}
               />
            ))}
  
         <CustomAccordion title='Power Capacity'>
            <RadioGroup
               aria-label='gender'
               name='controlled-radio-buttons-group'
               value={powerCapacity}
               onChange={handleChange}
            >
               <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Ascending'
                  sx={{
                     '& .MuiRadio-root': { border: 'none' },
                  }}
               />
               <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Descending'
                  sx={{
                     '& .MuiRadio-root': { border: 'none' },
                  }}
               />
            </RadioGroup>
         </CustomAccordion>
         <CustomAccordion title='Price Range'>
            <RadioGroup
               aria-label='gender'
               name='controlled-radio-buttons-group'
               value={powerCapacity}
               onChange={handleChange}
            >
               <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Expensive'
                  sx={{
                     '& .MuiRadio-root': { border: 'none' },
                  }}
               />
               <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Affordable'
                  sx={{
                     '& .MuiRadio-root': { border: 'none' },
                  }}
               />
            </RadioGroup>
         </CustomAccordion>
      </LeftProductFilterBox>
   );
};

export default LeftProductFilter;
