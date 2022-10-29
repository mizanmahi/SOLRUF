import React from "react";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import FeatureDetail from "../FeatureDetail/FeatureDetail";
import { MenuItem, Box } from "@mui/material";

import CustomAccordionForDrawer from "../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer";
import SolrufTextField from "../TextField/TextField";

import BackToButton from "../BackToButton/BackToButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TimelineIcon from "@mui/icons-material/Timeline";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Flex, FormWrapper } from "./customerDetailsDrawer.style";

const LeadsAccordion = ({
  leadsEdit,
  submitLead,
  leadsEditHandler,
  setLeadsEdit,
  leadSource,
  registerLead,
  leadFormState,
  leadConfigs,
  leadStatus,
  selectedCategory,
  customerDetails,
  categories,
}) => {
  return (
    <CustomAccordionForDrawer
      paddingOff={true}
      pt="1rem"
      title="Leads"
      titleStyle={{ fontSize: "1rem" }}
      sx={{
        mt: 2,
        // boxShadow: 0,
        "& .MuiAccordionSummary-root": {
          // borderBottom: '1px solid #D0D7D9',
        },
      }}
    >
      {leadsEdit ? (
        <Box component="form" onSubmit={submitLead(leadsEditHandler)}>
          <FormWrapper sx={{ pt: 0 }}>
            <BackToButton sx={{}} onClick={() => setLeadsEdit(false)}>
              Back
            </BackToButton>
            <Flex>
              <SolrufTextField
                select
                label="Lead Source"
                defaultValue={leadSource}
                // onChange={(e) => setLeadSource(e.target.value)}
                sx={{ mr: 2, mt: 2 }}
                {...registerLead("lead_source_id", {
                  required: {
                    value: true,
                    message: "Lead source is required",
                  },
                })}
                error={leadFormState.errors.lead_source_id}
                helperText={
                  leadFormState.errors.lead_source_id
                    ? leadFormState.errors.lead_source_id.message
                    : ""
                }
              >
                {leadConfigs.sources.map(({ source_id, source_name }) => (
                  <MenuItem key={source_id} value={source_id}>
                    {source_name}
                  </MenuItem>
                ))}
              </SolrufTextField>
              <SolrufTextField
                select
                label="Lead Status"
                defaultValue={leadStatus}
                // onChange={(e) => setLeadStatus(console.log(e.target.value))}
                sx={{ mt: 2 }}
                {...registerLead("lead_status_id", {
                  required: {
                    value: true,
                    message: "Lead status is required",
                  },
                })}
                error={leadFormState.errors.lead_status_id}
                helperText={
                  leadFormState.errors.lead_status_id
                    ? leadFormState.errors.lead_status_id.message
                    : ""
                }
              >
                {leadConfigs.statuses.map(({ status_id, status_name }) => (
                  <MenuItem key={status_id} value={status_id}>
                    {status_name}
                  </MenuItem>
                ))}
              </SolrufTextField>
            </Flex>
            <Flex sx={{ mt: 2 }}>
              <SolrufTextField
                select
                defaultValue={selectedCategory}
                {...registerLead("category_id", {
                  required: {
                    value: true,
                    message: "Please select product category",
                  },
                })}
                error={leadFormState.errors.category_id}
                helperText={
                  leadFormState.errors.category_id
                    ? leadFormState.errors.category_id.message
                    : ""
                }
                label="Select Category"
                // onChange={(e) =>
                //   setSelectedCategory(e.target.value)
                // }
              >
                {categories.map(({ category_id, name }) => (
                  <MenuItem key={category_id} value={category_id}>
                    {name}
                  </MenuItem>
                ))}
              </SolrufTextField>
              <SolrufTextField
                label="Amount"
                sx={{ ml: 2 }}
                defaultValue={customerDetails.lead?.amount || ""}
                {...registerLead("amount", {})}
                error={leadFormState.errors.amount}
                helperText={
                  leadFormState.errors.amount
                    ? leadFormState.errors.amount.message
                    : ""
                }
              />
            </Flex>
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
      ) : (
        <Box>
          <Flex
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              p: 2,
            }}
          >
            <Box sx={{ mr: 2, minWidth: "50%" }}>
              <FeatureDetail
                icon={<FilterAltIcon />}
                title="Lead Source"
                value={customerDetails.lead?.name || "N/A"}
              />
              <FeatureDetail
                icon={<CategoryIcon />}
                title="Product Category"
                value={customerDetails.lead?.category?.name || "N/A"}
              />
            </Box>
            <Box>
              <FeatureDetail
                icon={<TimelineIcon />}
                title="Lead Status"
                value={customerDetails.lead?.status || "N/A"}
              />
              <FeatureDetail
                icon={<AttachMoneyIcon />}
                title="Amount (INR)"
                value={customerDetails.lead?.amount || "N/A"}
              />
            </Box>
          </Flex>
          <PrimaryButton
            fullWidth
            sx={{
              borderRadius: "0 0 10px 10px",
              background: "#D0D7D9",
            }}
            onClick={() => setLeadsEdit(true)}
          >
            Edit
          </PrimaryButton>
        </Box>
      )}
    </CustomAccordionForDrawer>
  );
};

export default LeadsAccordion;
