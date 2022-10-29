import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogIntroSection from "../../../../components/BlogIntroSection/BlogIntroSection";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BlogTitledBox from "../../../../components/BlogTitledBox/BlogTitledBox";
import DoneIcon from "@mui/icons-material/Done";
import YellowButton from "../../../../components/YellowButton/YellowButton";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const Wrapper = styled(Box)(({ theme }) => ({
  paddingBottom: "2rem",
  background: "#F3F3F3",
}));

const Para = styled(Typography)(({ theme }) => ({
  color: "#000000",
}));

const ListingWithHand = styled(Typography)(({ theme }) => ({
  color: "#000000",
  display: "flex",
  alignItems: "top",
  marginBottom: "2rem",
  "&:last-child": {
    marginBottom: 0,
  },
  "& span": {
    marginRight: "1rem",
  },
}));

const ApprovalBox = styled(Box)(({ theme }) => ({
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  overflow: "hidden",
  height: "100%",
  backgroundColor: "white",
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
  },
}));

const DocumentBox = styled(Box)(({ theme }) => ({
  // boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
}));

const Ol = styled("ol")(({ theme }) => ({
  margin: "2rem 0",
  paddingRight: "1rem",
  "& li": {
    color: "#000000",
    marginBottom: "2rem",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  "& li p": {
    color: "#000000",
    fontWeight: 400,
  },
}));

const Flex = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    "& p": {
      marginBottom: "1rem",
    },
  },
}));

const UtilityList = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  padding: "1rem",
  display: "flex",
  backgroundColor: "white",
  // justifyContent: 'center',
  marginBottom: "1rem",
  alignItems: "center",
  "&:last-child": {
    marginBottom: 0,
  },
  "& p": {
    color: "#000000",
    fontWeight: 400,
    fontSize: "1.2rem",
  },
  "& svg": {
    marginRight: "1rem",
    color: "green",
    fontSize: "2rem",
  },
}));


const ToggleBox = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  border: "5px solid #ffd05b",
  padding: "2rem 2rem",
  margin: "6rem auto",
  position: "relative",
  background: "#fff",
  [theme.breakpoints.down("sm")]: {
    padding: "2rem 1rem",
  },
}));
const ToggleButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  position: "absolute",
  left: "50%",
  top: 0,
  transform: "translate(-50%, -100%)",
  "& button": {
    boxShadow: "none !important",
    fontSize: "1.5rem",
    color: "#000000 !important",
    fontWeight: "600 !important",
    padding: "1rem 1.2rem !important",
    "@media (max-width: 600px)": {
      fontSize: "1.2rem",
      padding: ".5rem .5rem !important",
      maxWidth: "100%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
}));

const GrayBox = styled(Box)(({ theme }) => ({
  background: "#f3f3f3",
  padding: "1rem",
  borderRadius: "10px",
  "& li": {
    marginBottom: "1rem",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  "& p": {
    color: "#000000",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  background: "#000000",
  color: "#ffffff",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  padding: ".4rem .5rem",

  "&:hover": {
    background: "#000000",
  },
}));

const Gujrat = () => {
  const [isResidential, setIsResidential] = useState(true);
  const [isCommercial, setIsCommercial] = useState(false);

  const handleResidential = () => {
    setIsResidential(true);
    setIsCommercial(false);
  };

  const handleCommercial = () => {
    setIsResidential(false);
    setIsCommercial(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <BlogIntroSection
        sx={{ mb: 9 }}
        title="NETMETERING POLICY:"
        subtitle="GUJRAT"
        icon={<LocationOnIcon sx={{ fontSize: "40px" }}></LocationOnIcon>}
      />

      <Container maxWidth="lg" sx={{ padding: { sm: "20px", xs: 0 } }}>
        <Para sx={{ padding: { xs: "20px", sm: 0 } }}>
          Gujarat is the sixth largest state in India with an area of 196,024
          Km2. As of December 2020, Gujarat has an installed solar capacity of
          3273 Mw with a solar policy aiming towards increasing total solar
          capacity from 10 per cent to 17 percent of renewable energy generation
          by 2022. Gujarat ranks fifth in solar generation capacity by states in
          India. It is one of the fastest growing states when it comes to solar
          deployment- both in rooftop and large-scale solar projects.
        </Para>

        <BlogTitledBox
          title="Parties eligible for net metering policy"
          sx={{ mr: { sm: 3, xs: 0 } }}
          variant="tertiary"
        >
          <ListingWithHand>
            <span>👉</span>
            Consumer of the local distribution licensee.
          </ListingWithHand>

          <ListingWithHand>
            <span>👉</span>
            Owner or in legal possession of the premises including the rooftop
            or terrace or building or infrastructure or open areas of the land
            or part or combination thereof on which the Solar PV System is
            proposed to be installed.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            Connect the proposed Rooftop Solar PV System to the Distribution
            System of the Licensee.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            Consume all of the electricity generated from the Rooftop Solar PV
            System at the same premises.
          </ListingWithHand>
        </BlogTitledBox>

        <BlogTitledBox
          title="Net-metering policy arrangement,"
          sx={{ mr: { sm: 3, xs: 0 } }}
          variant="tertiary"
        >
          <ListingWithHand>
            <span>👉</span>
            It will be necessary for the project developer to submit application
            for grid connectivity recommendation in the prescribed format to
            MEDA. The application should include, along with other details,
            details about the project capacity, project site location, details
            of nearest MSEDCL/MSETCL sub-station etc..
          </ListingWithHand>

          <ListingWithHand>
            <span>👉</span>
            There will be a preliminary scrutiny of the application by MEDA
            office, subsequent to which the developer and MSETCL/MSEDCL will be
            informed for the purpose of technical feasibility report.
            MSETCL/MSEDCL shall prepare the technical feasibility report and
            furnish its copy to MEDA.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            On receipt of the technical feasibility report, MEDA will verify its
            conformity with the solar power generation area, and make
            recommendation to MSETCL/MSEDCL for grid connectivity.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            The application for grid connectivity by the project developer will
            be scrutinised by the Committee for grid connectivity constituted by
            MSETCL in which thorough consultation will be done.
          </ListingWithHand>
        </BlogTitledBox>

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", my: 6, textAlign: "center" }}
        >
          List of Documents Required
        </Typography>

        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <ApprovalBox>
              <Typography
                sx={{
                  background: "#D0D7D9",
                  py: 2,
                  px: 1,
                  textAlign: "center",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                Application for Net-Metering approval
              </Typography>

              <Ol type="1">
                <li>
                  <Typography>Apply for registration at GEDA</Typography>
                </li>
                <li>
                  <Typography>
                    Submit the Application for Distribution Licensee through
                    Net-metering.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    GEDA will provide with a connectivity agreement and issue a
                    letter for completion of project work within 6 months.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Apply for installation of net-meter with GEDA after
                    completion of project work.
                  </Typography>
                  <Typography>
                    GEDA shall visit the project site and commission the
                    Net-Meter after consultation.
                  </Typography>
                </li>
              </Ol>
            </ApprovalBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <DocumentBox sx={{ padding: { sm: 0, xs: "20px" } }}>
              <UtilityList>
                <DoneIcon />
                <Typography>Copy of Latest Electricity Bill</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>
                  Copy of Latest Municipality Tax or Index-2
                </Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Copy Of Adhar Card</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Copy Of Pan Card</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Passport Size Photo-3 Copy</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Contact Number</Typography>
              </UtilityList>
            </DocumentBox>
          </Grid>
        </Grid>

        <BlogTitledBox
          title="SOLAR SUBSIDY"
          sx={{ mr: { sm: 3, xs: 0 } }}
          variant="tertiary"
        >
          <Para sx={{ mb: 3 }}>
            Under the Grid-connected Rooftop Solar Scheme (Phase-II), Ministry
            is providing 40% subsidy for the first 3 kW and 20% subsidy beyond 3
            kW and upto 10 kW. The scheme is being implemented in Gujarat by
            GEDA.
          </Para>
        </BlogTitledBox>

        <ToggleBox>
          <ToggleButtons>
            <YellowButton
              style={{
                background: isResidential ? "#ffd05b" : "#D0D7D9",
              }}
              onClick={handleResidential}
            >
              Residential
            </YellowButton>
            <YellowButton
              style={{
                background: isCommercial ? "#ffd05b" : "#D0D7D9",
              }}
              onClick={handleCommercial}
            >
              Commercial
            </YellowButton>
          </ToggleButtons>

          {isResidential && (
            <>
              <Box sx={{ mt: 0 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { sm: "2rem", xs: "1.2rem" },
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  CAPACITY OF SOLAR SYSTEM
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>Size:Min 1 kWp</Typography>
                    </li>
                    <li>
                      <Typography>Max 1 MWp</Typography>
                    </li>
                    <li>
                      <Typography>
                        Voltage level:Upto 6 kW, 230V- single phase
                      </Typography>
                    </li>
                    <li>
                      <Typography>80 kWp in Other Areas</Typography>
                    </li>
                    <li>
                      <Typography>
                        Above 6 kW and upto 100 kW, 415 V-Three phase
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Above 100 kW, 11 kV-Three phase (HT)
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Conditions:Cumulative capacity of all solar systems
                        installed in your area shall not exceed 30% of
                        distribution transformer capacity in your area
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { sm: "2rem", xs: "1.2rem" },
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  OWNERSHIP OPTIONS
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>Self ownership (CAPEX model)</Typography>
                    </li>
                    <li>
                      <Typography>
                        Third Party Sale (Through lease / Power Sale Agreement)
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { sm: "2rem", xs: "1.2rem" },
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  BILLING MECHANISHM
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>Annual (April to March)</Typography>
                    </li>
                    <li>
                      <Typography>
                        Any unadjusted electricity credits shall be paid as per
                        the rates notified by GERC.
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { sm: "2rem", xs: "1.2rem" },
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  OTHERS
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>
                        Exempted from Transmission Charge, Transmission Loss,
                        Wheeling Charge, Wheeling Loss, Banking Charges.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Cross Subsidy and additional charges not applicable for
                        self consumption, but it is applicable for third party
                        sale.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Electricity Duty is applicable as per the provision of
                        Gujarat Electricity Act,1958.
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>
            </>
          )}

          {isCommercial && (
            <>
              <Box sx={{ mt: 0 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { sm: "2rem", xs: "1.2rem" },
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  CAPACITY OF SOLAR SYSTEM
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>Size:Min 1 kWp</Typography>
                    </li>
                    <li>
                      <Typography>Max 1 MWp</Typography>
                    </li>
                    <li>
                      <Typography>
                        Voltage level:Upto 6 kW, 230V- single phase
                      </Typography>
                    </li>
                    <li>
                      <Typography>80 kWp in Other Areas</Typography>
                    </li>
                    <li>
                      <Typography>
                        Above 6 kW and upto 100 kW, 415 V-Three phase
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Above 100 kW, 11 kV-Three phase (HT)
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Conditions:Cumulative capacity of all solar systems
                        installed in your area shall not exceed 30% of
                        distribution transformer capacity in your area
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { sm: "2rem", xs: "1.2rem" },
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  OWNERSHIP OPTIONS
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>Self ownership (CAPEX model)</Typography>
                    </li>
                    <li>
                      <Typography>Group Captive</Typography>
                    </li>
                    <li>
                      <Typography>
                        Third Party Sale (Through lease / Power Sale Agreement)
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { sm: "2rem", xs: "1.2rem" },
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  BILLING MECHANISM
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>Annual (April to March)</Typography>
                    </li>
                    <li>
                      <Typography>
                        Any unadjusted electricity credits shall be paid as per
                        the rates notified by GERC.
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { sm: "2rem", xs: "1.2rem" },
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  OTHERS
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>
                        Banking Charges- Rs.1.10 per unit of energy consumed for
                        MSME and other than demand based consumers. Rs. 1.50 per
                        unit of energy consumed for demand based consumers.
                        Exempted for Government Buildings.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Transmission and wheeling charges if applicable
                        depending on plant and point of consumption decided by
                        GERC.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Cross Subsidy and Additional charges are applicable as
                        decided by GERC from time to time.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Electricity Duty is applicable as per the provision of
                        Gujarat Electricity Act,1958.
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>
            </>
          )}
        </ToggleBox>
        {/* ========= toggle box end ========= */}

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", my: 6, textAlign: "center" }}
        >
          PDF Downloads
        </Typography>

        <Box sx={{ padding: { xs: "20px", sm: 0 } }}>
          <Flex sx={{ justifyContent: "space-between", mb: 4 }}>
            <Typography
              sx={{ color: "#000000", fontSize: { sm: "1.2rem", xs: "1rem" } }}
            >
              Maharashtra Net-Metering regulation 2019
            </Typography>
            <DownloadButton
              endIcon={<DownloadForOfflineIcon />}
              variant="contained"
            >
              Document Name
            </DownloadButton>
          </Flex>
          <Flex sx={{ justifyContent: "space-between", mb: 4 }}>
            <Typography
              sx={{ color: "#000000", fontSize: { sm: "1.2rem", xs: "1rem" } }}
            >
              PM-KUSUM Government Resolution 2021
            </Typography>
            <DownloadButton
              endIcon={<DownloadForOfflineIcon />}
              variant="contained"
            >
              Document Name
            </DownloadButton>
          </Flex>
          <Flex sx={{ justifyContent: "space-between", mb: 4 }}>
            <Typography
              sx={{ color: "#000000", fontSize: { sm: "1.2rem", xs: "1rem" } }}
            >
              Methodology for Grid Connected Solar Projects
            </Typography>
            <DownloadButton
              endIcon={<DownloadForOfflineIcon />}
              variant="contained"
            >
              Document Name
            </DownloadButton>
          </Flex>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default Gujrat;
