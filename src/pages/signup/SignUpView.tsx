import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import background_gif from "../../images/source.gif";
import logo from "../../images/loading-lines-6747317-5601928.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomTextField from "../../components/CustomTextField";
import { Link } from "react-router-dom";
import OTPInput from "react-otp-input";
type Props = {
  setOtp: any;
  otp: any;
  handleOTP: any;
  handleClickOpenOtp: any;
  handleCloseOtp: any;
  openOtp: any;
  setPhone: any;
  phone: any;
  handleChangeOtp: any;
  handleRegister: any;
  handleSubmit: any;
  register: any;
  errors: any;
};

const SignUpView = ({
  handleSubmit,
  otp,
  handleOTP,
  handleChangeOtp,
  handleCloseOtp,
  openOtp,
  setPhone,
  phone,
  handleRegister,
  errors,
  register,
}: Props) => {
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100vh"}>
        <img
          src={background_gif}
          style={{ width: "100%", height: "100%" }}
          alt=''
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          background: "rgb(246 241 241 / 82%)",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backdropFilter: "blur(40px)",
        }}></Box>
      <Link to={"/"}>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "20px", md: "40px" },
            left: { xs: "20px", md: "40px" },
            display: "flex",
            gap: "15px",
            alignItems: "center",
            zIndex: 5,
          }}>
          <RiArrowLeftLine />

          <Typography color='black' fontWeight={"500"}>
            Quay về trang chủ
          </Typography>
        </Box>
      </Link>
      <Box
        sx={{
          position: "absolute",
          zIndex: 4,
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          display={"flex"}
          width={"100%"}
          flexDirection={"column"}
          alignItems={"center"}>
          <Box
            width={{ xs: "300px", md: "410px" }}
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <img width={50} src={logo} alt='' />
            <Typography
              color='active.main'
              variant='h2'
              fontSize={{ xs: "1.3rem", md: "2rem" }}>
              Text To Speech OpenAI
            </Typography>
          </Box>
          <Box
            mt={"20px"}
            width={{ xs: "250px", md: "340px" }}
            sx={{
              borderRadius: "15px",
              padding: "30px 40px",
              background: "#ededed",
              backdropFilter: "blur(14px)",
            }}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"10px"}>
              <AccountCircleIcon sx={{ fontSize: "45px" }} />
              <Typography
                variant='h5'
                fontSize={{ xs: "15px", md: "25px" }}
                fontWeight={"bold"}>
                Tạo tài khoản
              </Typography>
              {/* <Typography
                sx={{ display: "flex", gap: "5px" }}
                color='grey_500.main'>
                Đã có tài khoản ?{" "}
                <Link to={"/signin"}>
                  <Typography color='active.main' fontWeight={"500"}>
                    Đăng nhập
                  </Typography>
                </Link>
              </Typography> */}
            </Box>
            <Box>
              <form onSubmit={handleSubmit(handleOTP)}>
                <CustomTextField
                  register={register}
                  errors={errors}
                  setValue={setPhone}
                  value={phone}
                  label={"Nhập số điện thoại"}
                />
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    background: theme.palette.active.main,
                    mt: "15px",
                    width: "100%",
                  }}>
                  Xác thực OTP
                </Button>
              </form>
              <Typography
                my={"10px"}
                fontSize={".9rem"}
                color='rgb(100 116 139)'
                textAlign={"center"}>
                Bằng cách đăng ký, bạn đồng ý với{" "}
                <Link to={"/terms"}>
                  <span
                    style={{
                      color: theme.palette.active.main,
                      fontWeight: "bold",
                    }}>
                    Điều khoản Dịch vụ
                  </span>{" "}
                </Link>
                của chúng tôi.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        maxWidth='xs' // sets a maximum width
        fullWidth
        open={openOtp}
        onClose={handleCloseOtp}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogContent>
          <Box textAlign={"center"} sx={{ div: { justifyContent: "center" } }}>
            <Typography my={"20px"} variant='h6' fontWeight={"500"}>
              Xác thực OTP
            </Typography>
            <OTPInput
              inputStyle='inputStyle'
              value={otp}
              onChange={handleChangeOtp}
              numInputs={4}
              renderInput={(props: any) => (
                <input
                  className='hidden-plus'
                  {...props}
                  type='number'
                  inputMode='numeric'
                />
              )}
            />
            <Button
              onClick={handleRegister}
              variant='contained'
              sx={{
                background: theme.palette.active.main,
                mt: "25px",
              }}>
              Xác thực OTP
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SignUpView;
