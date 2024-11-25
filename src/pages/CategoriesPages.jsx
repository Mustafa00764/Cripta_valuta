import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'

const CategoriesPages = () => {
  const {categories,categoryName,setCategoryName,handleRestore} = useContext(AdminContext)

  useEffect(()=>{
    handleRestore()
  },[])

  return (
    <div>

    </div>
  )
}

export default CategoriesPages