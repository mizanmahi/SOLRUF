import { Box, Typography } from '@mui/material';
import React from 'react';
import Project from './Project/Project';
import Slider from 'react-slick';
import SampleNextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import classes from './projects.module.css';

const Projects = ({ projects }) => {
   console.log(projects);

   const settings = {
      customPaging: function (i) {
         return <div className={classes.dotsbar}>.</div>;
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
               dots: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
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

   return (
      <Box sx={{ mt: 6, mb: 10, mx: 'auto' }}>
         <Typography variant='h4' textAlign='center' sx={{ mb: 6 }}>
            Project List
         </Typography>
         <Slider {...settings}>
            {projects.map(
               (
                  {
                     project_id,
                     description,
                     name,
                     state,
                     power_capacity_type,
                     power_capacity,
                     category,
                     images,
                  },
                  i
               ) => (
                  <Project
                     project_id={project_id}
                     // imageUrl='https://i.ibb.co/wMbGYm4/project1.png'
                     imageUrl={images[0]?.url}
                     images={images}
                     state={state}
                     kwValue={`${power_capacity} ${power_capacity_type}`}
                     description={name}
                     category={category}
                     key={i}
                  />
               )
            )}
         </Slider>
      </Box>
   );
};

export default Projects;
