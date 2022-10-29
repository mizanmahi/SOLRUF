import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import { Button, styled, Typography } from '@mui/material';
// import SingleFIleUploadWithProgress from '../../pages/MyPortfolio/SingleFIleUploadWithProgress';
// import UploadError from '../../pages/MyPortfolio/UploadError';
import CloseIcon from '@mui/icons-material/Close';
// import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import SingleFIleUploadWithProgress from '../../../pages/MyPortfolio/SingleFIleUploadWithProgress';
import UploadError from '../../../pages/MyPortfolio/UploadError';
import uploadSvg from './upload.svg';

const FileInputBox = styled(Box)(({ theme }) => {
   return {
      maxWidth: '300px',
   };
});

const FileUploadWithSliderPreview = ({
   document,
   setDocument,
   fileType,
   name,
   prevImages,
   slider,
   sx,
}) => {
   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      const mappedAcceptedFiles = acceptedFiles.map((file) => {
         return {
            file,
            errors: [],
         };
      });
      setDocument((cur) => [...cur, ...mappedAcceptedFiles, ...rejectedFiles]);
   }, [setDocument]);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxSize: 1000000,
      multiple: false,
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
         <Box>
            <FileInputBox {...getRootProps()} style={{}}>
               <input {...getInputProps()} />
               {/* <FilePresentOutlinedIcon /> */}
               <img
                  src={uploadSvg}
                  alt='upload'
                  style={{ cursor: 'pointer', height: '130px', width: '130px' }}
               />
            </FileInputBox>

            {/* ============ */}

            <div>
               <Box
                  sx={{
                     background: '',
                     maxHeight: '250px',
                     overflowY: 'auto',
                     maxWidth: '350px',
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
                           slider={slider}
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
         </Box>
      </Box>
   );
};

export default FileUploadWithSliderPreview;
