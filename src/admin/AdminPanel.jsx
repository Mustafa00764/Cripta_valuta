import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import DashboardPage from './DashboardPage'
import { AdminContext } from '../context/AdminContext'
import { Route, Routes } from 'react-router-dom'
import AddPage from './AddPage'
import AddArticlePage from './AddArticlePage'
import DemoCard from './DemoCard'
import ArticleDemo from './ArticleDemo'
import AddAdvertisingPage from './AddAdvertisingPage'
import AdminDashboard from './AdminDashboard'
import UsersDashboard from './UsersDashboard'
import AuthorsDashboard from './AuthorsDashboard'
import StatisticPage from './StatisticPage'
import CategoriesPage from './CategoriesPage'
import EditArticlePage from './EditArticlePage'
import AddAirdropPage from './AddAirdropPage'
import AirdropDashboard from './AirdropDashboard'

const AdminPanel = () => {
  const {theme} = useContext(AdminContext)
  return (
    <div className={`relative w-full min-h-screen h-auto flex bg-pageMode transition-all`}>
      <div className='max-w-[60px] hover:max-w-[320px] transition-all w-full overflow-auto fixed z-[2]'>
        <Sidebar/>
      </div>
      <div className='pl-[60px] w-full'>
        <Routes>
          <Route path='dashboard' element={<DashboardPage/>}/>
          <Route path='add' element={<AddPage/>}/>
          <Route path='add/new-article' element={<AddArticlePage/>}/>
          <Route path='add/new-article/demo' element={<ArticleDemo/>}/>
          <Route path='add/new-advertising' element={<AddAdvertisingPage/>}/>
          <Route path='admins' element={<AdminDashboard/>}/>
          <Route path='users' element={<UsersDashboard/>}/>
          <Route path='authors' element={<AuthorsDashboard/>}/>
          <Route path='statistic' element={<StatisticPage/>}/>
          <Route path='categories' element={<CategoriesPage/>}/>
          <Route path='editarticle/:id' element={<EditArticlePage />} />
          <Route path='add/airdrop' element={<AddAirdropPage />} />
          <Route path='airdrops' element={<AirdropDashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminPanel
