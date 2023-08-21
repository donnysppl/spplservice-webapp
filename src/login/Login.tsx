
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';
import GoogleLogin from "../helper/GoogleLogin";
// import LoginImg as img from '../assets/img/login.webp';

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// interface GoogleRes {
//   credential:string;
// }

export default function Login() {
  const [loginInp, setloginInp] = useState({
    email: '',
    password: ''
  });
  console.log(process.env.REACT_APP_BACKENDURL)

  // const handleCallbackResponse = (res: GoogleRes) => {
  //   console.log(res);
  // }

  // useEffect(() => {
  //   if (window) {
  //     console.log(window.google)
  //     window.google.accounts.id.initialize({
  //       client_id: "681780806935-6nqlr33qj76q7tbddm9hqtific736eon.apps.googleusercontent.com",
  //       callback: handleCallbackResponse
  //     });

  //     window.google.accounts.id.renderButton(
  //       window.document.getElementById("signInDiv"),
  //       { theme: "outline", size: "large", width: window.document.getElementById("signInDiv")?.clientWidth, height: 48, shape: "pill"}
  //     );
  //     window.google.accounts.id.prompt();
  //   }

  // }, [])


  const loginBeforeOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_BACKENDURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInp)
    }).then(res => res.json())
      .then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
          localStorage.setItem('usertoken', res.data.token);
          toast.success(res.data.message);
          // navigate('/welcome');
          window.location.href = '/welcome';
        }
        else if (res.data.status === 404) {
          toast.error(res.data.message);
        }
        else if (res.data.status === 401) {
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const onGoogleLogin = () => {

  }
  return (
    <>
      <div className="flex min-h-screen">
        <div className="2xl:w-2/3 xl:w-2/3 lg:w-2/3 min-h-screen hidden md:block transition ease-in">
          <img src={require('../assets/img/login.webp')} className="login-img" alt="LoginImg" />
        </div>
        <div className="2xl:w-1/3 xl:w-1/3 lg:w-1/3 w-full transition ease-in">
          <div className="flex flex-col justify-between min-h-screen">
            <main className="flex flex-col items-center justify-between p-1">
              <div className="login-part w-full p-8">
                <h1 className="text-3xl font-bold text-primary mb-6">Login part</h1>

                <form onSubmit={loginBeforeOtp}>

                  <div className="mb-5">
                    <input type="email" className="form-control" name='email' required onChange={(e) => setloginInp({ ...loginInp, email: e.target.value })} placeholder="Email" />
                  </div>
                  <div className="mb-5">
                    <input type="text" required onChange={(e) => setloginInp({ ...loginInp, password: e.target.value })} className="form-control" name='password' placeholder="Password" />
                  </div>
                  <div className="mb-2">
                    <button className="btn-primary">Submit</button>
                  </div>
                  <div className="text-sm mb-3 text-center">
                    Can't Login? <Link className="link" to="/forgot-password">Forgot Password</Link>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-[50%] h-[1px] border-b border-gray-150" />
                    <span className="text-sm">OR</span>
                    <span className="w-[50%] h-[1px] border-b border-gray-150" />
                  </div>

                  <div onClick={onGoogleLogin}>
                    {/* <button className="google-btn">
                      <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" ><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                      <span className="text-base font-semibold">Sign in with Google</span>
                    </button> */}

                    <div className="text-center w-full">
                      <GoogleLogin/>
                    </div>



                  </div>

                </form>
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

    </>
  )
}