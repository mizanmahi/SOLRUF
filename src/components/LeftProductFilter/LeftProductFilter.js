import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CustomAccordion from '../../components/CustomAccordion/CustomAccordion';
import CatrgoryFilter from '../Custom/CategoryFilter/CatrgoryFilter';

const LeftProductFilterBox = styled(Box)(({ theme }) => ({
   background: '#ffffff',
   borderRadius: '10px',
   boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
   padding: '1rem',
}));

// const categories = [
//    'Solar Panels',
//    'Solar roofing',
//    'Solar invertors',
//    'Solar water pipes',
//    'Solar water tanks',
//    'Solar water heater',
// ];

// var sortCategories = {
//    'Power Capacity': false,
//    'Price Range': false,
// };

const CustomizedAccordionForFilter = styled(CustomAccordion)(({ theme }) => ({
   background: 'transparent',
   '&::before': {
      background: 'transparent',
   },
   '& .MuiButtonBase-root': {
      borderRadius: '12px',
      border: 0,
   },
   '& .Mui-expanded': {
   },
}));

const LeftProductFilter = ({
   activeCategory,
   setActiveCategory,
   handleActiveCategory,
   categories,
   sx
}) => {
   return (
      <LeftProductFilterBox sx={{...sx}}>
         <CustomizedAccordionForFilter
            title='Categories'
            defaultExpanded='true'
            chipTitle={activeCategory}
         >
            <CatrgoryFilter
               categories={categories}
               activeCategory={activeCategory}
               handleActiveCategory={handleActiveCategory}
               setActiveCategory={setActiveCategory}
            />
         </CustomizedAccordionForFilter>
      </LeftProductFilterBox>
   );
};

export default LeftProductFilter;
