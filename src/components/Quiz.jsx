import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Quiz() {
  const opentdbAPI = "https://opentdb.com/api.php?amount=50&category=18&difficulty=medium&type=multiple";

  const [quizData, setQuizData] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState([]);

  async function getQuizData() {
    const result = await axios.get(opentdbAPI);
    setQuizData(result.data.results);
  }

  function getRandom1_50() {
    return Math.floor(Math.random() * 50);
  }

  function getFourQs() {
    let tempList = [];
    for (let i = 0; i < 4; i++) {
      const indexForQuiz = getRandom1_50();
      tempList.push(quizData[indexForQuiz]);
    }
    setCurrentQuiz((prev) => tempList.map((ele) => [ele.question, ele.correct_answer, ele.incorrect_answers]));
    console.log(currentQuiz);
  }

  function handleNewQuiz() {
    getFourQs();
  }

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <div className="quiz-div">
      <div className="quiz-box">
        <h3>Which of the following languages is used as a scripting language in the Unity 3D game engine?</h3>
        <div className="choices-div">
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
        </div>
        <hr />
        <h3>What was the first Android version specifically optimized for tablets?</h3>
        <div className="choices-div">
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
        </div>
        <hr />
        <h3>What is the number of keys on a standard Windows Keyboard?</h3>
        <div className="choices-div">
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
        </div>
        <hr />
        <h3>What is the number of keys on a standard Windows Keyboard?</h3>
        <div className="choices-div">
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
          <button className="choices-btn">Aloha</button>
        </div>
        <hr />
      </div>

      <button className="check-btn" onClick={handleNewQuiz}>
        <h3>Check Answers</h3>
      </button>
    </div>
  );
}
