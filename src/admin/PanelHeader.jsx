import React, { useState, useEffect } from 'react';
const PanelHeader = ({title}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Обновление каждую секунду

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);
  const options = { hour: '2-digit', minute: '2-digit' };
  return (
    <div className='h-[50px] w-full pl-[20px] relative pr-[25px] flex justify-between items-center text-[14px] text-[#88919D] leading-[17px]'>
      <div>
        <p>Dashboard - {title}</p>
      </div>
      <div className='w-[240px]'>
        <span className='text-[#494E5B]'>server time: </span>
        <span>{currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}</span>
      </div>
    </div>
  )
}

export default PanelHeader