import { Button, Tabs, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const EnquiryForm = styled(Box)(({ theme }) => ({
   padding: '1.5rem',
   '@media (max-width: 1200px)': {
      padding: '1rem',
   },
   '@media (max-width: 600px)': {
      padding: '0.5rem',
   },
   borderRadius: '0.5rem',
   background: '#ffffff',
   boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',
   position: 'relative',
   minHeight: '545px',
   '& h5': {
      fontWeight: 'bold',
   },
}));

export const DocumentBox = styled(Box)(({ theme }) => ({}));

export const Circle = styled(Box)(({ theme, img }) => ({
   width: '100px',
   height: '100px',
   //  borderRadius: '50%',
   //  background: 'gray',
   marginRight: '8px',
   backgroundImage: `url(${img})`,
   backgroundPosition: 'center',
   backgroundSize: 'cover',
}));

export const TabPanelDoc = styled(Tabs)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      fontSize: '1rem',
      padding: '1rem',
      borderRight: `2px solid ${theme.palette.primary.main}`,
      '@media (max-width: 600px)': {
         border: `0`,
         fontSize: '0.8rem'
      },
   },
   '& .Mui-selected': {
      fontWeight: 'bold',
      color: '#000000 !important',
      background: theme.palette.primary.main,
   },
   '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around',
      '@media (max-width: 600px)': {
         width:'100%'
      },

   },
   '& .MuiTabs-indicator': {
      display: 'none',
   },
}));

export const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '1rem 0',
   marginBottom: '2rem',
   '@media (max-width: 600px)': {
      marginBottom: '0',
   }
}));
export const ProductName = styled(Typography)(({ theme }) => ({
   fontWeight: '600',
   fontSize: '1.5rem',
   color: '#000000',
   textAlign: 'center',
}));

export const CircleBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-around',
   marginTop: theme.spacing(2),
}));

export const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));

export const AccessText = styled(Box)(({ theme }) => ({
   background: theme.palette.primary.error,
   padding: theme.spacing(1.3),
   borderRadius: theme.spacing(1),
   display: 'flex',
   alignItems: 'center',
   position: 'absolute',
   right: '-1rem',
   top: { md: '-2rem', xs: 0 },
   maxWidth: { md: '300px', xs: '150px' },
   //   "& h6": {
   //     color: "white",
   //     fontSize: "1rem",
   //     fontWeight: 500,
   //     textAlign: "center",
   //   },
}));

export const AccessTextMobile = styled(Box)(({ theme }) => ({
   background: theme.palette.primary.error,
   padding: theme.spacing(1.3),
   borderRadius: '4px',
   display: 'flex',
   alignItems: 'center',
   '& h6': {
      color: 'white',
      fontWeight: 500,
      textAlign: 'start',
   },
}));

export const CreateBusinessText = styled(Box)(({ theme }) => ({
   background: theme.palette.primary.error,
   padding: theme.spacing(1),
   borderRadius: theme.spacing(1),
   textAlign: 'center',
   position: 'absolute',
   top: '50%',
   left: '50%',
   display: 'flex',
   alignItems: 'center',
   transform: 'translate(-50%, -50%)',
   cursor: 'pointer',
   '& svg': {
      color: 'white',
      fontSize: 40,
      border: '2px solid white',
      borderRadius: '50%',
      marginRight: '.5rem',
   },
   '& h6': {
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
   },
}));

export const ProductFeatures = styled(Box)(({ theme }) => ({
   margin: '3rem 0',
   padding: '1rem',
   background: '#fff',
   borderRadius: theme.spacing(1),
   boxShadow: '0px 4px 24px  0 rgba(0, 69, 184, 0.15)',
   '& .featuresHeader': {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      padding: '0 0.5rem',
   },
}));

export const ProductFeaturesMobile = styled(Box)(({ theme }) => ({
   margin: '3rem 0',
   padding: '1rem',
   background: '#F4F0E4',
   borderRadius: theme.spacing(1),
   boxShadow: '0px 4px 24px  0 rgba(0, 69, 184, 0.15)',
   '& .featuresHeader': {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      padding: '0 0.5rem',
   },
}));

export const FeatureBox = styled(Box)(({ theme }) => ({}));

export const FeatureItemBox = styled(Box)(({ theme, i }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
      background: i % 2 === 0 ? '#F3F3F3' : '#ffffff',
      padding: '0.5rem',
      borderRadius: '0.5rem',
   };
});

export const FeatureItemBoxMobile = styled(Box)(({ theme, i }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
      background: i % 2 === 0 ? '#fff' : '#F4F0E4',
      padding: '0.5rem',
      borderRadius: '0.5rem',
   };
});

export const DownLoadButton = styled(Button)(({ theme }) => ({
   background: '#000000',
   color: '#ffffff',
   margin: '0 8px 8px 0',
}));
