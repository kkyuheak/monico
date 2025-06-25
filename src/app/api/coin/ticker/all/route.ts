import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.get("https://api.upbit.com/v1/ticker/all", {
      params: {
        quote_currencies: "KRW,BTC",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Upbit API error:", error);
    return NextResponse.json({ message: "Upbit API error" }, { status: 500 });
  }
}
