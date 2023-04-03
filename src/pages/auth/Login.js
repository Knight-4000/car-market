import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from './login.jpg';
import './auth.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { GrGooglePlus } from 'react-icons/gr'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from '../../components/loader/Loader';

export default function Login() {
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState (false);

  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    setIsLoading(false)
    toast.success("Welcome back...")
    navigate("/")
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });

  }
  const togglePassword = () => {
    setShowPassword(!showPassword)
  };

  const handleShowInstructions = () => {
    setShowInstructions(true)
  };

  const [showInstructions, setShowInstructions] = useState (false);

    return (
    <> 
    {isLoading && <Loader />}
      <h2 className='banner text-center mt-2'>Login</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 '>
          <img id="img-container" className='object-cover' src={login} alt="car" style={{
                      backgroundSize: "cover",
            }}/>
            <div className='form-container py-4'>
              <div className='outer'> 
                <form onSubmit={loginUser} className='form-control inner py-2'>   
                  <div className="mb-1">
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                       Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring"
                    />
                  </div>
                  <div className="mb-1 password">
                   <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                     Password
                   </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onFocus={handleShowInstructions}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring"
                    />
                <span className='icon' onClick={togglePassword}>
                     {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
                  </div>
                   <button type="submit" className="mb-6 mt-2 w-full px-7 py-3 bg-blue-600 
                    text-white font-medium text-sm uppercase rounded shadow-md 
                    hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                    active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Login
                  </button>
                  <button style={{display: "flex", justifyContent: "center"}} type="submit" 
                    className="bg-orange-600 inline-flex items-center px-3 py-3 font-medium 
                    rounded mb-6 mt-2 w-full px-7 py-3 text-white font-medium text-sm uppercase 
                    shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 
                    focus:shadow-lg active:bg-orange-800 active:shadow-lg transition duration-150 
                    ease-in-out"><GrGooglePlus className='google-icon' /> Sign in with Google
                  </button>
                  <Link className='forgot-password'>Forgot Password?</Link>
                    <p>Don't have an account?</p><Link to="/register" className='register'>
                    Register
                </Link>
              </form>
            </div>
          </div>
       </div>  
 
    </>
  )
}
