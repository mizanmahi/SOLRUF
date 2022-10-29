import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// import CalculateIcon from '@mui/icons-material/Calculate';
import HistoryIcon from "@mui/icons-material/History";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ProductDetailList from "../ProductDetailList/ProductDetailList";
import ProjectTag from "../ProjectTag/ProjectTag";
import CollapsableText from "../CollapsableText/CollapsableText";
import ResponsiveSlider from "../ResponsiveSlider/ResponsiveSlider";
import { axiAuth } from "../../utils/axiosInstance";
import { KeyboardBackspace } from "@mui/icons-material";
import VideoModal from "../VideoModal/VideoModal";
import { formatYoutubeVideoUrl } from "../../utils/utils";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  "@media (max-width: 1500px)": {
    width: "75%",
  },
  "@media (max-width: 1300px)": {
    width: "85%",
  },
  "@media (max-width: 1000px)": {
    width: "90%",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    transform: "translate(-50%,)",
    // top:'140px'
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  // p: 4,
};

const InfoBoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  "@media (max-width: 800px)": {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: "1rem",
    // maxWidth: '100%',
  },
  // maxWidth: '900px',
  width: "100%",
  margin: "0 auto",
}));
const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  "@media (min-width: 800px)": {
    maxWidth: "300px",
  },
  "@media (max-width: 800px)": {
    justifyContent: "space-between",
    width: "100%",
  },
  flex: 1,
  padding: theme.spacing(1),
  background: "#FFD05B",
  borderRadius: theme.spacing(1),
  // marginRight: theme.spacing(4),
  "&:last-child": {
    marginRight: 0,
  },
  "& .iconBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: theme.spacing(1.5),
    borderRight: "3px solid #4D4D4D",
    marginRight: theme.spacing(2),
    "@media (max-width: 800px)": {
      borderRight: "2px solid #4D4D4D",
    },
    "& svg": {
      fontSize: "40px",
    },
  },
  "& .textBox": {
    textAlign: "right",
    "@media (max-width: 800px)": {
      textAlign: "center",
    },
  },
}));

const Flex = styled(Box)(({ theme }) => ({
  display: "flex",

  alignItems: "center",
}));

const useStyle = makeStyles((theme) => ({
  addressBox: {
    background: "#FFD05B",
    width: "50%",
    height: "25%",
    marginTop: "-2rem",
    zIndex: 100,
    marginLeft: "2rem",
    borderRadius: "1rem",
    padding: ".8rem",
    position: "absolute",

    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
  },
  modalHeaderBox: {},
  reviewBox: {
    width: "100%",
    maxWidth: "500px",
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    boxShadow: "0px 4px 8px 0 rgba(0, 0, 0, 0.3)",
    borderRadius: theme.spacing(2),
  },
  typeBox: {
    background: "#3FB500",
    height: "40px",
    marginTop: "-2rem",
    zIndex: 100,
    marginLeft: "16rem",
    borderRadius: "1rem",
    padding: ".8rem",
    position: "absolute",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xl")]: {
      marginLeft: "10.5rem",
      fontSize: "1rem",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "4rem",
      fontSize: "1rem",
    },
  },
}));

const ProjectDetailsModal = ({ open, handleClose, project_id, project }) => {
  const [projectDetails, setProjectDetails] = useState(project);
  const classes = useStyle();

  const [showVideoModal, setShowVideoModal] = useState(false);
  const handleVideoModalOpen = () => setShowVideoModal(true);
  const handleVideoModalClose = () => setShowVideoModal(false);

  useEffect(() => {
    console.log("project_id", project_id);
    axiAuth
      .get(`api/vendor/projects/${project_id}`)
      .then(({ data }) => {
        setProjectDetails(data.project);
      })
      .catch((err) => {
        console.log("Error fetching project details");
      });
  }, [project_id]);

  console.log({ projectDetails });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="project details modal"
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(10px)",
        },
      }}
      hideBackdrop={window.innerWidth > 600 ? false : true}
    >
      <Box
        sx={{
          ...modalStyles,
          height: "95%",
          borderRadius: 2,
          bgcolor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            zIndex: "3",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              p: 1,
              color: "black",
              bgcolor: "#D0D7D9",
              textAlign: "start",
              fontWeight: "bold",
              display: { xs: "flex", sm: "none" },
              columnGap: 1,
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <KeyboardBackspace />
            <Box>Back</Box>
          </Box>
        </Box>
        <Box
          sx={{
            px: 3,
            py: { xs: 10, sm: 5 },
            overflowY: "scroll",
            height: "100%",
            overflowX: "hidden",
          }}
        >
          <CloseIcon
            style={{
              position: "absolute",
              right: "3%",
              top: "3%",
              cursor: "pointer",
              backgroundColor: "#fff",
              borderRadius: "50%",
            }}
            sx={{
              display: {
                sm: "block",
                xs: "none",
                position: "relative",
                zIndex: 5000,
              },
            }}
            onClick={handleClose}
          />
          <Box
            sx={{
              position: "fixed",
              bgcolor: "#fff",
              width: "100%",
              left: 0,
              top: 0,
              py: 2,
              zIndex: 4000,
              borderBottom: "1px solid #D0D7D9",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={600}
              sx={{ fontSize: "36px", mb: 1 }}
            >
              {projectDetails?.name}
            </Typography>
            <Typography
              textAlign="center"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#8A8A8A",
                fontSize: "1.2rem",
              }}
            >
              {" "}
              <LocationOnIcon />
              {projectDetails?.city}, {projectDetails?.state}
            </Typography>
            {/* <hr /> */}
          </Box>
          <Box>
            <Flex
              sx={{
                mt: 12.5,
                mb: 3,
                alignItems: "center",
                flexDirection: { sm: "row", xs: "row-reverse" },
                justifyContent: { xs: "space-between", sm: "start" },
              }}
            >
              <ProjectTag title={projectDetails?.category?.name} />
              <ProductDetailList
                list="Power Capacity"
                description={`${projectDetails?.power_capacity} ${projectDetails?.power_capacity_type}`}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  mx: 2,
                  mt: 0,
                  "& p": {
                    fontSize: "1.2rem",
                    fontWeight: 500,
                  },
                  "& strong": {
                    color: "#000",
                  },
                }}
              />
              <ProductDetailList
                sx={{
                  display: { xs: "none", sm: "flex" },
                  mt: 0,
                  "& p": {
                    fontSize: "1.2rem",
                    fontWeight: 500,
                  },
                  "& strong": {
                    color: "#000",
                  },
                }}
                list="Months Taken"
                description={`${projectDetails?.duration} ${projectDetails?.duration_type}`}
              />
              <Box
                sx={{
                  textAlign: "start",
                  display: { xs: "block", sm: "none" },
                }}
              >
                <ProductDetailList
                  list="Power Capacity"
                  description={`${projectDetails?.power_capacity} ${projectDetails?.power_capacity_type}`}
                  sx={{
                    mt: 0,
                    "& p": {
                      fontSize: "1.2rem",
                      fontWeight: 500,
                    },
                    "& strong": {
                      color: "#000",
                    },
                  }}
                />
                <ProductDetailList
                  sx={{
                    mt: 0,
                    "& p": {
                      fontSize: "1.2rem",
                      fontWeight: 500,
                    },
                    "& strong": {
                      color: "#000",
                    },
                  }}
                  list="Months Taken"
                  description={`${projectDetails?.duration} ${projectDetails?.duration_type}`}
                />
              </Box>
            </Flex>
            <Typography
              sx={{ fontSize: "22px", color: "#000" }}
              fontWeight={600}
              gutterBottom
            >
              Description
            </Typography>
            <Typography sx={{ mb: 4 }}>
              <CollapsableText
                text={projectDetails?.description}
                collapseAt={150}
              />
            </Typography>

            <Box sx={{ my: 3 }}>
              <ResponsiveSlider
                images={projectDetails?.images?.map((img) => img.url) || []}
              />
            </Box>
          </Box>

          {/* ====== Project Info ====== */}

          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{ fontSize: "22px", color: "#000", mb: 2 }}
              fontWeight={600}
            >
              Project Info
            </Typography>
            <InfoBoxWrapper>
              {projectDetails?.project_cost ? (
                <InfoBox sx={{ mr: 2 }}>
                  <Box className="iconBox">
                    <MonetizationOnIcon />
                  </Box>
                  <Box className="textBox">
                    <Typography variant="h6">Cost Of Project</Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: ["1.4rem", "1.5rem"],
                        color: "#000000",
                      }}
                    >
                      Rs. {projectDetails?.project_cost}
                    </Typography>
                  </Box>
                </InfoBox>
              ) : (
                <></>
              )}
              <InfoBox sx={{ mr: 2 }}>
                <Box className="iconBox">
                  <HistoryIcon />
                </Box>
                <Box className="textBox">
                  <Typography variant="h6">Period Of Return</Typography>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: ["1.4rem", "1.5rem"],
                      color: "#000000",
                    }}
                  >
                    {`${projectDetails?.return_period} ${projectDetails?.return_period_type}`}
                  </Typography>
                </Box>
              </InfoBox>
              <InfoBox>
                <Box className="iconBox">
                  <MonetizationOnIcon />
                </Box>
                <Box className="textBox">
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Amount Of Return
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: ["1.4rem", "1.5rem"],
                      color: "#000000",
                    }}
                  >
                    Rs. {projectDetails?.return_amount}
                  </Typography>
                </Box>
              </InfoBox>
            </InfoBoxWrapper>
          </Box>

          {/* ====== Customer review ====== */}

          {projectDetails?.reviews?.length > 0 && (
            <Box
              sx={{
                mb: 3,
                width: "100%",
                maxWidth: "600px",
                mx: "auto",
                mt: 5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "22px",
                  color: "#000",
                  textAlign: "center",
                  mb: 3,
                  mt: 3,
                }}
                fontWeight={600}
              >
                Customer Review
              </Typography>
              <Box className={classes.reviewBox}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://i.ibb.co/SJ05bh1/review-Image.png"
                  sx={{ width: "70px", height: "70px", mb: 0.5 }}
                />
                <Typography
                  variant="h5"
                  textAlign="center"
                  fontWeight={500}
                  gutterBottom
                >
                  {projectDetails?.reviews?.length > 0
                    ? projectDetails?.reviews[0]["customer_name"]
                    : "Customer Name"}
                </Typography>
                <Typography
                  sx={{ fontSize: "14px" }}
                  fontWeight={400}
                  textAlign="center"
                >
                  ”{" "}
                  {projectDetails?.reviews?.length > 0
                    ? projectDetails?.reviews[0]["customer_review"]
                    : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio obcaecati exercitationem quasi"}
                  „
                </Typography>
              </Box>
            </Box>
          )}

          {/* ====== video section ====== */}
          <Box
            onClick={handleVideoModalOpen}
            sx={{
              bgcolor: "",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <iframe
              style={{ borderRadius: "1rem" }}
              width="380"
              height="250"
              src={formatYoutubeVideoUrl(projectDetails?.video_url)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Box>
        </Box>
        <VideoModal
          open={showVideoModal}
          handleClose={handleVideoModalClose}
          videoLink={projectDetails.video_url}
          // videoLink='https://www.youtube.com/watch?v=Cg-6WRhpWy8'
        />
      </Box>
      {/* ========= modal end ============ */}
    </Modal>
  );
};

export default ProjectDetailsModal;
