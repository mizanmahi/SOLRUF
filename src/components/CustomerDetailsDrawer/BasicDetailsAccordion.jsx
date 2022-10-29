import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import FeatureDetail from "../FeatureDetail/FeatureDetail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import { FormWrapper } from "./customerDetailsDrawer.style";
import BackToButton from "../BackToButton/BackToButton";
import SolrufTextField from "../TextField/TextField";
import { LoadingButton } from "@mui/lab";
import { Controller } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import CustomAccordionForDrawer from "../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer";

const Flex = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const BasicDetailsAccordion = ({
  isEdit,
  customerDetails,
  setIsEdit,
  submitBasicDetail,
  basicHandler,
  registerBasicDetail,
  gstVerified,
  basicDetailFormState,
  gstError,
  control,
  statesOfIndia,
  gstVerifying,
  verifyGst,
  watchGst,
}) => {
  return (
    <CustomAccordionForDrawer
      paddingOff={true}
      pt="1rem"
      title="Basic Detail"
      titleStyle={{ fontSize: "1rem" }}
      sx={{
        // boxShadow: 0,
        "& .MuiAccordionSummary-root": {
          // borderBottom: '1px solid #D0D7D9',
        },
      }}
    >
      <Box sx={{ mt: 0 }}>
        {!isEdit && (
          <>
            <Box sx={{ p: 2, pt: 2 }}>
              <Flex
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  //   mt: 1,
                }}
              >
                <Box sx={{ mr: 2, minWidth: "50%" }}>
                  <FeatureDetail
                    icon={<AccountCircleIcon />}
                    title="Customer Name"
                    value={customerDetails.name || "N/A"}
                  />
                  <FeatureDetail
                    icon={<PhoneIcon />}
                    title="Phone Number"
                    value={customerDetails.phone || "N/A"}
                  />
                  <FeatureDetail
                    icon={<BusinessIcon />}
                    title="Company Name"
                    value={customerDetails.company_name || "N/A"}
                  />
                </Box>
                <Box>
                  <FeatureDetail
                    icon={<EmailIcon />}
                    title="Email"
                    value={customerDetails.email || "N/A"}
                  />

                  <FeatureDetail
                    icon={<LanguageIcon />}
                    title="Website"
                    value={customerDetails.website || "N/A"}
                  />

                  <FeatureDetail
                    icon={<ReceiptLongIcon />}
                    title="GST No"
                    value={customerDetails.gstin || "N/A"}
                  />
                </Box>
              </Flex>

              <Flex sx={{ my: 2 }}>
                <FeatureDetail
                  icon={<LocationCityIcon />}
                  title="City/District"
                  value={customerDetails.location?.city || "N/A"}
                  style={{ pr: 3 }}
                />
                <FeatureDetail
                  icon={<AccountBalanceIcon />}
                  title="State"
                  value={customerDetails.location?.state || "N/A"}
                  style={{ px: 7 }}
                />
                <FeatureDetail
                  icon={<FlagIcon />}
                  title="Pincode/Zipcode"
                  value={customerDetails.location?.pincode || "N/A"}
                  style={{ pl: 3 }}
                />
              </Flex>

              <FeatureDetail
                icon={<LocationOnIcon />}
                title="Street"
                value={customerDetails.location?.street || "N/A"}
              />
            </Box>
            <PrimaryButton
              fullWidth
              sx={{
                borderRadius: "0 0 10px 10px",
                background: "#D0D7D9",
              }}
              onClick={() => setIsEdit(true)}
            >
              Edit
            </PrimaryButton>
          </>
        )}

        {/* ============================== edit form ============================== */}
        {isEdit && (
          <Box component="form" onSubmit={submitBasicDetail(basicHandler)}>
            <FormWrapper sx={{ pt: 0 }}>
              <BackToButton onClick={() => setIsEdit(false)}>Back</BackToButton>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                }}
              >
                <SolrufTextField
                  label="Customer Name"
                  sx={{ my: 1, mr: 2 }}
                  defaultValue={customerDetails.name || ""}
                  {...registerBasicDetail("name", {
                    required: {
                      value: true,
                      message: "Customer name is required",
                    },
                  })}
                  error={basicDetailFormState.errors.name}
                  helperText={
                    basicDetailFormState.errors.name
                      ? basicDetailFormState.errors.name.message
                      : ""
                  }
                />
                <SolrufTextField
                  label="Email"
                  defaultValue={customerDetails.email || ""}
                  sx={{ my: 1 }}
                  {...registerBasicDetail("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={basicDetailFormState.errors.email}
                  helperText={
                    basicDetailFormState.errors.email
                      ? basicDetailFormState.errors.email.message
                      : ""
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                }}
              >
                <SolrufTextField
                  label="Phone Number"
                  sx={{ my: 1, mr: 2 }}
                  defaultValue={customerDetails.phone || ""}
                  {...registerBasicDetail("phone")}
                  error={basicDetailFormState.errors.phone}
                  helperText={
                    basicDetailFormState.errors.phone
                      ? basicDetailFormState.errors.phone.message
                      : ""
                  }
                />
                <SolrufTextField
                  label="Website"
                  defaultValue={customerDetails.website || ""}
                  sx={{ my: 1 }}
                  {...registerBasicDetail("website", {
                    pattern: {
                      value:
                        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                      message: "Invalid website Url",
                    },
                  })}
                  error={basicDetailFormState.errors.website}
                  helperText={
                    basicDetailFormState.errors.website
                      ? basicDetailFormState.errors.website.message
                      : ""
                  }
                />
              </Box>

              <Box sx={{ display: "flex" }}>
                <SolrufTextField
                  label="Company Name"
                  sx={{ my: 1 }}
                  defaultValue={customerDetails.company_name || ""}
                  {...registerBasicDetail("company_name", {})}
                  error={basicDetailFormState.errors.company_name}
                  helperText={
                    basicDetailFormState.errors.company_name
                      ? basicDetailFormState.errors.company_name.message
                      : ""
                  }
                />
              </Box>
              <Box
                sx={{
                  my: 1,
                  display: "flex",
                  // alignItems: 'center',
                  position: "relative",
                }}
              >
                <SolrufTextField
                  defaultValue={customerDetails.gstin || ""}
                  label="GST No"
                  {...registerBasicDetail("gstin", {
                    minLength: {
                      value: 15,
                      message: "GST number must be 15 digits",
                    },
                    maxLength: {
                      value: 15,
                      message: "GST number must be 15 digits only",
                    },
                  })}
                  error={basicDetailFormState.errors.gst || gstError}
                  helperText={
                    basicDetailFormState.errors.gst
                      ? basicDetailFormState.errors.gst.message
                      : gstError
                      ? gstError
                      : " "
                  }
                />

                <LoadingButton
                  variant="contained"
                  sx={{
                    boxShadow: 0,
                    ml: 2,
                    mt: 0.5,
                    height: "55px",
                    px: 3,
                    color: gstVerified ? "green" : "#4D4D4D",
                    "&:hover": {
                      backgroundColor: "#ffd05b",
                    },
                  }}
                  loading={gstVerifying}
                  endIcon={gstVerified && <DoneIcon />}
                  onClick={() => verifyGst(watchGst)}
                >
                  {gstVerified ? "Verified" : "Verify"}
                </LoadingButton>

                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    color: "green",
                    position: "absolute",
                    bottom: "3px",
                    left: "14px",
                  }}
                >
                  {gstVerified && !basicDetailFormState.errors.gst
                    ? gstVerified
                    : ""}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                }}
              >
                <SolrufTextField
                  label="Pin-code/Zip-code"
                  sx={{ my: 1, mr: 2 }}
                  defaultValue={customerDetails.location.pincode || ""}
                  {...registerBasicDetail("pincode", {})}
                  error={basicDetailFormState.errors.pincode}
                  helperText={
                    basicDetailFormState.errors.pincode
                      ? basicDetailFormState.errors.pincode.message
                      : ""
                  }
                />
                <SolrufTextField
                  label="City/District"
                  sx={{ my: 1, mr: 2 }}
                  defaultValue={customerDetails.location.city}
                  {...registerBasicDetail("city", {})}
                  error={basicDetailFormState.errors.city}
                  helperText={
                    basicDetailFormState.errors.city
                      ? basicDetailFormState.errors.city.message
                      : ""
                  }
                />

                {/* select state */}
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <SolrufTextField select label="State" {...field}>
                      {statesOfIndia.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </SolrufTextField>
                  )}
                ></Controller>
              </Box>
              <SolrufTextField
                sx={{ mt: 1.5 }}
                label="Street"
                defaultValue={customerDetails.location.street || ""}
                {...registerBasicDetail("street", {})}
                error={basicDetailFormState.errors.street}
                helperText={
                  basicDetailFormState.errors.street
                    ? basicDetailFormState.errors.street.message
                    : ""
                }
              />
            </FormWrapper>
            <PrimaryButton
              fullWidth
              sx={{
                borderRadius: "0 0 10px 10px",
                background: "#ffd05b",
              }}
              type="submit"
            >
              Save
            </PrimaryButton>
          </Box>
        )}
      </Box>
    </CustomAccordionForDrawer>
  );
};

export default BasicDetailsAccordion;
