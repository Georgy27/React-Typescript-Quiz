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
  const [error, setError] = useState<boolean>(false);

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

  useEffect(() => {
    setLoading(true);
    setWaiting(false);
    fetchQuestions()
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setQuestions(data);
          setLoading(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      })
      .catch((err) => {
        setWaiting(true);
      });
  }, []);

  return {
    waiting,
    loading,
    questions,
    index,
    correct,
    error,
    isModalOpen,
    nextQuestion,
    checkAnswer,
    closeModal,
  };
};

export default useQuiz;
