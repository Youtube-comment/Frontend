import React, {useState} from "react";
import {Route,Routes, Link} from "react-router-dom";
import './menu.css';

function Menu(){
    return(
        <div className="menu_bar">
            <div className="menu_container">
                <div className="menu_appname">
                    유튜브댓글 자동처리
                </div>
                <Link to="/" className="menu_main">
                    Main
                </Link>
                <Link to ="/vedio" className="menu_veidos">
                    Vedios
                </Link>
                <div className="menu_profile">
                    Profile
                </div>
                <Link to="/" className="menu_islogin">
                    로그아웃
                </Link>
                
            </div>
        </div>
    );
}

export default Menu;