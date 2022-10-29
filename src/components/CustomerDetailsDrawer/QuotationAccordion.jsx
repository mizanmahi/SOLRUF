import React from "react";
import CustomAccordionForDrawer from "../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import { QuotationListWrapper } from "./customerDetailsDrawer.style";
import QuotationListItem from "./QuotationListItem";

const QuotationAccordion = ({
  quotations,
  setQuotations,
  setQuoteModalOpen,
  setQuotationToBeEdited,
  getAQuotePage,
  setGetAQuotePage,
}) => {
  return (
    <CustomAccordionForDrawer
      paddingOff={true}
      title="Get a Quotation"
      titleStyle={{ fontSize: "1rem" }}
      sx={{
        marginTop: "1rem",
        // boxShadow: 0,
        "& .MuiAccordionSummary-root": {
          // borderBottom: '1px solid #D0D7D9',
        },
      }}
    >
      <QuotationListWrapper>
        {quotations.map((quotation, index) => (
          <QuotationListItem
            title={quotation.bank_name}
            index={index}
            quotation={quotation}
            setQuotations={setQuotations}
            setQuoteModalOpen={setQuoteModalOpen}
            setQuotationToBeEdited={setQuotationToBeEdited}
            page={getAQuotePage}
            setPage={setGetAQuotePage}
          />
        ))}
      </QuotationListWrapper>
      <PrimaryButton
        fullWidth
        sx={{
          borderRadius: "0 0 10px 10px",
          background: "#D0D7D9",
        }}
        onClick={() => setQuoteModalOpen(true)}
      >
        Create a Quote
      </PrimaryButton>
    </CustomAccordionForDrawer>
  );
};

export default QuotationAccordion;
