import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Navigation, Thumbs } from 'swiper';
import { useState } from 'react';
import './sliderWithThumbnail.css';

const SliderWIthThumbnail = ({ images, loop, sliderPerView }) => {
   const [activeThumb, setActiveThumb] = useState();
   return (
      <>
         <Swiper
            loop={loop ? loop : true}
            spaceBetween={10}
            navigation={{
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{ swiper: activeThumb }}
            className='product-images-slider'
         >
            {images.map((item, index) => (
               <SwiperSlide key={index}>
                  <img src={item} alt='product images' />
               </SwiperSlide>
            ))}

            <div className='swiper-button-prev'>
               <i className='fas fa-chevron-left'></i>
            </div>
            <div className='swiper-button-next'>
               <i className='fas fa-chevron-right'></i>
            </div>
         </Swiper>
         <Swiper
            onSwiper={setActiveThumb}
            loop={loop ? loop : false}
            spaceBetween={10}
            slidesPerView={sliderPerView ? sliderPerView : 4}
            modules={[Navigation, Thumbs]}
            className='product-images-slider-thumbs'
         >
            {images.map((item, index) => (
               <SwiperSlide key={index}>
                  <div className='product-images-slider-thumbs-wrapper'>
                     <img src={item} alt='product images' />
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   );
};

export default SliderWIthThumbnail;
