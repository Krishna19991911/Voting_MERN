import React from 'react'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import './index.css'
import Layout from './Layout'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Profile from './components/profile/Profile'
import Votingpage from './components/votingpage/Votingpage'
import AddCandidate from './components/addCandidate/AddCandidate'
import {AuthProvider} from './components/contextAPI/AuthContext'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path ='' element={<Home/>}/>
      <Route path ='user/login' element={<Login/>}/>
      <Route path ='user/register' element={<Signup/>}/>
      <Route path ='user/profile'
      element={<Profile/>}/>
      <Route path ='user/vote'
      element={<Votingpage/>}/>
      <Route path ='admin/addCandidate'
      element={<AddCandidate/>}/>

    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
<RouterProvider router={router} />
</AuthProvider>
  </React.StrictMode>,
)
