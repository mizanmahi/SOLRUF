import { Alert, Grid, Modal, Snackbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ProductDetailList from '../../../components/ProductDetailList/ProductDetailList';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import YellowButton from '../../../components/YellowButton/YellowButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { increase } from '../../../redux/slices/counterSlice';
import SliderWIthThumbnail from '../../../components/SliderWIthThumbnail/SliderWIthThumbnail';
import { useNavigate } from 'react-router';

const RArrow = styled('div')({
   background: 'transparent',
   '&:before': {
      content: `url('https://i.ibb.co/kDYc610/arrow-forward-2.png') !important`,
   },
});
const LArrow = styled('div')({
   background: 'transparent',
   '&:before': {
      content: `url('https://i.ibb.co/Xz03g4r/arrow-forward-2.png') !important`,
      marginLeft: '-14px !important',
   },
   zIndex: '100',
});

const RightArrow = (props) => {
   const { className, style, onClick } = props;
   const clickHandler = (e) => {
      e.stopPropagation();
      onClick();
   };
   return (
      <RArrow
         className={className}
         style={{ ...style, display: 'block' }}
         onClick={clickHandler}
      ></RArrow>
   );
};
const LeftArrow = (props) => {
   const { className, style, onClick } = props;
   const clickHandler = (e) => {
      e.stopPropagation();
      onClick();
   };
   return (
      <LArrow
         className={className}
         style={{ ...style, display: 'block' }}
         onClick={clickHandler}
      ></LArrow>
   );
};

const settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   nextArrow: <RightArrow />,
   prevArrow: <LeftArrow margin='normal' />,
};

const modalStyles = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '60%',
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
};

const BookProduct = ({ editDelete, noModal, style, bookingOn }) => {
   const [open, setOpen] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleModalOpen = () => {
      if (noModal) return;
      setOpen(true);
   };

   const handleModalClose = (e) => {
      e.stopPropagation();
      setOpen(false);
   };
   console.log(editDelete);

   const [openSnackbar, setOpenSnackBar] = React.useState(false);

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpenSnackBar(false);
   };

   const addToCartHandler = (e) => {
      e.stopPropagation();
      dispatch(increase());
      setOpenSnackBar(true);
   };

   const images = [
      'https://i.ibb.co/rpjvXbN/project2.png',
      'https://i.ibb.co/Btf6tbT/project3.png',
      'https://i.ibb.co/wMbGYm4/project1.png',
   ];

   return (
      <>
         <Box
            sx={{
               bgcolor: '#ffffff',
               p: 5.5,
               borderRadius: 5,
               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
               cursor: 'pointer',
               position: 'relative',
            }}
            style={{ ...style }}
            // onClick={handleModalOpen}
         >
            <Slider {...settings}>
               <Box sx={{ borderRadius: 10, width: '100%' }}>
                  <img
                     src='https://i.ibb.co/rpjvXbN/project2.png'
                     alt=''
                     style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                     }}
                  />
               </Box>
               <Box>
                  <img
                     src='https://i.ibb.co/wMbGYm4/project1.png'
                     alt=''
                     style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                     }}
                  />
               </Box>
               <Box>
                  <img
                     src='https://i.ibb.co/Btf6tbT/project3.png'
                     alt=''
                     style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                     }}
                  />
               </Box>
            </Slider>
            <Box sx={{ mt: 5 }}>
               <Typography variant='h5'>4 Inch Solar Cable</Typography>

               <ProductDetailList
                  list='Price/Watt'
                  description='Rs 256/sq.ft.'
               />
               <ProductDetailList
                  list='Price Of Panel'
                  description='Rs 2500000'
               />
               <ProductDetailList
                  list='Power Capacity'
                  description='1024 Watts'
               />
               <ProductDetailList
                  list='Inverter Type'
                  description='Offgrid/ongrid'
                  hand='hand'
               />
               {!editDelete && (
                  <ProductDetailList
                     list='Location'
                     description='Jaipur'
                     hand='hand'
                  />
               )}

               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     mt: 5,
                  }}
               >
                  {!editDelete ? (
                     <YellowButton
                        style={{ flexGrow: 1 }}
                        onClick={() => navigate('/purchaseProduct')}
                     >
                        Purchase
                     </YellowButton>
                  ) : (
                     <>
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}
                        >
                           <YellowButton
                              style={{
                                 border: '2px solid #FFD05B',
                                 color: '#4D4D4D',
                                 background: '#fff',
                                 padding: '.7rem 1.5rem',
                                 marginRight: '.5rem',
                              }}
                           >
                              {' '}
                              <EditIcon /> Edit
                           </YellowButton>
                           <YellowButton
                              style={{
                                 border: '2px solid red',
                                 color: 'red',
                                 background: '#fff',
                                 padding: '.6rem 1.5rem',
                              }}
                           >
                              {' '}
                              <DeleteIcon /> Delete
                           </YellowButton>
                        </Box>
                     </>
                  )}
               </Box>
               <img
                  src={`${
                     bookingOn
                        ? 'https://i.ibb.co/YNmYkyg/Frame-169-1.png'
                        : 'https://i.ibb.co/PDPmLL2/sale-1-1.png'
                  }`}
                  alt=''
                  style={{ position: 'absolute', top: '3%' }}
               />
            </Box>
            {/*  ================== Modal Start ================== */}
            <Modal
               open={open}
               onClose={handleModalClose}
               aria-labelledby='modal-modal-title'
               aria-describedby='project details modal'
               sx={{
                  '& .MuiBackdrop-root': {
                     backdropFilter: 'blur(10px)',
                  },
               }}
            >
               <Box
                  sx={{
                     ...modalStyles,
                     overflowY: 'auto',
                     height: '95%',
                     borderRadius: 2,
                     bgcolor: '#F3F3F3',
                  }}
               >
                  <CloseIcon
                     style={{
                        position: 'absolute',
                        right: '3%',
                        top: '3%',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                     }}
                     onClick={handleModalClose}
                  />
                  <Box>
                     <Typography
                        variant='h5'
                        textAlign='center'
                        fontWeight={600}
                     >
                        Product Enquiry
                     </Typography>
                     <hr />
                  </Box>
                  <Box sx={{ mb: 4 }}>
                     <Grid container spacing={5} alignItems='center'>
                        <Grid item md={12} lg={4}>
                           {/* ================== Slider with  thumbnail */}
                           <Box sx={{ maxWidth: '450px', p: 2 }}>
                              <SliderWIthThumbnail images={images} loop={false} sliderPerView={images.length} />
                           </Box>
                        </Grid>
                        {/*  === description list start === */}
                        <Grid item md={12} lg={8}>
                           <Box>
                              <Typography variant='h5' fontWeight={500}>
                                 24-inch Solar Cables (10x Powerful) fully ready
                                 to Functional Power Cables
                              </Typography>
                              {/* ====== Nested Grid Start ====== */}
                              <Grid container item spacing={2}>
                                 <Grid item sm={6}>
                                    <ProductDetailList
                                       list='Price/Watt'
                                       description='Rs 256/sq.ft.'
                                    />
                                    <ProductDetailList
                                       list='Price Of Panel'
                                       description='Rs 2500000'
                                    />
                                    <ProductDetailList
                                       list='Power Capacity'
                                       description='1024 Watts'
                                    />
                                 </Grid>
                                 <Grid item sm={6}>
                                    <ProductDetailList
                                       list='Inverter Type'
                                       description='Offgrid/ongrid'
                                       hand='hand'
                                    />
                                    <ProductDetailList
                                       list='Location'
                                       description='Jaipur'
                                       hand='hand'
                                    />
                                    <ProductDetailList
                                       list='Company'
                                       description='Amaron'
                                       hand='hand'
                                    />
                                 </Grid>
                              </Grid>
                              {/* ====== Nested Grid Ends ====== */}
                              <Typography variant='body1' sx={{ mt: 2 }}>
                                 <strong>Description: </strong> Lorem ipsum
                                 dolor sit amet consectetur adipisicing elit.
                                 Cum iste quidem ea quia sapiente magnam animi
                                 voluptatum nihil repellat optio dicta
                                 voluptates adipisci vero hic ullam, dolores
                                 impedit dignissimos alias.
                              </Typography>
                              <Typography
                                 variant='h6'
                                 component='a'
                                 href='#'
                                 sx={{
                                    textAlign: 'right',
                                    display: 'block',
                                    color: '#0339A6',
                                    textDecoration: 'none',
                                    mt: 2,
                                 }}
                              >
                                 See Detailed Product Description...
                              </Typography>
                           </Box>
                        </Grid>
                     </Grid>
                  </Box>
                  <hr />
               </Box>
            </Modal>
         </Box>
         <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         >
            <Alert
               onClose={handleClose}
               severity='success'
               sx={{ width: '100%' }}
            >
               Added to cart successfully!
            </Alert>
         </Snackbar>
      </>
   );
};

export default BookProduct;
