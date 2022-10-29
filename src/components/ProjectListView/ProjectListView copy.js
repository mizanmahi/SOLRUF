import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BottomSheet from '../Custom/BottomDialog/PortfolioBottomSheet';
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useNavigate } from "react-router";
import YellowButton from "../YellowButton/YellowButton";
import { axiAuth } from "../../utils/axiosInstance";
import { setProjectToBeEdited } from "../../redux/slices/projectSlice";
import { useDispatch } from "react-redux";
import AddProject from "../../pages/AddProject/AddProject";
import { PushPin } from "@mui/icons-material";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { toast } from "react-toastify";
import DraggableBottomDialog from "../Custom/BottomDialog/DraggableBottomDialog";

const ProjectList = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
  padding: ".8rem",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 4px 15px rgba(0,0,0,0)",
}));
const TitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const Number = styled(Box)(({ theme }) => ({
  background: "#d0d7d9",
  color: "#4d4d4d",
  fontWeight: "bold",
  // mr: "0.8rem",
  borderRadius: "50%",
  padding: "0.5rem",
  width: "1.5rem",
  height: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "0.8rem",
}));

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  boxShadow: 0,
  borderRadius: "5px",
  width: "100%",
  minWidth: "300px",
};

const SingleProjectBox = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(2),
    background: "#fff",
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
    marginBottom: '1.5rem',
  };
});

const ButtonBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-between",
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

const ProjectListView = ({ project, number, setFetchProjects }) => {
  const classes = useStyles();
  const [tag, setTag] = useState(0);
  const { name, is_pinned, project_id } = project;

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [isPinned, setIsPinned] = React.useState(is_pinned);
  const [projectDeleteId, setProjectDeleteId] = React.useState(null);

  const [projectDeleteConfirm, setProjectDeleteConfirm] = React.useState({
    role: "Project",
    isOpen: false,
    title: "Delete Project?",
    message: "Project will be deleted permanently once you continue!",
    cacheRole: "User",
  });

  const handleProjectDeleteClick = (e, project_id) => {
    e.stopPropagation();
    setProjectDeleteConfirm({
      ...projectDeleteConfirm,
      isOpen: true,
    });

    setProjectDeleteId(project_id);
  };

  const deleteHandler = async () => {
    if (!projectDeleteId) return;
    try {
      const { status } = await axiAuth.delete(
        `api/vendor/projects/${project_id}`
      );
      if (status === 200) {
        setFetchProjects((prev) => !prev);
        toast.success("Project deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleModalOPen = (e) => {
    setProjectModalOpen(true);
  };


  const handleModalClose = (e) => {
    // e.stopPropagation();
    setProjectModalOpen(false);
  };

  const handlePinning = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axiAuth.get(
        `api/vendor/projects/${project_id}/pin`
      );
      if (data.message === "Project Pinned") {
        setIsPinned(true);
        alert("Project pinned");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnpin = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axiAuth.get(
        `api/vendor/projects/${project_id}/pin`
      );
      if (data.message === "Project Unpinned") {
        setIsPinned(false);
        alert("Project unpinned");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [editProject, setEditProject] = useState(false);
  const dispatch = useDispatch();

  const editProjectHandler = async (e, project_id) => {
    //when ever we are editing the project we are setting it's id in redux store and then loading the AddProject form and there we are taking that id from redux store.
    e.stopPropagation();
    const { data } = await axiAuth.get(`api/vendor/projects/${project_id}`);
    console.log(data);
    dispatch(setProjectToBeEdited(data?.project));
    setEditProject(true);
  };

  return (
    <ProjectList sx={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)", border: '0.5px solid rgba(77,77,77,1)' }} onClick={handleModalOPen}>
      <TitleBox>
        <Number>{number || 1}</Number>
        <Typography fontWeight={600}>
          {name.length < 15 ? name : name.slice(0, 20) + "..."}
        </Typography>
      </TitleBox>

      <DraggableBottomDialog
        handleClose={handleModalClose}
        open={projectModalOpen}
        bar={true}
      >
        <div style={{ width: '100%' }}>
          <Box sx={{ ...style }}>
            <SingleProjectBox>
              <Box className={classes.pinBox}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5 }}>
                  {project.name}
                </Typography>
              </Box>
              <Typography gutterBottom> Location: {project.city}, {project.state} </Typography>
              <Typography gutterBottom>Amount: Rs {project.project_cost}</Typography>
              <Typography gutterBottom>Customer Name: Kalish Sharma</Typography>
              <ImageBox>
                {project.images?.map((image, index) => (
                  <Box sx={{ width: "68px", height: "68px", overflow: "hidden", borderRadius: 2 }}>
                    <img style={{ width: 'auto', height: '100%', objectFit: 'cover' }} key={image.id} src={image.url} alt="" />
                  </Box>
                ))}
                {project.images?.length == 3 &&
                  <Box sx={{ width: "68px", height: "68px", overflow: "hidden", borderRadius: 2 }}>
                    <img style={{ width: 'auto', height: '100%', objectFit: 'cover' }} key={project.images[0].id} src={project.images[0].url} alt="" />
                  </Box>}
              </ImageBox>

            </SingleProjectBox>
            <Box sx={{ mt: 1 }}>
              {isPinned ?
                <YellowButton
                  style={{
                    width: '100%',
                    border: "2px solid #FFD05B",
                    color: "#4D4D4D",
                    background: "#F3F3F3",
                    padding: ".7rem 1.5rem",
                    marginBottom: '4rem',
                  }}
                  onClick={handleUnpin}
                >
                  {" "}
                  <PushPin /> UNPIN
                </YellowButton>
                :
                <YellowButton
                  style={{
                    width: '100%',
                    border: "2px solid #FFD05B",
                    color: "#4D4D4D",
                    background: "#F3F3F3",
                    padding: ".7rem 1.5rem",
                    marginBottom: '4rem',
                  }}
                  onClick={handlePinning}
                >
                  {" "}
                  <PushPinOutlinedIcon /> PIN
                </YellowButton>
              }
              <Box sx={{ display: 'flex', position: 'absolute', bottom: '0', width: '100%', p: 0 }}>
                <YellowButton
                  style={{
                    border: "2px solid #FFD05B",
                    color: "#4D4D4D",
                    background: "#F3F3F3",
                    padding: ".7rem 1.5rem",
                    width: '50%',
                    borderRadius:0,
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
                    background: "#F3F3F3",
                    padding: ".7rem 1.5rem",
                    width: '50%',
                    borderRadius:0,
                  }}
                  onClick={(e) => { handleProjectDeleteClick(e, project_id) }}
                >
                  {" "}
                  <DeleteIcon /> Delete
                </YellowButton>
              </Box>
            </Box>
          </Box>
        </div>
      </DraggableBottomDialog>
      <BottomSheet
        open={editProject}
        handleClose={() => setEditProject(false)}
        backText="Back to Portfolio"
      >
        {editProject && (
          <Box sx={{ overflowY: "scroll" }}>
            <AddProject />
          </Box>
        )}
      </BottomSheet>
      <ConfirmDialog
        confirmDialog={{
          ...projectDeleteConfirm,
          onConfirm: deleteHandler,
        }}
        setConfirmDialog={setProjectDeleteConfirm}
        variant="warning"
      />
    </ProjectList>
  );
};

export default ProjectListView;
