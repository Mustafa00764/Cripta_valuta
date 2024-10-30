import React, { useState } from 'react';
import PanelHeader from './PanelHeader';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Данные для графика
const data = [
  { time: '07:00', onlines: 0, files: 0, downloads: 0, visits: 0 },
  { time: '08:00', onlines: 1000, files: 800, downloads: 500, visits: 1500 },
  { time: '09:00', onlines: 2000, files: 1600, downloads: 1000, visits: 2500 },
  { time: '10:00', onlines: 3000, files: 2000, downloads: 1500, visits: 3000 },
  { time: '11:00', onlines: 4000, files: 2500, downloads: 2000, visits: 3500 },
  { time: '12:00', onlines: 3000, files: 2000, downloads: 1500, visits: 3000 },
  { time: '13:00', onlines: 2500, files: 1800, downloads: 1200, visits: 2500 },
  { time: '14:00', onlines: 2000, files: 1600, downloads: 1000, visits: 2000 },
  { time: '15:00', onlines: 1500, files: 1200, downloads: 800, visits: 1500 },
  { time: '16:00', onlines: 1000, files: 800, downloads: 500, visits: 1000 },
];

// Функция для фильтрации данных по времени
const filterData = (type) => {
  // В зависимости от выбранной фильтрации можно возвращать разные данные
  switch (type) {
    case 'Today':
      return data.slice(0, 5); // Пример фильтрации "Сегодня"
    case 'Month':
      return data.slice(0, 8); // Пример фильтрации "Месяц"
    default:
      return data; // Полные данные для "All"
  }
};
const StatisticPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filteredData = filterData(selectedFilter);
  return (
    <div className='w-full'> 
      <PanelHeader title={'Statistic'}/>
      <div className='px-[60px] mt-[6px]'>
        <div className='flex gap-[10px] text-[#fff]'>
          <div className='w-[200px] h-[100px] rounded-[12px] flex flex-col justify-center items-center bg-gradient-to-t to-[#59B53B] from-[rgba(89,181,59,.5)]'>
            <p className='text-[30px] leading-[36px] drop-shadow font-extrabold'>321</p>
            <p>onlines</p>
          </div>
          <div className='w-[200px] h-[100px] rounded-[12px] flex flex-col justify-center items-center bg-gradient-to-t to-[#FF8F00] from-[#ff8f0080]'>
            <p className='text-[30px] leading-[36px] drop-shadow font-extrabold'>712</p>
            <p>articles</p>
          </div>
          <div className='w-[200px] h-[100px] rounded-[12px] flex flex-col justify-center items-center bg-gradient-to-t to-[#009FFF] from-[#009FFF80]'>
            <p className='text-[30px] leading-[36px] drop-shadow font-extrabold'>10,000</p>
            <p>users</p>
          </div>
        </div>
        <div className="max-w-[1200px] mt-5 text-sideBarTextLight w-full max-h-[550px] relative h-auto ">
          <h1 className="text-[14px] mb-5 text-white">Statistics / <span className='text-[#88919D]'>07:00 - 16:00</span></h1>
          {/* Кнопки для фильтров */}
          <div className="flex w-full space-x-4 mb-4">
            {['All', 'Today', 'Month'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-white font-medium 
                ${selectedFilter === filter ? 'bg-blue-600' : 'bg-gray-600'} 
              hover:bg-blue-500 transition`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="bg-bgMode p-5 rounded-[12px] border border-[rgba(136,145,157,.2)] shadow-lg w-full ">
            <ResponsiveContainer width="100%" height={500}>
              <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                {/* Оставляем только основную линию оси Y */}
                <CartesianGrid vertical={false} stroke="rgba(136,145,157,.1)" horizontal={true} strokeDasharray="0 0" />
                <XAxis dataKey="time" tickLine={false} stroke="rgba(136,145,157,1)" tickMargin={20} axisLine={false}  />
                <YAxis stroke="rgba(136,145,157,1)" tickLine={false} tickMargin={20} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                <Area type="monotone" dataKey="onlines" stackId="1" stroke="#34d399" fill="#34d399" fillOpacity={.4}/>
                <Area type="monotone" dataKey="files" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={.6}/>
                <Area type="monotone" dataKey="downloads" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={.8}/>
                <Area type="monotone" dataKey="visits" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={.9}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticPage