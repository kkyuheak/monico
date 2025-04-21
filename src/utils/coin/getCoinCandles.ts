import { api } from "@/api/axiosInstance";
import { ParamValue } from "next/dist/server/request/params";

type CandlesType =
  | "seconds"
  | "minutes"
  | "days"
  | "weeks"
  | "months"
  | "years";

export const getCoinCandles = async (
  coinName: ParamValue,
  candlesType: CandlesType
) => {
  try {
    const response = await api.get(`candles/${candlesType}/1`, {
      params: {
        market: coinName,
        count: 50,
        to: "2024-10-01 00:00:00",
      },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
