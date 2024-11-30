import React, { useContext, useEffect, useState } from "react";
import SliderCard from "../components/SliderCard";
import NewsCard from "../components/NewsCard";
import ArticleCard from "../components/ArticleCard";
import refresh from "../assets/svg/refresh.svg";
import { MenuContext } from "../context/MenuContext";
import axios from "axios";
import api from "../components/axiosRefresh";
const HomePage = () => {
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
    handleArticlesList()
    window.scrollTo(0,0)
  },[])
  return (
    <div className="mt-[88px] xl:mt-[60px] xm:mt-[0px] lg:mt-0">
      <div className="container">
        <div className="flex w-[100%] xm:gap-0 gap-8 xm:flex-col">
          {/* slider */}
          <div>
            <SliderCard />
          </div>
          {/* top-5 */}
          <div className="w-full">
            <NewsCard />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8 xm:grid-cols-2 lm:grid-cols-1 xm:gap-6">
          {
            Array.isArray(articles) ? articles.map((item)=>{
              if (item) {
                return(
                  <ArticleCard key={item.id} item={item} author={item.author} id={item.id} subtitle={item.subtitle} title={item.title} poster={item.poster} categories={item.categories[0]} createdAt={item.createdAt} photo_url={item.author.photo_url} name={item.author.name}/>
                )
              }
            }):console.error('o is not an array')
          }
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
    </div>
  );
};

export default HomePage;
