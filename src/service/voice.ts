import axios from "axios";
import { url_voice } from "../config";

export async function createVoice(body: {
  user_id: string;
  txt: string;
  voice: string;
  speed: number;
}) {
  try {
    const response = await axios.post(`${url_voice}/voice/process`, body, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getVoicesOpenAi() {
  try {
    const response = await axios.get(`${url_voice}/voice/voices`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getHistoryVoices({ user_id }: any) {
  try {
    const response = await axios.get(`${url_voice}/voice/history/${user_id}`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getPlayVoice({ voice_id }: any) {
  try {
    const response = await axios.get(`${url_voice}/voice/play/${voice_id}`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function deleteVoiceApi({ voice_id }: any) {
  try {
    const response = await axios.post(
      `${url_voice}/voice/delete?voice_id=${voice_id}`,
      {},
      {
        headers: {
          Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
        },
      }
    );
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getInfo({ user_id }: any) {
  try {
    let access_token: any = localStorage.getItem("access_token");
    console.log(access_token);
    const response = await axios.post(
      `${url_voice}/voice/user?user_id${user_id}`,
      {
        user_id: user_id,
        bearer_token: JSON.parse(access_token),
      },
      {
        headers: {
          Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
        },
      }
    );
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
