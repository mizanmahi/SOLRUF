import { createTheme } from '@mui/material';

export const theme = createTheme({
   palette: {
      primary: {
         main: '#ffd05b',
         dark: '#4D4D4D',
         light: '#F3F3F3',
      },
      secondary: {
         main: '#666f73',
         light: '#D0D7D9',
         green: '#3fb500',
      },
   },

   typography: {
      body1: {
         color: 'rgba(0,0,0,0.67)',
      },
      fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
   },
});
