import axios from "axios";
import { QuestionsResponse } from "../hooks/useQuiz";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";
export const api = axios.create({
  baseURL: API_ENDPOINT
})

export const fetchQuestions = async (amount: number, category: string, difficulty: string) => {

  const url = API_ENDPOINT + `amount=${amount}&difficulty=${difficulty}&category=${table[category as keyof typeof table]
    }&type=multiple`;

  console.log(url)
  const response = await api.get(url)
  const data: QuestionsResponse[] = response.data.results


  return data
};