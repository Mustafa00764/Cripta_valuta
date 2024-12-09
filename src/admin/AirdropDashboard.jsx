import React, { useContext, useEffect, useState } from 'react'
import PanelHeader from './PanelHeader'
import article from '../assets/svg/article.svg'
import { AdminContext } from '../context/AdminContext'
import top_10 from '../assets/svg/medal.svg'
import DCard from './DCard'
import Pagination from './Pagination'
import Sort from './Sort'
import axios from 'axios'
import api from '../components/axiosRefresh'
import DAModel from './DAModel'
import { AuthContext } from '../context/AuthContext'
import AirDCard from './AirDCard'

const AirdropDashboard = () => {
  const {theme, articlePagination, categories, setArticlePagination, articleSort, setArticleSort ,airdropSort,setAirdropSort, airdropPagination,setAirdropPagination} = useContext(AdminContext)
  const { userId, setUserId, parseJwt } = useContext(AuthContext)
  const [airdrops,setAirdrops] = useState([])

  const handleAirdropsList = async () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {

      const responses = await axios.post('https://legitcommunity.uz/auth/refresh-token', { refreshToken: refreshToken });
      const newAccessToken = responses.data.accessToken;

      const responseArticle = await api.get(`/airdrops?userId=${userId}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      })
      console.log(responseArticle);
      
      setAirdrops(responseArticle.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    handleAirdropsList()
  },[])
  return (
    <div className='w-full'>
      <PanelHeader title={'Airdrops'}/>
      <div className='px-[60px] mt-[6px]'>
        <div className='h-[78px] py-[14px] flex gap-[25px] items-center w-full'>

          <div className={`min-w-[186px] gap-5 cursor-pointer relative w-auto h-[50px] justify-between rounded-[15px] flex items-center bg-bgMode transition-all text-textMode px-5`}>
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="m12.5495 12.9201c-1.64.39-3.07-1.04-2.68-2.68.19-.77002.82-1.39999 1.59-1.58999 1.35-.33 2.57.59998 2.73 1.84999" />
                <path d="m7.64093 3.1499c-2.65 1.51-4.42999 4.36996-4.42999 7.64 0 2.54 1.08 4.8299 2.81 6.4299" />
                <path d="m18.01 17.19c1.71-1.6 2.78-3.87 2.78-6.4 0-4.86002-3.94-8.79-8.79-8.79" />
                <path d="m7.99977 14.55c-.92-.98-1.49-2.3-1.49-3.76 0-3.02996 2.46-5.48995 5.49003-5.48995 3.03 0 5.49 2.45999 5.49 5.48995 0 1.46-.57 2.77-1.49 3.76" />
                <path d="m10.3007 16.66-1.43999 1.7901c-1.14 1.43-.13 3.5399 1.69999 3.5399h2.87c1.83 0 2.85-2.1199 1.7-3.5399l-1.44-1.7901c-.86-1.09-2.52-1.09-3.39 0z" />
              </g>
            </svg>
            <p>AIRDROPS</p>
            <p>{airdrops.length}</p>
          </div>
          
        </div>
        <div className='w-full h-[50px] mt-[5px]'>
          <div className={`max-w-[520px] w-full h-full text-textMode items-center flex transition-all rounded-[12px] border border-[rgba(136,145,157,0.20)] overflow-hidden bg-bgMode`}>
            <div className={`${theme?'sideBarElementDark':'sideBarElementLight'} transition-all p-[15px]`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_179_730)">
              <path d="M14.6775 12.93C15.8879 11.2784 16.43 9.23062 16.1954 7.19644C15.9608 5.16226 14.9668 3.29168 13.4122 1.95892C11.8576 0.626155 9.85719 -0.070492 7.81105 0.00834944C5.7649 0.0871909 3.82398 0.935706 2.37659 2.38414C0.92919 3.83257 0.0820639 5.7741 0.00468665 7.8203C-0.0726906 9.86649 0.625387 11.8665 1.95926 13.4201C3.29313 14.9737 5.16443 15.9663 7.19877 16.1995C9.23312 16.4326 11.2805 15.8891 12.9313 14.6775H12.93C12.9667 14.7275 13.0075 14.7754 13.0525 14.8213L17.865 19.6338C18.0994 19.8683 18.4173 20.0001 18.7489 20.0003C19.0805 20.0004 19.3986 19.8688 19.6331 19.6344C19.8677 19.4 19.9995 19.082 19.9996 18.7504C19.9997 18.4189 19.8681 18.1008 19.6338 17.8663L14.8213 13.0538C14.7766 13.0085 14.7285 12.968 14.6775 12.93ZM15 8.125C15 9.02784 14.8222 9.92184 14.4767 10.756C14.1312 11.5901 13.6248 12.348 12.9864 12.9864C12.348 13.6248 11.5901 14.1312 10.7559 14.4767C9.92184 14.8222 9.02784 15 8.125 15C7.22216 15 6.32817 14.8222 5.49405 14.4767C4.65994 14.1312 3.90204 13.6248 3.26364 12.9864C2.62524 12.348 2.11883 11.5901 1.77333 10.756C1.42783 9.92184 1.25 9.02784 1.25 8.125C1.25 6.30164 1.97433 4.55296 3.26364 3.26364C4.55295 1.97433 6.30164 1.25 8.125 1.25C9.94836 1.25 11.697 1.97433 12.9864 3.26364C14.2757 4.55296 15 6.30164 15 8.125Z" fill="#72787F"/>
              </g>
              <defs>
              <clipPath id="clip0_179_730">
              <rect width="20" height="20" fill="white"/>
              </clipPath>
              </defs>
              </svg>
            </div>
            <input type="text" placeholder='Search' className='h-full font-light w-full outline-none bg-inherit pr-[15px]'/>
          </div>
        </div>
        <div className='max-w-[1600px] mt-5 text-sideBarTextLight w-full min-h-[550px] bg-bgMode rounded-[12px] relative h-auto  '>
          <div className=' h-[50px] flex items-center text-center bg-[#151B1F] rounded-t-[12px]'>
            <div className='w-[100px]'>
              <p>#</p>
            </div>
            <div className='w-[200px]'>
              <p>image</p>
            </div>
            <div className='w-[200px]'>
              <p>author</p>
            </div>
            <div className='w-[150px]'>
              <p>startDate</p>
            </div>
            <div className='w-[300px]'>
              <p>endDate</p>
            </div>
            <div className='w-[200px]'>
              <p>prizePool</p>
            </div>
            <div className='w-[150px]'>
              <p>views</p>
            </div>
            <div className='w-[100px]'>
              <p>rating</p>
            </div>
            <div className='w-[200px]'>
              <p>options</p>
            </div>
          </div>
          <div className=' relative overflow-hidden'>
            {
              Array.isArray(airdrops) ? airdrops.map((item,index)=>{
                if (index+1<=airdropSort*airdropPagination && index+1> (airdropPagination-1)*airdropSort) {
                  return (
                    <AirDCard key={item.id} item={item} index={index+1}/>
                  )
                }
              }):console.error('airdrops is not an array')
            }
          </div>
        </div>
        <div>
          <Pagination length={airdrops.length} totalPages={Math.ceil(airdrops.length / airdropSort)}/>
        </div>
        <div className='flex w-full h-[78px] items-center'>
          <Sort/>
        </div>
      </div>
      {/* <DAModel handleArticlesList={handleArticlesList}/> */}
    </div>
  )
}

export default AirdropDashboard


// {
//   "name": "Campaign Name",
//   "description": "Campaign Description",
//   "startDate": "2023-01-01T00:00:00Z",
//   "endDate": "2023-12-31T23:59:59Z",
//   "prizePool": 1000000,
//   "tasks": [
//     {
//       "name": "Task 1",
//       "description": "Complete this task",
//       "type": "Social",
//       "openingDate": "2023-01-01T00:00:00Z"
//     }
//   ]
// }