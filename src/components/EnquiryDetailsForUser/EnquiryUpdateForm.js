import {
   Box,
   Checkbox,
   FormControlLabel,
 
   MenuItem,
   Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import React, {  useEffect,  useState } from 'react';
import BackToButton from '../BackToButton/BackToButton';
import DatePicker from '../Custom/DatePicker/DatePicker';
import QuantityController from '../QuantityController/QuantityController';
import {

   FormWrapper
} from './enquiryDetailsForUser.style';
import SolrufTextField from '../TextField/TextField';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { axiAuth } from '../../utils/axiosInstance';
import { useDebounce } from 'use-debounce/lib';
import YellowButton from '../YellowButton/YellowButton';
import { setEnquiryDetails } from '../../redux/slices/userSlice';
import { useProfile } from '../../hooks/useProfile';

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

const EnquiryUpdateForm = ({
   isEdit,
   setIsEdit,
   enquiryDetails,
   companyDetailsError,
}) => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: {
         pin_code: enquiryDetails.others.user_address.pin_code || '',
         address: enquiryDetails.others.user_address.address || '',
      },
   });

   console.log('enquiryDetails', enquiryDetails);

   const dispatch = useDispatch();

   const statesOfIndia = useSelector((state) => state.utils.statesOfIndia);
   const [quantity, setQuantity] = useState(enquiryDetails.others.quantity);
   const [quantityError, setQuantityError] = useState('');
   const [date, setDate] = useState(
      new Date(enquiryDetails.others.delivery_date)
   );
   const [indiaState, setIndiaState] = useState('state');
   const [accept_other_brands, setAccept_other_brands] = useState(
      enquiryDetails.others.accept_other_brands
   );
   const [share_company_information, setShare_company_information] = useState(
      enquiryDetails.others.share_company_information
   );

   const handleStateChange = (e) => {
      console.log(e.target.value);
      setIndiaState(e.target.value);
   };

   const [watchPinCode] = watch(['pin_code']);
   const [debouncedPinCode] = useDebounce(watchPinCode, 500);

   useEffect(() => {
      if (debouncedPinCode.length !== 6) return; // if debouncedPinCode is not 6 characters long then return
      axiAuth
         .get(`api/pin-code/search?pin_code=${debouncedPinCode}`)
         .then(({ data }) => {
            console.log(data);
            setIndiaState(data.pin_code.state);
            setValue('city', data.pin_code.district);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [debouncedPinCode, setValue]);

   const { profile } = useProfile();

   const handleEnquiryUpdate = (data) => {
      const updatedData = {
         user_address: {
            ...data,
            state: indiaState,
         },
      };

      console.log("Submitting....!", data);

      if (parseInt(quantity) !== 0) {
         updatedData.quantity = parseInt(quantity);
      }

      if (date) {
         updatedData.delivery_date = date?.toISOString().split('T')[0];
      }

      updatedData.accept_other_brands = accept_other_brands;
      updatedData.share_company_information = share_company_information;

      if (share_company_information) {
         updatedData.company =
            {
               name: profile?.business?.company_name,
               gstin: profile?.business?.gstin,
               city: profile?.business?.city,
               pin_code: profile?.business?.pincode,
               state: profile?.business?.state,
               street: profile?.business?.address,
            } || null;
      }

      axiAuth
         .put(`api/enquiries/${enquiryDetails.id}`, updatedData)
         .then((res) => {
            console.log(res);
            if (res.status === 200) {
               const enquiry = res.data.enquiry;
               console.log(enquiry);
               setIsEdit(false);
               dispatch(
                  setEnquiryDetails({
                     quantity: enquiry?.quantity,
                     product_name: enquiry?.product?.name,
                     progress: '-',
                     status: enquiry?.status,
                     id: enquiry?.id,
                     delivery_date: enquiry?.delivery_date,
                     location: `${enquiry?.user_address?.city}, ${enquiry?.user_address?.state}`,
                     others: {
                        ...enquiry,
                     },
                  })
               );
            }
         })
         .catch((err) => {
            console.log(err.message);
         });
   };

   const backHandler = () => {
      setIsEdit(false);
   };

   return (
      <>
         <FormWrapper component='form' sx={{ pt: 0 }}>
            <BackToButton onClick={backHandler}>Back</BackToButton>
            <Flex sx={{ justifyContent: 'space-between', flexDirection: {
               xs: 'column',
               md: 'row',
            } }}>
               <Flex sx={{ alignItems: 'center' }}>
                  <Typography variant='h6' sx={{ mr: 3, color: '#4D4D4D' }}>
                     Quantity
                  </Typography>

                  <QuantityController
                     quantity={quantity}
                     setQuantity={setQuantity}
                     quantityError={quantityError}
                     setQuantityError={setQuantityError}
                  />
               </Flex>
               <DatePicker
                  date={date}
                  setDate={setDate}
                  sx={{ mt: !date ? 2 : 0, mb: [2, 0] }}
               />
            </Flex>
            <Flex>
               <SolrufTextField
                  sx={{ mr: 2 }}
                  label='Pin code'
                  InputLabelProps={{ shrink: true }}
                  {...register('pin_code', {
                     minLength: {
                        value: 6,
                        message: 'Pin code must be at least 6 characters',
                     },
                     maxLength: {
                        value: 6,
                        message: 'Pin code must be at most 6 characters',
                     },
                  })}
                  error={errors.pincode}
                  helperText={errors.pincode ? errors.pincode.message : ' '}
               />
               <SolrufTextField
                  InputLabelProps={{ shrink: true }}
                  sx={{}}
                  label='City / District'
                  {...register('city')}
               />
            </Flex>

            <SolrufTextField
               select
               label='State'
               value={indiaState}
               onChange={handleStateChange}
               helperText={errors.state ? errors.state.message : ' '}
            >
               {statesOfIndia.map((state) => (
                  <MenuItem value={state}>{state}</MenuItem>
               ))}
            </SolrufTextField>

            <SolrufTextField
               label='Address'
               {...register('address', {
                  minLength: {
                     value: 10,
                     message: 'Address must be 10 characters long',
                  },
               })}
            />

            {/*  check boxes */}
            <Flex
               sx={{
                  flexDirection: 'column',
                  '& .MuiFormControlLabel-root': {
                     margin: 0,
                  },
                  mt: 1,
               }}
            >
               <FormControlLabel
                  sx={{
                     '& .MuiTypography-root': {
                        fontWeight: 'bold',
                     },
                  }}
                  control={
                     <Checkbox
                        checked={accept_other_brands}
                        onChange={(e) =>
                           setAccept_other_brands(e.target.checked)
                        }
                     />
                  }
                  label='Accept Products from other Brand?'
               />
               {!companyDetailsError && (
                  <FormControlLabel
                     sx={{
                        '& .MuiTypography-root': {
                           fontWeight: 'bold',
                        },
                     }}
                     control={
                        <Checkbox
                           checked={share_company_information}
                           onChange={(e) =>
                              setShare_company_information(e.target.checked)
                           }
                        />
                     }
                     label='Share your Company Information with Supplier?'
                  />
               )}
            </Flex>
         </FormWrapper>
         <YellowButton
            onClick={handleSubmit(handleEnquiryUpdate)}
            style={{
               width: '100%',
               background: isEdit ? '#ffd05b' : '#D0D7D9',
               borderRadius: '0 0 10px 10px',
            }}
         >
            Save
         </YellowButton>
      </>
   );
};

export default EnquiryUpdateForm;
