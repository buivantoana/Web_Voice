import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
  useTheme,
  Hidden,
} from "@mui/material";
import { useState } from "react";
import { RiMenuFill, RiNotification2Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/loading-lines-6747317-5601928.webp";

import user from "../images/user.png";
import { useCoursesContext } from "../App";
const Header = () => {
  const theme: any = useTheme();
  const context: any = useCoursesContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: any) => () => {
    setIsOpen(open);
  };
  const [isMenu, setIsMenu] = useState(false);

  const toggleDrawerMenu = (Menu: any) => () => {
    setIsMenu(Menu);
  };
  console.log(context);
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        height: "65px",
        background: "rgb(252 253 254)",
        zIndex: "100",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
          px: "10%",
          py: "5px",
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Hidden mdUp>
            <Box onClick={toggleDrawerMenu(true)}>
              <RiMenuFill />
            </Box>
          </Hidden>
          <Box>
            <img src={logo} width={50} />
          </Box>
          <Hidden mdDown>
            <Box>
              <Typography fontSize={"1.25rem"}>
                Text To Speech OpenAI
              </Typography>
            </Box>
          </Hidden>
        </Box>
        <Hidden mdDown>
          <Box
            border={"1px solid grey"}
            padding={"0 20px"}
            borderRadius={"30px"}
            sx={{ cursor: "pointer" }}>
            <Stack direction={"row"} gap={"20px"}>
              <NavLink to='/'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    color={"grey_500.main"}
                    fontWeight={"500"}>
                    Phát âm
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/history'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    Lịch sử
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/pricing-plans'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    Giá cả dịch vụ
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/privacy'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    Chính sách bảo mật
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/terms'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    Điều khoản dịch vụ
                  </Typography>
                </Box>
              </NavLink>
            </Stack>
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box>
            <Typography fontSize={{ xs: "1rem", lg: "1.25rem" }}>
              Text To Speech OpenAI
            </Typography>
          </Box>
        </Hidden>
        {context.state.user && Object.keys(context.state.user).length > 0 ? (
          <Box
            onClick={toggleDrawer(true)}
            display={"flex"}
            gap={"20px"}
            alignItems={"center"}>
            <RiNotification2Line size={20} />
            <img src={user} style={{ borderRadius: "50%" }} width={50} alt='' />
          </Box>
        ) : (
          <Box>
            <Link to={"/signin"}>
              <Button
                variant='contained'
                sx={{ background: theme.palette.active.main }}
                endIcon={<ArrowForwardIcon />}>
                Đăng nhập
              </Button>
            </Link>
          </Box>
        )}

        <Drawer
          anchor='right' // Đảm bảo anchor là "right"
          open={isOpen}
          PaperProps={{
            sx: {
              width: { xs: "92vw", md: "400px", lg: "400px" }, // Chiều rộng toàn màn hình
              height: "100vh", // Chiều cao toàn màn hình
            },
          }}
          onClose={toggleDrawer(false)}>
          <Box sx={{ p: 2, cursor: "pointer" }} role='presentation'>
            <Box display='flex' justifyContent='end' alignItems='center'>
              <IconButton onClick={toggleDrawer(false)}>
                <HighlightOffIcon sx={{ fontSize: "35px" }} />
              </IconButton>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"8px"}
              flexDirection={"column"}>
              <img
                src={user}
                style={{ borderRadius: "50%" }}
                width={100}
                alt=''
              />
              <Typography variant='h4' fontWeight={"500"}>
                Bui Toan
              </Typography>
              <Typography color='grey_500.main'>
                toanbui219@gmail.com
              </Typography>
            </Box>
            <Box
              mt={"20px"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Box
                gap={"10px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                <CheckCircleOutlineIcon />
                <Typography>Kế hoạch hiện tại</Typography>
              </Box>
              <Box
                padding={"2px 8px"}
                borderRadius={"25px"}
                bgcolor={"#fdf6b2"}>
                <Typography fontWeight={"500"}>Miễn phí</Typography>
              </Box>
            </Box>

            <Box
              mt={"10px"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Box
                gap={"10px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                <StarOutlineOutlinedIcon />

                <Typography>Tín dụng có sẵn</Typography>
              </Box>
              <Box
                padding={"3px 10px"}
                borderRadius={"50%"}
                bgcolor={"rgb(225 239 254)"}>
                <Typography fontWeight={"500"}>0</Typography>
              </Box>
            </Box>
            <Box
              mt={"10px"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Box
                gap={"10px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                <LockClockOutlinedIcon />

                <Typography>Tín dụng bị khóa</Typography>
                <WhiteTooltip
                  title='Chúng tôi khóa tín dụng của bạn để thực hiện công việc bạn yêu cầu. Nếu công việc thất bại hoặc bị hủy, số tín dụng sẽ được trả lại vào tài khoản của bạn.'
                  placement='top'>
                  <HelpIcon fontSize='small' />
                </WhiteTooltip>
              </Box>
              <Box
                padding={"3px 10px"}
                borderRadius={"50%"}
                bgcolor={"rgb(252 232 243)"}>
                <Typography fontWeight={"500"}>0</Typography>
              </Box>
            </Box>
            <Link onClick={toggleDrawer(false)} to={"/buy-credits"}>
              <Box
                mt={"40px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                p={"10px 15px"}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
                  "&:hover": {
                    backgroundColor: "grey_700.main", // Background on hover
                    color: "active.main", // Text and icon color on hover
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "active.main", // Icon color on hover
                  },
                }}
                width={"calc(100%-30px)"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <AddShoppingCartIcon />
                  <Typography> Mua tín dụng</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawer(false)} to={"/payment-history"}>
              <Box
                mt={"20px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                p={"10px 15px"}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
                  "&:hover": {
                    backgroundColor: "grey_700.main", // Background on hover
                    color: "active.main", // Text and icon color on hover
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "active.main", // Icon color on hover
                  },
                }}
                width={"calc(100%-30px)"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <DescriptionIcon />
                  <Typography> Lịch sử thanh toán</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawer(false)} to={"/profile"}>
              <Box
                mt={"20px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                p={"10px 15px"}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
                  "&:hover": {
                    backgroundColor: "grey_700.main", // Background on hover
                    color: "active.main", // Text and icon color on hover
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "active.main", // Icon color on hover
                  },
                }}
                width={"calc(100%-30px)"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <ContactMailIcon />
                  <Typography> Thông tin tài khoản</Typography>
                </Box>
              </Box>
              <Box
                mt={"20px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                p={"10px 15px"}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
                  "&:hover": {
                    backgroundColor: "grey_700.main", // Background on hover
                    color: "active.main", // Text and icon color on hover
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "active.main", // Icon color on hover
                  },
                }}
                width={"calc(100%-30px)"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <LogoutIcon />
                  <Typography>Đăng xuất </Typography>
                </Box>
              </Box>
            </Link>
          </Box>
        </Drawer>
        <Drawer
          anchor='left' // Đảm bảo anchor là "right"
          open={isMenu}
          PaperProps={{
            sx: {
              width: { xs: "92vw" }, // Chiều rộng toàn màn hình
              height: "100vh", // Chiều cao toàn màn hình
            },
          }}
          onClose={toggleDrawerMenu(false)}>
          <Box sx={{ p: 2, cursor: "pointer" }} role='presentation'>
            <Box display='flex' justifyContent='end' alignItems='center'>
              <IconButton onClick={toggleDrawerMenu(false)}>
                <HighlightOffIcon sx={{ fontSize: "35px" }} />
              </IconButton>
            </Box>
            <Box>
              <Typography fontWeight={"500"} fontSize={"1.2rem"}>
                Điều hướng
              </Typography>
            </Box>
            <Link onClick={toggleDrawer(false)} to={"/buy-credits"}>
              <Box
                mt={"10px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                p={"10px 15px"}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
                  "&:hover": {
                    backgroundColor: "grey_700.main", // Background on hover
                    color: "active.main", // Text and icon color on hover
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "active.main", // Icon color on hover
                  },
                }}
                width={"calc(100%-30px)"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <AddShoppingCartIcon />
                  <Typography> Mua tín dụng</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawer(false)} to={"/payment-history"}>
              <Box
                mt={"20px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                p={"10px 15px"}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
                  "&:hover": {
                    backgroundColor: "grey_700.main", // Background on hover
                    color: "active.main", // Text and icon color on hover
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "active.main", // Icon color on hover
                  },
                }}
                width={"calc(100%-30px)"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <DescriptionIcon />
                  <Typography> Lịch sử thanh toán</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawer(false)} to={"/profile"}>
              <Box
                mt={"20px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                p={"10px 15px"}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
                  "&:hover": {
                    backgroundColor: "grey_700.main", // Background on hover
                    color: "active.main", // Text and icon color on hover
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "active.main", // Icon color on hover
                  },
                }}
                width={"calc(100%-30px)"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <ContactMailIcon />
                  <Typography> Thông tin tài khoản</Typography>
                </Box>
              </Box>
              <Box
                mt={"20px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                p={"10px 15px"}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
                  "&:hover": {
                    backgroundColor: "grey_700.main", // Background on hover
                    color: "active.main", // Text and icon color on hover
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "active.main", // Icon color on hover
                  },
                }}
                width={"calc(100%-30px)"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <LogoutIcon />
                  <Typography>Đăng xuất </Typography>
                </Box>
              </Box>
            </Link>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
const WhiteTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "white", // Set background to white
    color: "black", // Set text color to black for contrast
    border: "1px solid #ddd", // Optional border
    fontSize: "0.875rem", // Adjust font size if needed
  },
});
