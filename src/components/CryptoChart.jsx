import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import 
const cryptoSymbols = [
  'BTCUSDT', // Bitcoin
  'ETHUSDT', // Ethereum
  'TONUSDT', // Toncoin
  'SOLUSDT', // Solana
  'XRPUSDT', // Ripple
  'DOGEUSDT' // Dogecoin
];

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('1д');
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [chartData, setChartData] = useState([]);

  // Функция для получения данных о криптовалютах
  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
      const data = response.data
        .filter(crypto => cryptoSymbols.includes(crypto.symbol))
        .map(crypto => ({
          symbol: crypto.symbol,
          name: crypto.symbol.replace('USDT', ''),
          price: parseFloat(crypto.lastPrice).toFixed(2),
          priceChange: parseFloat(crypto.priceChange).toFixed(2),
          change: `${parseFloat(crypto.priceChangePercent).toFixed(2)}%`,
          color: parseFloat(crypto.priceChange) >= 0 ? 'green' : 'red',
          img: `/${crypto.symbol}.svg`
        }));
      setCryptoData(data);
    } catch (error) {
      console.error("Ошибка при загрузке данных: ", error);
    }
    setLoading(false);
  };

  // Функция для получения данных графика с учетом диапазона
  const fetchChartData = async (symbol, range) => {
    let interval;
    switch (range) {
      case '1д':
        interval = '1h';
        break;
      case '1мес':
        interval = '1d';
        break;
      case '3мес':
        interval = '1d';
        break;
      case '1г':
        interval = '1w';
        break;
      case '5л':
        interval = '1M';
        break;
      case 'Все':
        interval = '1M';
        break;
      default:
        interval = '1d';
    }

    const limit = 100; // Количество данных, которые нужно получить
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

    try {
      const response = await axios.get(url);
      const chartData = response.data.map(data => ({
        date: data[0], // Время в миллисекундах
        price: parseFloat(data[4]), // Закрывающая цена
      }));

      setChartData(chartData);
    } catch (error) {
      console.error("Ошибка при загрузке данных графика: ", error);
    }
  };

  // Функция для выбора криптовалюты
  const borderNone = (index, cryptoSymbol) => {
    setSymbol(cryptoSymbol);
    fetchChartData(cryptoSymbol, selectedRange);
  };

  // Функция для изменения диапазона
  const handleRangeChange = (range) => {
    setSelectedRange(range);
    if (symbol) {
      fetchChartData(symbol, range); // Обновляем график с новыми данными
    }
  };

  useEffect(() => {
    fetchCryptoData(); // Загружаем данные криптовалют при монтировании компонента
  }, []);

  useEffect(() => {
    if (symbol) {
      fetchChartData(symbol, selectedRange); // Загружаем данные графика при изменении символа или диапазона
    }
  }, [symbol, selectedRange]);

  return (
    <Card sx={{ margin: '0px', padding: '0px' }} className='bg-pageMode text-textMode border border-bgMode'>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Криптовалюты
        </Typography>

        {symbol && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                domain={['dataMin', 'dataMax']} 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()<10?`0${date.getDate()}`:date.getDate()}.${date.getMonth()+ 1<10?`0${date.getMonth()+ 1}`:date.getMonth() + 1}`; // Формат даты
                }} 
              />
              <YAxis hide={true} tick={{ fontSize: 10 }} domain={['dataMin', 'dataMax']} tickLine={false} axisLine={false}/>
              <Tooltip 
                formatter={(value) => [`${value.toFixed(2)} USDT`, 'Цена']} 
              />
              <Line type="monotone" dataKey="price" stroke="#8884d8" fill='#8884d8' dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>Нет данных для отображения</p>
        )}

        <ButtonGroup variant="text" aria-label="outlined button group" className='text-textMode flex flex-wrap'>
          {['1д', '1мес', '3мес', '1г', '5л', 'Все'].map((range) => (
            <Button
              key={range}
              onClick={() => handleRangeChange(range)}
              sx={{
                backgroundColor: selectedRange === range ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                color: selectedRange === range ? 'rgba(25, 118, 210)' : 'inherit',
              }}
            >
              {range}
            </Button>
          ))}
        </ButtonGroup>

        <div className="crypto-list w-full flex flex-col h-auto overflow-x-hidden" style={{ marginTop: '20px' }}>
          {loading ? (
            <p>Загрузка данных криптовалют...</p>
          ) : (
            cryptoData && cryptoData.length > 0 ? (
              cryptoData.map((crypto, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => borderNone(index, crypto.symbol)}
                    className={
                      crypto.symbol === symbol
                        ? "crypto-item flex justify-between py-[12px] rounded-[6px] px-[10px] cursor-pointer bg-bgMode border-b-[1px] border-pageMode"
                        : "cursor-pointer crypto-item last:border-b-[0px] flex justify-between py-[12px] px-[10px] bg-pageMode border-b border-pageMode"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] bg-black rounded-full flex justify-center items-center">
                        <img src={crypto.img} alt="cryptoImg" className="object-cover" />
                      </div>
                      <p className="text-[10px] text-textMode text-start h-full">{crypto.name}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className={crypto.color === 'green' ? 'text-textMode text-[14px]' : 'text-[#FF5E5B] text-[14px]'}>{crypto.price}</p>
                      <div className="flex justify-end gap-1 min-w-[90px]">
                        <p className={crypto.color === 'green' ? 'text-[#03CEA4] text-[10px]' : 'text-[#FF5E5B] text-[10px]'}>{crypto.color === 'green' ? "+" : ""}{crypto.priceChange}</p>
                        <p className={crypto.color === 'green' ? 'text-[#03CEA4] text-[10px]' : 'text-[#FF5E5B] text-[10px]'}>{crypto.color === 'green' ? "+" : ""}{crypto.change}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Нет данных для отображения криптовалют</p>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoList;
