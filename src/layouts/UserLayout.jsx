import React, { useContext, useEffect, useState } from 'react'
import HomePage from '../pages/HomePage'
import Header from '../components/Header'
import UserNavbar from '../components/UserNavbar'
import Footer from '../components/Footer'
import { MenuContext } from '../context/MenuContext'
import MarqueeCard from '../components/MarqueeCard'
import { Route, Router, Routes } from 'react-router-dom'
import ArticleInfo from '../pages/ArticleInfo'
import SearchPage from '../pages/SearchPage'
import Social from '../components/Social'
import UserMenu from '../components/UserMenu'
import AdminPanel from '../admin/AdminPanel'
import AirdropPage from '../pages/AirdropPage'
import ProfilePage from '../pages/ProfilePage'
import EditProfilePage from '../pages/EditProfilePage'
import NotFoundPage from '../pages/NotFoundPage'
import AirdropCustom from '../pages/AirdropCustom'
import { AdminContext } from '../context/AdminContext'
import CategoriesPages from '../pages/CategoriesPages'
const UserLayout = () => {
  const {menu, setMenu} = useContext(MenuContext)
  const [hidden, setHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const {categories,categoryName,setCategoryName,handleRestore} = useContext(AdminContext)

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

  useEffect(()=>{
    handleRestore()
  },[])

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
          {
            categories.map(item=>{
              return(
                <Route key={item.id} path={`/${item.name.toLowerCase()}`} element={<CategoriesPages/>}/>
              )
            })
          }
          <Route path='/a' element={<AdminPanel/>}/>
          <Route path='/airdrop' element={<AirdropPage/>}/>
          <Route path='/profile/:id' element={<ProfilePage/>}/>
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