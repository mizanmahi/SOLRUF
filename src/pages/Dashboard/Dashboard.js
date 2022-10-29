import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { NavLink, Outlet } from "react-router-dom";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { IconButton, styled } from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import trollySvg from "../../media/Svg/trolly.svg";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { MobileDropDownMenu } from "./MobileDropDownMenu/MobileDropDownMenu";
import { Menu, Close } from "@mui/icons-material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { setSelectedDashboardDropDownMenuMobile } from "../../redux/slices/utils/utils.slice";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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
  color: "#000",
  textDecoration: "none",
};

const desktopDrawerStyle = {
  display: { xs: "none", sm: "none", md: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    border: 0,
    background: "#ffffff",
    height: `calc(95vh - 77px)`,
    marginTop: "100px",
    borderRadius: "0 15px 15px 0",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  },
};

const dropDownTitles = [
  "Dashboard",
  "Portfolio",
  "Customer & Leads",
  "Sales & Enquiries",
  "Purchases",
  "Consultation",
  "Profile",
];
const dropDownLinks = [
  "",
  "portfolio",
  "customerLeads",
  "sale",
  "purchase",
  "consultation",
  "profile",
];

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { selectedDashboardDropDownMenuMobile } = useSelector(
    (state) => state.utils
  );
  const [selectedDropDownMenu, setSelectedDropDownMenu] = useState(
    selectedDashboardDropDownMenuMobile
  );

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const { role } = useSelector((state) => state.user);

  console.log({ selectedDashboardDropDownMenuMobile });

  const drawer = (
    <DashboardMenu>
      <DashboardMenuLink
        to=""
        end
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <DashboardIcon />
        Dashboard
      </DashboardMenuLink>
      <DashboardMenuLink
        to="portfolio"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <DesktopMacIcon />
        Portfolio
      </DashboardMenuLink>
      <DashboardMenuLink
        to="customerLeads"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <SupportAgentIcon />
        Customers / Leads
      </DashboardMenuLink>
      <DashboardMenuLink
        to="sale"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <MonetizationOnIcon />
        Sales & Enquiries
      </DashboardMenuLink>
      <DashboardMenuLink
        to="purchase"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <img
          src={trollySvg}
          alt=""
          style={{ marginRight: "0.5rem", height: "23px", width: "23px" }}
        />
        Purchase
      </DashboardMenuLink>
      <DashboardMenuLink
        to="consultation"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <TextSnippetIcon />
        Consultation
      </DashboardMenuLink>

      <DashboardMenuLink
        to="profile"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <PersonIcon />
        Profile
      </DashboardMenuLink>
    </DashboardMenu>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", background: "#f3f3f3" }}>
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
          //  open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 0.3,
          pb: 0,
          px: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: "#f3f3f3",
          maxWidth: "100%",
        }}
      >
        {/* ============================== BottomNavigation for Mobile ============================== */}
        {/* <BottomNavigation
          sx={{
            display: { xs: "flex", md: "none", margin: "0 auto" },
            justifyContent: "center",
            "& .MuiButtonBase-root": {
              px: 0,
            },
            my: 0.1,
            // pl:10
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Tabs
            value={value}
            scrollButtons
            allowScrollButtonsMobile
            showLabels
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            variant="scrollable"
            aria-label="scrollable auto tabs example"
          >
            <BottomNavigationAction
              component={Link}
              to=""
              label="Dashboard"
              icon={<DashboardIcon fontSize="small" />}
            />
            <BottomNavigationAction
              component={Link}
              to="portfolio"
              label="Portfolio"
              icon={<DesktopMacIcon fontSize="small" />}
            />
            <BottomNavigationAction
              label="Leads"
              icon={<SupportAgentIcon fontSize="small" />}
              component={Link}
              to="customerLeads"
            />
            <BottomNavigationAction
              label="Sale"
              icon={<MonetizationOn fontSize="small" />}
              component={Link}
              to="sale"
            />
            <BottomNavigationAction
              label="Purchase"
              icon={<ShoppingCartIcon fontSize="small" />}
              component={Link}
              to="purchase"
            />
            <BottomNavigationAction
              label="Profile"
              icon={<PersonIcon fontSize="small" />}
              component={Link}
              to="profile"
            />
          </Tabs>
        </BottomNavigation> */}
        <Box
          sx={{
            position: "sticky",
            top: "166px",
            zIndex: "1000",
            display: { xs: "flex", md: "none" },
          }}
        >
          <Box
            sx={{
              width: "98%",
              mx: "auto",
              borderRadius: mobileOpen ? "4px 4px 0 0" : "4px",
              height: "50px",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              mb: mobileOpen ? 0 : 2,
              mt: -0.5,
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Box
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="h5" color={"primary.dark"}>
                {dropDownTitles[selectedDropDownMenu]}
              </Typography>
              <NavigateNextIcon
                sx={{
                  transform: `${
                    mobileOpen ? "rotate(90deg)" : "rotate(0deg)"
                  } `,
                  transition: "0.2s all ease-in-out",
                  fontSize: "1.8rem",
                  color: "primary.dark",
                }}
              />
            </Box>
            <IconButton
              sx={{
                position: "absolute",
                right: "0px",
                color: "white",
                padding: "4px",
                mr: "4px",
                "& .MuiSvgIcon-root": {
                  color: "primary.dark",
                },
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <Close fontSize="large" />
              ) : (
                <Menu fontSize="large" />
              )}
            </IconButton>
          </Box>
          <MobileDropDownMenu
            display={mobileOpen}
            showDropDown={(val) => setMobileOpen(val)}
            activeMenu={selectedDropDownMenu}
            dropDownTitles={dropDownTitles}
            dropDownLinks={dropDownLinks}
            setActiveMenu={(val) => {
              setSelectedDropDownMenu(val);
              dispatch(setSelectedDashboardDropDownMenuMobile(val));
            }}
          />
        </Box>
        <Box sx={{ background: "", minHeight: "calc(100vh - 110px)" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
