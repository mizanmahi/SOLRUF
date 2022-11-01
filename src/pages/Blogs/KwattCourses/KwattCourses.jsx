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
      <Container maxWidth="xl" sx={{ padding: { sm: "20px" } }}>
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
                "@media (max-width: 900px)": {
                  fontSize: "1.5rem",
                },
                "@media (max-width: 600px)": {
                  fontSize: "1.2rem",
                  fontWeight: "600",
                },
              }}
            >
              Learn more in the field of Solar Energy and creates solar exports
              to fulfill India's manpower
            </Typography>
            <PoweredByWrapper>
              <Typography
                varaint="p"
                sx={{
                  color: "primary.light",
                  "@media (max-width: 900px)": {
                    fontSize: "0.8rem",
                  },
                }}
              >
                Powered By
              </Typography>
              <img
                src="https://i.ibb.co/CzpgVFq/51.png"
                alt="Solruf"
                style={{
                  width: "8rem",
                  "@media (max-width: 900px)": {
                    width: "5rem",
                  },
                }}
              />
            </PoweredByWrapper>
          </CarouselContentWrapper>
        </CarouselWrapper>
        <Typography
          sx={{
            fontSize: "1.3rem",
            "@media (max-width: 900px)": {
              fontSize: "1.1rem",
            },
            py: "0.8rem",
          }}
        >
          <b>kWatt Solutions Pvt Ltd</b> is active in the renewable energy
          space, focusing on energy optimization and technology customization to
          endow with economic renewable energy solutions by creating and
          nurturing a network of entrepreneurs. Founded by{" "}
          <b>Dr. Chetan Singh Solanki</b> and incubated at the renowned Indian
          Institute of Technology (IIT) Bombay's{" "}
          <b>Society for Innovation and Entrepreneurship (SINE)</b>.{"\n"}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.3rem",
            py: "2rem",
            "@media (max-width: 900px)": {
              fontSize: "1.1rem",
              py: "0.8rem",
            },
          }}
        >
          <b>KWatt Solutions</b> is also engaged in designing and installation
          of PV systems, Skill Development Services, Solar Rooftop EPC Services
          and Solar Laboratory Equipment. It brings to you some of the solutions
          to deal with the real time problems in the solar power spectrum, which
          will help the budding leaders in the solar industry.
        </Typography>

        {/* Featured Courses */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "600",
            mb: "1.8rem",
            "@media (max-width: 600px)": {
              textAlign: "center",
              mb: "1rem",
            },
          }}
        >
          Featured Courses
        </Typography>
        <CourseItem
          title="Solar Install"
          description="SolarInstall is a NABCEP-certified learning branch that teaches people about Solar PV Applications, Sales & Economics, Design, Installation, Maintenance & Operations based on NABCEP, PVA, and ANSI standards. 
You can install a solar plant on the field and get nurtured and reputed by the credential of NABCEP PVA certification and solar training."
          price="35,000"
          prevPrice="43,750"
        />
        <hr style={{ margin: "1rem 0" }} />
        <CourseItem
          right
          title="Solbizz"
          description="Learning the technicalities, legality, and software to design a plant is of utmost importance, but cracking business deals are also not left behind, this can be achieved by focusing on Solar EPC business agreements by understanding PV technology, answering PV enquiries, financial management, and legalities."
          price="20,000"
          prevPrice="25,000"
        />
        <hr style={{ margin: "1rem 0" }} />
        <CourseItem
          title="Solware"
          description="This program will give you a solid foundation in the core standards for designing SPV systems. It will also help you broaden your mind and understand how software is used in the solar PV industry."
          price="15,000"
          prevPrice="18,750"
        />
        <hr style={{ margin: "1rem 0" }} />

        <Typography
          sx={{
            fontSize: "1.3rem",
            py: "2rem",
            "@media (max-width: 900px)": {
              fontSize: "1.1rem",
              py: "0.8rem",
            },
          }}
        >
          KWatt Solutions is also engaged in designing and installation of PV
          systems, Skill Development Services, Solar Rooftop EPC Services and
          Solar Laboratory Equipment. It brings to you some of the solutions to
          deal with the real time problems in the solar power spectrum, which
          will help the budding leaders in the solar industry.
        </Typography>
      </Container>
    </Wrapper>
  );
};

export default KwattCourses;
