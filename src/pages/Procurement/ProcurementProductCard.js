import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "../../components/Custom/PrimaryButton/PrimaryButton";
import ProductDetailList from "../../components/ProductDetailList/ProductDetailList";
import ProductSlider from "../../components/ProductSlider/ProductSlider";

import { ProductCardWrapper } from "./procurementProductCard.style";

const shoes = [
  "https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg",
  "https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png",
  "https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg",
];

const ProcurementProductCard = ({
  product,
  bookingOn,
  sx,

  actionType,
}) => {
  const { product_name = "New Product", product_slug = "na" } = product || {};
  const navigate = useNavigate();

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    console.log("changing attributes");
    if (product.attributes && product.attributes.length > 0) {
      setAttributes(
        product.attributes.filter(
          (attribute) =>
            attribute?.attribute_values[0]?.views?.procurement_card?.visibility
        )
      );
    }
  }, [product.attributes]);

  // console.log(attributes);

  return (
    <ProductCardWrapper
      sx={{
        ...sx,
      }}
    >
      {product?.images ? (
        <ProductSlider images={product?.images.map((img) => img.image_url)} />
      ) : (
        <ProductSlider images={shoes} />
      )}

      <Box sx={{ mb: 3, mt: 1.5, pb: 1.5 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", textAlign: "center" }}
        >
          {product_name}
        </Typography>
        {attributes.length > 0 &&
          attributes
            .slice(0, 4)
            .map((attribute) => (
              <ProductDetailList
                key={attribute.id}
                list={attribute.name}
                description={`${attribute.attribute_values[0].value} ${attribute.attribute_values[0].value_unit}`}
              />
            ))}
      </Box>

      {actionType === "enquiry" && (
        <PrimaryButton
          fullWidth
          onClick={() => navigate(`/products/${product_slug}`)}
          sx={{position: 'absolute', bottom: '0', left: '0', right: '0', borderRadius: '0 0 8px 8px', py:1.5}}
        >
          Enquiry
        </PrimaryButton>
      )}
    </ProductCardWrapper>
  );
};

export default ProcurementProductCard;

/* 

{/* <img
               src={`${
                  bookingOn
                     ? 'https://i.ibb.co/YNmYkyg/Frame-169-1.png'
                     : 'https://i.ibb.co/PDPmLL2/sale-1-1.png'
               }`}
               alt=''
               style={{ position: 'absolute', top: '3%' }}
            /> 
*/
