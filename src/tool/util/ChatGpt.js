import axios from "axios";

export default async function ChatGpt(comment) {
  try {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": comment }]
    }, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



