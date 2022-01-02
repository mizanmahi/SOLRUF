import {
   Button,
   Container,
   Grid,
   styled,
   TextField,
   Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const SearchProductWrapper = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   padding: theme.spacing(2),
   borderRadius: theme.shape.borderRadius,
}));

const Nav = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: theme.spacing(1),
}));

const ButtonNext = styled(Button)(({ theme }) => ({
   background: theme.palette.primary.main,
   padding: '0.5rem 1rem',
}));

const SearchArea = styled('div')(({ theme }) => ({
   marginTop: theme.spacing(2),
}));

const FilterArea = styled('div')(({ theme }) => ({
   background: '#ffffff',
   padding: theme.spacing(3),
   borderRadius: theme.shape.borderRadius,
   overflowY: 'auto',
   maxHeight: 'calc(100vh - 400px)',
}));

const ProductArea = styled('div')(({ theme }) => ({
   borderRadius: theme.shape.borderRadius,
   overflowY: 'auto',
   maxHeight: 'calc(100vh - 400px)',
}));

const SearchProduct = () => {
   const [category, setCategory] = useState('');

   const handleChange = (event) => {
      setCategory(event.target.value);
   };

   const [inverterType, setInverterType] = useState('on-grid');

   const handleInverterChange = (event) => {
      setInverterType(event.target.value);
   };

   const [currentType, setCurrentType] = useState('ac');

   const handleCurrentChange = (event) => {
        setCurrentType(event.target.value);
   };

   return (
      <SearchProductWrapper>
         <Container maxWidth='xl'>
            <Nav>
               <Button startIcon={<ArrowBackIcon />} sx={{ color: '#4D4D4D' }}>
                  Back To Project
               </Button>
               <ButtonNext
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: '#4D4D4D' }}
               >
                  Next
               </ButtonNext>
            </Nav>
            <SearchArea>
               <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                     <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                           <InputLabel id='demo-simple-select-label'>
                              Select category
                           </InputLabel>
                           <Select
                              labelId='demo-simple-select-label'
                              value={category}
                              label='Select category'
                              onChange={handleChange}
                           >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                           </Select>
                        </FormControl>
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                           <InputLabel id='demo-simple-select-label'>
                              Select Subcategory
                           </InputLabel>
                           <Select
                              labelId='demo-simple-select-label'
                              value={category}
                              label='Select Subcategory'
                              onChange={handleChange}
                           >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                           </Select>
                        </FormControl>
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        label='Search Products Example:- 550W Solar Panel, Solar Cooker...'
                        fullWidth
                     ></TextField>
                  </Grid>
               </Grid>
            </SearchArea>

            {/* ================== content area ================== */}

            <Grid container spacing={2} sx={{ mt: 1 }}>
               <Grid item xs={12} md={4} lg={3}>
                  <FilterArea>
                     <Typography variant='body2' color='gray'>
                        Items
                     </Typography>
                     <Typography variant='body1' sx={{mb: 1}} >Inverter Type</Typography>
                     <FormControl component='fieldset'>
                        {/* <FormLabel component='legend'>Gender</FormLabel> */}
                        <RadioGroup
                           aria-label='gender'
                           name='controlled-radio-buttons-group'
                           value={inverterType}
                           onChange={handleInverterChange}
                        >
                           <FormControlLabel
                              value='on-grid'
                              control={<Radio />}
                              label='On-Grid (502)'
                              sx={{ mb: 0 }}
                           />
                           <FormControlLabel
                              value='off-grid'
                              control={<Radio />}
                              label='Off-Grid (502)'
                           />
                        </RadioGroup>
                     </FormControl>
                     {/* ======= current type radio buttons ====== */}
                     <Typography variant='body2' color='gray'>
                        Items
                     </Typography>
                     <Typography variant='body1' sx={{mb: 1}} >Current Type</Typography>
                     <FormControl component='fieldset'>
                        {/* <FormLabel component='legend'>Gender</FormLabel> */}
                        <RadioGroup
                           aria-label='current type'
                           name='controlled-radio-buttons-group'
                           value={currentType}
                           onChange={handleCurrentChange}
                        >
                           <FormControlLabel
                              value='ac'
                              control={<Radio />}
                              label='AC(202)'
                              sx={{ mb: 0 }}
                           />
                           <FormControlLabel
                              value='dc'
                              control={<Radio />}
                              label='DC(80)'
                           />
                        </RadioGroup>
                     </FormControl>
                     <Typography variant='body2' color='gray'>
                        Items
                     </Typography>
                     <Typography variant='body1' sx={{mb: 1}} >Capacity Range</Typography>
                  </FilterArea>
               </Grid>
               <Grid item xs={12} md={8} lg={9}>
                    <ProductArea>
                        <Typography variant='body2' sx={{mb: 1}} >Total (150 Results)</Typography>
                        {/* ======= product list ====== */}
                        {
                            [...Array(10)].map((item, index) => (<Typography sx={{p: 2, background: '#fff', mb: .5}}>Product #{index}</Typography>))
                        }
                    </ProductArea>
               </Grid>
            </Grid>
         </Container>
      </SearchProductWrapper>
   );
};

export default SearchProduct;
