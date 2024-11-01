import axios from "axios";
import { path_redirect, url_auth } from "../config";
import { createSimpleHash } from "../utils/utils";

export async function tiktokAuthorizeLink() {
  try {
    const response = await axios.get(
      `${url_auth}/api/v1/auth/tiktok-authorize-link?redirect_uri=${path_redirect}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}

export async function signIn(auth_code: any) {
  try {
    const response = await axios.post(`${url_auth}/api/v1/auth/login/tiktok`, {
      auth_code: auth_code,
      redirect_uri: path_redirect,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getOtp(phone: any) {
  try {
    let signature = createSimpleHash({
      phone_number: phone,
      service_name: "register",
    });
    const response = await axios.post(
      `${url_auth}/api/v1/otp`,
      {
        phone_number: phone,
        service_name: "register",
      },
      {
        headers: {
          "X-Signature": signature,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
