import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './login/Login';
import Signup from './login/Signup';
import ForgotPassword from './login/ForgotPassword';
import Welcome from './webapp/Welcome';
import AddService from './webapp/service/AddService';
import ListService from './webapp/service/ListService';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { userTokenData } from './interface';
import { useNavigate } from "react-router-dom";

import Notification from './Notification';

import ProtectedRoute from './helper/ProtectedRoute';
import Error from './Error';
import Installation from './webapp/installation/Installation';
// export const ProtectRoute: React.FC = ({children}) => {
//   const token = window.localStorage.getItem("usertoken");
//   if(token){

//   }
// }
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function App() {
  const navigate = useNavigate();
  const [isAuth, setisAuth] = useState<boolean>(false);
  const location = useLocation();
  const [tokenValue, settokenValue] = useState<string | null>();

  const token = localStorage.getItem('usertoken');

  useEffect(() => {
    
    console.log(token)
    settokenValue(token);
    if(token){
      setisAuth(true);
      navigate('/welcome');
    }

  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/n' element={<Notification />} />

        {/* <Route path='/welcome' element={<Welcome />} />
          <Route path='/welcome/service/:id' element={<AddService />} />
          <Route path='/welcome/list-service/:id' element={<ListService />} /> */}

        <Route element={<ProtectedRoute auth={isAuth && isAuth} />} >
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/welcome/service/:id' element={<AddService />} />
          <Route path='/welcome/list-service/:id' element={<ListService />} />
          <Route path='/welcome/installation/:id' element={<Installation />} />
        </Route>

      </Routes>
    </>
  )
}
