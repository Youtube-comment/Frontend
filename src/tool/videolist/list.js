import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useEffect, useState } from "react";
import { cookie, getCookie } from "../util/Cookie";
function List() {
  const [list, setList] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchedToken = localStorage.getItem("access_token");
    if (fetchedToken) {
      setToken(fetchedToken);
    }
  }, []);

  useEffect(() => {
    console.log("Token: ", token);
  }, [token]);
  return (
    <>
      <button
        onClick={() => {
          axios
            .get(`${process.env.REACT_APP_URL}/api/get-youtube-list/`, {
              headers: {
                Authorization: token,
              },
            })
            .then((result) => {
              console.log(result.data.items[0].snippet.title);
            })
            .catch((result) => {
              console.log(result);
            });
        }}
      >
        영상불러오기
      </button>
      {list.map((a, i) => {
        return (
          <div className="list" key={i}>
            <div className="item">{list[i]}</div>
          </div>
        );
      })}
    </>
  );
}

export default List;
