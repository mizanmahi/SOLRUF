import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { NavLink, Outlet } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { IconButton, Menu, styled } from "@mui/material";
import { useEffect, useState } from "react";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { MobileDropDownMenu } from "../Dashboard/MobileDropDownMenu/MobileDropDownMenu";
import { ReactComponent as Arrow } from "./arrow.svg";
import { Close } from "@mui/icons-material";

const drawerWidth = 240;

const DashboardMenu = styled(Box)(({ theme }) => ({
  width: "90%",
  marginLeft: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: theme.spacing(2),
}));

const DashboardMenuLink = styled(NavLink)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(3),
  borderRadius: "50px 0 0 50px",
  color: "black",
  textDecoration: "none",
  fontWeight: "bold",
  "&:hover": {
    background: "gray",
    color: "#000",
    textDecoration: "none",
  },
  "& svg": {
    marginRight: theme.spacing(1),
  },
}));

const activeStyle = {
  background: "#ffd05b",
};

const desktopDrawerStyle = {
  display: { xs: "none", sm: "none", md: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    border: 0,
    background: "#FFFFFF",
    height: `calc(95vh - 77px)`,
    marginTop: "100px",
    borderRadius: "0 15px 15px 0",
  },
};

const dropDownTitles = ["Purchases", "Profile"];
const dropDownLinks = ["purchase-enquiries", "profile"];

function UserDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const location = useLocation();
  const [selectedDropDownMenu, setSelectedDropDownMenu] = useState(0);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (location.pathname === "/user-dashboard") {
      navigate("purchase-enquiries");
    }
  }, [location.pathname, navigate]);

  const drawer = (
    <DashboardMenu>
      <>
        <DashboardMenuLink
          to="purchase-enquiries"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <ShoppingCartRoundedIcon />
          Purchase & enquiries
        </DashboardMenuLink>
        <DashboardMenuLink
          to="profile"
          style={({ isActive }) =>
            isActive || location.pathname === "/user-dashboard/profile-edit"
              ? activeStyle
              : undefined
          }
        >
          <PersonRoundedIcon />
          Profile
        </DashboardMenuLink>
      </>
    </DashboardMenu>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F3F3F3",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: 0,
              background: "#f7f7f7",
              opacity: 1,
              borderRadius: "0 15px 15px 0",
              position: "relative",
              zIndex: 100000,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* ============================== drawer for desktop ============================== */}
        <Drawer variant="permanent" sx={desktopDrawerStyle} open>
          <Box sx={{ background: "#000000", p: 2 }}>
            <Typography
              sx={{ color: "#ffffff", textAlign: "center" }}
              variant="h6"
            >
              My Dashboard
            </Typography>
          </Box>

          {drawer}
        </Drawer>
      </Box>

      {/* ============================== Drawer for mobile ============================== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0.4,
          px: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // background: 'red',
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: "167px",
            zIndex: "1000",
            display: { xs: "flex", md: "none" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "53px",
              backgroundColor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginTop: -1,
            }}
            onClick={() => setDashboardOpen(!dashboardOpen)}
          >
            <Box
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" color={"white"}>
                {dropDownTitles[selectedDropDownMenu]}
              </Typography>
              <Arrow
                style={{
                  cursor: "pointer",
                  transform: `${
                    dashboardOpen ? "rotate(180deg)" : "rotate(90deg)"
                  } scale(0.6)`,
                  transition: "0.2s all ease-in-out",
                }}
              />
            </Box>
            <IconButton
              sx={{
                position: "absolute",
                right: "0px",
                color: "white",
              }}
              onClick={() => setDashboardOpen(!dashboardOpen)}
            >
              {dashboardOpen ? (
                <Close fontSize="large" />
              ) : (
                <Menu fontSize="large" />
              )}
            </IconButton>
          </Box>
          <MobileDropDownMenu
            display={dashboardOpen}
            showDropDown={(val) => setDashboardOpen(val)}
            activeMenu={selectedDropDownMenu}
            dropDownTitles={dropDownTitles}
            dropDownLinks={dropDownLinks}
            setActiveMenu={(val) => setSelectedDropDownMenu(val)}
          />
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
}

export default UserDashboard;
