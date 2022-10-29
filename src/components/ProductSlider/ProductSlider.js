// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

// import required modules
import { Navigation } from "swiper";

import "./productSlider.css";
import { Fragment } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function ProductSlider({ images, view = "large" }) {
  return (
    <>
      <Swiper
        modules={[Navigation]}
        className="product-slider"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item}
              alt="product images"
              className="product-slider-image"
              style={{ width: `${view === "mobile" && "80%"}` }}
            />
          </SwiperSlide>
        ))}
        {view === "mobile" ? (
          <Fragment>
            <div
              className="swiper-button-prev"
              style={{ backgroundColor: "transparent" }}
            >
              <i className="fas fa-chevron-left"></i>
            </div>
            <div
              className="swiper-button-next"
              style={{ backgroundColor: "transparent" }}
            >
              <i className="fas fa-chevron-right"></i>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {/* used material icons instead of font awesome icons */}

            <div className="swiper-button-prev">
              <ChevronLeftIcon />
            </div>
            <div className="swiper-button-next">
              <ChevronRightIcon />
            </div>
          </Fragment>
        )}
      </Swiper>
    </>
  );
}
