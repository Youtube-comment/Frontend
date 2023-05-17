import logo from "./logo.svg";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useEffect, useState } from "react";
import { cookie, getCookie } from "./tool/util/Cookie";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Menu from "./tool/menu/menu";
import Video from "./tool/video/video";
import Main from "./tool/main/main";
import Videos from "./tool/videos/videos";
import Navbar from "./tool/Navbar/Navbar";
import Login from "./tool/login/login";
import List from "./tool/videolist/list";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const token = getCookie("access_token");
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Navbar />
        <div className="App_menu">
          <Menu />
        </div>

        <div className="App_content">
          <Routes>
            <Route path="video/:id" element={<Video token={token} />} />
            <Route path="/" element={<Main />} />
            <Route path="/videos" element={<Videos token={token} />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
