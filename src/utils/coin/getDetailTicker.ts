import { api } from "@/api/axiosInstance";
import { ParamValue } from "next/dist/server/request/params";

export const getDetailTicker = async (coinName: ParamValue) => {
  try {
    const response = await api.get(`ticker?markets=${coinName}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
