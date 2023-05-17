import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import { cookie, getCookie } from "../util/Cookie";
import "./video.css";
import axios from "axios";
import { Button } from "bootstrap";

function Video(props) {
  let { id } = useParams();
  const token = getCookie("access_token");

  useEffect(() => {
    getComments();
  });
  const getComments = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/get-comment-list/`,
        {
          id: id,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [userComment, setUser] = useState([
    {
      img: "/img/tera.png",
      name: "박병주",
      comment: "영상하나 올렸으니까 방송 하루 쉬겠다고하진않겠지?",
    },
    { img: "/img/tera.png", name: "박준영", comment: "왤케 못함??" },
    { img: "/img/tera.png", name: "김진우", comment: "내가 저거보단 잘하겠네" },
    {
      img: "/img/tera.png",
      name: "최동우",
      comment: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    },
  ]);
  const [playlist, setPlaylist] = useState([
    {
      img: "/img/tera.png",
      title: "여름옷 추천1",
      duration: "한 시간 전",
      조회수: "14만회",
    },
    {
      img: "/img/tera.png",
      title: "여름옷 추천2",
      duration: "일주일 전",
      조회수: "29만회",
    },
    {
      img: "/img/tera.png",
      title: "여름옷 추천3",
      duration: "한달 전",
      조회수: "39만회",
    },
  ]);

  return (
    <div className="video">
      <div className="video_area">
        <div className="video1">
          <div className="video_main">
            <div className="video_clip"></div>
            <p className="video_name">
              유행 따위 없는 가장 먼저 사야하는 여름옷
            </p>
          </div>
          <div className="video_addCmt">
            <div className="avatar">
              <img
                src={process.env.PUBLIC_URL + "/img/tera.png"}
                width="50px"
                height="50px"
              />
            </div>

            <div className="input-container">
              <input type="text" required placeholder=" " />
              <label>댓글추가..</label>
              <span className="spantest"></span>
            </div>
          </div>
          <Video_addcomment comment={userComment} />
        </div>
        <Video_side playlist={playlist} />
      </div>
    </div>
  );
}

function Video_side(props) {
  return (
    <div className="video2">
      {props.playlist.map((a, i) => (
        <div className="side_area" key={i}>
          <div className="side_img">
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/img/tera.png"}
              width="100px"
              height="100px"
            />
          </div>
          <div className="side_content">
            <div className="side_title">{props.playlist[i].title}</div>
            <div className="side_views">
              조회수 : {props.playlist[i].조회수}
            </div>
            <div className="side_time">{props.playlist[i].duration}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
function Video_addcomment(props) {
  let [like, setLike] = useState(Array(props.comment.length).fill(0));
  let [dislike, setDisLike] = useState(Array(props.comment.length).fill(0));

  let [답글, set답글] = useState(Array(props.comment.length).fill(0));

  return (
    <div className="video_comment">
      {props.comment.map((a, i) => (
        <div key={i}>
          <div className="video_sub">
            <div className="video_cmtIMG">
              <img
                src={process.env.PUBLIC_URL + "/img/tera.png"}
                width="50px"
                height="50px"
              />
            </div>
            <div className="name_time_cmt">
              <div className="name_time">
                <div className="video_cmtNAME">{props.comment[i].name}</div>
                <div className="video_cmtTIME">한 시간전</div>
              </div>

              <div className="video_cmt">{props.comment[i].comment}</div>
              <div className="video_response">
                <div className="video_like">
                  <span
                    onClick={() => {
                      let copy = [...like];
                      copy[i] += 1;
                      setLike(copy);
                    }}
                  >
                    👍
                  </span>
                  <div className="video_setLike">{like[i]}</div>
                </div>
                <div className="video_like">
                  <span
                    onClick={() => {
                      let copy = [...dislike];
                      copy[i]++;
                      setDisLike(copy);
                    }}
                  >
                    👎
                  </span>
                  <div className="video_setDisLike">{dislike[i]}</div>
                </div>
                <span
                  onClick={() => {
                    let copy = [...답글];
                    copy[i] = 1;
                    set답글(copy);
                  }}
                  className="video_toadd"
                >
                  답글
                </span>
                {답글[i] === 1 ? (
                  <Add 답글={답글} set답글={set답글} i={i} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Add(props) {
  return (
    <form className="input-container">
      <input type="text" placeholder="답글추가..." />
      <span className="spantest"></span>
      <div className="input-container-add">
        <button
          onClick={() => {
            let copy = [...props.답글];
            copy[props.i] = 0;
            props.set답글(copy);
          }}
        >
          취소
        </button>
        <button>GPT</button>
        <button>답글</button>
      </div>
    </form>
  );
}
export default Video;
