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
        {img : "/img/tera.png", title: '여름옷 추천1', duration: '한 시간 전' , 조회수 : '14만회'},
        {img : "/img/tera.png", title: '여름옷 추천2', duration: '일주일 전',조회수 : '29만회'},
        {img : "/img/tera.png", title: '여름옷 추천3', duration: '한달 전',조회수 : '39만회'},
        
        
      ]);
    
    return(
        <div className="video">
            <div className='video_area'>
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
                    <Video_addcomment comment={userComment}/>
                </div>
                
                <Video_side playlist={playlist}/> 
            </div>
            
            
        </div>
    )
}

function Video_side(props){
    return(
        <div className='video2'>
            
            {
                props.playlist.map((a,i)=>
                <div className='side_area' key={i}>
                    <div className='side_img'> <img src={process.env.PUBLIC_URL + "/img/tera.png"} width="100px" height="100px" /></div>
                    <div className='side_content'>
                        <div className='side_title'>{props.playlist[i].title}</div>
                        <div className='side_views'>조회수 : {props.playlist[i].조회수}</div>
                        <div className='side_time'>{props.playlist[i].duration}</div>
                    </div>
                </div>
                )
            }
            
        </div>
    )
}
function Video_addcomment(props){
    return(
        <div className='video_comment'>
                    {
                        props.comment.map((a,i)=>
                            <div key={i}>
                                <div className='video_sub'>
                                    <div className='video_cmtIMG'>
                                        <img src={process.env.PUBLIC_URL + "/img/tera.png"} width="50px" height="50px" />
                                    </div>
                                    <div className='name_time_cmt'>
                                        <div className='name_time'>
                                            <div className='video_cmtNAME'>
                                                {props.comment[i].name}
                                            </div>
                                            <div className='video_cmtTIME'>
                                                한 시간전
                                            </div>
                                        </div>
                                    
                                        <div className='video_cmt'>
                                            {props.comment[i].comment}
                                        </div>
                                    </div>

                                    
                                 </div>
                            </div>
                            
                        )
                    }
                    
                </div>  
    )
}

export default Video;