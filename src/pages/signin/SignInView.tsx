import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { RiArrowLeftLine, RiTiktokFill } from "react-icons/ri";
import background_gif from "../../images/source.gif";
import logo from "../../images/loading-lines-6747317-5601928.webp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
type Props = {
  handleTikTokAuthorizeLink: any;
};

const SignInView = ({ handleTikTokAuthorizeLink }: Props) => {
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
              <LockOutlinedIcon sx={{ fontSize: "45px" }} />
              <Typography variant='h5' fontWeight={"bold"}>
                Chào mừng quay trở lại
              </Typography>
              {/* <Typography
                sx={{ display: "flex", gap: "5px" }}
                color='grey_500.main'>
                Bạn không có tài khoản ?{" "}
                <Link to={"/signup"}>
                  <Typography color='active.main' fontWeight={"500"}>
                    Đăng ký
                  </Typography>
                </Link>
              </Typography> */}
            </Box>
            <Box>
              {/* <CustomTextField label={"Email"} />

              <CustomTextField label={"Mật khẩu"} /> */}
              {/* <Typography
                mt={"5px"}
                textAlign={"right"}
                fontWeight={"500"}
                color='active.main'>
                Quên mật khẩu?
              </Typography> */}
              <Button
                onClick={handleTikTokAuthorizeLink}
                variant='contained'
                sx={{
                  background: theme.palette.active.main,
                  mt: "15px",
                  width: "100%",
                }}
                startIcon={<RiTiktokFill />}>
                Đăng nhập với tiktok
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

export default SignInView;
