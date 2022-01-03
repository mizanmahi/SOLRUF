import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   Container,
   Grid,
   Pagination,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import { Link } from 'react-router-dom';

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
   height: 'calc(100vh - 400px)',
}));

const ProductArea = styled('div')(({ theme }) => ({
   borderRadius: theme.shape.borderRadius,
   overflowY: 'auto',
   maxHeight: 'calc(100vh - 400px)',
}));

const FancyLine = styled('div')(({ theme }) => ({
   color: `${theme.palette.primary.main}`,
   fontWeight: 'bold',
   position: 'relative',
   flexGrow: 1,
   height: '5px',
   background: `linear-gradient(to right, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
   '&::before': {
      content: '""',
      display: 'block',
      width: '1rem',
      height: '1rem',
      transform: 'rotate(45deg) translateY(-60%)',
      background: theme.palette.primary.main,
      top: '50%',
      left: '-6%',
      position: 'absolute',
   },
   '&::after': {
      content: '""',
      display: 'block',
      width: '1rem',
      height: '1rem',
      top: '50%',
      transform: 'rotate(45deg) translateY(-60%)',
      background: theme.palette.primary.main,
      left: '96%',
      position: 'absolute',
      zIndex: 100,
   },
}));

const CustomAccordion = styled(Accordion)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      borderBottom: '1px solid gray',
   },
   '& .MuiRadio-root': {
      border: 0,
   },
}));

const SearchProduct = () => {
   const [category, setCategory] = useState('');
   const [invertFilterOpen, setInvertFilerOpen] = useState(true);
   const [currentFilterOpen, setCurrentFilterOpen] = useState(false);

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
                  sx={{
                     color: '#4D4D4D',
                     '&:hover': {
                        background: '#fff',
                     },
                  }}
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
                     <CustomAccordion
                        disableGutters
                        elevation={0}
                        expanded={invertFilterOpen}
                        onClick={() => setInvertFilerOpen(!invertFilterOpen)}
                     >
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls='panel2a-content'
                           id='panel2a-header'
                        >
                           <Typography>Inverter Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 3 }}>
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
                                    control={
                                       <Radio sx={{ boxShadow: 'none' }} />
                                    }
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
                        </AccordionDetails>
                     </CustomAccordion>
                     <CustomAccordion
                        disableGutters
                        elevation={0}
                        expanded={currentFilterOpen}
                        onClick={() => setCurrentFilterOpen(!currentFilterOpen)}
                     >
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls='panel2a-content'
                           id='panel2a-header'
                        >
                           <Typography>Current Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 3 }}>
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
                        </AccordionDetails>
                     </CustomAccordion>

                     {/* ======= current type radio buttons ====== */}
                     <CustomAccordion disableGutters elevation={0}>
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls='panel2a-content'
                           id='panel2a-header'
                        >
                           <Typography>Power Capacity</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 3 }}>
                           <Box
                              sx={{
                                 width: '100%',
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 alignItems: 'center',
                              }}
                           >
                              <TextField
                                 id='filled-basic'
                                 label='Min'
                                 variant='filled'
                                 sx={{ width: '80px' }}
                                 defaultValue='150'
                              />
                              {/* <FancyLine>------------</FancyLine> */}
                              <img
                                 src='https://i.ibb.co/30b6gXk/Vector-3.png'
                                 alt='line'
                                 style={{ flexGrow: 1 }}
                              />
                              <TextField
                                 id='filled-basic'
                                 label='Max'
                                 variant='filled'
                                 sx={{ width: '80px' }}
                                 defaultValue='250'
                              />
                           </Box>
                        </AccordionDetails>
                     </CustomAccordion>
                     <CustomAccordion disableGutters elevation={0}>
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls='panel2a-content'
                           id='panel2a-header'
                        >
                           <Typography>Current Capacity</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 3 }}>
                           <Box
                              sx={{
                                 width: '100%',
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 alignItems: 'center',
                              }}
                           >
                              <TextField
                                 id='filled-basic'
                                 label='Min'
                                 variant='filled'
                                 sx={{ width: '90px' }}
                                 defaultValue='100W'
                              />
                              {/* <FancyLine>------------</FancyLine> */}
                              <img
                                 src='https://i.ibb.co/30b6gXk/Vector-3.png'
                                 alt='line'
                                 style={{ flexGrow: 1 }}
                              />
                              <TextField
                                 id='filled-basic'
                                 label='Max'
                                 variant='filled'
                                 sx={{ width: '90px' }}
                                 defaultValue='1500KW'
                              />
                           </Box>
                        </AccordionDetails>
                     </CustomAccordion>
                  </FilterArea>
               </Grid>
               <Grid item xs={12} md={8} lg={9}>
                  <ProductArea>
                     <Typography variant='body2' sx={{ mb: 1 }}>
                        Total (150 Results)
                     </Typography>
                     {/* ======= product list ====== */}
                     {[...Array(10)].map((item, index) => (
                        <Typography sx={{ p: 2, background: '#fff', mb: 0.5 }}>
                           Product #{index}
                        </Typography>
                     ))}
                  </ProductArea>
                  <Pagination
                     count={10}
                     color='primary'
                     shape='rounded'
                     sx={{ '& ul': { justifyContent: 'center' }, mt: 2 }}
                  />
               </Grid>
            </Grid>
            <Box sx={{ maxWidth: '1000px', width: '100%', margin: '5rem auto'}}>
               <SingleProduct />
            </Box>
            <ButtonNext
            component={Link}
            to='/customizeProduct'
               endIcon={<ArrowForwardIcon />}
               sx={{
                  color: '#4D4D4D',
                  mx: 'auto',
                  display: 'flex',
                  minWidth: 250,
                  maxWidth: 250,
                  my: 2,
                  '&:hover': {
                     background: '#fff',
                  },
                  
               }}
            >
               Next
            </ButtonNext>
         </Container>
      </SearchProductWrapper>
   );
};

export default SearchProduct;
