import { useState,useEffect } from 'react';
import './video.css'



function Video(){

    const [userComment,setUser] = useState([
        {img :"/img/tera.png",
        name : "박병주",
        comment : "영상하나 올렸으니까 방송 하루 쉬겠다고하진않겠지?" },
        {img :"/img/tera.png",
        name : "박준영",
        comment : "왤케 못함??" },
        {img :"/img/tera.png",
        name : "김진우",
        comment : "내가 저거보단 잘하겠네" },
        {img :"/img/tera.png",
        name : "최동우",
        comment : "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ" },
    ])
    const [playlist, setPlaylist] = useState([
        {title: '여름옷 추천1', duration: '4:00'},
        {title: '여름옷 추천2', duration: '5:30'},
        {title: '여름옷 추천3', duration: '6:45'},
        // ... more videos
      ]);
    
    return(
        <div className="video">
            <div className='gd'>
            <div className='video1'>
                <div className="video_main">
                        <div className='video_clip'></div>
                    <p className="video_name">
                        유행 따위 없는 가장 먼저 사야하는 여름옷
                    </p>
                </div>
                <div className="video_addCmt">
                    <div className="avatar">
                        <img src={process.env.PUBLIC_URL + "/img/tera.png"} width="50px" height="50px" />
                    </div>
                    <div className="input-container">
                        {/* 텍스트 입력창 */}
                        <input placeholder="댓글 추가..."
                        className="video_addcomment"/>
                    </div>
                </div>
                <div className='video_comment'>
                    {
                        userComment.map((a,i)=>
                            <div key={i}>
                                <div className='video_sub'>
                                    <div className='video_cmtIMG'>
                                        <img src={process.env.PUBLIC_URL + "/img/tera.png"} width="50px" height="50px" />
                                    </div>
                                    <div className='name_time_cmt'>
                                        <div className='name_time'>
                                            <div className='video_cmtNAME'>
                                                {userComment[i].name}
                                            </div>
                                            <div className='video_cmtTIME'>
                                                한 시간전
                                            </div>
                                        </div>
                                    
                                        <div className='video_cmt'>
                                            {userComment[i].comment}
                                        </div>
                                    </div>

                                    
                                 </div>
                            </div>
                            
                        )
                    }
                    
                </div>  
            </div>
            <div className='video_side'></div>
            </div>
            
            
        </div>
    )
}

export default Video;