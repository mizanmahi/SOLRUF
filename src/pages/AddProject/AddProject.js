import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import SolrufTextField from '../../components/TextField/TextField';
import { useDropzone } from 'react-dropzone';
import UploadError from '../MyPortfolio/UploadError';
import SingleFIleUploadWithProgress from '../MyPortfolio/SingleFIleUploadWithProgress';
import DesignLayoutUploadWithProgress from './DesignLayoutUploadWithProgress';
import { motion } from 'framer-motion';
import SolrufAccordion from '../../components/Accordion/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const CustomAccordion = styled(Accordion)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      borderBottom: '1px solid gray',
   },
}));

const AddProjectBox = styled(Box)(({ theme }) => {
   return {
      background: '#ffffff',
      padding: theme.spacing(5),
      borderRadius: theme.spacing(3),
      position: 'relative',
      marginTop: theme.spacing(3),
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

const AddProject = () => {
   const [projectImages, setProjectImages] = useState([]);
   const [designLayoutFile, setDesignLayoutFile] = useState([]);

   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         return {
            file,
            error: [],
         };
      });
      setProjectImages((cur) => [
         ...cur,
         ...mappedAcceptedFiles,
         ...rejectedFiles,
      ]);
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 5000000,
      accept: 'image/jpeg, image/png',
   });

   const onFileUpload = (url, file) => {
      setProjectImages((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url };
            }
            return fw;
         })
      );
   };

   const deleteHandler = (file) => {
      setProjectImages((cur) => cur.filter((fw) => fw.file !== file));
   };

   return (
      <motion.div
         initial={{ x: '10vw', opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.1 }}
      >
         <AddProjectBox>
            <Box component='form'>
               <Grid container spacing={3}>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField label='Product Name' />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField label='Month Taken' />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                     <SolrufTextField label='Power Capacity' />
                  </Grid>

                  <Grid item md={12}>
                     <Textarea rows='5' placeholder='Description'></Textarea>
                  </Grid>

                  <Grid item md={12}>
                     <SolrufAccordion />
                     <CustomAccordion disableGutters elevation={0}>
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls='panel2a-content'
                           id='panel2a-header'
                        >
                           <Typography>Upload Image</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 3 }}>
                           <Grid container columnSpacing={3}>
                              <Grid item md={12} lg={4}>
                                 <FileInputBox {...getRootProps()}>
                                    <input {...getInputProps()} />

                                    <DottedBox>
                                       <Typography
                                          variant='body2'
                                          textAlign='center'
                                       >
                                          Add image (Upto 5 mb jpg, jpeg format)
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
                              </Grid>
                              <Grid item md={12} lg={5}>
                                 <Box sx={{background: '', p: 2, maxHeight: '300px', overflowY: 'auto' }}>
                                    {projectImages.map((fileWrapper, i) => {
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
                              </Grid>
                              {/* <DesignLayoutUploadWithProgress /> */}
                           </Grid>
                        </AccordionDetails>
                     </CustomAccordion>
                  </Grid>
               </Grid>
            </Box>
         </AddProjectBox>
      </motion.div>
   );
};

export default AddProject;
