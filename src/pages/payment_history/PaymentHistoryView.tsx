import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Box,
  Button,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { RiPaypalFill } from "react-icons/ri";
import LeftProfile from "../../components/LeftProfile";
type Props = {};

const PaymentHistoryView = (props: Props) => {
  const theme: any = useTheme();
  return (
    <Box padding={"2% 10%"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <LeftProfile />
        <Box
          sx={{ position: "relative" }}
          bgcolor={"white"}
          padding={"10px"}
          minHeight={"80vh"}
          border={"1px solid #dddddd"}
          p={"20px"}
          width={{ xs: "100%", md: "100%", lg: "62%" }}>
          <Box borderBottom={"1px solid #dddddd"} pb={"20px"}>
            <Typography variant='h6' fontWeight={"500"}>
              Lịch sử thanh toán
            </Typography>
          </Box>
          <Box
            mt={"20px"}
            sx={{
              ".css-1be8zi3-MuiTypography-root-MuiTimelineContent-root": {
                padding: 0,
              },
            }}>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}>
              <TimelineItem>
                <TimelineSeparator>
                  <HighlightOffIcon />
                  <TimelineConnector sx={{ minHeight: "40px" }} />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    display={"flex"}
                    width={"100%"}
                    padding={"0px 20px 30px"}
                    justifyContent={"space-between"}>
                    <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                      <Box
                        display={{ xs: "unset", md: "flex" }}
                        alignItems={"end"}
                        gap={"10px"}>
                        <Typography
                          variant='h5'
                          fontWeight={"500"}
                          fontSize={{ xs: "1.2rem", md: "1.3rem" }}>
                          200K tín dụng
                        </Typography>
                        <Box display={"flex"} gap={"10px"}>
                          <Button
                            sx={{
                              borderRadius: "5px",
                              padding: "2px 0px",
                              backgroundColor: "rgb(254 236 220)", // Màu nền của nút
                              color: "rgb(138 44 13)", // Màu chữ
                              "&:hover": {
                                backgroundColor: "rgb(254 236 220)", // Màu nền khi hover
                              },
                            }}
                            variant='contained'>
                            Mua tín dụng
                          </Button>
                          <Button
                            sx={{
                              borderRadius: "5px",
                              padding: "2px 5px",
                              backgroundColor: theme.palette.grey_700.main, // Màu nền của nút
                              color: "black", // Màu chữ
                              "&:hover": {
                                backgroundColor: theme.palette.grey_700.main, // Màu nền khi hover
                              },
                            }}
                            variant='contained'>
                            Hủy bỏ
                          </Button>
                        </Box>
                      </Box>
                      <Typography fontSize={".8rem"} color='grey_500.main'>
                        2024-10-24 23:15:02
                      </Typography>
                      <Typography fontSize={".9rem"} color='grey_500.main'>
                        Order ID: 1db0f73e-9223-11ef-b28d-be6d42b1dbef
                      </Typography>
                      {/* <Typography
                        fontSize={".9rem"}
                        sx={{ display: "flex", alignItems: "center" }}
                        color='grey_500.main'>
                        <RiPaypalFill /> Paypal ID:
                        1db0f73e-9223-11ef-b28d-be6d42b1dbef
                      </Typography> */}
                    </Box>
                    <Typography variant='h5' color='grey_500.main'>
                      8$
                    </Typography>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentHistoryView;
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
