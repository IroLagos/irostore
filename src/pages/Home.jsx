import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import hero from '../assets/heroImage.jpg'
import perfume from '../assets/perfume.jpg'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import BestSellerCard from '../components/BestSellerCard'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../url';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard'
import dresses from '../assets/dresses.jpg'
import homedecor from '../assets/homedecor.jpg'
import jewelry from '../assets/jewelry.jpg'
import beauty from '../assets/beauty.jpg'
// import jewelry from '../assets/jewelry.jpg'
// import jewelry from '../assets/jewelry.jpg'


const Home = () => {
  const divStyle = {
    // width: '100vw',
    height: '80vh',
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover', // Adjusts the background image to cover the whole container
    backgroundPosition: 'center', // Centers the background image
    backgroundRepeat: 'no-repeat', // Prevents the background image from repeating
    paddingTop: '74px',
    filter: 'brightness(0.5)'
  }

  const navigate = useNavigate()
  const [products, setProduct] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0)

  const [currentIndex2, setCurrentIndex2] = useState(0)

  console.log("products things", products)

  const filteredWomen = products?.filter((w) => w.Category.name == "Women")
    .sort((a, b) => {
      // Sort products with images first
      if (a.imageUrl && !b.imageUrl) return -1;
      if (!a.imageUrl && b.imageUrl) return 1;
      return 0;
    });

  console.log("women things", filteredWomen)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= products.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(products.length - 3, 0) : prevIndex - 3
    );
  };


  const nextSlide2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex + 3 >= products.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(products.length - 3, 0) : prevIndex - 3
    );
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${URL}/api/products`)
      console.log(res.data);
      setProduct(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className='overflow-x-hidden'>
      <Banner />
      <Navbar />


      {/* <div className='relative'>
      <img src={hero} className='w-full h-[300px] md:h-[500px] object-cover' />
      <div className="absolute inset-0 flex items-center justify-end px-48">
        <div>
        <p className='text-[50px] text-white uppercase'>It's Arrived</p>
        <p className='text-white text-xl max-w-[500px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button onClick={() => navigate('/search')} className='border-2 border-white text-[35px] text-white px-6 rounded-full uppercase mt-4'>Shop Now</button>
        </div>
        </div>
        </div> */}

      <div className='relative'>
        <img
          src={hero}
          className='w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover'
          alt="Hero image"
        />
        <div className="absolute inset-0 flex items-center justify-center md:justify-end px-4 md:px-8 lg:px-16 xl:px-48">
          <div className="text-center md:text-left max-w-[90%] md:max-w-[60%] lg:max-w-[50%]">
            <h1 className='text-3xl md:text-4xl lg:text-5xl text-white uppercase font-semibold mb-2 md:mb-4'>
              It's Arrived
            </h1>
            <p className='text-white text-sm md:text-base lg:text-lg mb-4 md:mb-6 md:max-w-[500px]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <button
              onClick={() => navigate('/search')}
              className='border-2 border-white text-white text-lg md:text-xl lg:text-2xl px-4 py-2 md:px-6 md:py-3 rounded-full uppercase hover:bg-white hover:text-black transition duration-300'
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className='px-6'>

        <div className='flex flex-col md:flex-row justify-center mt-24'>
          <Link to={'/dressescategory'}><CategoryCard image={dresses} title={'Dresses'} /></Link>
          <Link to={'/beautycategory'}><CategoryCard image={beauty} title={'Beauty'} /></Link>
          <CategoryCard image={jewelry} title={'Jewelries'} />
          <Link to={'/homedecorcategory'}><CategoryCard image={homedecor} title={'Home Decoration'} /></Link>
          {/* <CategoryCard image={jewelry} title={'Dresses'}/> */}
        </div>






        <p className='mt-12 text-xl font-thin'>WOMENS DRESSES</p>

        <div className='relative flex justify-center items-center mt-12'>
          <button
            onClick={prevSlide}
            className='absolute left-[20px] bg-gray-200 p-2 rounded-full'
          >
            <FaChevronLeft />
          </button>


          <div className='flex flex-col md:flex-row justify-center gap-x-48 mt-4'>

            {filteredWomen?.slice(currentIndex, currentIndex + 3)?.map(d => (

              <Link to={`/productdetails/${d.id}`}>
                <div key={d.id}>
                  <BestSellerCard title={d.title} heading={d.heading} imageUrl={d?.imageUrl} price={d.price} discount={d?.discount} description={d.description} color={d.color} />
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className='absolute right-[20px] bg-gray-200 p-2 rounded-full'
          >
            <FaChevronRight />
          </button>
        </div>


        {/* iro top sellers */}
        <p className='mt-24 text-xl font-thin'>IRO LAGOS TOP SELLERS</p>

        <div className='relative flex justify-center items-center mt-12'>
          <button
            onClick={prevSlide2}
            className='absolute left-[20px] bg-gray-200 p-2 rounded-full'
          >
            <FaChevronLeft />
          </button>


          <div className='flex flex-col md:flex-row justify-center gap-x-48 mt-4'>

            {products?.slice(currentIndex2, currentIndex2 + 3)?.map(d => (

              <Link to={`/productdetails/${d.id}`}>
                <div key={d.id}>
                  <BestSellerCard title={d.title} heading={d.heading} imageUrl={d?.imageUrl} price={d.price} discount={d?.discount} description={d.description} color={d.color} />
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={nextSlide2}
            className='absolute right-[20px] bg-gray-200 p-2 rounded-full'
          >
            <FaChevronRight />
          </button>
        </div>


        <div className='mb-24'></div>

      </div>
      <Footer />
    </div>
  )
}

export default Home