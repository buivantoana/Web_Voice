import { useEffect, useState } from "react";
import HistoryView from "./HistoryView";
import { getHistoryVoices } from "../../service/voice";
import { useCoursesContext } from "../../App";
import Loading from "../../components/Loading";

const HistoryController = () => {
  const [voices, setVoices] = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const context: any = useCoursesContext();
  useEffect(() => {
    loadVoices();
  }, []);
  const loadVoices = async () => {
    setLoadingVoices(true);
    try {
      let data = await getHistoryVoices(
        context.state.user && context.state.user.user_id
      );
      console.log("AAAA data", data);
      if (data.code == 0) {
        if (data.data && data.data.length > 0) {
          setVoices(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  return (
    <>
      {/* {loading && <Loading />} */}
      <HistoryView voices={voices} loadingVoices={loadingVoices} />
    </>
  );
};

export default HistoryController;
