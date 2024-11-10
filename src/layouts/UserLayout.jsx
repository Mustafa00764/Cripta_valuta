import React, { useContext, useEffect, useState } from 'react'
import HomePage from '../pages/HomePage'
import Header from '../components/Header'
import UserNavbar from '../components/UserNavbar'
import Footer from '../components/Footer'
import { MenuContext } from '../context/MenuContext'
import MarqueeCard from '../components/MarqueeCard'
import { Route, Routes } from 'react-router-dom'
import ArticleInfo from '../pages/ArticleInfo'
import SearchPage from '../pages/SearchPage'
import Social from '../components/Social'
import BitcoinPage from '../pages/BitcoinPage'
import BlockchainPage from '../pages/BlockchainPage'
import NFTPage from '../pages/NFTPage'
import DeFiPage from '../pages/DeFiPage'
import P2EPage from '../pages/P2EPage'
import EthereumPage from '../pages/EthereumPage'
import StablecoinsPage from '../pages/StablecoinsPage'
import AltcoinsPage from '../pages/AltcoinsPage'
import Meme_coinsPage from '../pages/Meme_coinsPage'
import UtilityTokensPage from '../pages/UtilityTokensPage'
import HDeFiPage from '../pages/HDeFiPage'
import UserMenu from '../components/UserMenu'
import AdminPanel from '../admin/AdminPanel'
import AirdropPage from '../pages/AirdropPage'
import AirdropInfo from '../pages/AirdropInfo'
import ProfilePage from '../pages/ProfilePage'
import EditProfilePage from '../pages/EditProfilePage'
import NotFoundPage from '../pages/NotFoundPage'
import AirdropCustom from '../pages/AirdropCustom'
const UserLayout = () => {
  const {menu, setMenu} = useContext(MenuContext)
  const [hidden, setHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScrolls = () => {
    setScrollPosition(window.scrollY);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > scrollPosition && currentScroll > 60) {
        setHidden(true);
        handleScrolls
      } else {
        setHidden(false);
        handleScrolls
      }
      setScrollPosition(currentScroll <= 0 ? 0 : currentScroll) 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className={'relative'}>
      <UserMenu hidden={hidden}/>
      <div onClick={()=>setMenu(!menu)} className={menu?`z-[12] w-[100vw] cursor-pointer opacity-[1] transition-all h-screen top-0 bg-[rgba(47,47,47,.5)] fixed`:`z-[-1] opacity-0 transition-all w-[100vw] ${hidden?"top-0 transition-all":"top-[136px] transition-all lg:top-[100px] md:top-[80px] ms:top-[64px]"} ${hidden?"h-screen transition-all":"lg:h-[calc(100vh-99px)] transition-all md:h-[calc(100vh-79px)] ms:h-[calc(100vh-63px)] "}   top-0 bg-[rgba(47,47,47,.4)] fixed`}></div>
      <div className={`fixed top-0 z-[21] left-0 right-0  text-white transition-all ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <Header />
      </div>
      <div className={`sticky ${hidden?"top-0 transition-all":"top-[136px] transition-all lg:top-[100px] md:top-[80px] ms:top-[64px]"}  z-10 `} >
        <UserNavbar />
      </div>
      <div className={`hidden lg:block sticky ${hidden?"top-0":"top-[136px] transition-all duration-[10] lg:top-[100px] md:top-[80px] ms:top-[64px]"} z-10`}>
        <MarqueeCard />
      </div>
      <div className={`pt-[136px] transition-all relative lg:pt-[100px] md:pt-[80px] ms:pt-[64px]`}>
        <Social/>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/search' element={<SearchPage />}/>
          <Route path='/article/:id' element={<ArticleInfo/>}/>
          <Route path='/airdrop/:id' element={<AirdropCustom/>}/>
          <Route path='/bitcoin' element={<BitcoinPage/>}/>
          <Route path='/blockchain' element={<BlockchainPage/>}/>
          <Route path='/nft' element={<NFTPage/>}/>
          <Route path='/defi' element={<DeFiPage/>}/>
          <Route path='/p2e' element={<P2EPage/>}/>
          <Route path='/ethereum' element={<EthereumPage/>}/>
          <Route path='/Stablecoin' element={<StablecoinsPage/>}/>
          <Route path='/altcoin' element={<AltcoinsPage/>}/>
          <Route path='/meme-coin' element={<Meme_coinsPage/>}/>
          <Route path='/utility-token' element={<UtilityTokensPage/>}/>
          <Route path='/defi-2024' element={<HDeFiPage/>}/>
          <Route path='/a' element={<AdminPanel/>}/>
          <Route path='/airdrop' element={<AirdropPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/settings/profile' element={<EditProfilePage/>}/>
          <Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default UserLayout