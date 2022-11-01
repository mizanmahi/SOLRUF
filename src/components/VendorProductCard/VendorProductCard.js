import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
   addSelectedProductByVendor,
   setEditMode,
} from '../../redux/slices/Vendor/VendorProductListSlice';
import { axiAuth } from '../../utils/axiosInstance';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';

import ProductDetailList from '../ProductDetailList/ProductDetailList';
import ProductSlider from '../ProductSlider/ProductSlider';
import {
   ButtonBox,
   NameBox,
   ProductCardWrapper,
} from './vendorProductCard.style';

import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const shoes = [
   'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
   'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
   'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
   'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
   'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
];

const VendorProductCard = ({
   product,
   sx,
   editable,
   editDelete,
   actionType,
   nextHandler,
   setFetchProducts,
   showFormHandler,
   vendorInfo,
}) => {
   const { product_name = 'New Product' } = product || {};
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [attributes, setAttributes] = useState([]);

   const findExclusiveAttr = product?.attributes?.find(
      (attr) => attr.name === 'exclusive'
   );

   const exclusive =
      findExclusiveAttr?.attribute_values[
         findExclusiveAttr?.attribute_values.length > 0 ? 1 : 0
      ]?.value === '1';

   console.log(product?.attributes);

   useEffect(() => {
      if (product.attributes && product.attributes.length > 0) {
         setAttributes(
            product.attributes.filter(
               (attribute) =>
                  attribute?.attribute_values[
                     attribute?.attribute_values?.length - 1
                  ]?.views?.portfolio_card?.visibility
            )
         );
      }
   }, [product.attributes]);

   const [selectingProduct, setSelectingProduct] = useState(false);

   const editHandler = async (e) => {
      e.stopPropagation();
      setSelectingProduct(true);
      try {
         const { data } = await axiAuth.get(
            `api/vendor/products/${product.product_id}`
         );
         console.log(data);
         dispatch(addSelectedProductByVendor(data.product));
         dispatch(setEditMode(true));
         showFormHandler();
         nextHandler(1);
         setSelectingProduct(false);
      } catch (error) {
         setSelectingProduct(false);
         console.log(error.message);
      }
   };

   const [productDeleteConfirm, setProductDeleteConfirm] = useState({
      role: 'Product',
      isOpen: false,
      title: 'Delete Product?',
      message: 'Product will be deleted permanently once you continue!',
      cacheRole: 'User',
   });

   const [productPinningConfirm, setProductPinningConfirm] = useState({
      role: 'Product',
      isOpen: false,
      title: 'Pin This Product?',
      message: 'Pinned product will be visible in your portfolio!',
      cacheRole: 'Vendor',
   });

   const [productUnPinningConfirm, setProductUnPinningConfirm] = useState({
      role: 'Product',
      isOpen: false,
      title: 'Unpin This Product?',
      message: 'Unpinned product will not be visible in your portfolio!',
      cacheRole: 'Vendor',
   });

   const deleteHandler = async () => {
      try {
         const { status } = await axiAuth.delete(
            `api/vendor/products/${product.product_id}`
         );
         if (status === 200) {
            setProductDeleteConfirm({
               ...productDeleteConfirm,
               isOpen: false,
            });
            setFetchProducts((prev) => !prev);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const [pinned, setPinned] = useState(
      product?.details?.pinned ? true : false
   );

   const handlePinning = async (e) => {
      e.stopPropagation();
      // pin unpin product
      try {
         const { status, data } = await axiAuth.get(
            `api/vendor/products/${product.product_id}/pin`
         );
         if (status === 200) {
            if (data.message === 'Product Unpinned') {
               setPinned(false);
               setProductUnPinningConfirm({
                  ...productUnPinningConfirm,
                  isOpen: false,
               });
               toast.success('Product Unpinned Successfully');
            } else {
               setPinned(true);
               setProductPinningConfirm({
                  ...productPinningConfirm,
                  isOpen: false,
               });
               toast.success('Product Pinned Successfully');
            }
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   console.log(product);

   const cardClickHandler = () => {
      navigate(
         `/purchase-product/${vendorInfo.slug}/${vendorInfo.id}/${product.product_slug}/${product.product_id}`
      );
   };

   return (
      <>
         <ProductCardWrapper
            sx={{
               ...sx,
            }}
            exclusive={exclusive}
         >
            {product?.images ? (
               <ProductSlider
                  images={product?.images.map((img) => img.image_url)}
               />
            ) : (
               <ProductSlider images={shoes} />
            )}

            {product?.details?.booking_availability && (
               <img
                  src={'https://i.ibb.co/YNmYkyg/Frame-169-1.png'}
                  alt=''
                  style={{
                     position: 'absolute',
                     top: '2%',
                     left: '2%',
                     zIndex: 100,
                     width: '60px',
                  }}
               />
            )}

            <Box sx={{ mb: 3, mt: 1.5 }} onClick={cardClickHandler}>
               <NameBox>
                  <Typography
                     variant='h6'
                     sx={{ fontWeight: '600', textAlign: 'center' }}
                  >
                     {product_name.length > 20
                        ? product_name.slice(0, 20) + '...'
                        : product_name}
                  </Typography>
                  <IconButton
                     sx={{
                        '&:hover': {
                           background: 'rgb(255 232 175)',
                        },
                     }}
                  >
                     {pinned ? (
                        <PushPinIcon
                           onClick={(e) => {
                              e.stopPropagation();
                              setProductUnPinningConfirm({
                                 ...productUnPinningConfirm,
                                 isOpen: true,
                              });
                           }}
                        />
                     ) : (
                        <PushPinOutlinedIcon
                           onClick={(e) => {
                              e.stopPropagation();
                              setProductPinningConfirm({
                                 ...productPinningConfirm,
                                 isOpen: true,
                              });
                           }}
                        />
                     )}
                  </IconButton>
               </NameBox>

               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                  }}
               >
                  <Box>
                     {attributes.length > 0 &&
                        attributes
                           .slice(0, 4)
                           .map((attribute) => (
                              <ProductDetailList
                                 list={attribute.name}
                                 description={`${
                                    attribute?.attribute_values[
                                       attribute?.attribute_values.length - 1
                                    ]?.value
                                 } ${
                                    attribute?.attribute_values[
                                       attribute?.attribute_values.length - 1
                                    ]?.value_unit
                                 }`}
                              />
                           ))}
                  </Box>
                  {exclusive && (
                     <Box
                        sx={{
                           alignSelf: 'flex-end',
                        }}
                     >
                        <img
                           src='https://solruf.s3.ap-south-1.amazonaws.com/image+84.svg'
                           alt='exclusive'
                           style={{
                              width: '60px',
                           }}
                        />
                     </Box>
                  )}
               </Box>
            </Box>

            {editable && (
               <PrimaryButton variant='secondary' fullWidth>
                  Edit
               </PrimaryButton>
            )}

            {editDelete && (
               <>
                  <div
                     style={{
                        height: '24px',
                        width: '100%',
                     }}
                  ></div>
                  <ButtonBox
                     sx={{
                        position: 'absolute',
                        bottom: '24px',
                        left: '24px',
                        right: '24px',
                        mx: 'auto',
                     }}
                  >
                     <PrimaryButton
                        sx={{
                           px: 3.5,
                           py: 0.5,
                           background: 'transparent',
                           border: '2px solid #4D4D4D',

                           flex: '1',
                           '&:hover': {
                              border: '2px solid transparent',
                           },
                        }}
                        onClick={editHandler}
                        disabled={selectingProduct}
                     >
                        Edit
                     </PrimaryButton>

                     <PrimaryButton
                        sx={{
                           px: 3.5,
                           py: 0.5,
                           background: 'transparent',
                           border: '2px solid #F20519',
                           color: '#F20519',
                           flex: '1',
                           marginLeft: '1rem',
                           '&:hover': {
                              border: '2px solid transparent',
                              background: '#F20519',
                              color: '#ffffff',
                           },
                        }}
                        onClick={(e) => {
                           e.stopPropagation();
                           setProductDeleteConfirm({
                              ...productDeleteConfirm,
                              isOpen: true,
                           });
                        }}
                     >
                        Delete
                     </PrimaryButton>
                  </ButtonBox>
               </>
            )}
         </ProductCardWrapper>

         <ConfirmDialog
            confirmDialog={{
               ...productDeleteConfirm,
               onConfirm: deleteHandler,
            }}
            setConfirmDialog={setProductDeleteConfirm}
            variant='warning'
         />
         <ConfirmDialog
            confirmDialog={{
               ...productPinningConfirm,
               onConfirm: handlePinning,
            }}
            setConfirmDialog={setProductPinningConfirm}
            variant='warning'
         />
         <ConfirmDialog
            confirmDialog={{
               ...productUnPinningConfirm,
               onConfirm: handlePinning,
            }}
            setConfirmDialog={setProductUnPinningConfirm}
            variant='warning'
         />
      </>
   );
};

export default VendorProductCard;
