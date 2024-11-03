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
        Authorization: "Bearer ABC123",
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
        Authorization: "Bearer ABC123",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
