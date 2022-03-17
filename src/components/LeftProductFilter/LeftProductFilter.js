import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CustomAccordion from '../../components/CustomAccordion/CustomAccordion';
import { Chip, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const FilterCategory = styled(Typography)(
   ({ theme, activeCategory, category }) => ({
      backgroundColor:
         category === activeCategory
            ? theme.palette.primary.main
            : theme.palette.secondary.light,
      borderRadius: '1rem',
      marginBottom: '1rem',
      padding: '0.4rem .8rem',
      display: 'inline-block',
      cursor: 'pointer',
   })
);

const LeftProductFilterBox = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   borderRadius: '10px',
   boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
   padding: '1rem',
}));

const categories = [
   'Solar Panels',
   'Solar invertors',
   'Solar roofing',
   'Solar water heater',
   'Solar water tanks',
   'Solar water pipes',
];

const CustomizedAccordionForFilter = styled(CustomAccordion)(({ theme }) => ({
   background: 'transparent',
   '&::before': {
      background: 'transparent',
   },
   '& .MuiButtonBase-root': {
      // background: theme.palette.secondary.light,
      borderRadius: '12px',
      // padding: '0.2rem .8rem',
      border: 0,
   },
   '& .Mui-expanded': {
      // background: '#ffd05b',
   },
}));

const LeftProductFilter = () => {
   const [powerCapacity, setPowerCapacity] = React.useState('ascending');
   const [priceRange, setPriceRange] = React.useState('affordable');

   const [activeCategory, setActiveCategory] = React.useState('');

   const handleActiveCategory = (category) => {
      setActiveCategory(category);
      console.log(category);
   };

   const handlePowerCapacityChange = (event) => {
      setPowerCapacity(event.target.value);
      console.log(event.target.value);
   };

   const handlePriceRangeChange = (event) => {
      setPriceRange(event.target.value);
      console.log(event.target.value);
   };

   return (
      <LeftProductFilterBox>
         <CustomizedAccordionForFilter
            title='Categories'
            defaultExpanded='true'
            bigTitle='true'
         >
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
               }}
            >
               {categories.map((category, index) => (
                  <FilterCategory
                     key={index}
                     onClick={() => handleActiveCategory(category)}
                     activeCategory={activeCategory}
                     category={category}
                  >
                     {' '}
                     {category}{' '}
                  </FilterCategory>
               ))}
            </Box>
         </CustomizedAccordionForFilter>

         <CustomizedAccordionForFilter title='Sort' bigTitle='true'>
            <Typography
               sx={{ fontWeight: 600, fontSize: '1.3rem', color: '#000000' }}
               gutterBottom
            >
               Power Capacity
            </Typography>

            <RadioGroup
               aria-label='gender'
               name='controlled-radio-buttons-group'
               value={powerCapacity}
               onChange={handlePowerCapacityChange}
            >
               <FormControlLabel
                  value='ascending'
                  control={<Radio />}
                  label='Ascending'
                  sx={{
                     '& .MuiRadio-root': { border: 'none' },
                  }}
               />
               <FormControlLabel
                  value='descending'
                  control={<Radio />}
                  label='Descending'
                  sx={{
                     '& .MuiRadio-root': { border: 'none' },
                  }}
               />
            </RadioGroup>

            <Typography
               sx={{ fontWeight: 600, fontSize: '1.3rem', color: '#000000' }}
               gutterBottom
            >
               Price Range
            </Typography>

            <RadioGroup
               aria-label='gender'
               name='controlled-radio-buttons-group'
               value={priceRange}
               onChange={handlePriceRangeChange}
            >
               <FormControlLabel
                  value='expensive'
                  control={<Radio />}
                  label='Expensive'
                  sx={{
                     '& .MuiRadio-root': { border: 'none' },
                  }}
               />
               <FormControlLabel
                  value='affordable'
                  control={<Radio />}
                  label='Affordable'
                  sx={{
                     '& .MuiRadio-root': { border: 'none' },
                  }}
               />
            </RadioGroup>
         </CustomizedAccordionForFilter>
      </LeftProductFilterBox>
   );
};

export default LeftProductFilter;
