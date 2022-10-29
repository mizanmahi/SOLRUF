import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
   palette: {
      primary: {
         main: '#ffd05b',
         dark: '#4D4D4D',
         light: '#F3F3F3',
         error: '#E21F30',
      },
      secondary: {
         main: '#666f73',
         light: '#D0D7D9',
         green: '#3fb500',
         lightYellow: 'rgb(255 249 234)',
      },
   },

   typography: {
      body1: {
         color: 'rgba(0,0,0,0.67)',
      },
      fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
   },

   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               // root is the name of a slot in the component
               // borderRadius: '0px',
            },
         },
         defaultProps: {
            // customize the default props for this component
            // disableRipple: true,
         },
      },
      MuiMenu: {
         styleOverrides: {
            paper: {
               maxHeight: '300px !important', // this is for reducing the height of the select menu dropdown
            },
         },
      },
      MuiFormHelperText: {
         styleOverrides: {
            root: {
               color: '#E21F30',
               marginTop: 0,
            },
            // change the color when error state is true
         },
      },
   },
});

theme = responsiveFontSizes(theme);

export { theme };
