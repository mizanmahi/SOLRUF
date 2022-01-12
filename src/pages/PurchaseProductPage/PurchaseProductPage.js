import {
   Container,
   Grid,
   Typography,
   styled,
   Radio,
   Button,
} from '@mui/material';
import { Box, fontSize } from '@mui/system';
import React, { useState } from 'react';
import SliderWithImagePreview from '../../components/SliderWithCustomImagePreview/SliderWithImagePreview';
import classes from './PurchaseProductPage.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import DownloadIcon from '@mui/icons-material/Download';

// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import YellowButton from '../../components/YellowButton/YellowButton';
import ProductDetailList from '../../components/ProductDetailList/ProductDetailList';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';

const PurchaseBookBox = styled(Box)(({ theme }) => ({
   // backgroundColor: theme.palette.primary.main,
   borderRadius: '0.5rem',
   marginTop: '2rem',
   padding: '1rem',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const DocumentBox = styled(Box)(({ theme }) => ({
   borderRadius: '0.5rem',
   marginTop: '1rem',
   padding: '1rem',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const QuantityBox = styled(Box)(({ theme }) => ({
   minWidth: '200px',
   // background: '#f8f8f8',
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'center',
   margin: '2rem 0',
   '& input': {
      maxWidth: '60px',
      border: '2px solid #4D4D4D',
      borderRadius: '5px',
      minHeight: '32px',
   },
   '& svg': {
      border: `2px solid ${theme.palette.primary.main}`,
      marginLeft: '5px',
      borderRadius: '5px',
      cursor: 'pointer',
   },
}));

const Circle = styled(Box)(({ theme }) => ({
   width: '100px',
   height: '100px',
   borderRadius: '50%',
   background: 'gray',
   marginRight: '8px',
}));

const TabPanel = styled(Tabs)(({ theme }) => ({
   '& .MuiButtonBase-root': {
      fontSize: '1.2rem',
      paddingLeft: '3rem',
      paddingRight: '3rem',
   },
   '& .Mui-selected': {
      fontWeight: 'bold',
      color: '#000000',
   },
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
   }
}));

function createData(name, calories, fat, carbs, protein) {
   return { name, calories, fat, carbs, protein };
}

const rows = [
   createData('Quality', 159, 6.0, 24, 4.0),
   createData('Discount', 237, 9.0, 37, 4.3),
   createData('Price per pay', 262, 16.0, 24, 6.0),
];

const PurchaseProductPage = () => {
   const [tab, setTab] = React.useState(0);
   const [documentTab, setDocumentTab] = React.useState(0);
   const [quantity, setQuantity] = useState(0);

   const handleChange = (event, newValue) => {
      setTab(newValue);
      console.log(newValue);
   };
   const handleDocumentTabChange = (event, newValue) => {
      setDocumentTab(newValue);
      console.log(newValue);
   };

   const handleQuantityChange = (e) => {
      setQuantity(+e.target.value);
   };

   const handleQuantityIncrease = () => {
      setQuantity((prev) => prev + 1);
   };

   const handleQuantityDecrease = () => {
      if (quantity === 0) {
         return;
      }
      setQuantity((prev) => prev - 1);
   };

   return (
      <div>
         <Container maxWidth='xl'>
            <Grid container spacing={3}>
               <Grid item xs={12} sm={5} md={5}>
                  <Box sx={{ mb: 12 }}>
                     <SliderWithImagePreview />
                  </Box>

                  <Box sx={{ p: 1, }}>
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
               <Grid item xs={12} sm={7} md={7}>
                  <Box>
                     <Typography variant='h4'>
                        24 Inch Solar cables (10x Powerful) Fully Ready To
                        Functional Power Cable
                     </Typography>

                     <PurchaseBookBox>
                        <Box sx={{ width: '100%' }}>
                           <TabPanel
                              value={tab}
                              onChange={handleChange}
                              centered
                              sx={{ background: '#F3F3F3', borderRadius: 1.5 }}
                           >
                              <Tab label='Purchase' />
                              <Tab label='Book' />
                           </TabPanel>
                        </Box>
                        {tab === 0 && (
                           <Box>
                              <ProductDetailList
                                 list='Stock Availability: -'
                                 description='400 Pieces / 20 KW'
                                 hand={true}
                                 sx={{ my: 4 }}
                              />
                              <TableContainer component={Box} sx={{ mt: 1 }}>
                                 <Table
                                    sx={{ width: '725px', minWidth: 600 }}
                                    aria-label='simple table'
                                 >
                                    <TableHead>
                                       <TableRow>
                                          <TableCell
                                             align='left'
                                             sx={{
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                             }}
                                          >
                                             Selected
                                          </TableCell>
                                          <TableCell
                                             align='right'
                                             sx={{
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                             }}
                                          >
                                             Quantity
                                          </TableCell>
                                          <TableCell
                                             align='right'
                                             sx={{
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                             }}
                                          >
                                             Discount
                                          </TableCell>
                                          <TableCell
                                             align='right'
                                             sx={{
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                             }}
                                          >
                                             Price per day
                                          </TableCell>
                                       </TableRow>
                                    </TableHead>
                                    <TableBody>
                                       {rows.map((row) => (
                                          <TableRow
                                             key={row.name}
                                             sx={{
                                                '&:last-child td, &:last-child th':
                                                   {
                                                      border: 0,
                                                   },
                                             }}
                                          >
                                             <TableCell
                                                component='th'
                                                scope='row'
                                                align='left'
                                             >
                                                <Radio
                                                   value='a'
                                                   checked={
                                                      quantity >= 2 &&
                                                      quantity <= 3
                                                   }
                                                   name='radio-buttons'
                                                   inputProps={{
                                                      'aria-label': 'A',
                                                   }}
                                                />
                                             </TableCell>
                                             <TableCell
                                                component='th'
                                                scope='row'
                                                align='right'
                                             >
                                                2 - 3
                                             </TableCell>
                                             <TableCell align='right'>
                                                {row.calories}
                                             </TableCell>
                                             <TableCell align='right'>
                                                Rs. 560005
                                             </TableCell>
                                          </TableRow>
                                       ))}
                                    </TableBody>
                                 </Table>
                              </TableContainer>
                              <Typography variant='h5' sx={{ mt: 2 }}>
                                 Rs: 5600
                              </Typography>
                              <Typography variant='h6'>
                                 <span style={{ color: 'green' }}>GST 5%</span>{' '}
                                 at RST 75000
                              </Typography>
                           </Box>
                        )}

                        {tab === 1 && (
                           <Box sx={{ mt: 3 }}>
                              <ProductDetailList
                                 list='Booking Period'
                                 description='15 Days / Month'
                                 hand={true}
                              />
                              <ProductDetailList
                                 list='Advance Payment'
                                 description='20% Off order value'
                                 hand={true}
                              />
                              <ProductDetailList
                                 list='Booking Price Per Watt'
                                 description='Pune'
                                 hand={true}
                              />
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    my: 2,
                                 }}
                              >
                                 <Box>
                                    <Typography variant='h5' sx={{ mt: 2 }}>
                                       Rs: 5600
                                    </Typography>
                                    <Typography variant='h6'>
                                       <span style={{ color: 'green' }}>
                                          GST 5%
                                       </span>{' '}
                                       at RST 75000
                                    </Typography>
                                 </Box>
                                 <Box>
                                    <Typography variant='h5' sx={{ mt: 2 }}>
                                       Rs: 5600
                                    </Typography>
                                    <Typography variant='h6'>
                                       <span style={{ color: 'green' }}>
                                          GST 5%
                                       </span>{' '}
                                       at RST 75000
                                    </Typography>
                                 </Box>
                              </Box>
                           </Box>
                        )}

<QuantityBox>
                           <Typography
                              variant='body1'
                              color='gray'
                              sx={{ mr: 5 }}
                           >
                              Quantity
                           </Typography>
                           <input
                              type='number'
                              value={quantity}
                              onChange={handleQuantityChange}
                           />
                           <PlusIcon
                              style={{
                                 width: '30px',
                                 boxSizing: 'content-box',
                                 padding: '0 .7rem',
                              }}
                              onClick={handleQuantityIncrease}
                           />
                           <MinusIcon
                              style={{
                                 width: '30px',
                                 boxSizing: 'content-box',
                                 padding: '0 .7rem',
                              }}
                              onClick={handleQuantityDecrease}
                           />
                        </QuantityBox>
                        <Typography
                           variant='body1'
                           textAlign='center'
                           sx={{ color: 'red' }}
                        >
                           Error Happened
                        </Typography>
                        <YellowButton
                           style={{ width: '100%', marginTop: '1rem' }}
                        >
                           Purchase Now
                        </YellowButton>
                     </PurchaseBookBox>

                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'center',
                           mt: 2,
                        }}
                     >
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                     </Box>

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
      </div>
   );
};

export default PurchaseProductPage;
