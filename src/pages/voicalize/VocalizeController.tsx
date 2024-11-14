import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import VocalizeView from "./VocalizeView";
import Loading from "../../components/Loading";
import {
  createStoryMaker,
  createVoice,
  getInfo,
  getVoicesOpenAi,
} from "../../service/voice";
import { useCoursesContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [block, setBlock] = useState<any>([]);
  const context: any = useCoursesContext();
  const navigate: any = useNavigate();
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
    if (context.state.tts_text) {
      setTextVoice(context.state.tts_text);
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
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let data = await createVoice({
          user_id: context.state.user.user_id,
          txt: textVoice,
          speed: speed,
          voice: voice.id,
        });
        console.log(data);
        if (data.code == 0) {
          setBase64Voice(data.voice_base64);
          setIsOpen(true);
          let infor = await getInfo({ user_id: context.state.user.phone });
          if (infor.code == 0) {
            context.dispatch({
              type: "LOGIN",
              payload: {
                ...context.state,
                user: { ...context.state.user, ...infor.data },
              },
            });
          }
        } else {
          toast.warning(data.msg);
        }
      } else {
        localStorage.setItem("tts_text", textVoice);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleStoryMaker = async () => {
    setLoading(true);
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let body = {
          user_id: context.state.user.user_id,
          list_story: block.map((item: any) => {
            return {
              id: item.voice,
              name: item.name,
              text: item.text,
              delay: Number(item.delay),
              voice:
                voices.filter((ix: any) => ix.id == item.voice)[0].gender ==
                "Male"
                  ? "en_us_male"
                  : "en_us_female",
              speed: Number(item.speed),
            };
          }),
        };
        let data = await createStoryMaker(body);

        if (data.code == 0) {
          setBase64Voice(data.voice_base64);
          setIsOpen(true);
          let infor = await getInfo({ user_id: context.state.user.phone });
          if (infor.code == 0) {
            context.dispatch({
              type: "LOGIN",
              payload: {
                ...context.state,
                user: { ...context.state.user, ...infor.data },
              },
            });
          }
        } else {
          toast.warning(data.msg);
        }
      } else {
        toast.warning("Bạn cần đăng nhập để sử dụng.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  console.log("AAA context voice====", block);
  return (
    <>
      {loading && <Loading />}
      <VocalizeView
        textVoice={textVoice}
        setSpeed={setSpeed}
        speed={speed}
        setBlock={setBlock}
        block={block}
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
        handleStoryMaker={handleStoryMaker}
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
