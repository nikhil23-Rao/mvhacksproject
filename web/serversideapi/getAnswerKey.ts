import axios from "axios";

export const getAnswerKey = async (query) => {
  console.log("Query for answer key:", query);
  const res = await axios.post(
    // "http://localhost:3001/" + "answerkey",
    "http://localhost:3001/answerkey",
    { query },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  console.log(res.data);
  return res.data.response;
};
