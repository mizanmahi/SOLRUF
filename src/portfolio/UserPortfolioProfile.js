import React, { useState } from "react";
import { Grid, Typography, Dialog } from "@mui/material";
import { Box } from "@mui/system";
// import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import "./userPortfolioProfile.css";
import BookNow from "./Projects/BookNow/BookNow";
import BookProducts from "./BookProducts/BookProducts";
import YellowButton from "../components/YellowButton/YellowButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomModal from "../components/CustomModal/CustomModal";
import { useEffect } from "react";
import { axiAuth } from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router";
import Loader from "../components/Loader/Loader";
import VideoModal from "../components/VideoModal/VideoModal";
import { Helmet } from "react-helmet";
import ProjectsSlider from "./Projects/ProjectsSlider";
import {
  BookWrapper,
  ConsultTextField,
  InnerWrapper,
  ModalWrapper,
  ProfileErrorWrapper,
  useStyles,
} from "./userPortfolioProfile.style";
import { setPortfolioData } from "../redux/slices/portfolio.slice";
import { useDispatch } from "react-redux";
import { KeyboardBackspace } from "@mui/icons-material";

import PurchaseProductMobile from "../pages/PurchaseProductPage/PurchaseProductMobile";
import { modalTopBackButtonStyle } from "../theme/modalTopBackButtonStyle";

import { useForm } from "react-hook-form";
import PrimaryButton from "../components/Custom/PrimaryButton/PrimaryButton";
import { toast } from "react-toastify";
import { formatYoutubeVideoUrl } from "../utils/utils";
import LeadForm from "../components/LeadForm/LeadForm";
import SubsidyBox from "./SubsidyBox/SubsidyBox";
import DetailModal from "./DetailModal";
import PolicyDialog from "./PolicyDialog";
import BottomSheetDialog from "./BottomSheetDialog";
import BookingFormModal from "./BookingFormModal";
import ProfileTop from "./ProfileTop";

const paraStyle = {
  maxHeight: "500px !important",
};

const UserPortfolioProfile = ({ noPadding }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  // const { extra } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (scrollIndex === 3)
      descriptionRef?.current?.scrollIntoView({ behavior: "smooth" });
    if (scrollIndex === 2)
      certificatesRef?.current?.scrollIntoView({ behavior: "smooth" });
    if (scrollIndex === 1)
      aboutRef?.current?.scrollIntoView({ behavior: "smooth" });
    if (scrollIndex === 0)
      companyRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollIndex]);

  // const [selectedListItem, setSelectedListItem] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [productForPurchase, setProductForPurchase] = useState(null);
  // const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);

  const openPurchaseModal = (product) => {
    setProductForPurchase(product);
    setShowPurchaseModal(true);
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  const descriptionRef = React.useRef(null);
  const companyRef = React.useRef(null);
  const aboutRef = React.useRef(null);
  const certificatesRef = React.useRef(null);

  const [showPolicyDialog, setShowPolicyDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openBooking, setOpenBooking] = useState(false);
  const [openPhonePanel, setOpenPhonePanel] = useState(true);

  const [openAfterSalePolicyModal, setOpenAfterSalePolicyModal] =
    useState(false);
  const handleAfterSalePolicyModalOpen = () => {
    setOpenAfterSalePolicyModal(true);
  };
  const handleAfterSalePolicyModalClose = () =>
    setOpenAfterSalePolicyModal(false);

  const classes = useStyles({ openPhonePanel });

  const handleOpenBooking = () => {
    setOpenBooking((openBooking) => !openBooking);
  };

  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = React.useState(0);
  const [tabValue2, setTabValue2] = React.useState(0);

  const handleChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleChange2 = (e, newValue) => {
    setTabValue2(newValue);
  };

  const handleTextExpandClose = () => {
    setAboutTextExpanded(false);
  };
  const [aboutTextExpanded, setAboutTextExpanded] = useState(false);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);

  const showDetailModal = () => {
    setShowProductDetail(true);
  };

  const hideDetailModal = () => {
    setShowProductDetail(false);
  };

  // const [projects, setProjects] = useState([]);

  const [profileData, setProfileData] = useState(null);
  const [products, setProducts] = useState([]);
  const [profileDataLoading, setProfileDataLoading] = useState(true);
  const [profileDataError, setProfileDataError] = useState(false);

  const [bookingFormModal, setBookingFormModal] = useState(false);

  const dispatch = useDispatch();

  const { name } = useParams();

  useEffect(() => {
    setProfileDataLoading(true);
    setProfileDataError(false);
    axiAuth
      .get(`api/share/${name}`)
      .then(({ data }) => {
        console.log(data);
        setProfileData(data.data);
        setProducts(data.products);
        dispatch(setPortfolioData(data));
        setProfileDataLoading(false);
      })
      .catch((err) => {
        setProfileDataError("Error Loading Profile data");
        console.log(err);
        setProfileDataLoading(false);
      });
  }, [name, dispatch]);

  console.log(profileData);

  const WrapperStyle = {
    py: noPadding ? "0" : 4,
    background: noPadding ? "transparent" : "#F3F3F3",
  };

  const navigate = useNavigate();

  const bookNowClickHandler = () => {
    navigate("/product-booking");
  };

  const portfolio = profileData?.portfolio;
  const certificates = profileData?.certificates;
  const projects = profileData?.projects;

  const videoUrl = formatYoutubeVideoUrl(portfolio?.video_url);

  // consult from handler
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const consultFormSubmitHandler = async (data, event) => {
    console.log({ data, event });
    const consultData = {
      ...data,
      service_type: "n/a",
      message: "n/a",
      type: openPhonePanel ? "Phone Call" : "Site Visit",
      vendor_id: portfolio.user_id,
    };

    try {
      const { status, data } = await axiAuth.post(
        "api/booking-consultations",
        consultData
      );

      if (status === 200) {
        setOpenBooking(false);
        console.log(data);
        // event.target.reset();
        reset();
        toast.success("Consult is created successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [leadFormOpen, setLeadFormOpen] = useState(false);
  // const [leadFormShown, setLeadFormShown] = useState(false);

  // open a form after 5 seconds of page load
  useEffect(() => {
    let timer;
    const storageData = JSON.parse(localStorage.getItem("leadFormShown"));
    if (storageData) {
      timer = setTimeout(() => {
        setLeadFormOpen(true);
      }, 7200000);
      return;
    } else {
      localStorage.setItem("leadFormShown", true);
      timer = setTimeout(() => {
        setLeadFormOpen(true);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, []);

  if (profileDataError) {
    return (
      <ProfileErrorWrapper>
        <Typography variant="h5">{profileDataError}</Typography>
        <Typography variant="h6">Try again reloading the page!</Typography>
      </ProfileErrorWrapper>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile - Solruf</title>
        <meta
          name="description"
          content="This is a dummy portfolio page description"
        />
        <meta name="theme-color" content="#ffd05b" />
        <body class="light" />
      </Helmet>
      {!profileDataLoading ? (
        <Box sx={WrapperStyle}>
          <InnerWrapper sx={{ padding: { sm: "20px", xs: "0px" } }}>
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              sx={{ mb: 3, px: 1 }}
            >
              The vendor profile and all of their products are verified by
              SOLRUF*
            </Typography>

            <ProfileTop
              portfolio={portfolio}
              setShowPolicyDialog={setShowPolicyDialog}
              certificates={certificates}
              matches={matches}
              videoUrl={videoUrl}
              setAboutTextExpanded={setAboutTextExpanded}
              aboutTextExpanded={aboutTextExpanded}
              handleTextExpandClose={handleTextExpandClose}
              modalTopBackButtonStyle={modalTopBackButtonStyle}
              handleOpen={handleOpen}
              showTooltip2={showTooltip2}
              setShowTooltip2={setShowTooltip2}
              handleAfterSalePolicyModalOpen={handleAfterSalePolicyModalOpen}
            />

            {/* ======================== Book Consult Start ======================== */}

            <BookWrapper
              sx={{
                my: 4,
                mx: { xs: 2, sm: 0 },
                p: [1.5, 8],
                borderRadius: 4,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  bgcolor: "#000",
                  opacity: 0.6,
                  top: 0,
                  left: 0,
                  borderRadius: 4,
                }}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: ["column", "row"],
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "space-around" },
                  width: "100%",
                  height: `${openBooking ? "auto" : "100%"}`,
                }}
              >
                <Typography
                  //  variant='h6'
                  sx={{
                    fontWeight: 700,
                    mb: [2, 0],
                    color: "#fff",
                    zIndex: 1,
                    fontSize: ["1rem", "2rem"],
                  }}
                >
                  Kindly a book a consulting for Site Visit and other
                  requirement
                </Typography>
                <Box sx={{ zIndex: "100" }}>
                  <PrimaryButton
                    sx={{
                      display: { xs: "none", sm: "block" },
                      borderRadius: "36px",
                      backgroundColor: "#FFD05B",
                      padding: "0.8rem 1.8rem",
                      color: "black",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                    onClick={handleOpenBooking}
                  >
                    Book Consulting
                  </PrimaryButton>
                  <Box sx={{ display: { xs: "block", sm: "none" } }}>
                    <YellowButton
                      onClick={() => {
                        setBookingFormModal(!bookingFormModal);
                      }}
                      style={{
                        background: "#FFD05B",
                        borderRadius: "24px",
                        color: "black",
                      }}
                    >
                      Book Consulting
                    </YellowButton>
                  </Box>
                </Box>
              </Box>

              {openBooking && (
                <Box
                  className={classes.bookingFormBox}
                  data-aos="fade-down"
                  sx={{ p: ["1rem", "2rem"] }}
                >
                  <XIcon
                    className={classes.closeBtn}
                    onClick={handleOpenBooking}
                  />
                  <Grid
                    spacing={[0, 2, 2, 2]}
                    container
                    sx={{
                      mt: 2.5,
                      width: ["100%", "70%"],
                      mx: ["auto"],
                      flexWrap: "nowrap",
                      justifyContent: "center",
                    }}
                  >
                    <Grid item sm={6}>
                      <Box
                        className={classes.phonePanel}
                        sx={{ mb: 2 }}
                        onClick={() => setOpenPhonePanel(true)}
                      >
                        {<div className={`${classes.circle}`}></div>}
                        <Box>
                          <Typography
                            variant="h5"
                            fontWeight={600}
                            gutterBottom
                            sx={{ fontSize: ["1rem", "1.2rem"] }}
                          >
                            Phone Call
                          </Typography>
                          <Typography
                            fontWeight={500}
                            sx={{ fontSize: [10, 14] }}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipisicing.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sm={6}>
                      <Box
                        className={classes.addressPanel}
                        onClick={() => setOpenPhonePanel(false)}
                      >
                        {<div className={classes.circle2}></div>}
                        <Box>
                          <Typography
                            variant="h5"
                            fontWeight={600}
                            gutterBottom
                            sx={{ fontSize: ["1rem", "1.2rem"] }}
                          >
                            Site Visit
                          </Typography>
                          <Typography
                            fontWeight={500}
                            sx={{ fontSize: [10, 14] }}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipisicing.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box
                    component="form"
                    sx={{
                      width: ["100%", "80%"],
                      mx: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onSubmit={handleSubmit(consultFormSubmitHandler)}
                  >
                    <ConsultTextField
                      label="Name"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                      error={errors.name}
                      helperText={errors.name?.message}
                    />
                    <ConsultTextField
                      label="Phone Number"
                      type="number"
                      {...register("mobile", {
                        required: {
                          value: true,
                          message: "Phone Number is required",
                        },
                      })}
                      error={errors.mobile}
                      helperText={errors.mobile?.message}
                    />
                    <ConsultTextField
                      label="Email (Optional)"
                      {...register("email", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      error={errors.email}
                      helperText={errors.email?.message}
                    />

                    {!openPhonePanel && (
                      <ConsultTextField
                        label="Address"
                        {...register("address", {
                          required: {
                            value: !openPhonePanel,
                            message: "Address name is required",
                          },
                        })}
                        error={errors.address}
                        helperText={errors.name?.address}
                      />
                    )}

                    <PrimaryButton
                      // onClick={handleOpenBooking}
                      sx={{ marginTop: "2.5rem", px: 5, py: 1.5 }}
                      type="submit"
                    >
                      Submit
                    </PrimaryButton>
                  </Box>
                </Box>
              )}
            </BookWrapper>
            {/* ======================== Book Consult end ======================== */}

            {/* subsidy box */}

            {portfolio?.solar_subsidy && <SubsidyBox />}

            {/* ============ Projects Slider ============ */}
            <Box sx={{ mb: 5, mx: { sm: "auto", xs: 2 } }}>
              {projects.length > 0 && <ProjectsSlider projects={projects} />}
            </Box>

            <BookNow onClick={bookNowClickHandler} />

            {/*  book products section */}
            <BookProducts
              products={products}
              setProducts={setProducts}
              openPurchaseModal={openPurchaseModal}
              closePurchaseModal={closePurchaseModal}
              vendorSlug={portfolio.slug}
            />
          </InnerWrapper>

          {/* ============ modals ============ */}

          <Dialog
            // TransitionComponent={Transition}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalWrapper>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </ModalWrapper>
          </Dialog>

          {/* Modal for policy */}
          <CustomModal
            open={openAfterSalePolicyModal}
            modalText={portfolio.return_policy}
            handleClose={handleAfterSalePolicyModalClose}
          />

          {/* MOBILE MODAL FOR POLICY */}
          <Dialog
            // TransitionComponent={Transition}
            sx={{ top: "0" }}
            fullScreen
            open={showPolicyDialog}
            handleClose={() => setShowPolicyDialog(false)}
            hideBackdrop={true}
          >
            <PolicyDialog
              modalTopBackButtonStyle={modalTopBackButtonStyle}
              setShowPolicyDialog={setShowPolicyDialog}
              paraStyle={paraStyle}
              portfolio={portfolio}
            />
          </Dialog>
          {/* Modal for video */}
          <VideoModal
            open={open}
            handleClose={handleClose}
            videoLink={portfolio.video_url}
            // videoLink='https://www.youtube.com/watch?v=Cg-6WRhpWy8'
          />

          {/* COMPANY DETAIL MODAL */}
          <Dialog
            // TransitionComponent={Transition}
            sx={{ top: "0" }}
            fullScreen
            hideBackdrop={true}
            open={showBottomSheet}
            onClose={handleTextExpandClose}
          >
            <BottomSheetDialog
              setShowBottomSheet={setShowBottomSheet}
              showBottomSheet={showBottomSheet}
              tabValue={tabValue}
              handleChange={handleChange}
              setScrollIndex={setScrollIndex}
              companyRef={companyRef}
              portfolio={portfolio}
              showTooltip2={showTooltip2}
              setShowTooltip2={setShowTooltip2}
              aboutRef={aboutRef}
              videoUrl={videoUrl}
              certificatesRef={certificatesRef}
              descriptionRef={descriptionRef}
            />
          </Dialog>

          <Dialog
            // TransitionComponent={Transition}
            sx={{ top: "0" }}
            fullScreen
            hideBackdrop={true}
            open={bookingFormModal}
            onClose={() => setBookingFormModal(false)}
          >
            <BookingFormModal
              modalTopBackButtonStyle={modalTopBackButtonStyle}
              setBookingFormModal={setBookingFormModal}
              classes={classes}
              setOpenPhonePanel={setOpenPhonePanel}
              openPhonePanel={openPhonePanel}
              handleOpenBooking={handleOpenBooking}
            />
          </Dialog>

          {/* PURCHASE PRODUCT MODAL */}
          <Dialog
            // TransitionComponent={Transition}
            sx={{ top: "0" }}
            fullScreen
            hideBackdrop={true}
            onClose={closePurchaseModal}
            open={showPurchaseModal}
          >
            <Box>
              <Box sx={modalTopBackButtonStyle} onClick={closePurchaseModal}>
                <KeyboardBackspace />
                <Box>Back To Portfolio</Box>
              </Box>

              <PurchaseProductMobile
                product={productForPurchase}
                showDetailModal={showDetailModal}
              />
            </Box>
          </Dialog>

          {/* PURCHASE MODAL VIEW MORE */}
          <Dialog
            // TransitionComponent={Transition}
            sx={{ top: "0" }}
            fullScreen
            hideBackdrop={true}
            onClose={hideDetailModal}
            open={showProductDetail}
          >
            <DetailModal
              modalTopBackButtonStyle={modalTopBackButtonStyle}
              hideDetailModal={hideDetailModal}
              tabValue2={tabValue2}
              handleChange2={handleChange2}
              productForPurchase={productForPurchase}
            />
          </Dialog>
        </Box>
      ) : (
        <Loader />
      )}

      {!profileDataLoading && !profileDataError && (
        <LeadForm
          open={leadFormOpen}
          onClose={() => setLeadFormOpen(false)}
          data={profileData}
          portfolio={portfolio}
        />
      )}
    </>
  );
};

export default UserPortfolioProfile;
