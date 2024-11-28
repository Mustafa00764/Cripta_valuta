import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'

const Sort = () => {
  const {sort, setSort,theme} = useContext(AdminContext)

  return (
    <div className='flex gap-1 pl-5 items-center bg-inherit'>
      <div>
        <p className='text-[#72787F]'>SORT:</p>
      </div>
      <div className='flex items-center gap-1'>
      <button
        className={`w-[50px] h-[50px] ${
          sort === 10 ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} bg-pageMode  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
        }`}
        onClick={() => setSort(10)}
      >
        10
      </button>
      <button
        className={`w-[50px] h-[50px] ${
          sort === 15 ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} bg-pageMode  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
        }`}
        onClick={() => setSort(15)}
      >
        15
      </button>
      <button
        className={`w-[50px] h-[50px] ${
          sort === 20 ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} bg-pageMode  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
        }`}
        onClick={() => setSort(20)}
      >
        20
      </button>
      <button
        className={`w-[50px] h-[50px] ${
          sort === 25 ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} bg-pageMode transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
        }`}
        onClick={() => setSort(25)}
      >
        25
      </button>
      <button
        className={`w-[50px] h-[50px] ${
          sort === 50 ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} bg-pageMode  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
        }`}
        onClick={() => setSort(50)}
      >
        50
      </button>
      </div>
    </div>
  )
}

export default Sort