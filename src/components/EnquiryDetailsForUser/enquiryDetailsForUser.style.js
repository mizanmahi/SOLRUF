import { Box, styled } from '@mui/system';

export const EnquiryDetailsWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   // background: '#f3f3f3',
   width: '100%',
   '& > svg': {
      position: 'absolute',
      top: '0',
      right: '0',
      fontWeight: 'bold',
      cursor: 'pointer',
   },
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
   padding: '1rem',
}));

export const DocumentUploadBox = styled('div')(({ theme }) => {
   return {
      width: '100%',
      padding: '1rem',
      background: theme.palette.secondary.light,
      borderRadius: '5px',
      margin: '1rem 0',
   };
});

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

export const NoVendorBox = styled(Box)(({ theme }) => {
   return {
      width: '80%',
      padding: '1rem',
      background: '#EF5350',
      borderRadius: '5px',
      margin: '0 auto',
      '& p': {
         color: '#fff',
         textAlign: 'center',
         fontSize: '1.2rem',
      },
   };
});

export const CreateBusinessBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   background: theme.palette.primary.error,
   columnGap: 1,
   padding: '0.5rem 1rem',
   borderRadius: '10px',
   width: '80%',
   margin: '0 auto',
}));
