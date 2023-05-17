import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useEffect, useState } from "react";
import { cookie, getCookie } from "../util/Cookie";
import "./videos.css";

function Videos(props) {
  let [video, setVideo] = useState([]);
  let [btnbg, setBtnbg] = useState(["", ""]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/get-youtube-list/`, {
        headers: {
          Authorization: props.token,
        },
      })
      .then((result) => {
        const videodatas = result.data.items.map((item) => item.snippet);

        setVideo(videodatas);
      })
      .catch((result) => {
        console.log(result);
      });
  }, [props.token]);
  console.log(video);

  return (
    <div className="videos_page">
      <div className="videos_containor">
        <div className="videos_video">
          <div className="videos_submenu">
            <div className="videos_sort">
              <button
                className={"videos_newbtn " + btnbg[0]}
                onClick={() => {
                  let copy1 = [...btnbg];
                  copy1 = ["chagebg", ""];
                  setBtnbg(copy1);
                }}
              >
                최신순
              </button>
              <button
                className={"videos_popularbtn " + btnbg[1]}
                onClick={() => {
                  let copy2 = [...btnbg];
                  copy2 = ["", "chagebg"];
                  setBtnbg(copy2);
                }}
              >
                인기순
              </button>
            </div>
            <div className="videos_search">
              <input
                className="videos_search_text"
                type="text"
                placeholder="검색어 입력"
              />
              <button className="videos_search_btn">확인</button>
            </div>
          </div>
          <div className="videos_video_item">
            {video.map((a, i) => {
              return <Video key={i} video={a}></Video>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Video(props) {
  return (
    <div>
      <div key={props.i} className="videos_video_list">
        <img
          src={props.video.thumbnails.high.url}
          alt="thumbmail"
          style={{ width: "326px", height: "184px" }}
        />
      </div>
      <h4 className="videos_video_title">{props.video.title}</h4>
    </div>
  );
}

export default Videos;
