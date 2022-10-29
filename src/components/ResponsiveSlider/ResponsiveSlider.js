import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination, Navigation, Scrollbar, Keyboard } from 'swiper';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import './responsiveSlider.css';

const ResponsiveSlider = ({ images }) => {
   console.log(images);

   const slidePerView = images.length > 3 ? 3 : images.length;
   console.log(slidePerView);
   return (
      <Swiper
         loop={true}
         slidesPerView={slidePerView}
         spaceBetween={2}
         pagination={{
            clickable: true,
            // type: 'progressbar',
         }}
         navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         }}
         centeredSlides={false}
         slidesPerGroupSkip={1}
         grabCursor={true}
         keyboard={{
            enabled: true,
         }}
         // navigation={true}
         // scrollbar={true}
         breakpoints={{
            1024: {
               slidesPerView: slidePerView,
               spaceBetween: 0,
            },
            960: {
               slidesPerView: slidePerView,
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
         modules={[Pagination, Navigation, Scrollbar, Keyboard]}
         className='my_swiper'
      >
         {images.map((item, index) => (
            <SwiperSlide key={index}>
               <img src={item} alt='' />
            </SwiperSlide>
         ))}

         <div className='swiper-button-prev'>
            <ChevronLeftIcon />
         </div>
         <div className='swiper-button-next'>
            <ChevronRightIcon />
         </div>
      </Swiper>
   );
};

export default ResponsiveSlider;
