import React, { useEffect, useState } from "react";

import EmojView from "./EmojView";
import { useCoursesContext } from "../../App";
import { getEmotions } from "../../service/voice";
import Loading from "../../components/Loading";

const EmojController = ({ textVoice, setTextVoice, limit, setPrompt }: any) => {
  let [dataCustomEmotions, setDataCustomEmotions] = useState({});
  let context: any = useCoursesContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getEmotionData();
  }, [context.state.user]);

  const getEmotionData = async () => {
    if (context.state.user.user_id) {
      let result = await getEmotions(context.state.user.user_id);
      if (result && Object.keys(result).length > 0) {
        setDataCustomEmotions(result);
      }
    } else {
      let result = await getEmotions();
      if (result && Object.keys(result).length > 0) {
        setDataCustomEmotions(result);
      }
    }
  };
  return (
    <>
      {loading && <Loading position={"fixed"} />}
      <EmojView
        setTextVoice={setTextVoice}
        dataCustomEmotions={dataCustomEmotions}
        limit={limit}
        textVoice={textVoice}
        setLoading={setLoading}
        getEmotionData={getEmotionData}
        setPrompt={setPrompt}
      />
    </>
  );
};

export default EmojController;
