import { Box, Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import Zoom from '@mui/material/Zoom';
import { SearchBox, SearchIconBox, Wrapper } from './animatedSearchBar.style';

const AnimatedSearchBar = ({ onChange, searchTerm, showStatus, ...rest }) => {
   const [showBar, setShowBar] = useState(false);

   return (
      <Wrapper {...rest}>
         {!showBar ? (
            <IconButton
               onClick={() => {
                  setShowBar(true);
                  showStatus(true);
               }}
            >
               <SearchIcon />
            </IconButton>
         ) : (
            <Zoom in={true}>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     my: '1rem',
                     width: '100%',
                  }}
               >
                  <SearchBox>
                     <Button
                        sx={{
                           bgcolor: '#fff',
                           color: '#616263',
                           px: 0,
                           minWidth: '45px',
                           borderRadius: 0,
                        }}
                        onClick={() => {
                           setShowBar(false);
                           showStatus(false);
                        }}
                     >
                        <ChevronLeftIcon style={{ width: '2rem' }} />
                     </Button>
                     <input
                        onChange={onChange}
                        type='text'
                        placeholder='Search...'
                        autoFocus
                        defaultValue={searchTerm}
                        value={searchTerm}
                     />
                     <SearchIconBox>
                        <SearchIcon />
                     </SearchIconBox>
                  </SearchBox>
               </Box>
            </Zoom>
         )}
      </Wrapper>
   );
};

export default AnimatedSearchBar;
