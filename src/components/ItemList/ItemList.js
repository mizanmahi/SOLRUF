import { IconButton, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
   decreaseQuantity,
   increaseQuantity,
   migrateCart,
   removeFromCart,
} from '../../redux/slices/cart/cartSlice';
import { ErrorText, QuantityBox } from './itemlist.style';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { axiAuth } from '../../utils/axiosInstance';
import useAuth from '../../hooks/useAuth';
import PageviewIcon from '@mui/icons-material/Pageview';

const ItemWrapper = styled('div')(({ theme }) => ({
   maxWidth: '100%',
   background: '#ffffff',
   padding: theme.spacing(1.5),
   borderRadius: '8px',
   marginBottom: '1rem',
   boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
   position: 'relative',
}));

const ItemDetailBox = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'stretch',
}));

const QuantityAndPriceBox = styled('div')(({ theme }) => ({}));

const PriceBox = styled('div')(({ theme }) => ({}));

const BookingTag = styled('div')(({ theme }) => ({
   background: '#2448FC',
   padding: '0.4rem 0.8rem',
   width: '80%',
   borderRadius: '8px',
   textAlign: 'center',
   position: 'absolute',
   top: '5px',
   left: '50%',
   transform: 'translateX(-50%)',
   '& p': {
      fontSize: '1rem',
      color: '#ffffff',
      fontWeight: 'bold',
   },
}));

const ItemList = ({ item }) => {
   const [quantity, setQuantity] = useState(item?.quantity);
   const [quantityError, setQuantityError] = useState('');
   const dispatch = useDispatch();
   const { user } = useAuth();
   console.log(item);

   console.log('rendering itemList');

   const handleQuantityIncrease = async () => {
      setQuantityError('');
      setQuantity((prev) => prev + 1);

      if (user) {
         try {
            // * update quantity in db cart
            const { status, data } = await axiAuth.put(
               `api/carts/${item.cart_id}`,
               {
                  quantity: quantity + 1,
               }
            );
            if (status === 200) {
               console.log(data);
               dispatch(
                  increaseQuantity({
                     product_slug: item.product_meta.product_slug,
                  })
               );
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         dispatch(
            increaseQuantity({
               product_slug: item.product_meta.product_slug,
            })
         );
      }
   };

   const handleQuantityDecrease = async () => {
      setQuantityError('');
      if (quantity === 0) {
         setQuantityError('Quantity cannot be less than 0');
         return;
      }
      setQuantity((prev) => prev - 1);

      if (user) {
         try {
            // * update quantity in db cart
            const { status, data } = await axiAuth.put(
               `api/carts/${item.cart_id}`,
               {
                  quantity: quantity - 1,
               }
            );
            if (status === 200) {
               console.log(data);
               dispatch(
                  decreaseQuantity({
                     product_slug: item.product_meta.product_slug,
                  })
               );
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         dispatch(
            decreaseQuantity({
               product_slug: item.product_meta.product_slug,
            })
         );
      }
   };

   const gotoProductDetailsPage = () => {
      window.open(
         `/purchase-product/${item?.product_meta?.vendor_slug}/${item.vendor_id}/${item?.product_meta?.product_slug}/${item.product_id}`,
         '_blank'
      );
   };

   const deleteHandler = async () => {
      if (user) {
         try {
            const { status, data } = await axiAuth.delete(
               `api/carts/${item.cart_id}`
            );
            if (status === 200) {
               dispatch(migrateCart(data.carts));
               console.log(data);
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         dispatch(removeFromCart(item.product_meta.product_slug));
      }
   };

   return (
      <ItemWrapper>
         <ItemDetailBox>
            <Box
               sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  maxHeight: '200px',
                  width: '30%',
                  cursor: 'pointer',
               }}
               onClick={gotoProductDetailsPage}
            >
               {item?.purchase_type === 'booking' && (
                  <BookingTag>
                     <Typography>Booking</Typography>
                  </BookingTag>
               )}

               <img
                  src={`${
                     item.product_meta.product_image
                        ? item.product_meta.product_image
                        : 'https://i.ibb.co/7vQHPjD/Rectangle-35.png'
                  }`}
                  alt='item'
                  style={{
                     maxWidth: '100%',
                     height: '100%',
                     objectFit: 'cover',
                  }}
               />
            </Box>
            <Box sx={{ ml: 5, width: '70%' }}>
               <Typography
                  variant='h6'
                  fontWeight={600}
                  sx={{ mb: 1, cursor: 'pointer', mt: 2 }}
                  onClick={gotoProductDetailsPage}
               >
                  {item.product_meta.product_name}
               </Typography>
               <Typography
                  variant='body2'
                  fontWeight={600}
                  sx={{ mb: 1, cursor: 'pointer', color: '#8E8E8E', mt: -1.5 }}
                  onClick={gotoProductDetailsPage}
               >
                  {item.product_meta.vendor_name}
               </Typography>
               <QuantityAndPriceBox>
                  <PriceBox>
                     <Typography variant='h6' fontWeight={600} gutterBottom>
                        Rs. {item.item_price * item.quantity}
                     </Typography>
                     <Typography variant='body2' sx={{ fontWeight: 500 }}>
                        <span
                           style={{
                              color: '#3FB500',
                              fontSize: '1rem',
                              fontWeight: 500,
                           }}
                        >
                           {/* 50% OFF */}
                        </span>{' '}
                        GST @
                        {item?.product_meta?.igst +
                           item?.product_meta?.cgst +
                           item?.product_meta?.sgst}
                        % at Rs.
                        {item.item_price *
                           item.quantity *
                           (item.product_meta.cgst / 100 +
                              item.product_meta.sgst / 100 +
                              item.product_meta.igst / 100)}
                     </Typography>
                  </PriceBox>
                  <Box
                     sx={{
                        mt: 1.5,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                     }}
                  >
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

                           <input type='text' value={item?.quantity} />

                           <PlusIcon
                              style={{
                                 width: '30px',
                                 boxSizing: 'content-box',
                                 padding: '0 .7rem',
                              }}
                              onClick={handleQuantityIncrease}
                           />
                        </QuantityBox>
                        {quantityError && (
                           <ErrorText>{quantityError}</ErrorText>
                        )}
                     </Box>
                     <IconButton
                        sx={{ ml: 3, mt: 0.5, background: '#e5e5ff' }}
                        onClick={gotoProductDetailsPage}
                     >
                        <PageviewIcon
                           sx={{ fontSize: '35px', color: '#2e2ef6' }}
                        />
                     </IconButton>
                  </Box>
               </QuantityAndPriceBox>
            </Box>
         </ItemDetailBox>

         <IconButton
            sx={{
               mt: 1,
               cursor: 'pointer',
               position: 'absolute',
               top: '0',
               right: '5px',
            }}
            color='error'
            onClick={deleteHandler}
         >
            <DeleteIcon />
         </IconButton>
      </ItemWrapper>
   );
};

export default ItemList;
