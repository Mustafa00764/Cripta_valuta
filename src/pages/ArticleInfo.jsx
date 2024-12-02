import React, { useContext, useEffect, useState } from "react";
import arrowLeft from "../assets/svg/arrow_left_blue.svg";
import articleImg from "../assets/images/articleimg.png";
import person from "../assets/svg/Vector.svg";
import Telegram from "../assets/svg/tgshare.svg";
import Odnoklassniki from "../assets/svg/odnoklassniki.svg";
import Whatsapp from "../assets/svg/whatsapp.svg";
import Vkshare from "../assets/svg/vkshare.svg";
import CryptoChart from "../components/CryptoChart";
import img1 from "../assets/svg/img1.svg";
import img2 from "../assets/svg/img2.svg";
import quote from "../assets/svg/et_quote.svg";
import hashtag from "../assets/svg/hashtag.svg";
import refresh from "../assets/svg/refresh.svg";
import ArticleCard from "../components/ArticleCard";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from '../components/StarRating';
import { MenuContext } from "../context/MenuContext";
import AdvertisimentCard from "../components/AdvertisimentCard";
import api from "../components/axiosRefresh";
import axios from "axios";
const ArticleInfo = () => {
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const {id} = useParams()
  const [article,setArticle] = useState({})
  const [articles,setArticles] = useState([])
  const goBack = () => {
    navigate(-1);
  };


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

  const handleArticles = async () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = Number(localStorage.getItem("userId"))
    
    try {

      const responses = await axios.post('https://legitcommunity.uz/auth/refresh-token', { refreshToken: refreshToken });
      const newAccessToken = responses.data.accessToken;

      const responseArticle = await api.get(`/articles/${id}?userId=${userId}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      })
      console.log(responseArticle.data);
      
      setArticle(responseArticle.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    console.log('Оценка пользователя:', rating);
  };

  useEffect(()=>{
    window.scrollTo(0,0)
    console.log("rrr" + id);
    handleArticles()
    handleArticlesList()
  },[id])

  return (
    <div className="articleInfo">
      <div className="infoContainer">
        <div className="flex mt-9 mb-7  md:hidden">
          <button
            onClick={() => goBack()}
            className="flex cursor-pointer items-center gap-1"
          >
            <img src={arrowLeft} alt={arrowLeft} />
            <p className="text-[#779CFF]">Назад</p>
          </button>
        </div>
        <div className="w-full bg-bgMode rounded-[15px] text-textMode md:rounded-none h-auto relative overflow-hidden ">
          <div className=" relative ">
            <div 
              className="h-[408px] ms:h-[344px] w-full absolute top-0 left-0 bg-no-repeat bg-cover bg-center"
            >
              <img src={article.poster} alt="" crossOrigin="anonymous" className="w-full h-full object-cover"/>
              <div className=" backdrop-blur-2xl z-10 w-full h-[101%] bg-blurMode"></div>
            </div>
            <div className="px-[64px] xl:px-[48px] md:px-6 md:pt-4 xl:pt-[66px] flex xm:flex-col-reverse gap-8 pt-[88px] relative">
              <div>
                <div
                  className="w-[629px] xm:w-full sm:h-[312px] relative ms:h-[232px] h-[416px] ms:p-4 bg-cover bg-center flex items-end"
                >
                  <img src={article.poster} crossOrigin="anonymous" alt="img" className="w-full h-full absolute object-cover"/>

                  <button className="py-1 px-6 m-8 rounded-full bg-[#779CFF] shadow-tagBtn text-[#fff]">
                    {article.categories}
                  </button> 

                </div>
                <div className="hidden flex-col gap-2  xm:flex mt-[32px]">
                  <p className="text-[14px] leading-6">Поделиться:</p>
                  <div className="flex gap-2 items-center">
                    <div className="p-1 rounded-[10px] bg-pageMode cursor-pointer transition-all shareIcon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1139 9.29103C16.6659 8.73903 17.2139 7.45103 14.9139 9.01503C11.6459 11.27 8.42492 13.387 8.42492 13.387C8.09336 13.537 7.73491 13.6183 7.37112 13.6262C7.00732 13.6341 6.64568 13.5684 6.30792 13.433C4.92792 13.019 3.31692 12.467 3.31692 12.467C3.31692 12.467 2.21692 11.776 4.09992 11.04C4.09992 11.04 12.0609 7.77303 14.8219 6.62203C15.8799 6.16203 19.4689 4.69003 19.4689 4.69003C19.4689 4.69003 21.1259 4.04503 20.9879 5.61003C20.9419 6.25403 20.5739 8.51003 20.2059 10.948C19.6529 14.399 19.0549 18.173 19.0549 18.173C19.0549 18.173 18.9629 19.231 18.1809 19.415C17.3438 19.4009 16.535 19.1097 15.8809 18.587C15.6969 18.449 12.4299 16.378 11.2329 15.366C11.1112 15.2835 11.0122 15.1716 10.9454 15.0406C10.8785 14.9096 10.8458 14.7639 10.8504 14.6169C10.855 14.4699 10.8967 14.3264 10.9716 14.1999C11.0465 14.0733 11.1522 13.9678 11.2789 13.893C12.9389 12.375 14.9179 10.488 16.1139 9.29103Z" fill="#80A3FF"/>
                      </svg>
                    </div>
                    <div className="p-1 rounded-[10px] bg-pageMode cursor-pointer transition-all shareIcon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0023 3H11.9978C7.03538 3 3.00001 7.0365 3.00001 12C2.99693 13.8956 3.59699 15.7431 4.71339 17.2751L3.59176 20.6186L7.05113 19.5127C8.51855 20.4863 10.2413 21.0038 12.0023 21C16.9646 21 21 16.9624 21 12C21 7.03762 16.9646 3 12.0023 3ZM17.2391 15.7091C17.022 16.3222 16.1603 16.8307 15.4729 16.9792C15.0026 17.0794 14.3884 17.1592 12.3206 16.302C9.67576 15.2062 7.97251 12.5186 7.83976 12.3442C7.71263 12.1699 6.77101 10.9211 6.77101 9.62962C6.77101 8.33812 7.42688 7.70924 7.69126 7.43924C7.90838 7.21762 8.26726 7.11637 8.61151 7.11637C8.72288 7.11637 8.82301 7.12199 8.91301 7.1265C9.17738 7.13775 9.31013 7.1535 9.48451 7.57087C9.70163 8.09399 10.2304 9.38549 10.2934 9.51824C10.3575 9.65099 10.4216 9.83099 10.3316 10.0054C10.2473 10.1854 10.173 10.2652 10.0403 10.4182C9.90751 10.5712 9.78151 10.6882 9.64876 10.8525C9.52726 10.9954 9.39001 11.1484 9.54301 11.4127C9.69601 11.6715 10.2248 12.5344 11.0033 13.2274C12.0079 14.1217 12.8224 14.4075 13.1138 14.529C13.3309 14.619 13.5896 14.5976 13.7483 14.4289C13.9496 14.2117 14.1983 13.8517 14.4514 13.4974C14.6314 13.2431 14.8586 13.2116 15.0971 13.3016C15.3401 13.386 16.626 14.0216 16.8904 14.1532C17.1548 14.286 17.3291 14.349 17.3933 14.4604C17.4563 14.5717 17.4563 15.0949 17.2391 15.7091Z" fill="#80A3FF"/>
                      </svg>
                    </div>
                    <div className="p-1 rounded-[10px] bg-pageMode cursor-pointer transition-all shareIcon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.786 17.9537H12.9811C12.9811 17.9537 13.3424 17.9151 13.5261 17.7235C13.6961 17.5476 13.6899 17.2174 13.6899 17.2174C13.6899 17.2174 13.6661 15.6714 14.4112 15.4436C15.145 15.2195 16.0876 16.9378 17.0864 17.5994C17.8414 18.0995 18.4152 17.9898 18.4152 17.9898L21.0867 17.9537C21.0867 17.9537 22.4843 17.8705 21.8217 16.8113C21.768 16.7245 21.4355 16.028 19.8353 14.5965C18.1602 13.0975 18.3852 13.3409 20.4029 10.7489C21.6317 9.17033 22.123 8.20632 21.9692 7.7942C21.823 7.40137 20.9192 7.505 20.9192 7.505L17.9139 7.52187C17.9139 7.52187 17.6914 7.49295 17.5252 7.58815C17.3639 7.68214 17.2601 7.89904 17.2601 7.89904C17.2601 7.89904 16.7839 9.12092 16.1488 10.1596C14.81 12.3516 14.2737 12.4672 14.0549 12.3311C13.5461 12.0142 13.6736 11.0562 13.6736 10.3765C13.6736 8.25211 14.0074 7.36643 13.0223 7.13747C12.6948 7.06156 12.4548 7.01095 11.6185 7.00251C10.5459 6.99167 9.63709 7.00613 9.1233 7.24833C8.78078 7.40981 8.51701 7.7701 8.67827 7.79059C8.87703 7.8159 9.32707 7.90748 9.56583 8.22078C9.87461 8.62446 9.86336 9.53304 9.86336 9.53304C9.86336 9.53304 10.0409 12.0334 9.44958 12.3443C9.0433 12.5576 8.48701 12.1226 7.29317 10.1331C6.68187 9.1149 6.21934 7.98821 6.21934 7.98821C6.21934 7.98821 6.13058 7.77854 5.97182 7.66647C5.77931 7.53031 5.50929 7.48693 5.50929 7.48693L2.65158 7.5038C2.65158 7.5038 2.2228 7.51585 2.06528 7.69539C1.92527 7.85566 2.05403 8.18583 2.05403 8.18583C2.05403 8.18583 4.2917 13.2312 6.82438 15.775C9.1483 18.1067 11.786 17.9537 11.786 17.9537Z" fill="#80A3FF"/>
                      </svg>
                    </div>
                    <div className=" w-8 h-8 rounded-[10px] flex justify-center transition-all items-center bg-pageMode cursor-pointer shareIcon">
                      <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.8132 16.0784C9.79547 15.8414 10.6624 15.4559 11.4415 14.94L11.4076 14.961C11.7665 14.7143 12 14.2958 12 13.8211C12 13.069 11.4141 12.4593 10.6913 12.4593C10.4405 12.4593 10.2063 12.5328 10.0073 12.6595L10.0131 12.6558C9.15984 13.219 8.12136 13.5527 7.00793 13.5527C5.89449 13.5527 4.85529 13.2182 3.97968 12.6415L4.00274 12.6558C3.80528 12.5246 3.56457 12.4466 3.30585 12.4466C2.84318 12.4466 2.43673 12.697 2.20395 13.0742L2.20107 13.0795C2.20107 13.0795 2.20107 13.0795 2.20107 13.0832C2.07495 13.2887 2 13.5392 2 13.8084C2 14.2906 2.24142 14.7135 2.60464 14.955L2.60969 14.958C3.35486 15.4537 4.22182 15.8384 5.14788 16.0626L5.20409 16.0739L2.70409 18.6723C2.46483 18.9175 2.31637 19.258 2.31637 19.6352C2.31637 20.0019 2.4569 20.3341 2.68391 20.5771L2.70553 20.5996C2.94047 20.8448 3.26549 20.9963 3.62439 20.9963C3.98328 20.9963 4.3083 20.8448 4.54324 20.5996L7.00865 18.0469L9.45892 20.601C9.6953 20.847 10.0225 21 10.3835 21C11.1056 21 11.6908 20.3911 11.6908 19.6397C11.6908 19.264 11.5445 18.9243 11.3082 18.6775L8.81392 16.0784H8.8132ZM7.00793 12.2898C9.47117 12.2876 11.4674 10.2088 11.4674 7.64492C11.4674 5.07949 9.46901 3 7.0036 3C4.5382 3 2.53978 5.07949 2.53978 7.64492V7.64942C2.54483 10.2133 4.54324 12.2898 7.00793 12.2898ZM7.00793 5.72216C8.02911 5.72216 8.85644 6.58305 8.85644 7.64567C8.85644 8.70829 8.02911 9.56918 7.00793 9.56918C5.98818 9.56918 5.16085 8.70979 5.15941 7.64867C5.15941 7.64792 5.15941 7.64792 5.15941 7.64717C5.15941 6.58455 5.98674 5.72291 7.00793 5.72216Z" fill="#80A3FF"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[416px] xm:h-auto xm:w-[100%] w-[571px] text-textMode flex flex-col justify-between xm:pt-0 pt-[40px]">
                <div className="flex flex-col xm:flex-col-reverse gap-4">
                  <div className="flex flex-wrap w-full gap-3 items-center justify-between mx:text-[12px] ms:text-[10px] text-[14px] leading-6">
                    <div className="flex items-center gap-2">
                      <img src={article.author?article.author.photo_url:""} className="w-6 h-6 rounded-full" alt="person" />
                      <p>Автор: {article.author?article.author.name:""}</p>
                    </div>
                    <div>
                      <p>{article.views} просмотров</p>
                    </div>
                    <div>
                      <p>{article.createdAt}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[36px] font-semibold leading-[48px] mx:text-[22px] ms:text-[18px] mx:leading-[28px] ms:leading-[24px] sm:text-[28px] sm:leading-[36px] xm:text-[36px] xm:leading-[48px] 2xl:text-[32px] 2xl:leading-[40px]">
                      {article.title}
                    </p>
                  </div>
                  <div className="hidden md:flex h-[24px] relative">
                    <button
                      onClick={() => goBack()}
                      className="flex cursor-pointer items-center gap-1"
                    >
                      <img src={arrowLeft} alt={arrowLeft} />
                      <p className="text-[#779CFF] mx:text-[14px] ms:text-[12px]">Назад</p>
                    </button>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between text-textMode xm:hidden">
                  <div className="flex flex-col gap-2"> 
                  <p className="text-[14px] leading-6">Поделиться:</p>
                  <div className="flex gap-2 items-center">
                    <div className="p-1 rounded-[10px] bg-pageMode cursor-pointer transition-all shareIcon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1139 9.29103C16.6659 8.73903 17.2139 7.45103 14.9139 9.01503C11.6459 11.27 8.42492 13.387 8.42492 13.387C8.09336 13.537 7.73491 13.6183 7.37112 13.6262C7.00732 13.6341 6.64568 13.5684 6.30792 13.433C4.92792 13.019 3.31692 12.467 3.31692 12.467C3.31692 12.467 2.21692 11.776 4.09992 11.04C4.09992 11.04 12.0609 7.77303 14.8219 6.62203C15.8799 6.16203 19.4689 4.69003 19.4689 4.69003C19.4689 4.69003 21.1259 4.04503 20.9879 5.61003C20.9419 6.25403 20.5739 8.51003 20.2059 10.948C19.6529 14.399 19.0549 18.173 19.0549 18.173C19.0549 18.173 18.9629 19.231 18.1809 19.415C17.3438 19.4009 16.535 19.1097 15.8809 18.587C15.6969 18.449 12.4299 16.378 11.2329 15.366C11.1112 15.2835 11.0122 15.1716 10.9454 15.0406C10.8785 14.9096 10.8458 14.7639 10.8504 14.6169C10.855 14.4699 10.8967 14.3264 10.9716 14.1999C11.0465 14.0733 11.1522 13.9678 11.2789 13.893C12.9389 12.375 14.9179 10.488 16.1139 9.29103Z" fill="#80A3FF"/>
                      </svg>
                    </div>
                    <div className="p-1 rounded-[10px] bg-pageMode cursor-pointer transition-all shareIcon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0023 3H11.9978C7.03538 3 3.00001 7.0365 3.00001 12C2.99693 13.8956 3.59699 15.7431 4.71339 17.2751L3.59176 20.6186L7.05113 19.5127C8.51855 20.4863 10.2413 21.0038 12.0023 21C16.9646 21 21 16.9624 21 12C21 7.03762 16.9646 3 12.0023 3ZM17.2391 15.7091C17.022 16.3222 16.1603 16.8307 15.4729 16.9792C15.0026 17.0794 14.3884 17.1592 12.3206 16.302C9.67576 15.2062 7.97251 12.5186 7.83976 12.3442C7.71263 12.1699 6.77101 10.9211 6.77101 9.62962C6.77101 8.33812 7.42688 7.70924 7.69126 7.43924C7.90838 7.21762 8.26726 7.11637 8.61151 7.11637C8.72288 7.11637 8.82301 7.12199 8.91301 7.1265C9.17738 7.13775 9.31013 7.1535 9.48451 7.57087C9.70163 8.09399 10.2304 9.38549 10.2934 9.51824C10.3575 9.65099 10.4216 9.83099 10.3316 10.0054C10.2473 10.1854 10.173 10.2652 10.0403 10.4182C9.90751 10.5712 9.78151 10.6882 9.64876 10.8525C9.52726 10.9954 9.39001 11.1484 9.54301 11.4127C9.69601 11.6715 10.2248 12.5344 11.0033 13.2274C12.0079 14.1217 12.8224 14.4075 13.1138 14.529C13.3309 14.619 13.5896 14.5976 13.7483 14.4289C13.9496 14.2117 14.1983 13.8517 14.4514 13.4974C14.6314 13.2431 14.8586 13.2116 15.0971 13.3016C15.3401 13.386 16.626 14.0216 16.8904 14.1532C17.1548 14.286 17.3291 14.349 17.3933 14.4604C17.4563 14.5717 17.4563 15.0949 17.2391 15.7091Z" fill="#80A3FF"/>
                      </svg>
                    </div>
                    <div className="p-1 rounded-[10px] bg-pageMode cursor-pointer transition-all shareIcon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.786 17.9537H12.9811C12.9811 17.9537 13.3424 17.9151 13.5261 17.7235C13.6961 17.5476 13.6899 17.2174 13.6899 17.2174C13.6899 17.2174 13.6661 15.6714 14.4112 15.4436C15.145 15.2195 16.0876 16.9378 17.0864 17.5994C17.8414 18.0995 18.4152 17.9898 18.4152 17.9898L21.0867 17.9537C21.0867 17.9537 22.4843 17.8705 21.8217 16.8113C21.768 16.7245 21.4355 16.028 19.8353 14.5965C18.1602 13.0975 18.3852 13.3409 20.4029 10.7489C21.6317 9.17033 22.123 8.20632 21.9692 7.7942C21.823 7.40137 20.9192 7.505 20.9192 7.505L17.9139 7.52187C17.9139 7.52187 17.6914 7.49295 17.5252 7.58815C17.3639 7.68214 17.2601 7.89904 17.2601 7.89904C17.2601 7.89904 16.7839 9.12092 16.1488 10.1596C14.81 12.3516 14.2737 12.4672 14.0549 12.3311C13.5461 12.0142 13.6736 11.0562 13.6736 10.3765C13.6736 8.25211 14.0074 7.36643 13.0223 7.13747C12.6948 7.06156 12.4548 7.01095 11.6185 7.00251C10.5459 6.99167 9.63709 7.00613 9.1233 7.24833C8.78078 7.40981 8.51701 7.7701 8.67827 7.79059C8.87703 7.8159 9.32707 7.90748 9.56583 8.22078C9.87461 8.62446 9.86336 9.53304 9.86336 9.53304C9.86336 9.53304 10.0409 12.0334 9.44958 12.3443C9.0433 12.5576 8.48701 12.1226 7.29317 10.1331C6.68187 9.1149 6.21934 7.98821 6.21934 7.98821C6.21934 7.98821 6.13058 7.77854 5.97182 7.66647C5.77931 7.53031 5.50929 7.48693 5.50929 7.48693L2.65158 7.5038C2.65158 7.5038 2.2228 7.51585 2.06528 7.69539C1.92527 7.85566 2.05403 8.18583 2.05403 8.18583C2.05403 8.18583 4.2917 13.2312 6.82438 15.775C9.1483 18.1067 11.786 17.9537 11.786 17.9537Z" fill="#80A3FF"/>
                      </svg>
                    </div>
                    <div className=" w-8 h-8 rounded-[10px] flex justify-center transition-all items-center bg-pageMode cursor-pointer shareIcon">
                      <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.8132 16.0784C9.79547 15.8414 10.6624 15.4559 11.4415 14.94L11.4076 14.961C11.7665 14.7143 12 14.2958 12 13.8211C12 13.069 11.4141 12.4593 10.6913 12.4593C10.4405 12.4593 10.2063 12.5328 10.0073 12.6595L10.0131 12.6558C9.15984 13.219 8.12136 13.5527 7.00793 13.5527C5.89449 13.5527 4.85529 13.2182 3.97968 12.6415L4.00274 12.6558C3.80528 12.5246 3.56457 12.4466 3.30585 12.4466C2.84318 12.4466 2.43673 12.697 2.20395 13.0742L2.20107 13.0795C2.20107 13.0795 2.20107 13.0795 2.20107 13.0832C2.07495 13.2887 2 13.5392 2 13.8084C2 14.2906 2.24142 14.7135 2.60464 14.955L2.60969 14.958C3.35486 15.4537 4.22182 15.8384 5.14788 16.0626L5.20409 16.0739L2.70409 18.6723C2.46483 18.9175 2.31637 19.258 2.31637 19.6352C2.31637 20.0019 2.4569 20.3341 2.68391 20.5771L2.70553 20.5996C2.94047 20.8448 3.26549 20.9963 3.62439 20.9963C3.98328 20.9963 4.3083 20.8448 4.54324 20.5996L7.00865 18.0469L9.45892 20.601C9.6953 20.847 10.0225 21 10.3835 21C11.1056 21 11.6908 20.3911 11.6908 19.6397C11.6908 19.264 11.5445 18.9243 11.3082 18.6775L8.81392 16.0784H8.8132ZM7.00793 12.2898C9.47117 12.2876 11.4674 10.2088 11.4674 7.64492C11.4674 5.07949 9.46901 3 7.0036 3C4.5382 3 2.53978 5.07949 2.53978 7.64492V7.64942C2.54483 10.2133 4.54324 12.2898 7.00793 12.2898ZM7.00793 5.72216C8.02911 5.72216 8.85644 6.58305 8.85644 7.64567C8.85644 8.70829 8.02911 9.56918 7.00793 9.56918C5.98818 9.56918 5.16085 8.70979 5.15941 7.64867C5.15941 7.64792 5.15941 7.64792 5.15941 7.64717C5.15941 6.58455 5.98674 5.72291 7.00793 5.72216Z" fill="#80A3FF"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                  <div className="flex items-center text-[20px] gap-3">
                    <p>{userRating}</p>
                    <StarRating maxRating={5} onRatingChange={handleRatingChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-16 pr-4 pt-[88px] md:pt-[45px] sm:pt-[40px] lg:px-[48px] md:px-6 pb-[88px] gap-8 flex h-full relative">
            <div className="w-[65%] lg:w-full mx:text-[14px]">
              <div>
                <p className=" leading-6 pr-5 font-normal">
                  {article.subtitle}
                </p>
              </div>
              <div className="w-full mt-8 text-wrap break-all">
              <div className="main" dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
              <div className="mt-[56px]">
                <p className="leading-6 pr-5 font-normal">
                  {article.conclusion}
                </p>
              </div>
              <div className="mt-[88px] w-full border border-pageMode gap-2 flex flex-wrap rounded-[15px] p-4">
                {
                  article.tags?article.tags.map((v)=>{
                    return(
                      <button className="flex gap-2 items-center bg-pageMode px-6 py-2 rounded-[10px] text-[#80A3FF] font-medium leading-6">
                        <img src={hashtag} alt="hashtag" />
                        {v}
                      </button>
                    )
                  }):""
                }
              </div>
            </div>
            <div className="w-[32.5%] lg:hidden border relative border-pageMode py-[64px] xl:py-[48px] xl:px-9  xm:py-8 xm:px-6 px-[48px] rounded-[10px] flex flex-col gap-8">
              <div>
                <CryptoChart />
              </div>
              <div>
                <AdvertisimentCard/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          <div className="mt-[88px] mb-[56px] md:mb-[60px] sm:mb-[40px] md:mt-[45px] sm:mt-[40px]">
            <p className="font-normal text-[24px] sm:text-[18px] leading-8 text-textMode">
              Похожие новости
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-8 xm:grid-cols-2 lm:grid-cols-1 xm:gap-6">
          {
            articles.map((item)=>{
              return(
                <ArticleCard key={item.id} item={item} author={item.author} id={item.id} subtitle={item.subtitle} title={item.title} poster={item.poster} categories={item.categories[0]} createdAt={item.createdAt} photo_url={item.author.photo_url} name={item.author.name}/>
              )
            })
          }
          </div>
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

export default ArticleInfo;
