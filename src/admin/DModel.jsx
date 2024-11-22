import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import api from '../components/axiosRefresh.js'

const DModel = () => {
  const {setCategory,category,handleRestore,model,setModel,setDeleteModel,deleteModel} = useContext(AdminContext)

  const handleSubmite = async()=>{

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      alert("Вы не авторизованы!");
      return;
    }
    
    try {
      const CID = category.id
      const response = await api.delete(`/categories/${CID}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={deleteModel?'w-full h-full absolute top-0 left-0 flex justify-center transition-all bg-[rgba(0,0,0,.5)] items-center z-[25] opacity-[1]':'w-full h-full absolute top-0 left-0 flex justify-center transition-all bg-[rgba(0,0,0,.5)] items-center -z-10 opacity-0'}>
      <div className='max-w-[1024px] w-full h-auto p-6 bg-bgMode rounded-[15px] '>
        <p className='text-[32px] leading-[48px] font-semibold text-center'>Вы уверены, что хотите удалить эту категорию?</p>
        <div className='w-full flex justify-between items-center'>
          <button className='mt-4 px-4 py-2 bg-red-500 text-white' onClick={()=>handleSubmite()}>
            Delete
          </button>
          <button className='mt-4 px-4 py-2 bg-blue-500 text-white' onClick={()=>setDeleteModel(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DModel