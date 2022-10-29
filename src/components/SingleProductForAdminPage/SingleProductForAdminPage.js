import {
   Avatar,
   Divider,
   ListItem,
   ListItemAvatar,
   ListItemButton,
   ListItemText,
   Radio,
   Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Box, styled } from '@mui/system';
import { useDispatch } from 'react-redux';
// import { addEditProduct } from '../../redux/slices/admin/EditProductSlice';
import { useNavigate } from 'react-router';
import { addSelectedProductByVendor } from '../../redux/slices/Vendor/VendorProductListSlice';
import { axiAuth } from '../../utils/axiosInstance';

const EditIconBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   background: 'rgb(255 249 234)',
   borderRadius: '5px',
   padding: theme.spacing(1),
   alignSelf: 'center',
   cursor: 'pointer',
}));

const SingleProductForAdminPage = ({
   product,
   setSelectedProduct,
   setSelectedProductLoading,
   isVendor,
   editable = true,
   selectedProduct,
}) => {
   const dispatch = useDispatch();

   console.log({ selectedProduct, product });

   const clickHandler = async () => {
      if (setSelectedProduct) {
         // if selectedProduct is passed then we are going to set the selectedProduct

         try {
            setSelectedProductLoading(true);
            const { data } = await axiAuth.get(
               `api/public/products/${product.product_id}`
            );
            console.log(data);
            if (isVendor) {
               // if the user is a vendor, then we need to add the product to the vendor's product list
               dispatch(addSelectedProductByVendor(data.product));
            }

            setSelectedProduct(data.product);
            setSelectedProductLoading(false);
         } catch (error) {
            setSelectedProductLoading(false);
            console.log(error);
         }
         setSelectedProduct(product);
      }
   };

   const { product_name, default_image } = product;

   const navigate = useNavigate();

   const editHandler = (e) => {
      e.stopPropagation();
      // dispatch(addEditProduct(product));
      navigate(`/admin/update/product/${product.product_id}`);
   };

   return (
      <>
         <ListItem
            sx={{
               cursor: 'pointer',
               '&:hover': { bgcolor: ' rgb(255 253 247)' },
               alignItems: { xs: 'center', sm: 'flex-start' },
               justifyContent: 'space-between',
               borderRadius: '8px',
               bgcolor:
                  selectedProduct?.product_id === product?.product_id
                     ? 'secondary.lightYellow'
                     : '',
            }}
            onClick={clickHandler}
         >
            <ListItemAvatar sx={{ display: { xs: 'none', sm: 'block' } }}>
               <Avatar
                  alt='Remy Sharp'
                  src={default_image}
                  sx={{
                     borderRadius: '5px',
                     width: '3rem',
                     height: '3rem',
                     mr: 2,
                  }}
               />
            </ListItemAvatar>
            <ListItemText
               primary={
                  <>
                     <Typography
                        sx={{ color: { xs: '#2448FC', sm: 'inherit' } }}
                     >
                        {product_name}
                     </Typography>
                  </>
               }
               secondary={
                  <>
                     <Typography
                        sx={{ display: { xs: 'none', sm: 'inline' } }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                     >
                        Solruf Product
                     </Typography>
                  </>
               }
            />
            <ListItemButton
               sx={{ display: { xs: 'block', sm: 'none', textAlign: 'end' } }}
            >
               <Radio
                  style={{ '&$checked': { color: '#4B8DF8' } }}
                  sx={{ color: '#2448FC' }}
               />
            </ListItemButton>

            {editable && (
               <EditIconBox>
                  <EditIcon onClick={editHandler} />
               </EditIconBox>
            )}
         </ListItem>
         <Divider
            component='li'
            sx={{
               borderBottom: { xs: '2px solid black', sm: 'inherit' },
               width: '100%',
            }}
         />
      </>
   );
};

export default SingleProductForAdminPage;
