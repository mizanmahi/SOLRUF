import {
   Container,
   Grid,
   Typography,
   styled,
   Button,
   MenuItem,
   Checkbox,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import SliderWithImagePreview from '../../components/SliderWithCustomImagePreview/SliderWithImagePreview';
import classes from './EnquiryPage.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DatePicker from '../../components/Custom/DatePicker/DatePicker';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';

import ContactUsSvg from '../../media/Svg/ContactUs.svg';

import DownloadIcon from '@mui/icons-material/Download';

// table
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import BackToButton from '../../components/BackToButton/BackToButton';
import QuantityController from '../../components/QuantityController/QuantityController';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import SolrufTextField from '../../components/TextField/TextField';
import axios from 'axios';
import NextButton from '../../components/NextButton/NextButton';
import CompanyDetails from './CompanyDetails';
import Success from './Success';

const DocumentBox = styled(Box)(({ theme }) => ({
   borderRadius: '0.5rem',
   marginTop: '1rem',
   padding: '1rem',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const Circle = styled(Box)(({ theme }) => ({
   width: '100px',
   height: '100px',
   borderRadius: '50%',
   background: 'gray',
   marginRight: '8px',
}));

const TabPanelDoc = styled(Tabs)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      fontSize: '1rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
   },
   '& .Mui-selected': {
      fontWeight: 'bold',
      color: '#000000',
   },
   '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around',
   },
}));

const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   margin: '1rem 0',
}));
const ProductName = styled(Typography)(({ theme }) => ({
   fontWeight: '500',
   fontSize: '1.5rem',
   color: '#000000',
   textAlign: 'center',
   '& span': {
      color: '#3FB500',
      fontSize: '1rem',
   },
}));

const CircleBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   marginTop: theme.spacing(2),
}));

const EnquiryForm = styled(Box)(({ theme }) => ({
   padding: '1rem',
   borderRadius: '0.5rem',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
   '& h5': {
      fontWeight: 'bold',
   },
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));

const SolrufTextFieldGray = styled(SolrufTextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      background: '#f3f3f3',
   },
}));

const statesOfIndia = [
   { state: 'Maharashtra', label: 'Maharashtra' },
   { state: 'Delhi', label: 'Delhi' },
   { state: 'West Bengal', label: 'West Bengal' },
   { state: 'Chennai', label: 'Chennai' },
   { state: 'Madhya Pradesh', label: 'Madhya Pradesh' },
];

const EnquiryPage = () => {
   const [documentTab, setDocumentTab] = React.useState(0);
   const handleDocumentTabChange = (event, newValue) => {
      setDocumentTab(newValue);
      console.log(newValue);
   };

   const [quantity, setQuantity] = useState(0);
   const [date, setDate] = useState(new Date());

   const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: {
         pincode: '',
      },
   });

   const [watchPinCode] = watch(['pincode']);
   const [debouncedPinCode] = useDebounce(watchPinCode, 1000);

   console.log(debouncedPinCode);

   const [indiaState, setIndiaState] = useState('state');

   useEffect(() => {
      if (debouncedPinCode.length !== 6) return;
      const options = {
         method: 'POST',
         url: 'https://pincode.p.rapidapi.com/',
         headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'pincode.p.rapidapi.com',
            'x-rapidapi-key':
               '53d3e51015msh53a0f06a2fd9375p1c3484jsnd53c4f58cf42',
         },
         data: { searchBy: 'pincode', value: debouncedPinCode },
      };
      axios
         .request(options)
         .then(({ data }) => {
            console.log(data);
            setIndiaState(data[0].circle);
            setValue('state', 'hudai');
            console.log(data[0].circle);

            setValue('city', data[0].district);
            console.log(data[0].district);
         })
         .catch((error) => {
            console.log({ error });
         });
   }, [debouncedPinCode]);

   const handleStateChange = (e) => {
      console.log(e.target.value);
      setIndiaState(e.target.value);
   };

   const [accept, setAccept] = useState(true);
   const handleAcceptChange = (event) => {
      setAccept(event.target.checked);
   };

   const submitHandler = (data) => {
      console.log(data);
   };

   const [page, setPage] = useState(0);

   console.log({ errors });

   return (
      <Box sx={{ mb: 4 }}>
         <ProfileHeader />
         <Container maxWidth='xl' sx={{ mt: 1 }}>
            <Nav>
               <BackToButton>Back To Portfolio</BackToButton>
               <ProductName>
                  24-inch Solar Cables (10x Powerfull) fully ready <br /> to
                  Functional Power Cables <br />
                  <span>In Stock</span>
               </ProductName>
               <img src={ContactUsSvg} alt='' />
            </Nav>
            <Grid container spacing={5}>
               <Grid item xs={12} sm={5} md={5} lg={4}>
                  <Box sx={{ mb: 12 }}>
                     <SliderWithImagePreview />
                  </Box>

                  <Box sx={{ p: 1 }}>
                     <Typography
                        variant='h5'
                        sx={{ my: 1, textAlign: 'center' }}
                     >
                        Product Feature
                     </Typography>
                     <table className={classes.table}>
                        <tbody>
                           <tr>
                              <td style={{ padding: '.4rem' }}>Item !</td>
                              <td style={{ padding: '.4rem' }}>Item !</td>
                           </tr>
                           <tr>
                              <td style={{ padding: '.4rem' }}>Item !</td>
                              <td style={{ padding: '.4rem' }}>Item !</td>
                           </tr>
                           <tr>
                              <td style={{ padding: '.4rem' }}>Item !</td>
                              <td style={{ padding: '.4rem' }}>Item !</td>
                           </tr>
                           <tr>
                              <td style={{ padding: '.4rem' }}>Item !</td>
                              <td style={{ padding: '.4rem' }}>Item !</td>
                           </tr>
                        </tbody>
                     </table>

                     <Typography
                        textAlign='center'
                        sx={{ mt: 2, textDecoration: 'underline' }}
                     >
                        Read More
                     </Typography>
                  </Box>
               </Grid>

               <Grid item xs={12} sm={7} md={7} lg={8}>
                  <Box>
                     <EnquiryForm
                        component='form'
                        onSubmit={handleSubmit(submitHandler)}
                     >
                        {page === 0 && (
                           <>
                              {' '}
                              <Typography variant='h5'>
                                 Create an Enquiry
                              </Typography>
                              <Flex sx={{ mt: 2, mb: 2.5, }}>
                                 <Flex sx={{mr: 2}}>
                                    <Typography
                                       variant='h6'
                                       sx={{ mr: 4, color: '#4D4D4D' }}
                                    >
                                       Quantity
                                    </Typography>
                                    <QuantityController
                                       quantity={quantity}
                                       setQuantity={setQuantity}
                                    />
                                 </Flex>
                                 <DatePicker date={date} setDate={setDate} />
                              </Flex>
                              <Flex>
                                 <SolrufTextFieldGray
                                    sx={{ mr: 3 }}
                                    size='small'
                                    label='Pin Code'
                                    type='number'
                                    {...register('pincode', {
                                       required: {
                                          value: true,
                                          message: 'Pin code is Required',
                                       },
                                       minLength: {
                                          value: 6,
                                          message:
                                             'Pin code must be at least 6 characters',
                                       },
                                       maxLength: {
                                          value: 6,
                                          message:
                                             'Pin code must be at most 6 characters',
                                       },
                                    })}
                                    error={errors.pincode}
                                    helperText={
                                       errors.pincode
                                          ? errors.pincode.message
                                          : ' '
                                    }
                                 />
                                 <SolrufTextFieldGray
                                    select
                                    size='small'
                                    label='State'
                                    value={indiaState}
                                    onChange={handleStateChange}
                                    {...register('state', {
                                       required: {
                                          value: true,
                                          message: 'City is Required',
                                       },
                                    })}
                                    helperText={
                                       errors.state ? errors.state.message : ' '
                                    }
                                 >
                                    {statesOfIndia.map(({ state, label }) => (
                                       <MenuItem value={state}>
                                          {label}
                                       </MenuItem>
                                    ))}
                                 </SolrufTextFieldGray>
                              </Flex>
                              <Flex>
                                 <SolrufTextFieldGray
                                    sx={{ mb: 0.5 }}
                                    size='small'
                                    label='City / District'
                                    {...register('city', {
                                       required: {
                                          value: true,
                                          message: 'City is Required',
                                       },
                                    })}
                                    error={errors.city}
                                    helperText={
                                       errors.city ? errors.city.message : ' '
                                    }
                                 />
                              </Flex>
                              <Flex>
                                 <CustomTextArea
                                    style={{
                                       marginTop: 0,
                                       background: '#f3f3f3',
                                    }}
                                    {...register('address', {
                                       required: {
                                          value: true,
                                          message: 'address is Required',
                                       },
                                    })}
                                 />
                              </Flex>
                              <Flex
                                 sx={{ justifyContent: 'flex-start', my: 3 }}
                              >
                                 <Checkbox
                                    checked={accept}
                                    onChange={handleAcceptChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                 />
                                 <Typography sx={{ color: '#000000' }}>
                                    Accept Products from other Brand?
                                 </Typography>
                              </Flex>
                              <Flex sx={{ justifyContent: 'center' }}>
                                 <NextButton
                                    type='submit'
                                    sx={{ width: '50%' }}
                                    onClick={() => setPage(1)}
                                 >
                                    Next
                                 </NextButton>
                              </Flex>
                           </>
                        )}

                        {
                           page === 1 && (<CompanyDetails setPage={setPage} />)
                        }

                        {
                           page === 2 && (<Success />)
                        }
                     </EnquiryForm>

                     <CircleBox>
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                     </CircleBox>

                     <DocumentBox sx={{ mb: 5 }}>
                        <TabPanelDoc
                           value={documentTab}
                           onChange={handleDocumentTabChange}
                           centered
                           sx={{ background: '#F3F3F3' }}
                        >
                           <Tab label='Product Document' />
                           <Tab label='Warranty Card' />
                           <Tab label='Booking Document' />
                        </TabPanelDoc>
                        <Box sx={{ p: 2 }}>
                           {documentTab === 0 && (
                              <Box sx={{ width: '70%' }}>
                                 <Button
                                    endIcon={<DownloadIcon />}
                                    color='secondary'
                                    variant='contained'
                                    sx={{ mr: 1, mb: 1 }}
                                 >
                                    Document Name
                                 </Button>
                                 <Button
                                    endIcon={<DownloadIcon />}
                                    color='secondary'
                                    variant='contained'
                                    sx={{ mr: 1, mb: 1 }}
                                 >
                                    Document Name
                                 </Button>
                                 <Button
                                    endIcon={<DownloadIcon />}
                                    color='secondary'
                                    variant='contained'
                                    sx={{ mr: 1, mb: 1 }}
                                 >
                                    Document Name
                                 </Button>
                                 <Typography variant='body2' sx={{ mt: 2 }}>
                                    <strong>Description: </strong> Lorem ipsum,
                                    dolor sit amet consectetur adipisicing elit.
                                    Eius at suscipit aspernatur distinctio
                                    magnam vero culpa iste? At ullam optio
                                    laboriosam non culpa, dolores quos amet, ut
                                    soluta voluptatum corporis.
                                 </Typography>
                              </Box>
                           )}
                           {documentTab === 1 && (
                              <Box>
                                 <Button
                                    endIcon={<DownloadIcon />}
                                    color='secondary'
                                    variant='contained'
                                    sx={{ mr: 1 }}
                                 >
                                    Document Name
                                 </Button>

                                 <Typography variant='body2' sx={{ mt: 2 }}>
                                    <strong>Description: </strong> Lorem ipsum,
                                    dolor sit amet consectetur adipisicing elit.
                                    Eius at suscipit aspernatur distinctio
                                    magnam vero culpa iste? At ullam optio
                                    laboriosam non culpa, dolores quos amet, ut
                                    soluta voluptatum corporis.
                                 </Typography>
                              </Box>
                           )}
                        </Box>
                     </DocumentBox>
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default EnquiryPage;
