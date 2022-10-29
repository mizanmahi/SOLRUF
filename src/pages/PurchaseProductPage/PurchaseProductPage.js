import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';

import ProductDetailList from '../../components/ProductDetailList/ProductDetailList';
import ProfileFooter from '../../components/ProfileFooter/ProfileFooter';
import {
   DocumentBox,
   FeatureBox,
   FeatureItemBox,
   ProductFeatures,
   PurchaseBookBox,
   TabPanel,
   TabPanelDoc,
} from './purchaseProduct.style';
import SliderWIthThumbnail from '../../components/SliderWIthThumbnail/SliderWIthThumbnail';
import { useParams } from 'react-router';
import useProduct from '../../hooks/useProduct';
import Loader from '../../components/Loader/Loader';
// import CopyTextVar from '../../components/CopyText/CopyTextVar';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import { addToCart, migrateCart } from '../../redux/slices/cart/cartSlice';
import QuantityControllerForPurchaseProduct from './QuantityControllerForPurchaseProduct';
import { axiAuth } from '../../utils/axiosInstance';
import useAuth from '../../hooks/useAuth';
import { DownloadChip } from '../../components/CustomerDetailsDrawer/customerDetailsDrawer.style';
import EnquiryProductDetails from '../EnquiryPage/EnquiryProductDetails';

const PurchaseProductPage = () => {
   const [purchaseBookingTab, setPurchaseBookingTab] = React.useState(0);
   const [documentTab, setDocumentTab] = React.useState(0);

   const dispatch = useDispatch();

   const { vendorSlug, productSlug: product_slug } = useParams();
   const { cart } = useSelector((state) => state.cart);

   const {
      product: { product, vendor_portfolio },
      productLoading,
      // productError,
   } = useProduct(vendorSlug, product_slug);

   // console.log(vendor_portfolio);

   const { user } = useAuth();

   const [alreadyInCart, setAlreadyInCart] = useState(false);

   useEffect(() => {
      if (!productLoading) {
         const exist = cart.find(
            (item) => item.product_meta.product_slug === product_slug
         );
         console.log(exist);
         if (exist) {
            setAlreadyInCart(exist);
         }
      }
   }, [productLoading, cart, product_slug]);

   const [purchaseQuantity, setPurchaseQuantity] = useState(1);
   const [bookingQuantity, setBookingQuantity] = useState(1);

   const [quantityError, setQuantityError] = useState('');

   console.log(product);
   console.log(alreadyInCart);

   const handleChange = (event, newValue) => {
      console.log(newValue);
      setPurchaseBookingTab(newValue);
   };

   const handleDocumentTabChange = (event, newValue) => {
      setDocumentTab(newValue);
      console.log(newValue);
   };

   const shoes = [
      'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
      'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
      'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
      'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
   ];

   const addToCartHandler = async () => {
      console.log('add to cart');
      setQuantityError(''); // set error to empty string to clear error message before adding to cart

      if (purchaseBookingTab === 0) {
         setPurchaseQuantity(1);
      } else {
         setBookingQuantity(1);
      }

      const detectPrice = () => {
         let price = 0;
         if (purchaseBookingTab === 0) {
            const priceAttribute = product.attributes.find(
               (attribute) => attribute?.name?.toLowerCase() === 'price'
            );
            console.log(priceAttribute);
            price = priceAttribute
               ? priceAttribute.attribute_values[0].value
               : 0;
            return price;
         } else {
            const bookingPriceAttribute = product.attributes.find(
               (attribute) => attribute?.name?.toLowerCase() === 'booking price'
            );
            console.log(bookingPriceAttribute);
            price = bookingPriceAttribute
               ? bookingPriceAttribute?.attribute_values[0].value
               : 0;
            return price;
         }
      };

      const price = detectPrice();
      console.log(price);

      const productToAdd = {
         item_price: detectPrice(),
         total_price: 0,
         product_id: product.product_id,
         vendor_id: vendor_portfolio.vendor_id,
         product_meta: {
            vendor_name: vendor_portfolio.name,
            vendor_slug: vendor_portfolio.slug,
            product_name: product.product_name,
            product_slug,
            product_image: product.product_thumbnail
               ? product.product_thumbnail
               : product.default_image,
            cgst: product.tax_cgst,
            sgst: product.tax_sgst,
            igst: product.tax_igst,
         },

         quantity: 1,
         details: product.details,
         purchase_type: purchaseBookingTab === 0 ? 'purchase' : 'booking',
      };
      console.log({ productToAdd });

      if (user) {
         try {
            const { status, data } = await axiAuth.post('api/carts', {
               carts: [productToAdd],
            });
            if (status === 200) {
               console.log(data.carts);
               dispatch(migrateCart(data.carts));
            }
         } catch (error) {
            console.log(error.message);
         }
      } else {
         dispatch(addToCart(productToAdd));
      }
   };

   useEffect(() => {
      if (alreadyInCart !== false) {
         setPurchaseQuantity(alreadyInCart.quantity || 1);
         setBookingQuantity(alreadyInCart.quantity || 1);
      }
   }, [alreadyInCart]);

   if (productLoading) return <Loader />;

   return (
      <Fragment>
         <Box sx={{ my: 4 }}>
            <Container maxWidth='xl'>
               <Grid container spacing={5}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                     <Box sx={{ mb: 12, maxWidth: 500, mx: 'auto' }}>
                        <SliderWIthThumbnail
                           images={
                              product.images.length > 0
                                 ? product.images.map((img) => img.image_url)
                                 : shoes
                           }
                        />
                     </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                     <Box>
                        <EnquiryProductDetails
                           productDetails={{
                              ...product,
                              ...vendor_portfolio,
                           }}
                           showVendorName
                        />
                     </Box>
                  </Grid>
               </Grid>

               {/* purchase box section */}
               <Box>
                  <PurchaseBookBox
                     sx={{
                        width: '100%',
                        maxWidth: '700px',
                        mx: 'auto',
                        position: 'relative',
                     }}
                  >
                     {!product?.active && (
                        <Box
                           sx={{
                              height: '100%',
                              width: '100%',
                              top: 0,
                              left: 0,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              position: 'absolute',
                              zIndex: 100,
                              background: 'rgba(255,255,255,0.7)',
                              borderRadius: '0.5rem',
                           }}
                        >
                           <Box
                              sx={{
                                 background: '#E21F30',
                                 p: 2,
                                 borderRadius: '8px',
                                 boxShadow:
                                    '0px 4px 24px  0 rgba(0, 69, 184, 0.15)',
                                 backdropFilter: 'blur(10px)',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 width: '95%',
                                 maxWidth: '700px',
                              }}
                           >
                              <Typography
                                 sx={{
                                    fontSize: '1.5rem',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                 }}
                              >
                                 This product is not available for purchase &
                                 booking!
                              </Typography>
                           </Box>
                        </Box>
                     )}

                     <Box sx={{ width: '100%' }}>
                        <TabPanel
                           value={purchaseBookingTab}
                           onChange={handleChange}
                           centered
                           sx={{
                              background: '#F3F3F3',
                              borderRadius: 1.5,
                           }}
                        >
                           <Tab label='Purchase' />
                           {product?.details?.booking_availability && (
                              <Tab label='Book' />
                           )}
                        </TabPanel>
                     </Box>
                     {purchaseBookingTab === 0 && (
                        <Box sx={{ mb: 3, mt: 5 }}>
                           {product?.attributes
                              ?.filter((attr) => {
                                 console.log(attr);
                                 return attr.attribute_values[0].views
                                    .vendor_editable_purchase.visibility;
                              })
                              .map((attr) => (
                                 <ProductDetailList
                                    list={attr.name}
                                    description={
                                       '- ' + attr.attribute_values[1]?.value
                                    }
                                    sx={{ mb: 2 }}
                                 />
                              ))}
                        </Box>
                     )}

                     {purchaseBookingTab === 1 && (
                        <Box sx={{ mt: 3 }}>
                           {product?.attributes
                              ?.filter(
                                 (attr) =>
                                    attr.attribute_values[0].views
                                       .vendor_editable_booking.visibility
                              )
                              .map((attr) => (
                                 <ProductDetailList
                                    list={attr.name}
                                    description={
                                       '- ' + attr.attribute_values[1]?.value
                                    }
                                    sx={{ mb: 2 }}
                                 />
                              ))}
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 alignItems: 'center',
                                 my: 2,
                              }}
                           ></Box>
                        </Box>
                     )}

                     {purchaseBookingTab === 0 && (
                        <>
                           {alreadyInCart &&
                              alreadyInCart.purchase_type === 'purchase' && (
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       alignItems: 'center',
                                    }}
                                 >
                                    <Typography variant='h6' sx={{ mr: 5 }}>
                                       Quantity
                                    </Typography>

                                    <QuantityControllerForPurchaseProduct
                                       quantity={purchaseQuantity}
                                       setQuantity={setPurchaseQuantity}
                                       setQuantityError={setQuantityError}
                                       quantityError={quantityError}
                                       purchaseBookingTab={purchaseBookingTab}
                                       product_slug={product?.product_slug}
                                       cart_id={alreadyInCart.cart_id}
                                    />
                                 </Box>
                              )}
                        </>
                     )}

                     {purchaseBookingTab === 0 && (
                        <>
                           {(!alreadyInCart ||
                              alreadyInCart.purchase_type !== 'purchase') && (
                              <PrimaryButton
                                 sx={{
                                    width: '50%',
                                    marginTop: '1rem',
                                    mx: 'auto',
                                 }}
                                 onClick={addToCartHandler}
                              >
                                 Add To Cart
                              </PrimaryButton>
                           )}
                        </>
                     )}

                     {purchaseBookingTab === 1 && (
                        <>
                           {alreadyInCart &&
                              alreadyInCart.purchase_type === 'booking' && (
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       alignItems: 'center',
                                    }}
                                 >
                                    <Typography variant='h6' sx={{ mr: 5 }}>
                                       Quantity
                                    </Typography>

                                    <QuantityControllerForPurchaseProduct
                                       quantity={bookingQuantity}
                                       setQuantity={setBookingQuantity}
                                       setQuantityError={setQuantityError}
                                       quantityError={quantityError}
                                       purchaseBookingTab={purchaseBookingTab}
                                       product_slug={product?.product_slug}
                                       cart_id={alreadyInCart.cart_id}
                                    />
                                 </Box>
                              )}
                        </>
                     )}

                     {purchaseBookingTab === 1 && (
                        <>
                           {(!alreadyInCart ||
                              alreadyInCart.purchase_type !== 'booking') && (
                              <PrimaryButton
                                 sx={{
                                    width: '50%',
                                    marginTop: '1rem',
                                    mx: 'auto',
                                 }}
                                 onClick={addToCartHandler}
                              >
                                 Add To Cart
                              </PrimaryButton>
                           )}
                        </>
                     )}
                  </PurchaseBookBox>
               </Box>

               {/*  =========  document section ========= */}
               <Box
                  sx={{
                     background: '#fff',
                     p: 2,
                     mt: 6,
                     borderRadius: '8px',
                     boxShadow: '0px 4px 24px  0 rgba(0, 69, 184, 0.15)',
                  }}
               >
                  <Typography
                     sx={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#000',
                        mb: 2,
                     }}
                  >
                     Other Details
                  </Typography>
                  <Grid container>
                     <Grid item xs={12} md={6} lg={3}>
                        <Box>
                           <TabPanelDoc
                              value={documentTab}
                              onChange={handleDocumentTabChange}
                              orientation={
                                 window.innerWidth < 600
                                    ? 'horizontal'
                                    : 'vertical'
                              }
                              variant={
                                 window.innerWidth < 600 ? 'scrollable' : ''
                              }
                           >
                              <Tab label='Product Document' />
                              <Tab label='Warranty Card' />
                              <Tab label='Booking Document' />
                           </TabPanelDoc>
                        </Box>
                     </Grid>
                     <Grid item md={6} lg={9}>
                        <DocumentBox>
                           <Box sx={{ p: 2 }}>
                              {documentTab === 0 && (
                                 <Box sx={{ width: { sm: '70%', xs: '100%' } }}>
                                    {product?.documents?.length > 0 &&
                                       product.documents
                                          .filter(
                                             (doc) => doc.doc_type === 'product'
                                          )
                                          .map(
                                             ({
                                                doc_name,
                                                doc_id,
                                                doc_url,
                                             }) => (
                                                <DownloadChip
                                                   key={doc_id}
                                                   label={doc_name}
                                                   sx={{ mr: 1 }}
                                                   onClick={() =>
                                                      console.log('Clicked')
                                                   }
                                                   component='a'
                                                   href={doc_url}
                                                   target='_blank'
                                                />
                                             )
                                          )}
                                    <Typography variant='body1' sx={{ mt: 1 }}>
                                       <strong>Description:</strong>{' '}
                                       {product.product_description}
                                    </Typography>
                                 </Box>
                              )}
                              {documentTab === 1 && (
                                 <Box>
                                    {product.documents?.length > 0 &&
                                       product.documents
                                          .filter(
                                             (doc) =>
                                                doc.doc_type ===
                                                   'vendor_warranty' ||
                                                doc.doc_type === 'warranty'
                                          )
                                          .map(
                                             ({
                                                doc_name,
                                                doc_id,
                                                doc_url,
                                             }) => (
                                                <DownloadChip
                                                   key={doc_id}
                                                   label={doc_name}
                                                   sx={{ mr: 1 }}
                                                   onClick={() =>
                                                      console.log('Clicked')
                                                   }
                                                   component='a'
                                                   href={doc_url}
                                                   target='_blank'
                                                />
                                             )
                                          )}

                                    <Typography variant='body1' sx={{ mt: 1 }}>
                                       <strong>Description: </strong>{' '}
                                       {product.my_warranty_details}
                                    </Typography>
                                 </Box>
                              )}
                              {documentTab === 2 && (
                                 <Box>
                                    {product.documents?.length > 0 &&
                                       product.documents
                                          .filter(
                                             (doc) =>
                                                doc.doc_type ===
                                                'booking_details'
                                          )
                                          .map(
                                             ({
                                                doc_name,
                                                doc_id,
                                                doc_url,
                                             }) => (
                                                <DownloadChip
                                                   key={doc_id}
                                                   label={doc_name}
                                                   sx={{ mr: 1 }}
                                                   onClick={() =>
                                                      console.log('Clicked')
                                                   }
                                                   component='a'
                                                   href={doc_url}
                                                   target='_blank'
                                                />
                                             )
                                          )}

                                    <Typography variant='body1' sx={{ mt: 2 }}>
                                       <strong>Description: </strong>{' '}
                                       {product.my_payment_policy}
                                    </Typography>
                                 </Box>
                              )}
                           </Box>
                        </DocumentBox>
                     </Grid>
                  </Grid>
               </Box>
               {/*  =========  features section ========= */}

               <ProductFeatures>
                  <Box className='featuresHeader'>
                     <Typography variant='h6'>Product Features</Typography>
                     <Typography variant='h6' sx={{ color: '#2448FC' }}>
                        View All
                     </Typography>
                  </Box>
                  <FeatureBox>
                     {product.attributes?.length > 0 &&
                        product.attributes
                           .filter(
                              (attribute) =>
                                 attribute?.attribute_values[
                                    attribute?.attribute_values?.length - 1
                                 ]?.views?.product_feature_list?.visibility
                           )
                           .slice(0, 4)
                           .map((attribute, index) => (
                              <FeatureItemBox key={index} i={index}>
                                 <Typography variant='body'>
                                    {attribute.name}
                                 </Typography>
                                 <Typography variant='body'>
                                    {attribute.attribute_values[0].value}
                                 </Typography>
                              </FeatureItemBox>
                           ))}
                  </FeatureBox>
               </ProductFeatures>
            </Container>
         </Box>

         <ProfileFooter />
      </Fragment>
   );
};

export default PurchaseProductPage;
