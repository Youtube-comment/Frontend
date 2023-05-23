import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import { cookie, getCookie } from "../util/Cookie";
import "./video.css";
import axios from "axios";
import { Button } from "bootstrap";

function Video(props) {
  let { id } = useParams();
  const [userComment, setUser] = useState([]);
  const token = getCookie("access_token");

  useEffect(() => {
    getComments();
  });
  const getComments = async () => {
    //댓글들불러오기
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
      const commentdatas = response.data.items.map(
        (item) => item.snippet.topLevelComment
      );
      setUser(commentdatas);
    } catch (error) {}
  };

  const addComment = async () => {
    // 답글 달기
    try {
      const comment_response = await axios.post(
        `${process.env.REACT_APP_URL}/api/post-comment-insert/`,
        {
          parentId: "UgxFdAUQgwkzcESs_LF4AaABAg",
          textOriginal: "우우우",
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(comment_response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async () => {
    //답글삭제
    try {
      const remove_response = await axios.post(
        `${process.env.REACT_APP_URL}/api/post-comment-delete/`,
        {
          comment_id: "UgxFdAUQgwkzcESs_LF4AaABAg.9pok6jjEWU29q0nBbcOSHh",
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log("삭제완료");
    } catch (error) {
      console.log(error);
    }
  };

  const getRecomment = async () => {
    //답글들 불러오기

    try {
      const get_Recomment = await axios.post(
        `${process.env.REACT_APP_URL}/api/get-recomment-list/`,
        {
          parentId: "UgxFdAUQgwkzcESs_LF4AaABAg",
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(get_Recomment.data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <button
              onClick={() => {
                removeComment();
              }}
            >
              답글삭제 test
            </button>
            <button
              onClick={() => {
                getRecomment();
              }}
            >
              답글console 찍기
            </button>
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
              <button
                onClick={() => {
                  addComment();
                }}
                className="video_addbtn"
              >
                댓글
              </button>
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
function calculateElapsedTime(updatedAt) {
  const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000; // 1분을 밀리초로 계산
  const ONE_HOUR_IN_MILLISECONDS = 60 * ONE_MINUTE_IN_MILLISECONDS; // 1시간을 밀리초로 계산
  const ONE_DAY_IN_MILLISECONDS = 24 * ONE_HOUR_IN_MILLISECONDS; // 1일을 밀리초로 계산
  const ONE_MONTH_IN_MILLISECONDS = 30 * ONE_DAY_IN_MILLISECONDS; // 1달을 밀리초로 계산

  const currentTimestamp = new Date().getTime(); // 현재 시간의 타임스탬프를 구함
  const updatedAtTimestamp = new Date(updatedAt).getTime(); // 업데이트된 시간의 타임스탬프를 구함

  const elapsedTimestamp = currentTimestamp - updatedAtTimestamp; // 업데이트된 시간과 현재 시간의 차이를 구함

  if (elapsedTimestamp < ONE_HOUR_IN_MILLISECONDS) {
    const elapsedMinutes = Math.floor(
      elapsedTimestamp / ONE_MINUTE_IN_MILLISECONDS
    );
    return `${elapsedMinutes}분 전`;
  } else if (elapsedTimestamp < ONE_DAY_IN_MILLISECONDS) {
    const elapsedHours = Math.floor(
      elapsedTimestamp / ONE_HOUR_IN_MILLISECONDS
    );
    return `${elapsedHours}시간 전`;
  } else if (elapsedTimestamp < ONE_MONTH_IN_MILLISECONDS) {
    const elapsedDays = Math.floor(elapsedTimestamp / ONE_DAY_IN_MILLISECONDS);
    return `${elapsedDays}일 전`;
  } else {
    const elapsedMonths = Math.floor(
      elapsedTimestamp / ONE_MONTH_IN_MILLISECONDS
    );
    return `${elapsedMonths}개월 전`;
  }
}
function Video_addcomment(props) {
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
                <div className="video_cmtNAME">
                  {props.comment[i].snippet.authorDisplayName}
                </div>
                <div className="video_cmtTIME">
                  {calculateElapsedTime(props.comment[i].snippet.publishedAt)}
                </div>
              </div>

              <div className="video_cmt">
                {props.comment[i].snippet.textDisplay}
              </div>
              <div className="video_response">
                <div className="video_like">
                  <span>👍</span>
                  <div className="video_setLike">
                    {props.comment[i].snippet.likeCount}
                  </div>
                </div>
                <div className="video_like">
                  <span>👎</span>
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
