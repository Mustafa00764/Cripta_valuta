import arrow from '../assets/svg/arrow.svg'
import Telegram from "../assets/svg/telegram_icon.svg"
import Tiktok from "../assets/svg/tiktok_icon.svg"
import VK from "../assets/svg/Vk_icon.svg"
import YouTube from "../assets/svg/youtube-icon.svg"
import search_icon from "../assets/svg/fe_search.svg"
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'

const UserNavbar = () => {
  const [hashtags,setHashtags] = useState(false)
  const [navData,setNavData] = useState(false)
  const [search,setSearch] = useState(false)
  const [searchValues,setSearchValues] = useState('')
  const {categories,categoryName,setCategoryName,handleRestore} = useContext(AdminContext)

  let location = useLocation()
  const getHeshtag = (hash) => {
    setHashtags(hash)    
  }

  const searchValue = () => {
    if (searchValues.length != 0) {
      setSearchValues('')
    }else{
      setSearch(!search)
    }

  }

  useEffect(()=>{
    handleRestore()
  },[categories])


  return (
    <div className='w-[100vw] h-[72px] relative bg-bgMode text-textMode shadow-3xl lg:hidden'>
      <div className='container'>
        <div className={` absolute ${search?"right-0":"right-[-200%]"} z-[2] transition-all flex w-full px-10 h-full bg-bgMode text-textMode items-center justify-end`}>
          <input onChange={(e)=>setSearchValues(e.target.value)} type="text" value={searchValues} placeholder='Поиск' id='search' className='w-full text-[24px] text-end pr-8 bg-bgMode outline-none'/>
          <div onClick={()=>searchValue()} className=' cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5851 11.999L20.6675 4.92716C20.8792 4.71545 20.9981 4.42831 20.9981 4.12891C20.9981 3.8295 20.8792 3.54236 20.6675 3.33065C20.4558 3.11894 20.1687 3 19.8693 3C19.5699 3 19.2828 3.11894 19.0711 3.33065L12 10.4138L4.92888 3.33065C4.71719 3.11894 4.43008 3 4.1307 3C3.83133 3 3.54422 3.11894 3.33253 3.33065C3.12084 3.54236 3.00192 3.8295 3.00192 4.12891C3.00192 4.42831 3.12084 4.71545 3.33253 4.92716L10.4149 11.999L3.33253 19.0709C3.22716 19.1754 3.14353 19.2998 3.08646 19.4368C3.02938 19.5738 3 19.7208 3 19.8692C3 20.0176 3.02938 20.1645 3.08646 20.3016C3.14353 20.4386 3.22716 20.5629 3.33253 20.6674C3.43704 20.7728 3.56138 20.8565 3.69837 20.9135C3.83536 20.9706 3.9823 21 4.1307 21C4.27911 21 4.42605 20.9706 4.56304 20.9135C4.70003 20.8565 4.82437 20.7728 4.92888 20.6674L12 13.5843L19.0711 20.6674C19.1756 20.7728 19.3 20.8565 19.437 20.9135C19.574 20.9706 19.7209 21 19.8693 21C20.0177 21 20.1646 20.9706 20.3016 20.9135C20.4386 20.8565 20.563 20.7728 20.6675 20.6674C20.7728 20.5629 20.8565 20.4386 20.9135 20.3016C20.9706 20.1645 21 20.0176 21 19.8692C21 19.7208 20.9706 19.5738 20.9135 19.4368C20.8565 19.2998 20.7728 19.1754 20.6675 19.0709L13.5851 11.999Z" fill="#779CFF"/>
            </svg>
          </div>
        </div>
        <div className=' flex items-center h-full justify-between'>
          <div className='flex gap-2'>
            <a href="#" className='w-[32px] h-[32px] rounded-[10px] p-[4px] gap-2 shadow-tg bg-[#3390EC]'>
              <img src={Telegram} alt={Telegram} />
            </a>
            <a href="#" className='w-[32px] h-[32px] rounded-[10px] p-[4px] gap-2 shadow-vk bg-[#0077FF]'>
              <img src={VK} alt={VK} />
            </a>
            <a href="#" className='w-[32px] h-[32px] rounded-[10px] p-[4px] gap-2 shadow-yt bg-[#FF0000]'>
              <img src={YouTube} alt={YouTube} />
            </a>
            {/* <marquee behavior="" direction="">Hello world</marquee> */}
            <a href="#" className='w-[32px] h-[32px] rounded-[10px] p-[4px] gap-2 shadow-tt bg-[#000]'>
              <img src={Tiktok} alt={Tiktok} />
            </a>
          </div>
          <div className='flex relative items-center gap-[70px] xl:gap-10 leading-6 h-full'>
            {
              categories.map(item => {
                return(
                  <NavLink to={`/${item.name}`} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center hover:text-[#7399FF] transition-all')}>
                  <p>{item.name}</p>                                                                                             
                  </NavLink>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNavbar


            {/* <NavLink to={"/bitcoin"} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 fill-[#7399FF] border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center')} onMouseOver={()=>getHeshtag(true)} onMouseOut={()=>getHeshtag(false)} >
            <div className={hashtags?'flex items-center gap-1 text-[#7399FF] hover:text-[#7399FF] transition-all ':'flex items-center gap-1'} >
              <p>Bitcoin</p>
              <div className={hashtags?'rotate-180 transition-all':'rotate-0 transition-all'}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3103 6.34473L8 9.65507L4.68966 6.34473"  stroke={hashtags || location.pathname == '/bitcoin'?"#7399FF":""} className={`${hashtags || location.pathname == '/bitcoin'?"#7399FF":" stroke-textMode"}`} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            </NavLink>
            <NavLink to={"/blockchain"} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center hover:text-[#7399FF] transition-all')}>
            <p>Blockchain</p>                                                                                             
            </NavLink>
            <NavLink to={"/nft"} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center hover:text-[#7399FF] transition-all')}>
            <p>NFT</p>
            </NavLink>
            <NavLink to={"/defi"} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center hover:text-[#7399FF] transition-all')}>
            <p>DeFi</p>
            </NavLink>
            <NavLink to={"/p2e"} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center hover:text-[#7399FF] transition-all')}>
            <p>P2E</p>
            </NavLink>
            <NavLink to={"/ethereum"} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center hover:text-[#7399FF] transition-all')}>
            <p>Ethereum</p>
            </NavLink>
            <NavLink to={"/i"} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center hover:text-[#7399FF] transition-all')}>
            <p>Business</p>
            </NavLink>
            <NavLink to={"/airdrop"} className={(navData) => (navData.isActive ? "text-[#7399FF] border-spacing-2 border-[#7399FF] border-t-2 h-full flex items-center pb-[2px] stroke-[#7399FF]" : 'h-full flex items-center hover:text-[#7399FF] transition-all')}>
            <p>Airdrop</p>
            </NavLink>
            <NavLink to={"/search"} onClick={()=>setSearch(!search)}>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.325 14.899L21.705 20.279C21.8941 20.4682 22.0003 20.7248 22.0002 20.9923C22.0001 21.2599 21.8937 21.5164 21.7045 21.7055C21.5153 21.8946 21.2587 22.0008 20.9912 22.0007C20.7236 22.0006 20.4671 21.8942 20.278 21.705L14.898 16.325C13.2897 17.5707 11.2673 18.1569 9.24214 17.9643C7.21699 17.7718 5.34124 16.815 3.99649 15.2886C2.65174 13.7622 1.939 11.7808 2.00326 9.74753C2.06753 7.71427 2.90396 5.78185 4.34242 4.34339C5.78087 2.90494 7.71329 2.0685 9.74656 2.00424C11.7798 1.93998 13.7612 2.65272 15.2876 3.99747C16.814 5.34222 17.7708 7.21796 17.9634 9.24312C18.1559 11.2683 17.5697 13.2907 16.324 14.899H16.325ZM10 16C11.5913 16 13.1174 15.3678 14.2427 14.2426C15.3679 13.1174 16 11.5913 16 9.99999C16 8.40869 15.3679 6.88257 14.2427 5.75735C13.1174 4.63213 11.5913 3.99999 10 3.99999C8.40871 3.99999 6.88259 4.63213 5.75737 5.75735C4.63215 6.88257 4.00001 8.40869 4.00001 9.99999C4.00001 11.5913 4.63215 13.1174 5.75737 14.2426C6.88259 15.3678 8.40871 16 10 16Z" className="fill-textMode"/>
              </svg>
            </div>
            </NavLink>
            <div className={hashtags?'opacity-[1] z-[0] transition-all absolute w-[270px] h-[152px] bg-bgMode py-6 px-8 left-[-32px] grid top-[72px] grid-cols-2':" transition-all opacity-0 h-0 z-[-10] py-0 absolute w-[270px] bg-bgMode px-8 left-[-32px] grid top-[72px] grid-cols-2 overflow-hidden"} onMouseOver={()=>getHeshtag(true)} onMouseOut={()=>getHeshtag(false)}>
            <NavLink to={"/altcoin"} className={(navData) => (navData.isActive ? "text-[#7399FF] h-full flex" : 'h-full flex ')}>
            <p className='hover:text-[#7399FF] transition-all'>Альткоины</p>                                                                                             
            </NavLink>
            <NavLink to={"/stablecoin"} className={(navData) => (navData.isActive ? "text-[#7399FF] h-full flex " : 'h-full flex ')}>
            <p className='hover:text-[#7399FF] transition-all'>Stablecoin</p>                                                                                             
            </NavLink>
            <NavLink to={"/meme-coin"} className={(navData) => (navData.isActive ? "text-[#7399FF] h-full flex " : 'h-full flex ')}>
            <p className='hover:text-[#7399FF] transition-all'>Meme-coins</p>
            </NavLink>
            <NavLink to={"/utility-token"} className={(navData) => (navData.isActive ? "text-[#7399FF] h-full flex " : 'h-full flex ')}>
            <p className='hover:text-[#7399FF] transition-all'>Utility Tokens</p>
            </NavLink>
            <NavLink to={"/defi-2024"} className={(navData) => (navData.isActive ? "text-[#7399FF] h-full flex " : 'h-full flex ')}>
            <p className='hover:text-[#7399FF] transition-all'>DeFi</p>
            </NavLink>
            <NavLink to={"/it"} className={(navData) => (navData.isActive ? "text-[#7399FF] h-full flex " : 'h-full flex')}>
            <p className='hover:text-[#7399FF] transition-all'>Business</p>
            </NavLink>
            </div> */}