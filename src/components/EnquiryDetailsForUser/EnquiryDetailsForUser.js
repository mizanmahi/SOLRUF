import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Radio,
  useMediaQuery,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import RightDrawer from "../RightDrawer/RightDrawer";
import CloseIcon from "@mui/icons-material/Close";
import uploadSvg from "../CustomerDetailsDrawer/uploadDocument.svg";
import FeatureDetail from "../FeatureDetail/FeatureDetail";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

// tables
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import CustomAccordionForDrawer from "../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer";
import YellowButton from "../YellowButton/YellowButton";
import VendorDetails from "./VendorDetails";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import ConfirmDialog2 from "../ConfirmDialog/ConfirmDialog";
import ConfirmDialog3 from "../ConfirmDialog/ConfirmDialog";
import { countDueDate, formatDocumentUrl0 } from "../../utils/utils";
import { toast } from "react-toastify";

import { useEffect, useRef, useState } from "react";

import {
  CreateBusinessBox,
  EnquiryDetailsWrapper,
  NoVendorBox,
} from "./enquiryDetailsForUser.style";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";

import { removeEnquiryDetails } from "../../redux/slices/userSlice";
import { axiAuth } from "../../utils/axiosInstance";
import EnquiryUpdateForm from "./EnquiryUpdateForm";
import { useCompanyDetails } from "../../hooks/useCompanyDetails";
import Loader from "../Loader/Loader";
import HorizontalProductCardForEnquiryDrawer from "./HorizontalProductCardForEnquiryDrawer";
import EnquiryConfirmation from "./EnquiryConfirmation/EnquiryConfirmation";
import { modalTopBackButtonStyle } from "../../theme/modalTopBackButtonStyle";
import { KeyboardBackspace } from "@mui/icons-material";
import { DownloadChip } from "../CustomerDetailsDrawer/customerDetailsDrawer.style";
import useAuth from "../../hooks/useAuth";

import SolrufModal from "../Custom/SolrufModal/SolrufModal";
import UploadDocumentsWithName from "../Custom/UploadDocumentsWithName/UploadDocumentsWithName";
import { setUserEnquiriesData } from "../../redux/slices/tableSlice";
import { useProfile } from "../../hooks/useProfile";
import ProductCardForMobileDrawer from "../ProductCardForMobile/ProductCardForMobileDrawer";
// import Template4 from '../../pages/Templates/Template4';
import Invoice from "./Invoice";
import { useReactToPrint } from "react-to-print";

const Flex = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const TermLinkButton = styled(Button)(({ theme }) => ({
  color: "#2448FC",
  border: "1px solid #2448FC",
  background: "#fff",
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [];
for (let index = 0; index < 50; index++) {
  rows.push(createData("Price per pay", 262, 16.0, 24, 6.0));
}

const EnquiryDetailsForUser = ({ rightDrawerOpen, setRightDrawerOpen }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showBidDetails, setShowBidDetails] = useState(false);
  const enquiryDetails = useSelector((state) => state.user.enquiryDetails);
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  console.log({ enquiryDetails });

  const editHandler = () => {
    setIsEdit(true);
  };

  const dispatch = useDispatch();

  const onDrawerClose = () => {
    setRightDrawerOpen(false);
    dispatch(removeEnquiryDetails());
    setIsEdit(false);
  };

  const [enquiryCancelled, setEnquiryCancelled] = useState(false);
  const [bidDocuments, setBidDocs] = useState([]);

  useEffect(() => {
    if (enquiryDetails?.status === "CANCELLED") {
      setEnquiryCancelled(true);
    } else {
      setEnquiryCancelled(false);
    }
  }, [enquiryDetails?.status]);

  useEffect(() => {
    axiAuth
      .get(
        `api/enquiries/${enquiryDetails.id}/bid-documents?vendor_id=${enquiryDetails?.others?.vendors[0]?.id}`
      )
      .then((res) => {
        setBidDocs(res.data.documents);
      })
      .catch((err) => {});
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cancelEnquiryConfirm, setCancelEnquiryConfirm] = useState({
    role: "Enquiry",
    isOpen: false,
    title: "Cancel Enquiry?",
    message: "Enquiry will be cancelled permanently once you continue!",
    cacheRole: "User",
  });

  const handleEnquiryCancelClick = () => {
    setCancelEnquiryConfirm({
      ...cancelEnquiryConfirm,
      isOpen: true,
    });
  };

  const cancelEnquiryHandler = () => {
    axiAuth
      .put(`api/enquiries/${enquiryDetails.id}`, { status: "cancelled" })
      .then((res) => {
        setEnquiryCancelled(true);
        setCancelEnquiryConfirm({
          ...cancelEnquiryConfirm,
          isOpen: false,
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  const { companyDetailsLoading, companyDetailsError } = useCompanyDetails();

  const [selectedBid, setSelectedBid] = useState(null);
  const [docs, setDocs] = useState([]);

  console.log({ docs });
  useEffect(() => {
    setDocs(enquiryDetails?.others?.documents);
  }, [enquiryDetails?.others?.documents]);

  const onBidSelect = (e, vendor) => {
    setSelectedBid(vendor);
    console.log(vendor);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [documents1, setDocuments1] = useState([]);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [deleteDocId, setDeleteDocId] = useState(null);

  const [docDeleteConfirm, setDocDeleteConfirm] = useState({
    role: "Document",
    isOpen: false,
    title: "Delete Document?",
    message: "Document will be deleted permanently once you continue!",
    cacheRole: "User",
  });

  const [businessCreateAlert, setBusinessCreateAlert] = useState({
    role: "Document",
    isOpen: false,
    title: "No Business Profile",
    message:
      "Please create your business profile from the profile section to proceed with order confirmation!",
    cacheRole: "User",
  });

  const handleDocDeleteClick = (doc_id) => {
    setDocDeleteConfirm({
      ...docDeleteConfirm,
      isOpen: true,
    });
    setDeleteDocId(doc_id);
  };

  const hideBusinessAlert = () => {
    setBusinessCreateAlert({
      ...businessCreateAlert,
      isOpen: false,
    });
  };

  const showBusinessAlert = () => {
    setBusinessCreateAlert({
      ...businessCreateAlert,
      isOpen: true,
    });
  };

  const { role } = useAuth();

  const { userEnquiries } = useSelector((state) => state.tableData);
  console.log(userEnquiries);

  const handleDocumentUpload = (e) => {
    const documents = formatDocumentUrl0(documents1);
    console.log(documents);

    axiAuth
      .put(`api/enquiries/${enquiryDetails.id}/documents`, { documents })
      .then((res) => {
        setDocumentModalOpen(false);
        const updatedEnquiries = userEnquiries.map((enquiry) => {
          if (enquiry.id === enquiryDetails.id) {
            return {
              ...enquiry,
              others: {
                ...enquiry.others,
                documents: [...res.data.documents],
              },
            };
          }
          return enquiry;
        });
        dispatch(setUserEnquiriesData(updatedEnquiries));
        setDocuments1([]);
        setDocs([...res.data.documents]);
        console.log("setting enquiry doc");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleDocumentRemove = () => {
    const filteredArray = docs.filter((doc) => doc.id !== deleteDocId);
    axiAuth
      .delete(`api/resources/${deleteDocId}`)
      .then((res) => {
        setDocs(filteredArray);
        const updatedEnquiries = userEnquiries.map((enquiry) => {
          if (enquiry.id === enquiryDetails.id) {
            return {
              ...enquiry,
              others: {
                ...enquiry.others,
                documents: enquiry.others.documents.filter(
                  (doc) => doc.id !== deleteDocId
                ),
              },
            };
          }
          return enquiry;
        });
        dispatch(setUserEnquiriesData(updatedEnquiries));
        setDocDeleteConfirm({
          ...docDeleteConfirm,
          isOpen: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const { profileData } = useSelector((state) => state.profile);
  const { profile: profileData } = useProfile();

  console.log(profileData);

  const handleConfirmation = () => {
    console.log(profileData);
    if (!profileData.business) {
      showBusinessAlert();
    } else {
      setShowConfirmation(true);
    }
  };

  const [invoiceInfo, setInvoiceInfo] = useState(null);
  const invoiceTemplateRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceTemplateRef.current,
    documentTitle: "Invoice",
  });

  const downloadInvoiceHandler = async (e, vendor_index) => {
    e.stopPropagation();
    const inVoiceData = {
      vendor: enquiryDetails?.others?.vendors[vendor_index]?.portfolio,
      order_id: enquiryDetails.id,
      due_in: countDueDate(new Date(), 2),
      buyer_name: profileData?.business?.company_name,
      buyer_email: profileData?.email,
      buyer_phone: profileData?.mobile,
      buyer_address: profileData?.business?.address,
      buyer_website: profileData?.business?.website || "n/a",
      buyer_gst: profileData?.business?.gstin,
      shipping_name: profileData?.business?.company_name,
      shipping_address: profileData?.business?.address,
      shipping_email: profileData?.email,
      shipping_phone: profileData?.mobile,
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
      items: [
        {
          product_name: enquiryDetails?.product_name,
          product_price: enquiryDetails?.others?.vendors[0]?.bid?.price,
          units_per_quantity: enquiryDetails?.quantity,
          hsn_sac_code: enquiryDetails?.others?.product?.other?.hsn_sac_code,
          igst: enquiryDetails?.others?.product?.other?.tax_igst,
          cgst: enquiryDetails?.others?.product?.other?.tax_cgst,
          sgst: enquiryDetails?.others?.product?.other?.tax_sgst,
        },
      ],
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
        drawerStyles={{ background: "#f3f3f3" }}
        open={rightDrawerOpen}
        onClose={onDrawerClose}
        anchor={`${window.innerWidth < 600 ? "bottom" : "right"}`}
      >
        <EnquiryDetailsWrapper>
          <Box
            sx={modalTopBackButtonStyle}
            onClick={() => setRightDrawerOpen(false)}
          >
            <KeyboardBackspace />
            <Box>Back</Box>
          </Box>
          <Box
            sx={{
              top: 10,
              position: "absolute",
              right: 0,
              cursor: "pointer",
            }}
          >
            <CloseIcon onClick={onDrawerClose} />
          </Box>
          {/* ============ drawer content box ============ */}
          <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                sx={{ mr: 2, color: "#000", fontWeight: 500 }}
              >
                Enquiry Id - # {enquiryDetails?.id}
              </Typography>

              {enquiryCancelled ? (
                <Box bgcolor="#E21F30" sx={{ px: 1, borderRadius: "5px" }}>
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Enquiry Cancelled{" "}
                  </Typography>
                </Box>
              ) : (
                <Box bgcolor="#0097D3" sx={{ px: 1, borderRadius: "5px" }}>
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Enquiry generated{" "}
                  </Typography>
                </Box>
              )}
            </Box>
            {/* <Box>
                     <HorizontalProductCardForEnquiryDrawer
                        product={enquiryDetails?.others?.product?.other}
                        productImage={
                           enquiryDetails?.others?.product?.other.defaultImage
                        }
                        productName={
                           enquiryDetails?.others?.product?.other.productName
                        }
                        attributes={
                           enquiryDetails?.others?.product?.other.attributes
                        }
                        sx={{ borderRadius: '25px' }}
                        type='enquiry'
                     />
                  </Box> */}

            <Box>
              {matchSm ? (
                <ProductCardForMobileDrawer
                  product={enquiryDetails?.others?.product?.other}
                  productImage={
                    enquiryDetails?.others?.product?.other.defaultImage
                  }
                  productName={
                    enquiryDetails?.others?.product?.other.productName
                  }
                  attributes={enquiryDetails?.others?.product?.other.attributes}
                  showBook={false}
                />
              ) : (
                <HorizontalProductCardForEnquiryDrawer
                  product={enquiryDetails?.others?.product?.other}
                  productImage={
                    enquiryDetails?.others?.product?.other.defaultImage
                  }
                  productName={
                    enquiryDetails?.others?.product?.other.productName
                  }
                  attributes={enquiryDetails?.others?.product?.other.attributes}
                  sx={{ borderRadius: "25px" }}
                  type="enquiry"
                  productId={enquiryDetails?.others?.product?.other?.productId}
                />
              )}
            </Box>

            {/* =========  Order details accordion ========= */}

            <Box sx={{ mt: 4 }}>
              <CustomAccordionForDrawer
                title="Order Details"
                noPadding={true}
                paddingOff={true}
              >
                {!isEdit && (
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
                          value={enquiryDetails?.quantity}
                        />
                        <FeatureDetail
                          icon={<LocationCityIcon />}
                          title="City/District"
                          value={enquiryDetails?.others?.user_address?.city}
                        />
                        <FeatureDetail
                          icon={<LocationOnIcon />}
                          title="Address"
                          value={enquiryDetails?.others?.user_address?.address}
                        />
                      </Box>
                      <Box>
                        <FeatureDetail
                          icon={<DateRangeIcon />}
                          title="Date"
                          value={enquiryDetails?.delivery_date}
                        />

                        <FeatureDetail
                          icon={<FlagIcon />}
                          title="Pin Code / Zip Code"
                          value={enquiryDetails?.others?.user_address?.pin_code}
                        />
                      </Box>
                    </Flex>
                    <Flex
                      sx={{
                        flexDirection: "column",
                        "& .MuiFormControlLabel-root": {
                          margin: 0,
                        },
                        mt: 0,
                      }}
                    >
                      <FormControlLabel
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight: "bold",
                          },
                        }}
                        control={
                          <Checkbox
                            checked={
                              enquiryDetails?.others?.accept_other_brands
                            }
                          />
                        }
                        label="Accept Products from other Brand?"
                      />
                      {!companyDetailsError && (
                        <FormControlLabel
                          sx={{
                            "& .MuiTypography-root": {
                              fontWeight: "bold",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={
                                enquiryDetails?.others
                                  ?.share_company_information
                              }
                            />
                          }
                          label="Share your Company Information with Supplier?"
                        />
                      )}
                      {companyDetailsLoading && <Loader />}
                      {companyDetailsError && (
                        <Box
                          sx={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            background: "#E21F30",
                            p: 0.8,
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "55%",
                            ml: 1.5,
                            mt: 0.5,
                            cursor: "pointer",
                            "& .MuiSvgIcon-root": {
                              color: "#fff",
                              borderRadius: "50%",
                              border: "2px solid #fff",
                              marginRight: "0.5rem",
                              fontSize: "30px",
                            },
                          }}
                          onClick={() => {
                            if (role === "User") {
                              window.open("/user-dashboard/profile", "_blank");
                            } else {
                              window.open(
                                "/vendor/dashboard/profile",
                                "_blank"
                              );
                            }
                          }}
                        >
                          <AddIcon />
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: "16px",
                              fontWeight: 500,
                            }}
                          >
                            {companyDetailsError}
                          </Typography>
                        </Box>
                      )}
                    </Flex>
                  </Box>
                )}

                {/* ============================== edit form ============================== */}
                {isEdit && enquiryDetails.id && (
                  <EnquiryUpdateForm
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    enquiryDetails={enquiryDetails}
                    companyDetailsError={companyDetailsError}
                  />
                )}
                {/* ============================== edit form end ============================== */}

                {!isEdit && !enquiryCancelled && (
                  <YellowButton
                    style={{
                      width: "100%",
                      background: isEdit ? "#ffd05b" : "#D0D7D9",
                      borderRadius: "0 0 10px 10px",
                    }}
                    onClick={editHandler}
                  >
                    Edit
                  </YellowButton>
                )}
              </CustomAccordionForDrawer>
            </Box>

            {/* ================== Order details end ================== */}

            <Box sx={{ mt: 4 }}>
              <CustomAccordionForDrawer
                title="Order Documents"
                titleStyle={{ fontSize: "1rem" }}
                sx={{
                  my: 2,
                  boxShadow: 0,
                  "& .MuiAccordionSummary-root": {
                    borderBottom: "1px solid #D0D7D9",
                  },
                }}
              >
                <Box sx={{ mt: 1.5 }}>
                  <img
                    src={uploadSvg}
                    alt=" upload svg"
                    onClick={() => setDocumentModalOpen(true)}
                    style={{ cursor: "pointer" }}
                  />
                </Box>

                <Flex sx={{ mt: 1.5, flexWrap: "wrap", rowGap: 1 }}>
                  {docs?.length > 0 &&
                    docs?.map((doc) => (
                      <>
                        <DownloadChip
                          label={doc?.name}
                          onClick={() => {
                            window.open(doc.url, "_blank");
                          }}
                          onDelete={(e) => handleDocDeleteClick(doc.id)}
                        />
                      </>
                    ))}
                </Flex>

                {/* =========  document upload modal ========= */}
                <SolrufModal
                  open={documentModalOpen}
                  onClose={() => setDocumentModalOpen(false)}
                >
                  <UploadDocumentsWithName
                    documents={documents1}
                    setDocuments={setDocuments1}
                  />
                  <PrimaryButton fullWidth onClick={handleDocumentUpload}>
                    Done
                  </PrimaryButton>
                </SolrufModal>
              </CustomAccordionForDrawer>
            </Box>

            {/* ========= vendor bids accordion ========= */}
            <Box sx={{ mt: 3 }}>
              {/* ==================  no vendor box ================== */}
              {showConfirmation && (
                <EnquiryConfirmation
                  onClose={onDrawerClose}
                  enquiryDetails={enquiryDetails}
                  setShowConfirmation={setShowConfirmation}
                  selectedBid={selectedBid}
                  // bidDocuments={bidDocuments}
                />
              )}

              {!showConfirmation && (
                <CustomAccordionForDrawer title="Vendor Bids" paddingOff={true}>
                  <Box sx={{ pt: 2 }}>
                    {!profileData?.business?.company_name && (
                      <CreateBusinessBox
                        onClick={() => {
                          if (role === "Vendor") {
                            window.open("/vendor/dashboard/profile", "_blank");
                          } else {
                            window.open("/user-dashboard/profile", "_blank");
                          }
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          Create your business profile to confirm the order and
                          download invoice.
                        </Typography>
                        <NotificationsActiveIcon
                          sx={{
                            color: "#fff",
                            fontSize: "35px",
                          }}
                        />
                      </CreateBusinessBox>
                    )}
                  </Box>

                  {enquiryDetails?.others?.vendors?.length > 0 ? (
                    <>
                      {!showBidDetails && (
                        <>
                          {!enquiryCancelled && (
                            <TableContainer
                              component={Box}
                              sx={{ height: "600px" }}
                            >
                              <Table
                                sx={{
                                  width: "100%",
                                  minWidth: 600,
                                }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      align="left"
                                      sx={{
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                        pl: 8,
                                      }}
                                    >
                                      Name
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                      }}
                                    >
                                      Bid
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                      }}
                                    >
                                      Portfolio & Supply terms
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                      }}
                                    >
                                      Invoice
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {enquiryDetails?.others?.vendors?.map(
                                    (row, index) => (
                                      <TableRow
                                        key={index}
                                        style={
                                          row?.id === selectedBid?.id
                                            ? {
                                                background: "rgb(255 230 169)",
                                              }
                                            : {
                                                background: "transparent",
                                              }
                                        }
                                        onClick={() => {
                                          if (selectedBid?.id === row.id) {
                                            setSelectedBid(null);
                                          } else {
                                            setSelectedBid(row);
                                          }
                                        }}
                                      >
                                        <TableCell
                                          component="th"
                                          scope="row"
                                          align="center"
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Radio
                                            value={index}
                                            checked={
                                              row?.id === selectedBid?.id
                                            }
                                            onChange={(event) =>
                                              onBidSelect(event, row)
                                            }
                                            name="radio-buttons"
                                            inputProps={{
                                              "aria-label": "A",
                                            }}
                                            sx={{
                                              color: "#666F73 !important",
                                            }}
                                          />

                                          <Typography
                                            sx={{
                                              fontWeight: 600,
                                            }}
                                          >
                                            {row.portfolio.name}
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          component="th"
                                          scope="row"
                                          align="center"
                                        >
                                          {row.bid.price}
                                        </TableCell>
                                        <TableCell align="center">
                                          <TermLinkButton
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (selectedBid?.id !== row.id) {
                                                setSelectedBid(row);
                                              }
                                              setShowBidDetails(true);
                                            }}
                                            disabled={
                                              profileData?.business
                                                ?.company_name
                                                ? false
                                                : true
                                            }
                                          >
                                            Link
                                          </TermLinkButton>
                                        </TableCell>
                                        <TableCell align="center">
                                          <PrimaryButton
                                            onClick={(e) =>
                                              downloadInvoiceHandler(e, index)
                                            }
                                            disabled={
                                              !profileData?.business
                                                ?.company_name
                                            }
                                          >
                                            Download
                                          </PrimaryButton>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )}

                          {enquiryCancelled && (
                            <Box sx={{ py: 5 }}>
                              <NoVendorBox>
                                <Typography>Enquiry cancelled</Typography>
                              </NoVendorBox>
                            </Box>
                          )}

                          {!enquiryCancelled && (
                            <Flex>
                              <PrimaryButton
                                fullWidth
                                sx={{
                                  border: "2px solid #F20519",
                                  borderRadius: "0 0 0 5px",
                                  color: "#F20519",
                                  background: "#ffffff",
                                  "&:hover": {
                                    border: "2px solid transparent",
                                    background: "#F20519",
                                    color: "#ffffff",
                                  },
                                }}
                                onClick={handleEnquiryCancelClick}
                              >
                                Cancel Enquiry
                              </PrimaryButton>

                              <PrimaryButton
                                fullWidth
                                disabled={!selectedBid}
                                sx={{
                                  bgcolor: `${!selectedBid && "#e2e2e2"}`,
                                  borderRadius: "0 0 5px 0",
                                }}
                                onClick={() => handleConfirmation()}
                              >
                                Confirm Order
                              </PrimaryButton>
                            </Flex>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Box sx={{ py: 5 }}>
                      <NoVendorBox>
                        <Typography>
                          {" "}
                          You will get access to top 10 verified source
                          suppliers within 1 hr for your enquiry
                        </Typography>
                      </NoVendorBox>
                    </Box>
                  )}

                  {showBidDetails &&
                    enquiryDetails?.others?.vendors.map((vendor) => (
                      <VendorDetails
                        handleConfirmation={handleConfirmation}
                        onClose={() => setShowBidDetails(false)}
                        vendorData={vendor}
                        bidDocuments={bidDocuments}
                        enquiryId={enquiryDetails.id}
                        quantity={enquiryDetails.quantity}
                      />
                    ))}
                </CustomAccordionForDrawer>
              )}
            </Box>
            {/* ========= vendor bids accordion end ========= */}
          </Box>
          {/* ============ drawer content box end ============ */}
        </EnquiryDetailsWrapper>
        {invoiceInfo && (
          <Invoice quoteData={invoiceInfo} templateRef={invoiceTemplateRef} />
        )}
      </RightDrawer>

      <ConfirmDialog
        confirmDialog={{
          ...cancelEnquiryConfirm,
          onConfirm: cancelEnquiryHandler,
        }}
        setConfirmDialog={setCancelEnquiryConfirm}
        variant="warning"
      />
      <ConfirmDialog2
        confirmDialog={{
          ...docDeleteConfirm,
          onConfirm: handleDocumentRemove,
        }}
        setConfirmDialog={setDocDeleteConfirm}
        variant="warning"
      />
      <ConfirmDialog3
        confirmDialog={{
          ...businessCreateAlert,
          onConfirm: () => {
            if (role === "User") {
              window.open("/user-dashboard/profile", "_blank");
            } else {
              window.open("/vendor/dashboard/profile", "_blank");
            }
            hideBusinessAlert();
          },
        }}
        setConfirmDialog={setBusinessCreateAlert}
        variant="businessDetailNotPresent"
      />
    </div>
  );
};

export default EnquiryDetailsForUser;

// date after two days from today
