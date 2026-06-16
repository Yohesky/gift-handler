import axios from "axios";
import { toCamelCase } from "../transformers/camelCase";

export const apiClient = axios.create({
  baseURL: "https://gift-handler-be-production.up.railway.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use((response) => {
  if (response.data) {
    response.data = toCamelCase(response.data);
  }
  return response;
});
