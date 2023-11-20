import React from 'react'
import { useState } from "react";
import { SignUp } from "../interface";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import GoogleLogin from '../helper/GoogleLogin';

export default function Signup() {
    const router = useNavigate();
    const [signinInp, setsigninInp] = useState<SignUp>({
        name: '',
        email: '',
        mobile: '',
        password: '',
        code: '',
    })

    const [otpSubmit, setotpSubmit] = useState<Boolean>(false);

    const signupBeforeOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(signinInp.name, signinInp.email, signinInp.mobile, signinInp.password)
        if (signinInp.name !== '' && signinInp.email !== '' && signinInp.mobile !== '' && signinInp.password !== '') {
            setotpSubmit(true);
            await fetch(`${process.env.REACT_APP_BACKENDURL}/users/registerOtp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signinInp)
            }).then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.message);
                    }
                    else if (res.status === 404) {
                        toast.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            toast.error('Please Fill the data properly');
        }
    }

    const signupAfterOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(signinInp.code)
        if (signinInp.code !== '') {
            await fetch(`${process.env.REACT_APP_BACKENDURL}/users/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signinInp)
            }).then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.message);
                        router("/");
                    }
                    else if (res.status === 404) {
                        toast.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            toast.error('Please Enter a OTP Properly');
        }

    }

    return (

        <div className="flex min-h-screen">
            <div className="2xl:w-2/3 xl:w-2/3 lg:w-2/3 min-h-screen hidden md:block">
                <img src={require('../assets/img/login.webp')} className="login-img" alt="LoginImg" />
            </div>
            <div className="2xl:w-1/3 xl:w-1/3 lg:w-1/3 w-full">
                <div className="flex flex-col justify-between min-h-screen">
                    <main className="flex flex-col items-center justify-between p-1">
                        <div className="login-part w-full p-8">
                            <h1 className="text-3xl font-bold text-primary mb-6">Sign Up</h1>

                            {
                                otpSubmit ? null :
                                    <>
                                        <form onSubmit={signupBeforeOtp}>
                                            <div className="mb-5">
                                                <input type="text" className="form-control" placeholder='Name' name='name' required onChange={(e) => setsigninInp({ ...signinInp, name: e.target.value })} />
                                            </div>
                                            <div className="mb-5">
                                                <input type="email" className="form-control" placeholder='Email' name='email' required onChange={(e) => setsigninInp({ ...signinInp, email: e.target.value })} />
                                            </div>
                                            <div className="mb-5">
                                                <input type="number" className="form-control" placeholder='Mobile' name='mobile' required onChange={(e) => setsigninInp({ ...signinInp, mobile: e.target.value })} pattern="[1-9]{1}[0-9]{9}" />
                                            </div>
                                            <div className="mb-5">
                                                <input type="text" required placeholder='Password' onChange={(e) => setsigninInp({ ...signinInp, password: e.target.value })} className="form-control" name='password' />
                                            </div>

                                            <button className="btn-primary">Send OTP</button>

                                        </form>

                                        <div className="flex items-center gap-2 mb-4 mt-4">
                                            <span className="w-[50%] h-[1px] border-b border-gray-150" />
                                            <span className="text-sm">OR</span>
                                            <span className="w-[50%] h-[1px] border-b border-gray-150" />
                                        </div>


                                        <div className='w-full'>
                                            <GoogleLogin/>

                                        </div>
                                    </>
                            }


                            {
                                otpSubmit ?
                                    <form onSubmit={signupAfterOtp}>
                                        <div className="">A OTP has been sent to {signinInp.email} ans submit OTP code below to verify your account.</div>
                                        <div className="mb-5 mt-3">
                                            <input type="number" className="form-control" placeholder='OTP' name='code' onChange={(e) => setsigninInp({ ...signinInp, code: e.target.value })} />
                                        </div>

                                        <button className="btn-primary">Submit OTP</button>
                                    </form>
                                    : null
                            }




                        </div>
                    </main>

                    <div className="footer-login-form border-t border-gray-300 p-4">
                        <div className="text-center text-sm">
                            Already have a account? <a className="link" href="/login">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
