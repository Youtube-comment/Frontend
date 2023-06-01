import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Login from "../login/login";
import { useSelector } from 'react-redux';
import { cookie, getCookie } from "../util/Cookie";
import axios from "axios";

function Navbar() {
  let [bg, setBg] = useState(["active", "", "", ""]);
  const token = getCookie("access_token");
  let { channel_id } = useParams();
    useEffect(() => {
      userData()
  }, []);
  const userData = async () => {
    try {
      const get_userData = await axios.get(
        `${process.env.REACT_APP_URL}/api/get_channel_sb/`,
        {
          channel_id: channel_id,
        },
        {
          headers: { Authorization: token },
        }
      );
        const userImage = userData.data.items.map((item) => item);
        
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="Navbar_page">
      <div className="Navbar_containor">
        <div className="Navbar_profile">
          <div className="Navbar_profile_item">
            <div className="Navbar_subprofile">
              <img
                src="https://codingapple1.github.io/shop/shoes1.jpg"
                width="50px;"
              />
              <h2>채널명</h2>
            </div>
            <div className="Navbar_subscribe">
              <p>구독자 수 : </p>
            </div>
          </div>
          <div className="Navbar_menu">
            <div className="Navbar_menu_main">
              <Link to="/" className="Navbar_menu_main_item">
                Main
              </Link>
            </div>
            <div className= "Navbar_menu_videos">
              <Link to="/videos" className="Navbar_menu_videos_item">
                Videos
              </Link>
            </div>
            <div className= "Navbar_menu_profile">
              <Link to="/profile" className="Navbar_menu_profile_item">
                profile
              </Link>
            </div>
            <div className="Navbar_menu_logout">
              <Link to="/" className="Navbar_menu_logout_item">
                <Login />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
