import React, { useState, useEffect, useContext } from 'react'
import gallery from '../assets/perfume.jpg'
import Navbar from '../components/Navbar'
import { FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { URL } from '../url';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { GoStar } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import { AiFillAndroid } from "react-icons/ai";
import Banner from '../components/Banner';
import { IoMdCheckmark } from "react-icons/io";
import BestSellerCard from '../components/BestSellerCard';
import { RxCross1 } from "react-icons/rx";
import { PaystackButton } from 'react-paystack';
import notyet from '../assets/notyet.png'

const ProductDetails = () => {
const {user, logout} = useAuth();
const productId = useParams().id
const { addToCart } = useContext(CartContext);
const navigate = useNavigate()
const [isLoading, setIsLoading] = useState(true)
const [isLoading2, setIsLoading2] = useState(false)
const [quantity, setQuantity] = useState(1)
const [title, setTitle] = useState('')
const [availability, setAvailability] = useState('')
const [heading, setHeading] = useState('')
const [images, setImages] = useState([])
const [currentImageIndex, setCurrentImageIndex] = useState(0)
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')
const [discount, setDiscount] = useState('')
const [size, setSize]= useState('')
const [color, setColor]= useState('')
const [product, setProduct] = useState({});

const [rating, setRating] = useState(0);
const [comment, setComment] = useState('');
const [hover, setHover] = useState(null);
const [message, setMessage] = useState('');

const [first, setFirst] = useState(false)
const [second, setSecond] = useState(false)
const [third, setThird] = useState(false)
const [fourth, setFourth] = useState(false)
const [fifth, setFifth] = useState(false)


const handleFirst = () => {
    setFirst(true)
    setSecond(false)
    setThird(false)
    setFourth(false)
    setFifth(false)
    setRating(1)
}
const handleSecond = () => {
    setSecond(true)
    setFirst(false)
    setThird(false)
    setFourth(false)
    setFifth(false)
    setRating(2)
}
const handleThird = () => {
    setThird(true)
    setFirst(false)
    setSecond(false)
    setFourth(false)
    setFifth(false)
    setRating(3)
}
const handleFourth = () => {
    setFourth(true)
    setFirst(false)
    setSecond(false)
    setThird(false)
    setFifth(false)
    setRating(4)
}
const handleFifth = () => {
    setFifth(true)
    setFirst(false)
    setSecond(false)
    setThird(false)
    setFourth(false)
    setRating(5)
}

console.log("this is user details", user)

const toastStyles = {
  success: {

    duration: 10000,
    iconTheme: {
      primary: 'white',
      secondary: '#4CAF50',
    },
      style: {

               background: "green",
               color: "whitesmoke",
               icon: <AiFillAndroid background-color="whitesmoke" color='green' />,
             },
  },
  error: {
    duration: 10000,
    style: {
      background: '#F44336',
      color: 'white',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#F44336',
    },
  },
};

console.log("User details",user)

const email = user?.email;

const fname = user?.fname;

const userId = user?.id;

const address = user?.address

const city = user?.city

const state = user?.state

const country = user?.country

const handleIncrease = () => {
     setQuantity(quantity + 1)
}

const handleDecrease = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1)
}

const fetchProducts = async() => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${URL}/api/products/${productId}`)
        console.log("see my products", res.data)
        setTitle(res.data.title)
        setHeading(res.data.heading)
        setDescription(res.data.description)
        setImages(res.data.imageUrls || [res.data.imageUrl])
        setPrice(res.data.price)
        setDiscount(res.data.discount)
        setSize(res.data.size)
        setColor(res.data.color)
        setAvailability(res.data.availability)
        setProduct(res.data)
    }
    catch(err) {
        console.log(err)
    }
    finally {
        setIsLoading(false);
    }
}

useEffect(() => {
    fetchProducts()
}, [productId]);

const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
}

const handleBuyNow = async () => {
    setIsLoading2(true)

    if (!product || !product.id || quantity <= 0) {
        alert('Invalid product or quantity');
        toast.error('Invalid product or quantity');
        return;
    }
    try{
        const totalPrice = product.price * quantity;

        const res = await axios.post(`${URL}/api/purchases/create`,{
            quantity: quantity,
            productId:product.id,
            title: product.title,
            description: product.description,
            imageUrl: product.imageUrl,
            size: product.size,
            color: product.color,
            email:email,
            fname:fname,
            userId:userId,
            address:address,
            city:city,
            state:state,
            country:country
            // productId:productId
        });
        console.log("see purchase", res.data)
        setIsLoading(false)
       
        toast.success('Purchase is Successful', toastStyles.success)

    } catch(error) {
        console.error('Error creating purchase', error)
        alert('Failed to complete purchase');
        toast.error('Failed to complete purchase');

    }
    finally{
        setIsLoading2(false)
    }
}

const handleReview = async () => {
    
    try{
        const res = await axios.post(`${URL}/api/reviews/${productId}`, {
            userId : userId,
            rating,
            comment,
            productId:productId
        });
        console.log('review post',res.data)
        toast.success('Review Submitted successfully!', toastStyles.success);
        setMessage('Review Submitted successfully!');
        setRating(0);
        setComment('');

    } catch (error) {
        setMessage(error.res?.data?.message || 'You have to buy this product to review!');
        toast.error(error.res?.data?.message || 'You have to buy this product to review!', toastStyles.error); 
    }
}

const publicKey = "pk_test_6fa7dbd015006b4b712c4d8bfedcd53cb4f93320"

const paymentProps = {
    amount: product.price * 100,
    quantity: quantity,
    productId:product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    size: product.size,
    color: product.color,
    email:email,
    fname:fname,
    userId:userId,
    address:address,
    city:city,
    state:state,
    country:country,
    publicKey,
    text:"Buy Now",
    // onSuccess: () => alert("Thank you for booking!!"),
    onClose: () => alert("Are you sure you want to close"),
    onSuccess: ({ reference }) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
      handleBuyNow();
      navigate('/')

    },
  }

    return (
        <>
            <Banner />
            <Navbar />

            <div className="px-4 md:px-16 py-6">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    toastOptions={{
                        duration: 9000,
                        style: {
                            borderRadius: '8px',
                            boxShadow: '0 3px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.05)'
                        }
                    }}
                />

                <p onClick={() => { navigate(-1) }} className='flex items-center gap-x-2 text-gray-500 mb-6 cursor-pointer'>
                    Home <MdOutlineKeyboardArrowRight /> Product details
                </p>

                {isLoading ? (
                    <p className='flex justify-center items-center h-screen'>Loading ...</p>
                ) : (
                    <div className='flex md:flex-row justify-center gap-6 md:gap-9'>


                        <div className='flex flex-col justify-center mb-96 gap-y-6'>
                            {images?.map((img, index) => (
                                <img 
                                    key={index}
                                    src={img}
                                    alt={`${title} thumbnail ${index + 1}`}
                                    className='object-cover w-[100px] h-[100px] rounded-xl'
                                    // className={`w-16 h-16 object-cover cursor-pointer ${index === currentImageIndex ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                 
                        <img src={images[currentImageIndex] || notyet} className='object-contain w-full md:w-[1050px] h-[300px] md:h-[600px] rounded' alt={title} />
                
                      
{/* 
                        </div> */}


                        <div className='bg-gray-100 w-full md:w-[500px] p-4'>
                            <p className='text-2xl md:text-3xl font-normal'>{title}</p>
                            <p className='text-lg md:text-xl font-normal mt-3'>{heading}</p>

                            {discount ? (
                                <>
                                    <p className='line-through font-bold text-red-500 text-xl mt-3'>₦{price}</p>
                                    <p className='font-bold text-xl mt-1 text-green-600'>₦{discount}</p>
                                </>
                            ) : (
                                <p className='font-bold text-xl mt-3'>₦{price}</p>
                            )}

                            <div className='flex items-center gap-x-2 mt-2'>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} color='#5b3e31' />
                                ))}
                                <span>4.6</span>
                            </div>

                            <p className='font-semibold mt-6'>Choose Quantity</p>
                            <div className='flex gap-x-4 mt-2'>
                                <button onClick={handleDecrease} className='border-2 border-black rounded-md px-4 py-2'><FiMinus /></button>
                                <button className='border text-gray-700 font-semibold rounded-md px-3 py-2'>{quantity}</button>
                                <button onClick={handleIncrease} className='border-2 border-black font-semibold rounded-md px-4 py-2'><FiPlus /></button>
                            </div>

                            <p className='font-thin mt-6 flex items-center gap-x-2'>
                                Availability:
                                {availability === 'In Stock' ? (
                                    <span className='flex items-center gap-x-1 text-green-600 font-normal'>
                                        {availability}<IoMdCheckmark color='green' />
                                    </span>
                                ) : (
                                    <span className='flex items-center gap-x-1 text-red-600 font-normal'>
                                        {availability}<RxCross1 color='red' />
                                    </span>
                                )}
                            </p>

                            <p className='mt-4 text-lg font-semibold'>Size: <span className='font-normal text-xl uppercase'>{size}</span></p>
                            <p className='mt-4 text-lg font-semibold'>Color: <span className='font-normal text-xl uppercase'>{color}</span></p>

                            <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                                {user ? (
                                    <PaystackButton {...paymentProps} disabled={isLoading} className="w-full sm:w-auto border-2 border-black font-medium rounded-full px-6 py-2 text-center">
                                        {isLoading ? "Loading..." : "Buy Now"}
                                    </PaystackButton>
                                ) : (
                                    <button onClick={() => navigate('/login')} className="w-full sm:w-auto border-2 border-black font-medium rounded-full px-6 py-2 text-center">
                                        {isLoading ? "Loading..." : "Buy Now"}
                                    </button>
                                )}
                                <button className='w-full sm:w-auto bg-[#5b3e31] text-white font-semibold rounded-full px-6 py-2 text-center' onClick={() => handleAddToCart(product, quantity)}>
                                    Add to Cart
                                </button>
                            </div>

                            <div className='mt-6'>
                                <div className='text-lg font-semibold'>Make a review</div>
                                <div className='flex gap-x-2 mt-2'>
                                    {[handleFirst, handleSecond, handleThird, handleFourth, handleFifth].map((handler, index) => (
                                        <div key={index} onClick={handler}>
                                            {[first, second, third, fourth, fifth][index] ? (
                                                <FaStar color='orange' size={20} />
                                            ) : (
                                                <GoStar size={20} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <textarea
                                    onChange={(e) => setComment(e.target.value)}
                                    className='border px-2 py-2 h-[100px] rounded-md w-full text-gray-600 mt-2'
                                    placeholder='Write a comment'
                                />
                                <div className='mt-2'>
                                    <button onClick={handleReview} className='bg-black text-white rounded-md px-4 py-2 w-full sm:w-auto'>
                                        Send Review
                                    </button>
                                </div>
                                {message && <p className='text-green-600 mt-2'>{message}</p>}
                            </div>
                        </div>
                    </div>
                )}

                <div className='mt-12 md:mt-24'>
                    <p className='text-xl font-thin mb-4'>SIMILAR COLLECTIONS</p>
                    <div className='flex flex-col md:flex-row justify-center gap-6 md:gap-12'>
                        <Link to={'/productdetails'}><BestSellerCard /></Link>
                        <BestSellerCard />
                        <BestSellerCard />
                    </div>
                </div>

                <div className='mb-12'></div>
            </div>
        </>
    )
}

export default ProductDetails