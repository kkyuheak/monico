import axios from "axios";

// 업비트 api
export const api = axios.create({
  baseURL: "/api/coin",
});

// 업비트 WS api
export const upbitWsApi = axios.create({
  baseURL: "/api/ws",
});

// export const newsApi = axios.create({
//   baseURL: "/api/news",
// });
