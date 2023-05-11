import React, {useState} from "react";
import './help.css'

function Help(){
    return(
        <div className="help_page">
            <div className="help_containor">
                <div className="help_logo">
                    <h2 className="help_item">도움말</h2>
                </div>
                <div className="help_explanation">
                    <h2>User's Guide</h2>
                    <p>1. 로그인을 한다 (구글 로그인)</p>
                    <p>2. 영상 목록에서 영상을 선택한다 </p>
                    <p>3. 원하는 댓글에 답글을 달거나 Chat GPT를 통해 자동으로 댓글을 달아준다</p>
                </div>
            </div>
        </div>
    );
}

export default Help;