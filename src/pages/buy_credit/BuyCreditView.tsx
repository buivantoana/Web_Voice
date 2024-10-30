import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import RemoveIcon from "@mui/icons-material/Remove";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import {
  Box,
  Button,
  Slider,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { RiPaypalFill } from "react-icons/ri";
import user from "../../images/user.png";

const BuyCreditView = () => {
  const theme: any = useTheme();
  return (
    <Box padding={"2% 10%"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box sx={{ width: "33%", p: 2, cursor: "pointer" }}>
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
            <Typography color='grey_500.main'>toanbui219@gmail.com</Typography>
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
            <Box padding={"2px 8px"} borderRadius={"25px"} bgcolor={"#fdf6b2"}>
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
        </Box>
        <Box
          sx={{ position: "relative" }}
          bgcolor={"white"}
          padding={"10px"}
          minHeight={"102vh"}
          border={"1px solid #dddddd"}
          width={"62%"}>
          <Box
            sx={{
              height: "160px",
              width: "90%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundImage:
                "linear-gradient(64.3deg, rgb(44 117 107 / 1) 17.7%, #ffce86 64.7%, #acfda3a3 112.1%)",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: "5%",
            }}>
            <Typography color='white' fontSize={"1.4rem"}>
              Tín dụng có sẵn
            </Typography>
            <Typography color='white'>0 tín dụng hết hạn</Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "140px",
              left: "3%",
              bgcolor: "rgb(229 233 237)",
              width: "94%",
              borderRadius: "20px",
            }}>
            <Box width={"100%"} padding={"20px 10px"}>
              <Typography fontSize={"1.1rem"}>Nạp tiền nhanh</Typography>
              <Box overflow={"hidden"}>
                <Box
                  mt={"20px"}
                  display={"flex"}
                  gap={"20px"}
                  height={200}
                  px={"10px"}
                  sx={{
                    overflowX: "scroll",
                    overflowY: "hidden", // Ẩn thanh cuộn dọc
                    whiteSpace: "nowrap",
                    width: "93%",
                  }}>
                  {[...Array(8)].map((_, index) => (
                    <Box
                      width={"128px"}
                      sx={{
                        transition:
                          "transform 0.3s ease, background-color 0.3s ease", // Thêm hiệu ứng chuyển tiếp
                        "&:hover": {
                          color: "#ff9800", // Màu chữ khi hover
                          transform: "scale(1.1)", // Tăng kích thước khi hover
                        },
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}>
                      <Box
                        width={"100%"}
                        borderRadius={"20px"}
                        sx={{
                          backgroundImage:
                            "radial-gradient(circle 827px at 47.3% 48%, #fff 0, #8ac0d8 90%)",
                          transition: "background-color 0.3s ease", // Hiệu ứng chuyển tiếp cho màu nền
                        }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px",
                            padding: "15px",
                          }}>
                          <Typography
                            textAlign={"center"}
                            variant='h6'
                            sx={{ color: "inherit" }}>
                            + 200k
                          </Typography>
                          <Typography
                            fontSize={".8rem"}
                            textAlign={"center"}
                            sx={{ color: "inherit" }}>
                            Tín dụng không <br /> hết hạn
                          </Typography>
                          <ArrowDownwardIcon sx={{ color: "inherit" }} />
                        </Box>
                      </Box>
                      <Typography
                        textAlign={"center"}
                        sx={{
                          color: "inherit",
                          transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển tiếp
                        }}>
                        8$
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Typography my={"20px"} fontSize={"1.1rem"}>
                Nạp tiền tuỳ chỉnh
              </Typography>
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={"10px"}
                alignItems={"center"}>
                <Box
                  width={"50%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={"10px"}>
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: theme.palette.active.main,
                    }}>
                    <RemoveIcon sx={{ color: "white" }} />
                  </Box>
                  <Box
                    display={"flex"}
                    color={"#ff9800"}
                    alignItems={"center"}
                    gap={"10px"}>
                    <Box>
                      <Typography variant='h4'>200k</Typography>
                      <Typography>~8$</Typography>
                    </Box>
                    <Typography fontSize={".8rem"}>
                      tín dụng không hết hạn
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: theme.palette.active.main,
                    }}>
                    <AddIcon sx={{ color: "white" }} />
                  </Box>
                </Box>
                <Box width={"45%"}>
                  <Slider
                    defaultValue={50}
                    aria-label='Default'
                    valueLabelDisplay='auto'
                    sx={{
                      color: "#4CAF50", // Đặt màu chính của slider
                      height: 15, // Đặt chiều cao của thanh slider
                      "& .MuiSlider-track": {
                        border: "none", // Loại bỏ viền
                      },
                      "& .MuiSlider-thumb": {
                        width: 24, // Chiều rộng của nút kéo
                        height: 24, // Chiều cao của nút kéo
                        backgroundColor: "#fff", // Màu của nút kéo
                        border: "2px solid currentColor", // Viền của nút kéo
                        "&:hover": {
                          boxShadow: "0 0 0 8px rgba(76, 175, 80, 0.16)", // Hiệu ứng khi hover
                        },
                      },
                      "& .MuiSlider-rail": {
                        opacity: 0.28, // Độ mờ của phần slider không được chọn
                        backgroundColor: "#bfbfbf", // Màu của phần không được chọn
                      },
                    }}
                  />
                </Box>
                <Box width={"50%"}>
                  <Button
                    startIcon={<RiPaypalFill />}
                    sx={{
                      width: "100%",
                      backgroundColor: "#4CAF50", // Màu nền của nút
                      color: "#fff", // Màu chữ
                      "&:hover": {
                        backgroundColor: "#388E3C", // Màu nền khi hover
                      },
                    }}
                    variant='contained'>
                    Nạp ngay bây giờ
                  </Button>
                </Box>
                <Box width={"50%"}>
                  <Typography textAlign={"center"}>
                    ※ 1.000 tín dụng = 1.000 ký tự với chất lượng âm thanh cao
                    cấp (500 ký tự với chất lượng âm thanh HD)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyCreditView;
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
