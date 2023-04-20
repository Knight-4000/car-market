import { useState } from "react";
import './auth.scss';
import login from './login.jpg';
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { GrGooglePlus } from 'react-icons/gr'
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success("Welcome Back");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Login with Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


    return (
      <>
        {isLoading && <Loader />}
        <h2 className='banner text-center mt-2'>Login</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 '>
              <img id="img-container" className='object-cover -mt-5' src={login} alt="car" style={{
                          backgroundSize: "cover",
                }}/>
              <div className='py-4'>

                <div className='form-container mb-5'>
                  <div className="outer">
                  <form onSubmit={loginUser} className='inner py-4'>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring"
                      />
                    </div>
                    <div className="password">
                      <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                        Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring"
                    />
                </div>
                <button type="submit" className="mb-6 mt-2 w-full px-7 py-3 bg-blue-600 
                    text-white font-medium text-sm uppercase rounded shadow-md 
                    hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                    active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Login
                  </button>
                  <p className="text-center">Or</p>
                  <button type="submit" style={{display: "flex", justifyContent: "center"}}
              className="bg-orange-600 inline-flex items-center px-3 py-3 font-medium 
              rounded mb-6 mt-2 w-full px-7 py-3 text-white font-medium text-sm uppercase 
              shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 
              focus:shadow-lg active:bg-orange-800 active:shadow-lg transition duration-150 
              ease-in-out" 
              onClick={signInWithGoogle}><GrGooglePlus className='google-icon' /> Sign in with Google
          </button>
                  <Link className='forgot-password'>Forgot Password?</Link>
                    <p>Don't have an account?</p><Link to="/register" className='register'>
                    Register
                </Link>
            </form>
</div>
            </div>

      </div>
    </div>

    
    </>
  );
};

export default Login;