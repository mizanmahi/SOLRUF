import React, { useCallback, useEffect, useState } from 'react';
import {
   Avatar,
   Button,
   Grid,
   MenuItem,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import { Box } from '@mui/system';
import { Box } from '@mui/system';
import Select from 'react-select';
import { XIcon, PhotographIcon, CheckIcon } from '@heroicons/react/outline';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import SolrufTextField from '../../components/TextField/TextField';
import './myPortfolio.css';
import ProductDetailList from '../../components/ProductDetailList/ProductDetailList';
import LinearProgressWithLabel from '../../components/ProgressWithLabel/ProgressWithLabel';
import { useDropzone } from 'react-dropzone';
import SingleFIleUploadWithProgress from './SingleFIleUploadWithProgress';
import { useRef } from 'react';
import UploadError from './UploadError';
import YellowButton from '../../components/YellowButton/YellowButton';
import { useForm } from 'react-hook-form';
import { axiAuth, nodeURL } from '../../utils/axiosInstance';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CustomAccordion from '../../components/CustomAccordion/CustomAccordion';
import QuantityController from '../../components/QuantityController/QuantityController';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatePortfolio } from '../../redux/slices/portfolio.slice';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import useVerifyGst from '../../hooks/useVerifyGst';
import Loader from '../../components/Loader/Loader';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from 'react-toastify';
import useSolrufPinCode from '../../hooks/useSolrufPinCode';
import BackdropLoader from '../../components/Custom/BackdropLoader/BackdropLoader';
import { ExtraBox, ServiceChip } from './updatePortfolio.style';
import {
   autoGenerativeContent,
   autoGenerativeContentForPortfolioPolicy,
} from '../../utils/constant';
import SolrufSwitch from '../../components/Custom/SolrufSwitch/SolrufSwitch';

const FormBox = styled(Box)(({ theme }) => {
   return {
      // background: '#fff',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.0)',
   };
});

export const UploadBox = styled(Box)(({ theme }) => {
   return {
      border: '2px solid #FFD05B',
      minHeight: 250,
      width: '100%',
      background: '#F3F3F3',
      borderRadius: 20,
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   };
});

export const DottedBox = styled(Box)(({ theme }) => {
   return {
      width: '80%',
      height: '80%',
      margin: '0 auto',
      padding: theme.spacing(2),
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   };
});

const Textarea = styled('textarea')(({ theme }) => {
   return {
      width: '100%',
      margin: '.6rem 0 0rem 0',
      border: '2px solid #FFD05B',
      background: '#F3F3F3',
      borderRadius: '10px',
      outline: 'none',
      padding: '0.8rem',
      paddingBottom: '1.5rem',

      fontFamily: theme.typography.fontFamily,
   };
});

const TurnOverBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      margin: '0 auto',
      border: '2px solid #FFD05B',
      borderRadius: '5px',
      outline: 'none',
      fontFamily: theme.typography.fontFamily,
      height: '39px',
      overflow: 'hidden',
      '& input': {
         border: 'none',
         width: '80%',
         height: '100%',
         padding: '1rem',
         background: '#F3F3F3',
         '&:focus': {
            outline: 'none',
         },
      },
      '& select': {
         border: 'none',
         outline: 'outline',
         width: '20%',
         borderRight: '5px solid #FFD05B',
         height: '100%',
         textAlign: 'center',
         background: '#ffd05b',
         '&:focus': {
            outline: 'none',
         },
         '& option': {
            background: '#ffd05b',
            color: '#ffffff',
         },
      },
   };
});

const CertificateBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      padding: '1rem',
      background: theme.palette.secondary.light,
      // marginTop: '8px',
      borderRadius: '10px',
   };
});

const CertificateNameBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      margin: '0rem auto',
      border: '3px solid #FFD05B',
      borderRadius: '5px',
      outline: 'none',
      fontFamily: theme.typography.fontFamily,
      height: '39px',
      overflow: 'hidden',
      display: 'flex',
      '& input': {
         border: 'none',
         width: '80%',
         height: '100%',
         padding: '1rem',
         '&:focus': {
            outline: 'none',
         },
      },
      '& input[type=file]': {
         display: 'none',
      },
   };
});

const SolrufTextFieldGray = styled(SolrufTextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      background: '#f3f3f3',
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));

//? styles for react select
const customStyles = {
   control: (provided) => ({
      ...provided,
      border: 0,
      // This line disable the blue border
      backgroundColor: '#F3F3F3',
      height: '39px',
      boxShadow: 'none',
      fontFamily: 'roboto',
      color: '#676060',
   }),
   option: (provided, state) => ({
      padding: 10,
      background: state.isFocused ? '#ffd05b' : '#fff',
      zIndex: '100000',
      color: '#000000',
      fontWeight: 'bold',
      fontFamily: 'inherit',
   }),
   menu: (provided, state) => ({
      ...provided,
      zIndex: '100000',
      position: 'absolute',
   }),
};

const VerifyButton = styled(Button)(({ theme }) => ({
   height: '42px !important',
   marginBottom: '16px',
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
   '@media (max-width: 600px)': {
      marginBottom: '0px',
   },
}));

const MyPortfolio = ({ createPortfolio, backToPortfolioHandler }) => {
   // const [selectedCountry, setSelectedCountry] = useState("State");
   const [selectedService, setSelectedServices] = useState([]);
   const [services, setServices] = useState([]);

   const [portfolioSubmitting, setPortfolioSubmitting] = useState(false);

   const statesOfIndia = useSelector((state) => state.utils.statesOfIndia);

   const [file, setFile] = useState(null);
   const [logo, setLogo] = useState('');
   const [fileSizeError, setFileSizeError] = useState('');
   const [fileUploadDone, setFIleUploadDone] = useState(false);

   const [percentage, setPercentage] = useState(0);
   const [previewImage, setPreviewImage] = useState('');

   const [projectNumber, setProjectNumber] = useState(1);

   const [solarSubsidyOn, setSolarSubsidyOn] = useState(false);

   const handleSolarSubsidyChange = () => {
      setSolarSubsidyOn(!solarSubsidyOn);
   };

   console.log({ logo });
   // fetching services from backend
   useEffect(() => {
      axiAuth
         .get('api/services')
         .then(({ data }) => {
            console.log(data);
            setServices(
               data.services.map((service) => ({
                  value: service.service_id,
                  label: service.service_name,
               }))
            );
         })
         .catch((err) => {
            console.log('Error fetching services');
         });
   }, []);

   const handleServices = (serviceSelected) => {
      setServiceError('');
      if (selectedService.includes(serviceSelected.label)) {
         setSelectedServices([...selectedService]);
      } else {
         setSelectedServices((selectedService) => [
            ...selectedService,
            serviceSelected.label,
         ]);
      }

      console.log(`Option selected:`, selectedService);
   };

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
      if (file?.size > 2000000) {
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
      setLogo(response.data.file_url);
   };


   const profileCancelHandler = () => {
      setFileSizeError('');
      setPercentage(0);
      setFIleUploadDone(false);
      setPreviewImage('');
      setFile(null);
   };

   const [certificateFiles, setCertificateFiles] = useState([]);
   const [certificateNameError, setCertificateNameError] = useState('');

   const nameRef = useRef(null);

   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (nameRef.current.value.trim().length === 0) {
         nameRef.current.focus();
         setCertificateNameError('Please enter Certificate name');
         return;
      }
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         setCertificateNameError('');
         file.givenName = nameRef.current.value;
         return {
            file,
            errors: [],
         };
      });
      setCertificateFiles((cur) => [
         ...cur,
         ...mappedAcceptedFiles,
         ...rejectedFiles,
      ]);
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 5000000,
   });

   const onFileUpload = (url, file) => {
      setCertificateFiles((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url };
            }
            return fw;
         })
      );
   };

   const deleteHandler = (file) => {
      setCertificateFiles((cur) => cur.filter((fw) => fw.file !== file));
   };

   const chipDeleteHandler = (chip) => {
      setSelectedServices(
         selectedService.filter((service) => service !== chip)
      );
   };

   const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: {
         description: autoGenerativeContent,
         return_policy: autoGenerativeContentForPortfolioPolicy,
      },
   });

   const dispatch = useDispatch();

   const [serviceError, setServiceError] = useState('');
   const [logoError, setLogoError] = useState('');

   const [watchPinCode, watchGst] = watch(['pincode', 'gst']);

   const [debouncedPinCode] = useDebounce(watchPinCode, 1000);
   const [indiaState, setIndiaState] = useState('');

   const {
      verifyGst,
      gstVerifying,
      gstVerified,
      gstError,
      setGstError,
      setGstVerified,
   } = useVerifyGst();

   useEffect(() => {
      if (!gstVerified) {
         setGstVerified(false);
         setGstError('Click on verify to verify your GST');
      }
   }, [watchGst, gstVerified, setGstVerified, setGstError]);


   const submitHandler = async (profileData) => {
      console.log('Submitting');
      const certificates = certificateFiles
         .filter((file) => file?.errors?.length === 0)
         .map((certificate) => certificate.url);

      const file_names = certificateFiles
         .filter((file) => file?.errors?.length === 0)
         .map((certificate) => certificate.file.givenName);

      if (selectedService.length === 0) {
         // check if any service is selected
         setServiceError('Please select at-least one service');
         toast.warn('Please select at-least one service');
         return;
      }



      if (!logo) {
         // if logo is not uploaded
         setLogoError('Please upload logo');
         toast.warn('Please upload logo');
         return;
      }

      if (!gstVerified) {
         setGstError('Please verify your GST');
         toast.warn('Please verify your GST');
         return;
      }

      const services = selectedService;
      const total_projects = +projectNumber;

      const formData = {
         ...profileData,

         services,
         certificates,
         file_names,
         total_projects,
         logo,
         state: indiaState,
         solar_subsidy: solarSubsidyOn
      };

      

      try {
         // const { data } = await axiAuth.post('api/vendor/profile', formData);
         setPortfolioSubmitting(true);
         // Add watermark in logo
         const { status } = await axios.post(`${nodeURL}add_watermark`, {
            ...formData,
            token: localStorage.getItem('token'),
         });
         if (status === 200) {
            reset();
            setPortfolioSubmitting(false);
            setCertificateFiles([]);
            // setSelectedCountry("State");
            setSelectedServices([]);
            nameRef.current.value = '';
            setPreviewImage('');
            setFile(null);

            dispatch(setCreatePortfolio(false));
         }
      } catch (error) {
         console.log('error occurred');
         setPortfolioSubmitting(false);

         console.log(error.message);
      }
   };

   console.log('errors', errors);

   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const handleStateChange = (e) => {
      console.log(e.target.value);
      setIndiaState(e.target.value);
   };

   const { indiaState: stateByPin, district } =
      useSolrufPinCode(debouncedPinCode);
   console.log({ stateByPin, district });

   useEffect(() => {
      if (stateByPin && district) {
         console.log(stateByPin, district);
         setValue('city', district);
         setIndiaState(stateByPin);
      }
   }, [stateByPin, district, setValue]);

   if (portfolioSubmitting) {
      return <BackdropLoader />;
   }
   console.log(gstVerified)

   return (
      <Box sx={{ px: [0] }}>
         <FormBox
            sx={{ p: [1, 3, 5], background: ['transparent', '#fff'] }}
            component='form'
            onSubmit={handleSubmit(submitHandler)}
            matches={matches}
         >
            {!matches ? (
               <>
                  <Grid container spacing={2} alignItems='center'>
                     <Grid item md={6}>
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

                        {file && (
                           <Box
                              sx={{
                                 width: '100%',
                                 maxWidth: '410px',
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
                                 {fileUploadDone ? (
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
                     </Grid>
                     <Grid item md={6}>
                        <SolrufTextFieldGray
                           label='Company Name'
                           size='small'
                           {...register('name', {
                              required: {
                                 value: true,
                                 message: 'Name is required',
                              },
                           })}
                           error={errors.name}
                           helperText={errors.name ? errors.name.message : ' '}
                        />
                        <SolrufTextFieldGray
                           sx={{ my: 1 }}
                           size='small'
                           label='Phone Number'
                           type='number'
                           {...register('mobile', {
                              required: {
                                 value: true,
                                 message: 'Number is required',
                              },
                           })}
                           error={errors.mobile}
                           helperText={
                              errors.mobile ? errors.mobile.message : ' '
                           }
                        />
                        <SolrufTextFieldGray
                           size='small'
                           label='Email'
                           {...register('email', {
                              required: {
                                 value: true,
                                 message: 'User Email is Required',
                              },
                              pattern: {
                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                 message: 'Invalid email address',
                              },
                           })}
                           error={errors.email}
                           helperText={
                              errors.email ? errors.email.message : ' '
                           }
                        />

                        {/* gst for desktop */}

                        <Box
                           sx={{
                              my: 0.9,
                              display: 'flex',
                              alignItems: 'center',
                              position: 'relative',
                           }}
                        >
                           <SolrufTextFieldGray
                              size='small'
                              label='GST No'
                              // sx={{ mb: 2.7 }}
                              {...register('gst', {
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
                                    message:
                                       'GST number must be 15 digits only',
                                 },
                              })}
                              error={errors.gst || gstError}
                              helperText={
                                 errors.gst
                                    ? errors.gst.message
                                    : gstError
                                    ? gstError
                                    : ' '
                              }
                           />
                           {gstVerifying ? (
                              <Loader
                                 styles={{
                                    marginTop: '-0.5rem',
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
                                    mt: errors.gstin || gstError ? 0 : 0,
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
                              {gstVerified && !errors.gst ? gstVerified : ''}
                           </Typography>
                        </Box>

                        <SolrufTextFieldGray
                           size='small'
                           iconText={<InsertLinkIcon />}
                           label='Video Intro'
                           style={{ marginBottom: '1rem' }}
                           {...register('video_url', {
                              // required: {
                              //    value: true,
                              //    message: 'Video is Required',
                              // },
                           })}
                           error={errors.video_url}
                           helperText={
                              errors.video_url ? errors.video_url.message : ' '
                           }
                        />
                     </Grid>
                  </Grid>

                  <Textarea
                     rows='4'
                     placeholder='Description'
                     // value={'sdfsfdsf'}
                     {...register('description', {
                        required: {
                           value: true,
                           message: 'Description is Required',
                        },
                        minLength: {
                           value: 10,
                           message:
                              'Description must be at least 10 characters',
                        },
                     })}
                  ></Textarea>
                  {errors.description ? (
                     <Typography variant='body2' color='error' sx={{ mb: 2 }}>
                        {errors.description.message}
                     </Typography>
                  ) : (
                     <Typography variant='body2' color='error' sx={{ mb: 2 }}>
                        {` `}
                     </Typography>
                  )}

                  <Grid container columnSpacing={3} rowSpacing={1}>
                     <Grid item sm={12} md={4}>
                        <SolrufTextFieldGray
                           size='small'
                           label='Pin Code'
                           type='number'
                           // value={pinCode}
                           {...register('pincode', {
                              required: {
                                 value: true,
                                 message: 'Pin code is Required',
                              },
                              minLength: {
                                 value: 6,
                                 message:
                                    'Pin code must be at least 6 characters',
                              },
                              maxLength: {
                                 value: 6,
                                 message:
                                    'Pin code must be at most 6 characters',
                              },
                           })}
                           error={errors.pincode}
                           helperText={
                              errors.pincode ? errors.pincode.message : ' '
                           }
                        />
                     </Grid>
                     <Grid item sm={12} md={4}>
                        <SolrufTextFieldGray
                           select
                           size='small'
                           label='State'
                           value={indiaState}
                           onChange={handleStateChange}
                        >
                           {statesOfIndia.map((state) => (
                              <MenuItem value={state}>{state}</MenuItem>
                           ))}
                        </SolrufTextFieldGray>
                     </Grid>
                     <Grid item sm={12} md={4}>
                        <SolrufTextFieldGray
                           size='small'
                           label='City / District'
                           InputLabelProps={{ shrink: true }}
                           {...register('city', {
                              required: {
                                 value: true,
                                 message: 'City is Required',
                              },
                           })}
                           error={errors.city}
                           helperText={errors.city ? errors.city.message : ' '}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <SolrufTextFieldGray
                           size='small'
                           label='Location'
                           {...register('location', {
                              required: {
                                 value: true,
                                 message: 'User Email is Required',
                              },
                           })}
                           error={errors.location}
                           helperText={
                              errors.location ? errors.location.message : ' '
                           }
                        />
                     </Grid>

                     <Grid item sm={12}>
                        <Flex
                           sx={{
                              mb: 3,
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                           }}
                        >
                           {/* ====== Total projects box ====== */}
                           <Typography
                              variant='body1'
                              component='p'
                              sx={{ mr: 1, flex: '0 0 200px' }}
                           >
                              Total Projects
                           </Typography>
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 flex: '0 0 200px',
                              }}
                           >
                              <Box
                                 sx={{
                                    border: '2px solid #ffd05b',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'stretch',
                                    '& input:focus': {
                                       outline: 'none',
                                       color: '#000000',
                                       fontWeight: 'bold',
                                       fontFamily: 'inherit',
                                    },
                                 }}
                              >
                                 <PlusIcon
                                    style={{
                                       width: 30,
                                       background: '#ffd05b',
                                       padding: '.3rem',
                                    }}
                                    onClick={() => {
                                       setProjectNumber((prev) => +prev + 1);
                                    }}
                                 />
                                 <input
                                    type='text'
                                    style={{
                                       width: '50px',
                                       textAlign: 'center',
                                       border: 'none',
                                       color: '#000000',
                                       fontWeight: 'bold',
                                       fontFamily: 'inherit',
                                    }}
                                    value={projectNumber}
                                    onChange={(e) =>
                                       setProjectNumber(e.target.value)
                                    }
                                 />
                                 <MinusIcon
                                    style={{
                                       width: 30,
                                       background: '#ffd05b',
                                       padding: '.3rem',
                                    }}
                                    onClick={() =>
                                       setProjectNumber((projectNumber) => {
                                          if (projectNumber > 1) {
                                             return projectNumber - 1;
                                          } else {
                                             return projectNumber;
                                          }
                                       })
                                    }
                                 />
                              </Box>
                           </Box>
                           <Box sx={{ width: '100%' }}>
                              <TurnOverBox>
                                 <input
                                    type='number'
                                    placeholder='Turnover'
                                    {...register('turnover', {
                                       required: {
                                          value: true,
                                          message: 'TurnOver is Required',
                                       },
                                    })}
                                    name='turnover'
                                 />

                                 <select
                                    name='turnoverType'
                                    {...register('turnover_type', {
                                       required: {
                                          value: true,
                                          message: 'Turnover Type is Required',
                                       },
                                    })}
                                 >
                                    <option value='lakhs'>Lakhs</option>
                                    <option value='crore'>Crore</option>
                                 </select>
                              </TurnOverBox>
                              {errors.turnover ? (
                                 <Typography
                                    variant='body2'
                                    color='error'
                                    sx={{ mb: 0.5 }}
                                 >
                                    {errors.turnover.message}
                                 </Typography>
                              ) : (
                                 <Typography
                                    variant='body2'
                                    color='error'
                                    sx={{ mb: 0.5 }}
                                 >
                                    {` `}
                                 </Typography>
                              )}
                           </Box>
                        </Flex>
                     </Grid>
                  </Grid>

                  <Select
                     // value={selectedService}
                     onChange={handleServices}
                     options={services}
                     placeholder='Search Services'
                     className='react-select-container'
                     styles={customStyles}
                  />
                  {serviceError ? (
                     <Typography variant='body2' color='error' sx={{ mb: 1 }}>
                        {serviceError}
                     </Typography>
                  ) : (
                     <Typography variant='body2' color='error' sx={{ mb: 1 }}>
                        {`  `}
                     </Typography>
                  )}

                

                  <Box sx={{ my: 2 }}>
                     {selectedService.map((item, index) => {
                        return (
                           <ServiceChip
                              label={item}
                              key={index}
                              onDelete={() => chipDeleteHandler(item)}
                           />
                        );
                     })}
                  </Box>
                  <Textarea
                     rows='4'
                     placeholder='After sale service policy'
                     {...register('return_policy', {
                        required: {
                           value: true,
                           message: 'Policy is Required',
                        },
                        minLength: {
                           value: 10,
                           message: 'Policy must be at least 10 characters',
                        },
                     })}
                  ></Textarea>
                  {errors.return_policy ? (
                     <Typography
                        variant='body2'
                        color='error'
                        sx={{ height: '1.7rem' }}
                     >
                        {errors.return_policy.message}
                     </Typography>
                  ) : (
                     <Typography
                        variant='body2'
                        color='error'
                        sx={{ height: '1.7rem' }}
                     >
                        {` `}
                     </Typography>
                  )}

                  <CertificateBox>
                     <Typography variant='h6' sx={{ color: '#000000' }}>
                        Add Certificates (Upto 5Mb)
                     </Typography>
                     <CertificateNameBox>
                        <input
                           type='text'
                           placeholder='Certificate Name'
                           ref={nameRef}
                        />

                        <label
                           htmlFor='serviceFile'
                           style={{
                              width: '20%',
                              height: '100%',
                              background: '#ffd05b',
                           }}
                           {...getRootProps()}
                        >
                           <input
                              {...getInputProps()}
                              multiple
                              // onChange={(e) => console.log(e.target.files)}
                           />
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 height: '100%',
                              }}
                           >
                              <PlusIcon style={{ width: 25 }} />{' '}
                              <Typography
                                 variant='body1'
                                 sx={{ ml: 2, color: '#000000' }}
                              >
                                 Add File
                              </Typography>
                           </Box>
                        </label>
                     </CertificateNameBox>
                     {certificateNameError && (
                        <Typography style={{ color: 'red' }}>
                           {certificateNameError}
                        </Typography>
                     )}

                     {/* ================================================ */}

                     {certificateFiles.map((fileWrapper, i) => {
                        return fileWrapper?.errors?.length ? (
                           <UploadError
                              file={fileWrapper.file}
                              errors={fileWrapper.errors}
                              onDelete={deleteHandler}
                           />
                        ) : (
                           <SingleFIleUploadWithProgress
                              key={i}
                              file={fileWrapper.file}
                              onDelete={deleteHandler}
                              onFileUpload={onFileUpload}
                           />
                        );
                     })}
                  </CertificateBox>

                    {/*  ========= solar subsidy for desktop  ========= */}
                    <ExtraBox sx={{
                    mt: 3,
                    width: '100%',
                    maxWidth: '300px',
                  }}>
                     <Flex sx={{ alignItems: 'center', py: 1 }}>
                        <Typography
                           sx={{
                              fontWeight: 600,
                              fontSize: '1rem',
                              color: '#000',
                              mr: 2.5,
                              ml: 2,
                           }}
                        >
                          Are you an empanelled member? & do you provide subsidy?
                        </Typography>
                        <SolrufSwitch
                           sx={{ py: 0.5 }}
                           checked={solarSubsidyOn}
                           onChange={handleSolarSubsidyChange}
                        />
                     </Flex>
                  </ExtraBox>

                  <YellowButton
                     style={{
                        marginLeft: 'auto',
                        marginTop: '2rem',
                        width: '100%',
                        maxWidth: '350px',
                        color: '#000000',
                     }}
                  >
                     Save
                  </YellowButton>

                  {/* =========================== mobile ui ===========================*/}
               </>
            ) : (
               <>
                  {/* ========= basic details for mobile ========= */}
                  <CustomAccordion
                     title='Basic Details'
                     noPadding={true}
                     sx={{ background: 'transparent' }}
                  >
                     <Grid item md={6} sx={{ pt: 6 }}>
                        <SolrufTextField
                           sx={{ background: '#ffffff' }}
                           size='small'
                           label='Name'
                           {...register('name', {
                              required: {
                                 value: true,
                                 message: 'Name is required',
                              },
                           })}
                        />
                        <SolrufTextField
                           size='small'
                           sx={{ my: 2, background: '#ffffff' }}
                           label='Phone Number'
                           {...register('mobile', {
                              required: {
                                 value: true,
                                 message: 'Number is required',
                              },
                           })}
                        />
                        <SolrufTextField
                           sx={{ background: '#ffffff' }}
                           size='small'
                           label='Email'
                           {...register('email', {
                              required: {
                                 value: true,
                                 message: 'User Email is Required',
                              },
                              pattern: {
                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                 message: 'Invalid email address',
                              },
                           })}
                        />

                        <Box>
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <SolrufTextField
                                 size='small'
                                 sx={{ mt: 1.5, mb: 1, background: '#ffffff' }}
                                 label='GST No'
                                 {...register('gst', {
                                    required: {
                                       value: true,
                                       message: 'GST number is Required',
                                    },
                                 })}
                              />
                              <VerifyButton
                                 disabled
                                 sx={{
                                    color: gstVerified
                                       ? 'green'
                                       : 'rgba(0,0,0,0.8)',
                                    textTransform: 'none',
                                    mt: errors.gstin || gstError ? 0 : 0,
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
                           </Box>
                           <Typography
                              sx={{
                                 fontSize: '0.7rem',
                                 color: 'green',
                                 left: '14px',
                              }}
                           >
                              {gstVerified && !errors.gst ? gstVerified : ''}
                           </Typography>
                        </Box>

                        <SolrufTextField
                           sx={{ background: '#ffffff' }}
                           size='small'
                           iconText={<InsertLinkIcon />}
                           label='Video Intro'
                           style={{ marginBottom: '1rem' }}
                           {...register('video_url', {
                              required: {
                                 value: true,
                                 message: 'Video is Required',
                              },
                           })}
                        />
                        <Textarea
                           rows='5'
                           placeholder='Description'
                           {...register('description', {
                              required: {
                                 value: true,
                                 message: 'Description is Required',
                              },
                              minLength: {
                                 value: 10,
                                 message:
                                    'Description must be at least 10 characters',
                              },
                           })}
                           style={{ marginTop: '0rem' }}
                        ></Textarea>
                        {/* ========= profile image uploader for mobile ========= */}
                        <label
                           htmlFor='uploadProfilePic'
                           style={{ width: '100%' }}
                        >
                           <input
                              type='file'
                              id='uploadProfilePic'
                              style={{ display: 'none' }}
                              onChange={uploadHandler}
                           />

                           <img
                              src='https://i.ibb.co/C23nQcK/Frame-165.png'
                              alt='upload profile'
                              style={{
                                 width: '100%',
                                 margin: '0 auto',
                                 display: 'block',
                                 position: 'absolute',
                                 top: '10px',
                              }}
                           />
                        </label>
                        {file && (
                           <Box
                              sx={{
                                 width: '100%',
                                 maxWidth: '410px',
                                 background: '#ffffff',
                                 p: 2,
                                 borderRadius: 2,
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
                                       {file && file.name}
                                    </Typography>
                                 </Box>
                                 {fileUploadDone ? (
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
                     </Grid>
                  </CustomAccordion>
                  {/* ========= company details for mobile ========= */}
                  <CustomAccordion
                     title='Company Details'
                     noPadding={true}
                     sx={{ background: 'transparent' }}
                  >
                     <Grid item md={6}>
                        <SolrufTextField
                           sx={{ background: '#ffffff' }}
                           size='small'
                           label='Pin Code'
                           type='number'
                           {...register('pincode', {
                              required: {
                                 value: true,
                                 message: 'Pin Code is Required',
                              },
                           })}
                        />
                        <SolrufTextField
                           sx={{ my: 2, background: '#ffffff' }}
                           size='small'
                           label='City / District'
                           {...register('city', {
                              required: {
                                 value: true,
                                 message: 'City / District is Required',
                              },
                           })}
                        />

                        <SolrufTextField
                           sx={{ background: '#ffffff', mb: 2 }}
                           size='small'
                           label='Location'
                           {...register('location', {
                              required: {
                                 value: true,
                                 message: 'User Email is Required',
                              },
                           })}
                        />

                        <TurnOverBox sx={{ mt: 2, height: '40px' }}>
                           <input
                              style={{ width: '60%' }}
                              type='number'
                              placeholder='Turnover'
                              {...register('turnover', {
                                 required: {
                                    value: true,
                                    message: 'TurnOver is Required',
                                 },
                              })}
                              name='turnover'
                              onChange={(event) => +event.target.value}
                           />

                           <select
                              style={{ width: '40%' }}
                              name='turnoverType'
                              {...register('turnover_type', {
                                 required: {
                                    value: true,
                                    message: 'Turnover Type is Required',
                                 },
                              })}
                           >
                              <option value='lakhs'>Lakhs</option>
                              <option value='crore'>Crore</option>
                           </select>
                        </TurnOverBox>
                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                           }}
                        >
                           <Typography>Total Projects</Typography>
                           <QuantityController
                              quantity={projectNumber}
                              setQuantity={setProjectNumber}
                              setQuantityError={(e) => {}}
                              quantityError={''}
                           />
                        </Box>

                        <Select
                           // value={selectedService}
                           onChange={handleServices}
                           options={services}
                           placeholder='Search Services'
                           className='react-select-container'
                           styles={customStyles}
                        />
                        {serviceError ? (
                           <Typography
                              variant='body2'
                              color='error'
                              sx={{ mb: 1 }}
                           >
                              {serviceError}
                           </Typography>
                        ) : (
                           <Typography
                              variant='body2'
                              color='error'
                              sx={{ mb: 1 }}
                           >
                              {`  `}
                           </Typography>
                        )}
                        <Box sx={{ my: 2 }}>
                           {selectedService.map((item, index) => {
                              return (
                                 <ServiceChip
                                    label={item}
                                    key={index}
                                    onDelete={() => chipDeleteHandler(item)}
                                 />
                              );
                           })}
                        </Box>

                        {/* solar subsidy switch for mobile */}

                        <ExtraBox>
                           <Flex sx={{ alignItems: 'center', py: 1 }}>
                              <Typography
                                 sx={{
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    color: '#000',
                                    mr: 2.5,
                                    ml: 2,
                                 }}
                              >
                                 Are you an empanelled member? & do you provide subsidy?
                              </Typography>
                              <SolrufSwitch
                                 sx={{ py: 0.5 }}
                                 checked={solarSubsidyOn}
                                 onChange={handleSolarSubsidyChange}
                              />
                           </Flex>
                        </ExtraBox>

                        <Textarea
                           rows='4'
                           placeholder='After sale service policy'
                           {...register('return_policy', {
                              required: {
                                 value: true,
                                 message: 'Policy is Required',
                              },
                              minLength: {
                                 value: 10,
                                 message:
                                    'Policy must be at least 10 characters',
                              },
                           })}
                        ></Textarea>
                        {errors.return_policy ? (
                           <Typography
                              variant='body2'
                              color='error'
                              sx={{ height: '1.7rem' }}
                           >
                              {errors.return_policy.message}
                           </Typography>
                        ) : (
                           <Typography
                              variant='body2'
                              color='error'
                              sx={{ height: '1.7rem' }}
                           >
                              {` `}
                           </Typography>
                        )}
                     </Grid>
                  </CustomAccordion>
                  <CustomAccordion
                     title='Certification'
                     noPadding={true}
                     sx={{ background: 'transparent', mb: 5 }}
                  >
                     <Grid item md={6}>
                        <CertificateBox>
                           <Typography variant='h6'>
                              Add Certificates (Upto 5Mb)
                           </Typography>
                           <CertificateNameBox>
                              <input
                                 style={{ width: '60%' }}
                                 type='text'
                                 placeholder='Certificate Name'
                                 ref={nameRef}
                              />

                              <label
                                 htmlFor='serviceFile'
                                 style={{
                                    width: '40%',
                                    height: '100%',
                                    background: '#ffd05b',
                                 }}
                                 {...getRootProps()}
                              >
                                 <input
                                    {...getInputProps()}
                                    multiple
                                    // onChange={(e) => console.log(e.target.files)}
                                 />
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       height: '100%',
                                    }}
                                 >
                                    <PlusIcon style={{ width: 25 }} />{' '}
                                    <Typography variant='body1' sx={{ ml: 2 }}>
                                       Add File
                                    </Typography>
                                 </Box>
                              </label>
                           </CertificateNameBox>
                           {certificateNameError && (
                              <Typography style={{ color: 'red' }}>
                                 {certificateNameError}
                              </Typography>
                           )}

                           {/* ================================================ */}

                           {certificateFiles.map((fileWrapper, i) => {
                              return fileWrapper?.errors?.length ? (
                                 <UploadError
                                    file={fileWrapper.file}
                                    errors={fileWrapper.errors}
                                    onDelete={deleteHandler}
                                 />
                              ) : (
                                 <SingleFIleUploadWithProgress
                                    key={i}
                                    file={fileWrapper.file}
                                    onDelete={deleteHandler}
                                    onFileUpload={onFileUpload}
                                 />
                              );
                           })}
                        </CertificateBox>
                     </Grid>
                  </CustomAccordion>

                  <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
                     <YellowButton
                        style={{
                           marginLeft: 'auto',
                           marginTop: '2rem',
                           width: '100%',
                        }}
                     >
                        Save
                     </YellowButton>
                  </Box>
                  <Box
                     sx={{
                        display: { sm: 'none', xs: 'block' },
                        width: '100%',
                        position: 'fixed',
                        zIndex: 10,
                        bottom: '0',
                        left: '0',
                     }}
                  >
                     <YellowButton
                        style={{
                           marginLeft: 'auto',
                           marginTop: '0rem',
                           width: '100%',
                        }}
                     >
                        Save
                     </YellowButton>
                  </Box>
               </>
            )}
         </FormBox>
      </Box>
   );
};

export default MyPortfolio;
