import {
  CardContent,
  CardMedia,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BlogIntroSection from "../../../components/BlogIntroSection/BlogIntroSection";
import VerticalStepper from "../../../components/VerticalStepper/VerticalStepper";
import YellowButton from "../../../components/YellowButton/YellowButton";
import RecentBlogList from "../RecentBlogList/RecentBlogList";
import CablesAndWires from "./CablesAndWires/CablesAndWires";
import EarthingKits from "./EarhingKits/EarhingKits";
import LightningArrestor from "./LightningArrestor/LightningArrestor";
import ModuleMountingStructure from "./ModuleMountingStructure/ModuleMountingStructure";
import NetMeter from "./NewMeter/NewMeter";
import PvMeter from "./PvMeter/PvMeter";
import SolarBatteries from "./SolarBatteries/SolarBatteries";
import SolarChargeController from "./SolarChargeController/SolarChargeController";
import SolarInverters from "./SolarInverters/SolarInverters";
import SolarJunction from "./SolarJunction/SolarJunction";
import SolarPanel from "./SolarPanel/SolarPanel";

const Wrapper = styled(Box)(({ theme }) => ({
  paddingBottom: "2rem",
  background: "#F3F3F3",
}));

const BlogCards = styled(Box)(({ theme }) => ({
  //    boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
  borderRadius: "5px",
  margin: "3rem 0",
  position: "relative",
}));

const BlogCard = styled(Box)(({ theme }) => ({
  boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0px",
    maxWidth: "100%",
    width: "100%",
  },
}));

const ArticleHeader = styled(Box)(({ theme }) => ({
  background: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  borderRadius: "10px",
  margin: "1rem auto",
  width: "100%",
  maxWidth: "250px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  "& p": {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
}));

const Para = styled(Typography)(({ theme }) => ({
  color: "#000000",
}));

const SectionDivider = styled(Box)(({ theme }) => ({
  background: "#ffd05b",
  width: "80%",
  marginLeft: "auto",
  marginTop: "4rem",
  marginBottom: "4rem",
  height: "1.8rem",
  borderRadius: "20px 0 0 20px",
}));

const ReadMoreBtn = styled("a")(({ theme }) => ({
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
  "& button": {
    "&:hover": {
      boxShadow: "0px 4px 10px rgba(0,0,0,0.20) !important",
      transform: "translateY(-2px)",
    },
    "&:active": {
      boxShadow: "0px 4px 5px rgba(0,0,0,0.10) !important",
      transform: "translateY(-1px)",
    },
  },
}));

const SolarProducts = () => {
  return (
    <Wrapper>
      <BlogIntroSection sx={{ mb: 9 }} title="Solar Products" />

      <Container maxWidth="xl" sx={{ padding: { sm: "20px", xs: 0 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <RecentBlogList />
            <VerticalStepper />
          </Grid>
          {/* ====== cards ====== */}
          <Grid item xs={12} md={9}>
            <Typography sx={{ padding: { sm: 0, xs: "20px" } }}>
              Solar technologies use photovoltaic (PV) panels or solar mirrors
              to catch the sun's radiation and convert it to electrical energy.
              This energy can be used to create electricity with intelligent
              photovoltaic systems or saved in batteries or thermal storage.
              Solar photovoltaic (PV) systems are made up of panels that absorb
              sunlight and convert it to power. The DC signals are fed through
              an inverter, which converts them to grid-safe AC power. For safety
              purposes, various switch boxes are incorporated, and everything is
              connected by wires and conduit.
            </Typography>
            <BlogCards>
              <Grid container rowSpacing={3}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        image="https://i.ibb.co/x2b4q9M/Rectangle-155-3.png"
                        component="img"
                        height="350"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Solar Panels
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          A solar panel (also known as a solar module) consists
                          of a layer of silicon cells, a metal frame, a..
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#panels">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image="https://i.ibb.co/N2tqxfj/image-35.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Solar Inverters
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          A solar inverter or PV inverter converts the variable
                          direct current (DC) output of a photovoltaic...
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#inverters">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image="https://i.ibb.co/ynDcvQb/image-36.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Solar Batteries
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Solar battery is a device that reserves energy for
                          later consumption that is charged by a connected solar
                          system. The...
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#batteries">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image="https://i.ibb.co/Ky1780B/image-38.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Lightning Arrestor
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lightning (surge) arrestors are designed to absorb
                          voltage spikes caused by electrical storms (or
                          out-of-spec utility power)...
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#lightningArrestor">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image="https://i.ibb.co/qnkNjMx/image-45.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Pv Meter
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          A Photovoltaic (PV) meter collects PV yield production
                          to measure how much electricity your solar system
                          generates...
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#pvMeter">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image="https://i.ibb.co/NFqPNG3/image-46.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Net Meter
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Net meters work by continuously sampling how much
                          electricity is being generated and how much
                          electricity...
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#netMeter">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image="https://i.ibb.co/XkBvhsG/image-47.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          CABLES & WIRES
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          A cable is a group of two or more conductors that are
                          twisted or bonded together, surrounded by an
                          insulating...
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#cables&wires">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image="https://i.ibb.co/fxB4PHn/image-48.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          SOLAR JUNCTION BOX
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          A Solar Junction Box is a protective box that is used
                          to combine, connect, and terminate electrical
                          components...
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#solarJunction">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image="https://i.ibb.co/nPbRxWX/image-53.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          EARTHING KIT
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Earthing is a way of transmitting any instant
                          electricity discharge/ lightning directly to the
                          ground through low resistance...
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#earthingKit">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard sx={{ maxWidth: 440 }} elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        component="img"
                        height="350"
                        image=" https://i.ibb.co/4FZhrLj/image-58.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          SOLAR CHARGE CONTROLLER
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          A solar charge controller is fundamentally a voltage
                          or current controller to charge the battery and keep
                          electric ..
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <ReadMoreBtn href="#chargeController">
                        <YellowButton>Read More</YellowButton>
                      </ReadMoreBtn>
                    </Box>
                  </BlogCard>
                </Grid>
              </Grid>
            </BlogCards>

            {/* ============ Solar Panel Section ============  */}

            <SolarPanel />

            <SectionDivider />

            <SolarInverters />

            <SectionDivider />

            <SolarBatteries />

            <SectionDivider />

            <ArticleHeader>
              <Typography>BALANCE OF SYSTEM</Typography>
            </ArticleHeader>

            <Para sx={{ padding: { sm: 0, xs: "20px" } }}>
              A Solar PV Balance-of-System or BOS refers to the components and
              equipment that move DC energy produced by solar panels through the
              conversion system which in turn produces AC electricity. This
              includes wiring, switches, junction box, a mounting system, charge
              controller, lightning arrestor, earthing electrode,etc.. BOS
              components make up roughly 10%-50% of solar purchasing and
              installation costs and account for the majority of maintenance
              requirements. The components included in the BOS are given below:
            </Para>

            <Box sx={{ my: 4 }}>
              <img
                src="https://i.ibb.co/85bLsgY/image-67.png"
                alt=""
                style={{
                  maxWidth: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Box>

            <LightningArrestor />

            <SectionDivider />

            <PvMeter />

            <SectionDivider />

            <NetMeter />

            <SectionDivider />

            <CablesAndWires />

            <SectionDivider />

            <SolarJunction />

            <EarthingKits />

            <SectionDivider />

            <SolarChargeController />

            <SectionDivider />
            <ModuleMountingStructure />
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default SolarProducts;
