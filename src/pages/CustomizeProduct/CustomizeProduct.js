import { Button, Container, Grid, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import { useForm } from 'react-hook-form';

import SolrufTextField from '../../components/TextField/TextField';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalProductCard from '../../components/HorizontalProductCard/HorizontalProductCard';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import CustomAccordionForDrawer from '../../components/Custom/CustomAccordionForDrawer/CustomAccordionForDrawer';
import { Flex, BookingAvailabilityBox } from './customizeProduct.style';
import SolrufSwitch from '../../components/Custom/SolrufSwitch/SolrufSwitch';
import { formatAttribute } from './utils';
import { axiAuth } from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { formatDocumentsWithNameAndUrl } from '../../utils/utils';
import {
   addSelectedProductByVendor,
   setEditMode,
} from '../../redux/slices/Vendor/VendorProductListSlice';
import UploadDocumentsWithName from '../../components/Custom/UploadDocumentsWithName/UploadDocumentsWithName';
import CustomErrorText from '../../components/CustomErrorText/CustomErrorText';

const Wrapper = styled(Box)(({ theme }) => ({
   padding: theme.spacing(2),
   marginTop: theme.spacing(3),
   borderRadius: theme.spacing(1.5),
   '@media (max-width: 600px)': {
      padding: 0,
   },
}));

const CustomizeProduct = ({
   nextHandler,
   showProductPageHandler,
   setFetchProducts,
}) => {
   const dispatch = useDispatch();

   const { selectedProductByVendor, editMode } = useSelector(
      (state) => state.vendorProductList
   );

   console.log({ selectedProductByVendor });

   const [submittingAttribute, setSubmittingAttribute] = useState(false);

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({
      defaultValues: {
         warranty_years:
            selectedProductByVendor?.my_warranty_details?.years || '',
         warranty_description:
            selectedProductByVendor?.my_warranty_details?.description || '',
         advance_payment:
            selectedProductByVendor?.my_payment_policy?.amount || '',
         advance_payment_policy:
            selectedProductByVendor?.my_payment_policy?.description || '',
      },
   });

   const isEdit =
      selectedProductByVendor?.attributes &&
      selectedProductByVendor?.attributes?.some(
         (attr) => attr.attribute_values.length > 1
      )
         ? 1
         : 0;

   const [pricingDetailsFields, setPricingDetailsFields] = useState(
      selectedProductByVendor?.attributes?.filter(
         (attribute) =>
            attribute?.attribute_values[isEdit]?.views?.vendor_editable_purchase
               ?.visibility
      )
   );

   const [bookingAvailabilityFields, setBookingAvailabilityFields] = useState(
      selectedProductByVendor?.attributes?.filter(
         (attribute) =>
            attribute?.attribute_values[isEdit]?.views?.vendor_editable_booking
               ?.visibility
      )
   );

   const [bookingAvailability, setBookingAvailability] = useState(
      selectedProductByVendor?.details?.booking_availability ? true : false
   );

   console.log({ pricingDetailsFields, bookingAvailabilityFields });

   const pricingDetailsFieldsChange = (
      e,
      attributeId,
      value_id,
      field_name
   ) => {
      const { value } = e.target;

      // if field name is exclusive then user could type only 0 or 1
      if (field_name.toLowerCase() === 'exclusive') {
         if (value !== '0' && value !== '1' && value !== '') {
            return;
         }
      }

      setPricingDetailsFields((prevState) => {
         return prevState.map((attribute) => {
            if (attribute.id === attributeId) {
               return {
                  ...attribute,
                  attribute_values: attribute.attribute_values.map(
                     (attrValue) => ({
                        ...attrValue,
                        value:
                           attrValue.id === value_id ? value : attrValue.value,
                     })
                  ),
               };
            }
            return attribute;
         });
      });
   };

   const bookingAvailabilityFieldsChange = (e, attributeId, value_id) => {
      console.log({ value_id });
      const { value } = e.target;
      setBookingAvailabilityFields((prevState) => {
         return prevState.map((attribute) => {
            if (attribute.id === attributeId) {
               return {
                  ...attribute,
                  attribute_values: attribute.attribute_values.map(
                     (attrValue) => ({
                        ...attrValue,
                        value:
                           attrValue.id === value_id ? value : attrValue.value,
                     })
                  ),
               };
            }
            return attribute;
         });
      });
   };

   const [document, setDocument] = useState([]);
   const [documents2, setDocuments2] = useState([]);

   // console.log({ documents2, document });

   const handleBookingAvailabilityChange = (event) => {
      setBookingAvailability(event.target.checked);
   };

   // console.log(setFetchProducts, 'haha');

   const onSubmit = async (data) => {
      setSubmittingAttribute(true);
      console.log({
         data,
         product_documents: formatDocumentsWithNameAndUrl(document),
         booking_details_document: formatDocumentsWithNameAndUrl(documents2),
      });
      try {
         setSubmittingAttribute(true);

         let res;
         console.log(0);

         if (isEdit === 0) {
            // add the attributes
            res = await axiAuth.post('api/vendor/products/attributes', {
               product_id: selectedProductByVendor.product_id,
               booking_availability: bookingAvailability,
               attribute_values: [
                  ...formatAttribute(pricingDetailsFields, isEdit),
                  ...formatAttribute(bookingAvailabilityFields, isEdit),
               ],
            });
         } else {
            // update attribute
            res = await axiAuth.put(`api/vendor/products/attributes/update`, {
               product_id: selectedProductByVendor.product_id,
               booking_availability: bookingAvailability,
               attribute_values: [
                  ...formatAttribute(pricingDetailsFields, isEdit),
                  ...formatAttribute(bookingAvailabilityFields, isEdit),
               ],
            });
         }

         const payload = {
            ...data,
            advance_payment_policy: data?.advance_payment_policy || '-', // sending the default data if no data is provided
            advance_payment: data?.advance_payment || 0,
         };

         const res2 = await axiAuth.put(
            `api/vendor/products/${selectedProductByVendor.product_id}`,
            {
               ...payload,
               product_documents: [
                  ...formatDocumentsWithNameAndUrl(document),
                  // ...selectedProductByVendor?.my_documents
                  //    ?.filter((doc) => doc.doc_type === 'product')
                  //    .map((doc) => ({
                  //       name: doc.doc_name,
                  //       url: doc.doc_url,
                  //    })),
               ],
               booking_details_document: [
                  ...formatDocumentsWithNameAndUrl(documents2),
                  ...selectedProductByVendor?.my_documents
                     ?.filter((doc) => doc.doc_type === 'booking_details')
                     .map((doc) => ({
                        name: doc.doc_name,
                        url: doc.doc_url,
                     })),
               ],
            }
         );

         if (res2.status === 200 && res.status === 200) {
            setSubmittingAttribute(false);

            if (isEdit === 0) {
               toast.success('Product Added Successfully!');
            } else {
               toast.success('Product Updated Successfully!');
            }

            //  getting back to product page
            showProductPageHandler();
            dispatch(setEditMode(false));

            // refetching the products
            setFetchProducts((prev) => !prev);

            // dispatch(addSelectedProductByVendor(null));
         } else {
            toast.error('Something went wrong');
         }
      } catch (error) {
         setSubmittingAttribute(false);
         console.log({ error });
         toast.error(error.response.data.message);
      }
   };

   console.log(errors);
   console.log(editMode);

   const backHandler = () => {
      if (editMode) {
         showProductPageHandler();
         dispatch(setEditMode(false));
         dispatch(addSelectedProductByVendor(null));
         return;
      }
      nextHandler(2);
   };

   return (
      <Wrapper>
         <Container
            maxWidth='lg'
            component='form'
            disableGutters={window.innerWidth < 600 ? true : false}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
               position: 'relative',
            }}
         >
            {!selectedProductByVendor?.active && (
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
                        boxShadow: '0px 4px 24px  0 rgba(0, 69, 184, 0.15)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
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
                        This product is not available for addition in portfolio!
                     </Typography>
                  </Box>
               </Box>
            )}

            <Button
               startIcon={<ArrowBackIcon />}
               sx={{ color: '#000000', mt: 2, display: ['none', 'block'], zIndex: 150 }}
               onClick={backHandler}
            >
               Back
            </Button>
            <Box
               sx={{
                  maxWidth: '1000px',
                  width: '100%',
                  margin: '1rem auto',
                  display: ['none', 'block'],
               }}
            >
               <HorizontalProductCard
                  product={selectedProductByVendor}
                  sx={{ mx: 'auto', mb: 2 }}
                  type='procurement'
               />
            </Box>

            <CustomAccordionForDrawer
               defaultExpanded={true}
               title='Pricing Details'
               sx={{
                  background: 'transparent',
                  boxShadow: '4px 0px 10px 0px rgba(0, 0, 0, 0.1)',
               }}
            >
               <Grid container spacing={3}>
                  {pricingDetailsFields.length > 0 &&
                     pricingDetailsFields.map((details) => (
                        <Grid
                           item
                           md={12}
                           lg={6}
                           key={details?.id}
                           sx={{
                              '@media (max-width: 600px)': {
                                 width: '100%',
                              },
                           }}
                        >
                           <SolrufTextField
                              value={details?.attribute_values[isEdit]?.value}
                              label={details?.name}
                              iconText={
                                 <Typography variant='body2'>
                                    {
                                       details.attribute_values[isEdit]
                                          ?.value_unit
                                    }
                                 </Typography>
                              }
                              onChange={(e) =>
                                 pricingDetailsFieldsChange(
                                    e,
                                    details.id,
                                    details.attribute_values[isEdit].id,
                                    details?.name
                                 )
                              }
                              required
                              helperText={
                                 details?.name?.toLowerCase() === 'exclusive'
                                    ? 'Type 1 for true and 0 for false'
                                    : ''
                              }
                              sx={{
                                 '& .MuiFormHelperText-root': {
                                    color: 'rgba(0, 0, 0, 0.6)',
                                 },
                              }}
                           />
                        </Grid>
                     ))}

                  <Grid
                     item
                     md={12}
                     lg={6}
                     sx={{
                        '@media (max-width: 600px)': {
                           width: '100%',
                        },
                     }}
                  >
                     <SolrufTextField
                        label='Warranty years'
                        size='small'
                        {...register('warranty_years', {
                           required: 'Warranty years is required',
                        })}
                        error={errors.warranty_years}
                        helperText={errors.warranty_years?.message}
                     />
                  </Grid>
               </Grid>
               <Box sx={{ mt: 2 }}>
                  <Box
                     sx={{
                        '@media (max-width: 600px)': {
                           mb: 2,
                        },
                     }}
                  >
                     <Typography
                        variant='body2'
                        sx={{ fontSize: 12, mb: -0.5, ml: 1.5 }}
                     >
                        Pricing Details
                     </Typography>
                     <CustomTextArea
                        placeholder='Write pricing details...'
                        rows={3}
                        style={{
                           marginTop: '10px',
                           flex: 1,
                           width: '100%',
                        }}
                        {...register('warranty_description', {
                           required: 'Pricing details is required',
                        })}
                     />

                     {errors.warranty_description?.message && (
                        <CustomErrorText
                           sx={{ mt: -3.5 }}
                           errorMessage={errors.warranty_description?.message}
                        />
                     )}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                     <UploadDocumentsWithName
                        title='Add Warranty Documents'
                        sx={{ mt: [-3, 0, -3, 1], minWidth: 'auto' }}
                        documents={document}
                        setDocuments={setDocument}
                        prevDocuments={selectedProductByVendor?.my_documents?.filter(
                           (doc) => doc.doc_type === 'vendor_warranty'
                        )}
                     />
                  </Box>
               </Box>
            </CustomAccordionForDrawer>

            {/* ================== Booking availability section ================== */}

            <BookingAvailabilityBox>
               <Flex sx={{ alignItems: 'center' }}>
                  <Typography
                     variant='h6'
                     sx={{
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        mr: 2.5,
                        ml: 1.5,
                     }}
                  >
                     Booking Availability
                  </Typography>
                  <SolrufSwitch
                     sx={{ mt: 0.8, py: 1 }}
                     checked={bookingAvailability}
                     onChange={handleBookingAvailabilityChange}
                  />
               </Flex>
               {bookingAvailability && (
                  <Box sx={{ px: 2, pb: 2 }}>
                     <Grid container spacing={3}>
                        {bookingAvailabilityFields.length > 0 &&
                           bookingAvailabilityFields.map((details) => (
                              <Grid
                                 item
                                 md={12}
                                 lg={6}
                                 key={details.id}
                                 sx={{
                                    '@media (max-width: 600px)': {
                                       width: '100%',
                                    },
                                 }}
                              >
                                 <SolrufTextField
                                    label={details.name}
                                    iconText={
                                       <Typography variant='body2'>
                                          {
                                             details.attribute_values[isEdit]
                                                ?.value_unit
                                          }
                                       </Typography>
                                    }
                                    value={
                                       details.attribute_values[isEdit]?.value
                                    }
                                    onChange={(e) =>
                                       bookingAvailabilityFieldsChange(
                                          e,
                                          details.id,
                                          details.attribute_values[isEdit].id
                                       )
                                    }
                                    //  helperText={details.name + ' is required'}
                                    required={true}
                                 />
                              </Grid>
                           ))}

                        <Grid
                           item
                           md={12}
                           lg={6}
                           sx={{
                              '@media (max-width: 600px)': {
                                 width: '100%',
                              },
                           }}
                        >
                           <SolrufTextField
                              label='Advance payment'
                              size='small'
                              {...register('advance_payment', {
                                 required: 'Advance payment is required',
                              })}
                              error={errors?.advance_payment}
                              helperText={errors?.advance_payment?.message}
                           />
                        </Grid>
                     </Grid>

                     <Box sx={{ mt: 2 }}>
                        <Box>
                           <Typography
                              variant='body2'
                              sx={{ fontSize: 12, mb: -0.5, ml: 1.5 }}
                           >
                              Advance Payment Policy Description
                           </Typography>
                           <CustomTextArea
                              rows={3}
                              placeholder='Write advance payment policy...'
                              defaultValue=' '
                              style={{
                                 marginTop: '10px',
                                 flex: 1,
                                 width: '100%',
                              }}
                              {...register('advance_payment_policy', {
                                 required: 'Advance payment policy is required',
                              })}
                           />

                           {errors.advance_payment_policy?.message && (
                              <CustomErrorText
                                 sx={{ mt: -3.5 }}
                                 errorMessage={
                                    errors.advance_payment_policy?.message
                                 }
                              />
                           )}
                        </Box>

                        <Box
                           sx={{
                              flex: 1,
                              mt: 4,
                              mb: {
                                 xs: 5,
                                 sm: 0,
                              },
                           }}
                        >
                           <UploadDocumentsWithName
                              title='Add booking documents'
                              sx={{
                                 mt: [-3, 0, -3, 0.5],
                                 minWidth: 'auto',
                              }}
                              documents={documents2}
                              setDocuments={setDocuments2}
                              prevDocuments={selectedProductByVendor?.my_documents?.filter(
                                 (doc) => doc.doc_type === 'booking_details'
                              )}
                           />
                        </Box>
                     </Box>
                  </Box>
               )}
            </BookingAvailabilityBox>

            <PrimaryButton
               sx={{ px: 8, py: 1, mb: 2, mt: 5, display: ['none', 'flex'] }}
               type='submit'
               disabled={submittingAttribute}
            >
               Submit
            </PrimaryButton>

            <PrimaryButton
               sx={{
                  py: 1,
                  width: '100%',
                  position: 'fixed',
                  bottom: '0',
                  display: {
                     xs: 'flex',
                     sm: 'none',
                  },
               }}
               type='submit'
               disabled={submittingAttribute}
            >
               Submit
            </PrimaryButton>
         </Container>
      </Wrapper>
   );
};

export default CustomizeProduct;
