import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import { styled, Typography } from '@mui/material';
import SingleFIleUploadWithProgress from '../../pages/MyPortfolio/SingleFIleUploadWithProgress';
import UploadError from '../../pages/MyPortfolio/UploadError';

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
      margin: '0 auto',
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

const FileUploadWithProgress = ({ document, setDocument }) => {
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
      <Box>
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
   );
};

export default FileUploadWithProgress;
