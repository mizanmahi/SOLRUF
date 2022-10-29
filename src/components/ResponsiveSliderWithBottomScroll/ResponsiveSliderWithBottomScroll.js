import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper';
import './ResponsiveSliderWithBottomScroll.css';

const ResponsiveSliderWithBottomScroll = ({ images }) => {
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
            className='my_scrollbar_swiper'
         >
            {images.map((item, index) => (
               <SwiperSlide key={index}>
                  <img src={item} alt='' />
               </SwiperSlide>
            ))}

            <div className='swiper-button-prev'>
               <i className='fas fa-chevron-left'></i>
            </div>
            <div className='swiper-button-next'>
               <i className='fas fa-chevron-right'></i>
            </div>
            {/* <div className='swiper-scrollbar'>
                <div className='swiper-scrollbar-drag'></div>
            </div> */}
         </Swiper>
      </>
   );
};

export default ResponsiveSliderWithBottomScroll;
