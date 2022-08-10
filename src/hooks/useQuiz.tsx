import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../api/axios";

export interface QuestionsResponse {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const useQuiz = () => {
  const [waiting, setWaiting] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionsResponse[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [fetching, isFetching] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMSg] = useState<string>("");
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      const index = prevIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  };

  const checkAnswer = (value: boolean) => {
    if (value) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isFetching(true);
  };

  useEffect(() => {
    if (!fetching) return;
    if (fetching) {
      setLoading(true);
      setWaiting(false);
      const { amount, category, difficulty } = quiz;
      fetchQuestions(amount, category, difficulty)
        .then((data) => {
          console.log(data);
          if (data.length > 0) {
            setQuestions(data);
            setLoading(false);
            setError(false);
            setErrorMSg("");
            isFetching(false);
          } else {
            setWaiting(true);
            setError(true);
            setErrorMSg(
              "can't generate questions, please try different options"
            );
          }
        })
        .catch((err) => {
          setWaiting(true);
          setError(true);
          setErrorMSg(err.message);
        });
    }
  }, [fetching, quiz]);

  return {
    waiting,
    loading,
    questions,
    index,
    correct,
    error,
    errorMsg,
    isModalOpen,
    nextQuestion,
    checkAnswer,
    closeModal,
    handleChange,
    handleSubmit,
    quiz,
    fetching,
  };
};

export default useQuiz;
