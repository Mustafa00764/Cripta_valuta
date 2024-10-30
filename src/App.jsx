import { useEffect, useState } from 'react'
import UserLayout from './layouts/UserLayout'
import AdminPanel from './admin/AdminPanel'
import { Route, Router, Routes } from 'react-router-dom'
const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className='w-[100%] h-[100%] bg-pageMode transition-all'>
      <Routes>
        <Route path='*' element={<UserLayout/>}/>
        <Route path='/admin/*' element={<AdminPanel/>}/>
      </Routes>
      
    </div>
  )
}

export default App
