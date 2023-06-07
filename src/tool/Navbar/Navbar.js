import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Login from "../login/login";
import { useSelector } from 'react-redux';
import { cookie, getCookie, removeCookie } from "../util/Cookie";
import axios from "axios";

function Navbar() {
  let [bg, setBg] = useState(["active", "", "", ""]);
  const token = getCookie("access_token");
  let [chtitle, setChtitle] = useState([]);
  let [subCount, setSubcount] = useState([]);
  const picture = localStorage.getItem('picture');
  const [isLoading, setIsLoading] = useState(true);
  console.log(picture);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subscribeResponse, titleResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_URL}/api/get_channel_sb/`, {
          headers: { Authorization: token },
        }),
        axios.get(`${process.env.REACT_APP_URL}/api/get-youtube-list/`, {
          headers: { Authorization: token },
        }),
      ]);

      const subCountData = subscribeResponse.data.data.items;
      const chtitleData = titleResponse.data.items;
      

      setSubcount(subCountData);
      setChtitle(chtitleData);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  };



  const deleteCookie = () => {
    removeCookie("access_token");
    alert('로그아웃 되었습니다.')
    window.location.reload()
  }
  
  if(token){
    return (
      <div className="Navbar_page">
        <div className="Navbar_containor">
          <div className="Navbar_profile">
          {isLoading ? (
              <p className="Navbar_loading">Loading...</p>
            ) : (
              <div className="Navbar_profile_item">
                <div className="Navbar_subprofile">
                  <img className="Navbar_profileImg"
                    src={picture}
                    width="50px;"
                  />
                  {chtitle.length > 0 && (
                    <h2>{chtitle[0].snippet.channelTitle}</h2>
                  )}
                </div>
                <div className="Navbar_subscribe">
                  <p>구독자 수: {subCount.length > 0 ? subCount[0].statistics.subscriberCount : ' '}</p>
                </div>
              </div>
            )}
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
                <button onClick={ deleteCookie }>
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="Navbar_profile">
        <div className="Navbar_help">
          로그인 해주세요
        </div>
        <div className="Navbar_login">
          <Link>
            <Login/>
          </Link>
        </div>
      </div>
    );
  }
  
}

export default Navbar;
