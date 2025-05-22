import axios from "axios";
import { Mission } from "../types";

export const fetchMissionsFromApi = async (): Promise<Mission[]> => {
  const response = await axios.get<Mission[]>("http://127.0.0.1:8001/missions/list/");
  return response.data;
};
