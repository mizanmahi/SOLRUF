import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { styled, Box } from '@mui/material';

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

const QuantityController = ({quantity, setQuantity}) => {

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
      <QuantityBox>
         <input type='text' value={quantity} onChange={handleQuantityChange} />
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
   );
};

export default QuantityController;
