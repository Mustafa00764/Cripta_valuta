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

const DashboardPage = () => {
  const {theme, articlePagination, categories, setArticlePagination, articleSort, setArticleSort} = useContext(AdminContext)
  const { userId, setUserId, parseJwt } = useContext(AuthContext)
  const [articles,setArticles] = useState([])

  const handleArticlesList = async () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {

      const responses = await axios.post('https://legitcommunity.uz/auth/refresh-token', { refreshToken: refreshToken });
      const newAccessToken = responses.data.accessToken;

      const responseArticle = await api.get(`/articles?userId=${userId}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      })
      console.log(responseArticle);
      
      setArticles(responseArticle.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    handleArticlesList()
  },[])
  return (
    <div className='w-full'>
      <PanelHeader title={'Main'}/>
      <div className='px-[60px] mt-[6px]'>
        <div className='h-[78px] py-[14px] flex gap-[25px] items-center w-full'>

          <div className={`min-w-[186px] gap-5 cursor-pointer relative w-auto h-[50px] justify-between rounded-[15px] flex items-center bg-bgMode transition-all text-textMode px-5`}>
            <img src={article} alt="article"/>
            <p>ARTICLES</p>
            <p>{articles.length}</p>
          </div>

          <div className={`gap-5 cursor-pointer relative w-auto h-[50px] justify-between rounded-[15px] flex items-center bg-bgMode transition-all text-textMode px-5`}>
            <img src={top_10} alt="top_10" />
            <p>Top - 10</p>
          </div>
          
        </div>
        <div className={`w-full h-[41px] flex items-center  ${theme?'text-sideBarTextDark':'text-white'}`}>
          <p>{"ARTICLES"}/<span className='text-[#88919D]'>{'Category'}</span></p>
        </div>
        <div className='w-full h-[50px] flex gap-[10px] items-center'>
            <div className={`py-[15px] rounded-[20px] hover:bg-[#88919D] hover:text-sideBarTextDark px-5 text-textMode transition-all text-[15px] leading-[10px] bg-bgMode`}>
              <p>All</p>
            </div>
            {
              categories.map((item)=>{
                return(
                  <div key={item.id} className={`py-[15px] rounded-[20px] hover:bg-[#88919D] hover:text-sideBarTextDark px-5 text-textMode transition-all text-[15px] leading-[10px] bg-bgMode`}>
                    <p>{item.name}</p>
                  </div>
                )
              })
            }
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
              <p>pubdate</p>
            </div>
            <div className='w-[300px]'>
              <p>title</p>
            </div>
            <div className='w-[200px]'>
              <p>category</p>
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
              Array.isArray(articles) ? articles.map((item,index)=>{
                if (index+1<=articleSort*articlePagination && index+1> (articlePagination-1)*articleSort) {
                  return (
                    <DCard key={item.id} item={item} index={index+1}/>
                  )
                }
              }):console.error('o is not an array')
            }
          </div>
        </div>
        <div>
          <Pagination length={articles.length} totalPages={Math.ceil(articles.length / articleSort)}/>
        </div>
        <div className='flex w-full h-[78px] items-center'>
          <Sort/>
        </div>
      </div>
      <DAModel handleArticlesList={handleArticlesList}/>
    </div>
  )
}

export default DashboardPage
