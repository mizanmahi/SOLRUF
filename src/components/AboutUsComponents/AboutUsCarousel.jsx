import { Typography } from "@mui/material";
import React from "react";
import {
  BackgroundImage,
  BackgroundImgWrapper,
  CarouselWrapper,
  ContentWrapper,
  Wrapper,
} from "./CarouselStyle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutUsCarousel = () => {
  const carouselSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 6000,
  };
  return (
    <Wrapper>
      <CarouselWrapper>
        <Slider {...carouselSettings}>
          <BackgroundImgWrapper>
            <BackgroundImage
              sx={{
                backgroundImage: `url(${"https://res.cloudinary.com/dpfoirokh/image/upload/v1663419270/Property_1_Zoom_1_wqkitt.jpg"})`,
              }}
            />
          </BackgroundImgWrapper>
          <BackgroundImgWrapper>
            <BackgroundImage
              sx={{
                backgroundImage: `url(${"https://res.cloudinary.com/dpfoirokh/image/upload/v1663419270/Property_1_Zoom_2_z4tj7w.jpg"})`,
              }}
            />
          </BackgroundImgWrapper>
          <BackgroundImgWrapper>
            <BackgroundImage
              sx={{
                backgroundImage: `url(${"https://res.cloudinary.com/dpfoirokh/image/upload/v1663419270/Property_1_Zoom_3_okpat0.jpg"})`,
              }}
            />
          </BackgroundImgWrapper>
          <BackgroundImgWrapper>
            <BackgroundImage
              sx={{
                backgroundImage: `url(${"https://res.cloudinary.com/dpfoirokh/image/upload/v1663419276/Property_1_Zoom_4_bvffmb.jpg"})`,
              }}
            />
          </BackgroundImgWrapper>
        </Slider>
      </CarouselWrapper>
      <ContentWrapper>
        <Typography
          variant="h1"
          sx={{
            color: "#F3F3F3",
            fontWeight: "bold",
            fontSize: "3rem",
            "@media (max-width: 900px)": {
              fontSize: "2rem",
            },
          }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="p"
          sx={{
            textAlign: "center",
            color: "#F3F3F3",
            fontSize: "2.8rem",
            "@media (max-width: 900px)": {
              fontSize: "1.5rem",
            },
          }}
        >
          Accelerating the transition to a greener future by providing access to
          clean energy products and services with focus on price and convenience
        </Typography>
      </ContentWrapper>
    </Wrapper>
  );
};

export default AboutUsCarousel;
