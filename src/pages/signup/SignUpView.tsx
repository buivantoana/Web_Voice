import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import background_gif from "../../images/source.gif";
import logo from "../../images/loading-lines-6747317-5601928.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomTextField from "../../components/CustomTextField";
import { Link } from "react-router-dom";
type Props = {};

const SignUpView = (props: Props) => {
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
            top: "40px",
            left: "40px",
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
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <img width={50} src={logo} alt='' />
            <Typography color='active.main' variant='h2'>
              Text To Speech OpenAI
            </Typography>
          </Box>
          <Box
            mt={"20px"}
            width={"340px"}
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
              <Typography variant='h5' fontWeight={"bold"}>
                Tạo tài khoản
              </Typography>
              <Typography
                sx={{ display: "flex", gap: "5px" }}
                color='grey_500.main'>
                Đã có tài khoản ?{" "}
                <Link to={"/signin"}>
                  <Typography color='active.main' fontWeight={"500"}>
                    Đăng nhập
                  </Typography>
                </Link>
              </Typography>
            </Box>
            <Box>
              <CustomTextField label={"Tên của bạn"} />
              <CustomTextField label={"Địa chỉ email của bạn."} />
              <CustomTextField label={"Mật khẩu"} />
              <CustomTextField label={"Xác nhận mật khẩu"} />
              <CustomTextField label={"Mã mời (Tùy chọn)"} />
              <Button
                variant='contained'
                sx={{
                  background: theme.palette.active.main,
                  mt: "15px",
                  width: "100%",
                }}>
                Tạo tài khoản
              </Button>
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
    </Box>
  );
};

export default SignUpView;
