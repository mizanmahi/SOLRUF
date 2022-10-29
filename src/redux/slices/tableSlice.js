import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   customerLeads: false,
   remindersData: false,
   vendorEnquiries: false,
   userEnquiries: false,
   consultationsData: false,
   userOrdersData: false,
   vendorSalesData: false,
   remindersTabOpen: false,
   purchaseTabOpen: false,
   salesTabOpen: false,
   deleteUserHandler: false,
};

export const tableData = createSlice({
   name: 'tableData',
   initialState,
   reducers: {
      setCustomerLeads: (state, action) => {
         state.customerLeads = action.payload;
      },
      setRemindersData: (state, action) => {
         state.remindersData = action.payload;
      },
      setVendorEnquiriesData: (state, action) => {
         state.vendorEnquiries = action.payload;
      },
      setUserEnquiriesData: (state, action) => {
         state.userEnquiries = action.payload;
      },
      setVendorEnquiryDrawerData: (state, action) => {
         state.vendorEnquiries = action.payload;
      },
      setOnReminderTab: (state, action) => {
         state.remindersTabOpen = action.payload;
      },
      setPurchaseTabOpen: (state, action) => {
         state.purchaseTabOpen = action.payload;
      },
      setConsultationsData: (state, action) => {
         state.consultationsData = action.payload;
      },
      setUserOrdersData: (state, action) => {
         state.userOrdersData = action.payload;
      },
      setVendorSalesData: (state, action) => {
         state.vendorSalesData = action.payload;
      },
      setSalesTabOpen: (state, action) => {
         state.salesTabOpen = action.payload;
      },
      setDeleteUserHandler: (state, action) => {
         state.deleteUserHandler = action.payload;
      }
      
   },
});

export const {
   setCustomerLeads,
   setRemindersData,
   setVendorEnquiriesData,
   setUserEnquiriesData,
   setConsultationsData,
   setUserOrdersData,
   setVendorSalesData,
   setOnReminderTab,
   setPurchaseTabOpen,
   setSalesTabOpen,
   setDeleteUserHandler
} = tableData.actions;

export default tableData.reducer;
