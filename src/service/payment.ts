import axios from "axios";
import { url_voice } from "../config";

export async function createPayment(body: { user_id: string; amount: number }) {
  try {
    const response = await axios.post(`${url_voice}/payment/create`, body, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}