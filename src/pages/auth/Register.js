import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import register from './register.jpg';
import './auth.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { GoPrimitiveDot } from "react-icons/go"
import { FaCheck } from "react-icons/fa"

export default function Regisiter({onLogin, onReset}) {
  const [showPassword, setShowPassword] = useState (false);
  const [showInstructions, setShowInstructions] = useState (false);

  // Password Strength State
  const [pass, setPass] = useState("");
  const [passLetter, setPassLetter] = useState("");
  const [passNumber, setPassNumber] = useState(false);
  const [passChar, setPassChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passComplete, setPassComplete] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword)
  };

  const handleShowInstructions = () => {
    setShowInstructions(true)
  };

  const handlePasswordChange = (e) => {
    setPass(e.target.value)
  };

  // Password Strength UseEffect

  useEffect(() => {
    if (pass.match (/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setPassLetter(true)
    } else {
      setPassLetter(false)
    }

    if (pass.match(/([0-9])/)) {
      setPassNumber(true)
    } else {
      setPassNumber(false)
    }

    if (pass.match(/([!,%,&,@,$,^,*,?,_,`])/)) {
      setPassChar(true)
    } else {
      setPassChar(false)
    }

    if(pass.length > 7) {
      setPassLength(true)
    } else {
      setPassLength(false)
    }

    if (passLetter && passNumber && passChar && passLength) {
      setPassComplete(true)
    } else {
      setPassComplete(false)
    }
  }, [pass, passLetter, passNumber, passChar, passLength])
  return (
    <>
    <h2 className='banner text-center mt-2'>Register</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <img id="img-container" className='object-cover' src={register} alt="car" style={{
                  backgroundSize: "cover",
          }}/>
        <div className='form-container py-4'>
          <div className='outer'>
            <form className='form-control inner py-4'>
                <div className="mb-1">
                  <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
                    Full Name
                  </label>
                  <input
                   type="text"
                   name="user_name"
                   placeholder="John Doe"
                   className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring"
                  />
                </div>
                <div className="mb-1">
                 <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                    Email Address
                 </label>
                  <input
                    type="email"
                    name='user_email'
                    placeholder="Email"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring"
                  />
                </div>
                <div className="mb-1 password">
                 <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                    Password
                 </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='user_password'
                    placeholder="Password"
                    onFocus={handleShowInstructions}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring"
                    value={pass}
                    onChange={handlePasswordChange}
                  />
                  <span className='icon' onClick={togglePassword}>
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
                  </span>
                </div>
                <button disabled={!passComplete} type="submit"
                className={passComplete ? "mb-6 mt-2 w-full px-7 py-3 bg-blue-600 text-white text-sm uppercase rounded" :
                "mb-6 mt-2 w-full px-7 py-3 bg-gray-500 disabled text-white text-sm uppercase rounded"}
                >Sign Up</button>
                  <Link to='/reset' className='forgot-password'>Forgot Password?</Link>
                    <p>Already have an account?</p><Link to="/login" className='register'>
                    Login
                </Link>
                {/* Password Strength */}

              <div className={showInstructions ? "show-hints" : "hide-hints"}>
                <div className='reasons-list bg-gray-200 py-2'>
                  <ul className='list-none'>
                  <p>Password Strength</p>
                  <li className={passLetter ? "pass-check" : "fail-red"}>
                    <span className='inline-flex'>
                      {passLetter ? <FaCheck /> : <GoPrimitiveDot />}
                      <p>Lowercase & Uppercase</p>
                    </span>
                  </li>
                    <li className={passNumber ? "pass-check" : "fail-red"}>
                      <span className='inline-flex'>
                      {passNumber ? <FaCheck /> : <GoPrimitiveDot />}
                        <p>Numbers 0-9</p>
                      </span>
                    </li>
                    <li className={passChar ? "pass-check" : "fail-red"}>
                      <span className='inline-flex'>
                      {passChar ? <FaCheck /> : <GoPrimitiveDot />}
                        <p>Special characters (!@#$%)</p>
                      </span>
                    </li>
                    <li className={passLength ? "pass-check" : "fail-red"}>
                      <span className='inline-flex'>
                      {passLength ? <FaCheck /> : <GoPrimitiveDot />}
                        <p>At least 8 characters</p>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
