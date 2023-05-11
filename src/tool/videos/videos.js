import React, {useState} from "react";
import './videos.css'

function Videos(){

    let [video, setVideo] = useState(['영상1', '영상2', '영상3', '영상4', '영상5', '영상6', '영상7', '영상8'])

    return(
        <div className="videos_page">
            <div className="videos_containor">
                <div className="videos_video">
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