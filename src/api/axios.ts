import axios from "axios";
import { QuestionsResponse } from "../hooks/useQuiz";

const url = "";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=24";
export const api = axios.create({
  baseURL: tempUrl
})

export const fetchQuestions = async () => {
  const response = await api.get(tempUrl)
  const data: QuestionsResponse[] = response.data.results

  return data
};