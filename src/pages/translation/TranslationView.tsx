import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  RiArrowRightLine,
  RiFileDownloadLine,
  RiLinksFill,
  RiVoiceprintFill,
} from "react-icons/ri";
import { country } from "../../utils/acent";
import chatgpt from "../../images/chatgpt-logo-transparent-background-free-png.webp";
import deepseek from "../../images/th__3_-removebg-preview.png";
import { useTranslation } from "react-i18next";
import VisualSlider from "../../components/CustomSlider";
import alloy from "../../images/alloy.svg";
import echo from "../../images/echo.svg";
import fable from "../../images/fable.svg";
import onyx from "../../images/onyx.svg";
import nova from "../../images/nova.svg";
import shimmer from "../../images/shimmer.svg";
import vn from "../../images/vn.png";

const images: any = {
  alloy: alloy,
  echo: echo,
  fable: fable,
  onyx: onyx,
  nova: nova,
  shimmer: shimmer,
};

type Props = {
  handleClickOpenAuthor: any;
  voice: any;
  typeVoice: any;
  setSeletedLanguage2: any;
  selectedLanguage2: any;
};

const TranslationView = ({
  handleClickOpenAuthor,
  voice,
  typeVoice,
  setSeletedLanguage2,
  selectedLanguage2,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const theme: any = useTheme();
  const { t } = useTranslation();
  const [selectedLanguage, setSeletedLanguage] = useState("English");
  const [selectedTranslation, setSelectedTranslation] = useState("deepseek");
  const [subtitles, setSubtitles]: any = useState([]);
  const context: any = useCoursesContext();
  const [applySubtitle, setApplySubtitle] = useState(false);
  const [sizeSubtitle, setSizeSubtitle] = useState(8);
  const [ttsVolume, setTtsVolume] = useState(80);
  const [originalVolume, setOriginalVolume] = useState(40);
  const [video, setVideo]: any = useState(null);
  const [urlVideo, setUrlVideo]: any = useState(null);
  const [isGen, setIsGen]: any = useState(false);
  const videoRef = useRef(null);
  const [subtitleColor, setSubtitleColor] = useState("#D9D9D9"); // Default white
  const [subtitleColor1, setSubtitleColor1] = useState("#007BFF"); // Default white
  const [subtitleColor2, setSubtitleColor2] = useState("#FFFFFF"); // Default white
  const [subtitlePosition, setSubtitlePosition] = useState(50); // Default bottom
  const [fileName, setFilename] = useState(null);

  const [subtitleLine, setSubtitleLine] = useState("1"); // Default bottom
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [urlVideo]);

  useEffect(() => {
    let count = 0;
    let interval;

    const fetchData = async () => {
      try {
        let result = await getProcessVideo(fileName);
        count++;

        if (result && result.code === 0) {
          clearInterval(interval);
          setLoading(false);
          setIsGen(true);
          setUrlVideo(result.video_url);
          setSubtitles(
            result.subtitles.map((item, index) => ({
              ...item,
              id: index,
            }))
          );
          toast.success(result.msg);
          return;
        }

        // Dừng sau 15 lần
        if (count >= 15) {
          clearInterval(interval);
          setLoading(false);
          toast.error("Quá 15 lần gọi API, vui lòng thử lại sau.");
        }
      } catch (error) {
        clearInterval(interval); // Nếu lỗi xảy ra thì cũng dừng
        setLoading(false);
        console.error("Error fetching data:", error);
        toast.error("Có lỗi xảy ra khi gọi API.");
      }
    };

    if (fileName) {
      fetchData(); // Gọi lần đầu
      interval = setInterval(fetchData, 60000);
    }

    return () => clearInterval(interval);
  }, [fileName]);

  const handleTranslate = async () => {
    try {
      if (
        context.state &&
        context.state.user &&
        context.state.user &&
        context.state.user.user_id
      ) {
        setLoading(true);
        const translateService =
          selectedTranslation === "chatgpt" ? "GPT" : "Deepseek";
        console.log(
          "selectedLanguage.toLowerCase()",
          selectedLanguage.toLowerCase()
        );
        const languageCodeTo =
          country.find(
            (item: any) =>
              item.name.toLowerCase() == selectedLanguage2.toLowerCase()
          )?.name || "vietnamese";
        const languageCodeFrom =
          country.find(
            (item: any) =>
              item.name.toLowerCase() == selectedLanguage.toLowerCase()
          )?.name || "vietnamese";

        const body: any = {
          video_url: video?.video_url,
          video_name: video.video_name,
          user_id: context.state.user.user_id,
          subtitles: subtitles.map((sub) => ({
            start: sub.start,
            end: sub.end,
            text: sub.text,
          })),
          translate_sevice: translateService,
          language_from: languageCodeFrom.toLowerCase(),
          language_to: languageCodeTo.toLowerCase(),
          voice_id: voice?.id?.toLowerCase() || "onyx",
          voice_type: typeVoice || "openai",
          apply_subtitle: applySubtitle,
          tts_volume: ttsVolume / 100,
          original_volume: originalVolume / 100,
        };
        if (applySubtitle) {
          body["sub_color"] = subtitleColor;
          body["sub_position"] = Math.round(subtitlePosition);
          body["sub_number_line"] = Number(subtitleLine);
          body["sub_highlight_color"] = subtitleColor1;
          body["sub_border_color"] = subtitleColor2;
          body["size_subtitle"] = sizeSubtitle;
        }
        let result = await translateVideo(body);
        console.log("AAA result trans ", result);
        if (result && result.code == 2) {
          console.log("AAA result trans ", result);
          setSeletedLanguage(selectedLanguage2);
          setFilename(result.video_name);
        } else {
          toast.warning(result.msg);
        }
        console.log("Translate body:", body);
      } else {
        toast.warning("Bạn cần đăng nhập để sử dụng tính năng.");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  function capitalizeFirstLetter(str: any) {
    if (typeof str !== "string" || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleClickOpen = async () => {
    setLoading(true);
    if (productUrl.startsWith("http://") || productUrl.startsWith("https://")) {
      try {
        let result = await getVideo(productUrl);
        if (result && result.video_url) {
          setUrlVideo(result.video_url);
          setVideo({
            video_name: result.video_name,
            video_url: result.video_url,
            subtitles: result.subtitles,
            language: result.language,
          });
          console.log(
            "capitalizeFirstLetter(result.language)",
            capitalizeFirstLetter(result.language)
          );
          setSeletedLanguage(capitalizeFirstLetter(result.language));
          setSubtitles(
            result.subtitles.map((item, index) => {
              return {
                ...item,
                id: index,
              };
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("Link không đúng định dạng.");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ marginTop: "20px" }} px={{ xs: "2%", md: "11%" }}>
      {loading && <Loading />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
        }}>
        <Box
          className={"hidden-story"}
          sx={{
            width: { xs: "97%", md: "47%" },
            background: "white",
            borderRadius: "5px",
            padding: { xs: "3%", md: "30px" },
            maxHeight: "72vh",
            overflowY: "scroll",
          }}>
          <Typography sx={{ mb: "10px", fontWeight: "500" }}>Link</Typography>
          <Box
            sx={{
              ".css-gspymc-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingRight: 0,
              },
              ".material-video div": {
                p: "3px 3px 3px 10px",
              },
              position: "relative",
            }}>
            <TextField
              className='material-video'
              id='demo-helper-text-aligned'
              size='small'
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: theme.palette.grey_500.main,
                  },
                  "&:hover fieldset": {
                    borderColor: "unset",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.active.main,
                  },
                },
                fontSize: "16px",
              }}
              InputProps={{
                endAdornment: (
                  <Button
                    variant='contained'
                    disabled={!productUrl}
                    onClick={handleClickOpen}
                    sx={{
                      width: "200px",
                      background: theme.palette.active.main,
                      fontSize: { xs: "10px", md: "15px" },
                      borderRadius: "8px",
                    }}>
                    Get
                  </Button>
                ),
                startAdornment: (
                  <RiLinksFill style={{ paddingRight: "5px" }} size={30} />
                ),
              }}
            />
            {!isFocused && !productUrl && (
              <label
                htmlFor='demo-helper-text-aligned'
                style={{
                  position: "absolute",
                  top: "21%",
                  left: "8%",
                  width: "max-content",
                  overflow: "hidden",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    ".css-16iqw5x": {
                      fontSize: "25px",
                      opacity: ".8",
                    },
                  }}
                  className='css-1n4ct1u'>
                  <Typography
                    mb={"11px"}
                    color='grey_500.main'
                    className='chakra-text css-0'>
                    Link
                  </Typography>
                  <div className='css-16iqw5x'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1em'
                      fill='none'
                      viewBox='0 0 24 24'>
                      <g clip-path='url(#logo_youTube_gray_svg__a)'>
                        <rect
                          width='24'
                          height='24'
                          fill='#272729'
                          rx='12'></rect>
                        <path
                          fill='#fff'
                          fill-opacity='0.6'
                          d='M18.8 8.672a1.78 1.78 0 0 0-1.254-1.255c-1.107-.298-5.543-.298-5.543-.298s-4.436 0-5.543.296a1.78 1.78 0 0 0-1.254 1.256c-.296 1.108-.296 3.42-.296 3.42s0 2.311.296 3.418a1.78 1.78 0 0 0 1.254 1.255c1.107.298 5.543.298 5.543.298s4.436 0 5.543-.298A1.78 1.78 0 0 0 18.8 15.51c.296-1.107.296-3.418.296-3.418s0-2.312-.296-3.419m-8.206 5.54V9.97l3.673 2.106z'></path>
                      </g>
                      <defs>
                        <clipPath id='logo_youTube_gray_svg__a'>
                          <path fill='#fff' d='M0 0h24v24H0z'></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className='css-16iqw5x'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1em'
                      fill='none'
                      viewBox='0 0 24 24'>
                      <g clip-path='url(#logo_tikTokShop_gray_svg__a)'>
                        <rect
                          width='24'
                          height='24'
                          fill='#272729'
                          rx='12'></rect>
                        <path
                          fill='#fff'
                          fill-opacity='0.6'
                          d='M17.102 9.055a1.367 1.367 0 0 0-1.364-1.225h-.99c-.01-1.485-1.226-2.687-2.726-2.687S9.305 6.345 9.296 7.83H8.274A1.367 1.367 0 0 0 6.91 9.055l-.732 7.294a2.094 2.094 0 0 0 2.094 2.294h7.468a2.094 2.094 0 0 0 2.093-2.294zM13.376 7.83h-2.71c.004-.352.147-.688.397-.934a1.353 1.353 0 0 1 1.477-.292 1.35 1.35 0 0 1 .837 1.226m-4.053 6.817a1.94 1.94 0 0 1 1.564-2.182c.202-.041.504-.041.66-.007v1.112q-.07-.018-.14-.03a.862.862 0 0 0-.68 1.539.8.8 0 0 0 .882.1c.308-.136.473-.385.508-.721q.008-.07.006-.146v-4c0-.107 0-.107.1-.107h.894c.065 0 .09.01.095.086.047.686.568 1.27 1.236 1.36q.105.013.23.022v1.082a2.5 2.5 0 0 1-1.451-.45v2.076a1.97 1.97 0 0 1-1.524 1.922c-1.219.277-2.25-.604-2.38-1.656'></path>
                      </g>
                      <defs>
                        <clipPath id='logo_tikTokShop_gray_svg__a'>
                          <path fill='#fff' d='M0 0h24v24H0z'></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </Box>
              </label>
            )}
          </Box>
          {video && (
            <>
              <Box mt={"20px"}>
                <video
                  ref={videoRef}
                  width={"100%"}
                  style={{ borderRadius: "10px" }}
                  height={"255px"}
                  controls>
                  <source src={urlVideo} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
                {isGen && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      mt: "10px",
                    }}>
                    <Button
                      variant='contained'
                      sx={{
                        background: theme.palette.active.main,
                        fontSize: { xs: "10px", md: "15px" },
                        borderRadius: "8px",
                        color: "white",
                        py: "5px",
                        px: "10px",
                        mt: "10px",
                      }}
                      onClick={async () => {
                        try {
                          setLoading(true);
                          const videoFilename = urlVideo.split("/").pop();
                          const response = await fetch(
                            `${url_voice}/download_video?video_filename=${encodeURIComponent(
                              videoFilename
                            )}`,
                            {
                              method: "GET",
                              credentials: "include",
                            }
                          );
                          if (!response.ok) {
                            throw new Error(
                              `Không thể tải video: ${response.statusText}`
                            );
                          }
                          const blob = await response.blob();
                          const blobUrl = window.URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = blobUrl;
                          link.download = "video.mp4";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(blobUrl);
                          toast.success("Tải video thành công!");
                        } catch (error) {
                          console.error("Lỗi tải video:", error);
                          toast.error("Không thể tải video. Vui lòng thử lại.");
                        } finally {
                          setLoading(false);
                        }
                      }}>
                      <RiFileDownloadLine />
                      {t("download_video")}
                    </Button>
                  </Box>
                )}
              </Box>
              <Box mt={"20px"}>
                <SubtitleEditor
                  subtitles={subtitles}
                  onSubtitlesChange={setSubtitles}
                />
              </Box>
            </>
          )}
        </Box>
        <Box
          className='hidden-add-voice'
          sx={{
            width: { xs: "97%", md: "47%" },
            background: "white",
            borderRadius: "5px",
            padding: { xs: "3%", md: "30px" },
            height: { xs: "90vh", md: "72vh" },
            overflowY: "scroll",
          }}>
          <Typography sx={{ mb: "10px", fontWeight: "500" }}>
            {t("language")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <FormControl sx={{ width: "45%" }}>
              <Select
                className='more-select'
                id='demo-simple-select'
                value={selectedLanguage}
                onChange={(e) => setSeletedLanguage(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      overflowY: "auto",
                      maxHeight: "250px",
                    },
                  },
                }}
                sx={{
                  background: "white",
                  "&:focus": {
                    borderColor: theme.palette.active.main,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.active.main,
                  },
                  ".css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    {
                      padding: "10px !important",
                    },
                }}>
                {country.map((item: any) => (
                  <MenuItem
                    key={item.language}
                    value={item.language}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        padding: "0px !important",
                      }}>
                      <img
                        width={30}
                        height={25}
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                        src={item.flag}
                        alt={item.name}
                      />
                      <Typography
                        sx={{
                          padding: "3px 10px",
                          width: "100px",
                          fontSize: ".8rem",
                        }}>
                        {item.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <RiArrowRightLine size={25} />
            <FormControl sx={{ width: "45%" }}>
              <Select
                className='more-select'
                id='demo-simple-select'
                value={selectedLanguage2}
                onChange={(e) => setSeletedLanguage2(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      overflowY: "auto",
                      maxHeight: "250px",
                    },
                  },
                }}
                sx={{
                  background: "white",
                  "&:focus": {
                    borderColor: theme.palette.active.main,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.active.main,
                  },
                }}>
                {country.map((item: any) => (
                  <MenuItem
                    key={item.name}
                    value={item.language}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        padding: "0px !important",
                      }}>
                      <img
                        width={30}
                        height={25}
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                        src={item.flag}
                        alt={item.name}
                      />
                      <Typography
                        sx={{
                          padding: "3px 10px",
                          width: "100px",
                          fontSize: ".8rem",
                        }}>
                        {item.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ my: "20px", fontWeight: "500", width: "45%" }}>
              {t("translate_service")}
            </Typography>
            <Typography sx={{ my: "20px", fontWeight: "500", width: "45%" }}>
              {t("voice_sub")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl sx={{ width: "45%" }}>
              <Select
                className='more-select'
                id='demo-simple-select'
                value={selectedTranslation}
                onChange={(e) => setSelectedTranslation(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      overflowY: "auto",
                      maxHeight: "250px",
                    },
                  },
                }}
                sx={{
                  background: "white",
                  "&:focus": {
                    borderColor: theme.palette.active.main,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.active.main,
                  },
                  "& .MuiInputBase-input": {
                    padding: "8px", // giống như bạn đã dùng
                  },
                }}>
                <MenuItem
                  value={"deepseek"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      padding: "0px !important",
                    }}>
                    <img
                      width={30}
                      height={30}
                      style={{ borderRadius: "5px", objectFit: "contain" }}
                      src={deepseek}
                      alt='Deepseek'
                    />
                    <Typography
                      sx={{
                        padding: "3px 10px",
                        width: "100px",
                        fontSize: ".8rem",
                      }}>
                      Deepseek
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem
                  value={"chatgpt"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      padding: "0px !important",
                    }}>
                    <img
                      width={30}
                      height={30}
                      style={{ borderRadius: "5px", objectFit: "contain" }}
                      src={chatgpt}
                      alt='ChatGPT'
                    />
                    <Typography
                      sx={{
                        padding: "3px 10px",
                        width: "100px",
                        fontSize: ".8rem",
                      }}>
                      ChatGPT
                    </Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ width: "45%" }}>
              <Button
                onClick={handleClickOpenAuthor}
                sx={{
                  width: "100%",
                  height: "100%",
                  fontSize: { xs: "10px", md: "15px" },
                  borderRadius: "8px",
                  color: "black",
                  border: "1px solid #ccc",
                  background: "white",
                }}>
                <RiVoiceprintFill size={25} style={{ marginRight: "10px" }} />
                {voice ? (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Typography>{voice && voice.name && voice.name}</Typography>
                  </Box>
                ) : (
                  t("voice")
                )}
              </Button>
            </Box>
          </Box>
          <Typography sx={{ my: "20px", fontWeight: "500", width: "45%" }}>
            {t("volume")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "-30px",
            }}>
            <Box width={"45%"}>
              <VisualSlider
                title={t("origin")}
                onChange={setOriginalVolume}
                value={originalVolume}
              />
            </Box>
            <Box width={"45%"}>
              <VisualSlider
                title={t("translated")}
                onChange={setTtsVolume}
                value={ttsVolume}
              />
            </Box>
          </Box>

          <Box
            width={"45%"}
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              my: "10px",
            }}>
            <Typography sx={{ fontWeight: "500", width: "45%" }}>
              {t("sub")}
            </Typography>
            <CustomSwitch onChange={setApplySubtitle} checked={applySubtitle} />
          </Box>
          {applySubtitle && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  mt: "30px",
                }}>
                <Box width={"45%"}>
                  <VisualSlider
                    title={t("size")}
                    onChange={setSizeSubtitle}
                    value={sizeSubtitle}
                    max={20}
                  />
                </Box>
                <Box width={"45%"}>
                  <Typography sx={{ my: "5px", fontWeight: "500" }}>
                    {t("Line")}
                  </Typography>
                  <Box>
                    <Box>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          value={subtitleLine}
                          onChange={(e) => setSubtitleLine(e.target.value)}
                          sx={{
                            background: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "gray",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme.palette.active.main,
                            },
                            "& .MuiSelect-select": {
                              padding: "10px",
                            },
                          }}>
                          <MenuItem value='1'>{t("1")}</MenuItem>
                          <MenuItem value='2'>{t("2")}</MenuItem>
                          <MenuItem value='3'>{t("3")}</MenuItem>
                          <MenuItem value='4'>{t("4")}</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"space-between"}>
                <Box width={"45%"}>
                  <Typography sx={{ my: "20px", fontWeight: "500" }}>
                    {t("subtitle_color")}
                  </Typography>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box
                      width={"25%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}>
                      <TextField
                        type='color'
                        value={subtitleColor}
                        onChange={(e) => setSubtitleColor(e.target.value)}
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": {
                            padding: "10.5px 6px", // giống như bạn đã dùng
                          },

                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: theme.palette.grey_500.main,
                            },
                            "&:hover fieldset": {
                              borderColor: theme.palette.grey_500.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.active.main,
                            },
                          },
                        }}
                      />{" "}
                      <Typography>Base</Typography>
                    </Box>
                    <Box
                      width={"25%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}>
                      <TextField
                        type='color'
                        value={subtitleColor1}
                        onChange={(e) => setSubtitleColor1(e.target.value)}
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": {
                            padding: "10.5px 6px", // giống như bạn đã dùng
                          },

                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: theme.palette.grey_500.main,
                            },
                            "&:hover fieldset": {
                              borderColor: theme.palette.grey_500.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.active.main,
                            },
                          },
                        }}
                      />
                      <Typography>Highlight</Typography>
                    </Box>
                    <Box
                      width={"25%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}>
                      <TextField
                        type='color'
                        value={subtitleColor2}
                        onChange={(e) => setSubtitleColor2(e.target.value)}
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": {
                            padding: "10.5px 6px", // giống như bạn đã dùng
                          },

                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: theme.palette.grey_500.main,
                            },
                            "&:hover fieldset": {
                              borderColor: theme.palette.grey_500.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.active.main,
                            },
                          },
                        }}
                      />
                      <Typography>Outline</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box width={"45%"}>
                  <Typography sx={{ my: "20px", fontWeight: "500" }}>
                    {t("subtitle_position")}
                  </Typography>
                  <Box>
                    <SubPositionPicker
                      urlVideo={urlVideo}
                      videoRef={videoRef}
                      setSubtitlePosition={setSubtitlePosition}
                      subtitlePosition={subtitlePosition}
                    />
                  </Box>
                </Box>
              </Box>
            </>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant='contained'
              disabled={!video}
              onClick={handleTranslate}
              sx={{
                width: "45%",
                background: theme.palette.active.main,
                fontSize: { xs: "10px", md: "17px" },
                borderRadius: "8px",
                color: "white",
                py: "10px",
                mt: "30px",
              }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1.7em'
                height='1.7em'
                fill='none'
                viewBox='0 0 17 21'
                focusable='false'
                className='chakra-icon css-1uib6s7'>
                <path
                  fill='#fff'
                  d='M9.05 8.2a.474.474 0 0 1 .901 0l.847 2.542a3.8 3.8 0 0 0 2.4 2.399l2.541.846a.474.474 0 0 1 0 .9l-2.542.847a3.8 3.8 0 0 0-2.4 2.4l-.846 2.542a.474.474 0 0 1-.9 0l-.847-2.542a3.8 3.8 0 0 0-2.399-2.4l-2.542-.846a.474.474 0 0 1 0-.9l2.542-.847a3.8 3.8 0 0 0 2.4-2.4zM3.98 1.506a.285.285 0 0 1 .541 0l.508 1.525c.227.68.76 1.213 1.44 1.44l1.525.508a.285.285 0 0 1 0 .54l-1.525.508a2.27 2.27 0 0 0-1.44 1.44l-.508 1.525a.285.285 0 0 1-.54 0l-.508-1.525a2.27 2.27 0 0 0-1.44-1.44L.508 5.52a.285.285 0 0 1 0-.54l1.525-.508a2.27 2.27 0 0 0 1.44-1.44zM13.26.13a.19.19 0 0 1 .36 0l.338 1.016c.15.454.507.81.96.96l1.017.34a.19.19 0 0 1 0 .359l-1.016.338a1.52 1.52 0 0 0-.961.961l-.339 1.016a.19.19 0 0 1-.36 0l-.338-1.016a1.52 1.52 0 0 0-.96-.96l-1.015-.34a.19.19 0 0 1 0-.359l1.016-.338c.454-.151.81-.507.96-.961z'></path>
              </svg>
              <Box ml={"10px"}>{t("translate")}</Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TranslationView;

import { styled } from "@mui/system";

const SwitchContainer = styled("div")(({ theme }) => ({
  width: 50,
  height: 20,
  borderRadius: 30,
  border: "2px solid rgb(5 122 85)",
  display: "flex",
  alignItems: "center",
  padding: "2px",
  cursor: "pointer",
  backgroundColor: "#fff",
  position: "relative",
  marginTop: "30px",
}));

const SwitchThumb = styled("div")<{ active: boolean }>(({ active }) => ({
  width: 20,
  height: 20,
  borderRadius: "50%",
  backgroundColor: active ? "rgb(5 122 85)" : "#ddd",
  position: "absolute",
  top: "2px",
  left: active ? "calc(100% - 26px)" : "2px",
  transition: "left 0.2s ease",
}));

function CustomSwitch({
  onChange,
  checked,
}: {
  onChange: (value: boolean) => void;
  checked: boolean;
}) {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <SwitchContainer onClick={handleToggle}>
      <SwitchThumb active={checked} />
    </SwitchContainer>
  );
}

import { IconButton, Stack, Paper } from "@mui/material";
import { Delete, Add, PlaylistAdd } from "@mui/icons-material";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { Await } from "react-router-dom";
import {
  getProcessVideo,
  getVideo,
  translateVideo,
} from "../../service/translate";
import { useCoursesContext } from "../../App";
import { url_voice } from "../../config";

type Subtitle = {
  id: number;
  start: string;
  end: string;
  text: string;
};

function SubtitleEditor({
  onSubtitlesChange,
  subtitles,
}: {
  onSubtitlesChange: (subs: Subtitle[]) => void;
  subtitles: any;
}) {
  const [subs, setSubs] = useState(subtitles);
  const { t } = useTranslation();

  useEffect(() => {
    setSubs(subtitles);
  }, [subtitles]);
  const handleChange = (id: number, field: keyof Subtitle, value: string) => {
    const newSubs = subs.map((sub) =>
      sub.id === id ? { ...sub, [field]: value } : sub
    );
    setSubs(newSubs);
    onSubtitlesChange(newSubs);
  };

  const handleDelete = (id: number) => {
    const newSubs = subs.filter((sub) => sub.id !== id);
    setSubs(newSubs);
    onSubtitlesChange(newSubs);
  };

  const handleAdd = () => {
    const newId = Math.max(...subs.map((s) => s.id), 0) + 1;
    const newSubs = [
      ...subs,
      { id: newId, start: "00:00:00,000", end: "00:00:00,000", text: "" },
    ];
    setSubs(newSubs);
    onSubtitlesChange(newSubs);
  };

  const handleInsertAfter = (index: number) => {
    const newId = Math.max(...subs.map((s) => s.id), 0) + 1;
    const newSub: Subtitle = {
      id: newId,
      start: "00:00:00,000",
      end: "00:00:00,000",
      text: "",
    };
    const newSubs = [...subs];
    newSubs.splice(index + 1, 0, newSub);
    setSubs(newSubs);
    onSubtitlesChange(newSubs);
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <Stack spacing={2}>
        {subs.map((sub, index) => (
          <Paper
            key={sub.id}
            variant='outlined'
            sx={{
              p: 2,
              position: "relative",
              ".css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "10px",
              },
              ".css-4kxyot-MuiInputBase-root-MuiOutlinedInput-root": {
                padding: "10px",
              },
            }}>
            <Typography variant='subtitle2' gutterBottom>
              #{index + 1}
            </Typography>
            <Stack direction='row' spacing={2}>
              <TextField
                label={t("start_time")}
                value={sub.start}
                onChange={(e) => handleChange(sub.id, "start", e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "rgb(5 122 85)",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "rgb(5 122 85)",
                  },
                }}
              />
              <TextField
                label={t("end_time")}
                value={sub.end}
                onChange={(e) => handleChange(sub.id, "end", e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "rgb(5 122 85)",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "rgb(5 122 85)",
                  },
                }}
              />
            </Stack>
            <TextField
              label='Text'
              value={sub.text}
              onChange={(e) => handleChange(sub.id, "text", e.target.value)}
              fullWidth
              multiline
              margin='normal'
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& fieldset": {
                    borderColor: "rgb(5 122 85)",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "rgb(5 122 85)",
                },
              }}
            />
            <Stack
              direction='row'
              spacing={1}
              sx={{ position: "absolute", top: 8, right: 8 }}>
              <IconButton
                onClick={() => handleInsertAfter(index)}
                color='rgb(5 122 85)'
                size='small'>
                <PlaylistAdd />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(sub.id)}
                color='error'
                size='small'>
                <Delete />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button
        variant='contained'
        startIcon={<Add />}
        sx={{ mt: 2, bgcolor: "rgb(5 122 85)", borderRadius: "10px" }}
        onClick={handleAdd}>
        {t("add_sub")}
      </Button>
    </div>
  );
}

import {
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  Slider,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const SubPositionPicker = ({
  setSubtitlePosition,
  subtitlePosition,
  urlVideo,
  videoRef,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleInputChange = (e) => {
    let val = Number(e.target.value);
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    setSubtitlePosition(val);
  };

  const handleSliderChange = (_, newValue) => {
    setSubtitlePosition(newValue);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const newPos = (y / rect.height) * 100;

    if (newPos >= 0 && newPos <= 100) {
      setSubtitlePosition(newPos);
    }
  };

  return (
    <>
      <TextField
        sx={{ width: "100%", height: "30px" }}
        type='number'
        value={Math.round(subtitlePosition)}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setOpen(true)}>
                <PlayArrowIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            height: "45px", // Set height cho input wrapper
            "& input": {
              height: "45px", // Set height cho chính input
              padding: "0 8px", // Giảm padding để vừa chiều cao
              boxSizing: "border-box",
            },
          },
        }}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='sm'>
        <DialogTitle> {t("adjust_sub_position")}</DialogTitle>
        <DialogContent>
          <Box
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            sx={{
              border: "1px solid #ccc",
              height: 300,
              position: "relative",
              overflow: "hidden",
              mt: 2,
              mb: 2,
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: 3,
            }}>
            <video
              ref={videoRef}
              width={"100%"}
              style={{ borderRadius: "10px" }}
              height={"100%"}
              controls>
              <source src={urlVideo} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <Box
              onMouseDown={handleMouseDown}
              sx={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: 30,
                backgroundColor: "rgba(255,255,255,0.8)",
                color: "#000",
                textAlign: "center",
                cursor: "grab",
                top: `${subtitlePosition}%`,
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {t("sub_position_pull_me")}
            </Box>
          </Box>

          <Slider
            value={subtitlePosition}
            onChange={handleSliderChange}
            min={0}
            max={100}
            valueLabelDisplay='auto'
          />

          <Box textAlign='right'>
            <Button onClick={() => setOpen(false)}>{t("close")}</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
