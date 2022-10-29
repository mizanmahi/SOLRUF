import { Typography } from "@mui/material";
import React from "react";
import {
  CardsRow1,
  CardsRow2,
  CardsWrapper,
  ContentWrapper,
  Wrapper,
} from "./SpecializeStyle";

const Specialize = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          We Specialize in <span style={{ color: "#ffd05b" }}>Solar</span>
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "1.2rem",
            "@media (max-width: 400px)": {
              fontSize: "1.1rem",
            },
          }}
        >
          Our marketplace platform streamlines the technical specifications of
          solar products and develops curated vendor offerings for a
          personalized and accelerated shopping experience.
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "1.2rem",
            "@media (max-width: 400px)": {
              fontSize: "1.1rem",
            },
          }}
        >
          We cater to all solar products/services required in the rooftop and
          ground-mounted solar installation categories. Through SOLRUF, solar
          installers would save time and resources on procurement, thereby
          improving the service quality.
        </Typography>
      </ContentWrapper>
      <CardsWrapper>
        <img
          className="specialize-card"
          src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Cards/card1.svg"
          alt=""
          style={{ transform: "translateX(-1rem)", position: "absolute" }}
        />

        <CardsRow1>
          <img
            className="specialize-card"
            src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Cards/card2.svg"
            alt=""
          />
          <img
            className="specialize-card"
            src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Cards/card3.svg"
            alt=""
            // style={{ width: "20rem" }}
          />
        </CardsRow1>
        <CardsRow2>
          <img
            className="specialize-card"
            src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Cards/card4.svg"
            alt=""
            // style={{ width: "20rem" }}
          />
          <img
            className="specialize-card"
            src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Cards/card5.svg"
            alt=""
            // style={{ width: "20rem" }}
          />
        </CardsRow2>
      </CardsWrapper>
    </Wrapper>
  );
};

// export const Card1 = () => {
//   return (
//     <CardWrapper sx={{ position: "absolute" }}>
//       <img style={{ bottom: "0", left: "0" }} src={trucksvg} alt="" />
//       <Typography
//         variant="p"
//         sx={{
//           fontWeight: "bold",
//           color: "#F3F3F3",
//           fontSize: "1.2rem",
//           lineHeight: "1.5rem",
//         }}
//       >
//         Nationwide Delivery
//       </Typography>
//       <Typography
//         variant="p"
//         sx={{
//           color: "#F3F3F3",
//           fontSize: "0.8rem",
//         }}
//       >
//         and Logistic Support
//       </Typography>
//     </CardWrapper>
//   );
// };

export default Specialize;
