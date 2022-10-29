import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { setProductData } from "../../../redux/slices/viewProductSlice";
import { useNavigate } from "react-router-dom";

const ProductImageBox = styled(Box)(({ theme }) => ({
  width: "260px",
  height: "320px",
  position: "relative",
  padding: "14px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "40px 40px",
  "&:hover #overlay": {
    opacity: 1,
  },
  boxShadow: "0px 2px 24px rgba(22, 60, 158, 0.2)",
  borderRadius: "8px",
}));

const ImageBox = styled("img")(({ theme }) => ({
  height: "200px",
  width: "200px",
  objectFit: "cover",
}));

const OverlayBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#00000095",
  opacity: "0",
  height: "100%",
  width: "100%",
  position: "absolute",
  top: "0px",
  transition: "opacity 0.5s",
  cursor: "pointer",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const productName = [
  {
    name: "Solar Panels",
    image:
      "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/solarpanel.png",
    CategoryId: 1,
    SubCategoryId: 2,
  },

  {
    name: "Solar Inverters",
    image:
      "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/inverter.png",
    CategoryId: 5,
    SubCategoryId: 6,
  },

  {
    name: "Solar Battery",
    image:
      "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/solarbattery.png",
    CategoryId: 9,
    SubCategoryId: 10,
  },
  {
    name: "Solar Charger Controller",
    image:
      "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/charger.png",
    CategoryId: 9,
    SubCategoryId: 11,
  },
  {
    name: "Lightening arrestor",
    image:
      "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/arrestor.png",
    CategoryId: 15,
    SubCategoryId: 16,
  },
  {
    name: "Earthing electrodes",
    image:
      "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/electrodes.png",
    CategoryId: 19,
    SubCategoryId: 20,
  },
  {
    name: "Solar AC/DC cables",
    image:
      "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/cable.png",
    CategoryId: 22,
    SubCategoryId: 23,
  },
  {
    name: "Junction boxes",
    image:
      "https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/charger.png",
    CategoryId: 12,
    SubCategoryId: 13,
  },
];

const ProductCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let productCards = productName.map((item, ind) => {
    return (
      <ProductImageBox key={ind}>
        <OverlayBox
          id="overlay"
          onClick={() => {
            dispatch(
              setProductData({
                productCategoryData: item.CategoryId,
                productSubCategoryData: item.SubCategoryId,
              })
            );
            navigate(`/products`);
          }}
        >
          <Typography variant="h6" color={"white"} fontWeight={600}>
            View Product
          </Typography>
        </OverlayBox>
        <ImageBox sx={{ borderRadius: 2 }} src={item.image}></ImageBox>
        <Typography variant="h6" textAlign={"center"}>
          {item.name}
        </Typography>
      </ProductImageBox>
    );
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: "10px 10px 40px 10px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h3" textAlign="center" fontWeight={600}>
        Product Categories
      </Typography>
      <Box
        sx={{
          margin: "auto",
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "space-between",
          flexWrap: "wrap",
          backgroundColor: "#FFFDF8",
          borderRadius: "10px",
        }}
      >
        {productCards}
      </Box>
    </Container>
  );
};

export default ProductCategories;
