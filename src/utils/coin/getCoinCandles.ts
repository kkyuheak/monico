import { api } from "@/api/axiosInstance";
import { ParamValue } from "next/dist/server/request/params";
import dayjs from "dayjs";

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
  const nowDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(nowDate);

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

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
