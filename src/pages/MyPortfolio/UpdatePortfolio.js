import React, { useCallback, useEffect, useState } from 'react';
import {
   Button,
   Chip,
   Container,
   Grid,
   MenuItem,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, fontFamily } from '@mui/system';
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
import { axiAuth } from '../../utils/axiosInstance';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { toast, ToastContainer } from 'react-toastify';
import CustomAccordion from '../../components/CustomAccordion/CustomAccordion';
import QuantityController from '../../components/QuantityController/QuantityController';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { setCreatePortfolio } from '../../redux/slices/portfolio.slice';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import useVerifyGst from '../../hooks/useVerifyGst';
import DoneIcon from '@mui/icons-material/Done';
import Loader from '../../components/Loader/Loader';
import CustomErrorText from '../../components/CustomErrorText/CustomErrorText';

const PageTitleBox = styled(Box)(({ theme }) => {
   return {
      padding: '1rem 0px',
      color: theme.palette.secondary.dark,
      background: theme.palette.secondary.light,
   };
});

const FormBox = styled(Box)(({ theme }) => {
   return {
      // background: '#fff',
      marginTop: theme.spacing(1),
      borderRadius: theme.spacing(2),
   };
});

const UploadBox = styled(Box)(({ theme }) => {
   return {
      border: '2px solid #FFD05B',
      minHeight: '270px',
      width: '100%',
      maxwidth: '400px',
      background: '#F3F3F3',
      borderRadius: 20,
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   };
});

const DottedBox = styled(Box)(({ theme }) => {
   return {
      width: '80%',
      height: '80%',
      margin: '0 auto',
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   };
});

const Textarea = styled('textarea')(({ theme }) => {
   return {
      width: '100%',
      margin: '0 auto',
      border: '2px solid #FFD05B',
      borderRadius: '10px',
      outline: 'none',
      padding: '1rem',
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
      height: '55px',
      // padding: '.2rem',
      overflow: 'hidden',
      '& input': {
         border: 'none',
         width: '80%',
         height: '100%',
         padding: '1rem',
      },
      '& select': {
         border: 'none',
         outline: 'outline',
         width: '20%',
         borderRight: '5px solid #FFD05B',
         height: '100%',
         textAlign: 'center',
         background: '#ffd05b',
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
      marginTop: '2rem',
      borderRadius: '10px',
   };
});

const CertificateNameBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      margin: '1rem auto',
      border: '3px solid #FFD05B',
      borderRadius: '5px',
      outline: 'none',
      fontFamily: theme.typography.fontFamily,
      height: '55px',
      overflow: 'hidden',
      display: 'flex',
      '& input': {
         border: 'none',
         width: '80%',
         height: '100%',
         padding: '1rem',
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

const BackToPortfolioButton = styled(Button)(({ theme }) => ({
   color: '#4D4D4D',
   padding: '0.5rem 0',
   '&:hover': {
      color: '#000000',
   },
   '&:hover svg': {
      transform: 'translateX(-2px)',
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'center',
}));

const VerifyButton = styled(Button)(({ theme }) => ({
   minWidth: 'fit-content',
   marginTop: '-1.5rem',
   marginLeft: theme.spacing(1),
   background: theme.palette.primary.main,
   color: '#000',
   boxShadow: 'none',
   '&:hover': {
      background: theme.palette.primary.main,
      boxShadow: 0.5,
   },
}));

//? styles for react select
const customStyles = {
   control: (provided) => ({
      ...provided,
      border: 0,
      // This line disable the blue border
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

//@ select options
const options = [
   { value: 'maharashtra', label: 'maharashtra' },
   { value: 'delhi', label: 'delhi' },
   { value: 'west bengal', label: 'west bengal' },
   { value: 'chennai', label: 'chennai' },
   { value: 'madhya pradesh', label: 'madhya pradesh' },
];

const statesOfIndia = [
   { state: 'Maharashtra', label: 'Maharashtra' },
   { state: 'Delhi', label: 'Delhi' },
   { state: 'West Bengal', label: 'West Bengal' },
   { state: 'Chennai', label: 'Chennai' },
   { state: 'Madhya Pradesh', label: 'Madhya Pradesh' },
];

// const services = [
//    { value: 'service#1', label: 'Service#1' },
//    { value: 'service#2', label: 'Service#2' },
//    { value: 'service#3', label: 'Service#3' },
//    { value: 'service#4', label: 'Service#4' },
// ];

const UpdatePortfolio = ({ portfolioData, portfolioOnUpdateHandler }) => {
   const {
      city,
      logo: logo_url,
      gst,
      pincode: pincodetoUpdate,
      state,
      total_projects,
      services: servicesToUpdate,
      certificates,
   } = portfolioData;

   console.log(portfolioData);

   const [prevCertificate, setPrevCertificate] = useState(certificates);

   const [services, setServices] = useState([]);

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

   const [selectedCountry, setSelectedCountry] = useState({
      value: state,
      label: state,
   });
   const [selectedService, setSelectedServices] = useState([
      ...servicesToUpdate.map((service) => service),
   ]);

   console.log(selectedService);

   const [file, setFile] = useState(null);
   const [logo, setLogo] = useState(logo_url);
   const [fileSizeError, setFileSizeError] = useState('');
   const [fileUploadDone, setFIleUploadDone] = useState(false);

   const [percentage, setPercentage] = useState(0);

   const [previewImage, setPreviewImage] = useState(logo_url);
   const [projectNumber, setProjectNumber] = useState(total_projects);

   const handleChange = (selectedCountry) => {
      setSelectedCountry(selectedCountry);
      console.log(`Option selected:`, selectedCountry);
   };

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
      setPercentage(0);
      setPreviewImage('');
      const file = e.target.files[0];
      setFile(file);

      setFileSizeError('');
      setFIleUploadDone(false);

      if (file?.size > 5242880) {
         setFileSizeError('File size should be less than 5MB');
         return;
      }

      let data = new FormData();
      data.append('file', file);

      if (file) {
         const response = await axiAuth.post('api/upload', data, {
            onUploadProgress: (progressEvent) => {
               const { loaded, total } = progressEvent;
               console.log(total);
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
         console.log(response);
         setLogo(response.data.file_url);
      }
   };

   const profileCancelHandler = (e) => {
      e.stopPropagation();
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
            error: [],
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

   const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: portfolioData,
   });

   const dispatch = useDispatch();
   const [totalProjectsError, setTotalProjectsError] = useState('');
   const [serviceError, setServiceError] = useState('');

   const submitHandler = async (profileData) => {
      const certificates = certificateFiles.map(
         (certificate) => certificate.url
      );

      const file_names = certificateFiles.map(
         (certificate) => certificate.file.givenName
      );
      const services = selectedService;
      const state = selectedCountry.value;
      const total_projects = +projectNumber;

      const formData = {
         ...profileData,
         state,
         services,
         certificates,
         file_names,
         total_projects,
         logo,
         city,
         pincode: pinCode,
      };

      if (!gstVerified) {
         setGstError('Please verify your GST');
         return;
      }

      if (parseFloat(projectNumber) === 0) {
         setTotalProjectsError('Add minimum 1 project');
         return;
      }

      if (selectedService.length === 0) {
         // check if any service is selected
         setServiceError('Please select at-least one service');
         return;
      }

      try {
         const { data } = await axiAuth.post('api/vendor/profile', formData);
         if (data.message === 'Updated successfully') {
            toast.success(data.message);
            reset();
            setCertificateFiles([]);
            setSelectedCountry('State');
            setSelectedServices([]);
            nameRef.current.value = '';
            setPreviewImage('');
            setFile(null);
            dispatch(setCreatePortfolio(false));
            portfolioOnUpdateHandler();
         }
      } catch (error) {
         console.log('error occurred');
         console.log(error.message);
      }
   };
   console.log('errors', errors);

   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const [watchGst, pinCode] = watch(['gst', 'pincode']);
   const [debouncedPinCode] = useDebounce(pinCode, 1000);
   // const [district, setDistrict] = useState(city);
   const [indiaState, setIndiaState] = useState(state);

   useEffect(() => {
      if (debouncedPinCode.length !== 6) return;
      const options = {
         method: 'POST',
         url: 'https://pincode.p.rapidapi.com/',
         headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'pincode.p.rapidapi.com',
            'x-rapidapi-key':
               '53d3e51015msh53a0f06a2fd9375p1c3484jsnd53c4f58cf42',
         },
         data: { searchBy: 'pincode', value: debouncedPinCode },
      };
      axios
         .request(options)
         .then(({ data }) => {
            console.log(data);
            setIndiaState(data[0].circle);
            console.log(data[0].circle);

            setValue('city', data[0].district);
            console.log(data);
         })
         .catch((error) => {
            console.log({ error });
         });
   }, [debouncedPinCode]);

   const chipDeleteHandler = (chip) => {
      setSelectedServices(
         selectedService.filter((service) => service !== chip)
      );
   };

   const handleStateChange = (e) => {
      console.log(e.target.value);
      setIndiaState(e.target.value);
   };

   const onCertificateDelete = async (id) => {
      const { data } = await axiAuth.delete(
         'api/vendor/projects/certificate/delete',
         {
            data: {
               certificate_id: id,
            },
         }
      );
      console.log(id);
      if (data.message === 'Certificate has been deleted') {
         alert(data.message);
         setPrevCertificate((prevCertificates) =>
            prevCertificates.filter(
               (prevCertificate) => prevCertificate.id !== id
            )
         );
      }
   };

   console.log(prevCertificate);

   // ** gst verification code

   const { verifyGst, gstVerifying, gstVerified, gstError, setGstError } =
      useVerifyGst();

   return (
      <Box
         sx={{
            bgcolor: '#f3f3f3',
            px: [0],
            pb: 1,
            borderRadius: '15px',
            overflow: 'hidden',
         }}
      >
         <ToastContainer />
         <PageTitleBox>
            <Container maxWidth='xl'>
               <Grid container columnSpacing={3} sx={{ alignItems: 'center' }}>
                  <Grid item xs={12} md={5} sx={{ m: 0 }}>
                     <Flex>
                        <ArrowBackIcon
                           sx={{
                              fontSize: '30px',
                              fontWeight: 'bold',
                              mr: 2,
                              color: '#000000',
                              cursor: 'pointer',
                              ml: '-5px',
                           }}
                           onClick={portfolioOnUpdateHandler}
                        />
                        <BackToPortfolioButton
                           sx={{ fontSize: '20px', color: '#000000' }}
                        >
                           Update Portfolio
                        </BackToPortfolioButton>
                     </Flex>
                  </Grid>
                  <Grid item xs={12} md={7}>
                     <Box sx={{ maxWidth: '400px', marginLeft: 'auto' }}>
                        {/* <Typography
                           sx={{ textAlign: 'right', fontWeight: 600 }}
                           gutterBottom
                             
                        >
                           Consumer Sharable Link
                        </Typography>
                        <CopyText title='http://google.com/profile/456' /> */}
                     </Box>
                  </Grid>
               </Grid>
            </Container>
         </PageTitleBox>
         <Container maxWidth='xl' sx={{ my: 2 }}>
            <Typography variant='h5' fontWeight={500} sx={{ my: 2 }}>
               Installer Info
            </Typography>

            <FormBox
               sx={{ p: [0, 3, 5], background: ['transparent', '#fff'] }}
               component='form'
               onSubmit={handleSubmit(submitHandler)}
               matches={matches}
            >
               {!matches ? (
                  <>
                     <Grid container spacing={3} alignItems='center'>
                        <Grid item md={6}>
                           {/* ====== Profile image uploader ====== */}
                           <label htmlFor='uploadProfilePic'>
                              <input
                                 type='file'
                                 id='uploadProfilePic'
                                 style={{ display: 'none' }}
                                 onChange={uploadHandler}
                              />
                              {/* <img src="https://i.ibb.co/g4KCfd5/Group-221.png" alt=""  style={{height: 300}}/> */}
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
                                    <img
                                       src={
                                          previewImage
                                             ? previewImage
                                             : 'https://i.ibb.co/M23FX1T/upload-Plus.png'
                                       }
                                       alt=''
                                       style={{
                                          width: '150px',
                                          height: '150px',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 </DottedBox>
                              </UploadBox>
                              {(file || previewImage) && (
                                 <Box
                                    sx={{
                                       width: '100%',
                                       maxWidth: '410px',
                                       // background: '#d0d7d9',
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
                                          <PhotographIcon
                                             style={{ width: 20 }}
                                          />
                                          <Typography
                                             variant='body2'
                                             component='a'
                                             sx={{ ml: 1 }}
                                          >
                                             {file && file.name}
                                          </Typography>
                                       </Box>
                                       {fileUploadDone || previewImage ? (
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
                                                onClick={(e) =>
                                                   profileCancelHandler(e)
                                                }
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
                                       !fileUploadDone &&
                                       !previewImage && (
                                          <LinearProgressWithLabel
                                             variant='determinate'
                                             value={percentage}
                                          />
                                       )
                                    )}
                                 </Box>
                              )}
                           </label>
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
                              helperText={
                                 errors.name ? errors.name.message : ' '
                              }
                           />
                           <SolrufTextFieldGray
                              sx={{ my: 1 }}
                              size='small'
                              label='Phone Number'
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

                           {/* Gst verifying */}
                           <Box
                              sx={{
                                 my: 1,
                                 display: 'flex',
                                 alignItems: 'center',
                                 position: 'relative',
                              }}
                           >
                              <SolrufTextFieldGray
                                 defaultValue={gst}
                                 size='small'
                                 label='GST No'
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
                                 required: {
                                    value: true,
                                    message: 'Video is Required',
                                 },
                              })}
                              error={errors.video_url}
                              helperText={
                                 errors.video_url
                                    ? errors.video_url.message
                                    : ' '
                              }
                           />
                        </Grid>
                     </Grid>

                     <Textarea
                        // defaultValue={description}
                        rows='4'
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
                     ></Textarea>
                     <CustomErrorText
                        errorMessage={errors?.description?.message}
                        sx={{ mt: -0.5, mb: 1 }}
                     />

                     <Grid container spacing={3}>
                        <Grid item sm={12} md={4}>
                           <SolrufTextFieldGray
                              size='small'
                              label='Pin Code'
                              type='number'
                              {...register('pincode', {
                                 required: {
                                    value: true,
                                    message: 'Pin Code is Required',
                                 },
                                 minLength: {
                                    value: 6,
                                    message: 'Pin Code must be 6 digits',
                                 }
                              })}
                              error={errors.pincode}
                              helperText={
                                 errors.pincode ? errors.pincode.message : ' '
                              }
                           />
                        </Grid>
                        <Grid item sm={12} md={4}>
                           <SolrufTextFieldGray
                              defaultValue={state}
                              select
                              size='small'
                              label='State'
                              value={indiaState}
                              onChange={handleStateChange}
                           >
                              {statesOfIndia.map(({ state, label }) => (
                                 <MenuItem value={state}>{label}</MenuItem>
                              ))}
                           </SolrufTextFieldGray>
                        </Grid>
                        <Grid item sm={12} md={4}>
                           <SolrufTextFieldGray
                              // value={district}
                              // onChange={(e) => setDistrict(e.target.value)}
                              size='small'
                              label='City / District'
                              {...register('city', {
                                 required: {
                                    value: true,
                                    message: 'District is Required',
                                 },
                              })}
                              error={errors.city}
                              helperText={
                                 errors.city ? errors.city.message : ' '
                              }
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
                              sx={{ mb: 2, justifyContent: 'space-between' }}
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
                                 <Box>
                                    <Box
                                       sx={{
                                          border: '2px solid #ffd05b',
                                          width: 'fit-content',
                                          borderRadius: '5px',
                                          display: 'flex',
                                          alignItems: 'stretch',
                                          justifyContent: 'flex-start',
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
                                             setProjectNumber(
                                                (prev) => +prev + 1
                                             );
                                             setTotalProjectsError('');
                                          }}
                                       />
                                       <input
                                          defaultValue={total_projects}
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
                                             setProjectNumber(
                                                (projectNumber) => {
                                                   if (projectNumber > 1) {
                                                      return projectNumber - 1;
                                                   } else {
                                                      return projectNumber;
                                                   }
                                                }
                                             )
                                          }
                                       />
                                    </Box>
                                    {totalProjectsError ? (
                                       <Typography
                                          variant='body2'
                                          color='error'
                                          sx={{}}
                                       >
                                          {totalProjectsError}
                                       </Typography>
                                    ) : (
                                       <Typography
                                          variant='body2'
                                          color='error'
                                          sx={{}}
                                       >
                                          {` `}
                                       </Typography>
                                    )}
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
                                    />

                                    <select
                                       // defaultValue={turnover_type}
                                       name='turnoverType'
                                       {...register('turnover_type', {
                                          required: {
                                             value: true,
                                             message:
                                                'Turnover Type is Required',
                                          },
                                       })}
                                    >
                                       <option value='lakhs'>Lakhs</option>
                                       <option value='crore'>Crore</option>
                                    </select>
                                 </TurnOverBox>
                                 {/* <CustomErrorText errorMessage={errors.turnover?.message} /> */}
                                 {errors.turnover ? (
                                    <Typography variant='body2' color='error'>
                                       {errors.turnover.message}
                                    </Typography>
                                 ) : (
                                    <Typography
                                       variant='body2'
                                       color='error'
                                    ></Typography>
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
                     <Box sx={{ mt: 2 }}>
                        {selectedService.map((item, index) => {
                           return (
                              <Chip
                                 label={item}
                                 key={index}
                                 sx={{
                                    ml: 1,
                                    mb: 1,
                                    borderRadius: 1,
                                    bgcolor: '#2448FC',
                                    fontWeight: 500,
                                    fontSize: '1.1rem',
                                    color: '#ffffff',
                                    '& .MuiSvgIcon-root': {
                                       color: '#ffffff',
                                       '&:hover': {
                                          color: 'red',
                                       },
                                    },
                                 }}
                                 onDelete={() => chipDeleteHandler(item)}
                              />
                           );
                        })}
                     </Box>
                     <Textarea
                        rows='5'
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
                        error={errors.return_policy}
                     ></Textarea>
                     <CustomErrorText
                        errorMessage={errors.return_policy?.message}
                        sx={{ mt: -0.5 }}
                     />

                     <CertificateBox>
                        <Typography variant='h6'>
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
                                 <Typography variant='body1' sx={{ ml: 2 }}>
                                    Add File
                                 </Typography>
                              </Box>
                           </label>
                        </CertificateNameBox>

                        {prevCertificate?.map((certificate) => (
                           <React.Fragment>
                              <Flex sx={{ justifyContent: 'space-between' }}>
                                 <Typography>{certificate.name}</Typography>
                                 <Button
                                    color='secondary'
                                    sx={{
                                       fontWeight: 600,
                                       fontSize: '1.2rem',
                                       borderBottom: '0 !important',
                                    }}
                                    onClick={() =>
                                       onCertificateDelete(certificate.id)
                                    }
                                 >
                                    <CloseIcon />
                                 </Button>
                              </Flex>
                              <hr />
                           </React.Fragment>
                        ))}

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
                     <YellowButton
                        style={{ marginLeft: '85%', marginTop: '2rem' }}
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
                        <Grid item md={6}>
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
                              // defaultValue={email}
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

                           <SolrufTextField
                              size='small'
                              sx={{ my: 1.5, background: '#ffffff' }}
                              label='GST No'
                              {...register('gst', {
                                 required: {
                                    value: true,
                                    message: 'GST number is Required',
                                 },
                              })}
                           />
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
                                    maxWidth: '100%',
                                    margin: '0 auto',
                                    display: 'block',
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

                           <Select
                              defaultInputValue={state}
                              value={selectedCountry}
                              onChange={handleChange}
                              options={options}
                              placeholder='State'
                              className='react-select-container '
                              styles={customStyles}
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
                           <Box>
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
                                 />
                              </Box>
                           </Box>
                        </Grid>
                     </CustomAccordion>
                     <CustomAccordion
                        title='Certification'
                        noPadding={true}
                        sx={{ background: 'transparent' }}
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
                                       <Typography
                                          variant='body1'
                                          sx={{ ml: 2 }}
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
                        </Grid>
                     </CustomAccordion>

                     <YellowButton
                        style={{
                           marginLeft: 'auto',
                           marginTop: '2rem',
                           width: '100%',
                        }}
                     >
                        Save
                     </YellowButton>
                  </>
               )}
            </FormBox>
         </Container>
      </Box>
   );
};

export default UpdatePortfolio;
