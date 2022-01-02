import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LinearProgressWithLabel from '../../components/ProgressWithLabel/ProgressWithLabel';
import FileHeader from './FileHeader';

const SingleFIleUploadWithProgress = ({
   file,
   rejectedFile,
   onDelete,
   onFileUpload,
}) => {
   const [progress, setProgress] = useState(0);
   const [url, setUrl] = useState('');

   useEffect(() => {
      async function upload() {
         const url = await uploadFile(file, setProgress);
         setUrl(url);
         onFileUpload(url, file);
      }

      upload();
   }, []);

   return (
      <div>
         <FileHeader file={file} onDelete={onDelete} progress={progress} url={url} />
         {progress < 100 && <LinearProgressWithLabel value={progress} />}
         <hr />
      </div>
   );
};

export default SingleFIleUploadWithProgress;

function uploadFile(file, onProgress) {
   const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
   const key = 'docs_upload_example_us_preset';

   return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      xhr.onload = function () {
         const response = JSON.parse(xhr.responseText);
         res(response.secure_url);
      };

      xhr.onerror = (e) => rej(e);

      xhr.upload.onprogress = function (e) {
         if (e.lengthComputable) {
            const percentage = Math.floor((e.loaded / e.total) * 100);
            onProgress(percentage);
         }
      };

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', key);

      xhr.send(formData);
   });
}
