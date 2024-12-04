import React, { useContext } from "react";
import close from "../assets/svg/close.svg";
import { MenuContext } from "../context/MenuContext";
import { NavLink } from "react-router-dom";
import LC_logo from '../assets/images/LC_logo.png'
import moon from '../assets/svg/moon.svg'
import sun from '../assets/svg/black-sun-with-rays.svg'
import { AdminContext } from '../context/AdminContext'
import { AuthContext } from "../context/AuthContext";

const UserMenu = ({ hidden }) => {
  const { menu, setMenu } = useContext(MenuContext);
  const { theme, setTheme, toggleTheme,categories } = useContext(AdminContext)
  const { user, setUser } = useContext(AuthContext)
  const mode = () => {
    toggleTheme()
  }

  const photoUrl = () => {
    if (!user) {
      return;
    }
    if (user.photo_url.startsWith("https://legitcommunity.uz")) {
      return <img src={user ? user.photo_url : ""} alt="" className='w-[60px] h-[60px] rounded-full' crossOrigin="anonymous" />
    } else {
      return <img src={user ? user.photo_url : ""} alt="" className='w-[60px] h-[60px] rounded-full' />
    }
  }
  return (
    <div
      className={
        menu
          ? `z-20 w-[49vw] h-screen  overflow-x-hidden mx:w-[75vw]  bg-[#2F2F2F] translate-x-0 shadow-lg fixed ${hidden ? "pt-0 transition-all duration-[50]" : "pt-[136px] transition-all duration-[50] lg:pt-[100px] md:pt-[80px] ms:pt-[64px]"}`
          : `z-20 h-screen overflow-x-hidden  ${hidden ? "pt-0 transition-all duration-[50]" : "pt-[136px] transition-all duration-[50] lg:pt-[100px] md:pt-[80px] ms:pt-[64px]"} fixed w-[184px] h-screen bg-[#2F2F2F] translate-x-[-100%] transition-all`
      }
    >
      <div className="w-full h-[110px] p-[24px] border-b-2 border-[#0C1013]">
        <div className=" flex justify-between">
          <div className="flex items-center gap-2 text-white">
            {photoUrl()}
            <p className="text-[22px] flex flex-col">
              {user ? user.firstName : ""}
              <span className="text-[10px]">@{user ? user.username : ""}</span>
            </p>
          </div>
          <div>
            <div onClick={toggleTheme} className={theme ? 'w-[50px] p-[3px] transition-all rounded-full bg-pageMode flex justify-start shadow-inner' : 'w-[50px] transition-all flex justify-end  p-[3px] rounded-full bg-pageMode shadow-inner'}>
              <div className={theme ? 'w-5 h-5 rounded-full transition-all bg-bgMode shadow-sm relative p-[2px] flex justify-center items-center' : 'w-5 h-5 transition-all rounded-full bg-bgMode  shadow-lg relative p-[2px] flex justify-center items-center'}>
                <img src={theme ? moon : sun} alt="moon" className=' transition-all select-none' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-[14px]">
        <div className=" px-6 h-[100%] text-[#fff] flex flex-col border-b-2 border-[#0C1013]">
          <NavLink to={`/profile/${user?user.id:""}`} onClick={() => setMenu(!menu)} className={(navData) => (navData.isActive ? ` font-extrabold` : " ")}>
            <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
              <svg width="28" height="28" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#F4F7FF" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457" stroke="#F4F7FF" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#F4F7FF" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>Мой профиль</p>
            </div>
          </NavLink>
          <NavLink to={"/p"} onClick={() => setMenu(!menu)} className={(navData) => (navData.isActive ? ` font-extrabold` : " ")}>
            <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
              <svg height="28" viewBox="0 0 20 20" width="28" xmlns="http://www.w3.org/2000/svg">
                <path d="m7 0a2 2 0 0 0 -2 2h9a2 2 0 0 1 2 2v12a2 2 0 0 0 2-2v-12a2 2 0 0 0 -2-2z" fill="#F4F7FF" />
                <path d="m13 20a2 2 0 0 0 2-2v-13a2 2 0 0 0 -2-2h-9a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2zm-4-15h4v5h-4zm-5 0h4v1h-4zm0 2h4v1h-4zm0 2h4v1h-4zm0 2h9v1h-9zm0 2h9v1h-9zm0 2h9v1h-9z" fill="#F4F7FF" />
              </svg>
              <p>Мои статьи</p>
            </div>
          </NavLink>
          <NavLink to={"/p"} onClick={() => setMenu(!menu)} className={(navData) => (navData.isActive ? ` font-extrabold` : " ")}>
            <div className={`w-full hover:font-extrabold h-[50px] flex  gap-[20px] items-center cursor-pointer transition-all`}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2259_54)">
                  <path d="M20.5931 9.47624L20.5975 9.56812H23.3056L23.3494 9.56374L23.4062 9.56812H23.8569L23.8525 9.47187C23.6994 5.46437 21.0525 1.88124 17.2637 0.555618L17.1719 0.713118C19.1975 2.47187 20.51 5.82749 20.5931 9.47624Z" fill="#000000" />
                  <path d="M16.7212 9.47624V9.56812H19.1844H20.0156V9.47624C19.915 4.99624 17.9769 1.19437 15.2994 0.231868L15.0631 0.148743L15.19 0.367493C16.1 1.94249 16.6906 5.43374 16.7212 9.47624Z" fill="#F4F7FF" />
                  <path d="M11.8519 9.56813H16.1438V9.47625C16.1 3.88937 14.98 0 14 0C13.02 0 11.9 3.88937 11.8563 9.47625L11.8519 9.56813ZM5.01815 9.56375L5.0794 9.56813H7.4069L7.41127 9.47625C7.4944 5.8275 8.8069 2.4675 10.8369 0.70875L10.745 0.55125C6.9519 1.88125 4.30502 5.46438 4.1519 9.47188L4.14752 9.56813H4.97002L5.01815 9.56375Z" fill="#000000" />
                  <path d="M7.98438 9.56813H9.2575H11.2744V9.47625C11.3094 5.43375 11.8956 1.9425 12.8056 0.363129L12.9325 0.144379L12.6963 0.227504C10.0231 1.19438 8.085 4.99625 7.98438 9.47188V9.56813ZM8.295 27.2781C8.295 27.6763 8.61875 28 9.01688 28H19.3637C19.7575 28 20.0725 27.6806 20.0725 27.2869V24.85H8.295V27.2781Z" fill="#F4F7FF" />
                  <path d="M20.0725 22.8331H8.29498V24.2725H20.0725V22.8331Z" fill="#000000" />
                  <path d="M18.48 19.1056H9.01248C8.61873 19.1056 8.29498 19.425 8.29498 19.8231V22.2556H20.0725V20.7025C20.0725 19.8231 19.3594 19.1056 18.48 19.1056ZM10.5437 17.7713V18.5281H17.8281V17.7713C17.8281 17.5306 17.6312 17.3294 17.3862 17.3294H10.9856C10.7406 17.3338 10.5437 17.5306 10.5437 17.7713Z" fill="#F4F7FF" />
                  <path d="M8.84625 10.1413L11.9569 16.7606H12.9981L9.8875 10.1413H8.84625Z" fill="#F4F7FF" />
                  <path d="M10.5744 16.8481C10.7013 16.7912 10.8369 16.7606 10.9857 16.7606H11.6594L5.91503 10.1413H4.66815L10.5132 16.8788L10.5744 16.8481ZM16.7213 16.7606H17.3907C17.5307 16.7606 17.675 16.7912 17.8063 16.8481L17.8675 16.8744L23.7082 10.1413H22.4613L16.7213 16.7606Z" fill="#F4F7FF" />
                  <path d="M18.4931 10.1413L15.3781 16.7606H16.4237L19.5344 10.1413H18.4931Z" fill="#F4F7FF" />
                </g>
                <defs>
                  <clipPath id="clip0_2259_54">
                    <rect width="28" height="28" fill="#000000" />
                  </clipPath>
                </defs>
              </svg>
              <p>Мои Аирдропы</p>
            </div>
          </NavLink>
          <NavLink to={"/admin/dashboard"} onClick={() => setMenu(!menu)} className={(navData) => (navData.isActive ? ` font-extrabold` : " ")}>
            <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path fill="#F4F7FF" d="M18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.68-1.5-1.51-1.5S10.5 3.17 10.5 4v.68C7.63 5.36 6 7.92 6 11v5l-1.3 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16zm-6.01 6c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zM6.77 4.73c.42-.38.43-1.03.03-1.43-.38-.38-1-.39-1.39-.02C3.7 4.84 2.52 6.96 2.14 9.34c-.09.61.38 1.16 1 1.16.48 0 .9-.35.98-.83.3-1.94 1.26-3.67 2.65-4.94zM18.6 3.28c-.4-.37-1.02-.36-1.4.02-.4.4-.38 1.04.03 1.42 1.38 1.27 2.35 3 2.65 4.94.07.48.49.83.98.83.61 0 1.09-.55.99-1.16-.38-2.37-1.55-4.48-3.25-6.05z" />
              </svg>
              <p>Уведомления</p>
            </div>
          </NavLink>
          <NavLink to={"/admin/dashboard"} onClick={() => setMenu(!menu)} className={(navData) => (navData.isActive ? ` font-extrabold` : " ")}>
            <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
              <svg width="28" height="28" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.99997 8.71998C9.46389 8.71998 9.83997 8.3439 9.83997 7.87998C9.83997 7.41606 9.46389 7.03998 8.99997 7.03998C8.53605 7.03998 8.15997 7.41606 8.15997 7.87998C8.15997 8.3439 8.53605 8.71998 8.99997 8.71998Z" fill="#F4F7FF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M9.00001 9.38C8.45001 9.38 7.36001 9.65 7.32001 10.19C7.70001 10.72 8.31001 11.06 9.00001 11.06C9.69001 11.06 10.31 10.71 10.68 10.19C10.64 9.64 9.55001 9.38 9.00001 9.38Z" fill="#F4F7FF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10 5.14V2.18L5 0L0 2.18V5.45C0 8.48 2.13 11.31 5 12C5.35 11.92 5.7 11.8 6.02 11.65C6.76 12.47 7.81 13 9 13C11.21 13 13 11.21 13 9C13 7.14 11.72 5.59 10 5.14ZM5 10.97C2.7 10.3 1 7.97 1 5.46V2.84L5 1.09L9 2.84V5C6.79 5 5 6.79 5 9C5 9.65 5.17 10.25 5.44 10.79C5.29 10.85 5.15 10.92 5 10.97ZM9 12C7.34 12 6 10.66 6 9C6 7.34 7.34 6 9 6C10.66 6 12 7.34 12 9C12 10.66 10.66 12 9 12Z" fill="#F4F7FF" />
              </svg>
              <p>Админ Панель</p>
            </div>
          </NavLink>
        </div>
        <div className=" px-6 text-[#fff] flex flex-col overflow-x-hidden">
          {
            categories.map((item)=>{
              if (!item) {
                return;
              }
              return(
                <NavLink key={item.id} to={`/${item.name}`} onClick={() => setMenu(!menu)} className={(navData) => (navData.isActive ? ` font-extrabold` : " ")}>
                  <div className={`w-full hover:font-extrabold transition-all h-[50px] flex gap-[20px] items-center cursor-pointer`}>
                    <img src={item.icon} className="w-[28px] h-[28px] rounded-full" alt=""  />
                    <p>Bitcoin</p>
                  </div>
                </NavLink>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
