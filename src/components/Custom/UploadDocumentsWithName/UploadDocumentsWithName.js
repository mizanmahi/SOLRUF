import { IconButton, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PlusIcon } from '@heroicons/react/solid';
import UploadError from '../../../pages/MyPortfolio/UploadError';
import SingleFIleUploadWithProgress from '../../../pages/MyPortfolio/SingleFIleUploadWithProgress';
import CloseIcon from '@mui/icons-material/Close';
import { axiAuth } from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';

const DocumentUploadBox = styled('div')(({ theme }) => {
   return {
      minWidth: '300px',
      maxWidth: '100%',
      padding: '1rem',
      background: theme.palette.secondary.light,
      borderRadius: '5px',
      margin: '1rem 0',
   };
});

const DocumentNameBox = styled('div')(({ theme }) => {
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

const UploadDocumentsWithName = ({
   documents,
   setDocuments,
   sx,
   prevDocuments,
   title
}) => {
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
            errors: [],
         };
      });
      setDocuments((cur) => [...cur, ...mappedAcceptedFiles, ...rejectedFiles]);
   }, [setDocumentNameError, documentNameRef, setDocuments]);

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

   const [prevDocs, setPrevDocs] = useState(prevDocuments || []);

   const prevDocsDeleteHandler = (doc_id) => {
      axiAuth
         .delete(`/api/document/${doc_id}`)
         .then((res) => {
            if (res.status === 200) {
               setPrevDocs((cur) => cur.filter((doc) => doc.doc_id !== doc_id));
               toast.success('Document deleted successfully');
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <DocumentUploadBox sx={{ ...sx }}>
         <Typography variant='h6' gutterBottom sx={{ color: '#000000' }}>
           {title}
         </Typography>
         <DocumentNameBox>
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
         </DocumentNameBox>
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
               <Box sx={{ pl: 1.5 }}>
                  <SingleFIleUploadWithProgress
                     key={i}
                     file={fileWrapper.file}
                     onDelete={deleteHandler}
                     onFileUpload={onFileUpload}
                  />
               </Box>
            );
         })}
         {prevDocs.length > 0 &&
            prevDocs.map(({ doc_id, doc_url, doc_name }) => (
               <React.Fragment key={doc_id}>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1,
                        px: 1.2,
                     }}
                  >
                     <Typography variant='body1' component={'a'} href={doc_url}>
                        {doc_name.length > 20
                           ? doc_name.slice(0, 20) + '...'
                           : doc_name}
                     </Typography>

                     <IconButton
                        sx={{
                           fontWeight: 600,
                           fontSize: '1.2rem',
                           borderBottom: '0 !important',
                        }}
                        onClick={() => prevDocsDeleteHandler(doc_id)}
                     >
                        <CloseIcon />
                     </IconButton>
                  </Box>
               </React.Fragment>
            ))}
      </DocumentUploadBox>
   );
};

export default UploadDocumentsWithName;
