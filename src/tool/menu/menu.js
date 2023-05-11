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
            </div>
        </div>
    );
}

export default Menu;