import { Box, Typography } from '@mui/material';
import React from 'react';
import Project from './Project/Project';
import Slider from 'react-slick';
import SampleNextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import classes from './projects.module.css'

const Projects = () => {

   const settings = {
      customPaging: function(i) {
         return (
           <div className={classes.dotsbar}>
             .
           </div>
         );
       },
      dots: true,
      dotsClass: ` slick-thumb  ${classes.amarClass}`,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
         {
           breakpoint: 1024,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 1,
             infinite: true,
             dots: true
           }
         },
         {
           breakpoint: 600,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
             initialSlide: 2
           }
         },
         {
           breakpoint: 480,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1
           }
         }
       ]
   };

   return (
      <Box sx={{ mt: 6, mb: 10, mx: 'auto'}}>
         <Typography variant='h4' textAlign='center' sx={{ mb: 6 }}>
            Project List
         </Typography>
         <Slider {...settings}>
            <Project
               imageUrl='https://i.ibb.co/wMbGYm4/project1.png'
               state='Mumbai'
               kwValue='15Kw'
               description='Tata Power Residential
               Project'
            />
            <Project
               imageUrl='https://i.ibb.co/rpjvXbN/project2.png'
               state='New Delhi'
               kwValue='18Kw'
               description='LG Affordable Home
               Appliance Survey'
            />
            <Project
               imageUrl='https://i.ibb.co/Btf6tbT/project3.png'
               state='Kolkata'
               kwValue='27Kw'
               description='Aquafina Small-scale
               Water Treatment Project'
            />
            <Project 
               imageUrl='https://i.ibb.co/Btf6tbT/project3.png'
               state='Kolkata'
               kwValue='27Kw'
               description='Aquafina Small-scale
               Water Treatment Project'
            />
            <Project 
            imageUrl='https://i.ibb.co/Btf6tbT/project3.png'
            state='Kolkata'
            kwValue='27Kw'
            description='Aquafina Small-scale
            Water Treatment Project'/>
            <Project 
               imageUrl='https://i.ibb.co/Btf6tbT/project3.png'
               state='Kolkata'
               kwValue='27Kw'
               description='Aquafina Small-scale
               Water Treatment Project'
            />
         </Slider>
      </Box>
   );
};

export default Projects;
