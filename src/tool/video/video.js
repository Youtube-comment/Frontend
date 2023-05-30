import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { cookie, getCookie } from "../util/Cookie";
import "./video.css";
import axios from "axios";
import { Button } from "bootstrap";
import { useSelector } from "react-redux";

// open api 불러오기
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// api 함수

async function apiCall() {
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    //prompt 에 댓글만 담아주면 된다.
    prompt: "Hello world",
  });
  console.log(completion.data.choices[0].text);
}

function Video(props) {
  let { id } = useParams();
  const [userComment, setUser] = useState([]);
  const token = getCookie("access_token");
  const [modalTitle, setModalTitle] = useState(""); // modal제목
  const [modalContent, setModalContent] = useState([]); // modal

  useEffect(() => {
    getComments();
  }, []);
  console.log(userComment);
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
          parentId: "댓글id",
          textOriginal: "쓸말 들",
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
          comment_id: "답글id",
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

  const handleCommentClick = async (comment) => {
    // 댓글 클릭 이벤트 처리
    setModalTitle(comment);
    setIsModalOpen(true);
    await getRecomment(comment.id);
  };

  useEffect(() => {
    getRecomment();
  }, [modalTitle]);
  const getRecomment = async (parentId) => {
    // 답글들 불러오기
    try {
      const get_Recommend = await axios.post(
        `${process.env.REACT_APP_URL}/api/get-recomment-list/`,
        {
          parentId: parentId, //댓글 id
        },
        {
          headers: { Authorization: token },
        }
      );
      const recommentdatas = get_Recommend.data.items.map(
        (item) => item.snippet
      );
      setModalContent(recommentdatas);
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false); //modal창 띄우기

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let state = useSelector((state) => { return state } )
  console.log(state);
  console.log(userComment);
  const retrievedTitle = localStorage.getItem("videoTitle");

  return (
    <div className="video_page">
      <div className="video_containor">
        <div className="video_title">
          <h3>{ retrievedTitle }</h3>
        </div>
        <div>
        {userComment.map((a, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleCommentClick(a)}
                  className="video_comment_list"
                >
                  <p>{userComment[i].snippet.authorDisplayName}</p>
                  <p>{userComment[i].snippet.textDisplay}</p>
                </div>
              );
            })}
        </div>
      </div>

      {isModalOpen && (
        <div>
          <div id="myModal" className="video_popup">
            <div className="video_popup-content">
              <span
                className="video_close"
                onClick={() => {
                  handleCloseModal();
                  let box = [];
                  setModalContent([...box]);
                }}
              >
                &times;
              </span>
              <h2 className="video_modal_title">
                {modalTitle.snippet.textOriginal}
              </h2>
              <div className="video_modal_title_sub">
                <span className="video_modal_like">
                  👍 {modalTitle.snippet.likeCount}
                </span>
                <span>
                  {calculateElapsedTime(modalTitle.snippet.updatedAt)}
                </span>
              </div>

              {modalContent.map((a, i) => (
                <div className="video_modal_content" key={i}>
                  <div className="video_modal_text">
                    {modalContent[i].textOriginal}
                  </div>
                  <span>{calculateElapsedTime(modalContent[i].updatedAt)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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

export default Video;
