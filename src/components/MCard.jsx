import React, { useEffect, useState } from 'react'
import axios from 'axios';
const MCard = ({ symbol, lastname }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
      setData(response.data);
      setError(null);  // Clear any previous errors
    } catch (err) {
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
    const intervalId = setInterval(() => {
      fetchData();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [symbol]);

  const bidPrice = data ? Number(data.bidPrice).toFixed(3) : '0.000';
  const percentChange = data ? Number(data.priceChangePercent).toFixed(2) : '0.00%';
  const isPositive = parseFloat(percentChange) >= 0;
  return (
    <div className='flex gap-2 text-[12px] items-center'>
      <p className='leading-6'>{lastname}</p>
      <p className={isPositive?'leading-4 text-[#03CEA4]':"leading-4 text-[#FF5E5B]"}>${bidPrice}</p>
    </div>
  )
}

export default MCard