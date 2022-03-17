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
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import CustomizeProduct from '../CustomizeProduct/CustomizeProduct';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FinalizeProduct from '../FinalizeProduct/FinalizeProduct';
import useCategories from '../../hooks/useCategories';
import { useForm } from 'react-hook-form';
import { Radio } from '@mui/material';
import SolrufRadio from '../../components/Radio/Radio';

const SearchProductWrapper = styled('div')(({ theme }) => ({
   background: theme.palette.primary.light,
   padding: theme.spacing(2),
   borderRadius: theme.shape.borderRadius,
   marginTop: theme.spacing(6),
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

const CustomAccordion = styled(Accordion)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      borderBottom: '1px solid gray',
   },
   '& .MuiRadio-root': {
      border: 0,
   },
}));

const inverterTypes = [
   {
      value: 'on-grid',
      label: 'On Grid (502)',
   },
   {
      value: 'off-grid',
      label: 'Off Grid (502)',
   },
];
const currentTypes = [
   {
      value: 'ac',
      label: 'Ac (202)',
   },
   {
      value: 'dc',
      label: 'Dc (80',
   },
];

const SearchProduct = ({ showProductPageHandler }) => {
   const [searchProductPage, setSearchProductPage] = useState(true);
   const [customizeProductPage, setCustomizeProductPage] = useState(false);
   const [finalizingProductPage, setFinalizingProductPage] = useState(false);
   const nextHandler = (pageNumber) => {
      if (pageNumber === 1) {
         setSearchProductPage(false);
         setCustomizeProductPage(true);
         setFinalizingProductPage(false);
      }else if(pageNumber === 2){
         setSearchProductPage(false);
         setCustomizeProductPage(false);
         setFinalizingProductPage(true);
      }else if(pageNumber === 3){
         setSearchProductPage(true);
         setCustomizeProductPage(false);
         setFinalizingProductPage(false);
         
      }
      
   }

   const [invertFilterOpen, setInvertFilerOpen] = useState(true);
   const [currentFilterOpen, setCurrentFilterOpen] = useState(false);
   const [currentMin, setCurrentMin] = useState();
   const [currentMax, setCurrentMax] = useState();

   const {
      register,
      reset,
      setValue,
      watch,
      formState: { errors },
   } = useForm();

   const { categories } = useCategories('product');
   const [watchCategoryId] = watch(['category']);

   const { subCategories } = useCategories('product', watchCategoryId);

   const [inverterType, setInverterType] = useState('on-grid');

   const handleInverterChange = (event) => {
      setInverterType(event.target.value);
   };

   const [currentType, setCurrentType] = useState('ac');

   const handleCurrentChange = (event) => {
      setCurrentType(event.target.value);
   };

   const handleCurrentMinChange = (event) => {
      setCurrentMin(event.target.value);
   };
   const handleCurrentMaxChange = (event) => {
      setCurrentMin(event.target.value);
   };

   

   return (
      <motion.div
         initial={{ x: '10vw', opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.1 }}
      >
         {searchProductPage && (
            <SearchProductWrapper>
               <Container maxWidth='xl'>
                  <Nav>
                     <Button
                        startIcon={<ArrowBackIcon />}
                        sx={{ color: '#4D4D4D' }}
                        onClick={showProductPageHandler}
                     >
                        Back To Products
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
                                    // value={category}
                                    // onChange={handleChange}
                                    label='Select category'
                                    sx={{ background: '#fff' }}
                                    {...register('category', {
                                       required: {
                                          value: true,
                                          message: 'Select Category',
                                       },
                                    })}
                                 >
                                    {categories.length > 0 &&
                                       categories.map(
                                          ({ category_id, name }) => (
                                             <MenuItem
                                                value={category_id}
                                                key={category_id}
                                             >
                                                {name}
                                             </MenuItem>
                                          )
                                       )}
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
                                    // value={category}
                                    // onChange={handleChange}
                                    label='Select Subcategory'
                                    sx={{ background: '#fff' }}
                                    {...register('subCategory', {
                                       required: {
                                          value: true,
                                          message: 'Select Sub Category',
                                       },
                                    })}
                                 >
                                    {subCategories.length > 0 &&
                                       subCategories.map(
                                          ({ category_id, name }) => (
                                             <MenuItem
                                                value={category_id}
                                                key={category_id}
                                             >
                                                {name}
                                             </MenuItem>
                                          )
                                       )}
                                 </Select>
                              </FormControl>
                           </Box>
                        </Grid>
                        <Grid item xs={12}>
                           <TextField
                              label='Search Products Example:- 550W Solar Panel, Solar Cooker...'
                              fullWidth
                              sx={{ background: '#fff' }}
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
                              onClick={() =>
                                 setInvertFilerOpen(!invertFilterOpen)
                              }
                           >
                              <AccordionSummary
                                 expandIcon={<ExpandMoreIcon />}
                                 aria-controls='panel2a-content'
                                 id='panel2a-header'
                              >
                                 <Typography>Inverter Type</Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ pt: 3 }}>
                                 <SolrufRadio
                                    handleChange={handleInverterChange}
                                    values={inverterTypes}
                                    value={inverterType}
                                 />
                              </AccordionDetails>
                           </CustomAccordion>
                           <CustomAccordion
                              disableGutters
                              elevation={0}
                              expanded={currentFilterOpen}
                              onClick={() =>
                                 setCurrentFilterOpen(!currentFilterOpen)
                              }
                           >
                              <AccordionSummary
                                 expandIcon={<ExpandMoreIcon />}
                                 aria-controls='panel2a-content'
                                 id='panel2a-header'
                              >
                                 <Typography>Current Type</Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ pt: 3 }}>
                                 <SolrufRadio
                                    handleChange={handleCurrentChange}
                                    values={currentTypes}
                                    value={currentType}
                                 />
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
                                       type='number'
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
                                       type='number'
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
                                    <FormControl sx={{ width: '80px' }}>
                                       <InputLabel id='demo-simple-select-label'>
                                          Min
                                       </InputLabel>
                                       <Select
                                          labelId='demo-simple-select-label'
                                          id='demo-simple-select'
                                          value={currentMin}
                                          label='Age'
                                          onChange={handleCurrentMinChange}
                                       >
                                          <MenuItem value={100}>100</MenuItem>
                                          <MenuItem value={200}>200</MenuItem>
                                          <MenuItem value={300}>300</MenuItem>
                                       </Select>
                                    </FormControl>
                                    {/* <FancyLine>------------</FancyLine> */}
                                    <img
                                       src='https://i.ibb.co/30b6gXk/Vector-3.png'
                                       alt='line'
                                       style={{ flexGrow: 1 }}
                                    />
                                    <FormControl sx={{ width: '80px' }}>
                                       <InputLabel id='demo-simple-select-label'>
                                          Max
                                       </InputLabel>
                                       <Select
                                          labelId='demo-simple-select-label'
                                          id='demo-simple-select'
                                          value={currentMax}
                                          label='Age'
                                          onChange={handleCurrentMaxChange}
                                       >
                                          <MenuItem value={200}>200</MenuItem>
                                          <MenuItem value={350}>350</MenuItem>
                                          <MenuItem value={600}>600</MenuItem>
                                       </Select>
                                    </FormControl>
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
                              <Typography
                                 key={index}
                                 sx={{ p: 2, background: '#fff', mb: 0.5 }}
                              >
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

                  <Box
                     sx={{
                        maxWidth: '1000px',
                        width: '100%',
                        margin: '5rem auto',
                     }}
                  >
                     <SingleProduct />
                  </Box>
                  <ButtonNext
                     // component={Link}
                     // to='/customizeProduct'
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
                     onClick={() => nextHandler(1)}
                  >
                     Next
                  </ButtonNext>
               </Container>
            </SearchProductWrapper>
         )}

         {/* ======= customize product ====== */}
         {customizeProductPage && <CustomizeProduct nextHandler={nextHandler} />}
         {finalizingProductPage && <FinalizeProduct nextHandler={nextHandler} />}
      </motion.div>
   );
};

export default SearchProduct;
