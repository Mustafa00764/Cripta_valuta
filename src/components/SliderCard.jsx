import React, { useRef, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
  Mousewheel,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
const SliderCard = () => {
  const [top5, setTop5] = useState(true)

  const swiper = [
    {
      id: 1,
      img: "https://pixlr.com/images/index/product-image-one.webp",
      title:
        "Зарабатывать кроссовками: StepN — крутой криптопроект или/и финансовая пирамида",
      author: "Иван Иванов",
      author_img:
        "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
      time: "15",
      view: 1456,
      genre: "P2E",
    },
    {
      id: 2,
      img: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
      title:
        "Зарабатывать кроссовками: StepN — крутой криптопроект или/и финансовая пирамида",
      author: "Иван Иванов",
      author_img:
        "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
      time: "20",
      view: 1456,
      genre: "NFT",
    },
    {
      id: 3,
      img: "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
      title:
        "Зарабатывать кроссовками: StepN — крутой криптопроект или/и финансовая пирамида",
      author: "Иван Иванов",
      author_img:
        "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
      time: "5",
      view: 1456,
      genre: "DeFi",
    },
  ];
  const swiper2 = [
    {
      id: 1,
      img: "https://i.ucrazy.org/files/pics/2024.04/1713496210_001.webp",
      title:
        "Зарабатывать кроссовками: StepN — крутой криптопроект или/и финансовая пирамида",
      author: "Иван Иванов",
      author_img:
        "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
      time: "15",
      view: 1456,
      genre: "P2E",
    },
    {
      id: 2,
      img: "https://cs12.pikabu.ru/post_img/big/2022/08/09/7/1660042588198544626.png",
      title:
        "Зарабатывать кроссовками: StepN — крутой криптопроект или/и финансовая пирамида",
      author: "Иван Иванов",
      author_img:
        "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
      time: "20",
      view: 1456,
      genre: "NFT",
    },
    {
      id: 3,
      img: "https://i.ucrazy.org/files/pics/2023.05/thumbs/1685433183_13.webp",
      title:
        "Зарабатывать кроссовками: StepN — крутой криптопроект или/и финансовая пирамида",
      author: "Иван Иванов",
      author_img:
        "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
      time: "5",
      view: 1456,
      genre: "DeFi",
    },
  ];
  const [top, setTop] = useState(swiper)

  const editorial = () =>{
    setTop5(true)
    setTop(swiper)
  }

  const popular = () => {
    setTop5(false)
    setTop(swiper2)
  }
  return (
    <div className="w-[780px] xm:w-[100vw] xm:ml-[-24px]">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        // onSwiper={swiper => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {top.map(item => {
          return (
            <SwiperSlide
              key={item.id}
              className="h-[616px] md:h-[516px] sm:h-[416px] ms:h-[328px]"
            >
              <div
                style={{ backgroundImage: `url(${item.img})` }}
                className="h-[608px] md:h-[508px] w-full bg-cover rounded-[15px] xm:rounded-none sm:h-[408px] ms:h-[320px]"
              >
                <div className="w-full hidden xm:flex px-6 py-[16px] text-[#fff] text-[14px] font-semibold leading-6">
                  <div>
                    <button onClick={()=>editorial()} className={top5?"text-[#fff] rounded-full border-[1px] border-[#fff] py-1 px-4 transition-all":"transition-all text-[rgba(255,255,255,.75)] border-[1px] py-1 px-4 border-[#ffffff00]"}>Выбор редакции</button>
                  </div>
                  <div>
                    <button onClick={()=>popular()} className={top5?"text-[rgba(255,255,255,.75)] py-1 px-4 border-[1px] border-[#ffffff00] transition-all":"transition-all text-[#fff] rounded-full border-[1px] border-[#fff] py-1 px-4 "}>Популярное</button>
                  </div>
                </div>
                <div className="w-full h-auto text-[#fff] text-[36px] xm:pt-0 leading-12 font-bold sm:px-6 px-[32px] pt-[48px] lm:text-[28px] mx:text-[24px] ms:text-[18px]">
                  <p>{item.title}</p>
                </div>
                <div className="rounded-full bg-[#F4F7FF] py-1 w-[59px] absolute hidden ms:flex justify-center bottom-[56px] right-6">
                  <p className="text-[16px] font-semibold leading-4 text-[#7399FF] ms:text-[14px]">
                    {item.genre}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-[11px] text-textMode w-[664px] rounded-tl-[30px] rounded-bl-[15px] rounded-br-[15px] xm:rounded-br-none bg-bgMode py-[16px] pl-[32px] h-[56px] text-[12px] ms:text-[10px] absolute overflow-hidden bottom-0 right-[-1px] md:w-[90%] ms:h-[40px] ms:py-3 ms:pl-6">
                    <div className="h-[2.5px] w-full bg-[#7399FF] absolute times top-0 left-0"></div>
                    <p className="text-[16px] ms:hidden font-semibold leading-4 text-[#7399FF] ms:text-[14px]">
                      {item.genre}
                    </p>
                    <div className="dot ms:hidden"></div>
                    <div className="flex gap-2 items-center">
                      <img
                        src={item.author_img}
                        alt="author_img"
                        className="w-[20px] h-[20px] rounded-[50%] overflow-hidden object-cover bg-center ms:hidden"
                      />
                      <p>Автор: {item.author}</p>
                    </div>
                    <div className="dot"></div>
                    <p className="w-[90px]">{item.time} часов назад</p>
                    <div className="dot lm:hidden"></div>
                    <p className="lm:hidden">{item.view} просмотров</p>
                    <div className=" absolute w-[75px] h-[32px] right-[16px] bg-pageMode rounded-full md:hidden"></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderCard;
