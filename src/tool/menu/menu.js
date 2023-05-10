import React, {useState} from "react";
import './menu.css';

function Menu(){
    return(
        <div className="menu_bar">
            <div className="menu_container">
                <div className="menu_appname">
                    유튜브댓글 자동처리
                </div>
                <div className="menu_main">
                    Main
                </div>
                <div className="menu_veidos">
                    Vedios
                </div>
                <div className="menu_profile">
                    Profile
                </div>
                <div className="menu_islogin">
                    로그아웃
                </div>
                
            </div>
        </div>
    );
}

export default Menu;