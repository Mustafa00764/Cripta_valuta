import React from 'react'
import { Link } from 'react-router-dom'
import arrowLeft from "../assets/svg/arrow_left_blue.svg";
import Tasks from '../components/Task';
import Leaderboard from '../components/Leaderboard';
import Referral from '../components/Referral';
import AirdropValue from '../components/AirdropValue';

const AirdropInfo = () => {
  const users = [
    { id: 1, name: 'User1', points: 500 },
    { id: 2, name: 'User2', points: 450 },
    // Добавить других пользователей
  ];
  return (
    <div>
      <div className="container">
        <div className="flex mt-9 mb-7 ">
          <button className="flex cursor-pointer items-center gap-1">
            <Link to={'/'}>
              <p className="text-[#779CFF]">Главнаhhefuhufhurя</p>
            </Link>
            <img src={arrowLeft} alt={arrowLeft} className='rotate-180'/>
            <p className="text-[#779CFF]">Airdrop</p>
            <img src={arrowLeft} alt={arrowLeft} className='rotate-180'/>
            <p className="text-[#779CFF]">Bib</p>
          </button>
        </div>
        <div className='flex gap-6 flex-col'>
        <AirdropValue />
      <Tasks />
      <Leaderboard users={users} />
      <Referral />
        </div>
      </div>
    </div>
  )
}

export default AirdropInfo