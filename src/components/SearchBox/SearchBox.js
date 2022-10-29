import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const SearchWrapper = styled(Box)(({ theme }) => ({
   outline: '3px solid #ffd05b',
   borderRadius: '5px',
   display: 'flex',
   alignItems: 'stretch',
   overflow: 'hidden',
   flex: '0 0 35%',
   boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.10)',
   '&:hover': {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.10)',
   },
   '& input': {
      border: 'none',
      outline: 'none',
      fontSize: '1.2rem',
      color: '#000',
      fontWeight: 400,
      width: '80%',
      padding: '5px 1rem',
      fontFamily: 'inter',

      '&::placeholder': {
         fontFamily: 'inherit',
         fontWeight: '400',
         fontSize: '1.2rem',
      },
   },
}));

const SearchIconBox = styled(Box)(({ theme }) => ({
   background: '#ffd05b',
   width: '30%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   cursor: 'pointer',
   '&:hover': {},
   '& svg': {
      fontSize: '2rem',
      color: '#4d4d4d',
      marginRight: '0.5rem',
   },
}));

const SearchBox = ({ placeholder, onChange, searchTerm, onSearch }) => {
   return (
      <SearchWrapper>
         <input
            type='text'
            placeholder={placeholder}
            onChange={onChange}
            value={searchTerm}
         />
         <SearchIconBox onClick={onSearch}>
            <SearchIcon />

            <Typography
               variant='h6'
               color='#4d4d4d'
               sx={{ display: { xs: 'none', lg: 'block' } }}
            >
               Search
            </Typography>
         </SearchIconBox>
      </SearchWrapper>
   );
};

export default SearchBox;
