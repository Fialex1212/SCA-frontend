import axios from "axios";
import { Cat } from "../types";

export const fetchCatsFromApi = async (): Promise<Cat[]> => {
  const response = await axios.get<Cat[]>("http://127.0.0.1:8001/cats/list/");
  return response.data;
};
