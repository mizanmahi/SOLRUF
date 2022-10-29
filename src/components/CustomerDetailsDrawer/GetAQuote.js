import React, { useRef, useState } from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import SolrufTextField from "../../components/TextField/TextField";
import QuoteAccordion from "./QuoteAccordion";
import {
  ActionsWrapper,
  ContentWrapper,
  PriceRowWrapper,
  ProductsWrapper,
  RowWrapper,
  TotalContentWrapper,
  Wrapper,
} from "./GetAQuoteStyle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { WrapWrapper } from "./GetAQuoteStyle";
import { ColumnWrapper } from "./GetAQuoteStyle";
import AddIcon from "@mui/icons-material/Add";
import { ProductsContentWrapper } from "./GetAQuoteStyle";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Template1 from "../../pages/Templates/Template1";
import Template4 from "../../pages/Templates/Template4";
import Template3 from "../../pages/Templates/Template3";
import Template2 from "../../pages/Templates/Template2";
import { axiAuth } from "../../utils/axiosInstance";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LightTextField from "../Custom/LightTextField/LightTextField";
import TotalAccordion from "./TotalAccordion";
import DeleteIcon from "@mui/icons-material/Delete";
import { useReactToPrint } from "react-to-print";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";

const Table = styled("table")(({ theme }) => ({
  borderCollapse: "collapse",
  border: "1px solid #e0e0e0",
  width: "100%",
  "& thead": {
    backgroundColor: "#f5f5f5",
    "& tr": {
      height: 56,
    },
  },
  "& tbody": {
    "& tr": {
      textAlign: "center",
      height: 48,

      "&:nth-of-type(odd)": {
        backgroundColor: "#ffffff",
      },
      "&:nth-of-type(even)": {
        backgroundColor: "#f5f5f5",
      },
      "& td": {
        padding: "0.5rem",
        border: "1px solid #e0e0e0",
      },
    },
  },
}));

export const GetAQuote = ({
  customerId,
  quotationToBeEdited,
  page = 0,
  setPages,
}) => {
  const [invoiceType, setInvoiceType] = useState("TAX_INVOICE");
  const [template, setTemplate] = useState("temp1");
  const template1Ref = useRef(null);
  const template2Ref = useRef(null);
  const template3Ref = useRef(null);
  const template4Ref = useRef(null);

  // const [page, setPages] = useState(0);

  const refToPrint = () => {
    switch (template) {
      case "temp1":
        return template1Ref;
      case "temp2":
        return template2Ref;
      case "temp3":
        return template3Ref;
      case "temp4":
        return template4Ref;
      default:
        return template1Ref;
    }
  };

  const handlePrint = useReactToPrint({
    content: () => refToPrint().current,
    documentTitle: "Quotation",
  });

  console.log({ quotationToBeEdited });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...quotationToBeEdited,
    },
  });

  console.log("quotationToBeEdited", quotationToBeEdited);

  const termsAndConditions =
    quotationToBeEdited && quotationToBeEdited.terms_conditions
      ? quotationToBeEdited.terms_conditions.map((tc, i) => {
          return {
            id: i + 1,
            tc,
          };
        })
      : [
          {
            id: 1,
            tc: "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.".toString(),
          },
          {
            id: 2,
            tc: "Any additional or deleted services or supplies shall be stated separately in the invoice.".toString(),
          },
          {
            id: 3,
            tc: "Company is not responsible for any transit damages.".toString(),
          },
        ];

  const [tnc, setTnc] = useState(termsAndConditions);

  const [invoiceData, setInvoiceData] = useState({
    invoice_no: "",
    date: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10),
  });

  const items =
    quotationToBeEdited && quotationToBeEdited.items
      ? quotationToBeEdited.items.map((quotation, i) => {
          return {
            id: i + 1,
            properties: {
              product_name: quotation.product_name,
              product_price: quotation.product_price,
              hsn_sac_code: quotation.hsn_sac_code,
              units_per_quantity: quotation.units_per_quantity,
              unit_type: quotation.unit_type,
              igst: quotation.igst,
              cgst: quotation.cgst,
              sgst: quotation.sgst,
            },
          };
        })
      : [
          {
            id: 1,
            properties: {
              product_name: "",
              product_price: 100,
              hsn_sac_code: 0,
              units_per_quantity: 1,
              unit_type: "",
              igst: 0,
              cgst: 0,
              sgst: 0,
            },
          },
        ];

  const [productsData, setProductsData] = useState(items);

  const [quoteData, setQuoteData] = useState(quotationToBeEdited);

  const addProduct = () => {
    setProductsData((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          properties: {
            product_name: "",
            product_price: 100,
            hsn_sac_code: "",
            units_per_quantity: 1,
            unit_type: "",
            igst: 0,
            cgst: 0,
            sgst: 0,
          },
        },
      ];
    });
  };

  const addTNC = () => {
    setTnc((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          tc: "",
        },
      ];
    });
  };

  const onInvoiceTypeChange = (event) => {
    console.log(event.target.value);
    setInvoiceType(event.target.value);
  };

  const onTemplateChange = (event) => {
    console.log(event.target.value);
    setTemplate(event.target.value);
  };

  const quotationSubmitHandler = async (data) => {
    // if nothing in the terms and conditions filed return error
    if (tnc.some((tc) => tc.tc.trim() === "")) {
      toast.error("Please fill all the terms and conditions");
      return;
    }
    if (page === 0) {
      setPages(1);
      return;
    }

    const quotationData = {
      ...data,
      items: productsData.map((prod) => prod.properties),
      type: invoiceType,
      customer_id: customerId,
      due_in: 0,
      terms_conditions: tnc.map((tc) => tc.tc),
    };

    if (quotationData.items.length === 0) {
      toast.error("Please add at-least one product");
      return;
    }

    setQuoteData(quotationData);

    const url = quotationToBeEdited
      ? `api/quotations/${quotationToBeEdited.id}`
      : "api/quotations";

    let res = null;

    try {
      if (quotationToBeEdited) {
        res = await axiAuth.put(url, quotationData);
      } else {
        res = await axiAuth.post(url, quotationData);
      }

      if (res.status === 200) {
        if (quotationToBeEdited) {
          toast.success("Quotation Updated Successfully");
        } else {
          toast.success("Quotation Created Successfully");
        }
      }
      console.log(data);
      setPages(2);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  console.log(errors);

  const pages = [
    <Wrapper>
      <ContentWrapper>
        {/* Quotation Name */}
        <SolrufTextField
          size="small"
          type="text"
          label="Quotation Name"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
          helperText={errors.name?.message}
          error={true}
        />

        {/* ====== INVOICE DETAILS ====== */}

        <QuoteAccordion
          title="Invoice Details"
          titleStyle={{ fontSize: "1rem" }}
        >
          <ColumnWrapper>
            <Box
              onChange={onInvoiceTypeChange}
              sx={{ display: "flex", columnGap: "1rem" }}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "0.5rem",
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  background: invoiceType === "TAX_INVOICE" ? "#ffd05b" : "",
                }}
              >
                <Box
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    borderRadius: "1rem",
                    border: "1px solid black",
                    background: invoiceType === "TAX_INVOICE" ? "#4D4D4D" : "",
                  }}
                />
                <input
                  type="radio"
                  value="TAX_INVOICE"
                  name="TAX_INVOICE"
                  checked={invoiceType === "TAX_INVOICE"}
                  onChange={() => {}}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    opacity: "0",
                    zIndex: 20,
                  }}
                />
                <Typography variant="p" sx={{ fontWeight: "600" }}>
                  Tax Invoice
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "0.5rem",
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  background:
                    invoiceType === "PROFORMA_INVOICE" ? "#ffd05b" : "",
                }}
              >
                <Box
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    borderRadius: "1rem",
                    border: "1px solid black",
                    background:
                      invoiceType === "PROFORMA_INVOICE" ? "#4d4d4d" : "",
                  }}
                />
                <input
                  type="radio"
                  value="PROFORMA_INVOICE"
                  name="PROFORMA_INVOICE"
                  checked={invoiceType === "PROFORMA_INVOICE"}
                  onChange={() => {}}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    opacity: "0",
                    zIndex: 20,
                  }}
                />
                <Typography variant="p" sx={{ fontWeight: "600" }}>
                  Proforma Invoice
                </Typography>
              </Box>
            </Box>
            <WrapWrapper>
              <SolrufTextField
                size="large"
                type="text"
                label="Invoice Number"
                // value={invoiceData.invoice_no}
                // onChange={(e) => {
                //    setInvoiceData({
                //       ...invoiceData,
                //       invoice_no: e.target.value,
                //    });
                // }}

                {...register("invoice_no", {
                  required: {
                    value: true,
                    message: "Invoice no. is required",
                  },
                })}
                helperText={errors.invoice_no?.message}
                error={!!errors.invoice_no}
              />
              <Box
                sx={{
                  border: "2px solid #ffd05b",
                  borderRadius: "5px",
                  padding: "0.5rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                  }}
                >
                  Date
                </Typography>
                <TextField
                  variant="standard"
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) => {
                    console.log("date");
                    console.log(e.target.value);
                    console.log(typeof e.target.value);
                    setInvoiceData({
                      ...invoiceData,
                      date: e.target.value,
                    });
                  }}
                />
              </Box>
              <Box
                sx={{
                  border: "2px solid #ffd05b",
                  borderRadius: "5px",
                  padding: "0.5rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                  }}
                >
                  Due Date
                </Typography>
                <TextField
                  variant="standard"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => {
                    setInvoiceData({
                      ...invoiceData,
                      dueDate: e.target.value,
                    });
                  }}
                />
              </Box>
            </WrapWrapper>
          </ColumnWrapper>
        </QuoteAccordion>

        {/* ====== BUYER DETAILS ====== */}

        <QuoteAccordion title="Buyer Details" titleStyle={{ fontSize: "1rem" }}>
          <ColumnWrapper>
            <WrapWrapper>
              <SolrufTextField
                size="small"
                type="text"
                label="Company Name"
                {...register("buyer_name", {
                  required: {
                    value: true,
                    message: "Buyer name is required",
                  },
                })}
                helperText={errors.buyer_name?.message}
                error={!!errors.buyer_name}
              />
              <SolrufTextField
                size="small"
                type="text"
                label="Company Address"
                {...register("buyer_address", {
                  required: {
                    value: true,
                    message: "Buyer Address is required",
                  },
                })}
                helperText={errors.buyer_address?.message}
                error={!!errors.buyer_address}
              />
            </WrapWrapper>

            <WrapWrapper>
              <SolrufTextField
                size="small"
                type="number"
                label="Phone Number"
                {...register("buyer_phone", {
                  required: {
                    value: true,
                    message: "Buyer phone is required",
                  },
                })}
                helperText={errors.buyer_phone?.message}
                error={!!errors.buyer_phone}
              />
              <SolrufTextField
                size="small"
                type="text"
                label="Email (Optional)"
                {...register("buyer_email")}
              />
            </WrapWrapper>

            <WrapWrapper>
              <SolrufTextField
                size="small"
                type="text"
                label="Company Website (Optional)"
                {...register("website")}
                helperText={errors.website?.message}
                error={!!errors.website}
              />
              <SolrufTextField
                size="small"
                type="text"
                label="GST Number (Optional)"
                {...register("buyer_gst")}
                // helperText={errors.buyer_gst?.message}
                // error={!!errors.buyer_gst}
              />
            </WrapWrapper>
          </ColumnWrapper>
        </QuoteAccordion>

        {/* Shipping */}

        <QuoteAccordion
          title="Shipping Details"
          titleStyle={{ fontSize: "1rem" }}
        >
          <ColumnWrapper>
            <WrapWrapper>
              <SolrufTextField
                size="small"
                type="text"
                label="Name"
                {...register("shipping_name", {
                  required: {
                    value: true,
                    message: "Shipping Name is required",
                  },
                })}
                helperText={errors.shipping_name?.message}
                error={!!errors.shipping_name}
              />
              <SolrufTextField
                size="small"
                type="text"
                label="Address"
                {...register("shipping_address", {
                  required: {
                    value: true,
                    message: "Shipping Address is required",
                  },
                })}
                helperText={errors.shipping_address?.message}
                error={!!errors.shipping_address}
              />
            </WrapWrapper>

            <WrapWrapper>
              <SolrufTextField
                size="small"
                type="number"
                label="Phone"
                {...register("shipping_phone", {
                  required: {
                    value: true,
                    message: "Shipping phone is required",
                  },
                })}
                helperText={errors.shipping_phone?.message}
                error={!!errors.shipping_phone}
              />
              <SolrufTextField
                size="small"
                type="text"
                label="Email"
                {...register("shipping_email", {
                  required: {
                    value: true,
                    message: "Shipping email is required",
                  },
                })}
                helperText={errors.shipping_email?.message}
                error={!!errors.shipping_email}
              />
            </WrapWrapper>
          </ColumnWrapper>
        </QuoteAccordion>

        {/* Bank Pay Data */}

        <QuoteAccordion
          title="Bank Payment Details"
          titleStyle={{ fontSize: "1rem" }}
        >
          <ColumnWrapper>
            <WrapWrapper>
              <SolrufTextField
                size="small"
                type="text"
                label="Beneficiary Name"
                {...register("bank_beneficiary_name", {
                  required: {
                    value: true,
                    message: "Bank beneficiary name is required",
                  },
                })}
                helperText={errors.bank_beneficiary_name?.message}
                error={!!errors.bank_beneficiary_name}
              />
              <SolrufTextField
                size="small"
                type="text"
                label="Account Number"
                {...register("bank_account_no", {
                  required: {
                    value: true,
                    message: "Account Number is required",
                  },
                })}
                helperText={errors.bank_account_no?.message}
                error={!!errors.bank_account_no}
              />
            </WrapWrapper>
            <WrapWrapper>
              <SolrufTextField
                size="small"
                type="text"
                label="Bank Name"
                {...register("bank_name", {
                  required: {
                    value: true,
                    message: "Bank Name is required",
                  },
                })}
                helperText={errors.bank_name?.message}
                error={!!errors.bank_name}
              />
              <SolrufTextField
                size="small"
                type="text"
                label="IFSC Code"
                {...register("bank_ifsc", {
                  required: {
                    value: true,
                    message: "Bank Ifsc is required",
                  },
                })}
                helperText={errors.bank_ifsc?.message}
                error={!!errors.bank_ifsc}
              />
              <SolrufTextField
                size="small"
                type="text"
                label="UPI Address"
                {...register("bank_upi_address", {
                  required: {
                    value: true,
                    message: "Bank UPI Address is required",
                  },
                })}
                helperText={errors.bank_upi_address?.message}
                error={!!errors.bank_upi_address}
              />
            </WrapWrapper>
          </ColumnWrapper>
        </QuoteAccordion>

        {/* Terms & Conditions */}

        <QuoteAccordion
          title="Terms & Conditions"
          titleStyle={{ fontSize: "1rem" }}
        >
          <ColumnWrapper>
            {tnc.map((ele, idx) => {
              return (
                <RowWrapper key={"tnc" + idx}>
                  <SolrufTextField
                    size="small"
                    type="text"
                    label={`Terms and Conditions ${idx + 1}`}
                    value={tnc[idx].tc}
                    onChange={(e) => {
                      setTnc((prev) => {
                        prev[idx].tc = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                  <Button
                    onClick={() => {
                      setTnc((prev) =>
                        prev.filter((ele, k) => {
                          return k !== idx;
                        })
                      );
                    }}
                  >
                    <CloseIcon sx={{ color: "red" }} />
                  </Button>
                </RowWrapper>
              );
            })}
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  px: 3,
                  color: "rgba(0,0,0,0.67)",
                  border: "1px solid black",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  addTNC(tnc.length + 1);
                }}
              >
                <AddIcon sx={{ fontSize: "1.2rem" }} /> Add T&C
              </Button>
            </Box>
          </ColumnWrapper>
        </QuoteAccordion>
      </ContentWrapper>
      <ActionsWrapper>
        <PrimaryButton
          sx={{
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
            bgcolor: "secondary.light",
            py: 1.5,
            "&:hover": {
              bgcolor: "primary.main",
            },
          }}
          type="submit"
          size="large"
          IconEnd={KeyboardArrowRightIcon}
          fullWidth
        >
          Next
        </PrimaryButton>
      </ActionsWrapper>
    </Wrapper>,

    // product details table
    <Wrapper>
      <ProductsContentWrapper>
        <ColumnWrapper>
          <Box
            sx={{
              display: "flex",
              columnGap: "1rem",
              alignItems: "center",
            }}
          >
            <ChevronLeftIcon
              onClick={() => {
                setPages(0);
              }}
              sx={{ color: "", fontSize: "2rem", cursor: "pointer" }}
            />
            <Typography
              variant="h5"
              sx={{
                fontSize: "1.5rem",
                my: 1,
              }}
            >
              Product Details
            </Typography>
          </Box>

          <Table
            sx={{
              "@media (max-width: 900px)": {
                display: "none",
              },
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price (Rs.)</th>
                <th>HSN/SAC</th>
                <th>Units</th>
                <th>Unit Type</th>
                <th>CGST (%)</th>
                <th>IGST (%)</th>
                <th>SGST (%)</th>
                <th>Amount (Rs.)</th>
                <th style={{ width: "1rem" }}></th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, i) => (
                <tr key={"product" + i}>
                  {Object.entries(product.properties).map((product, j) => {
                    return (
                      <td width={j === 0 ? "20%" : "auto"}>
                        <LightTextField
                          sx={{ minWidth: "4rem" }}
                          placeholder={product[0]}
                          type="text"
                          size="small"
                          name={product[0]}
                          value={product[1]}
                          onChange={(e) => {
                            setProductsData((prev) => {
                              prev[i].properties[product[0]] = e.target.value;
                              return [...prev];
                            });
                          }}
                        />
                      </td>
                    );
                  })}
                  <td>
                    {(
                      (parseFloat(product.properties.product_price) +
                        (parseFloat(product.properties.cgst) / 100) *
                          parseFloat(product.properties.product_price) +
                        (parseFloat(product.properties.igst) / 100) *
                          parseFloat(product.properties.product_price) +
                        (parseFloat(product.properties.sgst) / 100) *
                          parseFloat(product.properties.product_price)) *
                      parseInt(product.properties.units_per_quantity)
                    ).toFixed(2)}
                  </td>
                  <td style={{ width: "1rem" }}>
                    <Button
                      onClick={() => {
                        setProductsData((prev) =>
                          prev.filter((ele, k) => {
                            return k !== i;
                          })
                        );
                      }}
                    >
                      <CloseIcon sx={{ color: "red" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {productsData?.length === 0 && (
            <Typography
              sx={{
                textAlign: "center",
                color: "rgba(0,0,0,0.5)",
                fontSize: "1.2rem",
              }}
            >
              Please add at least one product*
            </Typography>
          )}

          <ProductsWrapper>
            {productsData.map((product, i) => (
              <ColumnWrapper
                key={"product2" + i}
                sx={{
                  borderBottom: "0.2px solid #d3d3d3",
                  paddingBottom: "1rem",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color="black">Product {i + 1}</Typography>
                  <Button
                    onClick={() => {
                      setProductsData((prev) =>
                        prev.filter((ele, k) => {
                          return k !== i;
                        })
                      );
                    }}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </Button>
                </Box>

                <RowWrapper>
                  <SolrufTextField
                    placeholder="Product Name"
                    type="text"
                    size="small"
                    name="product_name"
                    label="Product Name"
                    value={product.properties.product_name}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProductsData((prev) => {
                        prev[i].properties.product_name = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                  <SolrufTextField
                    placeholder="Price"
                    type="text"
                    size="small"
                    name="product_price"
                    label="Product Price"
                    value={product.properties.product_price}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProductsData((prev) => {
                        prev[i].properties.product_price = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                </RowWrapper>
                <RowWrapper>
                  <SolrufTextField
                    placeholder="HSN/SAC Code"
                    type="text"
                    size="small"
                    name="hsn_sac_code"
                    label="HSN/SAC Code"
                    value={product.properties.hsn_sac_code}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProductsData((prev) => {
                        prev[i].properties.hsn_sac_code = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                  <SolrufTextField
                    placeholder="Units"
                    type="text"
                    size="small"
                    name="units_per_quantity"
                    label="Units"
                    value={product.properties.units_per_quantity}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProductsData((prev) => {
                        prev[i].properties.units_per_quantity = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                </RowWrapper>
                <RowWrapper>
                  <SolrufTextField
                    placeholder="Unit Type"
                    type="text"
                    size="small"
                    name="unit_type"
                    label="Unit Type"
                    value={product.properties.unit_type}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProductsData((prev) => {
                        prev[i].properties.unit_type = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                  <SolrufTextField
                    placeholder="CGST"
                    type="text"
                    size="small"
                    name="cgst"
                    label="CGST"
                    value={product.properties.cgst}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProductsData((prev) => {
                        prev[i].properties.cgst = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                </RowWrapper>
                <RowWrapper>
                  <SolrufTextField
                    placeholder="IGST"
                    type="text"
                    size="small"
                    name="igst"
                    label="IGST"
                    value={product.properties.igst}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProductsData((prev) => {
                        prev[i].properties.igst = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                  <SolrufTextField
                    placeholder="SGST"
                    type="text"
                    size="small"
                    name="sgst"
                    label="SGST"
                    value={product.properties.sgst}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProductsData((prev) => {
                        prev[i].properties.sgst = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                </RowWrapper>
                <ActionsWrapper>
                  <Typography color="black">
                    Amount: ₹
                    {(
                      (parseFloat(product.properties.product_price) +
                        (parseFloat(product.properties.cgst) / 100) *
                          parseFloat(product.properties.product_price) +
                        (parseFloat(product.properties.igst) / 100) *
                          parseFloat(product.properties.product_price) +
                        (parseFloat(product.properties.sgst) / 100) *
                          parseFloat(product.properties.product_price)) *
                      parseInt(product.properties.units_per_quantity)
                    ).toFixed(2)}
                  </Typography>
                </ActionsWrapper>
              </ColumnWrapper>
            ))}
          </ProductsWrapper>
        </ColumnWrapper>
      </ProductsContentWrapper>
      <Box
        sx={{
          display: "flex",
          widht: "100%",
          justifyContent: "end",
          padding: "0.5rem 1rem",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            px: 3,
            display: "flex",
            alignItems: "center",
            // color: "#ffd05b",
            fontWeight: "bold",
            border: "1px solid #4d4d4d",
            color: "primary.dark",
          }}
          onClick={addProduct}
        >
          <AddIcon sx={{ fontSize: "1.2rem", color: "primary.dark" }} /> Add a
          product
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "end",
          flexDirection: "column",
          padding: "1rem",
          "@media (max-width: 600px)": { display: "none" },
          rowGap: "0.8rem",
        }}
      >
        <Typography
          sx={{
            color: "black",
          }}
        >
          Sub Total Price:{" "}
          <span style={{ fontWeight: "bold" }}>
            ₹
            {productsData.reduce((accumulator, product) => {
              return (
                accumulator +
                product.properties.product_price *
                  product.properties.units_per_quantity
              );
            }, 0)}
          </span>
        </Typography>
        <Typography
          sx={{
            color: "black",
          }}
        >
          Tax:
          <span style={{ fontWeight: "bold" }}>
            ₹
            {productsData
              .reduce((accumulator, product) => {
                return (
                  accumulator +
                  product.properties.product_price *
                    product.properties.units_per_quantity *
                    (product.properties.cgst / 100 +
                      product.properties.igst / 100 +
                      product.properties.sgst / 100)
                );
              }, 0)
              .toFixed(2)}
          </span>
        </Typography>
        <Typography
          sx={{
            color: "black",
          }}
        >
          Total Price:{" "}
          <span style={{ fontWeight: "bold" }}>
            ₹
            {productsData
              .reduce((accumulator, product) => {
                return (
                  accumulator +
                  product.properties.product_price *
                    product.properties.units_per_quantity *
                    (product.properties.cgst / 100 +
                      product.properties.igst / 100 +
                      product.properties.sgst / 100 +
                      1)
                );
              }, 0)
              .toFixed(2)}
          </span>
        </Typography>
      </Box>

      <ActionsWrapper>
        <PrimaryButton
          sx={{
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
            bgcolor: "secondary.light",
            py: 1.5,
            "&:hover": {
              bgcolor: "primary.main",
            },
          }}
          type="submit"
          size="large"
          IconEnd={KeyboardArrowRightIcon}
          fullWidth
        >
          Save
        </PrimaryButton>
      </ActionsWrapper>
    </Wrapper>,

    // === templates
    <Wrapper>
      <ProductsContentWrapper>
        <ColumnWrapper>
          <Box
            sx={{
              display: "flex",
              columnGap: "1rem",
              alignItems: "center",
            }}
          >
            <ChevronLeftIcon
              onClick={() => {
                setPages(1);
              }}
              sx={{ color: "", fontSize: "2rem", cursor: "pointer" }}
            />
            <Typography
              variant="h5"
              sx={{
                fontSize: "1.5rem",
                my: 1,
              }}
            >
              Invoice Templates
            </Typography>
          </Box>

          <Box
            onChange={onTemplateChange}
            sx={{
              display: "flex",
              columnGap: "1rem",
              "@media (max-width: 1000px)": {
                display: "none",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "0.5rem",
                cursor: "pointer",
                background: template === "temp1" ? "#ffd05b" : "",
              }}
            >
              <img
                style={{
                  width: "12rem",
                  border: "1px solid rgba(0,0,0,0.8)",
                }}
                src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Templates/template1.png"
                alt=""
              />
              <RowWrapper>
                <Box
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    borderRadius: "1rem",
                    border: "1px solid black",
                    background: template === "temp1" ? "black" : "#4d4d4d",
                  }}
                />
                <Typography variant="p" sx={{ fontWeight: "600" }}>
                  Template 1
                </Typography>
              </RowWrapper>
              <input
                type="radio"
                value="temp1"
                name="temp1"
                checked={template === "temp1"}
                onChange={() => {}}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  opacity: "0",
                  zIndex: 20,
                }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "0.5rem",
                cursor: "pointer",
                background: template === "temp2" ? "#ffd05b" : "",
              }}
            >
              <img
                style={{
                  width: "12rem",
                  border: "1px solid rgba(0,0,0,0.8)",
                }}
                src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Templates/template2.png"
                alt=""
              />

              <RowWrapper>
                <Box
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    borderRadius: "1rem",
                    border: "1px solid black",
                    background: template === "temp2" ? "black" : "#4d4d4d",
                  }}
                />
                <Typography variant="p" sx={{ fontWeight: "600" }}>
                  Template 2
                </Typography>
              </RowWrapper>

              <input
                type="radio"
                value="temp2"
                name="temp2"
                checked={template === "temp2"}
                onChange={() => {}}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  opacity: "0",
                  zIndex: 20,
                }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "0.5rem",
                cursor: "pointer",
                background: template === "temp3" ? "#ffd05b" : "",
              }}
            >
              <img
                style={{
                  width: "12rem",
                  border: "1px solid rgba(0,0,0,0.8)",
                }}
                src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Templates/template3.png"
                alt=""
              />

              <RowWrapper>
                <Box
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    borderRadius: "1rem",
                    border: "1px solid black",
                    background: template === "temp3" ? "black" : "#4d4d4d",
                  }}
                />
                <Typography variant="p" sx={{ fontWeight: "600" }}>
                  Template 3
                </Typography>
              </RowWrapper>

              <input
                type="radio"
                value="temp3"
                name="temp3"
                checked={template === "temp3"}
                onChange={() => {}}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  opacity: "0",
                  zIndex: 20,
                }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "0.5rem",
                cursor: "pointer",
                background: template === "temp4" ? "#ffd05b" : "",
              }}
            >
              <img
                style={{
                  width: "12rem",
                  border: "1px solid rgba(0,0,0,0.8)",
                }}
                src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Templates/template4.png"
                alt=""
              />

              <RowWrapper>
                <Box
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    borderRadius: "1rem",
                    border: "1px solid black",
                    background: template === "temp4" ? "black" : "#4d4d4d",
                  }}
                />
                <Typography variant="p" sx={{ fontWeight: "600" }}>
                  Template 4
                </Typography>
              </RowWrapper>

              <input
                type="radio"
                value="temp4"
                name="temp4"
                checked={template === "temp4"}
                onChange={() => {}}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  opacity: "0",
                  zIndex: 20,
                }}
              />
            </Box>
          </Box>

          <Box
            onChange={onTemplateChange}
            sx={{
              display: "none",
              flexDirection: "column",
              rowGap: "1rem",
              "@media (max-width: 1000px)": {
                display: "flex",
              },
            }}
          >
            <ColumnWrapper
              sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  background: template === "temp1" ? "#ffd05b" : "",
                }}
              >
                <img
                  style={{
                    width: "10rem",
                    height: "13rem",
                    border: "1px solid rgba(0,0,0,0.8)",
                  }}
                  src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Templates/template1.png"
                  alt=""
                />
                <RowWrapper>
                  <Box
                    sx={{
                      width: "0.7rem",
                      height: "0.7rem",
                      borderRadius: "1rem",
                      border: "1px solid black",
                      background: template === "temp1" ? "black" : "#4d4d4d",
                    }}
                  />
                  <Typography variant="p" sx={{ fontWeight: "600" }}>
                    Template 1
                  </Typography>
                </RowWrapper>
                <input
                  type="radio"
                  value="temp1"
                  name="temp1"
                  checked={template === "temp1"}
                  onChange={() => {}}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    opacity: "0",
                    zIndex: 20,
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  background: template === "temp2" ? "#ffd05b" : "",
                }}
              >
                <img
                  style={{
                    width: "10rem",
                    height: "13rem",
                    border: "1px solid rgba(0,0,0,0.8)",
                  }}
                  src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Templates/template2.png"
                  alt=""
                />

                <RowWrapper>
                  <Box
                    sx={{
                      width: "0.7rem",
                      height: "0.7rem",
                      borderRadius: "1rem",
                      border: "1px solid black",
                      background: template === "temp2" ? "black" : "#4d4d4d",
                    }}
                  />
                  <Typography variant="p" sx={{ fontWeight: "600" }}>
                    Template 2
                  </Typography>
                </RowWrapper>

                <input
                  type="radio"
                  value="temp2"
                  name="temp2"
                  checked={template === "temp2"}
                  onChange={() => {}}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    opacity: "0",
                    zIndex: 20,
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  background: template === "temp3" ? "#ffd05b" : "",
                }}
              >
                <img
                  style={{
                    width: "10rem",
                    height: "13rem",
                    border: "1px solid rgba(0,0,0,0.8)",
                  }}
                  src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Templates/template3.png"
                  alt=""
                />

                <RowWrapper>
                  <Box
                    sx={{
                      width: "0.7rem",
                      height: "0.7rem",
                      borderRadius: "1rem",
                      border: "1px solid black",
                      background: template === "temp3" ? "black" : "#4d4d4d",
                    }}
                  />
                  <Typography variant="p" sx={{ fontWeight: "600" }}>
                    Template 3
                  </Typography>
                </RowWrapper>

                <input
                  type="radio"
                  value="temp3"
                  name="temp3"
                  checked={template === "temp3"}
                  onChange={() => {}}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    opacity: "0",
                    zIndex: 20,
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  background: template === "temp4" ? "#ffd05b" : "",
                }}
              >
                <img
                  style={{
                    width: "10rem",
                    height: "13rem",
                    border: "1px solid rgba(0,0,0,0.8)",
                  }}
                  src="https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/Templates/template4.png"
                  alt=""
                />

                <RowWrapper>
                  <Box
                    sx={{
                      width: "0.7rem",
                      height: "0.7rem",
                      borderRadius: "1rem",
                      border: "1px solid black",
                      background: template === "temp4" ? "black" : "#4d4d4d",
                    }}
                  />
                  <Typography variant="p" sx={{ fontWeight: "600" }}>
                    Template 4
                  </Typography>
                </RowWrapper>

                <input
                  type="radio"
                  value="temp4"
                  name="temp4"
                  checked={template === "temp4"}
                  onChange={() => {}}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    opacity: "0",
                    zIndex: 20,
                  }}
                />
              </Box>
            </ColumnWrapper>
          </Box>
        </ColumnWrapper>
      </ProductsContentWrapper>
      <Box
        sx={{
          display: "flex",
          widht: "100%",
          justifyContent: "end",
          padding: "1rem",
          "@media (max-width: 600px)": { display: "none" },
        }}
      >
        <Typography
          sx={{
            color: "black",
          }}
        >
          Total Price:{" "}
          <span style={{ fontWeight: "bold" }}>
            ₹
            {productsData.reduce((accumulator, product) => {
              return (
                accumulator +
                product.properties.product_price *
                  product.properties.units_per_quantity
              );
            }, 0)}
          </span>
        </Typography>
      </Box>

      <Template1 quoteData={quoteData} templateRef={template1Ref} />
      <Template2 quoteData={quoteData} templateRef={template2Ref} />
      <Template3 quoteData={quoteData} templateRef={template3Ref} />
      <Template4 quoteData={quoteData} templateRef={template4Ref} />

      <ActionsWrapper>
        <PrimaryButton
          sx={{
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
            bgcolor: "secondary.light",
            py: 1.5,
            "&:hover": {
              bgcolor: "primary.main",
            },
          }}
          size="large"
          IconEnd={KeyboardArrowRightIcon}
          fullWidth
          onClick={handlePrint}
        >
          Download
        </PrimaryButton>
      </ActionsWrapper>
    </Wrapper>,
  ];

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
      component="form"
      onSubmit={handleSubmit(quotationSubmitHandler)}
      noValidate
    >
      <TotalAccordion
        title={`Total Price: ₹${productsData.reduce((accumulator, product) => {
          return (
            accumulator +
            product.properties.product_price *
              product.properties.units_per_quantity
          );
        }, 0)}`}
      >
        <TotalContentWrapper>
          <hr
            style={{
              borderStyle: "solid",
              borderWidth: "0.2px",
              opacity: "0.5",
              marginBottom: "0.8rem",
            }}
          />
          <PriceRowWrapper>
            <Typography>Price:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              ₹
              {productsData.reduce((accumulator, product) => {
                return (
                  accumulator +
                  product.properties.product_price *
                    product.properties.units_per_quantity
                );
              }, 0)}
            </Typography>
          </PriceRowWrapper>
          <PriceRowWrapper>
            <Typography>CGST:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              ₹
              {productsData.reduce((accumulator, product) => {
                return (
                  accumulator +
                  product.properties.cgst *
                    product.properties.units_per_quantity
                );
              }, 0)}
            </Typography>
          </PriceRowWrapper>
          <PriceRowWrapper>
            <Typography>IGST:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              ₹
              {productsData.reduce((accumulator, product) => {
                return (
                  accumulator +
                  product.properties.igst *
                    product.properties.units_per_quantity
                );
              }, 0)}
            </Typography>
          </PriceRowWrapper>
          <PriceRowWrapper>
            <Typography>SGST:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              ₹
              {productsData.reduce((accumulator, product) => {
                return (
                  accumulator +
                  product.properties.sgst *
                    product.properties.units_per_quantity
                );
              }, 0)}
            </Typography>
          </PriceRowWrapper>

          <hr
            style={{
              borderStyle: "solid",
              borderWidth: "0.2px",
              opacity: "0.5",
              marginTop: "0.8rem",
            }}
          />
        </TotalContentWrapper>
      </TotalAccordion>
      {pages[page]}
    </Box>
  );
};
