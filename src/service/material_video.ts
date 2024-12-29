import axios from "axios";
import { url_voice } from "../config";
export async function generateVideo(body: any) {
  try {
    const headers = {
      Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
    };
    const response = await axios.post(
      `https://vp.zeezoo.mobi:8089/generate_ad_scripts`,
      body,
      {
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
