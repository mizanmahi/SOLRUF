import {
   Avatar,
   Box,
   Button,
   Container,
   styled,
   Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SampleNextArrow from '../../portfolio/Projects/NextArrow';
import PrevArrow from '../../portfolio/Projects/PrevArrow';
import Slider from 'react-slick';
import ProjectTag from '../../components/ProjectTag/ProjectTag';
import TextModal from '../../components/TextModal/TextModal';

const useStyle = makeStyles((theme) => ({
   reviewBox: {
      width: '100%',
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0 auto',
      boxShadow: '0px 4px 8px 0 rgba(0, 0, 0, 0.3)',
      borderRadius: theme.spacing(2),
   },
}));

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

const Flex = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: theme.spacing(2),
}));
const ColumnFlex = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   marginBottom: theme.spacing(2),
}));

const ProjectDetails = () => {
   const classes = useStyle();

   const [textExpanded, setTextExpanded] = useState(false);
   const description =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio obcaecati exercitationem quasi aperiam beatae unde velit veniam perspiciatis, cupiditate ipsam provident debitis quas aliquid odit quidem voluptatum architecto optio placeat at officiis non. Voluptatibus eos possimus, similique asperiores praesentium deserunt veniam odit expedita error minus.';

   return (
      <Box sx={{ px: '.7rem' }}>
         <Container maxWidth='xl'>
            <Box>
               <Typography variant='h5' textAlign='center' fontWeight={600}>
                  The Power Residential Project
               </Typography>
               <Typography variant='body1' textAlign='center' fontWeight={600}>
                  {' '}
                  <LocationOnIcon /> Mumbai
               </Typography>
               <hr />
            </Box>
            <Box>
               <Flex>
                  <Typography variant='h6' fontWeight={500} gutterBottom>
                     Description
                  </Typography>
                  <ProjectTag title='Commercial' />
               </Flex>
               <ColumnFlex>
                  <Typography variant='body1' fontWeight={500} gutterBottom>
                     <strong>Power Capacity:</strong> 1200 kW
                  </Typography>
                  <Typography variant='body1' fontWeight={500} gutterBottom>
                     <strong>Months Taken:</strong> 5 Months
                  </Typography>
               </ColumnFlex>
               <Typography sx={{ fontSize: '1.1rem' }}>
                  {textExpanded
                     ? description.slice(0, description.length)
                     : description.slice(0, 100) + '...'}
                  <Button
                     sx={{ color: 'blue', textTransform: 'none', py: 0 }}
                     onClick={() => setTextExpanded(!textExpanded)}
                  >
                     {textExpanded ? 'Read Less' : 'Read More'}
                  </Button>
               </Typography>
               <TextModal
                  title='Description'
                  text={description}
                  open={textExpanded}
                  handleClose={() => setTextExpanded(false)}
               />

               <Box sx={{ my: 3 }}>
                  <Slider {...settings}>
                     <Box sx={{ p: 1 }}>
                        <img
                           src='https://i.ibb.co/bs2JL3F/Frame-171.png'
                           style={{ maxWidth: '100%' }}
                           alt=''
                        />
                     </Box>
                     <Box sx={{ p: 1 }}>
                        <img
                           src='https://i.ibb.co/bs2JL3F/Frame-171.png'
                           style={{ maxWidth: '100%' }}
                           alt=''
                        />
                     </Box>
                     <Box sx={{ p: 1 }}>
                        <img
                           src='https://i.ibb.co/bs2JL3F/Frame-171.png'
                           style={{ maxWidth: '100%' }}
                           alt=''
                        />
                     </Box>
                     <Box sx={{ p: 1 }}>
                        <img
                           src='https://i.ibb.co/bs2JL3F/Frame-171.png'
                           style={{ maxWidth: '100%' }}
                           alt=''
                        />
                     </Box>
                  </Slider>
               </Box>
            </Box>

            {/* ====== Project Info ====== */}

            <Box sx={{ mb: 3 }}>
               <Typography variant='h5' fontWeight={600} gutterBottom>
                  Project Info
               </Typography>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     flexDirection: ['column', 'row'],
                  }}
               >
                  <img
                     src='https://i.ibb.co/QjMph3z/info1.png'
                     alt=''
                     style={{ width: '90%', marginBottom: '1rem' }}
                  />
                  <img
                     src='https://i.ibb.co/RjL28gM/info2.png'
                     alt=''
                     style={{ width: '90%', marginBottom: '1rem' }}
                  />
                  <img
                     src='https://i.ibb.co/XjCLDC4/info3.png'
                     alt=''
                     style={{ width: '90%', marginBottom: '1rem' }}
                  />
               </Box>
            </Box>

            {/* ====== Customer review ====== */}

            <Box sx={{ mb: 3 }}>
               <Typography variant='h5' fontWeight={600} gutterBottom>
                  Customer Review
               </Typography>
               <Box className={classes.reviewBox}>
                  <Avatar
                     alt='Remy Sharp'
                     src='https://i.ibb.co/SJ05bh1/review-Image.png'
                     sx={{ height: '4rem', width: '4rem' }}
                  />
                  <Typography variant='h5' fontWeight={500} sx={{ mb: 2 }}>
                     Karan Batra, Flipkart
                  </Typography>
                  <Typography variant='h6' fontWeight={500} textAlign='center'>
                     ”Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     Officiis vero sunt quo culpa voluptates distinctio
                     molestias fuga impedit facere incidunt!„
                  </Typography>
               </Box>
            </Box>
         </Container>
      </Box>
   );
};

export default ProjectDetails;
