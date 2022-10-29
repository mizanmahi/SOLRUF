import { styled } from "@mui/material";

export const CertificateNameBox = styled('div')(({ theme }) => {
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

 export const DocumentUploadBox = styled('div')(({ theme }) => {
    return {
       width: '100%',
       padding: '1rem',
       background: theme.palette.secondary.light,
       borderRadius: '5px',
    };
 });

  //Dropdown and Input Box
  export const FieldUnitBox = styled('div')(({ theme }) => {
    return {
       width: '100%',
       margin: '0 auto',
       border: '2px solid #FFD05B',
       borderRadius: '5px',
       outline: 'none',
       fontFamily: theme.typography.fontFamily,
       height: '39px',
       overflow: 'hidden',
       '& input': {
          border: 'none',
          width: '80%',
          height: '100%',
          padding: '1rem',
          background: '#FFFFFF',
          '&:focus': {
             outline: 'none',
          },
       },
       '& select': {
          border: 'none',
          outline: 'outline',
          width: '20%',
          borderRight: '5px solid #FFD05B',
          height: '100%',
          textAlign: 'center',
          background: '#ffd05b',
          '&:focus': {
             outline: 'none',
          },
          '& option': {
             background: '#ffd05b',
          },
       },
    };
 });