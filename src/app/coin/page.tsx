"use client";

import { getAllCoinName } from "@/utils/api/getAllCoinName";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const COINS = ["KRW-BTC", "KRW-ETH", "KRW-XRP"];

const CoinMainPage = () => {
  const { data: allCoinNameData } = useQuery<AllCoinNameType[]>({
    queryKey: ["AllCoins"],
    queryFn: getAllCoinName,
  });

  console.log(allCoinNameData);

  const ws = useRef<WebSocket | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  // useEffect(() => {
  //   ws.current = new WebSocket("wss://api.upbit.com/websocket/v1");
  //   ws.current.binaryType = "arraybuffer";

  //   ws.current.onopen = () => {
  //     const subscribeMsg = [
  //       { ticket: "monico-ticker" },
  //       {
  //         type: "ticker",
  //         codes: COINS,
  //       },
  //       { format: "DEFAULT" },
  //     ];

  //     ws.current?.send(JSON.stringify(subscribeMsg));
  //   };

  //   ws.current.onmessage = async (event) => {
  //     const data =
  //       event.data instanceof Blob
  //         ? await event.data.arrayBuffer()
  //         : event.data;
  //     const enc = new TextDecoder("utf-8");
  //     const json = JSON.parse(enc.decode(data));
  //     console.log(json);
  //     // setPrice(json.trade_price);
  //   };
  // }, []);

  return <div>CoinMainPage</div>;
};

export default CoinMainPage;
