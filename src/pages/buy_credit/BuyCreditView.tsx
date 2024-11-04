import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveIcon from "@mui/icons-material/Remove";
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
import LeftProfile from "../../components/LeftProfile";
const buy_amount = [
  { amount: 200, type: "K" },
  { amount: 400, type: "K" },
  { amount: 1, type: "M" },
  { amount: 1.4, type: "M" },
  { amount: 2, type: "M" },
  { amount: 2.4, type: "M" },
  { amount: 3, type: "M" },
  { amount: 3.4, type: "M" },
  { amount: 4, type: "M" },
];
const BuyCreditView = ({
  amount,
  handleSliderChange,
  setAmount,
  handleClickOpenQr,
}: any) => {
  const theme: any = useTheme();
  const formatAmount = (value: any) => {
    if (value < 1) {
      return `${(value * 1000).toFixed(0)}K`; // Nếu dưới 1, hiển thị K
    } else {
      return `${value.toFixed(1)}M`; // Nếu từ 1 trở lên, hiển thị M
    }
  };
  return (
    <Box padding={"2% 10%"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <LeftProfile />
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
              cursor: "pointer",
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
                  {buy_amount.map((_, index) => (
                    <Box
                      width={"128px"}
                      onClick={() => {
                        if (_.amount == 200 || _.amount == 400) {
                          console.log("tona");
                          setAmount(_.amount / 1000);
                        } else {
                          setAmount(_.amount);
                        }
                        handleClickOpenQr();
                      }}
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
                            + {`${_.amount}${_.type}`}
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
                    onClick={() => {
                      if (amount - 2 > 0) {
                        setAmount((prev: any) => prev - 2); // Giảm 0.2
                      }
                    }}
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
                      <Typography variant='h4'>
                        {formatAmount(amount)}
                      </Typography>
                    </Box>
                    <Typography fontSize={".8rem"}>
                      tín dụng không hết hạn
                    </Typography>
                  </Box>
                  <Box
                    onClick={() => {
                      if (amount + 2 < 60) {
                        setAmount((prev: any) => prev + 2);
                      }
                    }}
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
                    onChange={handleSliderChange}
                    value={amount}
                    defaultValue={50}
                    aria-label='Default'
                    valueLabelDisplay='auto'
                    max={60}
                    min={0.2}
                    step={0.2}
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
                    onClick={() => {
                      handleClickOpenQr();
                    }}
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
