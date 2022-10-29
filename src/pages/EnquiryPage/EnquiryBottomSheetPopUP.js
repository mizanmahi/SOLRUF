import React from "react";
import BottomDialog from "./BottomSheet";

const EnquiryBottomSheetPopUp = ({ children, dialogOpen, setDialogOpen, page }) => {
  return (
    <BottomDialog
      open={dialogOpen}
      handleClose={() => setDialogOpen(false)}
      height="80%"
      bar={true}
      text={"Company Details"}
      page={page}
    >
      {children}
    </BottomDialog>
  );
};

export default EnquiryBottomSheetPopUp;
