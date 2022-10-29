import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, MenuItem, Typography } from "@mui/material";
import SolrufTextField from "../../components/TextField/TextField";
import { useDropzone } from "react-dropzone";
import UploadError from "../MyPortfolio/UploadError";
import SingleFIleUploadWithProgress from "../MyPortfolio/SingleFIleUploadWithProgress";
import { motion } from "framer-motion";
// accordion
import CustomAccordion from "../../components/CustomAccordion/CustomAccordion";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import YellowButton from "../../components/YellowButton/YellowButton";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { axiAuth } from "../../utils/axiosInstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { autoGenerativeContentForProjectDescription } from "../../utils/constant";

const AddProjectBox = styled(Box)(({ theme }) => {
  return {
    background: "#ffffff",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(3),
    position: "relative",
    marginTop: theme.spacing(3),
  };
});

const FileInputBox = styled(Box)(({ theme }) => {
  return {
    "& img": {
      maxWidth: "100%",
    },
  };
});

const PowerCapacityBox = styled(Box)(({ theme }) => {
  return {
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    height: "54px",
    marginTop: "3px",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "2px solid #FFD05B",
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

const MonthsTakenBox = styled(Box)(({ theme }) => {
  return {
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    height: "54px",
    marginTop: "3px",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "2px solid #FFD05B",
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

const ReturnPeriodBox = styled(Box)(({ theme }) => {
  return {
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    height: "54px",
    marginTop: "3px",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "2px solid #FFD05B",
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

const AddProjectForMobile = () => {
  const [projectImages, setProjectImages] = useState([]);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedAcceptedFiles = acceptedFiles.map((file) => {
      return {
        file,
        error: [],
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
    maxSize: 5000000,
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

  const [category_id, setCategory_id] = useState("");

  const handleTagChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setCategory_id(e.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: autoGenerativeContentForProjectDescription,
    },
  });

  const submitHandler = async (formData) => {
    console.log(formData);
    console.log(projectImages);
    const projectData = {};
    projectData.category_id = category_id;
    projectData.name = formData.name;
    projectData.description = formData.description;
    projectData.tag = tag;
    projectData.power_capacity = formData.power_capacity;
    projectData.power_capacity_type = formData.power_capacity_type;
    projectData.duration = formData.duration;
    projectData.duration_type = formData.duration_type;
    projectData.cost = formData.cost;
    projectData.return_period = formData.return_period;
    projectData.return_period_type = formData.return_period_type;
    projectData.return_amount = formData.return_amount;
    projectData.images = projectImages.map((fw) => fw.url);
    projectData.city = formData.city;
    projectData.state = formData.state;
    projectData.pincode = formData.pincode;

    console.log(projectData);

    try {
      const { data } = await axiAuth.post("api/vendor/projects", projectData);
      console.log(data);
      if (data.message === "Project created successfully") {
        reset();
        setProjectImages([]);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log("errors", errors);

  const [tag, setTag] = useState(0);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      axiAuth.get("api/categories").then(({ data }) => {
        console.log(data);
        setCategories(data.categories);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <motion.div
      initial={{ x: "10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <AddProjectBox>
        <Box component="form" onSubmit={handleSubmit(submitHandler)}>
          {/* nav section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <ArrowBackIcon
              sx={{ fontSize: 40, cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {tag === 0 ? (
                <PushPinOutlinedIcon
                  sx={{
                    fontSize: "40px",
                    cursor: "pointer",
                    color: "#ffd05b",
                  }}
                  onClick={() => setTag(1)}
                />
              ) : (
                <PushPinIcon
                  sx={{
                    fontSize: "40px",
                    cursor: "pointer",
                    color: "#ffd05b",
                  }}
                  onClick={() => setTag(0)}
                />
              )}
              <YellowButton style={{ marginLeft: "1rem" }} type="submit">
                Submit
              </YellowButton>
            </Box>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <SolrufTextField
                label="Product Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <MonthsTakenBox>
                <input
                  type="number"
                  placeholder="Months Taken"
                  {...register("duration", {
                    required: {
                      value: true,
                      message: "Duration is Required",
                    },
                  })}
                  name="duration"
                  onChange={(event) => +event.target.value}
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
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <PowerCapacityBox>
                <input
                  type="number"
                  placeholder="Capacity"
                  {...register("power_capacity", {
                    required: {
                      value: true,
                      message: "Capacity is Required",
                    },
                  })}
                  name="power_capacity"
                  onChange={(event) => +event.target.value}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelect
                sx={{ mt: 0.6 }}
                name="fieldName"
                value={category_id}
                label="Project Category"
                changeHandler={handleTagChange}
              >
                {categories.map((category) => (
                  <MenuItem
                    value={category?.category_id}
                    key={category.category_id}
                  >
                    {category?.name + category?.id}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} md={12}>
              <CustomTextArea
                rows="5"
                placeholder="Description (1000 characters)"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                style={{ marginTop: ".3rem" }}
              ></CustomTextArea>
            </Grid>

            <Grid item md={12}>
              {/* <SolrufAccordion /> */}

              <CustomAccordion
                title="Project Cost and Return On Investment"
                noPadding={true}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SolrufTextField
                      label="Project Cost"
                      type="text"
                      iconText={<Typography variant="body2">INR</Typography>}
                      size="large"
                      {...register("cost", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <ReturnPeriodBox>
                      <input
                        type="number"
                        placeholder="Return Period"
                        {...register("return_period", {
                          required: {
                            value: true,
                            message: "Return Period is Required",
                          },
                        })}
                        name="return_period"
                        onChange={(event) => +event.target.value}
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
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SolrufTextField
                      label="Amount of Return"
                      type="text"
                      iconText={<Typography variant="body2">INR</Typography>}
                      size="large"
                      {...register("return_amount", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                  </Grid>
                </Grid>
              </CustomAccordion>

              <CustomAccordion title="Location" noPadding={true}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SolrufTextField
                      label="State"
                      type="text"
                      {...register("state", {
                        required: {
                          value: true,
                          message: "State is required",
                        },
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SolrufTextField
                      label="City/District"
                      type="text"
                      size="small"
                      {...register("city", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SolrufTextField
                      label="Pin Code"
                      type="text"
                      size="large"
                      {...register("pincode", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                  </Grid>
                </Grid>
              </CustomAccordion>

              <CustomAccordion title="Customer Details" noPadding={true}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <SolrufTextField
                      label="Customer Name"
                      type="text"
                      size="small"
                      {...register("customer_name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextArea
                      rows="5"
                      placeholder="Customer Review"
                      {...register("customer_review", {
                        required: {
                          value: true,
                          message: "Review is required",
                        },
                      })}
                      style={{ marginTop: "0rem" }}
                    ></CustomTextArea>
                  </Grid>
                </Grid>
              </CustomAccordion>

              <CustomAccordion title="Upload Image">
                <Grid container columnSpacing={3}>
                  <Grid item xs={12} md={12} lg={4}>
                    <FileInputBox {...getRootProps()}>
                      <input {...getInputProps()} />
                      <img
                        src="https://i.ibb.co/C23nQcK/Frame-165.png"
                        alt=""
                      />
                    </FileInputBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={5}>
                    <Box
                      sx={{
                        background: "",
                        p: 2,
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
                    </Box>
                  </Grid>
                  {/* <DesignLayoutUploadWithProgress /> */}
                </Grid>
              </CustomAccordion>
            </Grid>
            <Grid item xs={12}>
              <YellowButton
                style={{ width: "100%", marginTop: "1rem" }}
                type="submit"
              >
                Submit
              </YellowButton>
            </Grid>
          </Grid>
        </Box>
      </AddProjectBox>
    </motion.div>
  );
};

export default AddProjectForMobile;
