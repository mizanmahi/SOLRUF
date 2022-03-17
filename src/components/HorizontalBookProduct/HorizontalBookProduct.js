import { Box, Grid, Modal, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import Slider from 'react-slick';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import SliderWithCustomImagePreview from '../SliderWithCustomImagePreview/SliderWithCustomImagePreview';
import YellowButton from '../YellowButton/YellowButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

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
   const rightClickHandler = (e) => {
      e.stopPropagation();
      onClick();
   };
   return (
      <RArrow
         className={className}
         style={{ ...style, display: 'block' }}
         onClick={rightClickHandler}
      ></RArrow>
   );
};
const LeftArrow = (props) => {
   const { className, style, onClick } = props;
   const leftClickHandler = (e) => {
      e.stopPropagation();
      onClick();
   };
   return (
      <LArrow
         className={className}
         style={{ ...style, display: 'block' }}
         onClick={leftClickHandler}
      ></LArrow>
   );
};

const settings = {
   // dots: true,
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

const Img = styled('img')(({ theme }) => ({
   width: '70px',
   height: '70px',
   position: 'absolute',
   top: '2rem',
   left: '1rem',
   zIndex: '100',
}));

const HorizontalBookProduct = ({ editDelete, style, noModal }) => {
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      if (noModal) return;
      setOpen(true);
   };

   const handleClose = (e) => {
      e.stopPropagation();
      setOpen(false);
   };

   const Wrapper = styled('div')(({ theme }) => ({
      background: '#ffffff',
      padding: '30px 40px 30px 60px',
      borderRadius: '10px',
      boxShadow: '0 0px 12px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      // maxWidth: '900px',
      width: '100%',
      margin: '2rem auto',
      position: 'relative',
      '&:hover': {
         boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }
   }));

   return (
      <Wrapper style={{ ...style }} onClick={handleOpen}>
         <Img src='https://i.ibb.co/FqRNHT9/Frame-169.png' alt='' />
         <Box
            sx={{
               width: '60%',
               order: 0,
               flex: '0 1 auto',
               alignSelf: 'center',
            }}
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
         </Box>
         <Box sx={{ mt: 0, ml: 0 }}>
            <Typography variant='h5'>4 Inch Solar Cable</Typography>

            <ProductDetailList list='Price/Watt' description='Rs 256/sq.ft.' />
            <ProductDetailList list='Price Of Panel' description='Rs 2500000' />
            <ProductDetailList list='Power Capacity' description='1024 Watts' />
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
                  mt: 3,
               }}
            >
               {!editDelete ? (
                  <YellowButton style={{ flexGrow: 1 }}>Purchase</YellowButton>
               ) : (
                  <>
                     <Box>
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
         </Box>
         {/*  ================== Modal Start ================== */}
         <Modal
            open={open}
            onClose={handleClose}
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
                  onClick={handleClose}
               />
               <Box>
                  <Typography variant='h5' textAlign='center' fontWeight={600}>
                     Product Enquiry
                  </Typography>
                  <hr />
               </Box>
               <Box sx={{ mb: 4 }}>
                  <Grid container spacing={5} alignItems='center'>
                     <Grid item md={12} lg={4}>
                        {/* ================== Slider with custom image preview indicator */}
                        <SliderWithCustomImagePreview />
                     </Grid>
                     {/*  === description list start === */}
                     <Grid item md={12} lg={8}>
                        <Box>
                           <Typography variant='h5' fontWeight={500}>
                              24-inch Solar Cables (10x Powerful) fully ready to
                              Functional Power Cables
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
                              <strong>Description: </strong> Lorem ipsum dolor
                              sit amet consectetur adipisicing elit. Cum iste
                              quidem ea quia sapiente magnam animi voluptatum
                              nihil repellat optio dicta voluptates adipisci
                              vero hic ullam, dolores impedit dignissimos alias.
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
      </Wrapper>
   );
};

export default HorizontalBookProduct;
