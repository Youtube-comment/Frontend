import React, {useState} from "react";
import './videos.css'

function Videos(){

    let [video, setVideo] = useState(['영상1', '영상2', '영상3', '영상4', '영상5', '영상6', '영상7', '영상8'])
    let [btnbg, setBtnbg] = useState(['',''])

    return(
        <div className="videos_page">
            <div className="videos_containor">
                <div className="videos_video">
                    <div className="videos_submenu">
                        <div className="videos_sort">
                            <button className= { "videos_newbtn " + btnbg[0] } onClick={()=>{
                                let copy1 = [...btnbg]
                                copy1 = ['chagebg','']
                                setBtnbg(copy1)
                            }}>최신순</button>
                            <button className={ "videos_popularbtn " + btnbg[1] } onClick={()=>{
                                let copy2 = [...btnbg]
                                copy2 = ['','chagebg']
                                setBtnbg(copy2)
                            }}>인기순</button>
                        </div>
                        <div className="videos_search">
                            <input className="videos_search_text" type="text" placeholder="검색어 입력"/>
                            <button className="videos_search_btn">확인</button>
                        </div>
                    </div>
                    <div className="videos_video_item">
                        {
                            video.map((a,i)=>{
                                return(
                                <Video video={video[i]}></Video>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function Video(props){
    return(
      <div>
        <div className="videos_video_list"></div>
        <h4 className="videos_video_title">{ props.video }</h4>
      </div>
    );
  }

export default Videos;