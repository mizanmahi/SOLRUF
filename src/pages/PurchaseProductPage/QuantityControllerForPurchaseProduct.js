import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { styled, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import {
   decreaseQuantity,
   increaseQuantity,
} from '../../redux/slices/cart/cartSlice';
import { axiAuth } from '../../utils/axiosInstance';

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

const QuantityControllerForPurchaseProduct = ({
   quantity,
   setQuantity,
   quantityError,
   setQuantityError,
   purchaseBookingTab,
   product_slug,
   cart_id,
}) => {
   const { user } = useAuth();
   console.log(product_slug);
   console.log(cart_id);
   const dispatch = useDispatch();
   const handleQuantityChange = (e) => {
      setQuantityError('');
      setQuantity(+e.target.value);
   };

   const handleQuantityIncrease = async () => {
      setQuantityError('');
      setQuantity((prev) => prev + 1);
      if (user) {
         try {
            // * update quantity in db cart
            const { status, data } = await axiAuth.put(`api/carts/${cart_id}`, {
               quantity: quantity + 1,
            });
            if (status === 200) {
               console.log(data);
               dispatch(increaseQuantity({ product_slug }));
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         dispatch(increaseQuantity({ product_slug }));
      }
   };

   const handleQuantityDecrease = async () => {
      setQuantityError('');
      if (quantity === 1) {
         setQuantityError('Quantity cannot be less than 1');
         return;
      }
      setQuantity((prev) => prev - 1);

      if (user) {
         try {
            // * update quantity in db cart
            const { status, data } = await axiAuth.put(`api/carts/${cart_id}`, {
               quantity: quantity - 1,
            });
            if (status === 200) {
               console.log(data);
               dispatch(decreaseQuantity({ product_slug }));
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         dispatch(decreaseQuantity({ product_slug }));
      }
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

export default QuantityControllerForPurchaseProduct;
