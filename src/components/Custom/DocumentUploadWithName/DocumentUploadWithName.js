import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import SingleFIleUploadWithProgress from '../../../pages/MyPortfolio/SingleFIleUploadWithProgress';
import UploadError from '../../../pages/MyPortfolio/UploadError';
import { PlusIcon } from '@heroicons/react/solid';

const DocumentUploadBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      minWidth: '500px',
      padding: '1rem',
      background: theme.palette.secondary.light,
      borderRadius: '5px',
      margin: '1rem 0',
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

const DocumentUploadWithName = ({ documents, setDocuments }) => {
   const documentNameRef = useRef(null);
   const [documentNameError, setDocumentNameError] = useState('');

   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (documentNameRef.current.value.trim().length === 0) {
         documentNameRef.current.focus();
         setDocumentNameError('Please enter Certificate name');
         return;
      }
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         setDocumentNameError('');
         file.givenName = documentNameRef.current.value;
         return {
            file,
            error: [],
         };
      });
      setDocuments((cur) => [...cur, ...mappedAcceptedFiles, ...rejectedFiles]);
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 5000000,
   });

   const onFileUpload = (url, file) => {
      setDocuments((cur) =>
         cur.map((fw) => {
            if (fw.file === file) {
               return { ...fw, url };
            }
            return fw;
         })
      );
   };

   const deleteHandler = (file) => {
      setDocuments((cur) => cur.filter((fw) => fw.file !== file));
   };
   return (
      <div>
         {' '}
         <DocumentUploadBox>
            <Typography variant='h6' gutterBottom sx={{ color: '#000000' }}>
               Add Booking Documents
            </Typography>
            <CertificateNameBox>
               <input
                  type='text'
                  placeholder='Document Name'
                  ref={documentNameRef}
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
                  <input {...getInputProps()} multiple />
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
                        sx={{
                           ml: 2,
                           color: '#000000',
                        }}
                     >
                        Add
                     </Typography>
                  </Box>
               </label>
            </CertificateNameBox>
            {documentNameError && (
               <Typography style={{ color: 'red' }}>
                  {documentNameError}
               </Typography>
            )}

            {/* ================================================ */}

            {documents.map((fileWrapper, i) => {
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
         </DocumentUploadBox>
      </div>
   );
};

export default DocumentUploadWithName;
