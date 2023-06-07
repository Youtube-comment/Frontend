import logo from "./logo.svg";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useEffect, useState } from "react";
import { cookie, getCookie } from "./tool/util/Cookie";
import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Menu from "./tool/menu/menu";
import Video from "./tool/video/video";
import Main from "./tool/main/main";
import Videos from "./tool/videos/videos";
import Navbar from "./tool/Navbar/Navbar";
import Login from "./tool/login/login";
import List from "./tool/videolist/list";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Tutorial from "./tool/tutorial/tutorial";

function App() {
  const token = getCookie("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <div className="App_nav">
          <Navbar />
        </div>
        <div className="App_main">
          <Menu /> 
          <div className="App_content">
          <Routes>
            <Route path="video/:id" element={<Video token={token} />} />
            <Route path="/videos" element={<Videos token={token} />} />
            <Route path="/list" element={<List />} />
            <Route path="/" element={<Main />} />
            <Route path="/tutorial" element={<Tutorial/>} />
          </Routes>
          </div>
        </div>

       
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
