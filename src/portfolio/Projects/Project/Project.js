import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, display } from '@mui/system';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Slider from 'react-slick';
import SampleNextArrow from '../NextArrow';
import PrevArrow from '../PrevArrow';
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// import classes from '../projects.module.css'

const useStyle = makeStyles((theme) => ({
   addressBox: {
      background: '#FFD05B',
      width: '50%',
      height: '25%',
      marginTop: '-2rem',
      zIndex: 10000,
      marginLeft: '2rem',
      borderRadius: '1rem',
      padding: '.8rem',
      position: 'absolute',

      [theme.breakpoints.up('md')]: {
         width: '60%',
      },
      [theme.breakpoints.up('lg')]: {
         width: '40%',
      },
   },
   modalHeaderBox: {},
   reviewBox: {
      width: '70%',
      padding: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0 auto',
      boxShadow: '0px 4px 8px 0 rgba(0, 0, 0, 0.3)',
      borderRadius: theme.spacing(2),
   },
}));

const modalStyles = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '70%',
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
};

const settings = {
   infinite: true,
   speed: 500,
   slidesToShow: 4,
   slidesToScroll: 4,
   nextArrow: <SampleNextArrow projectDetailsModal={true} />,
   prevArrow: <PrevArrow projectDetailsModal={true} />,
   responsive: [
      {
         breakpoint: 1024,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
         },
      },
      {
         breakpoint: 600,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
         },
      },
      {
         breakpoint: 480,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ],
};

const Project = ({ imageUrl, state, kwValue, description }) => {
   const classes = useStyle();

   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <>
         <Card
            sx={{
               maxWidth: '100%',
               // minHeight: 550,
               minWidth: '250px',
               mx: '2rem',
               bgcolor: '#F3F3F3',
               borderRadius: 4,
               boxShadow: 0,
               position: 'relative',
            }}
            onClick={handleOpen}
         >
            <CardMedia
               component='img'
               height='350'
               image={imageUrl}
               alt='green iguana'
               sx={{ height: ['auto'] }}
            />
            <Box
               className={classes.addressBox}
               sx={{
                  top: {
                     xs: '15%',
                     sm: '15%',
                     md: '20%',
                     lg: '50%',
                     xl: '55%',
                  },
               }}
            >
               <Typography
                  variant='h6'
                  sx={{ fontWeight: 500, fontSize: ['1rem', '.9rem', '1.3rem'] }}
               >
                  {state}{' '}
               </Typography>
               <Typography
                  variant='h6'
                  sx={{ fontWeight: 400, fontSize: ['1rem', '1.3rem'] }}
               >
                  {kwValue}{' '}
               </Typography>
            </Box>
            <CardContent sx={{ pl: 4, mt: 4 }}>
               <Box
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{ width: ['100%', '100%', '90%'] }}
               >
                  <Typography variant='h5' sx={{ textDecoration: 'none' }}>
                     {description.substring(0, 35)}...
                  </Typography>
               </Box>
            </CardContent>
         </Card>
         {/* =========================== Modal =========================== */}
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
                  overflowY: 'scroll',
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
                     The Power Residential Project
                  </Typography>
                  <Typography
                     variant='body1'
                     textAlign='center'
                     fontWeight={600}
                  >
                     {' '}
                     <LocationOnIcon /> Mumbai
                  </Typography>
                  <hr />
               </Box>
               <Box>
                  <Typography variant='h6' fontWeight={500} gutterBottom>
                     Description
                  </Typography>
                  <Typography variant='body1' fontWeight={500} gutterBottom>
                     <strong>Power Capacity:</strong> 1200 kW &nbsp;|&nbsp;{' '}
                     <strong>Months Taken:</strong> 5months
                  </Typography>
                  <Typography variant='body1' fontWeight={500} gutterBottom>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Expedita fugiat, ea consequatur voluptatibus ad tenetur.
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     In, eum! Lorem ipsum dolor sit amet consectetur adipisicing
                     elit. Eius earum quis consectetur officia fuga harum!
                  </Typography>

                  <Box sx={{ my: 3 }}>
                     <Slider {...settings}>
                        <Box sx={{ p: 1 }}>
                           <img
                              src='https://images.unsplash.com/photo-1640224764479-424a6a7a744b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
                              style={{ maxWidth: '100%' }}
                              alt=''
                           />
                        </Box>
                        <Box sx={{ p: 1 }}>
                           <img
                              src='https://images.unsplash.com/photo-1640224764479-424a6a7a744b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
                              style={{ maxWidth: '100%' }}
                              alt=''
                           />
                        </Box>
                        <Box sx={{ p: 1 }}>
                           <img
                              src='https://images.unsplash.com/photo-1640224764479-424a6a7a744b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
                              style={{ maxWidth: '100%' }}
                              alt=''
                           />
                        </Box>
                        <Box sx={{ p: 1 }}>
                           <img
                              src='https://images.unsplash.com/photo-1640224764479-424a6a7a744b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
                              style={{ maxWidth: '100%' }}
                              alt=''
                           />
                        </Box>
                        <Box sx={{ p: 1 }}>
                           <img
                              src='https://images.unsplash.com/photo-1640224764479-424a6a7a744b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
                              style={{ maxWidth: '100%' }}
                              alt=''
                           />
                        </Box>
                        <Box sx={{ p: 1 }}>
                           <img
                              src='https://images.unsplash.com/photo-1640224764479-424a6a7a744b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
                              style={{ maxWidth: '100%' }}
                              alt=''
                           />
                        </Box>
                        <Box sx={{ p: 1 }}>
                           <img
                              src='https://images.unsplash.com/photo-1640224764479-424a6a7a744b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
                              style={{ maxWidth: '100%' }}
                              alt=''
                           />
                        </Box>
                     </Slider>
                  </Box>
               </Box>

               {/* ====== Project Info ====== */}

               <Box sx={{ mb: 3 }}>
                  <Typography variant='h6' gutterBottom>
                     Project Info
                  </Typography>
                  <Box
                     sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                     <img
                        src='https://i.ibb.co/QjMph3z/info1.png'
                        alt=''
                        style={{ width: '30%' }}
                     />
                     <img
                        src='https://i.ibb.co/RjL28gM/info2.png'
                        alt=''
                        style={{ width: '30%' }}
                     />
                     <img
                        src='https://i.ibb.co/XjCLDC4/info3.png'
                        alt=''
                        style={{ width: '30%' }}
                     />
                  </Box>
               </Box>

               {/* ====== Customer review ====== */}

               <Box sx={{ mb: 3 }}>
                  <Typography variant='h6' gutterBottom>
                     Customer Review
                  </Typography>
                  <Box className={classes.reviewBox}>
                     <Avatar
                        alt='Remy Sharp'
                        src='https://i.ibb.co/SJ05bh1/review-Image.png'
                     />
                     <Typography variant='h5' fontWeight={500} gutterBottom>
                        Karan Batra, Flipkart
                     </Typography>
                     <Typography
                        variant='h6'
                        fontWeight={500}
                        textAlign='center'
                     >
                        ”Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Officiis vero sunt quo culpa voluptates distinctio
                        molestias fuga impedit facere incidunt!„
                     </Typography>
                  </Box>
               </Box>
               <Box sx={{ my: 3 }}>
                  <Typography variant='h6'>Design Layouts</Typography>
                  <Slider {...settings}>
                     <img src='https://i.ibb.co/SnCmVdy/Frame-143.png' alt='' />
                     <img src='https://i.ibb.co/SnCmVdy/Frame-143.png' alt='' />
                     <img src='https://i.ibb.co/SnCmVdy/Frame-143.png' alt='' />
                     <img src='https://i.ibb.co/SnCmVdy/Frame-143.png' alt='' />
                     <img src='https://i.ibb.co/SnCmVdy/Frame-143.png' alt='' />
                  </Slider>
               </Box>
            </Box>
            {/* ========= modal end ============ */}
         </Modal>
      </>
   );
};

export default Project;

/* 
https://i.ibb.co/QjMph3z/info1.png
https://i.ibb.co/RjL28gM/info2.png
https://i.ibb.co/XjCLDC4/info3.png
*/