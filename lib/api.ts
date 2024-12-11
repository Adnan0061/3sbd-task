import { CompanyFilters } from "@/types/company";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`;
  return config;
});

export const publicApi = {
  defaultFilters: async () => {
    const response = await api.get("/");
    return response.data;
  },
  companiesList: async (filters: CompanyFilters) => {
    const response = await api.post("/", filters);
    return response.data;
  },
};
