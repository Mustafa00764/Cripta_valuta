
import UserLayout from './layouts/UserLayout'
import AdminPanel from './admin/AdminPanel'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
