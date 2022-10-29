import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { Fragment } from 'react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

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

const CatrgoryFilter = ({
   categories,
   activeCategory,
   handleActiveCategory,
   setActiveCategory,
}) => {

   console.log(categories);

   return (
      <Fragment>
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
                  {category}
               </FilterCategory>
            ))}
         </Box>
         {activeCategory && (
            <PrimaryButton
               variant='secondary'
               sx={{
                  //    borderRadius: '4px !important',
                  px: '2rem',
                  mx: 'auto',
                  border: '2px solid #E21F30 !important',
                  color: '#E21F30 !important',
                  marginTop: '0.8rem',
                  '&:hover': {
                     backgroundColor: '#E21F30 !important',
                     border: '2px solid transparent !important',
                     color: '#fff !important',
                  },
               }}
               onClick={() => setActiveCategory('')}
            >
               Reset Filter
            </PrimaryButton>
         )}
      </Fragment>
   );
};

export default CatrgoryFilter;
