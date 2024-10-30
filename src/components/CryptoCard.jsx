import React, { useEffect, useState } from 'react';
import vectorGreen from "../assets/svg/vector_green.svg";
import vectorRed from "../assets/svg/vector_red.svg";
import axios from 'axios';

const CryptoCard = ({ symbol, lastname, name }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
      setData(response.data);
      setError(null);  // Clear any previous errors
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData();
      setLoading(false)
    }, 10000);

    return () => clearInterval(intervalId);
  }, [symbol]);

    if (loading) {
      return <div className='crypto_card w-[123px] overflow-hidden relative rounded-[8px] leading-6 text-[#fff] px-[18px] py-3 font-normal'>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>;
    }

  if (error) {
    return <div className='crypto_card w-[123px] overflow-hidden relative rounded-[8px] leading-6 text-[#fff] px-[18px] py-3 font-normal'>Error: {error}</div>;
  }

  const bidPrice = data ? Number(data.bidPrice).toFixed(3) : '0.000';
  const percentChange = data ? Number(data.priceChangePercent).toFixed(2) : '0.00%';
  const isPositive = parseFloat(percentChange) >= 0;
  
  return (
    <div className='crypto_card w-[123px] overflow-hidden relative rounded-[8px] leading-6 text-[#fff] px-[18px] py-3 font-normal xl:even:hidden lg:hidden'>
      <div className={`w-full h-[32px] rounded-[50%] left-0 bottom-[-16px] absolute bg-gradient-to-b ${isPositive? 'from-[#03CEA4]':'from-[#FFA3A1]'} blur-[12px]`}></div>
      <div className={`absolute w-[32px] h-[2px] ${isPositive ? 'bg-[#03CEA4]' : 'bg-[#FF5E5B]'}  bottom-0 rounded-full left-[38%]`}></div>
      <p className='flex gap-2 mb-1 font-semibold'>
        {lastname} <span className='text-[14px] text-[#727272] font-normal'>{name}</span>
      </p>
      <p>${bidPrice}</p>
      <div className={`flex gap-1 mt-2 text-[12px] items-center ${isPositive ? 'text-[#00D084]' : 'text-[#FF5E5B]'}`}>
        <img src={isPositive ? vectorGreen : vectorRed} alt={isPositive ? 'Up' : 'Down'} />
        <p>{isPositive?"+":""}{percentChange}%</p>
      </div>
    </div>
  );
}

export default CryptoCard;
