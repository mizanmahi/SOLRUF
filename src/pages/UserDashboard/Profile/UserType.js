import React, { Fragment } from "react";
import { Box, styled, Typography } from "@mui/material";

const UserTypeBox = styled(Box)(({ theme }) => ({
  display: "block",
  padding: "1rem 0",
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  background: "#D0D7D9",
  padding: ".5rem",
  borderRadius: "6px",
  border: "2px solid #000000",
  marginBottom: "1rem",
  cursor: "pointer",
  flex: 1,
  "&:hover": {
    opacity: "0.9",
  },
}));
const VendorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  background: "#D0D7D9",
  padding: ".5rem",
  borderRadius: "6px",
  border: "2px solid #000000",
  cursor: "pointer",
  flex: 1,
  marginBottom: "1rem",
  "&:hover": {
    opacity: "0.9",
  },
}));

const Text = styled(Box)(({ theme }) => ({
  textAlign: "right",
  flex: "1",
}));

const Circle = styled(Box)(({ theme }) => ({
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
  border: "2px solid #000000",
  marginRight: "1rem",
}));

const UserType = ({ userRole, handleUserRoleClick }) => {
  return (
    <Fragment>
      <Box
        sx={{
          mb: 2,
          mt: 1,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Select User Type
        </Typography>

        <UserTypeBox
          sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
        >
          <VendorBox
            sx={{
              background: userRole.role === "Vendor" ? "#ffd05b" : "#FFFFFF",
              mr: { md: 2, xs: 0 },
            }}
            onClick={() => handleUserRoleClick("Vendor")}
          >
            <Circle
              sx={{
                background: userRole.role === "Vendor" ? "#4D4D4D" : "#FFFFFF",
              }}
            ></Circle>

            <Text>
              <Typography variant="h6" fontWeight={600}>
                {" "}
                Solar Installer / Vendor
              </Typography>
              <Typography variant="body2">
                You have a solar product/service company and woulkd like to
                promote yout business along with procurement.
              </Typography>
            </Text>
          </VendorBox>

          <UserBox
            sx={{
              background: userRole.role === "User" ? "#ffd05b" : "#FFFFFF",
            }}
            onClick={() => handleUserRoleClick("User")}
          >
            <Circle
              sx={{
                background: userRole.role === "User" ? "#4D4D4D" : "#FFFFFF",
              }}
            ></Circle>
            <Text>
              <Typography variant="h6" fontWeight={600}>
                {" "}
                Purchase Consumer
              </Typography>
              <Typography variant="body2" className="pt-2">
                You are here to purchase solar products.
              </Typography>
            </Text>
          </UserBox>
        </UserTypeBox>
      </Box>
    </Fragment>
  );
};
export default UserType;
