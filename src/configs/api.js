import axios from "axios";
import { BASE_URL } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  get: (url, params = "") =>
    instance({
      method: "GET",
      url,
      params,
    }),
  post: (url, data) =>
    instance({
      method: "POST",
      url,
      data,
    }),
  delete: (url, data) =>
    instance({
      method: "DELETE",
      url,
      data,
    }),
};
