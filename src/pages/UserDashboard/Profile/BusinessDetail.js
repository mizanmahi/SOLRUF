import { Fragment, useEffect, useState } from 'react';
import { Avatar, Button, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SolrufTextField from '../../../components/TextField/TextField';
import { useForm } from 'react-hook-form';
import CustomTextArea from '../../../components/CustomTextArea/CustomTextArea';
import YellowButton from '../../../components/YellowButton/YellowButton';
import useVerifyGst from '../../../hooks/useVerifyGst';
import Loader from '../../../components/Loader/Loader';
import DoneIcon from '@mui/icons-material/Done';
import { useDebounce } from 'use-debounce';
import BusinessDetail from '../../../media/Svg/BusinessDetail.svg';
import { toast } from 'react-toastify';
import { axiAuth } from '../../../utils/axiosInstance';
import CustomErrorText from '../../../components/CustomErrorText/CustomErrorText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import {
   loadingEnd,
   loadingStart,
   setProfileData,
} from '../../../redux/slices/ProfileSlice';
import LinearProgressWithLabel from '../../../components/ProgressWithLabel/ProgressWithLabel';
import ProductDetailList from '../../../components/ProductDetailList/ProductDetailList';
import { DottedBox, UploadBox } from '../../MyPortfolio/MyPortfolio';
import { XIcon, PhotographIcon, CheckIcon } from '@heroicons/react/outline';

const EditProfileBox = styled(Box)(({ theme }) => ({
   background: '#FFFFFF',
   borderRadius: '8px',
   padding: theme.spacing(3),
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.23)',
   marginTop: '1rem',
   marginBottom: '1rem',
   width: '80%',
   '@media (max-width: 680px)': {
      width: '100%',
      padding: theme.spacing(2),
   },
}));

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

const BusinessDetails = ({ defaultValue, setEditTrue, setIsEdit, isEdit }) => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors, dirtyFields },
   } = useForm({ defaultValues: defaultValue });

   console.log(defaultValue)


   const [watchGst, pinCode] = watch(['gstin', 'pincode']);
   const [debouncedPinCode] = useDebounce(pinCode, 1000);
   const dispatch = useDispatch();
   const { profileData } = useSelector((state) => state.profile);
   const {
      verifyGst,
      gstVerifying,
      gstVerified,
      gstError,
      setGstError,
      setGstVerified,
   } = useVerifyGst();

   console.log(errors);

   useEffect(() => {
      console.log({ watchGst });
      if (watchGst && dirtyFields.gstin) {
         setGstVerified(false);
         setGstError('Click on verify to verify your GST');
      } else {
         if (watchGst) {
            setGstVerified(true);
            setGstError('');
         }
      }
   }, [watchGst, setGstError, setGstVerified, dirtyFields.gstin]);

   useEffect(() => {
      if (!debouncedPinCode) return;
      if (debouncedPinCode.length !== 6) return;
      axiAuth
         .get(`/api/pin-code/search?pin_code=${debouncedPinCode}`)
         .then(({ data }) => {
            setValue('state', data.pin_code.state);
            setValue('city', data.pin_code.district);
         })
         .catch((e) => {
            console.log(e);
            toast.error('Invalid pincode!!');
         });
   }, [debouncedPinCode, setValue]);

   const [file, setFile] = useState(null);
   const [logo, setLogo] = useState(defaultValue.photo);
   const [fileSizeError, setFileSizeError] = useState('');
   const [fileUploadDone, setFIleUploadDone] = useState(false);

   const [percentage, setPercentage] = useState(0);
   const [previewImage, setPreviewImage] = useState(defaultValue.photo);
   const [logoError, setLogoError] = useState('');

   const uploadHandler = async (e) => {
      const file = e.target.files[0];
      setFile(file);

      console.log(file);

      setFileSizeError('');
      setFIleUploadDone(false);
      setLogoError('');

      if (file?.type !== 'image/png' && file?.type !== 'image/jpeg') {
         setFileSizeError('File type must be PNG or JPEG');
         return;
      }
      if (file?.size > 5242880) {
         setFileSizeError('File size should be less than 5MB');
         return;
      }

      let data = new FormData();
      data.append('file', file);

      const response = await axiAuth.post('api/upload', data, {
         onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setPercentage(percentage);
            console.log({ loaded, total, percentage });
            if (percentage === 100) {
               console.log(file);
               const reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onloadend = () => {
                  setPreviewImage(reader.result);
               };
               setFIleUploadDone(true);
               setPercentage(0);
            }
         },
      });
      console.log(response.data.file_url, '>>>>>>>>>>>>>>>>>>>>>>>>>>');
      setLogo(response.data.file_url);
   };

   const profileCancelHandler = () => {
      setFileSizeError('');
      setPercentage(0);
      setFIleUploadDone(false);
      setPreviewImage('');
      setFile(null);
   };

   console.log({ logo });

   const submitBusiness = (data) => {
      dispatch(loadingStart());

      // if (!gstVerified) {
      //   setGstError("Please verify your GST");
      //   toast.error("Please verify your GST");
      //   dispatch(loadingEnd());
      //   return;
      // } else if (!watch("phone").match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
      //   toast.error("Invalid mobile no.!");
      //   dispatch(loadingEnd());
      //   return;
      // }
      if (!logo) {
         // if logo is not uploaded
         setLogoError('Please upload logo');
         toast.warn('Please upload logo');
         return;
      }

      const businessDetails = { ...data, photo: logo };

      axiAuth
         .post(`/api/profile/business`, businessDetails)
         .then(({ data }) => {
            dispatch(loadingEnd());
            if (data.message === 'Updated') {
               dispatch(
                  setProfileData({
                     ...profileData,
                     business: { ...profileData?.business, ...businessDetails },
                  })
               );
               toast.success('Business profile successfully updated!');
               setIsEdit({ ...isEdit, businessEdit: false });
            }
         })
         .catch((e) => {
            console.log(e);
            dispatch(loadingEnd());
            toast.error('Something went wrong!!');
         });
   };

   console.log(gstVerified);

   return (
      <Fragment>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'center',
            }}
         >
            <EditProfileBox
               component='form'
               onSubmit={handleSubmit(submitBusiness)}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     mb: 2,
                  }}
               >
                  <Typography
                     variant='h5'
                     fontWeight={600}
                     textAlign='center'
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                     }}
                  >
                     {defaultValue.company_name && (
                        <ArrowBackIcon
                           sx={{
                              fontSize: '30px',
                              fontWeight: 'bold',

                              mr: 2,
                              color: '#000000',
                              cursor: 'pointer',
                              ml: '-5px',
                           }}
                           onClick={() => setEditTrue('business')}
                        />
                     )}
                     <img
                        src={BusinessDetail}
                        width='30'
                        alt='business details img'
                        style={{
                           marginRight: '10px',
                        }}
                     />{' '}
                     Business details
                  </Typography>
                  <YellowButton
                     variant='contained'
                     color='primary'
                     // style={{
                     //   padding: "0.6rem 2.8rem",
                     // }}
                     type='submit'
                     //  onClick={submitBusiness}
                  >
                     Save
                  </YellowButton>
               </Box>

               <Box>
                  {/* ====== Profile image uploader ====== */}
                  <label htmlFor='uploadProfilePic'>
                     <input
                        type='file'
                        id='uploadProfilePic'
                        style={{
                           display: 'none',
                           width: '100%',
                           height: 0,
                        }}
                        onChange={uploadHandler}
                     />

                     <UploadBox>
                        <ProductDetailList
                           list='Add Photo'
                           description='(Max size 5MB .jpg or .jpeg format)'
                           home={true}
                        />
                        <DottedBox
                           sx={{
                              border: `${
                                 previewImage
                                    ? ''
                                    : '2px dashed rgba(0,0,0,0.6)'
                              }`,
                           }}
                        >
                           <Avatar
                              sx={{
                                 width: '130px',
                                 height: '130px',
                              }}
                              alt='logo'
                              src={
                                 previewImage
                                    ? previewImage
                                    : 'https://i.ibb.co/M23FX1T/upload-Plus.png'
                              }
                           />
                        </DottedBox>
                     </UploadBox>
                     {logoError ? (
                        <Typography
                           variant='body2'
                           color='error'
                           sx={{ mt: 1 }}
                        >
                           {logoError}
                        </Typography>
                     ) : (
                        <Typography
                           variant='body2'
                           color='error'
                           sx={{ mt: 1 }}
                        >
                           {` `}
                        </Typography>
                     )}
                  </label>

                  {(file || previewImage) && (
                     <Box
                        sx={{
                           width: '100%',
                           // maxWidth: '410px',
                           background: '#d0d7d9',
                           p: 2,
                           borderRadius: 2,
                           ml: '5px',
                        }}
                     >
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '98%',
                           }}
                        >
                           <Box>
                              <PhotographIcon style={{ width: 20 }} />
                              <Typography
                                 variant='body2'
                                 component='a'
                                 sx={{ ml: 1 }}
                              >
                                 {file && file.name.slice(0, 25)}
                              </Typography>
                           </Box>
                           {(fileUploadDone || previewImage) ? (
                              <Box>
                                 <CheckIcon
                                    style={{
                                       width: 30,
                                       color: 'green',
                                    }}
                                 />
                                 <XIcon
                                    style={{
                                       width: 20,
                                       cursor: 'pointer',
                                    }}
                                    onClick={profileCancelHandler}
                                 />
                              </Box>
                           ) : (
                              <XIcon
                                 style={{
                                    width: 20,
                                    cursor: 'pointer',
                                 }}
                                 onClick={profileCancelHandler}
                              />
                           )}
                        </Box>
                        {fileSizeError ? (
                           <>
                              <Typography sx={{ color: 'red' }}>
                                 {fileSizeError} Try Another!
                              </Typography>
                           </>
                        ) : (
                           !fileUploadDone && (
                              <LinearProgressWithLabel
                                 variant='determinate'
                                 value={percentage}
                              />
                           )
                        )}
                     </Box>
                  )}
               </Box>

               <Box
                  sx={{
                     display: 'flex',
                     my: 1,
                     flexDirection: { md: 'row', xs: 'column' },
                  }}
               >
                  <SolrufTextField
                     label='Company Name'
                     sx={{
                        '& .MuiOutlinedInput-root': {
                           background: '#ffffff',
                        },
                        mr: 1,
                     }}
                     {...register('company_name', {
                        required: {
                           value: true,
                           message: 'Company Name is required',
                        },
                     })}
                     error={errors.company_name ? true : false}
                     helperText={
                        errors.company_name && errors.company_name.message
                     }
                  />

                  <SolrufTextField
                     type='number'
                     {...register('phone', {
                        required: {
                           value: true,
                           message: 'Phone no. is Required',
                           minLength: {
                              value: 10,
                              message:
                                 'Number must be at least 10 characters long',
                           },
                           maxLength: {
                              value: 10,
                              message:
                                 'Number must be at most 10 characters long',
                           },
                        },
                     })}
                     error={errors.phone ? true : false}
                     helperText={errors.phone && errors.phone.message}
                     label='Phone Number'
                     sx={{
                        background: '#ffffff',
                        mt: { md: 'auto', xs: '10px' },
                     }}
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
                     sx={{
                        '& .MuiOutlinedInput-root': {
                           background: '#ffffff',
                        },
                     }}
                     label='GST No'
                     {...register('gstin', {
                        required: {
                           value: true,
                           message: 'GST number is Required',
                        },
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
                           color: gstVerified ? 'green' : 'rgba(0,0,0,0.8)',
                           textTransform: 'none',
                           mt: errors.gstin || gstError ? -2.8 : 0,
                        }}
                        variant='contained'
                        onClick={() => verifyGst(watchGst)}
                        endIcon={
                           gstVerified && <DoneIcon sx={{ color: 'green' }} />
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
               {/* </Box> */}

               <Box
                  sx={{
                     display: 'flex',
                     my: 1,
                     flexDirection: { md: 'row', xs: 'column' },
                  }}
               >
                  <SolrufTextField
                     label='Pin code'
                     sx={{ background: '#ffffff', mr: 1 }}
                     type='number'
                     {...register('pincode', {
                        required: {
                           value: true,
                           message: 'Pin Code is Required',
                        },
                        minLength: {
                           value: 6,
                           message: 'Pin Code must be 6 digits',
                        },
                     })}
                     error={errors.pincode}
                     helperText={errors.pincode ? errors.pincode.message : ''}
                  />
                  <SolrufTextField
                     label='State'
                     type='text'
                     sx={{
                        background: '#ffffff',
                        marginTop: { md: 'auto', xs: '10px' },
                     }}
                     {...register('state', {
                        required: {
                           value: true,
                           message: 'State is Required',
                        },
                     })}
                     error={errors.state}
                     helperText={errors.state ? errors.state.message : ''}
                  />
               </Box>

               <SolrufTextField
                  label='City/District/Town'
                  type='text'
                  sx={{ background: '#ffffff', my: 1 }}
                  {...register('city', {
                     required: {
                        value: true,
                        message: 'City/District/Town is required',
                     },
                  })}
                  error={errors.city}
                  helperText={errors.city ? errors.city.message : ''}
               />

               <CustomTextArea
                  placeholder='Address'
                  style={{ marginTop: 5, background: '#ffffff' }}
                  {...register('address', {
                     required: {
                        value: true,
                        message: 'Address is required',
                     },
                  })}
               />
               <CustomErrorText errorMessage={errors.address?.message} />
            </EditProfileBox>
         </Box>
      </Fragment>
   );
};

export default BusinessDetails;
