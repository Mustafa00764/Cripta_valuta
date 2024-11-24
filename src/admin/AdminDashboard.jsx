import React, { useContext, useState } from 'react'
import PanelHeader from './PanelHeader'
import article from '../assets/svg/article.svg'
import { AdminContext } from '../context/AdminContext'
import top_10 from '../assets/svg/medal.svg'
import DCard from './DCard'
import Pagination from './Pagination'
import Sort from './Sort'
import ADCard from './ADCard'
import chevronDown from "../assets/svg/ChevronDown.svg"

const AdminDashboard = () => {
  const {theme,categorie} = useContext(AdminContext)
  const [username,setUserName] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categorie);
  const categories = ['USER', 'MODERATOR', 'ADMIN'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };
  
  return (
    <div className='w-full'>
      <PanelHeader title={'Admins'}/>
      <div className='px-[60px] mt-[6px]'>
        <div className='h-[78px] py-[14px] max-w-[150px]'>
          <label htmlFor="Articles">
            <input type="radio" id='Articles' name='category' className='hidden'/>
            <div className={`min-w-[100px] gap-5 cursor-pointer relative w-auto h-[50px] justify-between rounded-[15px] flex items-center ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} px-5`}>
              <p>ADMINS</p>
              <p>5</p>
            </div>
          </label>
        </div>
        <div className='max-w-[1200px] mt-5 text-sideBarTextLight w-full max-h-[550px] relative h-auto  '>
          <div className=' h-[50px] flex items-center text-center bg-[#151B1F] rounded-t-[12px]'>
            <div className='w-[100px]'>
              <p>#</p>
            </div>
            <div className='w-[150px]'>
              <p>name</p>
            </div>
            <div className='w-[300px]'>
              <p>username</p>
            </div>
            <div className='w-[300px]'>
              <p>active</p>
            </div>
            <div className='w-[150px]'>
              <p>status</p>
            </div>
            <div className='w-[200px]'>
              <p>options</p>
            </div>
          </div>
          <div className=' relative'>
            <ADCard/>
          </div>
        </div>
        <div>
          <div className={`text-[24px] font-bold ${theme?"text-[#0C1013]":"text-[#fff]"} mt-[15px] transition-all`}>
            <p>New Admin</p>
          </div>
          <div>
          <label htmlFor="category" className='pl-[15px] flex gap-[5px] text-textMode items-center'>Status <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-[300px] mt-[5px] gap-[15px] relative h-[50px] flex items-center border border-[#262E34] px-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]`}
              >
                <span className="block truncate">{selectedCategory}</span>
                <span className="absolute inset-y-0 right-[15px] flex items-center  pointer-events-none">
                <img src={chevronDown} alt="chevrodDown"  className=' cursor-pointer'/>
                </span>
              </button>

              {isOpen && (
                <ul className={`absolute w-[300px] z-[1] mt-1 ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} shadow-lg max-h-60 rounded-[12px]  text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}>
                  {categories.map((category) => (
                    <li
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`cursor-pointer select-none h-[50px]  flex items-center px-[15px] ${
                      selectedCategory === category ? `${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}` : `${theme?'text-sideBarTextDark':'text-sideBarTextLight'}`
                      } ${theme?'hover:bg-sideBarTextLight':'hover:bg-[#151B1F]'}`}
                    >
                      <span className="block truncate">{category}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={` max-w-[1280px] w-full ${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] transition-all`}>
          <label htmlFor="title" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Account <span className='text-[#FF8F00] text-[14px] '>(usename)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <input
              type="text"
              id='title'
              placeholder='Enter admin username'
              onChange={(e) => setUserName(e.target.value)}
              required
              className={`w-full outline-none border h-[50px] border-[#262E34] px-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard