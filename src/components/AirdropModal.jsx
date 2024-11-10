import React from "react";
// import border from "../assets/images/borderImage.webp";
// import borderGPT from "../assets/images/bordergpt.webp";
import goodMan from "../assets/images/adult.jpg";
import burger from "../assets/svg/burger.svg";
import top1 from "../assets/svg/Top1new.svg";
import telegram from "../assets/svg/converted.svg";

const AirdropModal = () => {
  return (
    <div className="fixed top-[0px] left-[0px] w-[100%] h-[100vh] flex justify-center items-center z-[99999999]">
      <div className="max-w-[500px] bg-[#ffffff] h-[700px] w-[100%] flex items-start shadow-2xl flex-col shadow-[#000]">
        <div className="w-[100%] relative h-[300px] p-[20px]">
          <img
            className="z-[999] absolute cursor-pointer"
            src={burger}
            alt=""
          />
          <div className="bg-[#000000] opacity-50 h-[300px] w-full absolute left-0 top-0 z-10"></div>
          <img
            src={goodMan}
            alt=""
            className="h-[300px] object-cover w-[100%] absolute left-0 top-0 z-0"
          />
          <h1 className="text-[rgb(14,34,64)] z-20 absolute text-[40px] bottom-[50px] font-bold">
            Максим
          </h1>
          <h1 className="text-[#fff] z-20 absolute text-[50px] font-bold bottom-0">
            Max00764
          </h1>
          <div className="w-[84px] h-[84px] bg-[#fff] absolute flex justify-center items-center rounded-full bottom-[-40px] right-10 z-[9999]">
            <img
              className="w-[64px] z-[9998]  blur-lg absolute "
              src={top1}
              alt=""
            />
            <img className="w-[64px] z-[9999] absolute" src={top1} alt="" />
          </div>
        </div>
        <div className="p-[60px_60px] flex justify-start items-start gap-[30px] flex-col">
          <div className="really-names_card">
            <h2 className="text-[#c1c1c1] text-[16px] font-light uppercase">
              электронная почта
            </h2>
            <div className="text-[22px] font-bold text-[#b3b3b3]">
              ortiqov619@gmail.com
            </div>
          </div>
          <div className="really-names_card relative">
            <div className="text-[14px] font-bold text-[#b3b3b3] ">
              Я фронтенд разработчик с 3-х летним опытом знаю React.js,
              JavaScript, HTML, CSS, SCSS, SASS, Tailwind css, TypeScript и
              многое другое. Также я умею работать с API и Git и могу создать
              вам рабочий сайт который вам точно понравится.
              <hr className="bg-[#041938] h-[3px] w-[100px] rounded-full mt-[50px]" />
            </div>
            {/* <div className="socials-card absolute bottom-[-60px] right-0 flex gap-4">
              <img className="w-[32px]" src={telegram} alt="" />
              <img className="w-[32px]" src={telegram} alt="" />
              <img className="w-[32px]" src={telegram} alt="" />
              <img className="w-[32px]" src={telegram} alt="" />
            </div> */}
          </div>
          {/* <img className="w-[32px]" src={telegram} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default AirdropModal;
