import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CryptoContext } from "../context/CryptoContext";
import MCard from "./MCard";
import { SearchContext } from "../context/SearchContext";
const MarqueeCard = () => {
  const {mobileSearch, setMobileSearch} = useContext(SearchContext)
  const crypto = [
    {
      id: 1,
      symbol: "BTCUSDT",
      lastName: "BTC",
      name: "Bitcoin",
    },
    {
      id: 2,
      symbol: "TONUSDT",
      lastName: "TON",
      name: "Toncoin",
    },
    {
      id: 3,
      symbol: "ETHUSDT",
      lastName: "ETH",
      name: "Ethereum",
    },
    {
      id: 4,
      symbol: "SOLUSDT",
      lastName: "SOL",
      name: "Solana",
    },
    {
      id: 5,
      symbol: "XRPUSDT",
      lastName: "XRP",
      name: "Ripple",
    },
    {
      id: 6,
      symbol: "DOGEUSDT",
      lastName: "DOGE",
      name: "Dogecoin",
    },
  ];

  return (
    <div className="w-[100vw] bg-bgMode h-12 items-center overflow-hidden relative text-textMode flex shadow-3xl">
      <div className={`absolute ${mobileSearch?"top-0 transition-all":"top-[-100%] transition-all"} h-full flex w-full z-[2] bg-bgMode`}>
        <input type="text" name="" id="" placeholder="Поиск" className=" outline-none w-full flex text-right px-6 bg-bgMode"/>
      </div>
      <div className="w-full marquee-container">
        <marquee behavior="" direction="" className="flex gap-4">
          <span className=" flex gap-4">
            {  
              crypto.map((item)=>{
                return(
                  <MCard key={item.id} lastname={item.lastName} symbol={item.symbol}/>
                )
              })
            }
          </span>
        </marquee>
      </div>
    </div>
  );
};

export default MarqueeCard;
