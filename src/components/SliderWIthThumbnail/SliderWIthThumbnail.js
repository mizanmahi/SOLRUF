import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Thumbs } from "swiper";
import { useState } from "react";
import "./sliderWithThumbnail.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ReactImageMagnify from 'react-image-magnify';
import InnerImageZoom from "react-inner-image-zoom";

const SliderWIthThumbnail = ({ images, loop, sliderPerView }) => {
  const [activeThumb, setActiveThumb] = useState();
  return (
    <>
      <Swiper
        loop={loop ? loop : true}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="product-images-slider"
      >
        {/* {images.map((item, index) => (
               <SwiperSlide key={index}>
                  <img src={item} alt='product images' />
               </SwiperSlide>
            ))} */}

        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <InnerImageZoom
              src={item}
              zoomSrc={item}
              width={750}
              height={500}
              hasSpacer={true}
            />
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev">
          <ChevronLeftIcon />
        </div>
        <div className="swiper-button-next">
          <ChevronRightIcon />
        </div>
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={loop ? loop : false}
        spaceBetween={10}
        slidesPerView={sliderPerView ? sliderPerView : 4}
        modules={[Navigation, Thumbs]}
        className="product-images-slider-thumbs"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="product-images-slider-thumbs-wrapper">
              <img src={item} alt="product images" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SliderWIthThumbnail;
