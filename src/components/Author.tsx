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
import {
  RiHeartFill,
  RiOpenaiFill,
  RiPauseCircleLine,
  RiPlayCircleLine,
  RiVoiceprintFill,
} from "react-icons/ri";
import alloy from "../images/alloy.svg";
import echo from "../images/echo.svg";
import fable from "../images/fable.svg";
import onyx from "../images/onyx.svg";
import nova from "../images/nova.svg";
import shimmer from "../images/shimmer.svg";
import { useEffect, useRef, useState } from "react";
import { country } from "../utils/acent";
import { useTranslation } from "react-i18next";
import vn from "../images/vn.png";
import { addVoicesFavorite } from "../service/voice";
import { useCoursesContext } from "../App";
import { useNavigate } from "react-router-dom";

const images: any = {
  alloy: alloy,
  echo: echo,
  fable: fable,
  onyx: onyx,
  nova: nova,
  shimmer: shimmer,
};

type Props = {
  data?: any;
  voice?: any;
  setVoice?: any;
  type: any;
  voicesFavorite: any;
  setVoicesFavorite: any;
};

const Author = ({
  data,
  setVoice,
  voice,
  type,
  voicesFavorite,
  setVoicesFavorite,
}: Props) => {
  const theme: any = useTheme();
  const [voices, setVoices] = useState(
    data.filter((item: any) => item.type == "openai")
  );
  const [anchorElGender, setAnchorElGender] = useState(null);
  const [typeVoice, setTypeVoice] = useState("openai");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClickGender = (event: any) => {
    setAnchorElGender(event.currentTarget);
  };
  const context: any = useCoursesContext();
  const gender: any = {
    Male: t("male"),
    Female: t("female"),
  };
  const age: any = {
    Young: t("young"),
    Old: t("old"),
    "Middle Aged": t("middle_aged"),
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

  useEffect(() => {
    if (data.length > 0) {
      if (Object.keys(context.state.history).length > 0) {
        let data_new = data.filter(
          (item: any) => item.id == context.state.history.type
        )[0];
        console.log(data_new);
        console.log(data.filter((item: any) => item.type == data_new.type));
        setVoice(data_new);
        setVoices(data.filter((item: any) => item.type == data_new.type));
        setTypeVoice(data_new.type);
      }
    }
  }, [data]);
  const openAcent = Boolean(anchorElAcent);
  const idAcent = openAcent ? "simple-popover" : undefined;

  const audioRefs: any = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  const togglePlayPause = (index: any) => {
    if (audioRefs.current[index]) {
      const isPlaying = playingIndex === index;

      // If an audio is already playing, pause it
      if (playingIndex !== null && playingIndex !== index) {
        audioRefs.current[playingIndex].pause();
        audioRefs.current[playingIndex].currentTime = 0; // Reset the previous audio to the start
      }

      // Play the new audio or reset to the start if it was already playing
      if (isPlaying) {
        audioRefs.current[index].pause();
        setPlayingIndex(null);
      } else {
        audioRefs.current[index].currentTime = 0; // Start from the beginning
        audioRefs.current[index].play();
        setPlayingIndex(index);
      }
    }
  };
  const handleAudioEnded = () => {
    // Reset playingIndex when audio ends
    setPlayingIndex(null);
  };

  // filter
  const [search, setSearch] = useState("");
  const handleSearch = (e: any) => {
    let value = e.target.value.toLowerCase();
    setSearch(e.target.value);
    if (value) {
      setVoices(
        voices.filter((item: any) => item.name.toLowerCase().includes(value))
      );
    } else {
      filterVoices();
    }
  };

  const [SelectedGender, setSelectedGender] = useState(null);
  const handleSelectGender = (Gender: any) => {
    if (Gender == SelectedGender) {
      console.log("toaoana");
      setSelectedGender(null);
      filterVoices();
    } else {
      setSelectedGender(Gender);
    }

    handleCloseGender();
  };
  const [SelectedAge, setSelectedAge] = useState(null);
  const handleSelectAge = (Age: any) => {
    if (Age == SelectedAge) {
      setSelectedAge(null);
      filterVoices();
    } else {
      setSelectedAge(Age);
    }
    console.log("AAA Age ===", Age);

    handleCloseAge();
  };
  const [SelectedAcent, setSelectedAcent] = useState(null);
  const handleSelectAcent = (Acent: any) => {
    if (Acent == SelectedAcent) {
      setSelectedAcent(null);
      filterVoices();
    } else {
      setSelectedAcent(Acent);
    }

    handleCloseAcent();
  };
  useEffect(() => {
    filterVoices();
  }, [SelectedAcent, SelectedAge, SelectedGender, typeVoice]);
  const filterVoices = () => {
    let data_filter = data;
    console.log(data_filter);
    if (SelectedAge) {
      data_filter = data_filter.filter((item: any) => item.age == SelectedAge);
    }
    if (SelectedGender) {
      data_filter = data_filter.filter(
        (item: any) => item.gender == SelectedGender
      );
    }
    if (SelectedAcent) {
      data_filter = data_filter.filter(
        (item: any) => item.accent == SelectedAcent
      );
    }
    if (typeVoice != "favorite") {
      setVoices(data_filter.filter((item: any) => item.type == typeVoice));
    }
  };
  const handleReset = () => {
    setSelectedAcent(null);
    setSelectedAge(null);
    setSelectedGender(null);
    setSearch("");
  };

  const handleFavorite = async (item: any) => {
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let data = await addVoicesFavorite({
          user_id: context.state.user.user_id,
          voice_id: item.id,
          voice_type: item.type,
        });
        if (data.voices && data.voices.length > 0) {
          data.voices = data.voices.filter(
            (item: any) => item.favorite == true
          );
          if (typeVoice == "favorite") {
            setVoices(voices.filter((ix: any) => ix.id != item.id));
          }
          setVoicesFavorite(data.voices.map((item: any) => item.id));
        }
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      border={"1px solid #dddddd"}
      sx={{ cursor: "pointer" }}
      height={"100%"}
      borderRadius={"8px"}>
      <Box p={"5px 10px"}>
        <Box
          display={"flex"}
          gap={"15px"}
          sx={{
            padding: "4px",
            borderRadius: "5px",
          }}
          bgcolor={theme.palette.grey_700.main}>
          <Box
            display={"flex"}
            alignItems={"center"}
            width={{ xs: "50%", md: "25%" }}
            bgcolor={typeVoice == "openai" ? "white" : undefined}
            onClick={() => {
              setTypeVoice("openai");
              if (type !== "story") {
                setVoice(data.filter((item: any) => item.type == "openai")[0]);
              }
              setVoices(data.filter((item: any) => item.type == "openai"));
              handleReset();
            }}
            borderRadius={"5px"}
            justifyContent={"center"}
            gap={"5px"}>
            <RiOpenaiFill fontWeight={"500"} />
            <Typography fontSize={".9rem"} fontWeight={"500"}>
              {t("voice_openai")}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            width={{ xs: "50%", md: "25%" }}
            bgcolor={typeVoice == "system" ? "white" : undefined}
            onClick={() => {
              setTypeVoice("system");
              if (type !== "story") {
                setVoice(data.filter((item: any) => item.type == "system")[0]);
              }
              setVoices(data.filter((item: any) => item.type == "system"));
              handleReset();
            }}
            borderRadius={"5px"}
            justifyContent={"center"}
            gap={"5px"}>
            <RiVoiceprintFill fontWeight={"500"} />
            <Typography fontSize={".9rem"} fontWeight={"500"}>
              {t("system_voices")}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            width={{ xs: "50%", md: "25%" }}
            bgcolor={typeVoice == "favorite" ? "white" : undefined}
            onClick={() => {
              setTypeVoice("favorite");
              if (voicesFavorite && voicesFavorite.length > 0) {
                console.log(
                  data.filter((item: any) => voicesFavorite.includes(item.id))
                );
                setVoices(
                  data.filter((item: any) => voicesFavorite.includes(item.id))
                );
              } else {
                setVoices([]);
              }
              handleReset();
            }}
            borderRadius={"5px"}
            justifyContent={"center"}
            gap={"5px"}>
            <RiHeartFill fontWeight={"500"} />
            <Typography fontSize={".9rem"} fontWeight={"500"}>
              {t("favorite")}
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
          display={"flex"}
          className='scroll-filter'
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={{ xs: "wrap", md: "unset" }}
          gap={"5px"}
          sx={{ overflowX: "auto" }}
          width={"100%"}>
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
              placeholder={`${t("search")}...`}
              id='demo-helper-text-aligned'
              value={search}
              onChange={handleSearch}
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
            <Button
              aria-describedby={idGender}
              onClick={handleClickGender}
              variant='outlined'
              endIcon={<ExpandMoreIcon />}
              sx={{
                borderColor: theme.palette.grey_500.main,
                background: "white",
                color: "black",
                width: "95px",
                "&:hover": {
                  borderColor: "unset",
                  color: "unset",
                  background: "white",
                },
              }}
              size='small'>
              {t("gender")}
            </Button>
            <Box
              sx={{
                "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper css-kvalmi-MuiPaper-root-MuiPopover-paper":
                  {
                    padding: "5px",
                  },
              }}>
              <Popover
                id={idGender}
                open={openGender}
                anchorEl={anchorElGender}
                onClose={handleCloseGender}
                sx={{ p: "5px", zIndex: 1301 }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}>
                <Typography
                  onClick={() => handleSelectGender("Male")}
                  sx={{
                    padding: "3px 10px",
                    width: "80px",
                    fontSize: ".8rem",
                    background:
                      SelectedGender == "Male"
                        ? theme.palette.active.main
                        : "unset",
                    color: SelectedGender == "Male" ? "white" : "black",
                  }}>
                  {t("male")}
                </Typography>
                <Typography
                  onClick={() => handleSelectGender("Female")}
                  sx={{
                    padding: "3px 10px",
                    width: "80px",
                    fontSize: ".8rem",
                    background:
                      SelectedGender == "Female"
                        ? theme.palette.active.main
                        : "unset",
                    color: SelectedGender == "Female" ? "white" : "black",
                  }}>
                  {t("female")}
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
                  width: "95px",
                  "&:hover": {
                    borderColor: "unset",
                    color: "unset",
                    background: "white",
                  },
                }}
                size='small'>
                {t("age")}
              </Button>

              <Popover
                id={idAge}
                open={openAge}
                anchorEl={anchorElAge}
                onClose={handleCloseAge}
                sx={{ p: "5px", zIndex: 1301 }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}>
                <Typography
                  onClick={() => handleSelectAge("Young")}
                  sx={{
                    padding: "3px 6px",
                    fontSize: ".8rem",
                    width: "80px",
                    background:
                      SelectedAge == "Young"
                        ? theme.palette.active.main
                        : "unset",
                    color: SelectedAge == "Young" ? "white" : "black",
                  }}>
                  {t("young")}
                </Typography>
                <Typography
                  onClick={() => handleSelectAge("Middle Aged")}
                  sx={{
                    padding: "3px 6px",
                    fontSize: ".8rem",
                    width: "80px",
                    background:
                      SelectedAge == "Middle Aged"
                        ? theme.palette.active.main
                        : "unset",
                    color: SelectedAge == "Middle Aged" ? "white" : "black",
                  }}>
                  {t("middle_aged")}
                </Typography>
                <Typography
                  onClick={() => handleSelectAge("Old")}
                  sx={{
                    padding: "3px 6px",
                    fontSize: ".8rem",
                    width: "80px",
                    background:
                      SelectedAge == "Old"
                        ? theme.palette.active.main
                        : "unset",
                    color: SelectedAge == "Old" ? "white" : "black",
                  }}>
                  {t("old")}
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
                  width: "95px",
                  "&:hover": {
                    borderColor: "unset",
                    color: "unset",
                    background: "white",
                  },
                }}
                size='small'>
                {t("accent")}
              </Button>

              <Popover
                id={idAcent}
                open={openAcent}
                anchorEl={anchorElAcent}
                onClose={handleCloseAcent}
                sx={{ p: "5px", zIndex: 1301 }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}>
                <Box
                  sx={{
                    height: "300px",
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}>
                  {country.map((item) => {
                    return (
                      <Box
                        display={"flex"}
                        onClick={() => handleSelectAcent(item.name)}
                        alignItems={"center"}
                        sx={{
                          background:
                            SelectedAcent == item.name
                              ? theme.palette.active.main
                              : "unset",
                          color: SelectedAcent == item.name ? "white" : "black",
                        }}
                        gap={"8px"}>
                        <img
                          src={item.flag}
                          width={30}
                          height={30}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          alt=''
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
                    );
                  })}
                </Box>
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
              onClick={handleReset}
              startIcon={<FilterAltOffIcon />}
              sx={{
                borderColor: theme.palette.grey_500.main,
                color: "black",
                width: "95px",
                "&:hover": {
                  borderColor: "unset",
                  color: "unset",
                },
              }}
              size='small'>
              {t("reset")}
            </Button>

            {/* <RestartAltIcon
              sx={{
                border: `1px solid ${theme.palette.grey_500.main}`,
                borderRadius: "50%",
                padding: "2px",
                background: "white",
              }}
            /> */}
          </Box>
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
          <Box display={"flex"} flexWrap={"wrap"} gap={"10px"} padding={"10px"}>
            {voices && voices.length > 0 ? (
              <>
                {voices.map((item: any, index: number) => {
                  let favorite = false;
                  if (voicesFavorite && voicesFavorite.length > 0) {
                    favorite = voicesFavorite.includes(item.id);
                  }
                  return (
                    <Box
                      onClick={() => setVoice(item)}
                      sx={{
                        borderRadius: "8px",
                        // flexGrow: 1,
                        border:
                          voice.id == item.id
                            ? `2px solid ${theme.palette.active.main}`
                            : "2px solid rgb(226 232 240)",
                        width: { xs: "100%", md: "48%" },
                        // flexBasis: "200",
                      }}>
                      <Stack
                        direction={"row"}
                        sx={{ padding: "6px" }}
                        justifyContent={"space-between"}>
                        <Typography fontSize={".9rem"} fontWeight={"500"}>
                          {item.name}
                        </Typography>
                        <Typography fontSize={".85rem"} fontWeight={"500"}>
                          QA00{index + 1}
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
                              <Typography>{age[item.age]}</Typography>
                            </Box>
                            <Box
                              border={"2px solid rgb(226 232 240)"}
                              p={"0px 8px"}
                              bgcolor={"rgb(248 250 252)"}
                              borderRadius={"5px"}
                              width={"max-content"}>
                              <Typography>{gender[item.gender]}</Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <img
                            src={
                              typeVoice == "system" ||
                              (typeVoice == "favorite" &&
                                !images[item.name.toLowerCase()])
                                ? vn
                                : images[item.name.toLowerCase()]
                            }
                            alt=''
                            width={"40px"}
                            height={"40px"}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
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
                          onClick={() => togglePlayPause(index)}
                          justifyContent={"center"}>
                          {playingIndex === index ? (
                            <RiPauseCircleLine />
                          ) : (
                            <RiPlayCircleLine />
                          )}
                          <Typography fontSize={".85rem"}>
                            {t("sample")}
                          </Typography>
                          <audio
                            ref={(el) => (audioRefs.current[index] = el)}
                            src={item.sample_audio_path}
                            onEnded={handleAudioEnded}
                          />
                        </Box>

                        <Box
                          onClick={() => handleFavorite(item)}
                          padding={"8px"}
                          width={"50%"}
                          display={"flex"}
                          position={"relative"}
                          zIndex={2}
                          alignItems={"center"}
                          gap={"5px"}
                          borderTop={"1px solid rgb(226 232 240)"}
                          justifyContent={"center"}>
                          {favorite ? (
                            <RiHeartFill color='rgb(5, 122, 85)' />
                          ) : (
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
                          )}

                          <Typography fontSize={".85rem"}>
                            {" "}
                            {t("love")}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
              </>
            ) : (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                paddingTop={"100px"}
                width={"100%"}
                height={"100%"}>
                <FilterAltOffIcon sx={{ fontSize: "60px", color: "#dddddd" }} />
                <Typography fontSize={"1.3rem"} color={"#dddddd"}>
                  {t("no_voice_found")}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Author;
