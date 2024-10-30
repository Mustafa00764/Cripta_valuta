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

const AirdropSliderCard = () => {
  const [top,setTop] = useState([])

  const top5 = [
    {
      id:1,
      title:"BitGenie x DappRadar Quest: Master Dapp Insights",
      airdropName:"BitGenie",
      

    }
  ]
  return (
    <div>
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
        // speed={500}
        effect={"fade"}
        onSwiper={swiper => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {top.map(item => {
          return (
            <SwiperSlide
              key={item.id}
              className="h-[616px] md:h-[516px] sm:h-[416px] ms:h-[328px]"
            >

            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
}

export default AirdropSliderCard