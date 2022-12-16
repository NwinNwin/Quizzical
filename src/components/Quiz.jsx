import React, {useState, useEffect} from "react";
import axios from "axios";


export default function Quiz() {

    const opentdbAPI = "https://opentdb.com/api.php?amount=50&category=18&difficulty=medium&type=multiple";

    const [quizData, setQuizData] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState([]);



    async function getQuizData() {
        const result = await axios.get(opentdbAPI);
        setQuizData(result.data.results) 

    }

    function getRandom1_50() {
        return Math.floor(Math.random() * 50);
    }

    function getFourQs () {
        let tempList = []
        for (let i = 0; i < 4; i++){
            const indexForQuiz = getRandom1_50()
            tempList.push(quizData[indexForQuiz])
        }
        setCurrentQuiz(prev => tempList.map(ele => ele))
        console.log(currentQuiz)
    }

    function handleNewQuiz() {
        getFourQs()
    }

    useEffect(() => {
        getQuizData()
        
    }, [])

    return (
        <div className="quiz-div">
            <button onClick={handleNewQuiz}>new Quiz</button>
        </div>

    )
}