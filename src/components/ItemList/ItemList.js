import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';

const ItemWrapper = styled('div')(({ theme }) => ({
   maxWidth: '100%',
   background: '#F3F3F3',
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.23)',
   padding: theme.spacing(1.5),
   borderRadius: '8px',
   marginBottom: '1rem',
}));

const ItemDetailBox = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'stretch',
}));

const QuantityAndPriceBox = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   textAlign: 'center',
   justifyContent: 'space-around',
   marginTop: '1rem',
}));

const PriceBox = styled('div')(({ theme }) => ({
   textAlign: 'center',
}));

const QuantityBox = styled(Box)(({ theme }) => ({
   //    minWidth: '200px',
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'center',
   margin: '1rem 0',
   '& input': {
      maxWidth: '60px',
      border: '2px solid #4D4D4D',
      borderRadius: '5px',
      minHeight: '32px',
      textAlign: 'center',
   },
   '& svg': {
      border: `2px solid ${theme.palette.primary.main}`,
      marginLeft: '5px',
      borderRadius: '5px',
      cursor: 'pointer',
   },
}));

const ItemList = () => {
   const [quantity, setQuantity] = useState(0);

   const handleQuantityChange = (e) => {
      setQuantity(+e.target.value);
   };

   const handleQuantityIncrease = () => {
      setQuantity((prev) => prev + 1);
   };

   const handleQuantityDecrease = () => {
      if (quantity === 0) {
         return;
      }
      setQuantity((prev) => prev - 1);
   };

   return (
      <ItemWrapper>
         <ItemDetailBox>
            <img
               src='https://i.ibb.co/7vQHPjD/Rectangle-35.png'
               alt='item'
               style={{ width: '100%', maxWidth: '200px' }}
            />
            <Box sx={{ ml: 2 }}>
               <Typography variant='h6' fontWeight={600}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Nobis, dicta.
               </Typography>
               <QuantityAndPriceBox>
                  <Box>
                     <Typography variant='body1' color='gray'>
                        Quantity
                     </Typography>
                     <QuantityBox>
                        <input
                           type='text'
                           value={quantity}
                           onChange={handleQuantityChange}
                        />
                        <PlusIcon
                           style={{
                              width: '30px',
                              boxSizing: 'content-box',
                              padding: '0 .7rem',
                           }}
                           onClick={handleQuantityIncrease}
                        />
                        <MinusIcon
                           style={{
                              width: '30px',
                              boxSizing: 'content-box',
                              padding: '0 .7rem',
                           }}
                           onClick={handleQuantityDecrease}
                        />
                     </QuantityBox>
                  </Box>
                  <PriceBox>
                     <Typography variant='body1' fontWeight={600} gutterBottom>
                        Total Price
                     </Typography>
                     <Typography variant='h6' fontWeight={600} gutterBottom>
                        Rs. 56,0005
                     </Typography>
                     <Typography variant='body2' color='gray'>
                        GST @5% at Rs. 75,000
                     </Typography>
                  </PriceBox>
               </QuantityAndPriceBox>
            </Box>
         </ItemDetailBox>
         <Typography color='error' sx={{ mt: 1 }}>
            Remove
         </Typography>
      </ItemWrapper>
   );
};

export default ItemList;
