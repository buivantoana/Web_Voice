import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import {
  RiAddFill,
  RiChatVoiceFill,
  RiCheckboxMultipleFill,
  RiCloseLine,
  RiDeleteBin6Line,
  RiEditLine,
  RiEyeFill,
  RiFileCopyLine,
  RiFileUploadLine,
  RiQuestionFill,
  RiSpeedUpLine,
  RiVolumeMuteLine,
} from "react-icons/ri";
import alloy from "../../images/alloy.svg";
import echo from "../../images/echo.svg";
import fable from "../../images/fable.svg";
import onyx from "../../images/onyx.svg";
import nova from "../../images/nova.svg";
import shimmer from "../../images/shimmer.svg";
import InputSlider from "../../components/InputSlide";
import Author from "../../components/Author";
import Loading from "../../components/Loading";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const images: any = {
  alloy: alloy,
  echo: echo,
  fable: fable,
  onyx: onyx,
  nova: nova,
  shimmer: shimmer,
};

type Props = {
  themKhoi: any;
  dongMoKhoi: any;
  themKhoiSau: any;
  xoaKhoi: any;
  block: any;
  setHidden: any;
  hidden: any;
  dongtatcakhoi: any;
  themKhoiMoi: any;
  suaVanBanKhoi: any;
  suaVanBanVoice: any;
  suaGiayBatDau: any;
  suaTocDo: any;
  handleCloseAuthor: any;
  handleClickOpenAuthor: any;
  openAuthor: any;
  voices: any;
  voice: any;
  setVoice: any;
  loadingVoices: any;
  setIdVoice: any;
  handleCheckboxChange: any;
  selectedItems: any;
  xoaKhoiChon: any;
  chonTatCa: any;
  xoaTatCa: any;
  openEditAll: any;
  handleCloseEditAll: any;
  handleClickOpenEditAll: any;
  setIsEditAll: any;
  setDataEditAll: any;
  dataEditAll: any;
  suaTatCa: any;
  handleChangeSrt: any;
};

const StoryMakerView = ({
  themKhoi,
  themKhoiSau,
  xoaKhoi,
  dongMoKhoi,
  block,
  setHidden,
  hidden,
  dongtatcakhoi,
  themKhoiMoi,
  suaVanBanKhoi,
  suaVanBanVoice,
  suaGiayBatDau,
  suaTocDo,
  handleCloseAuthor,
  handleClickOpenAuthor,
  openAuthor,
  voices,
  voice,
  setVoice,
  loadingVoices,
  setIdVoice,
  handleCheckboxChange,
  selectedItems,
  xoaKhoiChon,
  chonTatCa,
  xoaTatCa,
  openEditAll,
  handleClickOpenEditAll,
  handleCloseEditAll,
  handleChangeSrt,
  setDataEditAll,
  dataEditAll,
  suaTatCa,
}: Props) => {
  const theme: any = useTheme();

  let close = block.filter((item: any) => item.open == true)[0];
  return (
    <Box
      width={"100%"}
      height={"92%"}
      position={"relative"}
      sx={{
        ".css-lh8pzc-MuiInputBase-root-MuiOutlinedInput-root": {
          height: "83%",
          border: "none",
        },
        ".css-15oluye-MuiFormControl-root-MuiTextField-root": {
          height: "90%",
        },
        padding: "10px",
      }}
      boxSizing={"border-box"}>
      {!hidden && (
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
          height={"100%"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"120px"}
            height={"120px"}
            borderRadius={"50%"}
            bgcolor={"grey_700.main"}>
            <RiChatVoiceFill size={60} color='rgb(148 163 184)' />
          </Box>
          <Typography color='rgb(148 163 184)' fontSize={"1.4rem"}>
            Tạo câu chuyện đầu tiên của bạn
          </Typography>
          <Typography color='rgb(148 163 184)' fontSize={"1rem"}>
            Bạn có thể tạo thủ công trên giao diện người dùng hoặc nhập từ một
            tập tin
          </Typography>
          <Box
            width={"250px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"15px"}>
            <Button
              onClick={() => {
                setHidden(true);
                themKhoi();
              }}
              variant='outlined'
              color='success'
              sx={{
                fontSize: { xs: "10px", md: "15px" },
                minWidth: { xs: "87px", md: "64px" },
                padding: { xs: "6px 8px", md: "6px 16px" },
                borderColor: theme.palette.active.main,
                color: theme.palette.active.main,
              }}
              startIcon={<RiAddFill />}>
              Thêm cuộc trò chuyện
            </Button>
            <Button
              component='label'
              role={undefined}
              tabIndex={-1}
              sx={{
                border: "1px solid #dddddd",
              }}
              startIcon={<CloudUploadIcon />}>
              Nhập từ srt
              <VisuallyHiddenInput
                type='file'
                accept='.srt' // Chỉ chấp nhận file .srt
                onChange={(e) => handleChangeSrt(e)}
                multiple
              />
            </Button>
          </Box>
        </Box>
      )}
      {hidden && (
        <>
          <Box
            className='hidden-story'
            sx={{ overflowY: "scroll", height: "92%" }}>
            {block.map((item: any) => {
              return (
                <Box
                  borderBottom={"1px solid #dddddd"}
                  sx={{ cursor: "pointer" }}
                  pb={"10px"}>
                  {item.open ? (
                    <Box mt={"20px"} onClick={() => dongMoKhoi(item.id)}>
                      <Box>
                        <Box
                          sx={{
                            width: "100%",
                            ".search-input input": {
                              padding: "3px 7px !important",
                              width: "100%",
                            },
                            ".css-51focn-MuiFormControl-root-MuiTextField-root":
                              {
                                background: "white",
                                borderRadius: "16px",
                              },
                          }}>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            mb={"5px"}
                            justifyContent={"space-between"}
                            color={"grey_500.main"}
                            alignItems={"center"}>
                            <Typography fontWeight={"500"}>Tên khối</Typography>
                            <RiQuestionFill />
                          </Box>
                          <TextField
                            className='search-input'
                            placeholder='Tìm kiếm...'
                            id='demo-helper-text-aligned'
                            value={item.name}
                            onChange={(e) => {
                              suaVanBanKhoi(item.id, e.target.value);
                            }}
                            size='small'
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
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
                              width: "100%",
                            }}
                          />
                        </Box>
                        <Box
                          mt={"20px"}
                          sx={{
                            width: "100%",
                            ".search-input input": {
                              padding: "3px 7px !important",
                              width: "100%",
                            },
                            ".css-51focn-MuiFormControl-root-MuiTextField-root":
                              {
                                background: "white",
                                borderRadius: "16px",
                              },
                          }}>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            mb={"5px"}
                            justifyContent={"space-between"}
                            color={"grey_500.main"}
                            alignItems={"center"}>
                            <Typography fontWeight={"500"}>Văn bản</Typography>
                          </Box>
                          <Box
                            border={"1px solid #dddddd"}
                            borderRadius={"10px"}>
                            <Box position={"relative"}>
                              <TextField
                                placeholder='Nhập văn bản bạn muốn chuyển đổi thành tiếng nói ở đây...'
                                multiline
                                value={item.text}
                                onChange={(e) => {
                                  suaVanBanVoice(item.id, e.target.value);
                                }}
                                fullWidth
                                variant='standard' // Loại bỏ border mặc định
                                InputProps={{
                                  disableUnderline: true, // Bỏ underline của variant="standard"
                                  sx: {
                                    backgroundColor: "white", // Nền trắng
                                    borderRadius: 2, // Đặt border-radius nếu cần
                                    padding: 1, // Khoảng cách padding
                                  },
                                }}
                                sx={{
                                  "& .MuiInputBase-input": {
                                    minHeight: "60px",
                                    resize: "none", // Bỏ resize của textarea
                                    overflow: "auto", // Để có thể cuộn
                                    scrollbarWidth: "none", // Ẩn thanh cuộn cho Firefox
                                    msOverflowStyle: "none", // Ẩn thanh cuộn cho Internet Explorer và Edge
                                  },
                                  "& .MuiFormControl-root": {
                                    // Đặt chiều cao tối thiểu cho TextField
                                  },
                                  // Ẩn thanh cuộn trong các trình duyệt WebKit
                                  "&::-webkit-scrollbar": {
                                    display: "none", // Ẩn thanh cuộn
                                  },
                                }}
                              />
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: "5px",
                                  right: "5px",
                                }}>
                                <Typography
                                  color='grey_500.main'
                                  fontSize={".7rem"}>
                                  5/3000
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              padding={"15px"}
                              bgcolor={"rgb(241 245 249)"}
                              sx={{
                                borderBottomLeftRadius: "10px",
                                borderBottomRightRadius: "10px",
                              }}>
                              <Box
                                display={"flex"}
                                justifyContent={"space-between"}>
                                <Box width={"49%"}>
                                  <Typography
                                    fontWeight={"500"}
                                    color={"grey_500.main"}>
                                    Trước im lặng
                                  </Typography>
                                  <TextField
                                    className='search-input'
                                    inputMode='numeric'
                                    placeholder='Tìm kiếm...'
                                    value={item.delay}
                                    onChange={(e) => {
                                      if (/^\d*$/.test(e.target.value)) {
                                        suaGiayBatDau(item.id, e.target.value);
                                      }
                                    }}
                                    size='small'
                                    InputProps={{
                                      // Thêm icon ở đầu
                                      startAdornment: (
                                        <RiVolumeMuteLine
                                          style={{
                                            marginRight: "8px",
                                            color: theme.palette.grey_500.main,
                                          }}
                                        />
                                      ),
                                      endAdornment: (
                                        <Typography
                                          color='grey_500.main'
                                          fontSize={".8rem"}>
                                          Seconds
                                        </Typography>
                                      ),
                                    }}
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: "16px",
                                        backgroundColor: "white",
                                        "& fieldset": {
                                          borderColor:
                                            theme.palette.grey_500.main, // Màu viền khi không có focus
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "unset", // Màu viền khi hover
                                        },
                                        "&.Mui-focused fieldset": {
                                          borderColor:
                                            theme.palette.active.main, // Màu viền khi focused
                                        },
                                      },
                                      fontSize: "16px",
                                      width: "100%",
                                    }}
                                  />
                                </Box>
                                <Box
                                  width={"49%"}
                                  onClick={() => {
                                    handleClickOpenAuthor();
                                    setIdVoice(item.id);
                                  }}>
                                  <Typography
                                    fontWeight={"500"}
                                    color={"grey_500.main"}>
                                    Giọng nói
                                  </Typography>
                                  <Box
                                    bgcolor={"white"}
                                    height={"28px"}
                                    px={"10px"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={"8px"}
                                    borderRadius={"16px"}
                                    border={`1px solid ${theme.palette.grey_500.main}`}>
                                    <img
                                      src={images[item.voice]}
                                      width={22}
                                      style={{ borderRadius: "50%" }}
                                      height={22}
                                    />
                                    <Typography
                                      sx={{ textTransform: "capitalize" }}>
                                      {item.voice}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <Box
                                mt={"10px"}
                                display={"flex"}
                                alignItems={"end"}>
                                <Box width={"70%"}>
                                  <InputSlider
                                    value={item.speed}
                                    center={true}
                                    label={true}
                                    onChange={(e: any) => {
                                      suaTocDo(item.id, e);
                                    }}
                                  />
                                </Box>
                                <Box
                                  width={"30%"}
                                  display={"flex"}
                                  justifyContent={"end"}
                                  gap={"10px"}
                                  position={"relative"}
                                  zIndex={2}
                                  color={"grey_500.main"}
                                  alignItems={"center"}>
                                  <RiFileCopyLine
                                    onClick={() => themKhoiSau(item.id)}
                                    size={"20"}
                                  />
                                  <RiDeleteBin6Line
                                    onClick={() => xoaKhoi(item.id)}
                                    size={"20"}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-evenly"}
                      gap={"10px"}
                      p={"15px 0"}>
                      <Box position={"relative"} zIndex={1000}>
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                          defaultChecked
                          color='success'
                        />
                      </Box>
                      <Box
                        onClick={() => dongMoKhoi(item.id)}
                        display={"flex"}
                        alignItems={"center"}
                        gap={"10px"}>
                        <Box>
                          <Typography
                            fontSize={"1rem"}
                            color='grey_500.main'
                            fontWeight={"500"}>
                            {item.name}
                          </Typography>
                          <Typography fontSize={".9rem"} color='grey_500.main'>
                            Nhấp chuột để chỉnh sửa văn bản
                          </Typography>
                        </Box>
                      </Box>
                      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                        <Box
                          borderRadius={"16px"}
                          display={"flex"}
                          alignItems={"center"}
                          p={"8px"}
                          width={"max-content"}
                          border={"1px solid #dddddd"}>
                          <RiVolumeMuteLine />
                        </Box>
                        <Box
                          borderRadius={"16px"}
                          display={"flex"}
                          alignItems={"center"}
                          p={"3px 5px"}
                          width={"max-content"}
                          border={"1px solid #dddddd"}>
                          <Box
                            bgcolor={"white"}
                            display={"flex"}
                            alignItems={"center"}
                            gap={"8px"}>
                            <img
                              src={images[item.voice]}
                              width={18}
                              style={{ borderRadius: "50%" }}
                              height={18}
                            />
                            <Typography sx={{ textTransform: "capitalize" }}>
                              {item.voice}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          borderRadius={"16px"}
                          display={"flex"}
                          alignItems={"center"}
                          p={"8px"}
                          width={"max-content"}
                          border={"1px solid #dddddd"}>
                          <RiSpeedUpLine />
                        </Box>
                        <Box>
                          <RiFileCopyLine
                            onClick={() => themKhoiSau(item.id)}
                            size={"20"}
                          />
                          <RiDeleteBin6Line
                            onClick={() => xoaKhoi(item.id)}
                            size={"20"}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>

          <Box
            bgcolor={"rgb(241 245 249)"}
            sx={{
              position: "absolute",
              width: "100%",
              bottom: 0,
              left: 0,
              borderBottomRightRadius: "8px",
              borderBottomLeftRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}>
            <Box p={"5px"} display={"flex"} gap={"15px"}>
              <Box
                onClick={() => chonTatCa()}
                padding={"8px"}
                bgcolor={"white"}
                width={"max-content"}
                borderRadius={"5px"}
                border={"1px solid #dddddd"}>
                <RiCheckboxMultipleFill size={"20"} />
              </Box>
              {close && (
                <Box
                  onClick={dongtatcakhoi}
                  padding={"8px"}
                  bgcolor={"white"}
                  width={"max-content"}
                  borderRadius={"5px"}
                  border={"1px solid #dddddd"}>
                  <RiEyeFill size={"20"} />
                </Box>
              )}
              <Box
                onClick={themKhoiMoi}
                padding={"8px"}
                bgcolor={"white"}
                width={"max-content"}
                borderRadius={"5px"}
                border={"1px solid #dddddd"}>
                <RiAddFill size={"20"} />
              </Box>
              {selectedItems.length > 0 && (
                <Box
                  onClick={handleClickOpenEditAll}
                  padding={"8px"}
                  bgcolor={"white"}
                  width={"max-content"}
                  borderRadius={"5px"}
                  border={"1px solid #dddddd"}>
                  <RiEditLine size={"20"} />
                </Box>
              )}

              {selectedItems.length > 0 && (
                <Box
                  onClick={() => xoaKhoiChon()}
                  padding={"8px"}
                  bgcolor={"white"}
                  width={"max-content"}
                  borderRadius={"5px"}
                  border={"1px solid #dddddd"}>
                  <RiDeleteBin6Line color='red' size={"20"} />
                </Box>
              )}
            </Box>
            <Box p={"5px"}>
              <Box
                onClick={() => xoaTatCa()}
                padding={"8px"}
                display={"flex"}
                gap={"5px"}
                alignItems={"center"}
                bgcolor={"white"}
                width={"max-content"}
                borderRadius={"5px"}
                border={"1px solid #dddddd"}>
                <RiDeleteBin6Line color='red' size={"20"} />
                <Typography>Xóa tất cả</Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
      <Dialog
        fullWidth
        maxWidth='xl' // Đặt maxWidth lớn nhất để có thể sử dụng toàn bộ chiều rộng
        PaperProps={{
          sx: {
            width: "100%", // Chiều rộng 100%
            maxWidth: "100%",
            ".css-kw13he-MuiDialogContent-root": {
              padding: { xs: "0" },
            },
          },
        }}
        open={openAuthor}
        onClose={handleCloseAuthor}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <Box
          display={"flex"}
          onClick={handleCloseAuthor}
          justifyContent={"end"}>
          <RiCloseLine size={25} />
        </Box>
        <DialogContent>
          {!loadingVoices ? (
            <Author setVoice={setVoice} voice={voice} data={voices} />
          ) : (
            <Loading height={"100%"} />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth='md' // Đặt maxWidth lớn nhất để có thể sử dụng toàn bộ chiều rộng
        PaperProps={{
          sx: {
            width: "50%", // Chiều rộng 100%
            maxWidth: "50%",
            ".css-kw13he-MuiDialogContent-root": {
              padding: { xs: "0" },
            },
          },
        }}
        open={openEditAll}
        onClose={handleClickOpenEditAll}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle sx={{ padding: 0 }}>
          <Box
            display={"flex"}
            onClick={handleCloseEditAll}
            justifyContent={"space-between"}>
            <Typography variant='h6'>Cập nhật hàng loạt</Typography>
            <RiCloseLine size={25} />
          </Box>
        </DialogTitle>

        <DialogContent>
          {" "}
          <Box>
            <Box
              sx={{
                width: "100%",
                ".search-input input": {
                  padding: "3px 7px !important",
                  width: "100%",
                },
                ".css-51focn-MuiFormControl-root-MuiTextField-root": {
                  background: "white",
                  borderRadius: "16px",
                },
              }}>
              <Box
                width={"100%"}
                display={"flex"}
                mb={"5px"}
                justifyContent={"space-between"}
                color={"grey_500.main"}
                alignItems={"center"}>
                <Typography fontWeight={"500"}>Tên khối</Typography>
                <RiQuestionFill />
              </Box>
              <TextField
                className='search-input'
                placeholder='Tìm kiếm...'
                id='demo-helper-text-aligned'
                value={dataEditAll.name}
                onChange={(e) => {
                  setDataEditAll({ ...dataEditAll, name: e.target.value });
                }}
                size='small'
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
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
                  width: "100%",
                }}
              />
            </Box>
            <Box
              mt={"20px"}
              sx={{
                width: "100%",
                ".search-input input": {
                  padding: "3px 7px !important",
                  width: "100%",
                },
                ".css-51focn-MuiFormControl-root-MuiTextField-root": {
                  background: "white",
                  borderRadius: "16px",
                },
              }}>
              <Box border={"1px solid #dddddd"} borderRadius={"10px"}>
                <Box
                  padding={"15px"}
                  bgcolor={"rgb(241 245 249)"}
                  sx={{
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box width={"49%"}>
                      <Typography fontWeight={"500"} color={"grey_500.main"}>
                        Trước im lặng
                      </Typography>
                      <TextField
                        className='search-input'
                        inputMode='numeric'
                        placeholder='Tìm kiếm...'
                        value={dataEditAll.delay}
                        onChange={(e) => {
                          if (/^\d*$/.test(e.target.value)) {
                            setDataEditAll({
                              ...dataEditAll,
                              delay: e.target.value,
                            });
                          }
                        }}
                        size='small'
                        InputProps={{
                          // Thêm icon ở đầu
                          startAdornment: (
                            <RiVolumeMuteLine
                              style={{
                                marginRight: "8px",
                                color: theme.palette.grey_500.main,
                              }}
                            />
                          ),
                          endAdornment: (
                            <Typography
                              color='grey_500.main'
                              fontSize={".8rem"}>
                              Seconds
                            </Typography>
                          ),
                        }}
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
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      width={"49%"}
                      onClick={() => {
                        handleClickOpenAuthor();
                        // setIdVoice(item.id);
                      }}>
                      <Typography fontWeight={"500"} color={"grey_500.main"}>
                        Giọng nói
                      </Typography>
                      <Box
                        bgcolor={"white"}
                        height={"28px"}
                        px={"10px"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={"8px"}
                        borderRadius={"16px"}
                        border={`1px solid ${theme.palette.grey_500.main}`}>
                        <img
                          src={images[dataEditAll.voice]}
                          width={22}
                          style={{ borderRadius: "50%" }}
                          height={22}
                        />
                        <Typography sx={{ textTransform: "capitalize" }}>
                          {dataEditAll.voice}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box mt={"10px"} display={"flex"} alignItems={"end"}>
                    <Box width={"70%"}>
                      <InputSlider
                        value={dataEditAll.speed}
                        center={true}
                        label={true}
                        onChange={(e: any) => {
                          setDataEditAll({ ...dataEditAll, speed: e });
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditAll}
            variant='contained'
            sx={{ background: "white", color: "black" }}>
            Hủy bỏ
          </Button>

          <Button
            onClick={suaTatCa}
            variant='contained'
            sx={{ background: theme.palette.active.main }}>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StoryMakerView;
