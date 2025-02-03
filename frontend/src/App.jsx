import React from 'react'
import {Route, Routes} from 'react-router-dom'
import UserLogin from './components/UserLogin'
import UserSignup from './components/UserSignup'
import HomePage from './components/HomePage'
import UserLogout from './components/UserLogout'
import AdminDashboard from './components/AdminDashboard'
import EditorDashboard from './components/EditorDashboard'
import ViewerDashboard from './components/ViewerDashboard'
import UserProtectWrapper from './components/UserProtectWrapper'
import RoleProtectWrapper from './components/RoleProtectWrapper'

const App = () => {
  return (
<div>
  <Routes>
  <Route path="/login" element={<UserLogin/>} />
  <Route path="/register" element={<UserSignup/>} />
  <Route path="/logout" element={<UserLogout/>} />
  <Route path="/home" element={<HomePage/>} />
  <Route path="/admin-dashboard" element={
  <UserProtectWrapper>
    <RoleProtectWrapper allowedRoles={['admin']}> 
  <AdminDashboard/>
  </RoleProtectWrapper>
  </UserProtectWrapper>

  } />
  
  
  <Route path="/editor-dashboard" element={
  <UserProtectWrapper>
    <RoleProtectWrapper allowedRoles={['editor']}> 
 <EditorDashboard/>
 </RoleProtectWrapper>
  </UserProtectWrapper>
 } />

  <Route path="/viewer-dashboard" element={
    <UserProtectWrapper>
      <RoleProtectWrapper allowedRoles={['viewer']}> 
    <ViewerDashboard/> 
    </RoleProtectWrapper> 
    </UserProtectWrapper>

  } />
    </Routes> 
</div>
  )
}

export default App
