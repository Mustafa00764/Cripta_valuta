import React from 'react'
import newsCart1 from "../assets/svg/newsCart1.svg";
import newsCart2 from "../assets/svg/newsCart2.svg";
import newsCart3 from "../assets/svg/newsCart3.svg";
import newsCart4 from "../assets/svg/newsCart4.svg";
const AdvertisimentCard = () => {
  return (
    <div className="flex flex-col gap-8 h-auto">
    <div>
      <img src={newsCart1} alt="newsCart1" />
    </div>
    <div>
      <iframe
        width="100%"
        className="rounded-[5px] h-[180px]"
        src="https://www.youtube.com/embed/3fqj8qiZVhw"
        title="My REALISTIC Price Target For Solana (&amp; Other Altcoins...)"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
    <div>
      <img src={newsCart2} alt="newsCart2" />
    </div>
    <div>
      <img src={newsCart3} alt="newsCart3" />
    </div>
    <div>
      <img src={newsCart4} alt="newsCart4" />
    </div>
  </div>
  )
}

export default AdvertisimentCard