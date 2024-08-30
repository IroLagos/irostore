import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import hero from '../assets/heroImage.jpg'
import perfume from '../assets/perfume.jpg'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import BestSellerCard from '../components/BestSellerCard'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { URL } from '../url';
import axios from 'axios';


const Home = () => {
  const divStyle = {
    width: '100vw',
    height: '80vh',
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover', // Adjusts the background image to cover the whole container
    backgroundPosition: 'center', // Centers the background image
    backgroundRepeat: 'no-repeat', // Prevents the background image from repeating
    paddingTop: '74px',
    filter: 'brightness(0.5)'
}

const [products, setProduct] = useState([])

const [currentIndex2, setCurrentIndex2] = useState(0)


const nextSlide2 = () => {
  setCurrentIndex2((prevIndex) =>
    prevIndex + 3 >= products.length ? 0 : prevIndex + 3
  );
};

const prevSlide2 = () => {
  setCurrentIndex2((prevIndex) =>
    prevIndex - 3 < 0 ? Math.max(products.length - 3, 0 ) : prevIndex - 3
  );
};

const fetchProducts = async () => {
  try {
    const res = await axios.get(`${URL}/api/products`)
    console.log(res.data);
    setProduct(res.data);
  } catch (error){
    console.log(error)
  }
}

useEffect(() => {
  fetchProducts();
},[])

  return (
    <>
    <Banner />
      <Navbar/>

      <div style={divStyle}></div>
    <div className=''>
        <p className='text-[50px] text-center absolute z-50 left-1/2 transform -translate-x-1/2 top-[200px] text-white uppercase'>The New Season is Here</p>
        <button className='border-2 border-white text-[50px] text-center absolute z-50 left-1/2 transform -translate-x-1/2 top-[300px] text-white px-6 rounded-full uppercase'>Shop Now</button>
        {/* <p className='max-w-[700px] text-center mx-auto pt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}
        </div>

<div className='px-6'>

        <p className='mt-12 text-xl font-thin'>WOMENS DRESSES</p>

        <div className='flex justify-center gap-x-48 mt-4'>

        <div className=' mt-6 w-[270px]'>
          <img src={hero} className='w-[270px] h-[350px] rounded'/>
          <p className='text-md mt-1'>LIBERTY</p>
          <p className='text-sm mt-1'>Tudor Tulip Silk Crepe de Chine Gala... </p>
          <p className='font-semibold mt-1'>₦25000</p>
        </div>

        
        <div className=' mt-6 w-[270px]'>
          <img src={hero} className='w-[270px] h-[350px] rounded' />
          <p className='text-md mt-1'>LIBERTY</p>
          <p className='text-sm mt-1'>Tudor Tulip Silk Crepe de Chine Gala... </p>
          <p className='font-semibold mt-1'>₦25000</p>
        </div>

        
        <div className=' mt-6 w-[270px]'>
          <img src={hero} className='w-[270px] h-[350px] rounded' />
          <p className='text-md mt-1'>LIBERTY</p>
          <p className='text-sm mt-1'>Tudor Tulip Silk Crepe de Chine Gala... </p>
          <p className='font-semibold mt-1'>₦25000</p>
        </div>

        </div>


       {/* iro top sellers */}
       <p className='mt-24 text-xl font-thin'>IRO LAGOS TOP SELLERS</p>

       <div className='relative flex justify-center items-center mt-12'>
  <button 
    onClick={prevSlide2} 
    className='absolute left-[20px] bg-gray-200 p-2 rounded-full'
  >
    <FaChevronLeft/>
  </button>


       <div className='flex justify-center gap-x-48 mt-4'>

       {products?.slice(currentIndex2, currentIndex2 + 3)?.map(d => (

<Link to={`/productdetails/${d.id}`}>
  <div key={d.id}>
  <BestSellerCard title={d.title} heading={d.heading} imageUrl={d?.imageUrl} price={d.price} discount={d?.discount} description={d.description} color={d.color}/>
  </div>
  </Link>
))}
</div>

<button 
    onClick={nextSlide2} 
    className='absolute right-[20px] bg-gray-200 p-2 rounded-full'
  >
       <FaChevronRight/>
  </button>
</div>


<div className='mb-24'></div>

        </div>
        <Footer />
        </>
  )
}

export default Home