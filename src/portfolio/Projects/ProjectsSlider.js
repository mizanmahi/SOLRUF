import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper';
import ProjectCard from '../../components/Custom/ProjectCard/ProjectCard';
import './projectsSlider.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ProjectsSlider = ({ projects }) => {


   return (
      <>
         <Swiper
            slidesPerView={1}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{
               enabled: true,
            }}
            breakpoints={{
               1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
               },
               960: {
                  slidesPerView: 3,
                  spaceBetween: 30,
               },
               640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
               },
               0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
               },
            }}
            scrollbar={{
               draggable: true,
            }}
            navigation={{
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            }}
            pagination={{
               clickable: true,
            }}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className='my_scrollbar_swiper_Projects'
         >
            {projects.map((project, index) => (
               <SwiperSlide key={index}>
                  <ProjectCard project={project} />
               </SwiperSlide>
            ))}

            <div className='swiper-button-prev'>
               {/* <i className='fas fa-chevron-left'></i> */}
               <NavigateNextIcon sx={{
                  transform: 'rotate(180deg)'
               }} />
            </div>
            <div className='swiper-button-next'>
               {/* <i className='fas fa-chevron-right'></i> */}

               <NavigateNextIcon />
            </div>
            {/* <div className='swiper-scrollbar'>
                <div className='swiper-scrollbar-drag'></div>
            </div> */}
         </Swiper>
      </>
   );
};

export default ProjectsSlider;
