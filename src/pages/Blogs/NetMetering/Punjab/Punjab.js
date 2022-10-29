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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
    marginBottom: "3rem",
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
  // justifyContent: 'center',
  backgroundColor: "white",
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

const Punjab = () => {
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
    //  window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <BlogIntroSection
        sx={{ mb: 9 }}
        title="NETMETERING POLICY:"
        subtitle="PUNJAB"
        icon={<LocationOnIcon sx={{ fontSize: "40px" }}></LocationOnIcon>}
      />

      <Container maxWidth="lg" sx={{ padding: { sm: "20px", xs: 0 } }}>
        <Para sx={{ padding: { xs: "20px", sm: 0 } }}>
          Solar adaptation has been on a steady rise in Punjab where the
          installed capacity increased from 9 MW in 2012 to 920 MW in August
          2019. Solar accounts for more than 6% of its total installed
          electricity generation capacity. The Punjab Government has launched a
          draft version of its renewable energy policy, which aims to meet 21%
          of its power requirement through renewable energy by the year 2030.
          The solar projects will include utility-scale, canal-top, rooftop,
          floating, and hybrid solar projects.
        </Para>

        <BlogTitledBox
          title="Parties eligible for net metering policy"
          sx={{ mr: { sm: 3, xs: 0 } }}
          variant="tertiary"
        >
          <ListingWithHand>
            <span>👉</span>
            This Policy shall apply to the distribution licensee and consumers
            of distribution licensee of the State of Punjab.
          </ListingWithHand>

          <ListingWithHand>
            <span>👉</span>
            The eligible consumer shall be within the permissible rated capacity
            as defined under this Policy.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            The eligible consumer shall be located in the consumer premises.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            The eligible consumer shall interconnect and operate safely in
            parallel with the distribution licensee network.
          </ListingWithHand>
        </BlogTitledBox>

        <BlogTitledBox
          title="Net-metering policy arrangement,"
          sx={{ mr: { sm: 3, xs: 0 } }}
          variant="tertiary"
        >
          <Para sx={{ mb: 3 }}>
            All the consumers of the State Distribution licensee or PSPCL who
            intend to encourage solar energy and set up solar PV plants at
            available places on roof-tops of Individual households, industries,
            Government or Semi-Government or Local Body offices, commercial
            establishments, institutions, residential complexes shall be
            eligible with project capacity ranging from minimum 1 KWp upto 1MWp
            (AC side) with or without battery back-up support. In addition, the
            state is providing slew of incentives for setting-up of NRSE
            projects such as:
          </Para>
          <ListingWithHand>
            <span>👉</span>
            100% exemption from payment of fee and stamp duty for
            registration/lease deed charges for the land required for the
            project.
          </ListingWithHand>

          <ListingWithHand>
            <span>👉</span>
            100% Electricity Duty exemption for power consumed from state
            licensee during construction and testing of the project.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            100% Electricity Duty exemption for power consumed from state
            licensee during construction and testing of the project.
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
                  <Typography>
                    Go to PEDA (Punjab Energy Development Agency) website:
                  </Typography>
                  <Button
                    endIcon={<OpenInNewIcon />}
                    component="a"
                    target="_blank"
                    href="https://www.peda.gov.in/"
                    sx={{ mt: 2, color: "blue" }}
                  >
                    Click Here
                  </Button>
                </li>
                <li>
                  <Typography>
                    Go to the “Net Meter” section and fill up the application
                    form.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Login on{" "}
                    <a href="http://www.netmeteringpunjab.com/">
                      www.netmeteringpunjab.com
                    </a>{" "}
                    and submit the latest electricity bill, Aadhar card,
                    Application no.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Check the application updates from time to time
                  </Typography>
                </li>
              </Ol>
            </ApprovalBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <DocumentBox sx={{ padding: { sm: 0, xs: "20px" } }}>
              <UtilityList>
                <DoneIcon />
                <Typography>Photograph of the applicant/applicants.</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>
                  Copy of Scheduled Caste Certificate (Only for SC Farmers)
                </Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Copy of Adhar Card</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>
                  4 ) Certificate of Patwari for required land at a place in the
                  village or affidavit / self attested certificate of famer to
                  this effect.
                </Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>
                  PSPCL Certificate for no power connection (agriculture motor)
                  for irrigation or affidavit / self attested certificate of
                  famer to this effect.
                </Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>
                  Certificate for Micro Irrigation system in the land or
                  affidavit / self attested certificate of farmer (only for
                  Micro irrigation farmers for preference in allocation of solar
                  pumps )
                </Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>
                  Photograph of the pond / water tank site.
                </Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>
                  Upload customer copy of challan if payment deposited through
                  RTGS / NEFT
                </Typography>
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
            Punjab State Power Corporation Limited (PSPCL) would provide Central
            Finance Assistance (CFA)/ Subsidy for Grid Connected Rooftop Solar
            Plants under Net Metering, approximately a capacity of 1 to 10 kW as
            per MNRE, Government of India. CFA will be provided if funds are
            available from MNRE, Government of India. In domestic sectors, the
            Government of India will provide a maximum of 40% of subsidy on the
            installation of rooftop solar power plants. If the residential
            sector receives,
          </Para>
          <ListingWithHand>
            <span>👉</span>A maximum of up to 3kW capacity, the CFA allotted is
            40%
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>A capacity ranging from 3kW to 10kW would receive a
            CFA of 40% up to 3kW
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            Capacity above 3kW, will receive an additional 20% CFA
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            If the capacity exceeds 10kW no CFA is allotted
          </ListingWithHand>
        </BlogTitledBox>

        {isResidential && (
          <>
            {" "}
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
                        Voltage level:230V (Single phase) : 7 kWp max.
                      </Typography>
                    </li>

                    <li>
                      <Typography>415V (Three phase): 100 kWp max.</Typography>
                    </li>
                    <li>
                      <Typography>=11kV : 1 MWp max</Typography>
                    </li>
                    <li>
                      <Typography>
                        Conditions:=80% of your Sanctioned Load
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Cumulative capacity of all solar systems installed in
                        your area shall not exceed 30% of Local Distribution
                        transformer capacity in your area
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
                        Third party ownership (RESCO model)
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
                      <Typography>Annual (Oct to Sep)</Typography>
                    </li>
                    <li>
                      <Typography>
                        The settlement of net energy including any banked energy
                        shall be done at the end of each settlement period based
                        on 90% of the consumption. At the beginning of each
                        settlement period, cumulative carried over injected
                        energy shall be reset to zero.
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
                        Exemption from wheeling charges and cross subsidy
                        surcharge
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Electricity generated by the rooftop solar system shall
                        not be more than 90% of the electricity consumption at
                        the end of the settlement period.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Exemption from open excess charges
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        The applicant shall pay application fee of Rs. 50/KVA
                        alongwith the application to PSPCL. No parallel
                        operation charges shall be leviable on these projects
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>
            </ToggleBox>
          </>
        )}

        {isCommercial && (
          <>
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
                        Voltage level:230V (Single phase) : 7 kWp max.
                      </Typography>
                    </li>

                    <li>
                      <Typography>415V (Three phase): 100 kWp max.</Typography>
                    </li>
                    <li>
                      <Typography>=11kV : 1 MWp max</Typography>
                    </li>
                    <li>
                      <Typography>
                        Conditions:=80% of your Sanctioned Load
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Cumulative capacity of all solar systems installed in
                        your area shall not exceed 30% of Local Distribution
                        transformer capacity in your area
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
                        Third party ownership (RESCO model)
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
                      <Typography>Annual (Oct to Sep)</Typography>
                    </li>
                    <li>
                      <Typography>
                        The settlement of net energy including any banked energy
                        shall be done at the end of each settlement period based
                        on 90% of the consumption. At the beginning of each
                        settlement period, cumulative carried over injected
                        energy shall be reset to zero.
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
                        Exemption from wheeling charges and cross subsidy
                        surcharge
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Electricity generated by the rooftop solar system shall
                        not be more than 90% of the electricity consumption at
                        the end of the settlement period.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Exemption from open excess charges
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        The applicant shall pay application fee of Rs. 50/KVA
                        alongwith the application to PSPCL. No parallel
                        operation charges shall be leviable on these projects
                      </Typography>
                    </li>
                  </ul>
                </GrayBox>
              </Box>
            </ToggleBox>
          </>
        )}
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

export default Punjab;
