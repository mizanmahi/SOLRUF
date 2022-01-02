import { Box } from '@mui/system';
import React from 'react';
import Slider from 'react-slick';
import SampleNextArrow from '../../portfolio/Projects/NextArrow';
import PrevArrow from '../../portfolio/Projects/PrevArrow';
import classes from './SliderWithCustomImagePreview.module.css';

const settings = {
   // customPaging: function (i) {
   //    return (
   //       <a>
   //          <img
   //             src='https://i.ibb.co/LxzLfPy/slider-Preview-Image.png'
   //             alt='slider preview'
   //             style={{width: '100%'}}
   //          />
   //       </a>
   //    );
   // },
   // dots: true,
   dotsClass: `slick-dots slick-thumb ${classes.mainClass}` ,
   infinite: true,
   arrows: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   nextArrow: <SampleNextArrow productDetailModal={true} />,
   prevArrow: <PrevArrow  productDetailModal={true}/>,
};


const SliderWithCustomImagePreview = () => {

    

   return (
      <Box>
         <Slider {...settings}>
            <Box sx={{width: '100%'}}>
               <img src='https://i.ibb.co/SvZkB1S/Rectangle-35.png' alt='' style={{maxWidth: '100%', margin: '0 auto' }} />
            </Box>
            <Box sx={{width: '100%'}}>
               <img src='https://i.ibb.co/SvZkB1S/Rectangle-35.png' alt='' style={{maxWidth: '100%', margin: '0 auto' }} />
            </Box>
            <Box sx={{width: '100%'}}>
               <img src='https://i.ibb.co/SvZkB1S/Rectangle-35.png' alt='' style={{maxWidth: '100%', margin: '0 auto' }} />
            </Box>
            <Box sx={{width: '100%'}}>
               <img src='https://i.ibb.co/SvZkB1S/Rectangle-35.png' alt='' style={{maxWidth: '100%', margin: '0 auto' }} />
            </Box>
            
         </Slider>
      </Box>
   );
};

export default SliderWithCustomImagePreview;
