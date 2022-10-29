import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { styled, Box, Typography } from '@mui/material';

const QuantityBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'stretch',
   margin: '1rem 0',
   border: `2px solid ${theme.palette.primary.main}`,
   width: '150px',
   borderRadius: '5px',
   '& input': {
      maxWidth: '60px',
      minHeight: '32px',
      textAlign: 'center',
      border: 0,
      outline: 0,
   },
   '& svg': {
      background: theme.palette.primary.main,
      cursor: 'pointer',
   },
}));

const ErrorText = styled(Typography)(({ theme }) => ({
   color: theme.palette.primary.error,
   fontSize: '12px',
   position: 'absolute',
   bottom: '-0.4rem',
   width: '150%',
}));

const QuantityController = ({
   quantity,
   setQuantity,
   quantityError,
   setQuantityError,
}) => {
   const handleQuantityChange = (e) => {
      setQuantityError('');
      setQuantity(+e.target.value);
   };

   const handleQuantityIncrease = () => {
      setQuantityError('');
      setQuantity((prev) => prev + 1);
   };

   const handleQuantityDecrease = () => {
      setQuantityError('');
      if (quantity === 0) {
         setQuantityError('Quantity cannot be less than 0');
         return;
      }
      setQuantity((prev) => prev - 1);
   };

   return (
      <Box sx={{ position: 'relative' }}>
         <QuantityBox>
            <MinusIcon
               style={{
                  width: '30px',
                  boxSizing: 'content-box',
                  padding: '0 .7rem',
               }}
               onClick={handleQuantityDecrease}
            />

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
         </QuantityBox>
         {quantityError && <ErrorText>{quantityError}</ErrorText>}
      </Box>
   );
};

export default QuantityController;
