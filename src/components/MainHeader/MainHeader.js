import {
  Badge,
  Container,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box } from "@mui/system";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import YellowButton from "../YellowButton/YellowButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoginModal,
  // setLoginRedirect,
} from "../../redux/slices/loginModalSlice";
import PersonIcon from "@mui/icons-material/Person";
import { removeUser } from "../../redux/slices/userSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

import LogoutIcon from "@mui/icons-material/Logout";
import ArticleIcon from "@mui/icons-material/Article";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LoginIcon from "@mui/icons-material/Login";
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router";
// import ContactPageIcon from '@mui/icons-material/ContactPage';
import { removeProfileData } from "../../redux/slices/ProfileSlice";
import {
  activeHeaderMenuStyle,
  activeStyle,
  CartBox,
  CustomMenuItem,
  DashboardMenu,
  DashboardMenuLink,
  DashboardMenuLink2,
  DrawerFooter,
  FooterMenu,
  FooterMenus,
  Header,
  Logo,
  LogoBox,
  LogoBoxInDrawer,
  MenuIconBox,
  Nav,
  ResultItem,
  SearchBox,
  SearchIconBox,
  Wrapper,
} from "./mainHeader.style";
import { removeCart } from "../../redux/slices/cart/cartSlice";
import { useDebounce } from "use-debounce/lib";
import { axiosInstance } from "../../utils/axiosInstance";

import Loader from "../Loader/Loader";
import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { setSearchString } from "../../redux/slices/searchSlice";
import { KeyboardBackspace } from "@mui/icons-material";
import { modalTopBackButtonStyle } from "../../theme/modalTopBackButtonStyle";
import Checkout from "../../pages/Checkout/Checkout";
import FixedInfoFooter from "../FixedInfoFooter/FixedInfoFooter";
import { HashLink } from "react-router-hash-link";

const MainHeader = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const matchMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  // const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [avatarMenuEl, setAvatarMenuEl] = React.useState(null);
  const [blogsMenuEl, setBlogsMenuEl] = React.useState(null);

  const [showCart, setShowCart] = React.useState(false);
  const openAvatarMenu = Boolean(avatarMenuEl);
  const openBlogsMenu = Boolean(blogsMenuEl);

  const handleAvatarClick = (event) => {
    setAvatarMenuEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAvatarMenuEl(null);
  };

  const handleBlogsMenuClose = async () => {
    console.log("blogs mouse leave");

    setBlogsMenuEl(null);
  };

  const handleBlogsMouseEnter = (event) => {
    setBlogsMenuEl(event.currentTarget);
    console.log("blogs mouse enter", event.target);
  };

  const [masterEl, setMasterEl] = React.useState(null);
  const openMasterMenu = Boolean(masterEl);
  const handleMasterClick = (event) => {
    setMasterEl(event.currentTarget);
  };
  const handleMasterClose = () => {
    setMasterEl(null);
  };

  const handleLogout = () => {
    setAvatarMenuEl(null);
    dispatch(removeUser());
    dispatch(removeProfileData());
    dispatch(removeCart());
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpenDrawer(false);
  }, [matchMd]);

  // drawer links for mobile
  const drawer = (
    <DashboardMenu
      onClick={() => {
        setOpenDrawer(false);
      }}
    >
      <DashboardMenuLink
        to="/products"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <StorefrontIcon />
        Products
      </DashboardMenuLink>

      {user && (role === "Vendor" || role === "User") && (
        <DashboardMenuLink
          to={`${role === "Vendor" ? "/vendor/dashboard" : "/user-dashboard"}`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <DashboardIcon />
          Dashboard
        </DashboardMenuLink>
      )}

      {user && role === "Administrator" && (
        <>
          <DashboardMenuLink
            to="/admin/create/new"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <AddBoxIcon />
            Create
          </DashboardMenuLink>

          <DashboardMenuLink
            to="/admin/products"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <StorefrontIcon />
            Admin Products
          </DashboardMenuLink>
        </>
      )}

      <DashboardMenuLink
        to="/order-status"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <LocalShippingIcon />
        Order-Status
      </DashboardMenuLink>

      <DashboardMenuLink
        to="/blogs"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <ArticleIcon />
        Blogs
      </DashboardMenuLink>

      <DashboardMenuLink2 component={HashLink} to="/#contact-us">
        <PhoneIcon />
        Contact Us
      </DashboardMenuLink2>
    </DashboardMenu>
  );

  const logo1 = "https://i.ibb.co/rpxqJQB/Sol-Ruf-animated-Logo-1.png";
  const logo2 = "https://i.ibb.co/CzpgVFq/51.png";

  const navigate = useNavigate();

  // const portfolioRouteHandler = () => {
  //    if (!user) {
  //       dispatch(openLoginModal());
  //       dispatch(setLoginRedirect('/profile'));
  //    } else {
  //       navigate('/profile');
  //    }
  // };
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 700);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    console.log("search term changed");

    const search = async () => {
      if (!debouncedSearchTerm) return;
      setSearching(true);
      try {
        const { status, data } = await axiosInstance.get(
          `api/products/search?q=${debouncedSearchTerm}`
        );
        if (status === 200) {
          setSearchData(data.products);
          setSearching(false);
        }
      } catch (error) {
        console.log(error.message);
        setSearching(false);
      }
    };

    search();
  }, [debouncedSearchTerm]);

  const resultBoxRef = useRef(null);
  const searchInputRef = useRef(null);
  const [showResultBox, setShowResultBox] = useState(false);

  useOutsideClick(resultBoxRef, searchInputRef, () => {
    setShowResultBox(false);
  });

  // console.log(searchData);

  const searchClickHandler = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      dispatch(setSearchString(searchTerm));
      setShowResultBox(false);
      navigate("/products");
    }
  };

  const goToProduct = (slug) => {
    dispatch(setSearchString(""));
    setShowResultBox(false);
    navigate(`/products/${slug}`);
  };

  return (
    <>
      {" "}
      <FixedInfoFooter />
      <Wrapper
        sx={{
          paddingBottom: matchMd ? 2 : 0,
          background: {
            xs: "#4D4D4D",
            md: "#ffffff",
          },
        }}
      >
        <Container maxWidth="xl">
          <Header>
            <LogoBox>
              <MenuIconBox
                onClick={() => setOpenDrawer(!openDrawer)}
                sx={{
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                }}
              >
                <MenuIcon fontSize="1.6rem" />
              </MenuIconBox>
              <Logo component={Link} to="/">
                <img src={matchMd ? logo2 : logo1} alt="logo" />
              </Logo>
            </LogoBox>
            {!matchMd && (
              <SearchBox component="form" onSubmit={searchClickHandler}>
                <input
                  type="text"
                  placeholder="ex: solar panel, but..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowResultBox(true)}
                  value={searchTerm}
                  ref={searchInputRef}
                />
                <SearchIconBox>
                  <SearchIcon />
                </SearchIconBox>
                <Box
                  sx={{
                    position: "absolute",
                    maxHeight: "400px",
                    width: "100%",
                    background: "#ffffff",
                    borderRadius: " 0.5rem",
                    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e6e6e6",
                    top: "110%",
                    left: 0,
                    zIndex: 150000,
                    padding: "1rem",
                    display: showResultBox ? "block" : "none",
                    overflowY: "auto",
                  }}
                  ref={resultBoxRef}
                >
                  {searching && <Loader />}
                  {!searching && searchData.length === 0 && (
                    <Typography>Write something to search</Typography>
                  )}
                  {searchData.length > 0 &&
                    searchData?.map((item) => (
                      <ResultItem
                        onClick={() => goToProduct(item.product_slug)}
                      >
                        <Box className="imageBox">
                          <img src={item?.default_image} alt="default" />
                        </Box>
                        <Typography>{item?.product_name}</Typography>
                      </ResultItem>
                    ))}
                </Box>
              </SearchBox>
            )}
            <Nav sx={{ display: { xs: "none", md: "flex" } }}>
              <CustomMenuItem
                variant="body"
                color="textPrimary"
                component={NavLink}
                to="/products"
                style={({ isActive }) =>
                  isActive ? activeHeaderMenuStyle : undefined
                }
              >
                Products
              </CustomMenuItem>
              <CustomMenuItem
                variant="body"
                color="textPrimary"
                component={NavLink}
                to="/order-status"
                style={({ isActive }) =>
                  isActive ? activeHeaderMenuStyle : undefined
                }
              >
                Order-Status
              </CustomMenuItem>
              {user && (role === "Vendor" || role === "User") && (
                <CustomMenuItem
                  variant="body"
                  color="textPrimary"
                  component={NavLink}
                  to={`${
                    role === "Vendor" ? "/vendor/dashboard" : "/user-dashboard"
                  }`}
                  style={({ isActive }) =>
                    isActive ? activeHeaderMenuStyle : undefined
                  }
                >
                  Dashboard
                </CustomMenuItem>
              )}

              {user && role === "Administrator" && (
                <CustomMenuItem
                  variant="body"
                  color="textPrimary"
                  onClick={handleMasterClick}
                  aria-controls={open ? "master-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  Master
                </CustomMenuItem>
              )}
              {/* // * ===================== admin dropdown menu ================== */}
              <div>
                <Menu
                  id="master-menu"
                  anchorEl={masterEl}
                  open={openMasterMenu}
                  onClose={handleMasterClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/admin/create/new"
                  >
                    Create Product / Attribute
                  </MenuItem>

                  <MenuItem component={Link} to="/admin/products">
                    Products / Update Product
                  </MenuItem>
                </Menu>
              </div>
              <>
                <CustomMenuItem
                  variant="body"
                  component={NavLink}
                  to="/blogs"
                  color="textPrimary"
                  style={({ isActive }) =>
                    isActive ? activeHeaderMenuStyle : undefined
                  }
                  onMouseEnter={handleBlogsMouseEnter}
                  // onMouseLeave={handleBlogsMenuClose}
                >
                  Blogs
                </CustomMenuItem>
                <div>
                  <Menu
                    id="basic-menu2"
                    anchorEl={blogsMenuEl}
                    open={openBlogsMenu}
                    onClose={handleBlogsMenuClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                      onMouseLeave: handleBlogsMenuClose,
                    }}
                  >
                    <MenuItem component={Link} to="/blogs/typesOfPvSystems">
                      Types of PV Systems
                    </MenuItem>

                    <MenuItem component={Link} to="/blogs/solarSteps">
                      Steps before Solar Installation
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/blogs/solarInstallationProcess"
                    >
                      Solar Installation
                    </MenuItem>
                    <MenuItem component={Link} to="/blogs/solarComponents">
                      Components used in Solar Installation
                    </MenuItem>
                    <MenuItem component={Link} to="/blogs/maintenance">
                      Solar Panel Maintenance
                    </MenuItem>
                    <MenuItem component={Link} to="/blogs/kwattCourses">
                      KWatt Courses
                    </MenuItem>
                  </Menu>
                </div>
              </>

              <CustomMenuItem
                variant="body"
                color="textPrimary"
                component={HashLink}
                to="/#contact-us"
              >
                Contact Us
              </CustomMenuItem>

              <CartBox
                onClick={() => navigate("/checkout")}
                sx={{
                  margin: "0 1rem",
                  "@media (max-width: 1200px)": {
                    margin: "0 0.5rem",
                  },
                  "& svg": {
                    "@media (max-width: 1200px)": {
                      fontSize: "1.3rem",
                    },
                  },
                  cursor: "pointer",
                  "&:hover svg": { color: "#000000" },
                  "&:hover p": { color: "#000000" },
                }}
              >
                <Badge
                  badgeContent={cart?.reduce(
                    (prev, curr) => prev + curr.quantity,

                    0
                  )}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "#4D4D4D",
                      color: "#ffffff",
                      fontWeight: 600,
                    },
                  }}
                >
                  <ShoppingCartIcon color="action" />
                </Badge>
                <Typography
                  sx={{
                    ml: 1,
                    "@media (max-width: 1200px)": {
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  Cart
                </Typography>
              </CartBox>
              {user ? (
                <>
                  <IconButton
                    sx={{
                      bgcolor: "primary.main",
                      ml: "0.8rem",
                      "@media (max-width: 1200px)": {
                        marginLeft: "0.5rem",
                      },
                      boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.1)",
                      "&:hover": {
                        bgcolor: "primary.main",
                        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.1)",
                      },
                      "& svg": {
                        color: "primary.dark",
                        "@media (max-width: 1200px)": {
                          fontSize: "1.2rem",
                        },
                      },
                    }}
                    aria-label="delete"
                    onClick={handleAvatarClick}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <PersonIcon />
                  </IconButton>

                  <div>
                    <Menu
                      id="basic-menu"
                      anchorEl={avatarMenuEl}
                      open={openAvatarMenu}
                      onClose={handleMenuClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to={`${
                          role === "Vendor"
                            ? "/vendor/dashboard/profile"
                            : "/user-dashboard/profile"
                        }`}
                      >
                        Profile
                      </MenuItem>

                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </>
              ) : (
                <>
                  <YellowButton
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "bold",
                    }}
                    onClick={() => dispatch(openLoginModal())}
                  >
                    Login or Register
                  </YellowButton>
                </>
              )}
            </Nav>
            {matchMd && (
              <CartBox onClick={() => setShowCart(true)}>
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon color="action" />
                </Badge>
                <Typography sx={{ ml: 1 }}>Cart</Typography>
              </CartBox>
            )}
          </Header>
          {matchMd && (
            <SearchBox component="form" onSubmit={searchClickHandler}>
              <input
                type="text"
                placeholder="ex: solar panel, batteries..."
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowResultBox(true)}
                value={searchTerm}
                ref={searchInputRef}
              />
              <SearchIconBox>
                <SearchIcon />
                <Typography
                  variant="h6"
                  color="#4d4d4d"
                  sx={{ display: { xs: "none", sm: "block" } }}
                ></Typography>
              </SearchIconBox>
              <Box
                sx={{
                  position: "absolute",
                  maxHeight: "400px",
                  width: "100%",
                  background: "#ffffff",
                  borderRadius: " 0.5rem",
                  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e6e6e6",
                  top: "110%",
                  left: 0,
                  zIndex: 150000,
                  padding: "1rem",
                  display: showResultBox ? "block" : "none",
                  overflowY: "auto",
                }}
                ref={resultBoxRef}
              >
                {searching && <Loader />}
                {!searching && searchData.length === 0 && (
                  <Typography>Write something to search</Typography>
                )}
                {searchData.length > 0 &&
                  searchData?.map((item) => (
                    <ResultItem onClick={() => goToProduct(item.product_slug)}>
                      <Box className="imageBox">
                        <img src={item?.default_image} alt="default" />
                      </Box>
                      <Typography>{item?.product_name}</Typography>
                    </ResultItem>
                  ))}
              </Box>
            </SearchBox>
          )}
        </Container>

        {/* <CustomDrawer open={mobileOpen} handleToggle={handleDrawerToggle} /> */}
        {/* ============ main mobile drawer for menus ============ */}
        <Drawer
          anchor="left"
          open={openDrawer && matchMd}
          onClose={() => setOpenDrawer(false)}
        >
          <Box
            sx={{
              bgcolor: "#F3F3F3",
              height: "100vh",
              minWidth: "250px",
              position: "relative",
            }}
          >
            <ArrowBackIosIcon
              sx={{
                position: "absolute",
                color: "#ffffff",
                fontSize: "1.2rem",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={() => setOpenDrawer(false)}
            />
            <LogoBoxInDrawer>
              <img
                src="https://i.ibb.co/kmDKGGw/51-1.png"
                alt=""
                style={{ maxWidth: "200px" }}
              />
            </LogoBoxInDrawer>
            {drawer}
            <DrawerFooter>
              <Divider />
              <FooterMenus sx={{ p: "1rem 0" }}>
                {user && (
                  <>
                    <FooterMenu
                      component={Link}
                      to={`${
                        role === "Vendor"
                          ? "/vendor/dashboard/profile"
                          : "/user-dashboard/profile"
                      }`}
                    >
                      <PersonIcon />
                      <Typography fontWeight={600} sx={{ color: "#000" }}>
                        Profile
                      </Typography>
                    </FooterMenu>

                    <FooterMenu onClick={handleLogout}>
                      <LogoutIcon />
                      <Typography fontWeight={600} sx={{ color: "#000" }}>
                        Logout
                      </Typography>
                    </FooterMenu>
                  </>
                )}

                {!user && (
                  <FooterMenu onClick={() => dispatch(openLoginModal())}>
                    <LoginIcon />
                    <Typography fontWeight={600} sx={{ color: "#000" }}>
                      Login or Register
                    </Typography>
                  </FooterMenu>
                )}
              </FooterMenus>
            </DrawerFooter>
          </Box>
        </Drawer>

        <Dialog
          sx={{ top: "0" }}
          fullScreen
          open={showCart}
          onCLose={() => setShowCart(false)}
        >
          <Box sx={modalTopBackButtonStyle} onClick={() => setShowCart(false)}>
            <KeyboardBackspace />
            <Box>Back</Box>
          </Box>
          <Box sx={{ mt: 10, pb: 5 }}>
            <Checkout />
          </Box>
        </Dialog>
      </Wrapper>
    </>
  );
};

export default MainHeader;
