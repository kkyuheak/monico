import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";
  const keyword = searchParams.get("keyword") ?? "";
  const dateFrom = searchParams.get("date_from") ?? "";
  const dateTo = searchParams.get("date_to") ?? "";

  try {
    const { data } = await axios.get(
      "https://api-v2.deepsearch.com/v1/articles",
      {
        params: {
          page,
          page_size: pageSize,
          keyword,
          date_from: dateFrom,
          date_to: dateTo,
        },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_NEWS_API_KEY}`,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "API 호출 실패" }, { status: 500 });
  }
}
