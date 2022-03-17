import {
   Button,
   Container,
   Grid,
   styled,
   Switch,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import CustomAccordion from '../../components/CustomAccordion/CustomAccordion';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import SolrufTextField from '../../components/TextField/TextField';
import { useDropzone } from 'react-dropzone';
import UploadError from '../MyPortfolio/UploadError';
import SingleFIleUploadWithProgress from '../MyPortfolio/SingleFIleUploadWithProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileUploadWithProgress from '../../components/FileUploadWithProgress/FileUploadWithProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FileInputBox = styled(Box)(({ theme }) => {
   return {
      border: '2px solid #FFD05B',
      height: 200,
      width: '100%',
      maxWidth: '300px',
      background: '#F3F3F3',
      borderRadius: 20,
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      margin: '.8rem auto',
   };
});

const DottedBox = styled(Box)(({ theme }) => {
   return {
      position: 'absolute',
      width: '80%',
      height: '80%',
      border: '2px dashed #FFD05B',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   };
});

const ButtonNext = styled(Button)(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '0.5rem 1rem',
}));

const CustomizeProduct = ({ nextHandler }) => {
   const [document, setDocument] = useState([]);
   const [bookingDocument, setBookingDocument] = useState([]);
   const [availability, setAvailability] = useState(false);

   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         return {
            file,
            error: [],
         };
      });
      setDocument((cur) => [...cur, ...mappedAcceptedFiles, ...rejectedFiles]);
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 5000000,

      // accept: 'image/jpeg, image/png',
   });

   const onFileUpload = (url, file) => {
      setDocument((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url };
            }
            return fw;
         })
      );
   };

   const deleteHandler = (file) => {
      setDocument((cur) => cur.filter((fw) => fw.file !== file));
   };

   return (
      <div>
         <Container maxWidth='lg'>
            <Button startIcon={<ArrowBackIcon />} sx={{color: '#000000', mt: 2}} onClick={() => nextHandler(3)}>Back</Button>
            <Box
               sx={{ maxWidth: '1000px', width: '100%', margin: '1rem auto' }}
            >
               <SingleProduct />
            </Box>

            <CustomAccordion title='Pricing Details' sx={{background: 'transparent'}}>
               <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Price'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Price Per Watt'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
               </Grid>
            </CustomAccordion>
            {/* ============ document uploading ============ */}
            <CustomAccordion title='Pricing Details' sx={{background: 'transparent'}}>
               <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Price'
                        iconText={
                           <Typography variant='body2'>
                              Warranty Years
                           </Typography>
                        }
                     />
                     <CustomTextArea placeholder='Warranty description' />
                  </Grid>
                  <Grid item sm={12} md={6}>
                     <Box>
                        {document.length === 0 && (
                           <FileInputBox {...getRootProps()}>
                              <input {...getInputProps()} />

                              <DottedBox>
                                 <Typography variant='body2' textAlign='center'>
                                    Add Document (Upto 5 mb)
                                 </Typography>
                                 <img
                                    src='https://i.ibb.co/M23FX1T/upload-Plus.png'
                                    alt=''
                                    style={{
                                       width: '100',
                                       height: '100',
                                    }}
                                 />
                              </DottedBox>
                           </FileInputBox>
                        )}

                        {/* ============ */}

                        <Box
                           sx={{
                              background: '',
                              p: 2,
                              maxHeight: '300px',
                              overflowY: 'auto',
                              width: 300,
                              mx: 'auto',
                           }}
                        >
                           {document.map((fileWrapper, i) => {
                              return fileWrapper?.errors?.length ? (
                                 <UploadError
                                    key={i}
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
                        </Box>
                     </Box>
                  </Grid>
               </Grid>
            </CustomAccordion>

            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  my: 5,
               }}
            >
               <Typography variant='h4' sx={{ mr: 3 }}>
                  Booking Availability
               </Typography>
               {/* <Switch inputProps={ {'aria-label': 'Switch demo'} } defaultChecked color="warning" /> */}
               {/* <CustomSwitch /> */}
               <img
                  src={
                     availability
                        ? 'https://i.ibb.co/9by4N3V/Frame-188.png'
                        : 'https://i.ibb.co/ydvSQmN/Frame-187.png'
                  }
                  alt='availability switch'
                  onClick={() => setAvailability(!availability)}
                  style={{ cursor: 'pointer' }}
               />
            </Box>

            {availability && (
               <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Booking Price'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Booking Price Per Watt'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Booking Period'
                        iconText={
                           <Typography variant='body2'>Days/Months</Typography>
                        }
                     />
                  </Grid>
                  <Grid item sm={12} md={6}>
                     <SolrufTextField
                        label='Advance Payment'
                        iconText={<Typography variant='body2'>INR</Typography>}
                     />
                  </Grid>

                  <Grid item sm={12} md={6}>
                     <CustomTextArea
                        placeholder='Advance Payment Policy Description'
                        style={{ marginTop: '0' }}
                        rows='7'
                     />
                  </Grid>
                  <Grid item sm={12} md={6}>
                     <FileUploadWithProgress
                        document={bookingDocument}
                        setDocument={setBookingDocument}
                     />
                  </Grid>
               </Grid>
            )}
            <ButtonNext
               endIcon={<ArrowForwardIcon />}
               sx={{
                  color: '#4D4D4D',
                  mx: 'auto',
                  display: 'flex',
                  minWidth: 250,
                  maxWidth: 250,
                  my: 5,
                  '&:hover': {
                     background: '#f7f7f7',
                  },
               }}
               onClick={() => nextHandler(2)}
            >
               Next
            </ButtonNext>
         </Container>
      </div>
   );
};

export default CustomizeProduct;
