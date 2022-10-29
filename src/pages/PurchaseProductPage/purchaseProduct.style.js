import { Box, Button, Tabs } from '@mui/material';
import { styled } from '@mui/system';

export const PurchaseBookBox = styled(Box)(({ theme }) => ({
   borderRadius: '0.5rem',
   padding: '1.5rem',
   boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',
}));

export const DocumentBox = styled(Box)(({ theme }) => ({}));

export const Circle = styled(Box)(({ theme, img }) => ({
   width: '100px',
   height: '100px',

   marginRight: '8px',
   backgroundImage: `url(${img})`,
   backgroundPosition: 'center',
   backgroundSize: 'cover',
}));

export const TabPanel = styled(Tabs)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      fontSize: '1.2rem',
      paddingLeft: '3rem',
      paddingRight: '3rem',
   },
   '& .Mui-selected': {
      fontWeight: 'bold',
      color: '#000000',
   },
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
         width:'100%',
         paddingLeft:'120px'
      },
   },
   '& .MuiTabs-indicator': {
      display: 'none',
   },
}));

export const ProductFeatures = styled(Box)(({ theme }) => ({
   margin: '3rem 0',
   padding: '1rem',
   background: '#ffffff',
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

export const DownLoadButton = styled(Button)(({ theme }) => ({
   background: '#000000',
   color: '#ffffff',
   margin: '0 8px 8px 0',
}));
