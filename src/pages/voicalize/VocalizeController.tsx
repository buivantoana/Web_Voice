import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import VocalizeView from "./VocalizeView";
import Loading from "../../components/Loading";
import { createVoice, getVoicesOpenAi } from "../../service/voice";
import { useCoursesContext } from "../../App";
import { useLocation } from "react-router-dom";

type Props = {};

const VocalizeController = (props: Props) => {
  const [textVoice, setTextVoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [selectedQuality, setSelectedQuality] = useState("Chất lượng cao");
  const [anchorElQuality, setAnchorElQuality] = useState(null);
  const [base64Voice, setBase64Voice] = useState("");
  const openQuality = Boolean(anchorElQuality);
  const idQuality = openQuality ? "simple-popover" : undefined;
  const [isOpen, setIsOpen] = useState(false);
  const [openAuthor, setOpenAuthor] = React.useState(false);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voices, setVoices] = useState<any>([]);
  const [voice, setVoice] = useState<any>({});
  const context: any = useCoursesContext();

  const toggleDrawer = (open: any) => () => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (Object.keys(context.state.history).length > 0) {
      if (context.state.history.content) {
        setTextVoice(context.state.history.content);
      }
      if (context.state.history.speed) {
        setSpeed(context.state.history.speed);
      }
    }
    loadVoicesOpenai();
  }, []);
  const loadVoicesOpenai = async () => {
    setLoadingVoices(true);
    try {
      let data = await getVoicesOpenAi();
      console.log("AAAA data", data);
      if (data.voices && data.voices.length > 0) {
        setVoice(data.voices[0]);
        setVoices(data.voices);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  const handleClickOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  const handleSelectQuality = (quality: any) => {
    setSelectedQuality(quality);
    handleCloseQuality();
  };

  const handleClickQuality = (event: any) => {
    setAnchorElQuality(event.currentTarget);
  };
  const handleCloseQuality = () => {
    setAnchorElQuality(null);
  };
  const handleCreateVoice = async () => {
    setLoading(true);
    try {
      let data = await createVoice({
        user_id:
          Object.keys(context.state.user).length > 0
            ? context.state.user.user_id
            : "abc 22",
        txt: textVoice,
        speed: speed,
        voice: voice.id,
      });
      console.log(data);
      if (data.code == 0) {
        setBase64Voice(data.voice_base64);
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  console.log("AAA context voice====", context);
  return (
    <>
      {loading && <Loading />}
      <VocalizeView
        textVoice={textVoice}
        setSpeed={setSpeed}
        speed={speed}
        setTextVoice={setTextVoice}
        handleClickQuality={handleClickQuality}
        handleCloseQuality={handleCloseQuality}
        idQuality={idQuality}
        anchorElQuality={anchorElQuality}
        openQuality={openQuality}
        handleSelectQuality={handleSelectQuality}
        selectedQuality={selectedQuality}
        base64Voice={base64Voice}
        handleCloseAuthor={handleCloseAuthor}
        handleClickOpenAuthor={handleClickOpenAuthor}
        openAuthor={openAuthor}
        toggleDrawer={toggleDrawer}
        isOpen={isOpen}
        handleCreateVoice={handleCreateVoice}
        voices={voices}
        voice={voice}
        setVoice={setVoice}
        loadingVoices={loadingVoices}
        limit={
          Object.keys(context.state.user).length > 0 &&
          context.state.user.limit_txt
            ? context.state.user.limit_txt
            : 0
        }
      />
    </>
  );
};

export default VocalizeController;
