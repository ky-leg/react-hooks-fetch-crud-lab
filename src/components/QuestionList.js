import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, onDel, onNew}) {
  
  //  console.log(questions)
    

  if (!questions){
    return (
      <h2>Questions Loading... </h2>
    )
  }

  function onDelete(id){
    onDel(id)
  }
  
  function onNewAnswer(id, index){
    // console.log(typeof parseInt(index), typeof id)
    onNew(id, parseInt(index))
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        
      {questions.map((question => {
        return (
        <QuestionItem key= {question.id} question={question} onDelete={onDelete} onNewAnswer={onNewAnswer}/>
          )
        }))}
  
      </ul>
    </section>
  );
}

export default QuestionList;
