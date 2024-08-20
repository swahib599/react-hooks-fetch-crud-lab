import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(res => res.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleSubmittedForm(newQuiz) {
    setQuestions([...questions, newQuiz]);
  }

  function handleDeletedQuiz(quiz) {
    const updatedQuiz = questions.filter((question) => question.id !== quiz.id);
    setQuestions(updatedQuiz);
  }

  function handleUpdatedQuiz(updatedQuiz) {
    const updateQuiz = questions.map((quiz) => {
      return quiz.id === updatedQuiz.id ? updatedQuiz : quiz;
    });
    setQuestions(updateQuiz);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm handleSubmitForm={handleSubmittedForm} />
      ) : (
        <QuestionList questionList={questions} handleDeletedQuiz={handleDeletedQuiz} handleUpdatedQuiz={handleUpdatedQuiz} />
      )}
    </main>
  );
}

export default App;
