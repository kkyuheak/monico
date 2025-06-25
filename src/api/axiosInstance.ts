import axios from "axios";

// 업비트 api
export const api = axios.create({
  baseURL: "/api/coin",
});

export const newsApi = axios.create({
  baseURL: "/api/news",
});
