import React, { useState } from "react";
import "./../styles/Teacher.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion((prevState) => ({
      ...prevState,
      options: updatedOptions,
    }));
  };

  const handleAddQuestion = () => {
    if (!newQuestion.options.includes(newQuestion.correctAnswer)) {
      alert("Please make sure the correct answer is one of the options.");
      return;
    }

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  const handleRemoveQuestion = (index) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>Teacher's MCQ Setter</h1>
      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <button className="remove-btn" onClick={() => handleRemoveQuestion(index)}>
              Remove
            </button>
            <h3>Question {index + 1}:</h3>
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                setQuestions((prevQuestions) => {
                  const updatedQuestions = [...prevQuestions];
                  updatedQuestions[index].question = e.target.value;
                  return updatedQuestions;
                })
              }
              placeholder="Enter the question"
            />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) =>
                setQuestions((prevQuestions) => {
                  const updatedQuestions = [...prevQuestions];
                  updatedQuestions[index].correctAnswer = e.target.value;
                  return updatedQuestions;
                })
              }
              placeholder="Enter the correct answer"
            />
          </div>
        ))}
      </div>
      <div className="new-question">
        <h2>Add New Question:</h2>
        <input
          className="options"
          type="text"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          placeholder="Enter the question"
        />
        {newQuestion.options.map((option, index) => (
          <div key={index} className="option">
            <input
              className="options"
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
        <input
          className="options"
          type="text"
          value={newQuestion.correctAnswer}
          onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
          placeholder="Enter the correct answer"
        />
        <button className="submit-btn" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
    </div>
  );
}

export default App;
