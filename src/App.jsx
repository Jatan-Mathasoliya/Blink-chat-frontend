import { useEffect, useState } from 'react'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Profile from './pages/profile'
import Chat from './pages/chat'
import { useAppStore } from './store'
import apiClient from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'
import RefinedEyeLoader from './EyeLoader'

const PrivateRoute = ({children})=>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoute = ({children})=>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
}

export default function App() {

const { userInfo, setUserInfo} = useAppStore();
const [loading, setloading] = useState(true)

useEffect(()=>{
  const getUserData = async ()=>{
    try{
const response = await apiClient.get(GET_USER_INFO,{
  withCredentials: true,
});
if(response.status === 200 && response.data.id){
  setUserInfo(response.data)
}else{
  setUserInfo(undefined)
}
console.log({response})
    }catch(err){
      console.log({err})
      setUserInfo(undefined)
    }finally{
      setloading(false)
    }
  }
    if(!userInfo){
      getUserData();
    }
    else{
      setloading(false)
    }
  
},[userInfo, setUserInfo])

if(loading){
  return (
    <RefinedEyeLoader />
  )
}

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/auth" element={<AuthRoute><Auth/></AuthRoute>} />
    <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />

    <Route path='*' element={<Navigate to="/auth"/>} />
  </Routes>
  </BrowserRouter>
  )
}
