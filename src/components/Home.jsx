import React from "react";

export default function Home(props) {
  return (
    <>
      <div className="home-div">
        <div className="main-title">
          <h1 className="title-text">Quizzical</h1>
          <button onClick={props.handleStart} className="home-btn">
            <h3>Start Quiz</h3>
          </button>
        </div>
      </div>
    </>
  );
}
