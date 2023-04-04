import './auth.scss';
import { Link } from 'react-router-dom'
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "../../components/loader/Loader";
 const Reset = () => {
  
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
    {isLoading && <Loader />}
      <div className='password-reset'>
        <div className="h-screen flex flex-col items-center 
          justify-center">
            <form className='pt-5' onSubmit={resetPassword}>
            <h2 className='text-center banner'>Password Reset</h2>
              <input type="email" placeholder="Email address" 
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
              <button type="submit"
                className='mb-6 mt-2 w-full px-7 py-3 bg-blue-600 text-white text-sm uppercase rounded'>
                Send New Password
              </button>
              <div className='grid grid-cols-1 lg:grid-cols-2'>
                <Link to='/login' className='text-center forgot-password pb-2'>Login</Link>
                <Link to='/register' className='text-center forgot-password pb-2'>Register</Link>
              </div>
            </form>
            <div className='container'>
              <p className='pt-5'>Once email arrives with your password, you will have 30 minutes until it expires.
              After that, you will have to request a new password.</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default Reset;