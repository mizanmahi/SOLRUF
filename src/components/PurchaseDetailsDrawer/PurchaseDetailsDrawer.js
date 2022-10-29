import RightDrawer from "../RightDrawer/RightDrawer";
import {
  AmountBox,
  EnquiryDetailsWrapper,
  Flex,
  ListWrapper,
} from "./purchaseDetailsDrawer.style";
import CloseIcon from "@mui/icons-material/Close";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Input,
  Radio,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import HorizontalProductCardForEnquiryDrawer from "../EnquiryDetailsForUser/HorizontalProductCardForEnquiryDrawer";
import FeatureDetail from "../FeatureDetail/FeatureDetail";
import CustomAccordionForDrawer from "../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import VendorDetailsForPurchaseDrawer from "./VendorDetailsForPurchaseDrawer";
import { AnswerBox } from "../SalesDetailsDrawer/salesDetailsDrawer.style";
import { useEffect, useRef, useState } from "react";
import { axiAuth } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { DownloadChip } from "../CustomerDetailsDrawer/customerDetailsDrawer.style";

import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import DescriptionIcon from "@mui/icons-material/Description";
import LockIcon from "@mui/icons-material/Lock";

import { paymentStatuses } from "./constants";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
import PaymentTerms from "./PaymentTerms";
import BankDetails from "./BankDetails";
import HorizontalProductCardForEnquiryDrawerCart from "../EnquiryDetailsForUser/HorizontalProductCardForEnquiryDrawerCart";
import HorizontalProductCardForMobile from "../EnquiryDetailsForUser/HorizontalProductCardForMobile";
import PageviewIcon from "@mui/icons-material/Pageview";
import Invoice from "../EnquiryDetailsForUser/Invoice";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";

const PurchaseDetailsDrawer = ({
  rightDrawerOpen,
  setRightDrawerOpen,
  purchaseDrawerData,
}) => {
  console.log({
    purchaseDrawerData,
  });

  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [queries, setQueries] = useState([]);
  const [enquiryDocuments, setDocuments] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentMismatch, setPaymentMismatch] = useState(false);

  console.log({ enquiryDocuments });

  const [paymentStatus, setPaymentStatus] = useState(
    purchaseDrawerData.others.status
  );
  const [bankDetails, setBankDetails] = useState(null);
  // const [selectedMethod, setSelectedMethod] = useState(null);

  const [txId, setTxId] = useState("");
  const methods = [
    { value: "NEFT_RTGS", name: "NEFT / RTGS" },
    { value: "UPI", name: "UPI" },
    { value: "IMPS", name: "IMPS" },
  ];

  useEffect(() => {
    axiAuth
      .get(`api/orders/${purchaseDrawerData?.others?.order_id}/queries`)
      .then((res) => {
        setQueries(res.data.conversations);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });

    axiAuth
      .get(
        `https://api-dev.solruf.com/api/orders/${purchaseDrawerData?.others?.order_id}/documents`
      )
      .then((res) => {
        setDocuments(res.data);
        console.log(enquiryDocuments.bid_documents);
      })
      .catch((err) => {});

    axiAuth
      .get(
        `https://api-dev.solruf.com/api/orders/${purchaseDrawerData?.others?.order_id}/payment-methods`
      )
      .then((res) => {
        setBankDetails(res.data.data);
      })
      .catch((err) => {});
    if (purchaseDrawerData?.others.status === paymentStatuses.confirmed) {
      setPaymentStatus(paymentStatuses.confirmed);
    }
    console.log({ purchaseDrawerData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseDrawerData]);

  const saveTrans = () => {
    axiAuth
      .put(
        `https://api-dev.solruf.com/api/orders/${purchaseDrawerData?.others?.order_id}/payment`,
        {
          reference_id: txId,
          payment_mode: selectedMethod.value,
        }
      )
      .then((res) => {
        toast.success("Payment saved successfully");
        setPaymentMismatch(false);
        console.log(res.data);
        setPaymentStatus(paymentStatuses.confirmed);
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        setPaymentMismatch(err.response.data.message);
      });
  };

  const navigate = useNavigate();

  const handleDetailsClick = (orderType) => {
    if (orderType === "CART") {
      navigate(
        `/purchase-product/${purchaseDrawerData?.others?.details?.[0].product.product_meta.vendor_slug}/${purchaseDrawerData?.others?.details?.[0].product.product_meta.product_slug}`
      );
    }
  };

  const { profileData } = useSelector((state) => state.profile);
  const invoiceTemplateRef = useRef(null);
  const [invoiceInfo, setInvoiceInfo] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceTemplateRef.current,
    documentTitle: "Invoice",
  });

  console.log(profileData);

  const downloadInvoiceHandler = async () => {
    let vendorData;

    try {
      const { data } = await axiAuth(
        `api/share/${purchaseDrawerData?.others?.vendor?.portfolio?.slug}`
      );
      vendorData = data?.data?.portfolio;
    } catch (error) {
      toast.error("Error fetching vendor data!");
    }

    const inVoiceData = {
      vendor: vendorData,
      invoice_id: purchaseDrawerData?.others?.invoice_no,
      due_in: "2",
      buyer_name: purchaseDrawerData?.others?.billing?.company_name,
      buyer_email: purchaseDrawerData?.others?.billing?.email || "n/a",
      buyer_phone:
        purchaseDrawerData?.others?.billing?.company_name || "4555545558",
      buyer_address: purchaseDrawerData?.others?.billing?.address,
      buyer_website: purchaseDrawerData?.others?.billing?.company_name || "n/a",
      buyer_gst: purchaseDrawerData?.others?.billing?.gst_no,
      shipping_name: profileData?.business
        ? profileData?.business?.company_name
        : profileData?.first_name,
      shipping_address: profileData?.business
        ? profileData?.business?.address
        : "n/a",
      shipping_email: profileData?.business?.email
        ? profileData?.business?.email
        : profileData?.email,
      shipping_phone: profileData?.business
        ? profileData?.business?.phone
        : "n/a",
      bank_beneficiary_name: "SOLRUF INDIA PRIVATE LIMITED",
      bank_name: "Asd bank",
      bank_account_no: "2223330058550280",
      bank_ifsc: "RATN0VAAPIS",
      bank_upi_address: "rpy.paysolrufsolrufguest@icici",
      terms_conditions: [
        "Please transfer the money to the bank account details given in the purchase order section.",
        "Exact order amount should be transferred, or else the money will be refunded to source account.",
        "As soon as payment is received by Solruf, we will confirm the order for further processing and delivery.",
      ],
      // items: cart?.map((item) => {
      //    return {
      //       product_name: item?.product_meta?.product_name,
      //       product_price: item?.item_price,
      //       hsn_sac_code: item?.hsn_sac_code || 'n/a',
      //       units_per_quantity: item?.quantity,
      //       igst: 0,
      //       cgst: 5,
      //       sgst: 5,
      //    };
      // }),
      items: purchaseDrawerData?.others?.details?.map((item) => {
        console.log(item);
        if (purchaseDrawerData?.others?.type === "ENQUIRY") {
          return {
            product_name: item?.product?.productName,
            product_price: item?.item_price,
            hsn_sac_code: item?.hsn_sac_code || "n/a",
            units_per_quantity: item?.quantity,
            sgst: item?.sgst,
            igst: item?.igst,
            cgst: item?.cgst,
          };
        } else {
          return {
            product_name: item?.product?.product_meta?.product_name,
            product_price: item?.product?.item_price,
            hsn_sac_code: item?.hsn_sac_code || "n/a",
            units_per_quantity: item?.quantity,
            sgst: item?.sgst,
            igst: item?.igst,
            cgst: item?.cgst,
          };
        }
      }),
    };

    setInvoiceInfo(inVoiceData);
  };

  useEffect(() => {
    if (invoiceInfo) handlePrint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceInfo]);

  return (
    <div>
      <RightDrawer
        drawerStyles={{ backgroundColor: "#fff" }}
        open={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
        anchor="right"
      >
        <EnquiryDetailsWrapper>
          <IconButton
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <CloseIcon
              onClick={() => setRightDrawerOpen(false)}
              sx={{ color: "primary.dark" }}
            />
          </IconButton>

          {/* ============ drawer content box ============ */}
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                mb: 2,
                // pr: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ mr: 2, fontWeight: 500 }}>
                Order Reference:- <br />#{purchaseDrawerData?.others?.reference}
              </Typography>

              <Box bgcolor="#3FB500" sx={{ px: 1, borderRadius: "5px" }}>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  {paymentStatus === paymentStatuses.confirmed
                    ? "Payment Confirmed"
                    : "Order Confirmed"}
                </Typography>
              </Box>
            </Box>

            {/*  product card or list section */}
            <Box>
              {purchaseDrawerData?.others?.type === "ENQUIRY" ? (
                <>
                  <HorizontalProductCardForEnquiryDrawer
                    productImage={
                      purchaseDrawerData?.others?.details?.[0].product
                        ?.defaultImage
                    }
                    productName={
                      purchaseDrawerData?.others?.details?.[0].product
                        ?.productName
                    }
                    attributes={
                      // no attributes is present in the product cart
                      purchaseDrawerData?.others?.details?.[0]?.product
                        ?.attributes
                    }
                    sx={{ borderRadius: "25px" }}
                    type="enquiry"
                  />
                </>
              ) : (
                <>
                  {purchaseDrawerData?.others?.details.length === 1 && (
                    <>
                      {matches ? (
                        <HorizontalProductCardForMobile
                          productMeta={
                            purchaseDrawerData?.others?.details[0]?.product
                              ?.product_meta
                          }
                        />
                      ) : (
                        <HorizontalProductCardForEnquiryDrawerCart
                          productMeta={
                            purchaseDrawerData?.others?.details[0]?.product
                              ?.product_meta
                          }
                          sx={{ borderRadius: "25px" }}
                        />
                      )}
                    </>
                  )}
                </>
              )}

              {purchaseDrawerData?.others?.details.length > 1 && (
                <ListWrapper>
                  {purchaseDrawerData?.others?.details.map((item, index) => (
                    <List
                      sx={{
                        width: "100%",
                        // maxWidth: 360,
                        bgcolor: "background.paper",

                        backgroundColor: "#f3f3f3",
                        borderRadius: "8px",
                        mb: 1,
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="Remy Sharp"
                            src={item.product.product_meta.product_image}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            purchaseDrawerData?.others?.details?.[index].product
                              .product_meta.product_name
                          }
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {
                                  purchaseDrawerData?.others?.details?.[0]
                                    .product.product_meta.vendor_name
                                }
                              </Typography>

                              <IconButton
                                sx={{
                                  mt: -3,
                                  background: "#e5e5ff",
                                }}
                                onClick={() =>
                                  handleDetailsClick(
                                    purchaseDrawerData.others.type
                                  )
                                }
                              >
                                <PageviewIcon
                                  sx={{
                                    color: "#2e2ef6",
                                    fontSize: "35px",
                                  }}
                                />
                              </IconButton>
                            </Box>
                          }
                        />
                      </ListItem>
                    </List>
                  ))}
                </ListWrapper>
              )}
            </Box>

            {/* //* payment section  ========================================== */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <PrimaryButton onClick={downloadInvoiceHandler}>
                Download Invoice
              </PrimaryButton>
            </Box>

            <Box sx={{ my: 4 }}>
              <CustomAccordionForDrawer
                title="Payment Section"
                noPadding={true}
                paddingOff={true}
              >
                <Box sx={{ px: 2 }}>
                  <AmountBox sx={{}}>
                    <Typography variant="h5" fontWeight={"bold"}>
                      Booking Amount
                    </Typography>

                    <Typography variant="h5" fontWeight={"bold"}>
                      {"₹ "}
                      {purchaseDrawerData?.others?.booking_price}{" "}
                    </Typography>
                  </AmountBox>

                  <Divider
                    sx={{
                      borderStyle: "unset",
                    }}
                  />

                  {paymentStatus === paymentStatuses.open && (
                    <Box sx={{ px: 1 }}>
                      <PaymentTerms purchaseDrawerData={purchaseDrawerData} />
                      <Box sx={{ mt: 5 }}>
                        <Accordion
                          defaultExpanded={true}
                          sx={{
                            boxShadow: "none",
                            // mt: 3,
                            border: "none",
                          }}
                          style={{ borderRadius: "10px" }}
                          disableGutters
                        >
                          <AccordionSummary
                            sx={{
                              bgcolor: "#FFD05B",
                            }}
                            expandIcon={
                              <ExpandMoreIcon
                                sx={{
                                  color: "#000000",
                                  fontSize: "2rem",
                                }}
                              />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography fontWeight={700} variant="h6">
                              Select a Payment Method
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ px: 0 }}>
                            {methods?.map((mt, index) => (
                              <Box
                                key={index}
                                sx={{
                                  display: "flex",
                                  columnGap: 1,
                                  py: 1,
                                  borderRadius: 1,
                                  my: 1,
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                                style={
                                  mt?.value === selectedMethod?.value
                                    ? {
                                        background: "#FFD05B",
                                      }
                                    : {
                                        background: "#F3F3F3",
                                      }
                                }
                                onClick={() => {
                                  if (selectedMethod?.value === mt.value) {
                                    setSelectedMethod(null);
                                  } else {
                                    setSelectedMethod(mt);
                                  }
                                }}
                              >
                                <Radio
                                  checked={mt?.value === selectedMethod?.value}
                                  sx={{
                                    color: "#666F73 !important",
                                  }}
                                />
                                {mt.name}
                              </Box>
                            ))}
                          </AccordionDetails>
                        </Accordion>

                        <BankDetails bankDetails={bankDetails} />

                        <Divider
                          sx={{
                            borderStyle: "unset",
                          }}
                        />
                        <Box
                          sx={{
                            my: 2,
                            mb: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            fontWeight={700}
                            variant="h6"
                            sx={{ mb: 3.5, mt: 2 }}
                          >
                            Transaction ID
                          </Typography>

                          <Input
                            value={txId}
                            onChange={(e) => setTxId(e.target.value)}
                            disableUnderline={true}
                            sx={{
                              bgcolor: "#F3F3F3",
                              borderRadius: 1,
                              p: 1,
                              outline: "none",
                              width: "100%",
                              border: 0,
                            }}
                            placeholder="Transaction ID"
                          />

                          <PrimaryButton
                            disabled={!selectedMethod || !txId.trim()}
                            sx={{ mt: 1, py: 1.3 }}
                            onClick={saveTrans}
                            fullWidth
                            IconStart={LockIcon}
                          >
                            Save
                          </PrimaryButton>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {paymentStatus === paymentStatuses.processing && (
                    <Box>
                      <Box sx={{ my: 3, textAlign: "center" }}>
                        <Typography fontWeight={700} variant="h5">
                          Transaction ID
                        </Typography>

                        <Typography fontWeight={700} color="black">
                          The payment for transaction ID is not confirmed.
                          Please check if the ID entered is correct and wait for
                          another 2hrs for confirmation.
                        </Typography>

                        <Input
                          value={txId}
                          // onChange={(e) => setTxId(e.target.value)}
                          disableUnderline={true}
                          sx={{
                            bgcolor: "#F3F3F3",
                            borderRadius: 2,
                            p: 1,
                            outline: "none",
                            width: "100%",
                            border: 0,
                            mt: 2,
                          }}
                          placeholder="Transaction ID"
                        />

                        <Box
                          sx={{
                            my: 2,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <PrimaryButton
                            variant="secondary"
                            onClick={() =>
                              setPaymentStatus(paymentStatuses.open)
                            }
                            sx={{ px: 5 }}
                          >
                            Edit
                          </PrimaryButton>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {paymentStatus === paymentStatuses.confirmed && (
                    <Box>
                      <Box sx={{ my: 3, textAlign: "center" }}>
                        <Typography fontWeight={700} variant="h5">
                          Transaction ID
                        </Typography>

                        <Box
                          sx={{
                            bgcolor: "#F3F3F3",
                            borderRadius: 2,
                            p: 1,
                            width: "100%",
                            maxWidth: "350px",
                            border: 0,
                            mt: 2,
                            mx: "auto",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "primary.dark",
                              fontWeight: "bold",
                              fontSize: "1.3rem",
                            }}
                          >
                            {txId}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: "#3FB500",
                            py: 1,
                            px: 2,
                            borderRadius: 1,
                            my: 3,

                            mx: "auto",
                            width: "100%",
                            maxWidth: "350px",
                          }}
                        >
                          <Typography
                            variant="h5"
                            fontWeight={600}
                            color={"white"}
                          >
                            Payment received by SOLRUF
                          </Typography>
                        </Box>

                        <PrimaryButton
                          variant="secondary"
                          sx={{
                            px: 5,
                            width: "100%",
                            maxWidth: "350px",
                            mb: 1.5,
                          }}
                          IconStart={DescriptionIcon}
                        >
                          Tax Invoice
                        </PrimaryButton>
                      </Box>
                    </Box>
                  )}

                  {paymentMismatch && (
                    <Typography color="error" textAlign="center" mb={2}>
                      {paymentMismatch}
                    </Typography>
                  )}
                </Box>
              </CustomAccordionForDrawer>
            </Box>

            {/* //* order details */}
            <Box sx={{ my: 4 }}>
              <CustomAccordionForDrawer
                title="Order Details"
                noPadding={true}
                paddingOff={true}
              >
                <Box sx={{ p: 2 }}>
                  <Flex
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      mt: 1,
                    }}
                  >
                    <Box sx={{ mr: 2, minWidth: "50%" }}>
                      <FeatureDetail
                        icon={<ProductionQuantityLimitsIcon />}
                        title="Quantity"
                        value={purchaseDrawerData?.quantity}
                      />
                      <FeatureDetail
                        icon={<LocationCityIcon />}
                        title="City/District"
                        value={purchaseDrawerData?.location}
                      />
                      <FeatureDetail
                        icon={<LocationOnIcon />}
                        title="Address"
                        value={
                          purchaseDrawerData?.others?.customer_details?.street
                        }
                      />
                    </Box>
                    <Box>
                      <FeatureDetail
                        icon={<DateRangeIcon />}
                        title="Date"
                        value={purchaseDrawerData?.delivery_date}
                      />

                      <FeatureDetail
                        icon={<FlagIcon />}
                        title="Pin Code / Zip Code"
                        value={
                          purchaseDrawerData?.others?.customer_details?.pincode
                        }
                      />
                    </Box>
                  </Flex>

                  {/* Download buttons  */}
                  <Flex sx={{ my: 2, flexWrap: "wrap" }}>
                    {enquiryDocuments?.documents?.map((document) => (
                      <DownloadChip
                        sx={{ mr: 0.5, mb: 1 }}
                        label={document.name}
                        onClick={() => console.log("Clicked")}
                        component="a"
                        href={document.url}
                        target="_blank"
                      />
                    ))}
                  </Flex>
                  <Box
                    sx={{
                      flexDirection: "column",
                      "& .MuiFormControlLabel-root": {
                        margin: 0,
                      },
                      mt: 0,
                    }}
                  >
                    {/* <FormControlLabel
                                 sx={{
                                    '& .MuiTypography-root': {
                                       fontWeight: 'bold',
                                    },
                                 }}
                                 control={
                                    <Checkbox
                                       checked={
                                          !!purchaseDrawerData?.others
                                             ?.customer_details
                                             ?.accept_other_brand
                                       }
                                    />
                                 }
                                 label='Accept Products from other Brand?'
                              />
                              <FormControlLabel
                                 sx={{
                                    '& .MuiTypography-root': {
                                       fontWeight: 'bold',
                                    },
                                 }}
                                 control={
                                    <Checkbox
                                       checked={
                                          purchaseDrawerData?.others
                                             ?.customer_details
                                             ?.share_company_information
                                       }
                                    />
                                 }
                                 label='Share your Company Information with Supplier?'
                              /> */}
                  </Box>
                </Box>
              </CustomAccordionForDrawer>
            </Box>

            {/* //* vendor details */}
            <CustomAccordionForDrawer title="Vendor Details" paddingOff={true}>
              <VendorDetailsForPurchaseDrawer
                vendorData={purchaseDrawerData}
                bid_documents={enquiryDocuments?.bid_documents}
                enquiryId={purchaseDrawerData.id}
              />
            </CustomAccordionForDrawer>

            {queries.length > 0 && (
              <Box sx={{ my: 4 }}>
                <CustomAccordionForDrawer title={"Customer Queries"}>
                  {queries.map((query) => (
                    <CustomAccordionForDrawer
                      title={query.question}
                      titleStyle={{ fontSize: "1rem" }}
                      sx={{
                        boxShadow: 0,
                        "& .MuiAccordionSummary-root": {
                          borderBottom: "1px solid #D0D7D9",
                        },
                      }}
                    >
                      <AnswerBox>
                        <Typography variant="body1">
                          Ans.{" "}
                          <span style={{ color: "#000" }}>{query.answer}</span>
                        </Typography>
                      </AnswerBox>
                    </CustomAccordionForDrawer>
                  ))}
                </CustomAccordionForDrawer>
              </Box>
            )}
          </Box>

          <textarea
            style={{ opacity: "0" }}
            id="payDetails"
            rows="1"
          ></textarea>
        </EnquiryDetailsWrapper>

        {invoiceInfo && (
          <Invoice quoteData={invoiceInfo} templateRef={invoiceTemplateRef} />
        )}
      </RightDrawer>
    </div>
  );
};

export default PurchaseDetailsDrawer;
