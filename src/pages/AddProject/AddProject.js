import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Grid, MenuItem, Typography } from "@mui/material";
import SolrufTextField from "../../components/TextField/TextField";
import { useDropzone } from "react-dropzone";
import UploadError from "../MyPortfolio/UploadError";
import SingleFIleUploadWithProgress from "../MyPortfolio/SingleFIleUploadWithProgress";
// accordion
import CustomAccordion from "../../components/CustomAccordion/CustomAccordion";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import { Controller, useForm } from "react-hook-form";
import { axiAuth } from "../../utils/axiosInstance";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDebounce } from "use-debounce";
import CustomErrorText from "../../components/CustomErrorText/CustomErrorText";
import useSolrufPinCode from "../../hooks/useSolrufPinCode";
import PrimaryButton from "../../components/Custom/PrimaryButton/PrimaryButton";
import SolrufSwitch from "../../components/Custom/SolrufSwitch/SolrufSwitch";
import { toast } from "react-toastify";
import add_logo_svg from "../../media/Svg/add_logo.svg";
import { autoGenerativeContentForProjectDescription } from "../../utils/constant";

const AddProjectBox = styled(Box)(({ theme }) => {
  return {
    background: "#ffffff",
    padding: "1rem",
    borderRadius: theme.spacing(2),
    position: "relative",
    marginTop: theme.spacing(1),
    "@media (max-width: 600px)": {
      borderRadius: 0,
      padding: "0.5rem",
    },
  };
});

const FileInputBox = styled(Box)(({ theme }) => {
  return {
    border: "2px solid #FFD05B",
    width: "100%",
    padding: "5px",
    background: "#F3F3F3",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      borderRadius: 20,
      height: 200,
      padding: "10px",
      maxWidth: "300px",
    },
  };
});

const DottedBox = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    width: "100%",
    height: "80%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      border: "2px dashed #FFD05B",
      width: "80%",
      justifyContent: "center",
    },
  };
});

const PowerCapacityBox = styled(Box)(({ theme, error }) => {
  return {
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    height: "40px",
    marginTop: "3px",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: `2px solid ${error ? "#d32f2f" : "#FFD05B"} `,
    overflow: "hidden",
    "& input": {
      width: "70%",
      padding: "18px 8px",
      border: "none",
      outline: "none",
      fontFamily: "Inter",
      "&::placeholder": {
        fontFamily: "Inter",
      },
    },
    "& select": {
      width: "30%",
      textAlign: "center",
      border: "none",
      outline: "none",
      background: theme.palette.primary.main,
      fontFamily: "Inter",
      "& option": {
        fontFamily: "Inter",
        padding: "10px",
      },
    },
  };
});

const MonthsTakenBox = styled(Box)(({ theme, error }) => {
  return {
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    height: "40px",
    marginTop: "3px",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: `2px solid ${error ? "#d32f2f" : "#FFD05B"} `,
    overflow: "hidden",
    "& input": {
      width: "70%",
      padding: "18px 8px",
      border: "none",
      outline: "none",
      fontFamily: "Inter",
      "&::placeholder": {
        fontFamily: "Inter",
      },
    },
    "& select": {
      width: "30%",
      textAlign: "center",
      border: "none",
      outline: "none",
      background: theme.palette.primary.main,
      fontFamily: "Inter",
      "& option": {
        fontFamily: "Inter",
        padding: "10px",
      },
    },
  };
});

const ReturnPeriodBox = styled(Box)(({ theme, error }) => {
  return {
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    height: "40px",
    marginTop: "3px",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: `2px solid ${error ? "#d32f2f" : "#FFD05B"} `,
    overflow: "hidden",
    "& input": {
      width: "70%",
      padding: "18px 8px",
      border: "none",
      outline: "none",
      fontFamily: "Inter",
      "&::placeholder": {
        fontFamily: "Inter",
      },
    },
    "& select": {
      width: "30%",
      textAlign: "center",
      border: "none",
      outline: "none",
      background: theme.palette.primary.main,
      fontFamily: "Inter",
      "& option": {
        fontFamily: "Inter",
        padding: "10px",
      },
    },
  };
});

const AddProject = ({ backToProjectHandler, closeForm, setFetchProjects }) => {
  const [projectImages, setProjectImages] = useState([]);

  const { projectToBeEdited } = useSelector((state) => state.project);
  console.log(projectToBeEdited);
  const [prevImages, setPrevImages] = useState(projectToBeEdited?.images);

  // const [selectedCategory, setSelectedCategory] = useState(
  //    projectToBeEdited?.category?.id
  // );
  // const [categoryError, setCategoryError] = useState(false);

  const [reviewChecked, setReviewChecked] = useState(
    projectToBeEdited?.reviews?.length > 0 ? true : false
  );

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedAcceptedFiles = acceptedFiles.map((file) => {
      return {
        file,
        errors: [],
      };
    });
    setProjectImages((cur) => [
      ...cur,
      ...mappedAcceptedFiles,
      ...rejectedFiles,
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 1000000,
    accept: "image/jpeg, image/png",
  });

  const onFileUpload = (url, file) => {
    setProjectImages((cur) =>
      cur.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  };

  const deleteHandler = (file) => {
    setProjectImages((cur) => cur.filter((fw) => fw.file !== file));
  };

  // const handleTagChange = (e) => {
  //    console.log(e.target.value);
  //    setCategoryError(false);
  //    e.preventDefault();
  //    setSelectedCategory(e.target.value);
  // };

  console.log(projectImages);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      description: autoGenerativeContentForProjectDescription,
      ...projectToBeEdited,
      state: projectToBeEdited?.state || " ",
      selectedCategory: projectToBeEdited?.category?.id || " ",
    },
  });

  const statesOfIndia = useSelector((state) => state.utils.statesOfIndia);

  const submitHandler = async (formData) => {
    // if (!selectedCategory) {
    //    setCategoryError('Please select a category');
    //    return;
    // }

    const projectData = {};
    projectData.category_id = formData.selectedCategory;
    projectData.name = formData.name;
    projectData.tag = 1;
    projectData.description = formData.description;
    projectData.power_capacity = formData.power_capacity;
    projectData.power_capacity_type = formData.power_capacity_type;
    projectData.duration = formData.duration;
    projectData.duration_type = formData.duration_type;
    projectData.cost = formData.project_cost;
    projectData.return_period = formData.return_period;
    projectData.return_period_type = formData.return_period_type;
    projectData.return_amount = formData.return_amount;
    projectData.images = projectImages
      .filter((fw) => fw?.errors?.length === 0)
      .map((fw) => fw.url);
    projectData.city = formData.city;
    projectData.state = formData.state;
    projectData.pincode = formData.pincode;
    projectData.video_url = formData.video_url;

    console.log({ projectData });
    console.log({ formData });

    // return;

    try {
      if (projectToBeEdited) {
        projectData._method = "PUT";

        const result = await axiAuth.post(
          `api/vendor/projects/${projectToBeEdited.project_id}`,
          projectData
        );
        console.log(result);
        if (result.status === 200) {
          let reviewResponse;
          if (reviewChecked) {
            reviewResponse = await axiAuth.post("api/vendor/project-reviews", {
              customer_review: formData.customer_review,
              project_id: projectToBeEdited.project_id,
              customer_name: formData.customer_name,
            });
          }
          if (result?.status === 200 || reviewResponse?.status === 200) {
            toast.success("Project Created Successfully");
            // setFetchProjects(prev => !prev);

            if (closeForm) {
              closeForm();
            }
            backToProjectHandler();
            setFetchProjects((prev) => !prev);
            setProjectImages([]);
            reset();
          }
        }
      } else {
        const projectResponse = await axiAuth.post(
          "api/vendor/projects",
          projectData
        );

        if (reviewChecked) {
          const reviewResponse = await axiAuth
            .post("api/vendor/project-reviews", {
              customer_review: formData.customer_review,
              project_id: projectResponse.data.project_id,
              customer_name: formData.customer_name,
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.response.data.message);
            });

          if (
            projectResponse.status === 200 ||
            reviewResponse?.status === 200
          ) {
            setProjectImages([]);
            toast.success("Project Created Successfully");

            if (closeForm) {
              closeForm();
            }

            backToProjectHandler();
            setFetchProjects((prev) => !prev);
            reset();
          }
        }

        setProjectImages([]);
        toast.success("Project Created Successfully");

        if (closeForm) {
          closeForm();
        }
        setFetchProjects && setFetchProjects((prev) => !prev);

        backToProjectHandler();
        reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log("errors", errors);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      axiAuth.get("api/categories?type=project").then(({ data }) => {
        console.log(data);
        setCategories(data.categories);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const onImageDelete = async (id) => {
    console.log(id);
    const { status, data } = await axiAuth.post(
      "api/vendor/projects/image/delete",
      {
        image_id: id,
        _method: "DELETE",
      }
    );

    console.log(data);

    if (status === 200) {
      alert("Image Deleted Successfully");
      setPrevImages(prevImages.filter((img) => img.id !== id));
    }
  };
  const pincode = watch("pincode");

  const [debouncedPinCode] = useDebounce(pincode, 1000);

  const { indiaState: stateByPin, district } =
    useSolrufPinCode(debouncedPinCode);
  console.log({ stateByPin, district });

  useEffect(() => {
    if (stateByPin && district) {
      setValue("city", district);
      setValue("state", stateByPin);
    }
  }, [stateByPin, district, setValue]);

  const reviewCheckHandler = (e) => {
    if (projectToBeEdited?.reviews?.length > 0) return;
    setReviewChecked(e.target.checked);
  };

  return (
    <Box sx={{ pb: 4, px: [0, 2] }}>
      <AddProjectBox>
        <Box component="form" onSubmit={handleSubmit(submitHandler)}>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            rowSpacing={1}
          >
            <Grid item xs={12} md={6} lg={4}>
              <SolrufTextField
                size="small"
                label="Project Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                error={errors.name}
                helperText={errors.name ? errors.name.message : " "}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MonthsTakenBox error={!!errors.duration}>
                <input
                  type="number"
                  placeholder="Months Taken"
                  {...register("duration", {
                    required: {
                      value: true,
                      message: "Duration is Required",
                    },
                  })}
                />

                <select
                  name="duration_type"
                  {...register("duration_type", {
                    required: {
                      value: true,
                      message: "Duration Type is Required",
                    },
                  })}
                >
                  <option value="months">Month</option>
                  <option value="year">Year</option>
                </select>
              </MonthsTakenBox>

              <CustomErrorText errorMessage={errors.duration?.message} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PowerCapacityBox error={!!errors.power_capacity}>
                <input
                  type="number"
                  placeholder="Capacity"
                  {...register("power_capacity", {
                    required: {
                      value: true,
                      message: "Capacity is Required",
                    },
                  })}
                />

                <select
                  name="capacity_type"
                  {...register("power_capacity_type", {
                    required: {
                      value: true,
                      message: "Capacity Type is Required",
                    },
                  })}
                >
                  <option value="kw">Kw</option>
                  <option value="mw">Mw</option>
                </select>
              </PowerCapacityBox>
              <CustomErrorText errorMessage={errors.power_capacity?.message} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="selectedCategory"
                render={({ field }) => (
                  <SolrufTextField
                    size="small"
                    select
                    label="Select Category"
                    {...field}
                  >
                    {categories.map((category) => (
                      <MenuItem value={category?.category_id}>
                        {category?.name}
                      </MenuItem>
                    ))}
                  </SolrufTextField>
                )}
              ></Controller>
            </Grid>

            <Grid item xs={12} md={12}>
              <SolrufTextField
                size="small"
                label="Video URL"
                {...register("video_url")}
                sx={{ width: "100%", mb: 3, mt: [3, 3] }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CustomTextArea
                rows="5"
                style={{ marginTop: "0" }}
                placeholder="Description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
              ></CustomTextArea>
              <CustomErrorText
                sx={{ mt: -3.5 }}
                errorMessage={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              {/* <SolrufAccordion /> */}

              <CustomAccordion
                title="Project Cost and Return On Investment"
                noPadding={window.innerWidth <= 600}
              >
                <Grid container columnSpacing={3}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SolrufTextField
                      size="small"
                      label="Project Cost"
                      type="text"
                      iconText={<Typography variant="body2">INR</Typography>}
                      {...register("project_cost")}
                      // error={errors.cost}
                      // helperText={
                      //    errors.cost ? errors.cost.message : ' '
                      // }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <ReturnPeriodBox error={errors.return_amount}>
                      <input
                        type="number"
                        placeholder="Return Period"
                        {...register("return_period", {
                          required: {
                            value: true,
                            message: "Return Period is Required",
                          },
                        })}
                      />

                      <select
                        name="return_period_type"
                        {...register("return_period_type", {
                          required: {
                            value: true,
                            message: "Period Type is Required",
                          },
                        })}
                      >
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </ReturnPeriodBox>
                    <CustomErrorText
                      errorMessage={errors?.return_period?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SolrufTextField
                      size="small"
                      label="Amount of Return"
                      type="text"
                      iconText={<Typography variant="body2">INR</Typography>}
                      {...register("return_amount", {
                        required: {
                          value: true,
                          message: "Return amount is required",
                        },
                      })}
                      error={errors.return_amount}
                      helperText={
                        errors.return_amount
                          ? errors.return_amount.message
                          : " "
                      }
                    />
                  </Grid>
                </Grid>
              </CustomAccordion>

              <CustomAccordion
                title="Location"
                noPadding={window.innerWidth <= 600}
              >
                <Grid container columnSpacing={3} rowSpacing={1}>
                  <Grid item xs={12} md={6} lg={4}>
                    <SolrufTextField
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      defaultValue={
                        projectToBeEdited ? projectToBeEdited.pincode : ""
                      }
                      label="Pin Code"
                      type="text"
                      {...register("pincode", {
                        required: {
                          value: true,
                          message: "Pin Code is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Pin Code must be 6 digits",
                        },
                      })}
                      error={errors.pincode}
                      helperText={errors.pincode ? errors.pincode.message : " "}
                    />
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <Controller
                      control={control}
                      name="state"
                      render={({ field }) => (
                        <SolrufTextField
                          size="small"
                          select
                          label="State"
                          {...field}
                        >
                          {statesOfIndia.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </SolrufTextField>
                      )}
                    ></Controller>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <SolrufTextField
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        mt: [3, 0],
                      }}
                      label="City/District"
                      {...register("city", {
                        required: {
                          value: true,
                          message: "District is required!",
                        },
                      })}
                      error={errors.city}
                      helperText={errors.city ? errors.city.message : " "}
                    />
                  </Grid>
                </Grid>
              </CustomAccordion>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  my: 4,
                  ml: 2,
                }}
              >
                <Typography variant="h6" sx={{ mr: 5 }}>
                  Add Review
                </Typography>
                <SolrufSwitch
                  checked={reviewChecked}
                  onChange={reviewCheckHandler}
                />
              </Box>

              {reviewChecked && (
                <Box sx={{ mx: [0, 2] }}>
                  <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                      <SolrufTextField
                        size="small"
                        defaultValue={
                          projectToBeEdited?.reviews.length > 0
                            ? projectToBeEdited?.reviews[0]["customer_name"]
                            : ""
                        }
                        label="Customer Name"
                        type="text"
                        {...register("customer_name", {
                          required: {
                            value: reviewChecked,
                            message: "Customer Name is required",
                          },
                        })}
                        error={errors.customer_name}
                        helperText={
                          errors.customer_name
                            ? errors.customer_name.message
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextArea
                        defaultValue={
                          projectToBeEdited?.reviews.length > 0
                            ? projectToBeEdited?.reviews[0]["customer_review"]
                            : ""
                        }
                        rows="5"
                        placeholder="Customer Review"
                        style={{ marginTop: "1rem" }}
                        {...register("customer_review", {
                          required: {
                            value: reviewChecked,
                            message: "Customer review is required",
                          },
                        })}
                      ></CustomTextArea>
                      <CustomErrorText
                        sx={{ mt: -3.5 }}
                        errorMessage={errors?.customer_review?.message}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              <CustomAccordion
                title="Upload Image"
                noPadding={window.innerWidth <= 600}
              >
                <Grid container columnSpacing={3}>
                  <Grid item xs={12} lg={4}>
                    <FileInputBox
                      {...getRootProps()}
                      sx={{
                        height: { sm: 200, xs: 60 },
                        padding: { sm: "10px", xs: "5px" },
                        maxWidth: { sm: "300px", xs: "100%" },
                      }}
                    >
                      <input {...getInputProps()} />

                      <DottedBox
                        sx={{
                          flexDirection: ["row", "column"],
                        }}
                      >
                        <Box
                          component="img"
                          src={add_logo_svg}
                          alt=""
                          sx={{
                            width: { sm: "70px", xs: "30px" },
                            height: { sm: "70px", xs: "30px" },
                          }}
                        />

                        <Typography
                          variant="body2"
                          textAlign="center"
                          sx={{ mb: [0, 2] }}
                        >
                          Add image (Upto 5 mb jpg, jpeg format)
                        </Typography>
                      </DottedBox>
                    </FileInputBox>
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    <Box
                      sx={{
                        background: "",
                        p: { xs: 0, sm: 2 },
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      {projectImages.map((fileWrapper, i) => {
                        return fileWrapper?.errors?.length ? (
                          <UploadError
                            key={i}
                            file={fileWrapper.file}
                            errors={fileWrapper.errors}
                            onDelete={deleteHandler}
                          />
                        ) : (
                          <SingleFIleUploadWithProgress
                            key={i}
                            file={fileWrapper.file}
                            onDelete={deleteHandler}
                            onFileUpload={onFileUpload}
                          />
                        );
                      })}

                      {projectToBeEdited &&
                        prevImages.map(({ id, url }) => (
                          <React.Fragment>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#F3F3F3",
                                padding: "10px",
                                marginTop: "15px",
                                borderRadius: "5px",
                              }}
                            >
                              <img
                                src={url}
                                alt=""
                                style={{
                                  maxWidth: "100%",
                                  width: "70px",
                                  height: "auto",
                                }}
                              />

                              <Button
                                color="secondary"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "1.2rem",
                                  borderBottom: "0 !important",
                                }}
                                onClick={() => onImageDelete(id)}
                              >
                                <CloseIcon />
                              </Button>
                            </Box>
                            {/* <hr /> */}
                          </React.Fragment>
                        ))}
                    </Box>
                  </Grid>
                  {/* <DesignLayoutUploadWithProgress /> */}
                </Grid>
              </CustomAccordion>

              <Box
                sx={{
                  display: ["none", "flex"],
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <PrimaryButton
                  sx={{
                    px: 4,
                    py: 1.5,
                    width: { xs: "100%", sm: "auto" },
                  }}
                  type="submit"
                  // onClick={handleSubmit(submitHandler)}
                >
                  Save
                </PrimaryButton>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: ["flex", "none"],
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 4,
              position: "fixed",
              bottom: "0",
              width: "100%",
              left: 0,
            }}
          >
            <PrimaryButton
              sx={{
                width: { xs: "100%", sm: "auto" },
              }}
              type="submit"
            >
              Save
            </PrimaryButton>
          </Box>
        </Box>
      </AddProjectBox>
    </Box>
  );
};

export default AddProject;
