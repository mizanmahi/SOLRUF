import { Fragment } from 'react';
// import './GlobalTable.css'
import { Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchIconBox = styled(Box)(({ theme }) => ({
   background: 'white',
   width: '8%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   cursor: 'pointer',
   paddingTop: '2px',
   '&:hover': {
      borderRadius: '5px',
      '& svg': {
         color: theme.palette.primary.main,
         transition: 'all 0.3s',
      },
   },
   '& svg': {
      fontSize: '2rem',
      color: '#4d4d4d',
      //  marginLeft: '0.4rem',
   },
}));

const SearchBox = styled(Box)(({ theme }) => ({
   border: '2px solid #ffd05b',
   borderRadius: '6px',
   display: 'flex',
   alignItems: 'stretch',
   overflow: 'hidden',
   flex: '0 0 89%',
   marginRight: '8px',
   boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.10)',
   '&:hover': {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.10)',
   },
   '& input': {
      border: 'none',
      outline: 'none',
      fontSize: '1.2rem',
      color: '#000',
      fontWeight: 'bold',
      width: '100%',
      padding: '5px 1rem',
      fontFamily: 'inherit',

      '&::placeholder': {
         fontFamily: 'inherit',
         fontWeight: '400',
         fontSize: '1.2rem',
      },
   },
}));

export default function SecondarySearchBar({
   onChangeVal,
   placeHolder,
   onSearch,
   sx,
}) {
   return (
      <Fragment>
         <SearchBox sx={{...sx}}>
            <input
               onChange={onChangeVal}
               placeholder={placeHolder || 'Search records...'}
               type='text'
               autoFocus
            />
            <SearchIconBox onClick={onSearch}>
               <SearchIcon />
            </SearchIconBox>
         </SearchBox>
      </Fragment>
   );
}
