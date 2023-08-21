import React from 'react'
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { userTokenData } from "../interface";
import { Link } from "react-router-dom";

export default function Welcome() {
  const [userToken, setuserToken] = useState<userTokenData | undefined>(undefined);

  const userData = window.localStorage.getItem('usertoken');
  const userimg = window.localStorage.getItem('userimg');


  useEffect(() => {
    // const userData = window.localStorage.getItem('usertoken');
    console.log(userData)

    const token = userData || '';
    const decoded = jwt_decode(token as string);
    setuserToken(decoded as userTokenData);
  }, [])


  const onLogout = () => {
    window.localStorage.clear();
    window.location.href="/";
  }


  return (
    <>
      {
        !userToken ? 'Loading...' :
          <>
            <div className='container mx-auto'>


              <div className=" text-white vector-bg h-[120px] p-5 flex justify-between items-center">
                <div className='text-2xl font-light leading-7'>
                  Welcome Back,<br />
                  <span className="font-bold text-3xl"> {userToken && userToken.name}</span>
                </div>
                <div className="user-icon hs-dropdown relative inline-flex [--placement:bottom-right">
                  {
                    userimg && userimg  ?
                    <img className=" hs-dropdown-toggle svg-icon w-10 h-10 rounded-full" src={userimg && userimg} alt="userimg && userimg" /> :
                    <svg id="hs-dropdown" type="button" className=" hs-dropdown-toggle svg-icon w-10 h-10 text-white border border-gray-200 rounded-full" fill='#ffffff' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" /></svg>
                  }
                  

                  <div className="hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-primary shadow-md rounded-lg p-2 border border-secondary" aria-labelledby="hs-dropdown">
                    <div onClick={onLogout} className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-secondary hover:text-primary focus:ring-2 focus:ring-blue-500">
                      Logout
                    </div>
                    
                  </div>

                </div>

              </div>
              <div className='p-5 pt-6 bg-white'>
                <h2 className='text-xl font-bold text-primary mb-2'>Quick Action</h2>
                <div className="p-2 card-wrap">

                  <Link className="px-8 py-10 bg-secondary rounded-xl card" to={`/welcome/service/${userToken && userToken.id}`}>
                    <div className="card-img mb-2">
                      <img src={require('../assets/img/service.webp')} className='w-[150px] mx-auto object-contain object-center' alt="service" />
                    </div>
                    <div className="card-text text-center text-lg text-gray-900">
                      Services
                    </div>
                  </Link>

                  <Link className="px-8 py-10 bg-primary rounded-xl card" to={`/welcome/installation/${userToken && userToken.id}`}>
                    <div className="card-img mb-2">
                      <img src={require('../assets/img/installationa.webp')} className='w-[150px] mx-auto object-contain object-center' alt="service" />
                    </div>
                    <div className="card-text text-center text-lg text-gray-200">
                      Installation
                    </div>
                  </Link>

                  <Link className="px-8 py-10 bg-primary rounded-xl card" to='https://shopsppl.in/'>
                    <div className="card-img mb-2">
                      <img src={require('../assets/img/service.webp')} className='w-[150px] mx-auto object-contain object-center' alt="service" />
                    </div>
                    <div className="card-text text-center text-lg text-gray-200">
                      Information
                    </div>
                  </Link>

                </div>
              </div>
            </div>
          </>

      }

    </>
  )
}
