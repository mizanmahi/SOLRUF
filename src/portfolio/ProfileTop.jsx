import {
  HomeIcon,
  MailIcon,
  PhoneMissedCallIcon,
} from "@heroicons/react/outline";
import { Box, Chip, Dialog, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import CollapsableText from "../components/CollapsableText/CollapsableText";
import CopyText from "../components/CopyText/CopyText";
import { DownloadChip } from "../components/CustomerDetailsDrawer/customerDetailsDrawer.style";
import DashboardUpperTabs from "../components/DashboardComponents/dashboardUpperTabs";
import RoundedDarkButton from "../components/RoundedDarkButton/RoundedDarkButton";
import AboutTextExpanded from "./AboutTextExpanded";
import {
  BrainIcon,
  ContactWrapper,
  DescWrapper,
  LocationMarkIcon,
  ProfilePhoto,
  ProfileTopBox,
  ServicesWrapper,
  StarsWrapper,
} from "./userPortfolioProfile.style";
import StarIcon from "../assets/star.svg";
import mailIcon from "../assets/mailIcon.svg";
import phoneIcon from "../assets/phoneIcon.svg";
import locationIcon from "../assets/locationIcon.svg";

const ProfileTop = ({
  portfolio,
  setShowPolicyDialog,
  certificates,
  matches,
  videoUrl,
  setAboutTextExpanded,
  aboutTextExpanded,
  handleTextExpandClose,
  modalTopBackButtonStyle,
  handleOpen,
  showTooltip2,
  setShowTooltip2,
  handleAfterSalePolicyModalOpen,
}) => {
  return (
    <ProfileTopBox sx={{ borderRadius: { xs: 0, sm: 4 }, padding: [0, 3.9] }}>
      <Box sx={{ mb: 2, px: 1 }}>
        <CopyText title={`portfolio/${portfolio.slug}`} />
      </Box>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "start", sm: "center" },
              position: "relative",
            }}
          >
            <div>
              {portfolio.logo ? (
                <ProfilePhoto>
                  <img src={portfolio.logo} alt="" />
                </ProfilePhoto>
              ) : (
                <BrainIcon
                  alt="Remy Sharp"
                  src="https://i.ibb.co/0sLRgyb/logic-1.png"
                  sx={{
                    "&.MuiAvatar-root": {
                      bgColor: "#D0D7D9",
                      p: 1.3,
                    },
                  }}
                />
              )}
            </div>

            <Box sx={{ flexGrow: 1, ml: 3.5, mt: 0.2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {portfolio.name}
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  display: { xs: "block", sm: "none" },
                }}
              >
                <StarsWrapper>
                  {[...Array(5)].map((el) => (
                    <img src={StarIcon} alt="star icon" />
                  ))}

                  <Typography sx={{ ml: 0.5 }}>(100)</Typography>
                </StarsWrapper>

                <ContactWrapper sx={{ mt: 2 }}>
                  <a
                    href={`tel:${portfolio.mobile}`}
                    className="portFolioSmallIcons"
                  >
                    <img
                      style={{ width: "25px" }}
                      src={phoneIcon}
                      alt="phone icon"
                    />
                  </a>
                  <a
                    href="mailto:sumo@solruf.com"
                    className="portFolioSmallIcons"
                  >
                    <img
                      style={{ width: "25px" }}
                      src={mailIcon}
                      alt="mail icon"
                    />
                  </a>
                  <a
                    href={`https://www.google.com/maps/place/${portfolio.city}`}
                    target="_blank"
                    rel="noreferrer"
                    className="portFolioSmallIcons"
                  >
                    <img
                      style={{ width: "22px" }}
                      src={locationIcon}
                      alt="location icon"
                    />
                  </a>
                </ContactWrapper>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={{ alignSelf: "center" }}>
          <ServicesWrapper
            sx={{
              justifyContent: ["flex-start", "flex-start", "flex-end"],
              mb: [2, 0, 0],
            }}
          >
            {portfolio.services?.map((service, i) => (
              <Chip
                key={i}
                label={service}
                sx={{
                  ml: 1,
                  color: "#0173BB",
                  borderRadius: 4,
                  bgcolor: "#C9E7F7",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  mb: 1,
                  
                }}
              />
            ))}
          </ServicesWrapper>
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "flex-end",
          }}
          xs={12}
        >
          <RoundedDarkButton
            style={{ fontSize: "0.8rem" }}
            title={"After Sales & Service Policy"}
            onClick={() => setShowPolicyDialog(true)}
          />
        </Grid>
      </Grid>

      <DescWrapper
        sx={{
          display: ["none", "none", "block"],
          p: 3,
          my: 3.5,
          borderRadius: 3.9,
        }}
      >
        <CollapsableText text={portfolio.description} collapseAt={250} />
      </DescWrapper>

      <Grid container>
        <Grid item sm={12} md={7} sx={{ width: "100%" }}>
          <Box
            sx={{
              display: ["flex", "block"],
              flexDirection: ["column"],
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "top",
                  mb: 2,
                }}
              >
                <LocationMarkIcon />
                <Typography variant="h6" fontSize="1.1rem">
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    Location: -
                  </span>
                  {portfolio.location}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "top",
                  mb: 2,
                }}
              >
                <HomeIcon
                  style={{
                    height: "1.7rem",
                    marginRight: ".5rem",
                  }}
                />
                <Typography variant="h6" fontSize="1.1rem">
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    City / District: -{" "}
                  </span>
                  {portfolio.city}, {portfolio.state}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "top",
                  mb: 2,
                }}
              >
                <PhoneMissedCallIcon
                  style={{
                    height: "1.7rem",
                    marginRight: ".5rem",
                  }}
                />
                <Typography variant="h6" fontSize="1.1rem">
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    Mobile Number: -{" "}
                  </span>
                  <a
                    href={`tel:${portfolio.mobile}`}
                    style={{ textDecoration: "none" }}
                  >
                    {portfolio.mobile}
                  </a>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "top",
                  mb: 2,
                }}
              >
                <MailIcon
                  style={{
                    height: "1.7rem",
                    marginRight: ".5rem",
                  }}
                />
                <Typography variant="h6" fontSize="1.1rem">
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    Email: - {""}
                  </span>
                  <a
                    href={`mailto:${portfolio.email}`}
                    style={{ textDecoration: "none" }}
                  >
                    {portfolio.email}
                  </a>
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3.9,
                width: "100%",
                display: ["none", "block"],
              }}
            >
              {certificates?.length > 0 && (
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Certification
                </Typography>
              )}

              {certificates?.map(
                ({ name, file }, i) =>
                  i < 4 && (
                    <DownloadChip
                      component="a"
                      href={file}
                      target="_blank"
                      variant="contained"
                      label={name}
                      sx={{
                        mb: 1,
                      }}
                    />
                  )
              )}
            </Box>

            {matches && (
              <DashboardUpperTabs
                portfolioData={{
                  ...portfolio,
                  certificates,
                }}
                videoUrl={videoUrl}
                setAboutTextExpanded={setAboutTextExpanded}
                aboutTextExpanded={aboutTextExpanded}
              />
            )}
          </Box>
        </Grid>

        {/*  detailed modal  */}

        <Dialog
          hideBackdrop={true}
          sx={{ top: "0" }}
          fullScreen
          open={aboutTextExpanded}
          onClose={handleTextExpandClose}
        >
          <AboutTextExpanded
            modalTopBackButtonStyle={modalTopBackButtonStyle}
            setAboutTextExpanded={setAboutTextExpanded}
            videoUrl={videoUrl}
            portfolio={portfolio}
            certificates={certificates}
          />
        </Dialog>

        <Grid item sm={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              mt: 0,
            }}
          >
            <Box sx={{ display: ["none", "block"] }}>
              <Box
                onClick={handleOpen}
                sx={{
                  bgcolor: "",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <iframe
                  style={{ borderRadius: "1rem" }}
                  width="280"
                  height="170"
                  src={videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bgcolor: "",
                    width: "100%",
                    height: "100%",
                    opacity: 0.3,
                  }}
                ></Box>
              </Box>
              <Box sx={{ display: ["none", "block"] }}>
                <Typography
                  sx={{ mb: 2, mt: 4 }}
                  variant="h6"
                  fontSize="1.1rem"
                >
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    Turnover: -
                  </span>

                  {` ${portfolio.turnover} ${portfolio.turnover_type} / Year`}
                </Typography>
                <Typography sx={{ mb: 2 }} variant="h6" fontSize="1.1rem">
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    Total Projects: -
                  </span>
                  300/400
                </Typography>
                <Typography sx={{ mb: 2 }} variant="h6" fontSize="1.1rem">
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.2rem",
                    }}
                  >
                    GST No: -
                  </span>
                  {portfolio.gst}
                  <Tooltip
                    open={showTooltip2}
                    onOpen={() => setShowTooltip2(true)}
                    onClose={() => setShowTooltip2(false)}
                    title={
                      <div
                        style={{
                          color: "lightblue",
                          fontSize: "10px",
                        }}
                      >
                        GST Verified
                      </div>
                    }
                    placement="top"
                    arrow
                  >
                    <img
                      onClick={() => setShowTooltip2(!showTooltip2)}
                      style={{
                        marginLeft: "1rem",
                      }}
                      src="https://i.ibb.co/pWNNjTt/vecteezy-profile-verification-check-marks-icons-vector-illustration-1-3.png"
                      alt=""
                    />
                  </Tooltip>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          sx={{
            display: { sm: "flex", xs: "none" },
            justifyContent: "flex-end",
          }}
          xs={12}
        >
          <RoundedDarkButton
            title="After Sales & Service Policy"
            onClick={handleAfterSalePolicyModalOpen}
            style={{ marginTop: "1rem" }}
          />
        </Grid>
      </Grid>
    </ProfileTopBox>
  );
};

export default ProfileTop;
