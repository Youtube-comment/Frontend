import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import axios from "axios";
import { setCookie, getCookie } from "../util/Cookie";

function Login() {
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse.code);
      axios
        .post(`${process.env.REACT_APP_URL}/api/google-login/`, {
          code: codeResponse.code,
        })
        .then((result) => {
          console.log(result.data.access);
          let a = result.data.email.name + "님 환영합니다." + result.data.new;
          alert(a);
          const tokens = result.data.jwt;
          setCookie("access_token", tokens.access, {
            path: "/",
            maxAge: 18000,
          }); // 로그인 성공 후 쿠키 설정
          // localStorage.setItem("access_token", tokens.access);
          // localStorage.setItem("refresh_token", tokens.refresh);
        })
        .catch((result) => {
          console.log(result);
        });
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/youtube.force-ssl", // YouTube API 스코프를 여기에 추가하세요
  });

  return (
    <>
      <GoogleButton
        className="googlebtn"
        onClick={() => {
          googleSocialLogin();
        }}
      />
    </>
  );
}

export default Login;
