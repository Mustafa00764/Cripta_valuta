import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { Link } from 'react-router-dom'
import arrowLeft from "../assets/svg/arrow_left_blue.svg";
import CryptoChart from '../components/CryptoChart';
import AdvertisimentCard from '../components/AdvertisimentCard';
import PagesCard from '../components/PagesCard';
import refresh from "../assets/svg/refresh.svg";
import axios from 'axios';
import api from '../components/axiosRefresh';
import { useLocation } from "react-router-dom";
const CategoriesPages = () => {
  const {categories,categoryName,setCategoryName,handleRestore} = useContext(AdminContext)
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean).pop(); 
  const [articles,setArticles] = useState([])

  const handleArticlesList = async () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {

      const responses = await axios.post('https://legitcommunity.uz/auth/refresh-token', { refreshToken: refreshToken });
      const newAccessToken = responses.data.accessToken;

      const responseArticle = await api.get("/articles",{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      })
      console.log(responseArticle.data);
      
      setArticles(responseArticle.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    handleRestore()
    handleArticlesList()
    console.log(path);
    
  },[])

  return (
    <div>
      {
        categories.map((item) => {
          if (item.name.toLowerCase() === path) {
            return(
              <div key={item.id} className="container">
              <div className="flex mt-9 mb-7 ">
                <button className="flex cursor-pointer items-center gap-1">
                  <Link to={'/'}>
                    <p className="text-[#779CFF]">Главная</p>
                  </Link>
                  <img src={arrowLeft} alt={arrowLeft} className='rotate-180'/>
                  <p className="text-[#779CFF]">{item.name}</p>
                </button>
              </div>
              <div className='mt-[88px] text-textMode md:mt-[60px] sm:mt-[40px]'>
                <h2 className='text-[36px] font-semibold leading-[48px] md:text-[24px] md:leading-[32px]'>{item.name}</h2>
                <p className='font-normal leading-6 max-w-[833px] w-full pr-5 mt-6 text-[16px] md:text-[14px] md:leading-5 mx:text-[12px] mx:leading-4'>{item.description}</p>
              </div>
              <div className='flex gap-8 mt-[56px] lg:flex-col xm:gap-4 md:mt-[45px] sm:mt-[40px]'>
                <div className='w-[74.41%] h-auto flex flex-col gap-4 lg:w-full md:grid md:grid-cols-2 sm:grid-cols-1'>
                  {
                    Array.isArray(articles) ? articles.map((item)=>{
                      return(
                        <PagesCard key={item.id} item={item} author={item.author} id={item.id} subtitle={item.subtitle} title={item.title} poster={item.poster} categories={item.categories[0]} createdAt={item.createdAt} photo_url={item.author.photo_url} name={item.author.name}/>
                      )
                    }):""
                  }
                </div>
                <div className='w-[calc(25.59%-32px)] xm:w-[calc(25.59%-16px)] lg:w-full flex flex-col gap-8'>
                  <CryptoChart/>
                  <div className='lg:hidden'>
                    <AdvertisimentCard/>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full flex justify-center mt-[56px] mb-[88px] md:mb-[60px] sm:mb-[40px] md:mt-[45px] sm:mt-[40px]">
                  <div className="flex gap-2 items-center cursor-pointer">
                    <img src={refresh} alt={refresh} />
                    <p className="font-semibold leading-6 text-[#779CFF]">
                      Загрузить ещё
                    </p>
                  </div>
                </div>
              </div>
            </div>
            )
          }
        })
      }
    </div>
  )
}

export default CategoriesPages