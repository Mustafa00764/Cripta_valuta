import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'

const CategoriesPages = () => {
  const {categories,categoryName,setCategoryName,handleRestore} = useContext(AdminContext)

  useEffect(()=>{
    handleRestore()
  },[categories])

  return (
    <div>
      <p>{categoryName}</p>
    </div>
  )
}

export default CategoriesPages