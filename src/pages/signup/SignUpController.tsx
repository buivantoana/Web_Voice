import React, { useEffect, useState } from "react";
import SignUpView from "./SignUpView";
import { useLocation, useNavigate } from "react-router-dom";
import { getOtp, signIn, signup } from "../../service/auth";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { useLocalStorage } from "../../hooks/useStorage";

type Props = {};

const SignUpController = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const auth_code = queryParams.get("code");
  const [phone, setPhone] = useState("");
  const [openOtp, setOpenOtp] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [openId, setOpenId] = useState(null);
  const [, setAccessToken] = useLocalStorage("access_token", {});
  const [, setUser] = useLocalStorage("user", {});

  const handleClickOpenOtp = () => {
    setOpenOtp(true);
  };
  const handleCloseOtp = () => {
    setOpenOtp(false);
  };
  useEffect(() => {
    if (auth_code) {
      login();
    }
  }, []);
  const login = async () => {
    setLoading(true);
    try {
      let data = await signIn(auth_code);
      console.log(data);
      if (data.code == 0) {
        setAccessToken(data.data.access_token);
        setUser(data.data.user);
        navigate("/");
      }
      if (data.code == 1004) {
        setOpenId(data.data.tiktok_open_id);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleOTP = async () => {
    setLoading(true);
    try {
      // let data = await getOtp(phone);
      // if (data.code == 0) {
      handleClickOpenOtp();
      // }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChangeOtp = (otpValue: any) => {
    setOtp(otpValue);
  };
  const handleRegister = async () => {
    console.log("AAA body ===", { phone, otp, open_id: openId });
    setLoading(true);
    try {
      let data = await signup({ phone, otp, open_id: openId });
      console.log(data);
      if (data.code == 0) {
        login();
      }
      if (data.code == 1000) {
        Object.keys(data.data).map((key) => toast.warning(data.data[key][0]));
      }
      if (data.code == 1001) {
        toast.warning("Mã OTP không hợp lệ.");
      }
      if (data.code == 1002) {
        toast.warning("Tiktok profile không tồn tại.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}{" "}
      <SignUpView
        setOtp={setOtp}
        handleClickOpenOtp={handleClickOpenOtp}
        handleCloseOtp={handleCloseOtp}
        openOtp={openOtp}
        handleOTP={handleOTP}
        otp={otp}
        setPhone={setPhone}
        phone={phone}
        handleChangeOtp={handleChangeOtp}
        handleRegister={handleRegister}
      />
    </>
  );
};

export default SignUpController;
