import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import UploadError from '../MyPortfolio/UploadError';
import SingleFIleUploadWithProgress from '../MyPortfolio/SingleFIleUploadWithProgress';

const FileInputBox = styled(Box)(({ theme }) => {
    return {
       border: '2px solid #FFD05B',
       height: 300,
       width: '100%',
       maxwidth: '400px',
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
    };
 });




const DesignLayoutUploadWithProgress = () => {

    const [designLayoutFile, setDesignLayoutFile] = useState([]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
       const mappedAcceptedFiles = acceptedFiles.map((file) => {
          return {
             file,
             error: [],
          };
       });
       setDesignLayoutFile((cur) => [
          ...cur,
          ...mappedAcceptedFiles,
          ...rejectedFiles,
       ]);
    }, []);
 
    const { getRootProps, getInputProps } = useDropzone({
       onDrop,
       maxSize: 5000000,
    });
 
    const onFileUpload = (url, file) => {
        setDesignLayoutFile((cur) =>
          cur.map((fw) => {
             if (fw.file === file) {
                return { ...fw, url };
             }
             return fw;
          })
       );
    };
 
    const deleteHandler = (file) => {
        setDesignLayoutFile((cur) => cur.filter((fw) => fw.file !== file));
    };

    return (
        <>
         <Grid item md={12} lg={6}>
                  <FileInputBox {...getRootProps()}>
                     <input {...getInputProps()} />
                     <p>Add Design Layout (3-5 Mb with jpg, jpeg format)</p>
                     <DottedBox></DottedBox>
                  </FileInputBox>
               </Grid>
               <Grid item md={12} lg={6}>
                  {designLayoutFile.map((fileWrapper, i) => {
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
               </Grid>   
        </>
    )
}

export default DesignLayoutUploadWithProgress
