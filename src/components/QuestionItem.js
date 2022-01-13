import React from "react";

function QuestionItem({ question, onDelete, onNewAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function onClick(){
    onDelete(question.id)
  }

  function newAnswer(event){
    // console.log(event.target.value)
    onNewAnswer(question.id, event.target.value)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={newAnswer} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={onClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
