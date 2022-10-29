import { useEffect, useState } from 'react';
import {
   Button,

   IconButton,
   MenuItem,
   styled,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SolrufTextField from '../../components/TextField/TextField';
import { useForm } from 'react-hook-form';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import YellowButton from '../../components/YellowButton/YellowButton';
import useVerifyGst from '../../hooks/useVerifyGst';
import Loader from '../../components/Loader/Loader';
import DoneIcon from '@mui/icons-material/Done';
import { useDebounce } from 'use-debounce';
import { toast } from 'react-toastify';
import { axiAuth } from '../../utils/axiosInstance';
import CustomErrorText from '../../components/CustomErrorText/CustomErrorText';
import CustomAccordionForDrawer from '../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer';
import RightDrawer from '../RightDrawer/RightDrawer';
import useCategories from '../../hooks/useCategories';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

const VerifyButton = styled(Button)(({ theme }) => ({
   height: '54px !important',
   display: 'flex',
   marginLeft: '0.3rem',
   minWidth: '90px !important',
   justifyContent: 'center',
   background: theme.palette.primary.main,
   color: '#000',
   boxShadow: 'none',
   '&:hover': {
      background: theme.palette.primary.main,
      boxShadow: 0.5,
   },
}));

const CreateCustomerDrawer = ({ rightDrawerOpen, setRightDrawerOpen }) => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
      reset,
   } = useForm();

   const statesOfIndia = useSelector((state) => state.utils.statesOfIndia);
   const [indiaState, setIndiaState] = useState('state');
   const handleStateChange = (e) => {
      console.log(e.target.value);
      setIndiaState(e.target.value);
   };

   const [watchGst, pinCode, city] = watch(['gstin', 'pincode', 'city']);
   const [debouncedPinCode] = useDebounce(pinCode, 1000);
   const {
      verifyGst,
      gstVerifying,
      gstVerified,
      gstError,
      setGstError,
      // setGstVerified,
   } = useVerifyGst();

   const [leadConfigs, setLeadConfigs] = useState({
      sources: [],
      statuses: [],
   });

   const [loader, setLoader] = useState(false);
   const { categories } = useCategories('product', null);

   useEffect(() => {
      if (!debouncedPinCode) return;
      if (debouncedPinCode.length !== 6) return;
      axiAuth
         .get(`/api/pin-code/search?pin_code=${debouncedPinCode}`)
         .then(({ data }) => {
            console.log(data);
            setIndiaState(data.pin_code.state);
            setValue('city', data.pin_code.district);
         })
         .catch((e) => {
            console.log(e);
            toast.error('Invalid pincode!!');
         });
   }, [debouncedPinCode, setValue]);

   useEffect(() => {
      axiAuth
         .get('api/vendor/lead-configs')
         .then(({ data }) => {
            setLeadConfigs(data);
         })
         .catch((err) => {
            console.log('Error fetching lead-configs');
         });
   }, []);

   const customerSubmit = (data) => {
      setLoader(true);
      if (data.gstin) {
         if (!gstVerified) {
            setGstError('Please verify your GST');
            toast.error('Please verify your GST');
            setLoader(false);
            return;
         }
      }
      if (data.phone) {
         if (!watch('phone').match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
            toast.error('Invalid mobile no.!');
            setLoader(false);
            return;
         }
      }
      const customerDetail = {
         lead_source_id: data.lead_source,
         lead_status_id: data.lead_status,
         name: data.first_name + ' ' + data.last_name,
         company_name: data.company_name,
         phone: data.phone,
         gstin: data.gstin,
         website: data.website,
         category_id: data.selectedCategory,
         location: {
            street: data.address,
            city: data.city,
            state: indiaState,
            pincode: data.pincode,
         },
      };
      if (data.email) {
         customerDetail['email'] = data.email;
      }
      axiAuth
         .post(`api/vendor/customers`, customerDetail)
         .then(({ data }) => {
            setLoader(false);
            console.log(data);
            toast.success('Customer successfully created!!');
            setRightDrawerOpen(false);
            reset();
         })
         .catch((e) => {
            console.log(e);
            setLoader(false);
            toast.error('Something went wrong!!');
         });
   };

   return (
      <div>
         <RightDrawer
            drawerStyles={{ backgroundColor: '#fff' }}
            open={rightDrawerOpen}
            onClose={() => setRightDrawerOpen(false)}
            anchor='right'
         >
            <IconButton
               sx={{
                  right: '10px',
                  position: 'absolute',
                  '&:hover': {
                     background: 'rgb(255 232 175)',
                  },
               }}
            >
               <CloseIcon onClick={() => setRightDrawerOpen(false)} />
            </IconButton>
            <Box
               component='form'
               onSubmit={handleSubmit(customerSubmit)}
               sx={{ p: 0 }}
            >
               <Typography
                  variant='h5'
                  fontWeight={600}
                  textAlign='center'
                  sx={{
                     mt: 2,
                     mb: 3,
                     display: 'flex',
                     justifyContent: 'center',
                  }}
               >
                  Add A New Customer
               </Typography>

               <CustomAccordionForDrawer
                  defaultExpanded
                  paddingOff={true}
                  pt='1rem'
                  title='Basic Details'
                  titleStyle={{ fontSize: '1rem' }}
                  sx={{
                     mt: 2,
                     boxShadow: 0,
                     '& .MuiAccordionSummary-root': {
                        borderBottom: '1px solid #D0D7D9',
                     },
                  }}
               >
                  <Box sx={{ px: 2 }}>
                     <Box sx={{ display: 'flex', my: 1, flexDirection: 'row' }}>
                        <SolrufTextField
                           label='First Name'
                           sx={{
                              '& .MuiOutlinedInput-root': {
                                 background: '#ffffff',
                              },
                           }}
                           {...register('first_name', {
                              required: {
                                 value: true,
                                 message: 'First Name is required',
                              },
                           })}
                           error={errors.first_name ? true : false}
                           helperText={
                              errors.first_name && errors.first_name.message
                           }
                        />

                        <SolrufTextField
                           label='Last Name'
                           {...register('last_name')}
                           error={errors.last_name ? true : false}
                           helperText={
                              errors.last_name && errors.last_name.message
                           }
                           sx={{ background: '#ffffff', ml: 1 }}
                        />
                     </Box>
                     <Box sx={{ display: 'flex', my: 1 }}>
                        <SolrufTextField
                           type='number'
                           {...register('phone', {
                              minLength: {
                                 value: 10,
                                 message:
                                    'Phone Number must be at least 10 characters long',
                              },
                              maxLength: {
                                 value: 10,
                                 message:
                                    'Phone Number must be at most 10 characters long',
                              },
                           })}
                           error={errors.phone ? true : false}
                           helperText={errors.phone && errors.phone.message}
                           label='Phone'
                           sx={{ background: '#ffffff', mr: 1 }}
                        />
                        <SolrufTextField
                           label='Email'
                           sx={{ background: '#ffffff' }}
                           {...register('email', {
                              // required: {
                              //   value: true,
                              //   message: "Email-Id is required!!",
                              // },
                              pattern: {
                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                 message: 'Invalid email address',
                              },
                           })}
                           error={errors.email ? true : false}
                           helperText={errors.email && errors.email.message}
                        />
                     </Box>
                     <Box
                        sx={{
                           my: 1,
                           display: 'flex',
                           alignItems: 'center',
                           position: 'relative',
                        }}
                     >
                        <SolrufTextField
                           label='Company Name'
                           sx={{ background: '#ffffff' }}
                           error={errors.company_name}
                           {...register('company_name', {})}
                           helperText={
                              errors.company_name
                                 ? errors.company_name.message
                                 : ''
                           }
                        />
                     </Box>

                     <SolrufTextField
                        type='url'
                        label='Website'
                        sx={{ background: '#ffffff' }}
                        error={errors.website}
                        {...register('website', {})}
                        helperText={
                           errors.website ? errors.website.message : ''
                        }
                     />

                     <Box
                        sx={{
                           my: 1,
                           display: 'flex',
                           alignItems: 'center',
                           position: 'relative',
                        }}
                     >
                        <SolrufTextField
                           sx={{
                              '& .MuiOutlinedInput-root': {
                                 background: '#ffffff',
                              },
                           }}
                           label='GST No'
                           {...register('gstin', {
                              minLength: {
                                 value: 15,
                                 message: 'GST number must be 15 digits',
                              },
                              maxLength: {
                                 value: 15,
                                 message: 'GST number must be 15 digits only',
                              },
                           })}
                           // error={errors.gstin || gstError}
                           error={true}
                           helperText={
                              errors.gstin
                                 ? errors.gstin.message
                                 : gstError
                                 ? gstError
                                 : ''
                           }
                        />
                        {gstVerifying ? (
                           <Loader
                              styles={{
                                 marginTop: '-0.2rem',
                                 marginLeft: '8px',
                                 '& img': {
                                    height: '1rem',
                                    width: '1rem',
                                 },
                              }}
                           />
                        ) : (
                           <VerifyButton
                              sx={{
                                 color: gstVerified
                                    ? 'green'
                                    : 'rgba(0,0,0,0.8)',
                                 textTransform: 'none',
                                 mt: errors.gstin || gstError ? -2.8 : 0,
                              }}
                              variant='contained'
                              onClick={() => verifyGst(watchGst)}
                              endIcon={
                                 gstVerified && (
                                    <DoneIcon sx={{ color: 'green' }} />
                                 )
                              }
                              // disabled={gstVerified}
                           >
                              {gstVerified ? 'Verified' : 'Verify'}
                           </VerifyButton>
                        )}
                        <Typography
                           sx={{
                              fontSize: '0.7rem',
                              color: 'green',
                              position: 'absolute',
                              bottom: '3px',
                              left: '14px',
                           }}
                        >
                           {gstVerified && !errors.gstin ? gstVerified : ''}
                        </Typography>
                     </Box>

                     <Box sx={{ display: 'flex', my: 1 }}>
                        <SolrufTextField
                           label='Pin code'
                           sx={{ background: '#ffffff', mr: 1 }}
                           type='number'
                           {...register('pincode', {
                              minLength: {
                                 value: 6,
                                 message: 'Pin Code must be 6 digits',
                              },
                           })}
                           error={errors.pincode}
                           helperText={
                              errors.pincode ? errors.pincode.message : ''
                           }
                        />

                        <SolrufTextField
                           select
                           label='State'
                           style={{ background: '#ffffff' }}
                           value={indiaState}
                           onChange={handleStateChange}
                        >
                           {statesOfIndia.map((state) => (
                              <MenuItem value={state}>{state}</MenuItem>
                           ))}
                        </SolrufTextField>
                     </Box>

                     <SolrufTextField
                        label='City/District/Town'
                        sx={{ background: '#ffffff' }}
                        InputLabelProps={{ shrink: !!city }}
                        error={errors.city}
                        helperText={errors.city ? errors.city.message : ''}
                        {...register('city', {})}
                     />

                     <CustomTextArea
                        placeholder='Address'
                        rows='3'
                        style={{ background: '#ffffff' }}
                        {...register('address', {})}
                     />
                     {errors.address?.message && (
                        <CustomErrorText
                           errorMessage={errors.address?.message}
                        />
                     )}
                  </Box>
               </CustomAccordionForDrawer>

               <CustomAccordionForDrawer
                  paddingOff={true}
                  defaultExpanded
                  pt='1rem'
                  title='Lead'
                  titleStyle={{ fontSize: '1rem' }}
                  sx={{
                     mt: 2,
                     boxShadow: 0,
                     '& .MuiAccordionSummary-root': {
                        borderBottom: '1px solid #D0D7D9',
                     },
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        mt: 1,
                        p: 2,
                        pt: 0,
                     }}
                  >
                     <SolrufTextField
                        select
                        label='Lead Source'
                        error={errors.lead_source}
                        {...register('lead_source', {
                           required: {
                              value: true,
                              message: 'Please select lead source',
                           },
                        })}
                        helperText={
                           errors.lead_source ? errors.lead_source.message : ''
                        }
                        sx={{
                           mr: 1,
                           '& .MuiOutlinedInput-root': {
                              background: '#ffffff',
                           },
                        }}
                     >
                        {leadConfigs.sources.map(
                           ({ source_id, source_name }) => (
                              <MenuItem key={source_id} value={source_id}>
                                 {source_name}
                              </MenuItem>
                           )
                        )}
                     </SolrufTextField>
                     <SolrufTextField
                        select
                        label='Lead Status'
                        error={errors.lead_status}
                        {...register('lead_status', {
                           required: {
                              value: true,
                              message: 'Please select lead status',
                           },
                        })}
                        helperText={
                           errors.lead_status ? errors.lead_status.message : ''
                        }
                        sx={{
                           '& .MuiOutlinedInput-root': {
                              background: '#ffffff',
                           },
                        }}
                     >
                        {leadConfigs.statuses.map(
                           ({ status_id, status_name }) => (
                              <MenuItem key={status_id} value={status_id}>
                                 {status_name}
                              </MenuItem>
                           )
                        )}
                     </SolrufTextField>
                  </Box>

                  <Box sx={{ px: 2, pb: 2 }}>
                     <SolrufTextField
                        select
                        {...register('selectedCategory', {
                           required: {
                              value: true,
                              message: 'Please select product category',
                           },
                        })}
                        error={errors.selectedCategory}
                        helperText={
                           errors.selectedCategory ? errors.selectedCategory.message : ''
                        }
                        label='Select Category'
                        
                     >
                        {categories.map(({ category_id, name }) => (
                           <MenuItem key={category_id} value={category_id}>
                              {name}
                           </MenuItem>
                        ))}
                     </SolrufTextField>
                  </Box>
               </CustomAccordionForDrawer>

               <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                  {loader ? (
                     <Loader />
                  ) : (
                     <YellowButton
                        type='submit'
                        style={{
                           color: '#000000',
                           width: '100%',
                        }}
                     >
                        Create
                     </YellowButton>
                  )}
               </Box>
            </Box>
         </RightDrawer>
      </div>
   );
};

export default CreateCustomerDrawer;
