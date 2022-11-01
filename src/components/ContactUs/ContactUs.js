import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  ContactDetails,
  ContactUsWrapper,
  Title,
  SocialIcons,
  LinkListWithIcon,
  ContactList,
  ContactForm,
  FormLabel,
  FormField,
} from "./ContactUsStyle";
import SolrufTextField from "../TextField/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useForm } from "react-hook-form";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import YouTubeIcon from "@mui/icons-material/YouTube";

import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [subscribe, setSubscribe] = useState(true);

  const submitHandler = async (formData, e) => {
    console.log(formData);

    try {
      axios.post(
        "https://sheet.best/api/sheets/b0c3e070-a8e0-443e-868e-932170e60367",
        {
          ...formData,
          subscribe: subscribe ? "yes" : "no",
        }
      );

      axios.post("https://api-dev.solruf.com/api/contact-us", {
        ...formData,
        subscribe: subscribe ? "yes" : "no",
      });

      toast.success("Your Message was sent!");
    } catch (err) {
      console.log("error in sending contact us mail", err);
    }

    reset();
    setSubscribe(true);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${"https://solruf.s3.ap-south-1.amazonaws.com/Image+Assets/home/contactUsBg.svg"})`,
        backgroundSize: "cover",
        py: "3rem",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          transform: "translateY(-8rem)",
          "@media (max-width: 600px)": {
            transform: "translateY(-10rem)",
          },
        }}
        id="contact-us"
      />
      <Container maxWidth="xl">
        <ContactUsWrapper>
          <ContactDetails>
            <Title>
              <Typography
                variant="h3"
                sx={{ fontWeight: "600", color: "white" }}
              >
                Let's Start a Conversation <br />
                <span
                  style={{
                    color: "#FFC000",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  Ask us anything!
                </span>
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: "white",
                  fontSize: "1.2rem",
                  "@media (max-width: 600px)": {
                    fontSize: "1rem",
                  },
                }}
              >
                Fill up the form and our Team will get back to you in 24 hours
              </Typography>
            </Title>

            <ContactList>
              <LinkListWithIcon
                component="a"
                href="tel:+919932383997"
                // dataAction="share/whatsapp/share"
                sx={{ my: 1.5 }}
              >
                <PhoneEnabledIcon
                  sx={{
                    color: "#ffd05b",
                    mr: 1,
                    transform: "rotate(90deg)",
                    fontSize: "2rem",
                  }}
                />
                <span>+91-9932383997</span>
              </LinkListWithIcon>
              <LinkListWithIcon component="a" href="mailto:sumit@solruf.com">
                <EmailIcon sx={{ color: "#ffd05b", mr: 1, fontSize: "2rem" }} />
                <span>sumit@solruf.com</span>
              </LinkListWithIcon>
              <LinkListWithIcon component={Link} to="/">
                <LocationOnIcon
                  sx={{ color: "#ffd05b", mr: 1, fontSize: "2rem" }}
                />
                <span>
                  Agarwal Bunglaw, Behind Atul Mangal Karyalaya, Rukmini Nagar,
                  Amravati, Maharashtra, India, 444606
                </span>
              </LinkListWithIcon>
            </ContactList>
            <SocialIcons>
              <a
                href="https://www.facebook.com/solrufco"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon
                  sx={{
                    fontSize: "3rem",
                    "@media (max-width: 600px)": {
                      fontSize: "2rem",
                    },
                  }}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/solruf/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon
                  sx={{
                    fontSize: "3rem",
                    "@media (max-width: 600px)": {
                      fontSize: "2rem",
                    },
                  }}
                />
              </a>
              <a
                href="https://www.instagram.com/solrufco/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon
                  sx={{
                    fontSize: "3rem",
                    "@media (max-width: 600px)": {
                      fontSize: "2rem",
                    },
                  }}
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCwQlCuStfqD7eP_rxAsYs6w"
                target="_blank"
                rel="noreferrer"
              >
                <YouTubeIcon
                  sx={{
                    fontSize: "3rem",
                    "@media (max-width: 600px)": {
                      fontSize: "2rem",
                    },
                  }}
                />
              </a>
            </SocialIcons>
          </ContactDetails>
          <ContactForm component="form" onSubmit={handleSubmit(submitHandler)}>
            <FormField>
              <FormLabel>Name</FormLabel>
              <SolrufTextField
                size="small"
                label="Name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "#ffffff",
                  },
                }}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                error={errors?.name}
                helperText={errors.name && errors.name.message}
              />
            </FormField>
            <FormField>
              <FormLabel>Phone Number</FormLabel>
              <SolrufTextField
                size="small"
                label="Phone Number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "#ffffff",
                  },
                }}
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone Number is required",
                  },
                })}
                error={errors?.name}
                helperText={errors.name && errors.name.message}
              />
            </FormField>
            <FormField>
              <FormLabel>Email (Optional)</FormLabel>
              <SolrufTextField
                size="small"
                label="Email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "#ffffff",
                  },
                }}
                {...register("email")}
                error={errors?.name}
                helperText={errors.name && errors.name.message}
              />
            </FormField>
            <FormField>
              <FormLabel>Message</FormLabel>
              <SolrufTextField
                size="small"
                label="Message"
                multiline
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "#ffffff",
                  },
                }}
                {...register("message", {
                  required: {
                    value: true,
                    message: "Message is required",
                  },
                })}
                error={errors?.name}
                helperText={errors.name && errors.name.message}
              />
            </FormField>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSubscribe(!subscribe);
                }}
              />
              <FormControlLabel
                control={<Checkbox checked={subscribe} />}
                label="Would you like to hear more about our platform from us"
                onClick={() => {
                  setSubscribe(!subscribe);
                }}
              />
            </Box>
            <PrimaryButton
              sx={{
                py: 1.5,
                width: "100%",
              }}
              variant="primary"
              type="submit"
            >
              Submit
            </PrimaryButton>
          </ContactForm>
        </ContactUsWrapper>
      </Container>
    </Box>
  );
};

export default ContactUs;
