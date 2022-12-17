import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Quiz() {
  const opentdbAPI = "https://opentdb.com/api.php?amount=50&category=18&difficulty=medium&type=multiple";

  const [quizData, setQuizData] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState([]);

  async function getQuizData() {
    const result = await axios.get(opentdbAPI);
    setQuizData(result.data.results);

    let tempList = [];
    while (tempList.length < 4) {
      const x = Math.floor(Math.random() * 50);
      if (tempList.indexOf(quizData[x]) === -1) {
        tempList.push(result.data.results[x]);
      }
    }

    setCurrentQuiz((prev) => tempList.map((ele) => [ele.question, ele.correct_answer, ele.incorrect_answers]));
  }

  function getRandom1_50() {
    return Math.floor(Math.random() * 50);
  }

  function getFourQs() {
    let tempList = [];
    while (tempList.length < 4) {
      const x = Math.floor(Math.random() * 50);
      if (tempList.indexOf(quizData[x]) === -1) {
        tempList.push(quizData[x]);
      }
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

  function getRandom1_4_no_repeat() {
    let temp = [];
    while (temp.length < 4) {
      const x = Math.floor(Math.random() * 4);
      if (temp.indexOf(x) === -1) {
        temp.push(x);
      }
    }
    return temp;
  }

  function getChoices(ele) {
    let temp = [ele[1], ...ele[2]];
    return getRandom1_4_no_repeat().map((ele2) => {
      console.log(ele);
      return <button className="choices-btn">{temp[ele2]}</button>;
    });
  }

  let questionsAnswers;
  if (currentQuiz) {
    questionsAnswers = currentQuiz.map((ele) => {
      console.log("hi");
      return (
        <>
          <h3>{ele[0]}</h3>
          <div className="choices-div">
            {/* map button/choices */}
            {getChoices(ele)}
          </div>
          <hr />
        </>
      );
    });
  }
  console.log(currentQuiz);
  return (
    <div className="quiz-div">
      <div className="quiz-box">{questionsAnswers}</div>

      <button className="check-btn" onClick={handleNewQuiz}>
        <h3>Check Answers</h3>
      </button>
    </div>
  );
}
