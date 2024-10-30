import React from 'react'
import PanelHeader from './PanelHeader'
import { Link } from 'react-router-dom'

const AddPage = () => {
  return (
    <div className='w-full h-full'>
      <PanelHeader title={'Add'}/>
      <div className='w-full h-[calc(100vh-50px)] flex justify-center items-center'>
        <div className='grid grid-cols-2 gap-[30px]'>
          <Link to={"/admin/add/new-article"}>
          <button className='w-[200px] h-[50px] rounded-[4px] bg-gradient-to-t to-[#009FFF] from-[rgba(0,159,255,0.5)] text-[#fff] font-bold'>Add New Article</button>
          </Link>
          <Link to={"/admin/add/new-advertising"}>
          <button className='w-[200px] h-[50px] rounded-[4px] bg-gradient-to-t to-[#70DF4B] from-[rgba(112,223,75,.5)] text-[#fff] font-bold'>Add New Advertising</button>
          </Link>
          <Link>
          <button className='w-[200px] h-[50px] rounded-[4px] bg-gradient-to-t to-[#FF003C] from-[rgba(255,0,60,.5)] text-[#fff] font-bold'>Edit Top - 10</button>
          </Link>
          <Link>
          <button className='w-[200px] h-[50px] rounded-[4px] bg-gradient-to-t to-[#FF8F00] from-[rgba(255,143,0,.5)] text-[#fff] font-bold'>Add New AirDrop</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddPage