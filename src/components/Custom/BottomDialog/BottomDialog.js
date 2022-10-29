import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { Box, styled } from '@mui/system';
// import CloseIcon from '@mui/icons-material/Close';
import Close from "@mui/icons-material/Close";
import { Flex } from '../../../pages/EnquiryPage/enquiryPage.style';

export const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction='up' ref={ref} {...props} />;
});


const Bar = styled(Box)(({ theme }) => ({
   background: "#666F73",
   height: "10px",
   borderRadius: "5px",
   width: "25%",
   top: "0.5rem",
   position: "absolute",
   cursor: "pointer",
}));

const DialogHeader = styled(Box)(({ theme }) => ({
   background: "white",
   minHeight: "40px",
   position: "relative",
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
   cursor: "pointer",
   "& svg": {
      position: "absolute",
      top: "10%",
      transform: "translateY(-50%) rotate(180deg)",
      right: "0",
      fontSize: "30px",
      cursor: "pointer",
      color: "rgba(0,0,0,0.8)",
   },
}));

export default function FullScreenDialog({
   hideBackdrop = false,
   handleClose,
   open,
   height = '100%',
   bar = false,
   sx,
   children,
   text,
   paddingValue,
}) {
   return (
      <div>
         <Dialog
            hideBackdrop={hideBackdrop}
            fullScreen
            open={open}
            onClose={handleClose}
            // TransitionComponent={Transition}
            sx={{
               "& .MuiDialog-paper": {
                  height: height,
                  background: "#white",
                  borderRadius: "22px 22px 0 0",
                  padding: `${paddingValue || "20px 20px 0px 20px"}`,
               },
               "& .MuiDialog-container": { alignItems: "flex-end" },
               ...sx,
            }}
         >
            <Flex sx={{ justifyContent: "center" }}>
               {bar && <Bar onClick={handleClose}></Bar>}
            </Flex>
            <DialogHeader>
               <Close sx={{ mt: 1,mr:0 }} onClick={handleClose} />
               <Typography sx={{ mt: 1, fontWeight: 'bold', fontSize: "1rem" }} variant="h4">
                  {text}
               </Typography>
            </DialogHeader>
            {/* <FilterDialogHeader onClick={handleClose}>
               <ArrowRightAltIcon sx={{ mt: 0.8 }} onClick={handleClose} />
               <Typography sx={{ mt: 1 }} variant='h6'>{text}</Typography>
            </FilterDialogHeader> */}
            {children}
         </Dialog>
      </div>
   );
}
