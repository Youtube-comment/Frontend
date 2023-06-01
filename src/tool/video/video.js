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
  const [isModalOpen, setIsModalOpen] = useState(false); //modal창 띄우기
  const [selectedCommentIndex, setSelectedCommentIndex] = useState();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [createComment, setCreateComment] = useState(""); // 대댓글 뭐라고 쓸지
  const [createCommentId, setCreateCommentId] = useState(""); // 댓글의 id 가져오기
  const [recommentLength, setRecommentLength] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

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
          parentId: createCommentId,
          textOriginal: createComment,
        },
        {
          headers: { Authorization: token },
        }
      );
      let copy = [...modalContent];
      copy.unshift(comment_response.data);
      setModalContent(copy);
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async (removeId, i) => {
    //답글삭제
    try {
      const remove_response = await axios.post(
        `${process.env.REACT_APP_URL}/api/post-comment-delete/`,
        {
          comment_id: removeId,
        },
        {
          headers: { Authorization: token },
        }
      );
      let copy = [...modalContent];
      copy.splice(i, 1);
      setModalContent(copy);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentClick = async (comment, index) => {
    setModalTitle(comment);
    setIsModalOpen(true);
    setSelectedCommentIndex(index);

    await getRecomment(comment.id);
  };

  useEffect(() => {
    getRecomment();
  }, [modalTitle]);
  const getRecomment = async (parentId) => {
    // 답글들 불러오기
    try {
      const get_Recomment = await axios.post(
        `${process.env.REACT_APP_URL}/api/get-recomment-list/`,
        {
          parentId: parentId, //댓글 id
        },
        {
          headers: { Authorization: token },
        }
      );
      const recommentdatas = get_Recomment.data.items.map((item) => item);
      setModalContent(recommentdatas);
      let copy = [...recommentLength];

      recommentdatas.map((a, i) => {
        copy.push(false);
      });
      setRecommentLength(copy);
      console.log(copy);
    } catch (error) {
      console.log(error);
    }
  };

  let state = useSelector((state) => {
    return state;
  });
  const retrievedTitle = localStorage.getItem("videoTitle");

  return (
    <div className="video_page">
      <div className="video_containor">
        <div className="video_title">
          <h3>{retrievedTitle}</h3>
        </div>
        <div>
          {userComment.map((a, i) => {
            return (
              <div
                key={i}
                onClick={() => handleCommentClick(a, i)}
                className="video_comment_list"
              >
                <h2 className="video_comment_user">
                  {userComment[i].snippet.authorDisplayName}
                </h2>
                <div className="video_comment_block">
                  <h3 className="video_comment_content">
                    {userComment[i].snippet.textDisplay}
                  </h3>
                  <p className="video_comment_like">
                    👍 {userComment[i].snippet.likeCount}
                  </p>
                  <p className="video_comment_update">
                    {calculateElapsedTime(userComment[i].snippet.updatedAt)}
                  </p>
                </div>

                {isModalOpen && i == selectedCommentIndex && (
                  <div>
                    <div id="myModal" className="video_popup">
                      <div className="video_popup-content">
                        {/* <span
                            className="video_close"
                            onClick={() => {
                              handleCloseModal();
                              let box = [];
                              setModalContent([...box]);
                            }}
                          >
                            &times;
                          </span> */}

                        <div className="video_modal_form">
                          <input
                            onChange={(e) => {
                              setCreateComment(e.target.value);
                              setCreateCommentId(modalTitle.id);
                            }}
                            placeholder="댓글추가.."
                          />
                          <button
                            onClick={() => {
                              addComment();
                            }}
                          >
                            댓글
                          </button>
                        </div>
                        {modalContent.map((a, i) => (
                          <div className="video_modal_content" key={i}>
                            <img
                              className="video_recomment_img"
                              src={
                                modalContent[i].snippet.authorProfileImageUrl
                              }
                            />
                            <div className="video_recomment_main">
                              <div className="video_recomment_head">
                                <div className="video_recomment_username">
                                  {modalContent[i].snippet.authorDisplayName}
                                </div>
                                <div className="video_recomment_update">
                                  {calculateElapsedTime(
                                    modalContent[i].snippet.updatedAt
                                  )}
                                </div>
                              </div>

                              <div className="video_recomment_text">
                                {modalContent[i].snippet.textOriginal}
                              </div>
                              <div className="video_recomment_bottom">
                                <div className="video_recomment_like">
                                  👍 {modalContent[i].snippet.likeCount}
                                </div>
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation(); //이벤트버블링 방지
                                    let copy = [...recommentLength];
                                    copy[i] = true;
                                    setRecommentLength(copy);
                                  }}
                                >
                                  답글
                                </span>
                              </div>
                              {recommentLength[i] == true ? (
                                <div className="video_add_recomment">
                                  <input
                                    onChange={(e) => {
                                      setCreateComment(e.target.value);
                                      setCreateCommentId(modalTitle.id);
                                    }}
                                    placeholder="답글추가.."
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation(); //이벤트버블링 방지
                                      let copy = [...recommentLength];
                                      copy[i] = false;
                                      setRecommentLength(copy);
                                    }}
                                  >
                                    취소
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      addComment();
                                      e.stopPropagation(); //이벤트버블링 방지
                                      let copy = [...recommentLength];
                                      copy[i] = false;
                                      setRecommentLength(copy);
                                    }}
                                  >
                                    답글
                                  </button>
                                  <button>GPT</button>
                                </div>
                              ) : null}
                            </div>

                            <span
                              className="video_recomment_remove"
                              onClick={() => {
                                removeComment(modalContent[i].id, i);
                              }}
                            >
                              삭제
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
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
