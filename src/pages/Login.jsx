import React, { useState, useContext } from 'react'
import { SlGlobe } from "react-icons/sl";
// import logo from "../assets/LOGO-BLACK1.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from "../url"
// import PhoneInput from 'react-phone-number-input';
// import  'react-phone-number-input/style.css'
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useAuth } from '../context/AuthContext';
// import amico from '../assets/amico.png'



const Login = () => {

  const { login} = useAuth();

  const [email, setEmail] = useState('')

  const [error,setError] = useState(false)

  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }



  const handleSubmit = async() => {
    //e.preventDefault()



    setIsLoading(true)
    try{
      const res = await axios.post(URL+"/api/auth/login", {email,password})

      const {accessToken, user} = res.data;

      if(res.status == 200){
        localStorage.setItem("access_token", accessToken)
        // localStorage.setItem("currentUser", JSON.stringify(res.data))
        login(user)
        setError(false)
        console.log(res.data)
        navigate("/")
      }

    }
    catch(err) {
      setError(true)
      console.log(err)
    } finally {
      setIsLoading(false)
    }

}






  return (
    <div className='font-nunito'>
    <div className='flex justify-center '>

    {/* h-[100vh] */}


{/* <img src={amico} className='pt-32' /> */}

        <div className='rounded-lg px-[180px] py-[40px] relative pt-[75px]'>
        {/* <img src={logo} alt='' className='mx-auto'/> */}

        <p className='text-center font-semibold text-3xl mt-3'>Login To Your Account</p>
 
      
        <p className='pt-6'>Email</p>
        <input onChange={(e) => setEmail(e.target.value)} className='border border-[#D7D7D7] w-full md:w-[450px] py-2 px-3 rounded-lg hover:border-blue-400' />

       

        <p className='pt-5'>Password</p>

        <div class="relative w-full md:w-[450px]">
    <div class="absolute inset-y-0 right-0 flex items-center px-2">
      {/* <input class="hidden js-password-toggle" id="toggle" type="checkbox" /> */}
      <label onClick={togglePasswordVisibility} className=" px-2 py-1 text-xl font-mono cursor-pointer text-gray-400" for="toggle">{isPasswordVisible ? (<RiEyeLine />):(<RiEyeOffLine />)}</label>
    </div>
    <input onChange={(e) => setPassword(e.target.value)} className="border rounded-lg w-full md:w-[450px] py-2 px-3 leading-tight hover:border-blue-400 pr-16 font-mono " type={isPasswordVisible ? "text" : "password"} autocomplete="off"
    />

  </div>

  <div className='flex justify-between'>
    <p className='text-white'>Forgot Password</p>
    <Link to={'/forgotpassword'}><p className='text-blue-400'>Forgot Password</p></Link>
    </div>

       



        <div>
        {/* <p className='text-gray-600 text-sm text-center mt-4'>By clicking sign up, you agree to our <span className='text-[#F08E1F]'>terms and data policy</span></p> */}
        <button onClick={handleSubmit}  className='bg-[#F7F7F7] text-[#98999A] w-full md:w-[450px] py-2 rounded-2xl mt-6 hover:bg-blue-400 hover:text-white'>{isLoading ? "Loading..." : "Login"}</button>
        {error && <h3 className='text-red-500 text-lg text-center'>Something went wrong</h3>}
        </div>
        <p className='pt-3 text-center text-[#98999A]'>Don't have an account?   <Link to={'/register'}><span className='text-blue-400 ml-3'>Create an account</span></Link></p>
        </div>

    </div>
    <div className='flex justify-between mb-12 '>
    <p className='px-6 text-[#6A6B6C]'>Privacy Policy</p>
    <p className='px-6 text-[#6A6B6C]'>All Rights Reserved © 2024</p>
    </div>
</div>
  )
}

export default Login