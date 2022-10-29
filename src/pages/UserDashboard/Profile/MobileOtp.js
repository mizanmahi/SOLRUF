import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { axiAuth } from "../../../utils/axiosInstance";
import Loader from "../../../components/Loader/Loader";
import YellowButton from "../../../components/YellowButton/YellowButton";
import SolrufTextField from "../../../components/TextField/TextField";
import { closeLoginModal } from "../../../redux/slices/loginModalSlice";
import { toast } from "react-toastify";
import { setOtpSendMode,  setVerificationMode2 } from "../../../redux/mobileVerifyStepSlice";

const Wrapper = styled(Box)(({ theme }) => ({}));
const Form = styled(Box)(({ theme }) => ({}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
}));
const Nav = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
  "& p": {
    textTransform: "uppercase ",
    fontSize: "11px",
    fontWeight: "bold",
  },
  "& svg": {
    cursor: "pointer",
    color: "gray",
  },
}));

const MobileOtp = ({ newPhone, setMobileVerified,setValue,setmobileVerifyOpen }) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { sendOtpMode, verificationMode, verificationMode2 } = useSelector(
    (state) => state.mobileVerifyMode
  ); // mode switching state

  // console.log(from)

  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [mobile] = watch(['phone']);

  useEffect(() => {
   setValue('phone',mobile)
   }, [mobile, setValue]);

  const sendOtp = async (userInputs) => {
    const { phone, otp } = userInputs;
    if (sendOtpMode) {
      setSendingOtp(true);
      await axiAuth.post("api/mobile-update/init", {
        mobile: phone,
      })
      .then((data) => {
        if (data.data.message === "OTP Sent") {
          // if (true) {
          console.log("OTP Sent");
          setPhone(phone);
          dispatch(setOtpSendMode(false));
          setSendingOtp(false);
          dispatch(setVerificationMode2(true));
        }
      })
      .catch((error) => {
         if(error.response.status === 422){
            toast.error(error.response.data.message);
         }
         setSendingOtp(false);
      })
    }

    if (verificationMode || verificationMode2) {
      setVerifying(true);
      axiAuth
        .post("api/mobile-update/verify", {
          mobile: phone.toString(),
          otp: parseInt(otp),
        })
        .then((res) => {
          console.log(res);
          if (res.data.message === "OTP verification successful") {
            console.log("OTP Verified", res.data);
            setOtpError("");
            dispatch(setVerificationMode2(false));
            dispatch(setOtpSendMode(false));
            setVerifying(false);
            dispatch(closeLoginModal());
            setmobileVerifyOpen(false)
            setMobileVerified({ isVerified: true, mobileNo: phone });
            toast.success("Mobile number successfully verify!");
          } else {
            console.log("Fail otp verifyyyyyyyyyyyyyyyy");
          }
        })
        .catch((err) => {
          setOtpError("Invalid OTP");
          setVerifying(false);
          console.log("error raisssssssssssss", err);
        });
    }
  };

  const backHandler = () => {
    setOtpError("");
      dispatch(setVerificationMode2(false));
      dispatch(setOtpSendMode(true));
  };

  const resendOtpHandler = async () => {
    try {
      const { data } = await axiAuth.post("api/mobile-update/init", {
        mobile: phone,
      });
      if (data.message === "OTP Sent") {
        console.log("OTP Resend");
        toast.success("OTP resend successfully!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Form component={"form"} onSubmit={handleSubmit(sendOtp)}>
        {sendOtpMode && (
          <>
            <FormTitle>Verify mobile no.</FormTitle>
            <SolrufTextField
              defaultValue = {newPhone}
              type="number"
              label="Enter Your Number"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Please input a number to continue",
                },
                minLength: {
                  value: 10,
                  message: "Number must be at least 10 characters long",
                },
                maxLength: {
                  value: 10,
                  message: "Number must be at most 10 characters long",
                },
              })}
              error={errors.phone}
              helperText={errors.phone && errors.phone.message}
            />
            {sendingOtp ? (
              <Loader />
            ) : (
              <YellowButton
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "1rem",
                  fontSize: "1.2rem",
                }}
                type="submit"
              >
                Send OTP
              </YellowButton>
            )}
          </>
        )}

        {verificationMode && (
          <>
            <FormTitle>Verify OTP</FormTitle>
            <Nav>
              <ArrowBackIcon onClick={backHandler} />
              <Typography>Enter OTP sent to {phone}</Typography>
            </Nav>
            <SolrufTextField
              sx={{ appearance: "none" }}
              value = "kk"
              onChange={() => setOtpError("")}
              type="number"
              label="Enter OTP"
              {...register("otp", {
                required: {
                  value: true,
                  message: "Please input OTP to continue",
                },
                minLength: {
                  value: 4,
                  message: "OTP must be at least 4 characters long",
                },
                maxLength: {
                  value: 4,
                  message: "OTP must be at most 4 characters long",
                },
              })}
              error={errors.otp}
              helperText={errors.otp ? errors.otp.message : ""}
            />
            <Typography
              sx={{ mt: 1.5, textAlign: "center", color: "error.main" }}
            >
              {otpError}
            </Typography>
            <Box sx={{ my: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "gray", textAlign: "center" }}
              >
                Didn't receive OTP?{" "}
              </Typography>
              <Typography
                component="a"
                sx={{
                  textDecoration: "underline !important",
                  color: "blue",
                  textAlign: "center",
                  display: "block",
                  cursor: "pointer",
                }}
                onClick={resendOtpHandler}
              >
                Resend OTP
              </Typography>
            </Box>
            {verifying ? (
              <Loader />
            ) : (
              <YellowButton
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "1rem",
                  fontSize: "1.2rem",
                }}
                type="submit"
              >
                Submit
              </YellowButton>
            )}
          </>
        )}

        {verificationMode2 && (
          <>
            <FormTitle>Verify OTP</FormTitle>
            <Nav>
              <ArrowBackIcon onClick={backHandler} />
              <Typography>Enter OTP sent to {phone}</Typography>
            </Nav>
            <SolrufTextField
              sx={{ appearance: "none" }}
              onChange={() => setOtpError("")}
              type="number"
              label="Enter OTP"
              {...register("otp", {
                required: {
                  value: true,
                  message: "Please input OTP to continue",
                },
                minLength: {
                  value: 4,
                  message: "OTP must be at least 4 characters long",
                },
                maxLength: {
                  value: 4,
                  message: "OTP must be at most 4 characters long",
                },
              })}
              error={errors.otp}
              helperText={errors.otp ? errors.otp.message : ""}
            />
            <Typography
              sx={{ mt: 1.5, textAlign: "center", color: "error.main" }}
            >
              {otpError}
            </Typography>
            <Box sx={{ my: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "gray", textAlign: "center" }}
              >
                Didn't receive OTP?{" "}
              </Typography>
              <Typography
                component="a"
                sx={{
                  textDecoration: "underline !important",
                  color: "blue",
                  textAlign: "center",
                  display: "block",
                  cursor: "pointer",
                }}
                onClick={resendOtpHandler}
              >
                Resend OTP
              </Typography>
            </Box>
            {verifying ? (
              <Loader />
            ) : (
              <YellowButton
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "1rem",
                  fontSize: "1.2rem",
                }}
                type="submit"
              >
                Submit
              </YellowButton>
            )}
          </>
        )}
      </Form>
    </Wrapper>
  );
};
export default MobileOtp;
