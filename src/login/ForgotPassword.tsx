import React from 'react'
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";


export default function ForgotPassword() {
    const router = useNavigate();
    const [forgetpassInp, setforgetpassInp] = useState({
        email: '',
        password: '',
        code: '',
    })

    const [otpSubmit, setotpSubmit] = useState<Boolean>(false);

    const forgotPassBeforeOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (forgetpassInp.email !== '' && forgetpassInp.password !== '') {
            setotpSubmit(true);
            await fetch(`${process.env.REACT_APP_BACKENDURL}/users/emailsendotp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forgetpassInp)
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                    }
                    else if (res.status === 400) {
                        toast.error(res.message);
                    }
                    else if (res.status === 301) {
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
    const forgotPassAfterOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(forgetpassInp.code)
        if (forgetpassInp.code !== '') {
            await fetch(`${process.env.REACT_APP_BACKENDURL}/users/changepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forgetpassInp)
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        router("/");
                    }
                    else if (res.status === 404) {
                        toast.error(res.message);
                    }
                    else if (res.status === 301) {
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
        //   <main className="flex min-h-screen flex-col items-center justify-between p-8">
        //       <div className="login-part border border-gray-600 w-full rounded-lg p-8">
        //           Forgot Password

        //           {
        //               otpSubmit ? null :
        //                   <form onSubmit={forgotPassBeforeOtp}>

        //                       <div className="mb-3">
        //                           <label htmlFor="email" className="form-label">Email</label>
        //                           <input type="email" className="form-control" name='email' required onChange={(e) => setforgetpassInp({ ...forgetpassInp, email: e.target.value })} />
        //                       </div>
        //                       <div className="mb-3">
        //                           <label htmlFor="password" className="form-label">New Password</label>
        //                           <input type="text" required onChange={(e) => setforgetpassInp({ ...forgetpassInp, password: e.target.value })} className="form-control" name='password' />
        //                       </div>

        //                       <button className="btn">Submit</button>

        //                   </form>
        //           }

        //           {
        //               otpSubmit ?
        //                   <form onSubmit={forgotPassAfterOtp}>
        //                       <div className="">A OTP is send to {forgetpassInp.email}</div>
        //                       <div className="mb-3 mt-3">
        //                           <label htmlFor="code" className="form-label">OTP</label>
        //                           <input type="number" className="form-control" name='code' onChange={(e) => setforgetpassInp({ ...forgetpassInp, code: e.target.value })} />
        //                       </div>

        //                       <button className="btn">Submit OTP</button>
        //                   </form>
        //                   : null
        //           }


        //       </div>
        //   </main>

        <div className="flex min-h-screen">
            <div className="2xl:w-2/3 xl:w-2/3 lg:w-2/3 min-h-screen hidden md:block">
                <img src={require('../assets/img/login.webp')} className="login-img" alt="LoginImg" />
            </div>
            <div className="2xl:w-1/3 xl:w-1/3 lg:w-1/3 w-full">
                <div className="flex flex-col justify-between min-h-screen">
                    <main className="flex flex-col items-center justify-between p-1">
                        <div className="login-part w-full p-8">
                            <h1 className="text-3xl font-bold text-primary mb-6">Forgot Password</h1>

                            {
                                otpSubmit ? null :
                                    <form onSubmit={forgotPassBeforeOtp}>

                                        <div className="mb-5">
                                            <input type="email" className="form-control" name='email' placeholder='Email' required onChange={(e) => setforgetpassInp({ ...forgetpassInp, email: e.target.value })} />
                                        </div>
                                        <div className="mb-5">
                                            <input type="text" placeholder='New Password' required onChange={(e) => setforgetpassInp({ ...forgetpassInp, password: e.target.value })} className="form-control" name='password' />
                                        </div>

                                        <div className="mb-2">
                                            <button className="btn-primary">Submit</button>
                                        </div>

                                    </form>
                            }

                            {
                                otpSubmit ?
                                    <form onSubmit={forgotPassAfterOtp}>
                                        <div className="">A OTP has been sent to {forgetpassInp.email} ans submit OTP code below to verify your account.</div>
                                        <div className="mb-5 mt-3">
                                            <input type="number" placeholder='OTP' className="form-control" name='code' onChange={(e) => setforgetpassInp({ ...forgetpassInp, code: e.target.value })} />
                                        </div>

                                        <button className="btn-primary">Submit OTP</button>
                                    </form>
                                    : null
                            }
                        </div>
                    </main>

                    <div className="footer-login-form border-t border-gray-300 p-4">
                        <div className="text-center text-sm">
                            Don't have an account? <Link className="link" to="/signup">Sign UP</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
