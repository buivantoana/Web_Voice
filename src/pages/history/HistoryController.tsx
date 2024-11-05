import { useEffect, useState } from "react";
import HistoryView from "./HistoryView";
import { getHistoryVoices } from "../../service/voice";
import { useCoursesContext } from "../../App";
import Loading from "../../components/Loading";

const HistoryController = () => {
  const [voices, setVoices] = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  let user: any = localStorage.getItem("user");
  user = JSON.parse(user);
  const context: any = useCoursesContext();
  useEffect(() => {
    if (Object.keys(user).length > 0) loadVoices();
  }, [user]);
  const loadVoices = async () => {
    setLoadingVoices(true);
    try {
      let data = await getHistoryVoices(user && user.user_id);
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
