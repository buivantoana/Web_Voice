import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import VocalizeView from "./VocalizeView";
import Loading from "../../components/Loading";
import { createVoice, getVoicesOpenAi } from "../../service/voice";

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
  const [voices, setVoices] = useState([
    {
      id: "alloy",
      name: "Alloy",
      description: "Neutral, professional, and clear",
      age: "Old",
      gender: "Male",
      accent: "Vietnamese",
      sample_audio_path:
        "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/alloy.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T044455Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=53f7db2d4706a29662d2026000406ecf44a31dae6f2818c28aa53c735a1dbf2d",
    },
    {
      id: "echo",
      name: "Echo",
      description: "Warm, friendly, and engaging",
      age: "Young",
      gender: "Male",
      accent: "English",
      sample_audio_path:
        "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/alloy.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T044455Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=53f7db2d4706a29662d2026000406ecf44a31dae6f2818c28aa53c735a1dbf2d",
    },
    {
      id: "fable",
      name: "Fable",
      description: "Energetic, expressive, and engaging",
      age: "Old",
      gender: "Female",
      accent: "English",
      sample_audio_path:
        "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/alloy.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T044455Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=53f7db2d4706a29662d2026000406ecf44a31dae6f2818c28aa53c735a1dbf2d",
    },
    {
      id: "onyx",
      name: "Onyx",
      description: "Older, mature, and experienced",
      age: "Young",
      gender: "Female",
      accent: "English",
      sample_audio_path:
        "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/alloy.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T044455Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=53f7db2d4706a29662d2026000406ecf44a31dae6f2818c28aa53c735a1dbf2d",
    },
    {
      id: "nova",
      name: "Nova",
      description: "Young, energetic, and engaging",
      age: "Young",
      gender: "Male",
      accent: "English",
      sample_audio_path:
        "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/alloy.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T044455Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=53f7db2d4706a29662d2026000406ecf44a31dae6f2818c28aa53c735a1dbf2d",
    },
    {
      id: "shimmer",
      name: "Shimmer",
      description: "Lively, vibrant, and dynamic",
      age: "Middle Aged",
      gender: "Female",
      accent: "English",
      sample_audio_path:
        "https://87c129bea46e5e69d2d92f9b9ef83ca8.r2.cloudflarestorage.com/cdk-ttsopenai-gpt-prod-upload-bucket/samples/alloy.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=c059c5e08a0dd199cb0fb22ee31dad1b%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T044455Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=53f7db2d4706a29662d2026000406ecf44a31dae6f2818c28aa53c735a1dbf2d",
    },
  ]);
  const [voice, setVoice] = useState<any>({
    id: "alloy",
    name: "Alloy",
    description: "Neutral, professional, and clear",
  });

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
        user_id: "abc 22",
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
