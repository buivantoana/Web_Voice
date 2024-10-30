import { Box } from "@mui/material";
import React, { useState } from "react";
import VocalizeView from "./VocalizeView";

type Props = {};

const VocalizeController = (props: Props) => {
  const [textVoice, setTextVoice] = useState("");

  return <VocalizeView textVoice={textVoice} setTextVoice={setTextVoice} />;
};

export default VocalizeController;
