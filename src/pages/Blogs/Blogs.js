import React from "react";
import { Container, Grid, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import YellowButton from "../../components/YellowButton/YellowButton";
import BlogIntroSection from "../../components/BlogIntroSection/BlogIntroSection";
import { useNavigate } from "react-router-dom";
import RecentBlogList from "./RecentBlogList/RecentBlogList";
// import Card from '@mui/material/Card';

const Wrapper = styled(Box)(({ theme }) => ({
  // background: '#D0D7D9',
}));

const BlogCards = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  margin: "3rem 0",
  position: "relative",
}));

const BlogCard = styled(Box)(({ theme }) => ({
  boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  borderRadius: "10px",
  display: "flex",
  maxWidth: 440,
  justifyContent: "space-between",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0px",
    maxWidth: "100%",
    width: "100%",
  },
}));

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <BlogIntroSection title="Solar Installation" />
      <Container maxWidth="xl" sx={{ padding: { sm: "20px", xs: 0 } }}>
        <Grid
          container
          spacing={2}
          sx={{ flexDirection: { sm: "row", xs: "column-reverse" } }}
        >
          <Grid item xs={12} md={3}>
            <RecentBlogList />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography sx={{ padding: { sm: "auto", xs: "20px" } }}>
              In an hour and a half, the amount of sunshine that touches the
              earth's surface is enough to power the entire world's energy usage
              for a year. Solar power is the conversion of solar energy into
              electrical energy. This energy can be harnessed using solar
              technologies for a multitude of purposes; photovoltaic, solar
              heating and cooling, and concentrating solar power. Photovoltaic
              employs an electronic method to create electricity directly from
              sunshine, which may be used to power anything. <br /> <br />
              Let's look at the potential of photovoltaic (PV) technology for
              generating electricity from sunlight. Individual PV cells are
              composed of a variety of semiconductor materials and are typically
              thinner than four human hairs. Cells are sandwiched between
              protective materials made of a combination of glass and/or
              plastics to endure the elements for many years. <br /> <br />
              To boost the power output of PV cells, they are connected together
              in chains to form larger units known as modules or panels. PV
              modules and arrays are just one part of a PV system. Systems also
              include mounting structures that point panels toward the sun,
              along with the components that take the direct-current (DC)
              electricity produced by modules and convert it to the
              alternating-current (AC) electricity used to power all of the
              appliances in your home.
            </Typography>
            <BlogCards>
              <Grid container rowSpacing={3}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BlogCard elevation="0">
                    <Box>
                      <CardMedia
                        sx={{ borderRadius: "5px 5px 0 0" }}
                        image="https://i.ibb.co/4m13WN5/Rectangle-155-1.png"
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
                          Types of PV Systems
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          The various PV systems outlined below could be used in
                          a variety of circumstances.
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <YellowButton
                        onClick={() => navigate("/blogs/typesOfPvSystems")}
                      >
                        Read More
                      </YellowButton>
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
                        image="https://i.ibb.co/d5w1cCm/Rectangle-155.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          What Steps do I Need to Take Before Solar power system
                          Installation?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          The various PV systems outlined below could be used in
                          a variety of circumstances.
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <YellowButton
                        onClick={() => navigate("/blogs/solarSteps")}
                      >
                        Read More
                      </YellowButton>
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
                        image="https://i.ibb.co/ZhwXXWp/Rectangle-155-2.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Solar Installation Process
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          The first step is to fix the mounts that will support
                          the Solar Panels. Depending on the application.
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <YellowButton
                        onClick={() =>
                          navigate("/blogs/solarInstallationProcess")
                        }
                      >
                        Read More
                      </YellowButton>
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
                        image="https://i.ibb.co/x2b4q9M/Rectangle-155-3.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Components used in Solar Installation
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          The first step is to fix the mounts that will support
                          the Solar Panels. Depending on the application.
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <YellowButton
                        onClick={() => navigate("/blogs/solarComponents")}
                      >
                        Read More
                      </YellowButton>
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
                        image="https://i.ibb.co/cJDTyxS/Rectangle-155-4.png"
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Solar Panel Maintenance
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Solar panels require extremely little maintenance
                          because they have no moving parts. However,
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <YellowButton
                        onClick={() => navigate("/blogs/maintenance")}
                      >
                        Read More
                      </YellowButton>
                    </Box>
                  </BlogCard>
                </Grid>
              </Grid>
            </BlogCards>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default Blogs;
