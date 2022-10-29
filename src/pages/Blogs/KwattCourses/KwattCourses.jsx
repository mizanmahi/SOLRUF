import { Container, Typography } from "@mui/material";
import React from "react";
import {
  CarouselContentWrapper,
  CarouselWrapper,
  KwattLogoWrapper,
  PoweredByWrapper,
  Wrapper,
} from "./KwattCourses.style";
import kwattLogo from "../../../assets/kwatt-logo-c.svg";
import kwattbg from "../../../assets/kwatt-bg.jpg";
import CourseItem from "./CourseItem";

const KwattCourses = () => {
  return (
    <Wrapper>
      <Container maxWidth="xl" sx={{ padding: { sm: "20px", xs: 0 } }}>
        {/* Carousel */}

        <CarouselWrapper
          sx={{
            backgroundImage: `url(${kwattbg})`,
          }}
        >
          <CarouselContentWrapper>
            <KwattLogoWrapper>
              <img src={kwattLogo} alt="" style={{ width: "100%" }} />
            </KwattLogoWrapper>
            <Typography
              sx={{
                color: "primary.light",
                fontWeight: "bold",
                fontSize: "2rem",
                width: "75%",
                textAlign: "center",
                transform: "translateY(-2rem)",
              }}
            >
              Learn more in the field of Solar Energy and creates solar exports
              to fulfill India's manpower
            </Typography>
            <PoweredByWrapper>
              <Typography
                sx={{
                  color: "primary.light",
                }}
              >
                Powered By
              </Typography>
              <img
                src="https://i.ibb.co/CzpgVFq/51.png"
                alt="Solruf"
                style={{ width: "8rem" }}
              />
            </PoweredByWrapper>
          </CarouselContentWrapper>
        </CarouselWrapper>
        <Typography sx={{ fontSize: "1.3rem", py: "2rem" }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Typography>
        <Typography sx={{ fontSize: "1.3rem", py: "2rem" }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Typography>

        {/* Featured Courses */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "600",
            mb: "1.8rem",
          }}
        >
          Featured Courses
        </Typography>
        <CourseItem />
        <hr style={{ margin: "1rem 0" }} />
        <CourseItem right />
        <hr style={{ margin: "1rem 0" }} />
        <CourseItem />
      </Container>
    </Wrapper>
  );
};

export default KwattCourses;
