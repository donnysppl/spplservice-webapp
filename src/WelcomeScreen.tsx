import React from 'react'

export default function WelcomeScreen() {
    return (
        <div className='vector-bg w-full min-h-screen flex items-end '>
            <div className="container mx-auto ">
                <div className='lg:w-[40%] md:w-[50%] sm:w-[50%] w-full mx-auto h-[100vh] welcome-bg-abstarct flex items-center justify-center flex-col'>

                    <div className="logo-part h-[40vh] p-5">
                        <img src={require('./assets/img/logo-light.png')} className="w-[125px] mx-auto mb-2" alt="LoginImg" />
                        <h1 className='text-center text-secondary text-lg font-bold'>Super Plastronics Pvt Ltd.</h1>
                    </div>
                    <div className="img-btn-part h-[60vh] p-5 flex flex-col justify-end mb-5 gap-4">
                        <img src={require('./assets/img/welcome-img.webp')} className="w-[75%] mx-auto" alt="LoginImg" />
                        <a className='w-full' href="/login"><button className='btn-primary'>Get Started</button></a>
                    </div>
                </div>

            </div>

        </div>
    )
}
