import { Box, Typography, Checkbox } from "@mui/material";
import { styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import BackToButton from "../../components/BackToButton/BackToButton";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

// icons
import EmailIcon from "@mui/icons-material/Email";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import { axiAuth } from "../../utils/axiosInstance";
import Loader from "../../components/Loader/Loader";
import { CreateBusinessText } from "./enquiryPage.style";
import AddIcon from "@mui/icons-material/Add";
import useAuth from "../../hooks/useAuth";

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
}));

const Flex = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Ul = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: "1rem 0",
  "& li": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
    padding: ".8rem .5rem",
    borderRadius: "8px",
    "&:nth-of-type(odd)": {
      background: "#f3f3f3",
    },
  },
}));

const CompanyDetails = ({
  formData,
  setPage,
  page,
  shareCompanyInfo,
  setShareCompanyInfo,
  companyDetailsError,
  setCompanyDetailsError,
  isMobileView,
}) => {
  const clickHandler = () => {
    setPage(0);
  };

  const { role } = useAuth();
  // console.log("Company Details loaded");

  const [companyDetails, setCompanyDetails] = useState({});
  const [companyDetailsLoading, setCompanyDetailsLoading] = useState(true);

  useEffect(() => {
    setCompanyDetailsLoading(true);
    setCompanyDetailsError("");
    const fetchCompanyDetails = async () => {
      try {
        const { data } = await axiAuth.get("api/profile");
        if (data.data.business) {
          setCompanyDetails(data.data.business);
        } else {
          setCompanyDetailsError(
            "Please create your basic business profile for generating proforma invoice."
          );
        }
        setCompanyDetailsLoading(false);
      } catch (error) {
        setCompanyDetailsError("");
        setCompanyDetailsLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [setCompanyDetailsError]);

  return (
    <Box sx={{ minHeight: ["50vh", "auto"], px: [2, 0], pb: [8, 0] }}>
      {!isMobileView && (
        <>
          <TitleText>Company Details</TitleText>
          <BackToButton
            onClick={clickHandler}
            sx={{
              position: "absolute",
              "@media (max-width: 600px)": {
                display: "none",
              },
              top: "10px",
              fontSize: "20px",
              fontWeight: 700,
              color: "rgba(0,0,0,0.67)",
            }}
          >
            Back
          </BackToButton>
          <BackToButton
            onClick={clickHandler}
            sx={{
              position: "absolute",
              display: "none",
              "@media (max-width: 600px)": {
                display: "flex",
              },
              top: "5px",
              fontSize: "20px",
              fontWeight: 700,
              color: "rgba(0,0,0,0.67)",
            }}
          />
        </>
      )}

      {companyDetailsLoading && <Loader />}
      {companyDetailsError && (
        <CreateBusinessText
          // CHECK USER TYPE
          onClick={() => {
            if (role === "Vendor") {
              window.open("/vendor/dashboard/profile", "_blank");
            } else {
              window.open("/user-dashboard/profile", "_blank");
            }
          }}
        >
          <AddIcon />{" "}
          <Typography variant="h6">{companyDetailsError}</Typography>
        </CreateBusinessText>
      )}

      {!companyDetailsLoading && !companyDetailsError && (
        <>
          {" "}
          <Ul>
            <li>
              <Typography fontWeight={600}>
                <PersonIcon sx={{ mr: 1 }} /> Name
              </Typography>
              <Typography>{companyDetails?.company_name}</Typography>
            </li>
            <li>
              <Typography fontWeight={600}>
                <EmailIcon sx={{ mr: 1 }} /> E-mail
              </Typography>
              <Typography>
                {companyDetails?.email
                  ? companyDetails.email
                  : "mizanmahi24@gmail.cop"}
              </Typography>
            </li>
            <li>
              <Typography fontWeight={600}>
                <PhoneIcon sx={{ mr: 1 }} /> Phone
              </Typography>
              <Typography>{companyDetails?.phone}</Typography>
            </li>
            <li>
              <Typography fontWeight={600}>
                <LocationOnIcon sx={{ mr: 1 }} /> Location
              </Typography>
              <Typography>{companyDetails.address}</Typography>
            </li>
            <li>
              <Typography fontWeight={600}>
                <ApartmentIcon sx={{ mr: 1 }} /> City
              </Typography>
              <Typography>{companyDetails.city}</Typography>
            </li>
          </Ul>
          <Flex sx={{ my: 3 }}>
            <Checkbox
              checked={shareCompanyInfo}
              onChange={(e) => setShareCompanyInfo(e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography sx={{ color: "#000000" }}>
              Share your Company Information with Supplier?
            </Typography>
          </Flex>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: `${isMobileView ? 0 : "1.5rem"}`,
          left: `${isMobileView ? 0 : "50%"}`,
          transform: `${isMobileView ? null : "translateX(-50%)"}`,
          //  border: "1px solid red",
          width: `${isMobileView ? "100%" : "auto"}`,
        }}
      >
        <SubmitButton
          form="enquiry-form"
          sx={{ width: `${isMobileView ? "100% !important" : "auto"}` }}
        >
          Submit
        </SubmitButton>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
