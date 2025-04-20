import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  TextField,
} from "@mui/material";
import { RiUploadCloudFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

const EmojView = ({
  textVoice,
  setTextVoice,
  limit,
  dataCustomEmotions,
  setLoading,
  getEmotionData,
  setPrompt,
}: any) => {
  const { t } = useTranslation();
  return (
    <Box>
      <AdvancedOptions
        dataCustomEmotions={dataCustomEmotions}
        setLoading={setLoading}
        getEmotionData={getEmotionData}
        setPrompt={setPrompt}
      />
      <Box
        width={"100%"}
        height={"100%"}
        position={"relative"}
        sx={{
          ".css-lh8pzc-MuiInputBase-root-MuiOutlinedInput-root": {
            height: "83%",
            border: "none",
          },
          ".css-15oluye-MuiFormControl-root-MuiTextField-root": {
            height: "90%",
          },
        }}
        boxSizing={"border-box"}>
        <TextField
          placeholder={t("input_text_desc")}
          multiline
          fullWidth
          value={textVoice}
          onChange={(e) => {
            if (e.target.value.length <= limit) {
              setTextVoice(e.target.value);
            } else {
              if (!limit) {
                setTextVoice(e.target.value);
              }
            }
          }}
          rows={4} // Số dòng hiển thị
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
              height: "49vh !important", // Cài đặt chiều cao tự động
              minHeight: "100px", // Đặt chiều cao tối thiểu nếu cần
              resize: "none", // Bỏ resize của textarea
              overflow: "auto", // Để có thể cuộn
              scrollbarWidth: "none", // Ẩn thanh cuộn cho Firefox
              msOverflowStyle: "none", // Ẩn thanh cuộn cho Internet Explorer và Edge
            },
            "& .MuiFormControl-root": {
              minHeight: "100px", // Đặt chiều cao tối thiểu cho TextField
            },
            // Ẩn thanh cuộn trong các trình duyệt WebKit
            "&::-webkit-scrollbar": {
              display: "none", // Ẩn thanh cuộn
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default EmojView;

import {
  Chip,
  Modal,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PetsIcon from "@mui/icons-material/Pets";
import BoltIcon from "@mui/icons-material/Bolt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCoursesContext } from "../../App";
import { toast } from "react-toastify";
import {
  createCustomEmotions,
  deleteCustomEmotions,
  updateCustomEmotions,
} from "../../service/voice";

function AdvancedOptions({
  dataCustomEmotions,
  setLoading,
  getEmotionData,
  setPrompt,
}: any) {
  const [selected, setSelected]: any = useState(["acdoc"]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion]: any = useState("acdoc1");
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const [openEnergyModal, setOpenEnergyModal] = useState(false);
  const [selectedEnergy, setSelectedEnergy]: any = useState("nangluong1");
  const [energySearch, setEnergySearch] = useState("");
  const [showCustomEnergyForm, setShowCustomEnergyForm] = useState(false);
  const [customEnergyName, setCustomEnergyName] = useState("");
  const [customEnergyPrompt, setCustomEnergyPrompt] = useState("");
  const [editEnergyValue, setEditEnergyValue] = useState(null);
  const [openReminderModal, setOpenReminderModal] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [selectedReminder, setSelectedReminder]: any = useState("1");
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderName, setReminderName] = useState("");
  const [reminderPrompt, setReminderPrompt] = useState("");
  const [editReminderValue, setEditReminderValue] = useState<string | null>(
    null
  );
  let context: any = useCoursesContext();
  const { t } = useTranslation();

  // Audio handling
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [playingEmotionId, setPlayingEmotionId] = useState<string | null>(null);

  useEffect(() => {
    if (selected.includes("acdoc") && selectedEmotion) {
      setPrompt(selectedEmotion.prompt);
    }
    if (selected.includes("nangluong") && selectedEnergy) {
      setPrompt(selectedEnergy.prompt);
    }
    if (selected.includes("loinhac") && selectedReminder) {
      setPrompt(selectedReminder.prompt);
    }
  }, [selectedReminder, selectedEnergy, selectedEmotion, selected]);

  const handlePlaySample = (audioUrl: string, emotionId: string) => {
    if (currentAudio && playingEmotionId === emotionId) {
      // Pause the current audio
      currentAudio.pause();
      setCurrentAudio(null);
      setPlayingEmotionId(null);
      return;
    }

    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create and play new audio
    const audio = new Audio(audioUrl);
    setCurrentAudio(audio);
    setPlayingEmotionId(emotionId);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      toast.error("Không thể phát âm thanh mẫu.");
      setCurrentAudio(null);
      setPlayingEmotionId(null);
    });

    // Reset when audio ends
    audio.onended = () => {
      setCurrentAudio(null);
      setPlayingEmotionId(null);
    };
  };

  const options = [
    { value: "acdoc", label: t("emotion"), icon: <span>😊</span> },
    { value: "nangluong", label: t("vibes"), icon: <span>⚡</span> },
    { value: "loinhac", label: t("prompt"), icon: <span>🔔</span> },
  ];

  useEffect(() => {
    if (Object.keys(dataCustomEmotions).length > 0) {
      setReminders(dataCustomEmotions.prompt);
      setSelectedEmotion(dataCustomEmotions.emotions[0]);
    }
  }, [dataCustomEmotions]);

  const handleToggle = (value: string) => {
    if (value === "acdoc") {
      setOpenModal(true);
      setSelected(["acdoc"]);
    } else if (value === "nangluong") {
      setOpenEnergyModal(true);
      setSelected(["nangluong"]);
    } else if (value === "loinhac") {
      setOpenReminderModal(true);
      setSelected(["loinhac"]);
    } else {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const handleEmotionSelect = (value: any) => {
    setSelectedEmotion(value);
    setOpenModal(false);
  };

  const filteredEmotionOptions =
    Object.keys(dataCustomEmotions).length > 0
      ? dataCustomEmotions.emotions.filter((option: any) =>
          option.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  const filteredEnergyOptions =
    Object.keys(dataCustomEmotions).length > 0
      ? dataCustomEmotions.vibes.filter((option: any) =>
          option.name.toLowerCase().includes(energySearch.toLowerCase())
        )
      : [];

  const handleCustomEnergySubmit = async () => {
    setLoading(true);
    try {
      if (customEnergyName && customEnergyPrompt) {
        let newEnergy: any = {
          name: customEnergyName,
          prompt: customEnergyPrompt,
          type: "vibes",
        };
        if (context.state.user.user_id) {
          newEnergy["user_id"] = context.state.user.user_id;
          let result;
          if (editEnergyValue) {
            result = await updateCustomEmotions(editEnergyValue, newEnergy);
          } else {
            result = await createCustomEmotions(newEnergy);
          }
          if (result && result.code == 0) {
            getEmotionData();
            setShowCustomEnergyForm(false);
            setCustomEnergyName("");
            setCustomEnergyPrompt("");
            setEditEnergyValue(null);
            toast.success(result.msg);
          } else {
            toast.warning(result.msg);
          }
        } else {
          toast.warning("Bạn cần đăng nhập");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleEnergyEdit = (value: any) => {
    setEditEnergyValue(value.id);
    setCustomEnergyName(value.name);
    setCustomEnergyPrompt(value.prompt);
    setShowCustomEnergyForm(true);
  };

  const handleEnergyDelete = async (id: any) => {
    setLoading(true);
    try {
      if (context.state.user.user_id) {
        let result = await deleteCustomEmotions(id);
        if (result && result.code == 0) {
          getEmotionData();
          toast.success(result.msg);
        } else {
          toast.warning(result.msg);
        }
      } else {
        toast.warning("Bạn cần đăng nhập");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleReminderSelect = (value: any) => {
    setSelectedReminder(value);
    setOpenReminderModal(false);
  };

  const handleReminderUnselect = () => {
    setSelectedReminder(null);
    setOpenReminderModal(false);
  };

  const handleReminderDelete = async (id: any) => {
    setLoading(true);
    try {
      if (context.state.user.user_id) {
        let result = await deleteCustomEmotions(id);
        if (result && result.code == 0) {
          getEmotionData();
          toast.success(result.msg);
        } else {
          toast.warning(result.msg);
        }
      } else {
        toast.warning("Bạn cần đăng nhập");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleReminderEdit = async (value: any) => {
    setEditReminderValue(value.id);
    setReminderName(value.name);
    setReminderPrompt(value.prompt);
    setShowReminderForm(true);
  };

  const handleReminderSubmit = async () => {
    setLoading(true);
    try {
      if (reminderName && reminderPrompt) {
        let newEnergy: any = {
          name: reminderName,
          prompt: reminderPrompt,
          type: "prompt",
        };
        if (editReminderValue) {
          if (context.state.user.user_id) {
            newEnergy["user_id"] = context.state.user.user_id;
            let result = await updateCustomEmotions(
              editReminderValue,
              newEnergy
            );
            if (result && result.code == 0) {
              getEmotionData();
              setShowReminderForm(false);
              setReminderName("");
              setReminderPrompt("");
              setEditReminderValue(null);
              toast.success(result.msg);
            } else {
              toast.warning(result.msg);
            }
          } else {
            toast.warning("Bạn cần đăng nhập");
          }
        } else {
          if (context.state.user.user_id) {
            newEnergy["user_id"] = context.state.user.user_id;
            let result = await createCustomEmotions(newEnergy);
            if (result && result.code == 0) {
              getEmotionData();
              setShowReminderForm(false);
              setReminderName("");
              setReminderPrompt("");
              setEditReminderValue(null);
              toast.success(result.msg);
            } else {
              toast.warning(result.msg);
            }
          } else {
            toast.warning("Bạn cần đăng nhập");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        gap={1}
        p='8px'
        sx={{ borderBottom: "1px solid #ddd" }}
        flexWrap='wrap'>
        <Typography variant='body2' color='text.secondary'>
          ⚙️ {t("advanced_options")}:
        </Typography>
        {options.map((option) => {
          console.log("label", selectedEmotion.name);
          return (
            <Chip
              key={option.value}
              label={
                <Box display='flex' alignItems='center' gap={0.5}>
                  {option.icon}
                  {option.value === "acdoc" && selectedEmotion?.name
                    ? selectedEmotion.name
                    : option.value === "nangluong" && selectedEnergy?.name
                    ? selectedEnergy.name
                    : option.value === "loinhac" && selectedReminder?.name
                    ? selectedReminder.name
                    : option.label}
                </Box>
              }
              clickable
              onClick={() => handleToggle(option.value)}
              sx={{
                backgroundColor: selected.includes(option.value)
                  ? "#e3f2fd"
                  : "#f5f5f5",
                color: selected.includes(option.value)
                  ? theme.palette.active.main
                  : "#000",
                border: selected.includes(option.value)
                  ? `1px solid ${theme.palette.active.main}`
                  : "1px solid #ccc",
                "&:hover": {
                  backgroundColor: selected.includes(option.value)
                    ? "#bbdefb"
                    : "#e0e0e0",
                },
                borderRadius: 2,
                fontWeight: 500,
                height: "26px",
              }}
            />
          );
        })}
      </Box>

      {/* Modal cảm xúc */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 500,
            maxHeight: 600,
            overflowY: "auto",
            bgcolor: "background.paper",
            m: "100px auto",
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}>
          <Typography variant='h6' mb={2}>
            {t("choose_emotion")}
          </Typography>

          <TextField
            fullWidth
            variant='outlined'
            placeholder={t("searching_for_emotions")}
            size='small'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  borderColor: "rgb(5 122 85)",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "rgb(5 122 85)",
              },
              mb: 2,
            }}
          />

          <List>
            {filteredEmotionOptions.map((option) => {
              const isSelected = selectedEmotion.name === option.name;
              const isPlaying = playingEmotionId === option.id;
              return (
                <ListItem
                  key={option.name}
                  sx={{
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    borderRadius: 1,
                  }}
                  secondaryAction={
                    !isSelected && (
                      <Box display='flex' gap={1}>
                        <Button
                          size='small'
                          sx={{
                            borderColor: "rgb(5 122 85)",
                            color: "rgb(5 122 85)",
                          }}
                          variant='outlined'
                          onClick={() =>
                            handlePlaySample(option.sample_audio, option.id)
                          }
                          startIcon={
                            isPlaying ? <PauseIcon /> : <PlayArrowIcon />
                          }>
                          {t("sample")}
                        </Button>
                        <Button
                          size='small'
                          variant='contained'
                          sx={{ bgcolor: "rgb(5 122 85)" }}
                          onClick={() => handleEmotionSelect(option)}>
                          {t("use")}
                        </Button>
                      </Box>
                    )
                  }>
                  <ListItemIcon>
                    <img src={option.icon} width={35} height={35} alt='' />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display='flex' alignItems='center' gap={1}>
                        <Typography fontWeight={500}>{option.name}</Typography>
                        {isSelected && (
                          <CheckIcon fontSize='small' color='primary' />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant='body2'
                        sx={{ width: "70%" }}
                        color='text.secondary'>
                        {option.prompt}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
            {filteredEmotionOptions.length === 0 && (
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign='center'
                mt={2}>
                Không tìm thấy cảm xúc phù hợp.
              </Typography>
            )}
          </List>
        </Box>
      </Modal>

      {/* Modal năng lượng */}
      <Modal open={openEnergyModal} onClose={() => setOpenEnergyModal(false)}>
        <Box
          sx={{
            width: 800,
            maxHeight: 600,
            overflowY: "auto",
            bgcolor: "background.paper",
            m: "100px auto",
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}>
          {!showCustomEnergyForm ? (
            <>
              <Box
                mb={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Typography variant='h6'>{t("choose_vibes")}</Typography>
                <Button
                  variant='contained'
                  sx={{ bgcolor: "rgb(5 122 85)" }}
                  onClick={() => {
                    setShowCustomEnergyForm(true);
                    setEditEnergyValue(null);
                    setCustomEnergyName("");
                    setCustomEnergyPrompt("");
                  }}>
                  {t("add_new_vibe")}
                </Button>
              </Box>

              <TextField
                fullWidth
                variant='outlined'
                placeholder={t("search_vibes")}
                size='small'
                value={energySearch}
                onChange={(e) => setEnergySearch(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "rgb(5 122 85)",
                  },
                  mb: 2,
                }}
              />
              <Typography fontWeight={500}>{t("vibes")}</Typography>
              <List>
                {filteredEnergyOptions.map((option) => {
                  const isSelected = selectedEnergy.name === option.name;
                  const htmlText = option.prompt.replace(/\n\n/g, "<br/>");
                  if (!option.user_id) {
                    return (
                      <ListItem
                        key={option.name}
                        sx={{
                          "&:hover": { backgroundColor: "#f5f5f5" },
                          borderRadius: 1,
                        }}
                        secondaryAction={
                          !isSelected && (
                            <Box display='flex' gap={1}>
                              <Button
                                size='small'
                                variant='contained'
                                sx={{ bgcolor: "rgb(5 122 85)" }}
                                onClick={() => {
                                  setSelectedEnergy(option);
                                  setOpenEnergyModal(false);
                                }}>
                                {t("use")}
                              </Button>
                            </Box>
                          )
                        }>
                        <ListItemText
                          primary={
                            <Box display='flex' alignItems='center' gap={1}>
                              <Typography fontWeight={500}>
                                {option.name}
                              </Typography>
                              {isSelected && (
                                <CheckIcon fontSize='small' color='primary' />
                              )}
                            </Box>
                          }
                          secondary={
                            <Typography variant='body2' color='text.secondary'>
                              <div
                                dangerouslySetInnerHTML={{ __html: htmlText }}
                              />
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  }
                  return null;
                })}
                {filteredEnergyOptions.length === 0 && (
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    textAlign='center'
                    mt={2}>
                    Không tìm thấy cảm xúc phù hợp.
                  </Typography>
                )}
              </List>
              <Typography fontWeight={500}>{t("vibe_custom")}</Typography>
              <List>
                {filteredEnergyOptions.map((option) => {
                  const isSelected = selectedEnergy.name === option.name;
                  const htmlText = option.prompt.replace(/\n\n/g, "<br/>");
                  if (option.user_id) {
                    return (
                      <ListItem
                        key={option.name}
                        sx={{
                          "&:hover": { backgroundColor: "#f5f5f5" },
                          borderRadius: 1,
                        }}
                        secondaryAction={
                          <Box display='flex' gap={1}>
                            {!isSelected ? (
                              <Button
                                size='small'
                                variant='contained'
                                sx={{ bgcolor: "rgb(5 122 85)" }}
                                onClick={() => {
                                  setSelectedEnergy(option);
                                  setOpenEnergyModal(false);
                                }}>
                                {t("use")}
                              </Button>
                            ) : (
                              <Button
                                size='small'
                                variant='outlined'
                                sx={{
                                  borderColor: "rgb(5 122 85)",
                                  color: "rgb(5 122 85)",
                                }}
                                onClick={() => setSelectedEnergy("")}>
                                {t("unselect")}
                              </Button>
                            )}
                            <IconButton
                              size='small'
                              onClick={() => handleEnergyEdit(option)}>
                              <EditIcon fontSize='small' />
                            </IconButton>
                            <IconButton
                              size='small'
                              onClick={() => handleEnergyDelete(option.id)}>
                              <DeleteIcon fontSize='small' />
                            </IconButton>
                          </Box>
                        }>
                        <ListItemText
                          primary={
                            <Box display='flex' alignItems='center' gap={1}>
                              <Typography fontWeight={500}>
                                {option.name}
                              </Typography>
                              {isSelected && (
                                <CheckIcon fontSize='small' color='primary' />
                              )}
                            </Box>
                          }
                          secondary={
                            <Typography variant='body2' color='text.secondary'>
                              <div
                                dangerouslySetInnerHTML={{ __html: htmlText }}
                              />
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  }
                  return null;
                })}
                {filteredEnergyOptions.filter((option: any) => option.user_id)
                  .length === 0 && (
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    textAlign='center'
                    mt={2}>
                    Bạn chưa có bất kỳ năng lượng tùy chỉnh nào.
                  </Typography>
                )}
              </List>
            </>
          ) : (
            <>
              <Typography variant='h6' mb={2}>
                {editEnergyValue
                  ? t("edit_vibe")
                  : t("create_a_new_custom_vibe")}
              </Typography>

              <TextField
                fullWidth
                variant='outlined'
                label={t("vibe_name")}
                placeholder='Ex: Santa Claus'
                size='small'
                value={customEnergyName}
                onChange={(e) => setCustomEnergyName(e.target.value)}
                sx={{ mb: 2 }}
                helperText={t("this_name_vibe")}
              />

              <TextField
                fullWidth
                variant='outlined'
                label={t("vibe_prompt")}
                placeholder={t("prompt_here")}
                size='small'
                multiline
                rows={4}
                value={customEnergyPrompt}
                onChange={(e) => setCustomEnergyPrompt(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box display='flex' justifyContent='flex-end' gap={1}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    setShowCustomEnergyForm(false);
                    setCustomEnergyName("");
                    setCustomEnergyPrompt("");
                    setEditEnergyValue(null);
                  }}
                  sx={{ borderColor: "rgb(5 122 85)", color: "rgb(5 122 85)" }}>
                  {t("close")}
                </Button>
                <Button
                  variant='contained'
                  sx={{ bgcolor: "rgb(5 122 85)" }}
                  onClick={handleCustomEnergySubmit}
                  disabled={!customEnergyName || !customEnergyPrompt}>
                  {editEnergyValue ? t("update") : t("complete")}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal lời nhắc */}
      <Modal
        open={openReminderModal}
        onClose={() => setOpenReminderModal(false)}>
        <Box
          sx={{
            width: 500,
            maxHeight: 600,
            overflowY: "auto",
            bgcolor: "background.paper",
            m: "100px auto",
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}>
          {!showReminderForm ? (
            <>
              <Box
                mb={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Typography variant='h6'>{t("custom_prompt")}</Typography>
                <Button
                  variant='contained'
                  sx={{ bgcolor: "rgb(5 122 85)" }}
                  onClick={() => {
                    setShowReminderForm(true);
                    setEditReminderValue(null);
                    setReminderName("");
                    setReminderPrompt("");
                  }}>
                  {t("save")}
                </Button>
              </Box>

              <List>
                {reminders.map((reminder) => {
                  const isSelected = selectedReminder.name == reminder.name;
                  console.log("isSelected", isSelected);
                  return (
                    <ListItem
                      key={reminder.name}
                      sx={{
                        "&:hover": { backgroundColor: "#f5f5f5" },
                        borderRadius: 1,
                      }}
                      secondaryAction={
                        <Box display='flex' gap={1}>
                          {isSelected ? (
                            <Button
                              size='small'
                              variant='outlined'
                              sx={{
                                borderColor: "rgb(5 122 85)",
                                color: "rgb(5 122 85)",
                              }}
                              onClick={() => handleReminderUnselect()}>
                              Không dùng
                            </Button>
                          ) : (
                            <Button
                              size='small'
                              variant='contained'
                              sx={{ bgcolor: "rgb(5 122 85)" }}
                              onClick={() => handleReminderSelect(reminder)}>
                              {t("use")}
                            </Button>
                          )}
                          <IconButton
                            size='small'
                            onClick={() => handleReminderEdit(reminder)}>
                            <EditIcon fontSize='small' />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => handleReminderDelete(reminder.id)}>
                            <DeleteIcon fontSize='small' />
                          </IconButton>
                        </Box>
                      }>
                      <ListItemText
                        primary={
                          <Box display='flex' alignItems='center' gap={1}>
                            <Typography fontWeight={500}>
                              {reminder.name}
                            </Typography>
                            {isSelected && (
                              <CheckIcon fontSize='small' color='primary' />
                            )}
                          </Box>
                        }
                        secondary={
                          <Typography variant='body2' color='text.secondary'>
                            {reminder.prompt}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
                {reminders.length === 0 && (
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    textAlign='center'
                    mt={2}>
                    Bạn chưa có bất kỳ lời nhắc nào được lưu.
                  </Typography>
                )}
              </List>
            </>
          ) : (
            <>
              <Typography variant='h6' mb={2}>
                {editReminderValue ? t("edit_reminder") : t("save_new_prompt")}
              </Typography>

              <TextField
                fullWidth
                variant='outlined'
                label={t("prompt_name")}
                placeholder={t("reminder_here")}
                size='small'
                value={reminderName}
                onChange={(e) => setReminderName(e.target.value)}
                sx={{ mb: 2 }}
                helperText={t("your_reminder")}
              />

              <TextField
                fullWidth
                variant='outlined'
                label={t("custom_prompt")}
                placeholder={t("reminder_here")}
                size='small'
                multiline
                rows={4}
                value={reminderPrompt}
                onChange={(e) => setReminderPrompt(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box display='flex' justifyContent='flex-end' gap={1}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    setShowReminderForm(false);
                    setReminderName("");
                    setReminderPrompt("");
                    setEditReminderValue(null);
                  }}
                  sx={{ borderColor: "rgb(5 122 85)", color: "rgb(5 122 85)" }}>
                  {t("close")}
                </Button>
                <Button
                  variant='contained'
                  sx={{ bgcolor: "rgb(5 122 85)" }}
                  onClick={handleReminderSubmit}
                  disabled={!reminderName || !reminderPrompt}>
                  {editReminderValue ? t("update") : t("complete")}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
