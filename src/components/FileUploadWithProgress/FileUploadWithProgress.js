import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import { Button, styled, Typography } from '@mui/material';
import SingleFIleUploadWithProgress from '../../pages/MyPortfolio/SingleFIleUploadWithProgress';
import UploadError from '../../pages/MyPortfolio/UploadError';
import CloseIcon from '@mui/icons-material/Close';
import { axiAuth } from '../../utils/axiosInstance';

export const FileInputBox = styled(Box)(({ theme }) => {
   return {
      border: '2px solid #FFD05B',
      height: 200,
      width: '100%',
      maxWidth: '300px',
      background: '#F3F3F3',
      borderRadius: '5px',
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

const FileUploadWithProgress = ({
   document,
   setDocument,
   fileType,
   name,
   prevImages,
   setPrevProductImages,
   sx,
}) => {
   const onDrop = useCallback(
      (acceptedFiles, rejectedFiles) => {
         const mappedAcceptedFiles = acceptedFiles.map((file) => {
            return {
               file,
               error: [],
            };
         });
         setDocument((cur) => [
            ...cur,
            ...mappedAcceptedFiles,
            ...rejectedFiles,
         ]);
      },
      [setDocument]
   );

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 5000000,

      accept: fileType?.join(',') || '',
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

   const prevImagesDeleteHandler = (fileId) => {
      if (fileId) {
         let data = { image_id: fileId };
         axiAuth
            .post(`api/image/delete`, data)
            .then((res) => {
               // console.log(res);
               let ipId = prevImages.filter((ele) => {
                  return fileId !== ele.image_id;
               });
               setPrevProductImages(ipId);
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   return (
      <Box sx={{ ...sx }}>
         <div className='d-flex mt-4 justify-content-start'>
            <FileInputBox
               {...getRootProps()}
               className='col-md-6 p-5'
               style={{
                  height: '300px',
               }}
            >
               <input {...getInputProps()} />

               <DottedBox>
                  <Typography
                     variant='body2'
                     textAlign='center'
                     className='mb-3'
                  >
                     {name || 'Add Document (Upto 5 mb)'}
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

            <div className='col-md-6'>
               <Box
                  sx={{
                     background: '',
                     p: 2,
                     maxHeight: '300px',
                     overflowY: 'auto',
                     width: 'auto',
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
                  {prevImages &&
                     prevImages.length > 0 &&
                     prevImages.map((img, i) => (
                        <Box
                           key={img.image_id}
                           sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 1,
                              borderBottom: '1px solid gray',
                           }}
                        >
                           <Typography
                              component='a'
                              href={img.image_url}
                           >{`image ${i + 1}`}</Typography>
                           <Button
                              endIcon={<CloseIcon />}
                              color='secondary'
                              onClick={() =>
                                 prevImagesDeleteHandler(img?.image_id)
                              }
                           ></Button>
                        </Box>
                     ))}
               </Box>
            </div>
         </div>
      </Box>
   );
};

export default FileUploadWithProgress;
