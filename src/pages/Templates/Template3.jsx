import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useInWords from "../../hooks/useInWords";
import {
  AboutBox,
  AmountWordsWrapper,
  Cell,
  CompanyWrapper,
  DeclarationWrapper,
  InvoiceDetailsWrapper,
  InvoicePageWrapper,
  RowWrapper,
  SmallDetailBox,
  StripWrapper,
  TableHeaderCell,
  TCWrapper,
  TotalWrapper,
  Wrapper,
  YellowSlip,
} from "./Template3Style";
import { Logo } from "./Template1Style";
import { axiAuth } from "../../utils/axiosInstance";

const Template3 = ({ quoteData, templateRef }) => {
  const [seller, setSeller] = useState({
    logo: "https://i.ibb.co/rpxqJQB/Sol-Ruf-animated-Logo-1.png",
    name: "",
    address: "",
    email: "",
    phone: "",
    gstin: "",
  });

  const inWords = useInWords();

  const calculateTotal = (items) => {
    return items
      .reduce((accumulator, item) => {
        return (
          accumulator +
          ((parseFloat(item.cgst) / 100) * parseFloat(item.product_price) +
            (parseFloat(item.igst) / 100) * parseFloat(item.product_price) +
            (parseFloat(item.sgst) / 100) * parseFloat(item.product_price) +
            parseFloat(item.product_price)) *
            item.units_per_quantity
        );
      }, 0)
      .toFixed(2);
  };

  useEffect(() => {
    console.log("quoteData", quoteData);
    axiAuth
      .get("api/vendor/profile")
      .then(async (res) => {
        const { portfolio } = res.data;
        console.log("portfolio", portfolio);
        setSeller({
          name: portfolio.name,
          phone: portfolio.mobile,
          email: portfolio.email,
          address: `${portfolio.location}, ${portfolio.city}, ${portfolio.state}, ${portfolio.pincode},`,
          gstin: portfolio.gst,
          logo: portfolio.logo,
        });
      })
      .catch((err) => {
        console.log("Portfolio data error", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InvoicePageWrapper
      maxWidth="md"
      sx={{
        "@media (max-width: 600px)": {
          transform: "scale(0.6)",
          transformOrigin: "center top",
        },
      }}
    >
      <>
        <Box
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          ref={templateRef}
        >
          <YellowSlip />

          <Wrapper>
            <Typography variant="h3" sx={{ marginBottom: "2rem" }}>
              {quoteData.type === "TAX_INVOICE"
                ? "Tax Invoice"
                : "Proforma Invoice"}
            </Typography>
            <RowWrapper>
              <AboutBox>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: "bold",
                    color: "rgb(0,0,0,0.5)",
                  }}
                >
                  SELLER
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="p" sx={{ fontWeight: "600" }}>
                    {seller.name}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Address: {seller.address}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Phone: {seller.phone}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Email: {seller.email}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    GST: {seller.gstin}
                  </Typography>
                </Box>
              </AboutBox>

              <AboutBox>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: "bold",
                    color: "rgb(0,0,0,0.5)",
                  }}
                >
                  BUYER
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="p" sx={{ fontWeight: "600" }}>
                    {quoteData.buyer_name}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Contact Number: {quoteData.buyer_phone}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Email: {quoteData.buyer_email}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Address: {quoteData.buyer_address}
                  </Typography>
                  {quoteData.buyer_website && (
                    <Typography variant="p" sx={{}}>
                      Website: {quoteData.buyer_website}
                    </Typography>
                  )}
                  <Typography variant="p" sx={{}}>
                    GST: {quoteData.buyer_gst}
                  </Typography>
                </Box>
              </AboutBox>
              <AboutBox>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: "bold",
                    color: "rgb(0,0,0,0.5)",
                  }}
                >
                  SHIP TO
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="p" sx={{ fontWeight: "600" }}>
                    {quoteData.shipping_name}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Contact Number: {quoteData.shipping_phone}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Email: {quoteData.shipping_email}
                  </Typography>
                  <Typography variant="p" sx={{}}>
                    Address: {quoteData.shipping_address}
                  </Typography>
                </Box>
              </AboutBox>
              <InvoiceDetailsWrapper>
                <SmallDetailBox>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "rgb(0,0,0,0.5)",
                    }}
                  >
                    Invoice Number
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "0.8rem",
                    }}
                  >
                    {quoteData.invoice_no}
                  </Typography>
                </SmallDetailBox>

                <SmallDetailBox>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "rgb(0,0,0,0.5)",
                    }}
                  >
                    Created At
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "0.8rem",
                    }}
                  >
                    {quoteData.created_at?.slice(0, 11).replace(/\//g, "-")}
                  </Typography>
                </SmallDetailBox>
                <SmallDetailBox>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "rgb(0,0,0,0.5)",
                    }}
                  >
                    Due In
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "0.8rem",
                    }}
                  >
                    2 days
                  </Typography>
                </SmallDetailBox>
              </InvoiceDetailsWrapper>
            </RowWrapper>
            <CompanyWrapper>
              {/* <Typography variant="h4" sx={{ fontWeight: "600" }}>
                  [Company Logo]
                </Typography> */}
              <Logo>
                <img src={seller.logo} alt="" />
              </Logo>

              <Typography
                variant="p"
                sx={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {seller.name}
              </Typography>

              <Typography
                variant="p"
                sx={{
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                Address: {seller.address}
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                Phone: {seller.phone}
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                Email: {seller.email}
              </Typography>
              <Typography
                variant="p"
                sx={{ fontWeight: "600", fontSize: "0.8rem" }}
              >
                GST: {seller.gstin}
              </Typography>
            </CompanyWrapper>
            <TableContainer sx={{ width: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Sr. No.</TableHeaderCell>
                    <TableHeaderCell>Product Name</TableHeaderCell>
                    <TableHeaderCell>Price (Rs.)</TableHeaderCell>
                    <TableHeaderCell>HSN/SAC</TableHeaderCell>
                    <TableHeaderCell>Units</TableHeaderCell>
                    <TableHeaderCell>Unit Type</TableHeaderCell>
                    <TableHeaderCell>SGST (%)</TableHeaderCell>
                    <TableHeaderCell>CGST (%)</TableHeaderCell>
                    <TableHeaderCell>IGST (%)</TableHeaderCell>
                    <TableHeaderCell>Amount (Rs.)</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quoteData.items.map((item, index) => (
                    <TableRow key={item.productName + index}>
                      <Cell>{index + 1}</Cell>
                      <Cell>{item.product_name}</Cell>
                      <Cell>{parseFloat(item.product_price).toFixed(2)}</Cell>
                      <Cell>{item.hsn_sac_code}</Cell>
                      <Cell>{item.units_per_quantity}</Cell>
                      <Cell>{item.unit_type}</Cell>
                      <Cell>{parseFloat(item.cgst).toFixed(2)}</Cell>
                      <Cell>{parseFloat(item.igst).toFixed(2)}</Cell>
                      <Cell>{parseFloat(item.sgst).toFixed(2)}</Cell>
                      <Cell>
                        {parseFloat(item.product_price) *
                          parseFloat(item.units_per_quantity) *
                          (
                            1 +
                            (parseFloat(item.cgst) +
                              parseFloat(item.sgst) +
                              parseFloat(item.igst)) /
                              100
                          ).toFixed(2)}
                      </Cell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <RowWrapper>
              <AmountWordsWrapper>
                <Typography
                  sx={{
                    color: "black",
                  }}
                >
                  Amount in Words:
                </Typography>
                <Typography
                  variant="p"
                  sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                >
                  {inWords(
                    parseInt(`${calculateTotal(quoteData.items)}`.split(".")[0])
                  ).toUpperCase() +
                    " RUPEES" +
                    (`${calculateTotal(quoteData.items)}`.split(".")[1] !== "00"
                      ? " AND " +
                        inWords(
                          parseInt(
                            `${calculateTotal(quoteData.items)}`.split(".")[1]
                          )
                        ).toUpperCase() +
                        " PAISE"
                      : "") +
                    " ONLY"}
                </Typography>
              </AmountWordsWrapper>
              <TotalWrapper>
                <Typography
                  sx={{
                    color: "black",
                  }}
                >
                  Grand Total:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    ₹{calculateTotal(quoteData.items)}
                  </span>
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                  }}
                >
                  Total Invoice Value:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    ₹{calculateTotal(quoteData.items)}
                  </span>
                </Typography>
              </TotalWrapper>
            </RowWrapper>
            <TCWrapper>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "rgb(0,0,0,0.5)",
                }}
              >
                Terms & Conditions:
              </Typography>
              {quoteData.terms_conditions.map((ele, idx) => (
                <Typography sx={{ fontSize: "0.8rem" }} key={"tncr" + idx}>
                  {idx + 1}. {ele}
                </Typography>
              ))}
            </TCWrapper>
            <AboutBox>
              <Typography
                variant="p"
                sx={{
                  fontWeight: "600",
                  color: "rgb(0,0,0,0.5)",
                  fontSize: "0.9rem",
                }}
              >
                Bank Details for Payment
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="p" sx={{ fontWeight: "600" }}>
                  A/C Number: {quoteData.bank_account_no}
                </Typography>
                <Typography variant="p" sx={{}}>
                  Beneficiary Name: {quoteData.bank_beneficiary_name}
                </Typography>
                <Typography variant="p" sx={{}}>
                  Bank: {quoteData.bank_name}
                </Typography>
                <Typography variant="p" sx={{}}>
                  IFSC: {quoteData.bank_ifsc}
                </Typography>
                <Typography variant="p">
                  UPI: {quoteData.bank_upi_address}
                </Typography>
              </Box>
            </AboutBox>
            <DeclarationWrapper>
              <Typography
                sx={{
                  color: "black",
                }}
              >
                Declaration:
              </Typography>
              <Typography sx={{ fontSize: "0.8rem" }}>
                We declare that this invoice shows actual price of the goods
                described inclusive of taxes and that all particulars are true
                and correct. In case you find Selling Price on this invoice to
                be more than MRP mentioned on product, please inform{" "}
                <span style={{ fontWeight: "600", color: "black" }}>
                  support@solruf.com
                </span>
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SOLRUF CUSTOMER CARE: +91-8600694140
              </Typography>
            </DeclarationWrapper>
            <StripWrapper>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "0.9rem",
                }}
              >
                THIS IS A COMPUTER GENERATED INVOICE AND DOES NOT REQUIRE
                SIGNATURE
              </Typography>
            </StripWrapper>
          </Wrapper>
          <YellowSlip />
        </Box>
      </>
    </InvoicePageWrapper>
  );
};

export default Template3;
