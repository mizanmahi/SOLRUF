import React, { useCallback, useState } from 'react';
import { Chip, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import Select from 'react-select';
import { XIcon, PhotographIcon, CheckIcon } from '@heroicons/react/outline';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

import SolrufTextField from '../../components/TextField/TextField';
import './myPortfolio.css';
import ProductDetailList from '../../components/ProductDetailList/ProductDetailList';
import LinearProgressWithLabel from '../../components/ProgressWithLabel/ProgressWithLabel';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import SingleFIleUploadWithProgress from './SingleFIleUploadWithProgress';
import { useRef } from 'react';
import UploadError from './UploadError';
import ProjectsPage from '../ProjectsPage/ProjectsPage';
import YellowButton from '../../components/YellowButton/YellowButton';
import AddProject from '../AddProject/AddProject';

const PageTitleBox = styled(Box)(({ theme }) => {
   return {
      padding: theme.spacing(2),
      color: theme.palette.secondary.dark,
      background: theme.palette.secondary.light,
   };
});

const FormBox = styled(Box)(({ theme }) => {
   return {
      background: '#fff',
      marginTop: theme.spacing(1),
      padding: theme.spacing(5),
      borderRadius: theme.spacing(3),
   };
});

const UploadBox = styled(Box)(({ theme }) => {
   return {
      border: '2px solid #FFD05B',
      height: 300,
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
      margin: '1rem auto',
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
      margin: '1rem auto',
      border: '2px solid #FFD05B',
      borderRadius: '5px',
      outline: 'none',
      fontFamily: theme.typography.fontFamily,
      height: '55px',
      padding: '.2rem',
      '& input': {
         border: 'none',
         width: '80%',
         height: '100%',
         padding: '1rem',
      },
      '& select': {
         border: 'none',
         width: '20%',
         height: '100%',
         outline: 'none',
         borderLeft: '2px solid #ffd05b',
         paddingLeft: '1rem',
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


//@ select options
const options = [
   { value: 'maharashtra', label: 'Maharashtra' },
   { value: 'delhi', label: 'Delhi' },
   { value: 'west bengal', label: 'West Bengal' },
   { value: 'chennai', label: 'Chennai' },
   { value: 'madhya pradesh', label: 'Madhya Pradesh' },
];

const services = [
   { value: 'service#1', label: 'Service#1' },
   { value: 'service#2', label: 'Service#2' },
   { value: 'service#3', label: 'Service#3' },
   { value: 'service#4', label: 'Service#4' },
];

const MyPortfolio = () => {
   const [selectedCountry, setSelectedCountry] = useState('State');
   const [selectedService, setSelectedServices] = useState([]);

   const [file, setFile] = useState(null);
   const [fileSizeError, setFileSizeError] = useState('');
   const [fileUploadDone, setFIleUploadDone] = useState(false);

   const [percentage, setPercentage] = useState(0);

   const [previewImage, setPreviewImage] = useState('');
   const [projectNumber, setProjectNumber] = useState(0);

   const handleChange = (selectedCountry) => {
      setSelectedCountry(selectedCountry);
      console.log(`Option selected:`, selectedCountry);
   };

   const handleServices = (serviceSelected) => {
      if (selectedService.includes(serviceSelected.value)) {
         setSelectedServices([...selectedService]);
      } else {
         setSelectedServices((selectedService) => [
            ...selectedService,
            serviceSelected.value,
         ]);
      }

      console.log(`Option selected:`, selectedService);
   };

   const uploadHandler = async (e) => {
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

      const response = await axios.post(
         'https://jsonplaceholder.typicode.com/posts',
         data,
         {
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
         }
      );
      console.log(response);
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

   console.log(certificateFiles);

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
      }),
      menu: (provided, state) => ({
         ...provided,
         zIndex: '100000',
         position: 'absolute',
      }),
   };

   return (
      <Box sx={{ bgcolor: '#f3f3f3', px: [1, 0] }}>
         <PageTitleBox>
            <Container maxWidth='xl'>
               <Grid container columnSpacing={3} sx={{alignItems: 'center'}}>
                  <Grid item xs={12} md={5}>
                     <Typography variant='h5' fontWeight={500}>
                        My Portfolio
                     </Typography>
                  </Grid>
                  <Grid item xs={12} md={7}>
                     <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <Typography variant='body1' gutterBottom fontWeight={500}>
                           Consumer Sharable Link
                        </Typography>
                        <CertificateNameBox style={{width: '60%', margin: '0',minWidth: '250px', height: '45px'}}>
                           <input
                              type='text'
                              placeholder='https://frederik.info'
                           />

                           <label
                              htmlFor='serviceFile'
                              style={{
                                 width: '20%',
                                 minWidth: '100px',
                                 height: '100%',
                                 background: '#ffd05b',
                              }}
                           >
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                 }}
                              >
                                 <Typography variant='body1' sx={{ cursor: 'pointer' }}>
                                    Copy
                                 </Typography>
                              </Box>
                           </label>
                        </CertificateNameBox>
                     </Box>
                  </Grid>
               </Grid>
            </Container>
         </PageTitleBox>
         <Container maxWidth='xl' sx={{ mt: 5 }}>
            <Typography variant='h5' fontWeight={500} gutterBottom>
               Installer Info
            </Typography>

            <FormBox component='form'>
               <Grid container spacing={3} alignItems='center'>
                  <Grid item md={6}>
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
                                 style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                              />
                           </DottedBox>
                        </UploadBox>
                     </label>

                     {file && (
                        <Box
                           sx={{
                              width: '100%',
                              maxWidth: '410px',
                              background: '#d0d7d9',
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
                                       style={{ width: 30, color: 'green' }}
                                    />
                                    <XIcon
                                       style={{ width: 20, cursor: 'pointer' }}
                                       onClick={profileCancelHandler}
                                    />
                                 </Box>
                              ) : (
                                 <XIcon
                                    style={{ width: 20, cursor: 'pointer' }}
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
                     <SolrufTextField label='Name' />
                     <SolrufTextField label='Phone Number' />
                     <SolrufTextField label='Email' />

                     <SolrufTextField
                        label='Video Intro'
                        style={{ marginBottom: '1rem' }}
                     />

                     <Select
                        value={selectedCountry}
                        onChange={handleChange}
                        options={options}
                        placeholder='State'
                        className='react-select-container '
                        styles={customStyles}
                     />
                  </Grid>
               </Grid>

               <Textarea rows='5' placeholder='Description'></Textarea>

               <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField label='Company' />
                     <SolrufTextField label='GST No' />
                  </Grid>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField label='Location' />
                     <TurnOverBox>
                        <input type='text' placeholder='TurnOver' />
                        <select name='turnoverType'>
                           <option value='lakhs'>Lakhs</option>
                           <option value='crore'>Crore</option>
                        </select>
                     </TurnOverBox>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           my: 5,
                        }}
                     >
                        <Typography
                           variant='body1'
                           component='p'
                           sx={{ mr: 2 }}
                        >
                           Total Projects
                        </Typography>
                        <Box
                           sx={{
                              border: '2px solid #ffd05b',
                              borderRadius: '5px',
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
                                 paddingLeft: '1.2rem',
                                 border: 'none',
                              }}
                              value={projectNumber}
                              onChange={(e) => setProjectNumber(e.target.value)}
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

               <Box sx={{ mt: 2 }}>
                  {selectedService.map((item, index) => {
                     return (
                        <Chip
                           label={item}
                           key={index}
                           sx={{
                              ml: 1,
                              borderRadius: 1,
                              bgcolor: '#D0D7D9',
                              fontWeight: 500,
                              fontSize: '1.1rem',
                           }}
                        />
                     );
                  })}
               </Box>

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

               <YellowButton style={{ marginLeft: '85%', marginTop: '2rem' }}>
                  Save
               </YellowButton>
            </FormBox>

            <ProjectsPage />
         </Container>
      </Box>
   );
};

export default MyPortfolio;
