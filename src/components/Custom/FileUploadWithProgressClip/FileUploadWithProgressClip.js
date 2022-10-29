import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import { Button, styled, Typography } from '@mui/material';
// import SingleFIleUploadWithProgress from '../../pages/MyPortfolio/SingleFIleUploadWithProgress';
// import UploadError from '../../pages/MyPortfolio/UploadError';
import CloseIcon from '@mui/icons-material/Close';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import SingleFIleUploadWithProgress from '../../../pages/MyPortfolio/SingleFIleUploadWithProgress';
import UploadError from '../../../pages/MyPortfolio/UploadError';

const FileInputBox = styled(Box)(({ theme }) => {
   return {
      maxWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
   };
});

const FileUploadWithProgressClip = ({
   document,
   setDocument,
   fileType,
   name,
   prevImages,
   sx,
}) => {
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

      accept: fileType.join(','),
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
         // proceed on deleting the image
      }
   };

   return (
      <Box sx={{ ...sx }}>
         <div className='d-flex justify-content-start'>
            <FileInputBox {...getRootProps()} style={{}}>
               <input {...getInputProps()} />
               <FilePresentOutlinedIcon />
            </FileInputBox>

            {/* ============ */}

            <div>
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

export default FileUploadWithProgressClip;
