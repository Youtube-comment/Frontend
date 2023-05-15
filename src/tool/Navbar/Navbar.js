import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../login/login";
function Navbar() {
  let [bg, setBg] = useState(["active", "", "", ""]);

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
            <div className={"Navbar_menu_main " + bg[0]}>
              <Link
                to="/"
                className="Navbar_menu_main_item"
                onClick={() => {
                  let bg1 = [...bg];
                  bg1 = ["active", "", "", ""];
                  setBg(bg1);
                }}
              >
                Main
              </Link>
            </div>
            <div className={"Navbar_menu_videos " + bg[1]}>
              <Link
                to="/videos"
                className="Navbar_menu_videos_item"
                onClick={() => {
                  let bg2 = [...bg];
                  bg2 = ["", "active", "", ""];
                  setBg(bg2);
                }}
              >
                Videos
              </Link>
            </div>
            <div className={"Navbar_menu_profile " + bg[2]}>
              <Link
                to="/profile"
                className="Navbar_menu_profile_item"
                onClick={() => {
                  let bg3 = [...bg];
                  bg3 = ["", "", "active", ""];
                  setBg(bg3);
                }}
              >
                profile
              </Link>
            </div>
            <div className={"Navbar_menu_logout " + bg[3]}>
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
