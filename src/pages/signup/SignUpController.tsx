import React, { useEffect, useState } from "react";
import SignUpView from "./SignUpView";
import { useLocation, useNavigate } from "react-router-dom";
import { getOtp, signIn, signup, signupWebHook } from "../../service/auth";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { useLocalStorage } from "../../hooks/useStorage";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCoursesContext } from "../../App";

type Props = {};
const schema = yup.object({
  phone: yup.string().required(),
});
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
  const context: any = useCoursesContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        let webhook = await signupWebHook({ user_id: data.data.user.phone });
        if (webhook.code == 0) {
          localStorage.setItem(
            "access_token",
            JSON.stringify(data.data.access_token)
          );
          localStorage.setItem("user", JSON.stringify(data.data.user));
          context.dispatch({
            type: "LOGIN",
            payload: {
              ...context.state,
              user: { ...data.data.user },
            },
          });
          setTimeout(() => {
            navigate("/");
            setLoading(false);
          }, 1000);
        }
      }
      if (data.code == 1004) {
        toast.warning(data.message);
        setLoading(false);
      }
      if (data.code == 1004) {
        setOpenId(data.data.tiktok_open_id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOTP = async (data: any) => {
    console.log(data);
    setLoading(true);
    try {
      let data = await getOtp(phone);
      if (data.code == 0) {
        handleClickOpenOtp();
      }
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
  console.log(errors);
  return (
    <>
      {loading && <Loading />}
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
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default SignUpController;
