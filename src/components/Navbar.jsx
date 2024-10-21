// import React, { useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { IoIosArrowDown } from "react-icons/io";
// import { ImCalculator } from "react-icons/im";
// import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
// import { GoPerson, GoSearch } from "react-icons/go";
// import { PiShoppingBagOpenLight } from "react-icons/pi";
// import { RxCross1 } from "react-icons/rx";
// import { useAuth } from '../context/AuthContext';
// import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
// import { RxHamburgerMenu } from "react-icons/rx";
// import axios from 'axios';
// import { URL } from '../url';
// import WomenDropDown from './WomenDropDown';
// import BeautyDropDown from './BeautyDropDown';
// import NewDropDown from './NewDropDown';
// import JewelleryDropDown from './JewelleryDropDown';
// import HomeDropDown from './HomeDropDown';
// import MenDropDown from './MenDropDown';

// const Navbar = () => {
//   const [openNew, setOpenNew] = useState(false);
//   const [openSale, setOpenSale] = useState(false);
//   const [openWomen, setOpenWomen] = useState(false);
//   const [openBeauty, setOpenBeauty] = useState(false);
//   const [openJewel, setOpenJewel] = useState(false);
//   const [openHome, setOpenHome] = useState(false);
//   const [openMen, setOpenMen] = useState(false);
//   const [openBrand, setOpenBrand] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
  
//   const { login, user} = useAuth();

//   const [email, setEmail] = useState('')
//   const [error,setError] = useState(false)
//   const [password, setPassword] = useState('')
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const navigate = useNavigate()


//   function togglePasswordVisibility() {
//     setIsPasswordVisible((prevState) => !prevState);
//   }

//   const handleSubmit = async() => {
//     setIsLoading(true)
//     try{
//       const res = await axios.post(URL+"/api/auth/login", {email,password})
//       const {accessToken, user} = res.data;
//       if(res.status == 200){
//         localStorage.setItem("access_token", accessToken)
//         login(user)
//         setError(false)
//         console.log(res.data)
//         navigate("/")
//       }
//     }
//     catch(err) {
//       setError(true)
//       console.log(err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleOpenNew = () => {
//     setOpenNew((prev) => !prev);
//   };
//   const handleOpenSale = () => {
//     setOpenSale((prev) => !prev);
//   };
//   const handleOpenWomen = () => {
//     setOpenWomen((prev) => !prev);
//   };
//   const handleOpenBeauty = () => {
//     setOpenBeauty((prev) => !prev);
//   };
//   const handleOpenJewel = () => {
//     setOpenJewel((prev) => !prev);
//   };
//   const handleOpenHome = () => {
//     setOpenHome((prev) => !prev);
//   };
//   const handleOpenMen = () => {
//     setOpenMen((prev) => !prev);
//   };
//   const handleOpenBrand = () => {
//     setOpenBrand((prev) => !prev);
//   };


//   const toggleSignIn = () => {
//     setShowSignIn((prev) => !prev);
//   };

//   const toggleMobileMenu = () => {
//     setShowMobileMenu((prev) => !prev);
//   };

//   const SignInForm = () => (
//     <div className='bg-white border absolute w-[90%] md:w-[450px] mt-3 right-0 px-5 py-3 z-50'>
//       <p className='mt-4 flex justify-end' onClick={toggleSignIn}><RxCross1 size={25} /></p>
//       <p className='font-medium mt-2'>SIGN IN</p>
//       <p className='mt-6'>Email Address</p>
//       <input onChange={(e) => setEmail(e.target.value)} className='border-b border-black focus:outline-none w-full py-2' />
//       <p className='mt-6'>Password</p>
//       <div className="relative w-full">
//         <div className="absolute inset-y-0 right-0 flex items-center px-2">
//           <p onClick={togglePasswordVisibility} className="px-2 py-1 text-xl font-mono cursor-pointer text-gray-400" for="toggle">
//             {isPasswordVisible ? (<RiEyeLine />):(<RiEyeOffLine />)}
//           </p>
//         </div>
//         <input 
//           onChange={(e) => setPassword(e.target.value)} 
//           className="border-b border-black focus:outline-none w-full py-2" 
//           type={isPasswordVisible ? "text" : "password"} 
//           autocomplete="off"
//         />
//       </div>
//       <div className='mt-9'>
//         <button onClick={handleSubmit} className='bg-[#5b3e31] w-full text-white px-9 py-2 rounded-full'>
//           {isLoading ? "Loading..." : "LOGIN"}
//         </button>
//       </div>
//       <div className='mt-9'>
//         <button onClick={() => navigate('/register')} className='border-2 border-black w-full px-9 py-2 rounded-full'>SIGN UP</button>
//       </div>
//       <div className='mb-16'></div>
//     </div>
//   );

//   const MobileMenu = () => (
//     <div className='bg-white absolute top-full left-0 right-0 z-50 shadow-md'>
//       <div className='flex flex-col px-4 py-2'>
//       <Link to='/sales' className='py-2 border-b'>NEW IN</Link>
//         <Link to='/sales' className='py-2 border-b'>SALE</Link>
//         <Link to='/women' className='py-2 border-b'>WOMEN</Link>
//         <Link to='/beauty' className='py-2 border-b'>BEAUTY</Link>
//         <Link to='/beauty' className='py-2 border-b'>JEWELLERY</Link>
//         <Link to='/homedecor' className='py-2 border-b'>HOME</Link>
//         <Link to='/men' className='py-2 border-b'>MEN</Link>
//         <div className='py-2 border-b' onClick={toggleSignIn}>Sign In</div>
//         <Link to='/search' className='py-2 border-b'>Search</Link>
//         <Link to='/cart' className='py-2'>Cart</Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className='relative'>
//       <div className='bg-white py-3 top-0 left-0 right-0 z-40 shadow-md'>
//         <div className='flex justify-between items-center px-4 md:px-12'>
//           <div className='flex gap-x-16'>
//             <Link to={'/'}><p className='font-semibold text-lg'>Iro Lagos</p></Link>
//             <div className='relative'>
//             <p onClick={handleOpenNew} className='hidden md:block font-thin text-lg cursor-pointer'>NEW IN</p>
//             {openNew && <NewDropDown /> }
//             </div>


//             <p onClick={() => navigate('/sales')} className='hidden md:block font-thin text-lg cursor-pointer'>SALE</p>


//             <div className='relative'>
//             <p onClick={handleOpenWomen} className='hidden md:block font-thin text-lg cursor-pointer'>WOMEN</p>
//            {openWomen && <WomenDropDown /> }
//             </div>
//             <div className='relative'>
//             <p onClick={handleOpenBeauty} className='hidden md:block font-thin text-lg cursor-pointer'>BEAUTY</p>
//             {openBeauty && <BeautyDropDown /> }
//             </div>
//             <div className='relative'>
//             <p onClick={handleOpenJewel} className='hidden md:block font-thin text-lg cursor-pointer'>JEWELLERY</p>
//             {openJewel && <JewelleryDropDown /> }
//             </div>

//             <div className='relative'>
//             <p onClick={handleOpenHome} className='hidden md:block font-thin text-lg cursor-pointer'>HOME</p>
//             {openHome && <HomeDropDown /> }
//             </div>

//             <div className='relative'>
//             <p onClick={handleOpenMen} className='hidden md:block font-thin text-lg cursor-pointer'>MEN</p>
//             {openMen && <MenDropDown /> }
//             </div>

//           </div>

//           <div className='flex gap-x-6'>
//             {user && <p className='hidden md:block font-medium mt-1'>Hi {user.fname}</p>}
//             <div className='hidden md:block relative'>
//               <p className='font-semibold text-2xl cursor-pointer mt-1' onClick={toggleSignIn}><GoPerson /></p>
//               {showSignIn && <SignInForm />}
//             </div>
//             <p onClick={() => navigate('/search')} className='hidden md:block font-semibold text-2xl cursor-pointer mt-1'><GoSearch /></p>
//             <p className='hidden md:block font-semibold text-2xl cursor-pointer mt-1'><PiShoppingBagOpenLight /></p>
//           </div>

//           <div className='md:hidden'>
//             <RxHamburgerMenu size={25} onClick={toggleMobileMenu}/>
//           </div>
//         </div>
//       </div>
//       {showMobileMenu && <MobileMenu />}
//       {showSignIn && <div className='md:hidden'><SignInForm /></div>}
//     </div>
//   )
// }

// export default Navbar

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { ImCalculator } from "react-icons/im";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GoPerson, GoSearch } from "react-icons/go";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from '../context/AuthContext';
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from 'axios';
import { URL } from '../url';
import WomenDropDown from './WomenDropDown';
import BeautyDropDown from './BeautyDropDown';
import NewDropDown from './NewDropDown';
import JewelleryDropDown from './JewelleryDropDown';
import HomeDropDown from './HomeDropDown';
import MenDropDown from './MenDropDown';
import BrandDropDown from './BrandDropDown';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(URL + "/api/auth/login", { email, password });
      const { accessToken, user } = res.data;
      if (res.status === 200) {
        localStorage.setItem("access_token", accessToken);
        login(user);
        setError(false);
        navigate("/");
      }
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignIn = () => {
    setShowSignIn((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const SignInForm = () => (
    <div className='bg-white border absolute w-[90%] md:w-[450px] mt-3 right-0 px-5 py-3 z-50'>
      <p className='mt-4 flex justify-end' onClick={toggleSignIn}><RxCross1 size={25} /></p>
      <p className='font-medium mt-2'>SIGN IN</p>
      <p className='mt-6'>Email Address</p>
      <input onChange={(e) => setEmail(e.target.value)} className='border-b border-black focus:outline-none w-full py-2' />
      <p className='mt-6'>Password</p>
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <p onClick={togglePasswordVisibility} className="px-2 py-1 text-xl font-mono cursor-pointer text-gray-400">
            {isPasswordVisible ? (<RiEyeLine />) : (<RiEyeOffLine />)}
          </p>
        </div>
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          className="border-b border-black focus:outline-none w-full py-2" 
          type={isPasswordVisible ? "text" : "password"} 
          autoComplete="off"
        />
      </div>
      <div className='mt-9'>
        <button onClick={handleSubmit} className='bg-[#5b3e31] w-full text-white px-9 py-2 rounded-full'>
          {isLoading ? "Loading..." : "LOGIN"}
        </button>
      </div>
      <div className='mt-9'>
        <button onClick={() => navigate('/register')} className='border-2 border-black w-full px-9 py-2 rounded-full'>SIGN UP</button>
      </div>
      <div className='mb-16'></div>
    </div>
  );

  const MobileMenu = () => (
    <div className='bg-white absolute top-full left-0 right-0 z-50 shadow-md'>
      <div className='flex flex-col px-4 py-2'>
        <Link to='/new' className='py-2 border-b'>NEW IN</Link>
        <Link to='/sales' className='py-2 border-b'>SALE</Link>
        <Link to='/women' className='py-2 border-b'>WOMEN</Link>
        <Link to='/beauty' className='py-2 border-b'>BEAUTY</Link>
        <Link to='/beauty' className='py-2 border-b'>JEWELLERY</Link>
        <Link to='/homedecor' className='py-2 border-b'>HOME</Link>
        <Link to='/men' className='py-2 border-b'>MEN</Link>
        <Link to='/brand' className='py-2 border-b'>BRANDS</Link>
        <div className='py-2 border-b' onClick={toggleSignIn}>Sign In</div>
        <Link to='/search' className='py-2 border-b'>Search</Link>
        <Link to='/cart' className='py-2'>Cart</Link>
      </div>
    </div>
  );

  return (
    <div className='relative'>
      <div className='bg-white py-3 top-0 fixed left-0 right-0 z-40 shadow-md'>
        <div className='flex justify-between items-center px-4 md:px-12'>
          <div className='flex gap-x-16'>
            <Link to={'/'}><p className='font-semibold text-lg'>Iro Lagos</p></Link>
            
            <div className='relative' ref={dropdownRef}>
              <p onClick={() => toggleDropdown('new')} className='hidden md:block font-thin text-lg cursor-pointer'>NEW IN</p>
              {openDropdown === 'new' && <NewDropDown />}
            </div>

            <p onClick={() => navigate('/sales')} className='hidden md:block font-thin text-lg cursor-pointer'>SALE</p>

            <div className='relative' ref={dropdownRef}>
              <p onClick={() => toggleDropdown('women')} className='hidden md:block font-thin text-lg cursor-pointer'>WOMEN</p>
              {openDropdown === 'women' && <WomenDropDown />}
            </div>

            <div className='relative' ref={dropdownRef}>
              <p onClick={() => toggleDropdown('beauty')} className='hidden md:block font-thin text-lg cursor-pointer'>BEAUTY</p>
              {openDropdown === 'beauty' && <BeautyDropDown />}
            </div>

            <div className='relative' ref={dropdownRef}>
              <p onClick={() => toggleDropdown('jewellery')} className='hidden md:block font-thin text-lg cursor-pointer'>JEWELLERY</p>
              {openDropdown === 'jewellery' && <JewelleryDropDown />}
            </div>

            <div className='relative' ref={dropdownRef}>
              <p onClick={() => toggleDropdown('home')} className='hidden md:block font-thin text-lg cursor-pointer'>HOME</p>
              {openDropdown === 'home' && <HomeDropDown />}
            </div>

            <div className='relative' ref={dropdownRef}>
              <p onClick={() => toggleDropdown('men')} className='hidden md:block font-thin text-lg cursor-pointer'>MEN</p>
              {openDropdown === 'men' && <MenDropDown />}
            </div>

            <div className='relative' ref={dropdownRef}>
              <p onClick={() => toggleDropdown('brand')} className='hidden md:block font-thin text-lg cursor-pointer'>BRANDS</p>
              {openDropdown === 'brand' && <BrandDropDown />}
            </div>


          </div>

          <div className='flex gap-x-6'>
            {user && <p className='hidden md:block font-medium mt-1'>Hi {user.fname}</p>}
            <div className='hidden md:block relative'>
              <p className='font-semibold text-2xl cursor-pointer mt-1' onClick={toggleSignIn}><GoPerson /></p>
              {showSignIn && <SignInForm />}
            </div>
            <p onClick={() => navigate('/search')} className='hidden md:block font-semibold text-2xl cursor-pointer mt-1'><GoSearch /></p>
            <p className='hidden md:block font-semibold text-2xl cursor-pointer mt-1'><PiShoppingBagOpenLight /></p>
          </div>

          <div className='md:hidden'>
            <RxHamburgerMenu size={25} onClick={toggleMobileMenu}/>
          </div>
        </div>
      </div>
      {showMobileMenu && <MobileMenu />}
      {showSignIn && <div className='md:hidden'><SignInForm /></div>}
    </div>
  );
};

export default Navbar;