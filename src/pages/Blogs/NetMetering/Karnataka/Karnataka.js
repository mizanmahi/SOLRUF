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

const TableWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.light,
  padding: "2rem",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",

  borderRadius: "10px",
  margin: "3rem auto",
  width: "100%",
  overflowX: "auto",
}));

const TableBox = styled(Box)(({ theme }) => ({
  minWidth: "700px",
  justifyContent: "center",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "1rem",
}));

const DataBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  background: "#ffffff",
  color: "#000000",
  borderRadius: "5px",
  fontWeight: "600",
  fontFamily: "inherit",
}));

const DataBox2 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  background: "#666f73",
  color: "#ffffff",
  borderRadius: "5px",
  fontWeight: "600",
  fontFamily: "inherit",
}));

const Karnataka = () => {
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
        subtitle="KARNATAKA"
        icon={<LocationOnIcon sx={{ fontSize: "40px" }}></LocationOnIcon>}
      />

      <Container maxWidth="lg" sx={{ padding: { sm: "20px", xs: 0 } }}>
        <Para sx={{ padding: { xs: "20px", sm: 0 } }}>
          Karnataka is the seventh largest state located in the southern-western
          part in the country and one of the high contributors of commissioned
          solar power. Solar energy plants meet about 20 per cent of Karnataka’s
          daily power requirements as the overall share of renewables continues
          to climb. At 7,346 megawatts (MW), the state has the largest installed
          capacity of solar power in the country, and the biggest local plant is
          in Pavagada (Tumakuru). In order to pursue the target several solar
          parks, schemes such as the Surya Raitha, awareness drives for the
          farmer as well as a keen focus towards distributed solar have been
          started. According to data from Karnataka Power Corporation Limited,
          solar energy accounts for more than 50 per cent of the state’s
          installed capacity of green energy (13,544 MW).
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
            The Government of Karnataka shall promote grid connected solar
            rooftop projects on public buildings, domestic, commercial and
            industrial establishments through net metering and gross metering
            methods based on tariff orders issued by KERC from time to time.
          </Para>
          <ListingWithHand>
            <span>👉</span>
            Solar PV system shall be within the permissible rated capacity as
            defined under these Regulations.
          </ListingWithHand>

          <ListingWithHand>
            <span>👉</span>
            Solar PV system shall be located in the consumer’s premises.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            Solar PV system shall interconnect and operate safely in parallel
            with the distribution licensee network.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            In case of solar rooftop PV systems connected to the grid of a
            distribution company on a net basis, the surplus energy injected
            shall be paid by the ESCOMs at a tariff determined by KERC from time
            to time.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            Metering shall be in compliance with the CEA (installations and
            operation of meters) Regulations 2006, the Grid Code, the metering
            code and other relevant regulations issued by KERC/CERC from time to
            time.
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            ESCOM’s will define specific guidelines on the standards for
            connectivity to the network. The scheme shall be administered by
            respective ESCOM’s. (including registration, approval, metering,
            protocols, safety protocol, and standards).
          </ListingWithHand>
          <ListingWithHand>
            <span>👉</span>
            Fiscal benefits by the way of state and MNRE subsidies shall be
            through nodal agency.
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
                  <Typography>Visit BESCOM:</Typography>
                  <Button
                    endIcon={<OpenInNewIcon />}
                    component="a"
                    target="_blank"
                    href="https://bescom.karnataka.gov.in/english"
                    sx={{ mt: 2, color: "blue" }}
                  >
                    Click Here
                  </Button>
                </li>
                <li>
                  <Typography>
                    In the “Solar Rooftop Online Services” section, apply for
                    the “New Solar rooftop connection”
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Pay the form fees of Rs. 1770/- and check application
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
                <Typography>Copy of Adhar Card</Typography>
              </UtilityList>
              <UtilityList>
                <DoneIcon />
                <Typography>Copy of Pan Card</Typography>
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
            The Government is providing Financial Assistance for the
            installation of Grid Connected Rooftop Solar Power Plants at rate of
            30% of the cost/ benchmark cost (including the Central Financial
            Assistance (CFA) of MNRE, if available) or Rs. 20000/- per kWp,
            whichever is less, for installation of the grid connected rooftop
            solar power plant ranging from 1 KWp to 500 KWp to the eligible
            categories. The benchmark cost shall be taken as the cost of the
            system finalized for installation of the grid connected rooftop SPV
            power plants for government sector buildings.
          </Para>
        </BlogTitledBox>

        <TableWrapper>
          <TableBox>
            <DataBox2>Type of Residential sector</DataBox2>
            <DataBox2>1 KWP</DataBox2>
            <DataBox2>Residential sector (upto 3 KW capacity)</DataBox2>
            <DataBox>40%</DataBox>

            <DataBox2>
              Residential sector (above 3 KW capacity and upto 10 KW capacity
            </DataBox2>
            <DataBox>
              40% upto 3 KW + 20% for RTS system above 3 KW and upto 10 KW
            </DataBox>
            <DataBox2>
              Group Housing Societies/ Residential Welfare associations (GHS/
              RWA) etc., for common facilities upto 500 KWP (@10 KWP per house),
              with the upper limit being inclusive of individual rooftop plants
              already installed by individual residents in that GHS/ RWA at the
              time of installation of RTS for common activity
            </DataBox2>
            <DataBox>20%</DataBox>
          </TableBox>
          <Typography sx={{ mt: 1, fontWeight: 600 }}>
            *Payback period has been calculated assuming availability of
            subsidy.
          </Typography>
        </TableWrapper>
        <TableWrapper>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>
            The Benchmark cost as per MNRE is as detailed below
          </Typography>
          <TableBox>
            <DataBox2>Capacity</DataBox2>
            <DataBox2>Benchmark Cost (Rs./KWP)</DataBox2>
            <DataBox2>Residential sector (upto 3 KW capacity)</DataBox2>
            <DataBox>40%</DataBox>

            <DataBox2>Above 10 KW and upto 100 KW</DataBox2>
            <DataBox>
              40% upto 3 KW + 20% for RTS system above 3 KW and upto 10 KW
            </DataBox>
            <DataBox2>Above 100 KW and upto 500 KW</DataBox2>
            <DataBox>20%</DataBox>
          </TableBox>
        </TableWrapper>

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
                        Limits in kW:HT Consumers : upto 1 MWp
                      </Typography>
                    </li>

                    <li>
                      <Typography>
                        LT Consumers (Single Phase) : upto 5 kWp
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        LT Consumers (Three Phase): Above 5 kWp to 50 kWp
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Conditions:= 150% of your Sanctioned Load.
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
                      <Typography>Annual settlement</Typography>
                    </li>
                    <li>
                      <Typography>
                        All electricity injected in the grid shall be paid at
                        applicable tariff rates
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
                        Exempted from wheeling, banking, cross subsidy charges
                        if applicable
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
                      <Typography>Size:=2 MW</Typography>
                    </li>
                    <li>
                      <Typography>
                        From 1 to 2MW, there is a mandate to have 25% battery
                        storage that should be able to store and deliver energy
                        for 2 hours.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Conditions:=100% of your Sanctioned Load
                      </Typography>
                    </li>

                    <li>
                      <Typography>
                        Cumulative capacity of all solar systems installed in
                        your area shall not exceed 50% of Local Distribution
                        transformer capacity in your area.
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
                  OTHERS
                </Typography>

                <GrayBox>
                  <ul>
                    <li>
                      <Typography>
                        Mandatory for all Commercial complexes, Offices, Malls,
                        etc. (existing as well as new buildings) having
                        Connected Load of 50 kW and above to install 3% to 5%
                        capacity of their Connected Load of solar.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        No permission is required from the building plan
                        sanctioning authority for setting up rooftop solar power
                        plants.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Electricity taxes, cess, electricity duty, wheeling
                        charges, cross subsidy charges, transmission and
                        distribution charges: totally waived off for Rooftop
                        Solar Projects.
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

export default Karnataka;
