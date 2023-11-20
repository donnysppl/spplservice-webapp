
import {useState } from "react";
import toast from "react-hot-toast";
import { Link} from "react-router-dom";
import '../App.css';
import GoogleLogin from "../helper/GoogleLogin";

export default function Login() {
  const [loginInp, setloginInp] = useState({
    email: '',
    password: ''
  });

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
        if (res.data.status === 200) {
          localStorage.setItem('usertoken', res.data.token);
          toast.success(res.data.message);
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

                    <div className="text-center w-full">
                      <GoogleLogin/>
                    </div>



                  </div>

                </form>
              </div>
            </main>

            <div className="footer-login-form border-t border-gray-300 p-4">
              <div className="text-center text-sm">
                Don't have an account? <a className="link" href="/signup">Sign UP</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}