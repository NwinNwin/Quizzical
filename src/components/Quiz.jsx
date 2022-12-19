import React, { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Quiz() {
  const opentdbAPI = "https://opentdb.com/api.php?amount=50&category=18&difficulty=medium&type=multiple";

  const [quizData, setQuizData] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [showCorrect, setShowCorrect] = useState({ isClick: false, value: 0 });

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

    setCurrentQuiz((prev) =>
      tempList.map((ele) => {
        let listOfChoices = [
          { q: ele.correct_answer, id: nanoid(), correct: true, chosen: false },
          ...ele.incorrect_answers.map((ele3) => {
            return { q: ele3, id: nanoid(), correct: false, chosen: false };
          }),
        ];

        return {
          question: ele.question,
          choices: getRandom1_4_no_repeat().map((i) => listOfChoices[i]),
          id: nanoid(),
          correctId: listOfChoices[0].id,
          choseCorrect: false,
        };
      })
    );
  }

  function getFourQs() {
    let tempList = [];
    while (tempList.length < 4) {
      const x = Math.floor(Math.random() * 50);
      if (tempList.indexOf(quizData[x]) === -1) {
        tempList.push(quizData[x]);
      }
    }

    setCurrentQuiz((prev) =>
      tempList.map((ele) => {
        let listOfChoices = [
          { q: ele.correct_answer, id: nanoid(), correct: true, chosen: false },
          ...ele.incorrect_answers.map((ele3) => {
            return { q: ele3, id: nanoid(), correct: false, chosen: false };
          }),
        ];

        return {
          question: ele.question,
          choices: getRandom1_4_no_repeat().map((i) => listOfChoices[i]),
          id: nanoid(),
          correctId: listOfChoices[0].id,
          choseCorrect: false,
        };
      })
    );
  }

  function handleNewQuiz() {
    getFourQs();
    setShowCorrect({ isClick: false, value: 0 });
  }

  //1
  useEffect(() => {
    getQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(quizData);
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

  //get id and change the click condition to true
  function handleChoiceClick(id) {
    setCurrentQuiz((prev) =>
      prev.map((j) => {
        return id === j.correctId ? { ...j, choseCorrect: true } : j;
      })
    );
    setCurrentQuiz((prev) =>
      prev.map((i) => {
        return {
          ...i,
          choices: i.choices.map((j) => {
            return id === j.id ? { ...j, chosen: true } : j;
          }),
        };
      })
    );
  }

  function getChoices(ele) {
    return ele.choices.map((choice) => {
      if (!choice.chosen) {
        return (
          <button
            onClick={() => {
              handleChoiceClick(choice.id);
            }}
            className="choices-btn"
          >
            {choice.q}
          </button>
        );
      } else {
        return (
          <button
            onClick={() => {
              handleChoiceClick(choice.id);
            }}
            className="choices-btn choices-chosen"
          >
            {choice.q}
          </button>
        );
      }
    });
  }

  function checkAnswer() {
    let total = 0;
    for (let i = 0; i < 4; i++) {
      let totalChosen = 0;
      if (currentQuiz[i].choseCorrect) {
        total++;
      }
      for (let j = 0; j < 4; j++) {
        if (currentQuiz[i].choices[j].chosen) {
          totalChosen++;
        }
      }
      if (totalChosen < 1 || totalChosen > 1) {
        total--;
      }
    }

    setShowCorrect({ isClick: true, value: total < 0 ? 0 : total });
  }

  let questionsAnswers;
  if (currentQuiz) {
    questionsAnswers = currentQuiz.map((ele) => {
      return (
        <>
          <h3>{ele.question}</h3>
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
      {showCorrect.isClick && <h1 className="check-answers">{`${showCorrect.value}/4`}</h1>}
      <div className="quiz-box">{questionsAnswers}</div>

      <button className="check-btn" onClick={checkAnswer}>
        <h3>Check Answer</h3>
      </button>

      <button className="restart-btn" onClick={handleNewQuiz}>
        <h3>↻</h3>
      </button>
      {showCorrect.value === 4 && <Confetti />}
    </div>
  );
}
