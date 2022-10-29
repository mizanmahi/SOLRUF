import { KeyboardBackspace } from "@mui/icons-material";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  FeatureBox,
  FeatureItemBoxMobile,
  ProductFeaturesMobile,
} from "../pages/EnquiryPage/enquiryPage.style";

const DetailModal = ({
  modalTopBackButtonStyle,
  hideDetailModal,
  tabValue2,
  handleChange2,
  productForPurchase,
}) => {
  return (
    <Box>
      <Box sx={modalTopBackButtonStyle} onClick={hideDetailModal}>
        <KeyboardBackspace />
        <Box>Back</Box>
      </Box>

      <Box sx={{ height: "100%", overFlow: "auto" }}>
        <Tabs
          value={tabValue2}
          onChange={handleChange2}
          variant="scrollable"
          // scrollButtons
          // allowScrollButtonsMobile
          aria-label="details tabs"
          sx={{
            bgcolor: "#F3F3F3",
            borderTop: "1px solid black",
            borderBottom: "1px solid transparent",
            borderRight: 0,
            borderLeft: 0,
            boxShadow: "0px 4px 5px rgba(0, 0, 0, 0)",
          }}
        >
          <Tab
            label="Product Features"
            sx={{
              borderBottom: "1px solid black",
              fontSize: ".8rem",
              "&.Mui-selected": {
                fontWeight: "bold",
                color: "secondary.main",
              },
            }}
          />

          <Tab
            label="Product  Document"
            sx={{
              borderBottom: "1px solid black",
              fontSize: ".8rem",
              "&.Mui-selected": {
                fontWeight: "bold",
                color: "secondary.main",
              },
            }}
          />
          <Tab
            label="Warranty Card"
            sx={{
              borderBottom: "1px solid black",
              fontSize: ".8rem",

              "&.Mui-selected": {
                fontWeight: "bold",
                color: "secondary.main",
              },
            }}
          />
          <Tab
            label="Booking Document"
            sx={{
              borderBottom: "1px solid black",
              fontSize: ".8rem",
              "&.Mui-selected": {
                fontWeight: "bold",
                color: "secondary.main",
              },
            }}
          />
        </Tabs>
        {tabValue2 === 0 && (
          <ProductFeaturesMobile sx={{}}>
            <Box className="featuresHeader">
              <Typography variant="h6">Product Features</Typography>
            </Box>
            <FeatureBox>
              {productForPurchase?.attributes?.length > 0 &&
                productForPurchase?.attributes.map((attribute, index) => (
                  <FeatureItemBoxMobile key={index} i={index}>
                    <Typography variant="body">{attribute.name}</Typography>
                    <Typography variant="body">
                      {attribute.attribute_values[0].value}
                    </Typography>
                  </FeatureItemBoxMobile>
                ))}
            </FeatureBox>
          </ProductFeaturesMobile>
        )}
        {tabValue2 === 1 && (
          <Box sx={{ p: 2, my: 2 }}>
            <Typography variant="h4" textAlign={"center"}>
              Product Document
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {[...Array(3)].map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    width: "100px",
                    my: 1,
                    color: "#f3f3f3",
                    bgcolor: "black",
                    fontSize: "0.4rem",
                  }}
                  component="a"
                  href="https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing"
                  target="_blank"
                  variant="contained"
                  // endIcon={<DownloadIcon />}
                >
                  Certificate name
                </Button>
              ))}
            </Box>
            <Box sx={{ py: 2 }}>
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Amet bibendum id et tellus, est nisl massa. Tortor lorem
              massa vitae tortor quis. Faucibus consequat, suspendisse ....
            </Box>
          </Box>
        )}
        {tabValue2 === 2 && (
          <Box sx={{ p: 2, my: 2 }}>
            <Typography variant="h4" textAlign={"center"}>
              Warranty Card
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {[...Array(3)].map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    width: "100px",
                    my: 1,
                    color: "#f3f3f3",
                    bgcolor: "black",
                    fontSize: "0.4rem",
                  }}
                  component="a"
                  href="https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing"
                  target="_blank"
                  variant="contained"
                  // endIcon={<DownloadIcon />}
                >
                  Certificate name
                </Button>
              ))}
            </Box>
            <Box sx={{ py: 2 }}>
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Amet bibendum id et tellus, est nisl massa. Tortor lorem
              massa vitae tortor quis. Faucibus consequat, suspendisse ....
            </Box>
          </Box>
        )}
        {tabValue2 === 3 && (
          <Box sx={{ p: 2, my: 2 }}>
            <Typography variant="h4" textAlign={"center"}>
              Booking Document
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {[...Array(3)].map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    width: "100px",
                    my: 1,
                    color: "#f3f3f3",
                    bgcolor: "black",
                    fontSize: "0.4rem",
                  }}
                  component="a"
                  href="https://docs.google.com/spreadsheets/d/1wZeHkfMLq-tU0yYKc0-qO0vPsBsLLHvAoyPy1OK-mpI/edit?usp=sharing"
                  target="_blank"
                  variant="contained"
                  // endIcon={<DownloadIcon />}
                >
                  Certificate name
                </Button>
              ))}
            </Box>
            <Box sx={{ py: 2 }}>
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Amet bibendum id et tellus, est nisl massa. Tortor lorem
              massa vitae tortor quis. Faucibus consequat, suspendisse ....
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DetailModal;
