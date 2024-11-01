import React, { useEffect, useState } from "react";
import SignUpView from "./SignUpView";
import { useLocation, useNavigate } from "react-router-dom";
import { getOtp, signIn } from "../../service/auth";

type Props = {};

const SignUpController = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const auth_code = queryParams.get("code");
  const [phone, setPhone] = useState("");
  const [openOtp, setOpenOtp] = React.useState(false);
  const [otp, setOtp] = useState("");

  const handleClickOpenOtp = () => {
    setOpenOtp(true);
  };
  const handleCloseOtp = () => {
    setOpenOtp(false);
  };
  useEffect(() => {
    if (auth_code) {
      (async () => {
        try {
          let data = await signIn(auth_code);
          if (data.code == 0) {
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);
  const handleOTP = async () => {
    try {
      let data = await getOtp(phone);
      console.log(data);
      handleClickOpenOtp();
      if (data.code == 0) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeOtp = (otpValue: any) => {
    setOtp(otpValue);
  };
  return (
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
    />
  );
};

export default SignUpController;
