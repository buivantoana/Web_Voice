import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Popover,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { RiOpenaiFill } from "react-icons/ri";
import profile from "../images/alloy.svg";
import { useState } from "react";

type Props = {
  data?: any;
  voice?: any;
  setVoice?: any;
};

const Author = ({ data, setVoice, voice }: Props) => {
  const theme: any = useTheme();
  const [anchorElGender, setAnchorElGender] = useState(null);
  const handleClickGender = (event: any) => {
    setAnchorElGender(event.currentTarget);
  };
  const handleCloseGender = () => {
    setAnchorElGender(null);
  };
  const openGender = Boolean(anchorElGender);
  const idGender = openGender ? "simple-popover" : undefined;

  const [anchorElAge, setAnchorElAge] = useState(null);
  const handleClickAge = (event: any) => {
    setAnchorElAge(event.currentTarget);
  };
  const handleCloseAge = () => {
    setAnchorElAge(null);
  };
  const openAge = Boolean(anchorElAge);
  const idAge = openAge ? "simple-popover" : undefined;

  const [anchorElAcent, setAnchorElAcent] = useState(null);
  const handleClickAcent = (event: any) => {
    setAnchorElAcent(event.currentTarget);
  };
  const handleCloseAcent = () => {
    setAnchorElAcent(null);
  };
  const openAcent = Boolean(anchorElAcent);
  const idAcent = openAcent ? "simple-popover" : undefined;

  return (
    <div>
      <Box border={"1px solid #dddddd"} height={"100%"} borderRadius={"8px"}>
        <Box p={"5px 10px"}>
          <Box
            sx={{
              padding: "4px",
              borderRadius: "5px",
            }}
            bgcolor={theme.palette.grey_700.main}>
            <Box
              display={"flex"}
              alignItems={"center"}
              width={{ xs: "50%", md: "25%" }}
              bgcolor={"white"}
              borderRadius={"5px"}
              justifyContent={"center"}
              gap={"5px"}>
              <RiOpenaiFill fontWeight={"500"} />
              <Typography fontSize={".9rem"} fontWeight={"500"}>
                Giọng Openai
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          bgcolor={theme.palette.grey_700.main}
          borderTop={"1px solid rgb(226 232 240)"}
          borderBottom={"1px solid rgb(226 232 240)"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={{ xs: "wrap", md: "unset" }}
          gap={"20px"}
          padding={"10px 10px"}>
          <Box
            sx={{
              ".search-input input": {
                padding: "3px 7px !important",
                width: "130px",
              },
              ".css-51focn-MuiFormControl-root-MuiTextField-root": {
                background: "white",
                borderRadius: "16px",
              },
            }}>
            <TextField
              className='search-input'
              placeholder='Tìm kiếm...'
              id='demo-helper-text-aligned'
              size='small'
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: theme.palette.grey_500.main, // Màu viền khi không có focus
                  },
                  "&:hover fieldset": {
                    borderColor: "unset", // Màu viền khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.active.main, // Màu viền khi focused
                  },
                },
                fontSize: "16px",
              }}
              InputProps={{
                // Thêm icon ở đầu
                startAdornment: (
                  <SearchIcon
                    sx={{
                      marginRight: "8px",
                      color: theme.palette.grey_500.main,
                    }}
                  />
                ),
              }}
            />
          </Box>
          <Box display={"flex"} gap={"3px"}>
            <Box
              sx={{
                "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper css-kvalmi-MuiPaper-root-MuiPopover-paper":
                  {
                    padding: "5px",
                  },
              }}>
              <Button
                aria-describedby={idGender}
                onClick={handleClickGender}
                variant='outlined'
                endIcon={<ExpandMoreIcon />}
                sx={{
                  borderColor: theme.palette.grey_500.main,
                  background: "white",
                  color: "black",
                  "&:hover": {
                    borderColor: "unset",
                    color: "unset",
                    background: "white",
                  },
                }}
                size='small'>
                Giới tính
              </Button>

              <Popover
                id={idGender}
                open={openGender}
                anchorEl={anchorElGender}
                onClose={handleCloseGender}
                sx={{ p: "5px" }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}>
                <Typography sx={{ padding: "3px 10px", width: "80px" }}>
                  Nam
                </Typography>
                <Typography sx={{ padding: "3px 10px", width: "80px" }}>
                  Nữ
                </Typography>
              </Popover>
            </Box>
            <Box
              sx={{
                "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper css-kvalmi-MuiPaper-root-MuiPopover-paper":
                  {
                    padding: "5px",
                  },
              }}>
              <Button
                aria-describedby={idAge}
                onClick={handleClickAge}
                variant='outlined'
                endIcon={<ExpandMoreIcon />}
                sx={{
                  borderColor: theme.palette.grey_500.main,
                  background: "white",
                  color: "black",
                  "&:hover": {
                    borderColor: "unset",
                    color: "unset",
                    background: "white",
                  },
                }}
                size='small'>
                Tuổi
              </Button>

              <Popover
                id={idAge}
                open={openAge}
                anchorEl={anchorElAge}
                onClose={handleCloseAge}
                sx={{ p: "5px" }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}>
                <Typography sx={{ padding: "3px 10px", width: "80px" }}>
                  Trẻ
                </Typography>
                <Typography sx={{ padding: "3px 10px", width: "80px" }}>
                  Trung liên
                </Typography>
                <Typography sx={{ padding: "3px 10px", width: "80px" }}>
                  Lớn tuổi
                </Typography>
              </Popover>
            </Box>
            <Box
              sx={{
                "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper css-kvalmi-MuiPaper-root-MuiPopover-paper":
                  {
                    padding: "5px",
                  },
              }}>
              <Button
                aria-describedby={idAcent}
                onClick={handleClickAcent}
                variant='outlined'
                endIcon={<ExpandMoreIcon />}
                sx={{
                  borderColor: theme.palette.grey_500.main,
                  background: "white",
                  color: "black",
                  "&:hover": {
                    borderColor: "unset",
                    color: "unset",
                    background: "white",
                  },
                }}
                size='small'>
                Phát âm
              </Button>

              <Popover
                id={idAcent}
                open={openAcent}
                anchorEl={anchorElAcent}
                onClose={handleCloseAcent}
                sx={{ p: "5px" }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}>
                <Typography sx={{ padding: "3px 10px", width: "80px" }}>
                  Nam
                </Typography>
                <Typography sx={{ padding: "3px 10px", width: "80px" }}>
                  Nữ
                </Typography>
              </Popover>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",

              gap: "10px",
            }}>
            <Button
              variant='outlined'
              startIcon={<FilterAltOffIcon />}
              sx={{
                borderColor: theme.palette.grey_500.main,
                color: "black",

                "&:hover": {
                  borderColor: "unset",
                  color: "unset",
                },
              }}
              size='small'>
              Reset
            </Button>

            <RestartAltIcon
              sx={{
                border: `1px solid ${theme.palette.grey_500.main}`,
                borderRadius: "50%",
                padding: "2px",
                background: "white",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{ padding: "5px 10px " }}
          bgcolor={theme.palette.grey_700.main}
          borderBottom={`1px solid rgb(226 232 240)`}>
          <Typography fontSize={".85rem"} color={theme.palette.grey_500.main}>
            Open voice
          </Typography>
        </Box>
        <Box height={"50vh"}>
          <Box
            sx={{ overflowY: "scroll" }}
            className='list-scroll'
            height={"100%"}>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              gap={"10px"}
              padding={"10px"}>
              {data &&
                data.length &&
                data.map((item: any) => {
                  return (
                    <Box
                      onClick={() => setVoice(item)}
                      sx={{
                        borderRadius: "8px",
                        border:
                          voice.id == item.id
                            ? `1px solid ${theme.palette.active.main}`
                            : "1px solid rgb(226 232 240)",
                        width: { xs: "100%", md: "49%" },
                      }}>
                      <Stack
                        direction={"row"}
                        sx={{ padding: "6px" }}
                        justifyContent={"space-between"}>
                        <Typography fontSize={".9rem"} fontWeight={"500"}>
                          {item.name}
                        </Typography>
                        <Typography fontSize={".85rem"} fontWeight={"500"}>
                          QA001
                        </Typography>
                      </Stack>
                      <Stack
                        sx={{ padding: "6px" }}
                        direction={"row"}
                        justifyContent={"space-between"}>
                        <Box>
                          <Typography mb={"7px"} ml={"8px"} fontSize={".85rem"}>
                            {item.description}
                          </Typography>
                          <Box display={"flex"} gap={"5px"}>
                            <Box
                              border={"2px solid rgb(226 232 240)"}
                              p={"0px 8px"}
                              bgcolor={"rgb(248 250 252)"}
                              borderRadius={"5px"}
                              width={"max-content"}>
                              <Typography>Trẻ</Typography>
                            </Box>
                            <Box
                              border={"2px solid rgb(226 232 240)"}
                              p={"0px 8px"}
                              bgcolor={"rgb(248 250 252)"}
                              borderRadius={"5px"}
                              width={"max-content"}>
                              <Typography>Nam</Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <img
                            src={profile}
                            alt=''
                            width={"40px"}
                            style={{ borderRadius: "50%" }}
                          />
                        </Box>
                      </Stack>
                      <Stack mt={"30px"} direction={"row"}>
                        <Box
                          padding={"8px"}
                          width={"50%"}
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                          borderTop={"1px solid rgb(226 232 240)"}
                          borderRight={"1px solid rgb(226 232 240)"}
                          justifyContent={"center"}>
                          <PlayCircleOutlineIcon sx={{ fontSize: "16px" }} />
                          <Typography fontSize={".85rem"}>Mẫu</Typography>
                        </Box>
                        <Box
                          width={"50%"}
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                          borderTop={"1px solid rgb(226 232 240)"}
                          justifyContent={"center"}>
                          <svg
                            data-v-fa4d36aa=''
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            aria-hidden='true'
                            role='img'
                            className='icon text-lg'
                            width='1em'
                            height='1em'
                            viewBox='0 0 24 24'>
                            <path
                              fill='currentColor'
                              d='m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825'
                            />
                          </svg>

                          <Typography fontSize={".85rem"}>Yêu thích</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Author;
