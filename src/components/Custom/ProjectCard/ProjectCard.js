import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import Portfoliocart from "../../../media/Portfoliocart.png";
import { Box, styled } from "@mui/system";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { axiAuth } from "../../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import {
  setProjects,
  setProjectToBeEdited,
} from "../../../redux/slices/projectSlice";
import ProjectDetailsModal from "../../ProjectDetailsModal/ProjectDetailsModal";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import { toast } from "react-toastify";

const ButtonBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "14px 0px",
    padding: "0px 20.8px",
    paddingBottom: "10px",
  };
});

const ProjectCard = ({
  project,
  setShowForm,
  editDelete,
  setFetchProjects,
  projects,
}) => {
  const { name, is_pinned, state, city, project_id } = project || {};
  const [isPinned, setIsPinned] = React.useState(is_pinned);

  console.log({ isPinned });

  console.log(project);

  const dispatch = useDispatch();

  const editHandler = async (e, project_id) => {
    //when ever we are editing the project we are setting it's id in redux store and then loading the AddProject form and there we are taking that id from redux store.
    e.stopPropagation();
    const { data } = await axiAuth.get(`api/vendor/projects/${project_id}`);
    console.log(data);
    dispatch(setProjectToBeEdited(data?.project));
    setShowForm(true);
  };

  const [modalDetailsOpen, setDetailsModalOpen] = React.useState(false);

  const [projectDeleteId, setProjectDeleteId] = React.useState(null);

  const [projectDeleteConfirm, setProjectDeleteConfirm] = React.useState({
    role: "Project",
    isOpen: false,
    title: "Delete Project?",
    message: "Project will be deleted permanently once you continue!",
    cacheRole: "User",
  });

  const [projectPinningConfirm, setProjectPinningConfirm] = React.useState({
    role: "Project",
    isOpen: false,
    title: "Pin This Project?",
    message: "Pinned project will be visible in your portfolio!",
    cacheRole: "Vendor",
  });

  const [projectUnPinningConfirm, setProjectUnPinningConfirm] = React.useState({
    role: "Project",
    isOpen: false,
    title: "Unpin This Project?",
    message: "Unpinned project will not be visible in your portfolio!",
    cacheRole: "Vendor",
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

  const handlePinning = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axiAuth.get(
        `api/vendor/projects/${project_id}/pin`
      );
      console.log(data);
      if (data.message === "Project Pinned") {
        setIsPinned(true);
        toast.success("Project Pinned Successfully!");
        setProjectPinningConfirm({
          ...projectPinningConfirm,
          isOpen: false,
        });

        const updatedProjects = projects.map((project) => {
          if (project.project_id === project_id) {
            return {
              ...project,
              is_pinned: true,
            };
          }
          return project;
        });
        dispatch(setProjects(updatedProjects));
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
      console.log(data);
      if (data.message === "Project Unpinned") {
        setIsPinned(false);
        toast.warn("Project Unpinned Successfully!");

        setProjectUnPinningConfirm({
          ...projectUnPinningConfirm,
          isOpen: false,
        });

        const updatedProjects = projects.map((project) => {
          if (project.project_id === project_id) {
            return {
              ...project,
              is_pinned: false,
            };
          }
          return project;
        });
        dispatch(setProjects(updatedProjects));
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          maxWidth: { xs: "100%", sm: 350 },
          borderRadius: "18px",
          boxShadow: "0 0px 15px rgba(0,0,0,0.1)",
          height: "100%",
          position: "relative",
        }}
        onClick={() => setDetailsModalOpen(true)}
      >
        <CardActionArea disableTouchRipple>
          <CardMedia
            component="img"
            height="200"
            image={
              project?.images?.length > 0
                ? project?.images[0].url
                : Portfoliocart
            }
            alt="cart"
            // className='img-fluid'
          />
          <CardContent sx={{ pt: 1.5, pl: 2.6, height: "13.5rem" }}>
            <Typography
              sx={{
                mt: 0.9,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  background: "#3FB500",
                  borderRadius: "5px",
                  padding: "2.4px 12px",
                  color: "#FFFFFF",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: "500",
                  height: "30px",
                }}
              >
                Commercial
              </span>
              {editDelete && (
                <IconButton size="small">
                  {isPinned ? (
                    <PushPinIcon
                      sx={{ mt: 0.4, color: "black" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectUnPinningConfirm({
                          ...projectUnPinningConfirm,
                          isOpen: true,
                        });
                      }}
                    />
                  ) : (
                    <PushPinOutlinedIcon
                      sx={{ mt: 0.4 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectPinningConfirm({
                          ...projectPinningConfirm,
                          isOpen: true,
                        });
                      }}
                    />
                  )}
                </IconButton>
              )}
            </Typography>
            <Typography
              sx={{
                mt: 1.7,
                color: "#000000",
                fontWeight: "700",
                fontSize: "22px",
                lineHeight: "26px",
              }}
            >
              {name}
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                color: "#000000",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {`${city}, ${state}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions> */}
        {editDelete && (
          <>
            <div
              style={{
                position: "relative",
                height: "64px",
                width: "100%",
              }}
            ></div>
            <ButtonBox
              sx={{
                position: "absolute",
                bottom: "6px",
                left: "0",
                right: "0",
                mx: "auto",
              }}
            >
              <PrimaryButton
                sx={{
                  px: 3.5,
                  py: 0.5,
                  background: "transparent",
                  border: "2px solid #4D4D4D",

                  flex: "1",
                  "&:hover": {
                    border: "2px solid transparent",
                  },
                }}
                onClick={(e) => editHandler(e, project_id)}
              >
                Edit
              </PrimaryButton>

              <PrimaryButton
                sx={{
                  px: 3.5,
                  py: 0.5,
                  background: "transparent",
                  border: "2px solid #F20519",
                  color: "#F20519",
                  flex: "1",
                  marginLeft: "1rem",
                  "&:hover": {
                    border: "2px solid transparent",
                    background: "#F20519",
                    color: "#ffffff",
                  },
                }}
                onClick={(e) => handleProjectDeleteClick(e, project_id)}
              >
                Delete
              </PrimaryButton>
            </ButtonBox>
          </>
        )}
        {/* </CardActions> */}
      </Card>

      {/*  project detail modal */}
      {modalDetailsOpen && (
        <ProjectDetailsModal
          open={modalDetailsOpen}
          handleClose={() => setDetailsModalOpen(false)}
          project_id={project_id}
          project={project}
        />
      )}

      <ConfirmDialog
        confirmDialog={{
          ...projectDeleteConfirm,
          onConfirm: deleteHandler,
        }}
        setConfirmDialog={setProjectDeleteConfirm}
        variant="warning"
      />

      <ConfirmDialog
        confirmDialog={{
          ...projectPinningConfirm,
          onConfirm: handlePinning,
        }}
        setConfirmDialog={setProjectPinningConfirm}
        variant="warning"
      />

      <ConfirmDialog
        confirmDialog={{
          ...projectUnPinningConfirm,
          onConfirm: handleUnpin,
        }}
        setConfirmDialog={setProjectUnPinningConfirm}
        variant="warning"
      />
    </React.Fragment>
  );
};

export default ProjectCard;
