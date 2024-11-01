import React from "react";
import SignInView from "./SignInView";
import { tiktokAuthorizeLink } from "../../service/auth";
import { useNavigate } from "react-router-dom";

type Props = {};

const SignInController = (props: Props) => {
  const handleTikTokAuthorizeLink = async () => {
    try {
      let data = await tiktokAuthorizeLink();
      console.log(data);
      if (data.code == 0) {
        window.open(data.data.auth_link, "_self");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <SignInView handleTikTokAuthorizeLink={handleTikTokAuthorizeLink} />;
};

export default SignInController;
