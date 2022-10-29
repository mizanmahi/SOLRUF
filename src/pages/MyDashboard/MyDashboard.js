import { Chip, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { axiAuth } from "../../utils/axiosInstance";
import Loader from "../../components/Loader/Loader";
import CreatePortfolio from "../../components/CreatePortfolio/CreatePortfolio";
import { useDispatch } from "react-redux";
import { setCreatePortfolio } from "../../redux/slices/portfolio.slice";
import { useNavigate } from "react-router";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PrimaryButton from "../../components/Custom/PrimaryButton/PrimaryButton";
import RoundedDarkButton from "../../components/RoundedDarkButton/RoundedDarkButton";
import {
  BottomDetailedImage,
  Cards,
  Circle,
  DashboardCard,
  InstallerInfo,
  MeetingDetails,
  Portfolio,
  TopDetailedImageBox,
  UpcomingMeetings,
} from "./myDashboard.style";
import CopyText from "../../components/CopyText/CopyText";
// import CopyTextNew from '../../components/CopyText/CopyTextNew';
// import { useErrorHandler } from "react-error-boundary";

const MyDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);

  const [portfolioData, setPortfolioData] = useState({});
  const [profileDataLoading, setProfileDataLoading] = useState(true);

  // const handleError = useErrorHandler();

  useEffect(() => {
    setProfileDataLoading(true);
    axiAuth
      .get("api/vendor/profile")
      .then(({ data }) => {
        setPortfolioData(data.portfolio);
        setProfileDataLoading(false);
        console.log(data);

        console.log(data.portfolio.services);
      })
      .catch((err) => {
        console.log("Portfolio data error", err);
        setProfileDataLoading(false);
        // handleError(err);
      });
  }, []);

  useEffect(() => {
    axiAuth
      .get("api/vendor/projects?page=1")
      .then(({ data }) => {
        setProjects(data.projects);
      })
      .catch((err) => {
        console.log("Projects data error", err);
      });

    axiAuth("api/vendor/products")
      .then(({ data }) => {
        console.log(data);
        setProducts(data.products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(portfolioData);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const createPortfolioHandler = () => {
    console.log("create portfolio button clicked from dashboard");
    dispatch(setCreatePortfolio(true));

    // redirect to portfolio page
    navigate("/vendor/dashboard/portfolio");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ p: [0, 2], mt: [0, 0.5] }}
      disableGutters={true}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} xl={9}>
          {profileDataLoading ? (
            <Loader />
          ) : portfolioData.name ? (
            <Portfolio>
              <Box sx={{ flex: 5 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "#000000", fontWeight: 600 }}
                >
                  My Portfolio
                </Typography>
                <InstallerInfo>
                  <PersonIcon sx={{ fontSize: 30 }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "#000000", fontWeight: 600 }}
                  >
                    {portfolioData.name}
                  </Typography>
                </InstallerInfo>
                <Box sx={{ maxWidth: "80%", my: 2 }}>
                  {portfolioData?.services?.length < 4
                    ? portfolioData?.services?.map((service, i) => (
                        <Chip
                          key={i}
                          label={service}
                          sx={{
                            color: "#fff",
                            borderRadius: 1,
                            bgcolor: "blue",
                            fontWeight: 600,
                            fontSize: "1rem",
                            marginRight: ".3rem",
                            mb: ".5rem",
                          }}
                        />
                      ))
                    : portfolioData?.services?.slice(0, 3).map((service, i) => (
                        <Chip
                          key={i}
                          label={service}
                          sx={{
                            color: "#fff",
                            borderRadius: 1,
                            bgcolor: "blue",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            marginRight: ".5rem",
                            mb: ".5rem",
                          }}
                        />
                      ))}
                  {portfolioData?.services?.length > 3 ? (
                    <MoreHorizIcon
                      sx={{
                        fontSize: "40px",
                        display: "block",
                        color: "blue",
                      }}
                    />
                  ) : null}
                </Box>
                <TopDetailedImageBox>
                  <RoundedDarkButton
                    title="Check detailed portfolio"
                    onClick={() => navigate("portfolio")}
                  />
                </TopDetailedImageBox>
              </Box>
              {/*  === portfolio right */}
              <Box>
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      sm: "none",
                      marginTop: 10,
                      padding: "4px",
                    },
                  }}
                >
                  <CopyText title={`portfolio/${portfolioData?.slug}`} />
                </Box>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <CopyText title={`portfolio/${portfolioData?.slug}`} />
                </Box>

                <Cards
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", lg: "end" },
                  }}
                >
                  <DashboardCard sx={{ mr: 2.5 }}>
                    <Circle>
                      <Typography
                        variant="h4"
                        fontWeight={600}
                        sx={{ color: "#000000" }}
                      >
                        {projects?.length}
                      </Typography>
                    </Circle>
                    <Typography
                      textAlign="center"
                      fontWeight={600}
                      sx={{ mt: 2 }}
                    >
                      Projects Added
                    </Typography>
                  </DashboardCard>
                  <DashboardCard>
                    <Circle>
                      <Typography
                        variant="h4"
                        fontWeight={600}
                        sx={{ color: "#000000" }}
                      >
                        {products.length}
                      </Typography>
                    </Circle>
                    <Typography
                      textAlign="center"
                      fontWeight={600}
                      sx={{ mt: 2 }}
                    >
                      Products Added
                    </Typography>
                  </DashboardCard>
                </Cards>
              </Box>
              <BottomDetailedImage sx={{ marginTop: 4 }}>
                <RoundedDarkButton
                  title="Check detailed portfolio"
                  onClick={() => navigate("portfolio")}
                />
              </BottomDetailedImage>
            </Portfolio>
          ) : (
            <CreatePortfolio createPortfolioHandler={createPortfolioHandler} />
          )}
        </Grid>

        {/* =============== Meeting section =============== */}
        <Grid item xs={12} xl={3}>
          <UpcomingMeetings>
            <Typography
              sx={{
                color: "blue",
                fontWeight: 600,
                textAlign: "center",
              }}
              variant="h5"
            >
              Upcoming Meetings
            </Typography>
            <Typography variant="h6" textAlign="center" sx={{ my: 1 }}>
              10 Aug, 2022, 03:45 AM
            </Typography>
            <Box sx={{ mb: 1 }}>
              <MeetingDetails>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Name</Typography>
              </MeetingDetails>
              <Typography variant="body1" sx={{ ml: 4, color: "#000" }}>
                Aman Zain
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <MeetingDetails>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Appointment</Typography>
              </MeetingDetails>
              <Typography variant="body1" sx={{ ml: 4, color: "#000" }}>
                Aman Zain
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <MeetingDetails>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Reminder Type</Typography>
              </MeetingDetails>
              <Typography variant="body1" sx={{ ml: 4, color: "#000" }}>
                Aman Zain
              </Typography>
            </Box>

            <PrimaryButton sx={{ mx: "auto", px: 2, mb: 1 }}>
              See Other Meetings
            </PrimaryButton>
          </UpcomingMeetings>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyDashboard;
