
import UserLayout from './layouts/UserLayout'
import AdminPanel from './admin/AdminPanel'
import { Route, Routes } from 'react-router-dom'
const App = () => {

  return (
    <div className='w-[100%] h-[100%] bg-pageMode transition-all'>
      <Routes>
        <Route path='/*' element={<UserLayout/>}/>
        <Route path='/admin/*' element={<AdminPanel/>}/>
      </Routes>
      
    </div>
  )
}

export default App
