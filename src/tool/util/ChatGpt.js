import axios from "axios";

export default function ChatGpt(comment) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{ "role": "user", "content": comment }]
  }, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    }
  })
    .then(response => {
      // 요청 성공 시 수행할 작업
      console.log(response.data.messages.content);
      const gptcomment = response.data.messages.content;
    })
    .catch(error => {
      // 요청 실패 시 수행할 작업
      console.error(error);
    });
}
