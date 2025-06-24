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
  candlesType: CandlesType,
  count: number
) => {
  try {
    const response = await api.get(
      `candles/${candlesType}/${candlesType === "minutes" ? "1" : ""}`,
      {
        params: {
          market: coinName,
          count,
          // converting_price_unit: "KRW",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
