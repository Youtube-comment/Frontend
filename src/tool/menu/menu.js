import React, {useState} from "react";
import './menu.css';

function Menu(){
    return(
        <div className="menu_main">
            <div className="menu_container">
                <div className="menu_user">
                    <div className="menu_icon">
                        사용자 아이콘 부분
                    </div>
                    <div className="menu_name">
                        사용자 이름부분
                    </div>
                </div>
                <div className="menu_channel">
                    채널 정보 부분
                </div>
                <div className="menu_commnet">
                    댓글 관리 부분
                </div>
                <div className="menu_help">
                    도움말 부분
                </div>
                <div className="menu_contact">
                    고객센터 부분
                </div>
            </div>
        </div>
    );
}

export default Menu;