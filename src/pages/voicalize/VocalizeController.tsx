import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import VocalizeView from "./VocalizeView";
import Loading from "../../components/Loading";
import { createVoice, getVoicesOpenAi } from "../../service/voice";
import { useCoursesContext } from "../../App";

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
    loadVoicesOpenai();
  }, []);
  const loadVoicesOpenai = async () => {
    setLoadingVoices(true);
    try {
      let data = await getVoicesOpenAi();
      console.log("AAAA data", data);
      if (data.voices && data.voices.length > 0) {
        setVoice(data.voices[0]);
        setVoices([
          {
            id: "alloy",
            name: "Alloy",
            gender: "Male",
            age: "Young",
            sample_audio_path:
              "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/alloy.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T121702Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=66fee81fa13316cade1756b0f888790239ef8154adcf04c7b8f3320e0cc78c5a",
            accent: "English",
            description: "Neutral, professional, and clear",
          },
          {
            id: "echo",
            name: "Echo",
            gender: "Male",
            age: "Young",
            sample_audio_path:
              "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/echo.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T121702Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=5496a33c54f67b4820680dd8b848f2fdc84620e99293b80285faa6fedcf954f8",
            accent: "English",
            description: "Warm, friendly, and engaging",
          },
          {
            id: "fable",
            name: "Fable",
            gender: "Male",
            age: "Young",
            sample_audio_path:
              "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/fable.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T121702Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=5d6fcd01725a0b941cfcb02706dcbf11c59fca86b3cb875afa9b33a82f52ee80",
            accent: "English",
            description: "Energetic, expressive, and engaging",
          },
          {
            id: "onyx",
            name: "Onyx",
            gender: "Male",
            age: "Old",
            sample_audio_path:
              "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/onyx.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T121703Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8fbe0641b012ca8b186c8bd2e039f304ad8aaf52b39ccd08658edeb76ccf4146",
            accent: "English",
            description: "Older, mature, and experienced",
          },
          {
            id: "nova",
            name: "Nova",
            gender: "Female",
            age: "Young",
            sample_audio_path:
              "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/nova.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T121703Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3de4f6274e75cfda218bec1a451efaf482953fde7a86afdf3324261582780fd3",
            accent: "English",
            description: "Young, energetic, and engaging",
          },
          {
            id: "shimmer",
            name: "Shimmer",
            gender: "Female",
            age: "Young",
            sample_audio_path:
              "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/shimmer.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T121703Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=b13b6b0f79f2c6e0d5136e0199d60bbbb0e2696253745388dc6bd6d51d8cad6d",
            accent: "English",
            description: "Lively, vibrant, and dynamic",
          },
        ]);
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
        speed: Math.floor(speed),
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
      />
    </>
  );
};

export default VocalizeController;
