import React, { useContext } from 'react'
import PanelHeader from './PanelHeader'
import article from '../assets/svg/article.svg'
import { AdminContext } from '../context/AdminContext'
import top_10 from '../assets/svg/medal.svg'
import DCard from './DCard'
import Pagination from './Pagination'
import Sort from './Sort'

const DashboardPage = () => {
  const {theme} = useContext(AdminContext)

  const categorys = [
    {
      id: 1,
      category: "All",
    },
    {
      id: 2,
      category: "Bitcoin",
    },
    {
      id: 3,
      category: "Blockchain",
    },
    {
      id: 4,
      category: "NFT",
    },
    {
      id: 5,
      category: "DeFi",
    },
    {
      id: 6,
      category: "P2E",
    },
    {
      id: 7,
      category: "Etherium",
    },
  ]

  const articles = [
    {
      "id": 1,
      "content":[
        {
          "type":"cover",
          "content":"https://www.crypto-news-flash.com/wp-content/uploads/2024/08/DALL%C2%B7E-2024-08-28-18.17.39-An-illustration-depicting-the-recent-Bitcoin-crash-showing-Bitcoins-price-plummeting-to-59000-with-potential-future-directions-towards-50000-or--1200x686.webp"
        },
        {
          "type":"headings",
          "content":"Биткоин-офшоры и конец майнингу: как поменяется мир криптовалют в 2022 году"
        },
        {
          "type":"text",
          "content":"Новый исторический максимум биткоина, запрет майнинга в огромном Китае, форсящие курс твиты Маска про Dogecoin — последний год был для рынка криптовалют настоящим потрясением. Отдельные цифровые монеты выросли за год в несколько раз и так же стремительно подешевели в январе 2022-го. Что ждет криптовалютный рынок дальше? Финтолк объясняет."
        },
        {
          "type":"title",
          "content":"Что сбылось по прогнозу’2021"
        },
        {
          "type":"text",
          "content":"В начале прошлого года Финтолк составил свой прогноз перспектив крипторынка на 2021 год. Хотя предугадать что-либо в мире криптовалют непростая задача, почти все прогнозы наших экспертов сбылись. Предположение о том, что институциональные инвесторы продолжат вкладываться в первую криптовалюту биткоин, сбылись. Кто-то делал вложения напрямую (например, Илон Маск). Кто-то предпочитал вкладываться во фьючерсы (например, компания Blackrock). Некоторые, вроде Fidelity Investments, покупали акции майнингового бизнеса. Так что вовлеченность инвесторов-китов однозначно росла. Предсказание экспертов о том, что к рыночной капитализации Bitcoin прибавится сразу 600 млрд долларов, в целом оказалось верным. BTC действительно вышел на новый исторический максимум стоимости. На пике его капитализация превышала триллион долларов. Тем не менее однозначно закрепиться на новом уровне криптоактиву не удалось, и сейчас капитализация BTC составляет около 700 млрд долларов."
        }
      ],
      "isActive": true,
      "publishDate": "2024-09-22 - 08:26:09",
      "createdAt": "2024-09-22T08:26:09.068Z",
      "updatedAt": "2024-09-22T16:24:35.695Z",
      "status": "Draft",
      "views": 1,
      "tags": ["Blockchain","Altcoin","NFT","Gaming"],
      "categories": ["Bitcoin","NFT"],
      "author": {
        "photo_url": "https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg",
        "username": "Max00764",
        "name": "Maksim"
      },
      "avgRating": 5,
      "ratings": [
        {
          "rating": 4,
          "userId": 2
        }
      ]
    },
    {
      "id": 2,
      "content":[
        {
          "type":"cover",
          "content":"https://www.crypto-news-flash.com/wp-content/uploads/2024/08/DALL%C2%B7E-2024-08-28-18.17.39-An-illustration-depicting-the-recent-Bitcoin-crash-showing-Bitcoins-price-plummeting-to-59000-with-potential-future-directions-towards-50000-or--1200x686.webp"
        },
        {
          "type":"headings",
          "content":"Рухнувшая биржа FTX выплатит клиентам миллиарды. Кто и сколько получит"
        },
        {
          "type":"text",
          "content":"29 сентября курс токена обанкротившейся биржи FTX (FTT) вырос почти на 60% из-за распространяемых в социальной сети X слухов о выплате $16 млрд в адрес кредиторов бывшей криптобиржи. В моменте курс FTT достигал почти $3, днем 30 сентября котировки опустились в диапазон около $2."
        },
        {
          "type":"title",
          "content":"Планы по выплатам"
        },
        {
          "type":"text",
          "content":"Согласно плану банкротства, 98% клиентов FTX, претензии которых составили менее $50 тыс., получат выплаты эквивалентом стоимости их криптовалют по ценам на момент подачи заявления, сообщил The Block. Так, например, имея 1 BTC на балансе до закрытия, клиент получит эквивалент около $16 тыс., хотя сегодня цена одной монеты главной криптовалюты составляет около $65 тыс. Котировки Solana на тот момент находились около $17, а на конец сентября ее курс составляет около $160."
        }
      ],
      "isActive": true,
      "publishDate": "2024-09-22 - 08:26:09",
      "createdAt": "2024-09-22T08:26:09.068Z",
      "updatedAt": "2024-09-22T16:24:35.695Z",
      "status": "Draft",
      "views": 1,
      "tags": ["Blockchain","Altcoin","Games","Gaming"],
      "categories": ["P2E","DeFi"],
      "author": {
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg",
        "username": "Max00764",
        "name": "Andrey"
      },
      "avgRating": 5,
      "ratings": [
        {
          "rating": 3,
          "userId": 2
        }
      ]
    },
    {
      "id": 3,
      "content":[
        {
          "type":"cover",
          "content":"https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/8/68/347278651719688.jpeg"
        },
        {
          "type":"headings",
          "content":"Криптостартапы собрали $2,6 млрд в третьем квартале. Топ-10 инвестраундов"
        },
        {
          "type":"text",
          "content":"«РБК-Крипто» не дает инвестиционных советов, материал опубликован исключительно в ознакомительных целях. Криптовалюта — это волатильный актив, который может привести к финансовым убыткам."
        },
        {
          "type":"title",
          "content":"Топ-10 крупнейших инвестиционных раундов"
        },
        {
          "type":"text",
          "content":"Celestia — модульный блокчейн, предоставляющий возможность создавать собственные блокчейны на базе Celestia. Проект привлек $100 млн финансирования от инвесторов во главе с Bain Capital Crypto, при участии 1kx, Placeholder, Robot Ventures. С 2021 года это четвертый инвестиционный раунд — общая сумма собранных средств превысила $152 млн."
        }
      ],
      "isActive": true,
      "publishDate": "2024-09-22 - 08:26:09",
      "createdAt": "2024-09-22T08:26:09.068Z",
      "updatedAt": "2024-09-22T16:24:35.695Z",
      "status": "Draft",
      "views": 1,
      "tags": ["Blockchain","Altcoin","Games","NFT","Gaming"],
      "categories": ["Blockchain","Bitcoin"],
      "author": {
        "photo_url": "https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0",
        "username": "Max00764",
        "name": "Oleg"
      },
      "avgRating": 5,
      "ratings": [
        {
          "rating": 5,
          "userId": 2
        }
      ]
    }
  ]
  return (
    <div className='w-full'>
      <PanelHeader title={'Main'}/>
      <div className='px-[60px] mt-[6px]'>
        <div className='h-[78px] py-[14px]'>
          <form className='flex gap-[25px] h-full items-center w-full'>
            <label htmlFor="Articles">
              <input type="radio" id='Articles' name='category' className='hidden'/>
              <div className={`min-w-[186px] gap-5 cursor-pointer relative w-auto h-[50px] justify-between rounded-[15px] flex items-center ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} px-5`}>
                <img src={article} alt="article"/>
                <p>ARTICLES</p>
                <p>200</p>
              </div>
            </label>
            <label htmlFor="Top-10">
              <input type="radio" id='Top-10' name='category' className='hidden'/>
                <div className={`gap-5 cursor-pointer relative w-auto h-[50px] justify-between rounded-[15px] flex items-center ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} px-5`}>
                  <img src={top_10} alt="top_10" />
                  <p>Top - 10</p>
                </div>
            </label>
          </form>
        </div>
        <div className={`w-full h-[41px] flex items-center  ${theme?'text-sideBarTextDark':'text-white'}`}>
          <p>{"ARTICLES"}/<span className='text-[#88919D]'>{'Category'}</span></p>
        </div>
        <div className='w-full h-[50px] flex items-center'>
          <form className='flex gap-[10px]'>
            {
              categorys.map((item)=>{
                return(
                  <label key={item.id} htmlFor={item.category}>
                    <input type="radio" name='category' id={item.category} className='hidden'/>
                    <div className={`py-[15px] rounded-[20px] hover:bg-[#88919D] hover:text-sideBarTextDark px-5 ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} transition-all text-[15px] leading-[10px] ${theme?'bg-sideBarLight':'bg-sideBarDark'}`}>
                      <p>{item.category}</p>
                    </div>
                  </label>
                )
              })
            }
          </form>
        </div>
        <div className='w-full h-[50px] mt-[5px]'>
          <div className={`max-w-[520px] w-full h-full ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} items-center flex transition-all rounded-[12px] border border-[rgba(136,145,157,0.20)] overflow-hidden ${theme?'bg-sideBarLight':'bg-sideBarDark'}`}>
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
        <div className='max-w-[1600px] mt-5 text-sideBarTextLight w-full max-h-[550px] relative h-auto  '>
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
          <div className=' relative'>
            {
              articles.map((item)=>{
                return (
                  <DCard key={item.id} item={item}/>
                )
              })
            }
          </div>
        </div>
        <div>
          <Pagination totalPages={15}/>
        </div>
        <div className='flex w-full h-[78px] items-center'>
          <Sort/>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage