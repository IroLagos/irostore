import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import { ImCalculator } from "react-icons/im";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GoPerson, GoSearch } from "react-icons/go";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from '../context/AuthContext';
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import axios from 'axios';
import { URL } from '../url';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  
  const { login} = useAuth();

  const [email, setEmail] = useState('')

  const [error,setError] = useState(false)

  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false);


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

  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const toggleSignIn = () => {
    setShowSignIn((prev) => !prev); // Toggle the sign-in screen visibility
  };



  return (
    <div className='relative'>
      <div className='bg-white mt-9 py-3 fixed top-0 left-0 right-0 z-40 shadow-md'>
        <div className='flex justify-between items-center px-12'>
          <div className='flex gap-x-16 uppercase'>
            <Link to={'/'}><p className='font-semibold text-lg'>Iro Lagos</p></Link>
            {/* <div className="relative">
        <p className='font-semibold text-lg cursor-pointer flex items-center gap-x-2'>Pricing<IoIosArrowDown /></p>
        {open && <div className=" bg-white px-3 py-6 w-[170px] z-50 absolute mt-4 left-1/2 transform -translate-x-1/2">
            <p onClick={() => navigate('/pricing')} className="text-[#008080] min-w-[95px] cursor-pointer flex items-center gap-x-2"><LiaFileInvoiceDollarSolid size={15} color='#008080'/>Pricing Plan</p>
            <p onClick={() => navigate('/costestimator')} className="text-[#008080] min-w-[95px] cursor-pointer flex items-center gap-x-2 mt-2"><ImCalculator size={15} color='#008080'/>Cost Estimator</p>
            </div>}
        </div> */}


            <p className='font-thin text-lg cursor-pointer'>Sales</p>
            <div className="relative">
              <p onClick={handleOpen} className='font-thin text-lg cursor-pointer'>Women</p>
              {open && <div className=" bg-white px-3 py-6 z-50 absolute mt-4 left-1/2 transform -translate-x-1/2 border">
                <div className='flex gap-x-16'>
                  <div>
                    <p onClick={() => navigate('/pricing')} className="min-w-[95px] cursor-pointer font-semibold">Clothing</p>
                    <p className='text-sm mt-2'>Bags</p>
                    <p className='text-sm mt-2'>Scarves</p>
                    <p className='text-sm mt-2 max-w-[400px]'>Hair Accessories</p>
                  </div>

                  <div>
                    <p onClick={() => navigate('/costestimator')} className="min-w-[95px] cursor-pointer font-semibold">Accessories</p>
                    <p className='text-sm'>Bags</p>
                    <p className='text-sm'>Scarves</p>
                    <p className='text-sm'>Hair Accessories</p>
                  </div>

                  <div>
                    <p onClick={() => navigate('/costestimator')} className="min-w-[95px] cursor-pointer font-semibold">Brands</p>
                    <p className='text-sm'>Bags</p>
                    <p className='text-sm'>Scarves</p>
                    <p className='text-sm'>Hair Accessories</p>
                  </div>


                </div>

              </div>}
            </div>

            <p className='font-thin text-lg cursor-pointer'>Jewelry</p>
            <p className='font-thin text-lg cursor-pointer'>Men</p>
            <p className='font-thin text-lg cursor-pointer'>Home Decorations</p>
          </div>

          <div className='flex gap-x-6'>

            <div>

              <p className='font-semibold text-2xl cursor-pointer mt-1' onClick={toggleSignIn}><GoPerson /></p>
              {showSignIn && (
                <div className='bg-white border absolute w-[450px] mt-3 right-0 px-5 py-3 z-50'>
                  <p className='mt-4 flex justify-end' onClick={toggleSignIn}><RxCross1 size={25} /></p>

                  <p className='font-medium mt-2'>SIGN IN</p>
                  <p className='mt-6'>Email Address</p>
                  <input  onChange={(e) => setEmail(e.target.value)} className='border-b border-black focus:outline-none w-full py-2' />

                  <p className='mt-6'>Password</p>
                  <div class="relative w-full">
    <div class="absolute inset-y-0 right-0 flex items-center px-2">
      {/* <input class="hidden js-password-toggle" id="toggle" type="checkbox" /> */}
      <p onClick={togglePasswordVisibility} className=" px-2 py-1 text-xl font-mono cursor-pointer text-gray-400" for="toggle">{isPasswordVisible ? (<RiEyeLine />):(<RiEyeOffLine />)}</p>
    </div>
    <input onChange={(e) => setPassword(e.target.value)} className="border-b border-black focus:outline-none w-full py-2 " type={isPasswordVisible ? "text" : "password"} autocomplete="off"
    />

  </div>


                  <div className='mt-9'>
                    <button onClick={handleSubmit} className='bg-[#5b3e31] w-full text-white px-9 py-2 rounded-full'>{isLoading ? "Loading..." : "LOGIN"}</button>
                  </div>

                  <div className='mt-9'>
                    <button className='border-2 border-black w-full px-9 py-2 rounded-full'>SIGN UP </button>
                  </div>

                  <div className='mb-16'></div>
                </div>
              )}
            </div>


            <p onClick={() => navigate('/search')} className='font-semibold text-2xl cursor-pointer mt-1'><GoSearch /></p>
         
            <p className='font-semibold text-2xl cursor-pointer mt-1'><PiShoppingBagOpenLight /></p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Navbar