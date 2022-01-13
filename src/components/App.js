import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState(null)
  const [newAnswer, setNewAnswer] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(items => setQuestions(items))
  }, [newAnswer])

  function newQuestion(data){
    console.log(data)
    fetch('http://localhost:4000/questions', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        "prompt": data.prompt,
        "answers": data.answers,
        "correctIndex": data.correctIndex,
      })
    })
    // .then((r) => r.json())
    // .then((newQ) => setQuestions([...questions, newQ]))
  }

  function deleteQ(id){
    
    const newQuestions = questions.filter(question => question.id !== id
    )
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then(r => r.json())
    .then(r => console.log(r))
    setQuestions(newQuestions)
  }

  function onNew(id, index){
    console.log('long way to get here! qID:', id, index)
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": index
      })
    })
    .then(setNewAnswer(newAnswer))

  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {/* {console.log("sending", questions, "to QuestionList")} */}
      {page === "Form" ? //does page equal form
        <QuestionForm onSubmit={newQuestion}/> : //if not go below
        <QuestionList questions={questions} onDel={deleteQ} onNew={onNew}/>}
    </main>
  );
}

export default App;
