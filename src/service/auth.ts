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
    const response = await axios.post(`${url_auth}/api/v1/otp`, {
      phone_number: phone,
      service_name: "register",
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function signup({ phone, otp, open_id }: any) {
  try {
    const response = await axios.post(`${url_auth}/api/v1/auth/register`, {
      phone_number: phone,
      service_name: "register",
      otp,
      tiktok_open_id: open_id,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
