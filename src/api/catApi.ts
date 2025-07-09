import axios from "axios";
import { Cat } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const fetchCatsFromApi = async (): Promise<Cat[]> => {
  const response = await axios.get<Cat[]>(`${API_URL}cats/list/`);
  return response.data;
};
