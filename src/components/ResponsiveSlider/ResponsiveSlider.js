import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination, Navigation, Scrollbar, Keyboard } from 'swiper';
import './responsiveSlider.css';

const ResponsiveSlider = ({ images }) => {
   return (
      <Swiper
         loop={true}
         slidesPerView={4}
         spaceBetween={5}
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
         modules={[Pagination, Navigation, Scrollbar, Keyboard]}
         className='my_swiper'
      >
         {images.map((item, index) => (
            <SwiperSlide key={index}>
               <img src={item} alt='' />
            </SwiperSlide>
         ))}
         <div class='swiper-button-prev'>
            <i class='fas fa-chevron-left'></i>
         </div>
         <div class='swiper-button-next'>
            <i class='fas fa-chevron-right'></i>
         </div>
      </Swiper>
   );
};

export default ResponsiveSlider;
