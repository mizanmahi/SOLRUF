import { Box, styled } from '@mui/system';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import SolrufTextField from '../../components/TextField/TextField';

export const FilterArea = styled(Box)(({ theme }) => ({
   background: '#f3f3f3',
   paddingBottom: '20px',
   position: 'sticky',
   top: 0,
   zIndex: 500,
   borderBottom: `1px solid ${theme.palette.grey[300]}`,
   '& .categoriesArea': {
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: 10,
      '@media (max-width: 600px)': {
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         rowGap: 5,
         paddingTop: 5,
      },
   },
   '& .filterArea': {
      marginTop: '0rem',
      marginRight: 'auto',
      marginBottom: '0rem',
      marginLeft: 'auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gridColumnGap: '1rem',
   },
}));

export const SolrufTextFieldWhite = styled(SolrufTextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      background: '#ffffff',
      '& fieldset': {
         borderColor: 'gray',
         borderWidth: '1px',
      },
      '&:hover fieldset': {
         borderWidth: '1px',
         borderColor: 'gray',
      },
      '&.Mui-focused fieldset': {
         borderWidth: '1px',
         borderColor: 'gray',
      },
   },
}));

export const ResetButton = styled(PrimaryButton)(({ theme, apply }) => ({
   // border: '1px solid #F20519',
   color: apply ? '#4D4D4D' : '#F20519',
   borderRadius: '0',
   width: '100%',
   height: '55px',
   // margin: "10px",
   background: '#f3f3f3',
   borderWidth: '1px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   transition: 'all 0.3s ease-in-out',
   fontSize: '1rem',
   textTransform: 'capitalize',
   bottom: '0',
   '& svg': {
      fontSize: '1.5rem',
   },
   '&:hover': {
      background: apply ? '#ffd05b' : '#F20519',
      color: apply ? '#4D4D4D' : '#fff',
   },
}));
