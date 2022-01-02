import { Typography } from '@mui/material';
import React from 'react';
import LinearProgressWithLabel from '../../components/ProgressWithLabel/ProgressWithLabel';
import FileHeader from './FileHeader';

const UploadError = ({ file, onDelete, errors }) => {
   return (
      <>
         <FileHeader file={file} onDelete={onDelete} errors={errors} />
         {errors.map((err) => (
            <Typography sx={{color: 'red'}}>{err.message}, Try another!</Typography>
         ))}
      </>
   );
};

export default UploadError;
