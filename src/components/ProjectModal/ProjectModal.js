import { Modal, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import PushPinIcon from "@mui/icons-material/PushPin";
import YellowButton from "../YellowButton/YellowButton";
import BottomSheet from "../Custom/BottomDialog/PortfolioBottomSheet";
import { setProjectToBeEdited } from "../../redux/slices/projectSlice";
import { useDispatch } from "react-redux";
import { axiAuth } from "../../utils/axiosInstance";
import AddProject from "../../pages/AddProject/AddProject";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#F3F3F3",
  boxShadow: 24,
  borderRadius: "5px",
  width: "95%",
  minWidth: "300px",
};

const SingleProjectBox = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(2),
    background: "#F3F3F3",
    //    border: '2px solid #FFD05B',
    borderRadius: theme.spacing(1),
  };
});

const ImageBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1.5rem",
  };
});

const ButtonBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };
});

const useStyles = makeStyles((theme) => {
  return {
    pinBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };
});

const ProjectModal = ({ open, handleClose, project }) => {
  const classes = useStyles();
  const [editProject, setEditProject] = useState(false);
  const dispatch = useDispatch();

  const editProjectHandler = async (e, project_id) => {
    //whenever we are editing the project we are setting it's id in redux store and then loading the AddProject form and there we are taking that id from redux store.
    e.stopPropagation();
    const { data } = await axiAuth.get(`api/vendor/projects/${project_id}`);
    console.log(data);
    dispatch(setProjectToBeEdited(data?.project));
    setEditProject(true);
  };

  console.log("project modal loaded =>>>>>>>>>>>>>>>>.");
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ ...style }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
              mr: 1,
              alignItems: "center",
            }}
          >
            <PushPinIcon sx={{ mr: 1, color: "#ffd05b", fontSize: "25px" }} />

            <CloseIcon
              sx={{ fontSize: "25px", cursor: "pointer" }}
              onClick={handleClose}
            />
          </Box>

          <SingleProjectBox>
            <Box className={classes.pinBox}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 1.5 }}>
                Kanpur Power Grid Project
              </Typography>
            </Box>
            <Typography gutterBottom>Kanpur Uttar Pradesh</Typography>
            <Typography gutterBottom>Rs 10 22 560</Typography>
            <Typography gutterBottom>Kalish Sharma</Typography>
            <ImageBox>
              <img src="https://i.ibb.co/prSrHsx/Rectangle-79.png" alt="" />
              <img src="https://i.ibb.co/qnGsGWf/Rectangle-80.png" alt="" />
              <img src="https://i.ibb.co/Yt3y0wS/Rectangle-81.png" alt="" />
              <img src="https://i.ibb.co/w0Jk1B8/Rectangle-82.png" alt="" />
            </ImageBox>
            <hr />
            <ButtonBox>
              <YellowButton
                style={{
                  border: "2px solid #FFD05B",
                  color: "#4D4D4D",
                  background: "#fff",
                  padding: ".7rem 1.5rem",
                }}
                onClick={(e) => editProjectHandler(e, project.project_id)}
              >
                {" "}
                <EditIcon /> Edit
              </YellowButton>
              <YellowButton
                style={{
                  border: "2px solid red",
                  color: "red",
                  background: "#fff",
                  padding: ".7rem 1.5rem",
                }}
              >
                {" "}
                <DeleteIcon /> Delete
              </YellowButton>
            </ButtonBox>
          </SingleProjectBox>
        </Box>
      </Modal>
      <BottomSheet
        open={editProject}
        handleClose={() => setEditProject(false)}
        height="100%"
        backText="Back to Portfolio"
      >
        {editProject && (
          <Box sx={{ overflowY: "scroll" }}>
            <AddProject />
          </Box>
        )}
      </BottomSheet>
    </>
  );
};

export default ProjectModal;
