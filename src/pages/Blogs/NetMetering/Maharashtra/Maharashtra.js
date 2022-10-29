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
  backgroundColor: "white",
  // justifyContent: 'center',
  marginBottom: "1rem",
  alignItems: "center",
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

const UtilityListWithDetails = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  padding: "1rem",
  "& p": {
    color: "#000000",
    fontWeight: 400,
    fontSize: "1rem",
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

const Maharashtra = () => {
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
        subtitle="MAHARASHTRA"
        icon={<LocationOnIcon sx={{ fontSize: "40px" }}></LocationOnIcon>}
      />

      <Container maxWidth="lg" sx={{ padding: { sm: "20px", xs: 0 } }}>
        <Para sx={{ padding: { xs: "20px", sm: 0 } }}>
          Maharashtra is located in the western part of India with the third
          largest state area in Maharashtra. The installed solar capacity of
          Maharashtra is 40.9 GW commissioned solar energy in 2021. Maharashtra
          approved its solar energy policy in January 2016, encouraging both
          public and private entities to go solar. In addition to this, the
          Civic Development authorities were asked to ensure that construction
          permission is only given to those buildings, government colonies, etc
          who pledge to install solar at rooftop. The Maharashtra State Cabinet
          has issued its ‘Unconventional Energy Generation Policy’ to promote
          non-conventional source-based energy generation. These include
          implementation of 100,000 agricultural solar pumps, 52,000 kV of
          rooftop solar systems, 2,000 solar water supply stations, the
          electrification of 10,000 rural homes, microgrid projects for 20
          homes, 55,000 square feet of solar water/solar cooking systems, and
          800 solar cold-storage projects.
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
          <Para sx={{ mb: 3 }}>
            As much as 100% subsidy has been offered to government and
            semi-government offices and 15% to the private offices to setup
            rooftop solar. For solar power projects, the minimum capacity shall
            be 1 MW ( outside solar park). The approval for grid connectivity
            will be given in accordance with the following guidelines -
          </Para>
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
                  <Typography>
                    Visit the Maharashtra State Electricity Distribution Company
                    Limited (Mahadiscom) website:
                  </Typography>
                </li>
                <li>
                  <Typography>
                    After entering into the Consumer Access Portal, Under the
                    “Quick Access” tab, and apply for RE Rooftop link.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Fill up the application form. Cost of Net Meter, Generation
                    meter (Source wise) and all costs related to the setting up
                    PV system shall be borne by consumer.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    When we apply Net-Meter for grid connected solar system it
                    will take approx. 30 days to 90 days depending on power
                    distribution companies. Application will be automatically
                    canceled if the PV system is not commissioned within 6
                    months from the date of Sanction of application.
                  </Typography>
                  <Typography>
                    Application processing fees for a low Tension consumer is
                    Rs. 500 for consumer having Sanctioned Load upto 20 kW and
                    Rs 100 thereafter for every 20 kW or part thereof. The same
                    for a high tension consumer is Rs. 5000/-
                  </Typography>
                </li>
              </Ol>
            </ApprovalBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <DocumentBox sx={{ padding: { sm: 0, xs: "20px" } }}>
              <UtilityList>
                <DoneIcon />
                <Typography>Aadhar Card</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Latest Electricity Bill</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Photo</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Pan Card</Typography>
              </UtilityList>
              <UtilityListWithDetails>
                <Flex>
                  <DoneIcon />
                  <Typography>Net Meter Application Form</Typography>
                </Flex>
                <Box>
                  <Ol type="A">
                    <li>
                      <Typography sx={{ fontSize: "1rem" }}>
                        If Renewable energy (RE) Generating system is self owned
                      </Typography>

                      <Ol type="1">
                        <li>
                          <Typography>
                            Technical details of Renewable Energy Generating
                            Station, Inverter and other equipment of the System
                            proposed to be installed. (Mandatory)
                          </Typography>
                        </li>
                        <li>
                          <Typography>
                            General Power of Attorney in favour of signatory in
                            case of Partnership Firms; certified true copy of
                            the Resolution, authorizing the signatory to deal
                            with the concerned Distribution Licensee, passed by
                            the Board of Directors in case of Companies (as
                            applicable).
                          </Typography>
                        </li>
                      </Ol>
                    </li>
                    <li>
                      <Typography sx={{ fontSize: "1rem" }}>
                        If RE Generating system is not self owned: In addition
                        to above in (a), Third Party Leasing Agreement.
                        (Mandatory)
                      </Typography>
                    </li>
                    <li>
                      <Typography sx={{ fontSize: "1rem" }}>
                        If RE System Capacity is 200 KW and above: In addition
                        to above in (a), Electrical Inspector Permission
                        (Mandatory)
                      </Typography>
                    </li>
                  </Ol>
                </Box>

                <Typography>
                  When we apply Net-Meter for grid connected solar system it
                  will take approx. 30 days to 90 days depending on power
                  distribution companies.
                </Typography>
              </UtilityListWithDetails>
            </DocumentBox>
          </Grid>
        </Grid>

        <BlogTitledBox
          title="SOLAR SUBSIDY,"
          sx={{ mr: { sm: 3, xs: 0 } }}
          variant="tertiary"
        >
          <Para sx={{ mb: 3 }}>
            The subsidy available on the installation of grid-connected solar
            rooftop power plants is 30% of the benchmark cost. Government
            institutions including PSUs shall not be eligible for the subsidy.
            Instead, they will be given achievement-linked incentives/awards.
            All residential and institutional buildings such as schools, health
            institutions, etc. and the social sector can avail CFA. As much as
            100% subsidy has been offered to government and semi-government
            offices and 15% to the private offices to setup rooftop solar
          </Para>
          <ListingWithHand>
            <span>👉</span>
            Required documentation is needed to submit to MEDA online by a
            developer on behalf of the eligible customer.
          </ListingWithHand>

          <ListingWithHand>
            <span>👉</span>
            Following the provisional approval, the completion report needs to
            be submitted.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            After that site visit and site inspection is done by the officials.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            After all these formalities, the subsidy amount is directly
            deposited to the customer’s account within 2-3 months of issuing the
            grant letter.
          </ListingWithHand>
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
                  <Typography>
                    Size:Up to 1 MWp; with variation of 5%
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Voltage level:230 / 240V : upto 8 kWp max.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    400/ 415V (Three phase): Above 8 to 150 kWp max. in
                    Metropolitian Area and 8 to
                  </Typography>
                </li>
                <li>
                  <Typography>80 kWp in Other Areas</Typography>
                </li>
                <li>
                  <Typography>
                    11 kV and Above Level : Above 150 to 1000kWp max. in
                    Metropolitian Area and 80 to 1000 kWp in Other Areas
                  </Typography>
                </li>
              </ul>
            </GrayBox>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography
              ssx={{
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
                  <Typography>Third party ownership (RESCO model)</Typography>
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
                    Any unadjusted electricity credits shall be paid as per the
                    rates notified by MERC
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
                    MSEDCL shall, within 7 working days of the completion of the
                    feasibility study, convey its approval for installing the
                    Roof-top Solar PV System. The approval shall be valid for a
                    period of 6 months from the date of approval, or such
                    extended period as may be agreed to by the MSEDCL.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    MSEDCL shall complete the testing and commissioning of the
                    System within 10 working days from receipt of testing and
                    commissioning request, and shall install the Net Metering
                    equipment and synchronise the Roof-top Solar PV System
                    within 10 working days thereafter.
                  </Typography>
                </li>
              </ul>
            </GrayBox>
          </Box>
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

export default Maharashtra;
