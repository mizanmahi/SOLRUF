import styled from '@emotion/styled';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const SearchWrapper = styled(Box)(({ theme }) => ({
   border: '3px solid #ffd05b',
   borderRadius: '16px',
   display: 'flex',
   alignItems: 'stretch',
   overflow: 'hidden',
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
      flex: 1,

      '&::placeholder': {
         fontFamily: 'inherit',
         fontWeight: '400',
         fontSize: '1.2rem',
      },
   },
}));

const SearchIconBox = styled(Box)(({ theme }) => ({
   background: '#fff',
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

const TableSearchBar = ({ placeholder, onChange, searchTerm, onSearch, sx }) => {
   return (
      <SearchWrapper sx={{...sx}}>
         <input
            type='text'
            placeholder={placeholder}
            onChange={onChange}
            value={searchTerm}
         />
         <SearchIconBox onClick={onSearch}>
            <SearchIcon />
         </SearchIconBox>
      </SearchWrapper>
   );
};

export default TableSearchBar;
