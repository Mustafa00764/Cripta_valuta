import React, { useContext, useEffect, useState } from 'react'
import LC_logo from '../assets/images/LC_logo.jpeg'
import CryptoCard from './CryptoCard'
import { CryptoContext } from '../context/CryptoContext'
import axios from 'axios'
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import TelegramLoginButton from './TelegramLogin'
import menus from '../assets/svg/menu.svg'
import search_white from '../assets/svg/fe_search_white.svg'
import { MenuContext } from '../context/MenuContext'
import close from '../assets/svg/close.svg'
import { SearchContext } from '../context/SearchContext'
import { AdminContext } from '../context/AdminContext'
import moon from '../assets/svg/moon.svg'
import sun from '../assets/svg/black-sun-with-rays.svg'
import api from '../components/axiosRefresh'
import { AuthContext } from '../context/AuthContext'
const Header = () => {
  const { data } = useContext(CryptoContext)
  const TELEGRAM_BOT_USERNAME = 'crypto_test_111_bot';
  const [message, setMessage] = useState('Processing...');
  const [users, setUsers] = useState([]);
  const [dmenu, setDmenu] = useState(false);
  const {menu,setMenu} = useContext(MenuContext)
  const {mobileSearch, setMobileSearch} = useContext(SearchContext)
  const {theme, setTheme, toggleTheme} = useContext(AdminContext)
  const { isAuthenticated, user, setIsAuthenticated, setUser, handleLogin } = useContext(AuthContext);
  const crypto = [
    {
      id: 1,
      symbol: 'BTCUSDT',
      lastName: 'BTC',
      name: 'Bitcoin'
    },
    {
      id: 2,
      symbol: 'TONUSDT',
      lastName: 'TON',
      name: 'Toncoin'
    },
    {
      id: 3,
      symbol: 'ETHUSDT',
      lastName: 'ETH',
      name: 'Ethereum'
    },
    {
      id: 4,
      symbol: 'SOLUSDT',
      lastName: 'SOL',
      name: 'Solana'
    },
    {
      id: 5,
      symbol: 'XRPUSDT',
      lastName: 'XRP',
      name: 'Ripple'
    },
  ]

  // const handleBot = (user) => {
  //   console.log(user);

  //   const { id, first_name, last_name, username } = user;

  //   axios.post('http://154.53.45.100:8080/auth/telegram/callback', {
  //     id,
  //     first_name,
  //     last_name,
  //     username,
  //   })
  //   .then(res => {
  //     console.log('Успешно отправлено:', res.data);
  //   })
  //   .catch(error => {
  //     console.error('Ошибка:', error);
  //   });
  // };

  const handleBot = async (user) => {
    try {
      // Отправка данных пользователя на сервер
      const response = await api.get('/auth/telegram/callback', {
        params: {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          photo_url: user.photo_url,
        },
      });
  
      // Поймать токены из ответа сервера
      if (response.data && response.data.tokens) {
        const { accessToken, refreshToken } = response.data.tokens;
        console.log('Токены получены:', response, response.data.user);
  
        // Сохранить токены в localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
  
        // Установить состояние пользователя и аутентификацию
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        console.log('Токены не найдены в ответе', response);
      }
    } catch (error) {
      console.error('Ошибка при аутентификации:', error.message);
    }
  };
  
  // При монтировании компонента проверяем наличие данных в localStorage
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if (accessToken && refreshToken) {
      setIsAuthenticated(true);
      // Дальше можно сделать запрос, чтобы получить данные пользователя, используя accessToken
      // Например:
      api.get('/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(response => {
        setUser(response.data);
      }).catch(err => {
        console.error('Ошибка при получении данных пользователя', err);
      });
    }
  }, []);
  
  return (
    <div className='w-[100vw] h-[136px] bg-[#2F2F2F] relative lg:h-[100px] md:h-[80px] ms:h-[64px]'>
      <div className='container'>
        <div className={`absolute bg-[#2F2F2F] w-[300px] top-[136px] transition-all duration-[50] lg:top-[100px] shadow-lg md:top-[80px] ms:top-[64px] rounded-b-[15px] right-5 z-20 ${dmenu?" h-auto opacity-[1]":"opacity-0 h-0 overflow-hidden"}`} onMouseOver={()=>setDmenu(true)} onMouseOut={()=>setDmenu(false)}>
        <div className="w-full h-[110px] p-[24px] border-b-2 border-[#0C1013]">
        <div className=" flex justify-between">
          <div className="flex items-center gap-2 text-white">
            <img className="w-[60px] h-[60px] rounded-full " src={user?user.photo_url:""} alt="photo" />
            <p className="text-[22px] flex flex-col">
              {user?user.first_name:""}
              <span className="text-[10px]">@{user?user.username:""}</span>
            </p>
          </div>
          <div>
            <div onClick={toggleTheme} className={theme?'w-[50px] p-[3px] transition-all rounded-full bg-pageMode flex justify-start shadow-inner':'w-[50px] transition-all flex justify-end  p-[3px] rounded-full bg-pageMode shadow-inner'}>
              <div className={theme?'w-5 h-5 rounded-full transition-all bg-bgMode shadow-sm relative p-[2px] flex justify-center items-center':'w-5 h-5 transition-all rounded-full bg-bgMode  shadow-lg relative p-[2px] flex justify-center items-center'}>
                <img src={theme?moon:sun} alt="moon" className=' transition-all select-none'/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-[14px]">
        <div className=" px-6 h-[100%] text-[#fff] flex flex-col pb-1">
          <NavLink to={"/profile"} onClick={()=>setMenu(false)} className={(navData)=>(navData.isActive?` font-extrabold`:" ")}>
          <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
              <svg width="28" height="28" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#F4F7FF" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457" stroke="#F4F7FF" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#F4F7FF" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>Мой профиль</p>
            </div>
          </NavLink>
          <NavLink to={"/p"} onClick={()=>setMenu(false)} className={(navData)=>(navData.isActive?` font-extrabold`:" ")}>
            <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
              <svg height="28" viewBox="0 0 20 20" width="28" xmlns="http://www.w3.org/2000/svg">
                <path d="m7 0a2 2 0 0 0 -2 2h9a2 2 0 0 1 2 2v12a2 2 0 0 0 2-2v-12a2 2 0 0 0 -2-2z" fill="#F4F7FF"/>
                <path d="m13 20a2 2 0 0 0 2-2v-13a2 2 0 0 0 -2-2h-9a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2zm-4-15h4v5h-4zm-5 0h4v1h-4zm0 2h4v1h-4zm0 2h4v1h-4zm0 2h9v1h-9zm0 2h9v1h-9zm0 2h9v1h-9z" fill="#F4F7FF"/>
              </svg>
              <p>Мои статьи</p>
            </div>
          </NavLink>
          <NavLink to={"/p"} onClick={()=>setMenu(false)} className={(navData)=>(navData.isActive?` font-extrabold`:" ")}>
            <div className={`w-full hover:font-extrabold h-[50px] flex  gap-[20px] items-center cursor-pointer transition-all`}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2259_54)">
              <path d="M20.5931 9.47624L20.5975 9.56812H23.3056L23.3494 9.56374L23.4062 9.56812H23.8569L23.8525 9.47187C23.6994 5.46437 21.0525 1.88124 17.2637 0.555618L17.1719 0.713118C19.1975 2.47187 20.51 5.82749 20.5931 9.47624Z" fill="#000000"/>
              <path d="M16.7212 9.47624V9.56812H19.1844H20.0156V9.47624C19.915 4.99624 17.9769 1.19437 15.2994 0.231868L15.0631 0.148743L15.19 0.367493C16.1 1.94249 16.6906 5.43374 16.7212 9.47624Z" fill="#F4F7FF"/>
              <path d="M11.8519 9.56813H16.1438V9.47625C16.1 3.88937 14.98 0 14 0C13.02 0 11.9 3.88937 11.8563 9.47625L11.8519 9.56813ZM5.01815 9.56375L5.0794 9.56813H7.4069L7.41127 9.47625C7.4944 5.8275 8.8069 2.4675 10.8369 0.70875L10.745 0.55125C6.9519 1.88125 4.30502 5.46438 4.1519 9.47188L4.14752 9.56813H4.97002L5.01815 9.56375Z" fill="#000000"/>
              <path d="M7.98438 9.56813H9.2575H11.2744V9.47625C11.3094 5.43375 11.8956 1.9425 12.8056 0.363129L12.9325 0.144379L12.6963 0.227504C10.0231 1.19438 8.085 4.99625 7.98438 9.47188V9.56813ZM8.295 27.2781C8.295 27.6763 8.61875 28 9.01688 28H19.3637C19.7575 28 20.0725 27.6806 20.0725 27.2869V24.85H8.295V27.2781Z" fill="#F4F7FF"/>
              <path d="M20.0725 22.8331H8.29498V24.2725H20.0725V22.8331Z" fill="#000000"/>
              <path d="M18.48 19.1056H9.01248C8.61873 19.1056 8.29498 19.425 8.29498 19.8231V22.2556H20.0725V20.7025C20.0725 19.8231 19.3594 19.1056 18.48 19.1056ZM10.5437 17.7713V18.5281H17.8281V17.7713C17.8281 17.5306 17.6312 17.3294 17.3862 17.3294H10.9856C10.7406 17.3338 10.5437 17.5306 10.5437 17.7713Z" fill="#F4F7FF"/>
              <path d="M8.84625 10.1413L11.9569 16.7606H12.9981L9.8875 10.1413H8.84625Z" fill="#F4F7FF"/>
              <path d="M10.5744 16.8481C10.7013 16.7912 10.8369 16.7606 10.9857 16.7606H11.6594L5.91503 10.1413H4.66815L10.5132 16.8788L10.5744 16.8481ZM16.7213 16.7606H17.3907C17.5307 16.7606 17.675 16.7912 17.8063 16.8481L17.8675 16.8744L23.7082 10.1413H22.4613L16.7213 16.7606Z" fill="#F4F7FF"/>
              <path d="M18.4931 10.1413L15.3781 16.7606H16.4237L19.5344 10.1413H18.4931Z" fill="#F4F7FF"/>
              </g>
              <defs>
              <clipPath id="clip0_2259_54">
              <rect width="28" height="28" fill="#000000"/>
              </clipPath>
              </defs>
              </svg>
              <p>Мои Аирдропы</p>
            </div>
          </NavLink>
          <NavLink to={"/admin/dashboard"} onClick={()=>setMenu(false)} className={(navData)=>(navData.isActive?` font-extrabold`:" ")}>
            <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path fill="#F4F7FF" d="M18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.68-1.5-1.51-1.5S10.5 3.17 10.5 4v.68C7.63 5.36 6 7.92 6 11v5l-1.3 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16zm-6.01 6c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zM6.77 4.73c.42-.38.43-1.03.03-1.43-.38-.38-1-.39-1.39-.02C3.7 4.84 2.52 6.96 2.14 9.34c-.09.61.38 1.16 1 1.16.48 0 .9-.35.98-.83.3-1.94 1.26-3.67 2.65-4.94zM18.6 3.28c-.4-.37-1.02-.36-1.4.02-.4.4-.38 1.04.03 1.42 1.38 1.27 2.35 3 2.65 4.94.07.48.49.83.98.83.61 0 1.09-.55.99-1.16-.38-2.37-1.55-4.48-3.25-6.05z"/>
              </svg>
              <p>Уведомления</p>
            </div>
          </NavLink>
          <NavLink to={"/admin/dashboard"} onClick={()=>setMenu(false)} className={(navData)=>(navData.isActive?` font-extrabold`:" ")}>
            <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
              <svg width="28" height="28" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.99997 8.71998C9.46389 8.71998 9.83997 8.3439 9.83997 7.87998C9.83997 7.41606 9.46389 7.03998 8.99997 7.03998C8.53605 7.03998 8.15997 7.41606 8.15997 7.87998C8.15997 8.3439 8.53605 8.71998 8.99997 8.71998Z" fill="#F4F7FF"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M9.00001 9.38C8.45001 9.38 7.36001 9.65 7.32001 10.19C7.70001 10.72 8.31001 11.06 9.00001 11.06C9.69001 11.06 10.31 10.71 10.68 10.19C10.64 9.64 9.55001 9.38 9.00001 9.38Z" fill="#F4F7FF"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M10 5.14V2.18L5 0L0 2.18V5.45C0 8.48 2.13 11.31 5 12C5.35 11.92 5.7 11.8 6.02 11.65C6.76 12.47 7.81 13 9 13C11.21 13 13 11.21 13 9C13 7.14 11.72 5.59 10 5.14ZM5 10.97C2.7 10.3 1 7.97 1 5.46V2.84L5 1.09L9 2.84V5C6.79 5 5 6.79 5 9C5 9.65 5.17 10.25 5.44 10.79C5.29 10.85 5.15 10.92 5 10.97ZM9 12C7.34 12 6 10.66 6 9C6 7.34 7.34 6 9 6C10.66 6 12 7.34 12 9C12 10.66 10.66 12 9 12Z" fill="#F4F7FF"/>
              </svg>
              <p>Админ Панель</p>
            </div>
          </NavLink>
        </div>
      </div>
        </div>
        <div className='w-full h-full flex justify-between lg:justify-start'>
          <div className=' items-center hidden lg:flex mr-3 cursor-pointer w-8 justify-center' onClick={()=>setMenu(!menu)}>
            <img src={menu?close:menus} alt="menu" className=' transition-all'/>
          </div>
          <div className='flex items-center gap-3'>
          <Link to={'/'} className='flex items-center gap-3'>
            <div className='w-[40px] h-[40px] rounded-full overflow-hidden md:w-[32px] md:h-[32px]' onClick={()=>setMenu(false)}>
              <img src={LC_logo} alt="logo" className='w-full h-full'/>
            </div>
            <p className='text-[#fff] text-[24px] leading-[29px] sm:hidden'>Legit Community</p>
          </Link>
          </div>
          <div className='flex items-center gap-6 ml-auto'>
            <div className='flex items-center gap-6 lg:hidden'>
            {
              crypto.map((item) => {
                return (
                  <CryptoCard key={item.id} symbol={item.symbol} lastname={item.lastName} name={item.name} />
                )
              })
            }
            </div>
            {!isAuthenticated?(
              <div>
                <TelegramLoginButton
                  botName={TELEGRAM_BOT_USERNAME}
                  buttonSize="medium"
                  cornerRadius={15}
                  usePic={false}
                  dataOnauth={handleBot}
                />
              </div>
            ):(
            <div className=' flex lg:hidden flex-col items-center gap-1 h-full justify-center' onMouseOver={()=>setDmenu(true)} onMouseOut={()=>setDmenu(false)}> 
              <div className='w-[50px] h-[50px]'>
                <img src={""} alt="photo" className='w-full h-full rounded-full'/>
              </div>
              <p>{""}{""}</p>
            </div>
            )}
            <div className='hidden lg:block cursor-pointer w-[30px] ' onClick={()=>setMobileSearch(!mobileSearch)}>
              <img src={mobileSearch?close:search_white} alt='search' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header