import axios from "axios";
import { Mission } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMissionsFromApi = async (): Promise<Mission[]> => {
  const response = await axios.get<Mission[]>(`${API_URL}missions/list/`);
  return response.data;
};
