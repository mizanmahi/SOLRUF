import {
   Box,
   Container,
   FormControl,
   FormControlLabel,
   ListItemButton,
   Radio,
   RadioGroup,
   Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';

import ListItemText from '@mui/material/ListItemText';
import YellowButton from '../../components/YellowButton/YellowButton';
import CustomBottomBar from '../../components/CustomBottomBar/CustomBottomBar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import BottomDialog from '../../components/Custom/BottomDialog/BottomDialog';
import { KeyboardBackspace } from '@mui/icons-material';
import { axiAuth } from '../../utils/axiosInstance';
import ProductCardForPortfolio from '../../portfolio/BookProducts/ProductCardForPortfolio';

const BookProductInAdvancePage = () => {
   const navigate = useNavigate();
   const [products, setProducts] = useState([]);
   const [params, setParams] = useState({ category: ['ldfksj', 'new'] });

   const getProducts = useCallback(() => {
      axiAuth.get('api/vendor/products', { params }).then(({ data }) => {
         console.log(data);
         console.log('fetch products >>>>>>>>>>>>>>');
         setProducts(data.products);
      });
   }, [params]);

   useEffect(() => {
      window.scrollTo(0, 0);
      getProducts();
   }, [getProducts]);

   const applyFilters = () => {};

   return (
      <Box>
         <Box
            sx={{
               width: '100%',
               p: 1,
               color: 'black',
               bgcolor: '#D0D7D9',
               fontWeight: 'bold',
               position: 'fixed',
               top: '0',
               display: 'flex',
               justifyContent: 'space-between',
               columnGap: 1,
               cursor: 'pointer',
               zIndex: '15',
            }}
            onClick={() => navigate(-1)}
         >
            <KeyboardBackspace />
            <Box>Book Products in Advance</Box>
            <Box></Box>
         </Box>
         <Container sx={{ py: 5 }}>
            <Box>
               {products?.map((product) => (
                  <ProductCardForPortfolio
                     key={product.product_id}
                     product={product}
                     actionType={'purchase'}
                     sx={{ mx: 'auto', my: 2 }}
                  />
               ))}
            </Box>
         </Container>
         <BottomButtons applyFilters={applyFilters} />
      </Box>
   );
};

const categories = [
   'Electrodes',
   'SolarPanels',
   'Solar Invertors',
   'Solar Batteries',
   'Solar Cabels',
   'Lightning Arrestor',
   'Junction Box AC/DC',
];

function BottomButtons({ applyFilters }) {
   const [sortDialogOpen, setSortDialogOpen] = useState(false);
   const [categoriesDialogOpen, setCategoriesDialogOpen] = useState(false);

   const [selectedListItem, setSelectedListItem] = useState([]);

   const handleSelectedListItem = (index) => {
      let array = selectedListItem;
      if (array.findIndex((e) => e === categories[index]) > -1) {
         array = array.filter((e) => e !== categories[index]);
         setSelectedListItem([...array]);
      } else {
         setSelectedListItem([...selectedListItem, categories[index]]);
      }
   };

   const isSelected = (label) => {
      if (selectedListItem.findIndex((e) => e === label) > -1) {
         return true;
      }
      return false;
   };

   return (
      <>
         {/* Filter :- reset and apply */}
         <BottomDialog
            open={sortDialogOpen}
            handleClose={() => setSortDialogOpen(false)}
            height='auto'
            bar={true}
            text={'Sort'}
         >
            <Box sx={{ px: '20px', my: 1 }}>
               <Typography variant='h6' fontWeight={600}>
                  Power Capacity
               </Typography>
               <FormControl sx={{ ml: 2 }}>
                  <RadioGroup
                     aria-labelledby='demo-radio-buttons-group-label'
                     defaultValue='ascending'
                     name='radio-buttons-group'
                  >
                     <FormControlLabel
                        value='ascending'
                        control={<Radio />}
                        label='Ascending'
                     />
                     <FormControlLabel
                        value='descending'
                        control={<Radio />}
                        label='Descending'
                     />
                  </RadioGroup>
               </FormControl>
            </Box>
            <Box sx={{ padding: '0px 20px 20px 20px' }}>
               <Typography variant='h6' fontWeight={600}>
                  Price Range
               </Typography>
               <FormControl sx={{ ml: 2 }}>
                  <RadioGroup
                     aria-labelledby='demo-radio-buttons-group-label'
                     defaultValue='ascending'
                     name='radio-buttons-group'
                  >
                     <FormControlLabel
                        value='expensive'
                        control={<Radio />}
                        label='Expensive'
                     />
                     <FormControlLabel
                        value='affordable'
                        control={<Radio />}
                        label='Affordable'
                     />
                  </RadioGroup>
               </FormControl>
            </Box>
            <Box sx={{ py: 2, px: 1 }}></Box>
            <CustomBottomBar>
               <YellowButton
                  onClick={() => {}}
                  style={{
                     border: '2px solid #F20519',
                     color: '#F20519',
                     background: '#fff',
                     fontSize: '20px',
                     width: '100%',
                     borderRadius: 'none',
                  }}
               >
                  {' '}
                  <CloseIcon /> Reset
               </YellowButton>
               <YellowButton
                  onClick={() => {}}
                  style={{
                     color: '#181818',
                     background: '#FFD05B',
                     fontSize: '20px',
                     width: '100%',
                     borderRadius: 'none',
                  }}
               >
                  {' '}
                  <CheckIcon /> Apply
               </YellowButton>
            </CustomBottomBar>
         </BottomDialog>

         {/* Sort :- reset and apply */}
         <BottomDialog
            open={categoriesDialogOpen}
            handleClose={() => setCategoriesDialogOpen(false)}
            height='80%'
            bar={true}
            text={'Categories'}
         >
            <Box sx={{ padding: '10px', overflow: 'auto' }}>
               <List
                  component='nav'
                  sx={{
                     // selected and (selected + hover) states
                     '&& .Mui-selected, && .Mui-selected:hover': {
                        bgcolor: '#ffd05b',
                        '&, & .MuiListItemIcon-root': {
                           color: 'green',
                        },
                     },
                  }}
               >
                  {categories.map((label, index) => {
                     return (
                        <ListItemButton
                           sx={{ my: 1, borderRadius: '10px' }}
                           key={index}
                           selected={isSelected(label)}
                           onClick={(event) => handleSelectedListItem(index)}
                        >
                           <ListItemText primary={label} />
                        </ListItemButton>
                     );
                  })}
               </List>
            </Box>
            <CustomBottomBar>
               <YellowButton
                  onClick={() => {
                     setSelectedListItem([]);
                  }}
                  style={{
                     border: '2px solid #F20519',
                     color: '#F20519',
                     background: '#fff',
                     fontSize: '20px',
                     width: '100%',
                     borderRadius: 'none',
                  }}
               >
                  {' '}
                  <CloseIcon /> Reset
               </YellowButton>
               <YellowButton
                  onClick={() => {}}
                  style={{
                     color: '#4D4D4D',
                     background: '#FFD05B',
                     fontSize: '20px',
                     width: '100%',
                     borderRadius: 'none',
                  }}
               >
                  {' '}
                  <CheckIcon /> Apply
               </YellowButton>
            </CustomBottomBar>
         </BottomDialog>

         {/* Sort and filter  */}
         <CustomBottomBar>
            <YellowButton
               onClick={() => setSortDialogOpen(true)}
               style={{
                  color: '#4D4D4D',
                  background: '#D0D7D9',
                  fontSize: '18px',
                  width: '100%',
                  borderRadius: 'none',
               }}
            >
               {' '}
               Sort (0)
            </YellowButton>
            <YellowButton
               onClick={() => setCategoriesDialogOpen(true)}
               style={{
                  color: '#F3F3F3',
                  background: '#4D4D4D',
                  fontSize: '18px',
                  width: '100%',
                  borderRadius: 'none',
               }}
            >
               {' '}
               Categories ({selectedListItem.length})
            </YellowButton>
         </CustomBottomBar>
      </>
   );
}

export default BookProductInAdvancePage;
