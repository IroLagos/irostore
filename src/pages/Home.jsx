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
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowBackSharp, IoArrowForwardOutline } from "react-icons/io5";
import { GoDotFill, GoDot } from "react-icons/go";
import { FaMinus } from "react-icons/fa";
import { TiMinusOutline } from "react-icons/ti";

const slides = [
  {
    title: "EDTAA",
    subtitle: "Transforming the world's business",
    text: "Driving global growth through ours' only advanced technology and unparalleled expertise.",
    image: homedecor
  },
  {
    title: "Supercharging with SAP",
    subtitle: "Elevate Your Efficiency and Innovate Faster with SAP Solutions",
    text:"Unlock the full potential of your business with SAP. Seamlessly streamline operations, boost productivity, and stay ahead of the competition. Experience the power of SAP today!",
    image: jewelry
  },
  {
    title: "The Digital Powerhouse",
    subtitle: "Revolutionize Your Business Today",
    text:"Unlock unparalleled growth and efficiency with our leading-edge digital transformation solutions. Harness the power of AI, cloud, and automation to drive your business forward forward. Experience the future, now.",
    image: beauty
  }
];



const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0)

  const [currentIndex2, setCurrentIndex2] = useState(0)


  const nextSlides = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlides = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  }

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlides();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [currentSlide]);

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





  // const filteredWomen = products?.filter((w) => w.Category.name == "Women")
  //   .sort((a, b) => {
  //     // Sort products with images first
  //     if (a.imageUrl && !b.imageUrl) return -1;
  //     if (!a.imageUrl && b.imageUrl) return 1;
  //     return 0;
  //   });

  // console.log("women things", filteredWomen)

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

    const res = await axios.get(`${URL}/api/products`)
    console.log("see products",res.data)
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
  },[])

  console.log("products things", products)


  return (
    <div className='overflow-x-hidden'>
      <Banner />
      <Navbar />
        <div className="relative h-[50vh] md:h-[70vh]">


          {slides?.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
                
                   <div className="absolute flex justify-end right-0 inset-0 bg-black bg-opacity-50 px-4 md:pr-[50px] pt-16 md:pt-[170px] text-white">
                    <div>
  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-2 sm:mb-3 md:mb-4 max-w-[800px]">{slide.subtitle}</p>
  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 max-w-[800px]">{slide.text}</h2>
</div>

</div>
            </div>
            
          ))}
          {/* <button
            onClick={prevSlides}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-50"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={nextSlides}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-50"
          >
            <FaChevronRight className="text-2xl" />
          </button> */}

          <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-x-6 justify-center z-50'>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="focus:outline-none"
              >
                {index === currentSlide ? (
                  <FaMinus size={30} color='white' />
                ) : (
                  <TiMinusOutline size={30} color='white' className="opacity-50 hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
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

       {products?.slice(currentIndex, currentIndex + 3)?.map(d => (

              <Link to={`/productdetails/${d.id}`}>
                <div key={d.id}>
                  <BestSellerCard title={d.title} heading={d.heading} imageUrls={d?.imageUrls} price={d.price} discount={d?.discount} description={d.description} color={d.color} />
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