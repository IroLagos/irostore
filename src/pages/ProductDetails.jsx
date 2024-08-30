import React, { useState, useEffect, useContext } from 'react'
import gallery from '../assets/perfume.jpg'
import Navbar from '../components/Navbar'
import { FaStar } from "react-icons/fa";
import { FiMinus,FiPlus } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {Link, useNavigate, useParams } from 'react-router-dom'
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
const [imageUrl, setImageUrl] = useState('')
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
    // style: {
    //   background: '#4CAF50',
    //   color: 'white',
    //   fontWeight: 'bold',
    // },
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
        console.log(res.data)
        setTitle(res.data.title)
        setHeading(res.data.heading)
        setDescription(res.data.description)
        setImageUrl(res.data.imageUrl)
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
    //   navigate(`/bookingconfirmation/${bookingId}`)
    },
  }



  return (
    <>
    <Banner />
    <Navbar/>

    <div>
    <Toaster 
    position="top-right"
    reverseOrder={false}
    gutter={8}
    toastOptions={{
        duration:9000,
        style:{
            borderRadius:'8px',
            boxShadow:'0 3px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.05)'
        }
    }} 
     />

        <p onClick={() => {navigate(-1)}} className='flex items-center gap-x-2 text-gray-500 px-16 mt-9 cursor-pointer'>Home <MdOutlineKeyboardArrowRight /> Product details</p>

        {isLoading ? (<p className='flex justify-center items-center h-screen'>Loading ...</p>) : (<div className='flex justify-center gap-x-9 mt-12'>
            <img src={imageUrl ? imageUrl : notyet} className='object-contain w-[950px] h-[600px] rounded' />

            <div className='bg-gray-100 w-[500px] px-2 py-2'>
                {/* <p className='text-3xl font-semibold'>{title}</p> */}
                <p className='text-3xl font-normal max-w-[450px]'>{title}</p>

                <p className='text-xl font-normal mt-3 max-w-[450px]'>{heading}</p>

               {discount ? <p className='line-through font-bold text-red-500 text-xl mt-3'>₦{price}</p> : <p className='font-bold text-xl mt-3'>₦{price}</p> }

                {discount && <p className='font-bold text-xl mt-3 text-green-600'>₦{discount}</p>}

                <div className='flex justify-start items-center gap-x-2 mt-2'>
            <FaStar color='#5b3e31' />  <FaStar color='#5b3e31' />  <FaStar color='#5b3e31' />  <FaStar color='#5b3e31' /> <FaStar color='#5b3e31' /> 4.6
            </div>

            <p className='font-semibold mt-6'>Choose Quantity</p>

            <div className='flex gap-x-4 mt-2'>
                    <button onClick={handleDecrease} className='border-2 border-black rounded-md px-6 py-2'><FiMinus /></button>
                    <button className='border text-gray-700 font-semibold rounded-md px-3 py-2'>{quantity}</button>
                    <button onClick={handleIncrease} className='border-2 border-black font-semibold rounded-md px-6 py-2'><FiPlus /></button>
                </div>

           <p className='font-thin mt-6 flex items-center gap-x-2'>Availability:{availability === 'In Stock' ?  (<p className='flex gap-x-2 items-center'><span className='text-green-600 font-normal'>{availability}</span><IoMdCheckmark color='green' /></p>) : (<p className='flex gap-x-2 items-center'><span className='text-red-600 font-normal'>{availability}</span><RxCross1 color='red' /></p> )}</p>

           <p className='mt-4 text-lg font-semibold'>Size: <span className='font-normal text-xl uppercase'>{size}</span></p>

           <p className='mt-4 text-lg font-semibold'>Color: <span className='font-normal text-xl uppercase'>{color}</span></p>
                {/* <p className='mt-6 max-w-[450px]'>{description}.</p>
                <p className='mt-4 text-2xl'>Price: {discount? <span className='font-bold'>{discount}</span> : <span className='font-bold'>{price}</span>}</p>  */}
              
                {/* <div className='flex items-center gap-x-4'> */}
                    {/* <p className='mt-4 text-2xl'>Colors: </p> */}
                {/* <div className='flex border px-4 py-1 gap-x-2 rounded-md mt-5'> */}
                     {/* <div className='rounded-full text-center h-9 w-9' style={{backgroundColor: `${color}`}}> */}

                        
                     {/* </div> */}
                                  

                     {/* </div> */}

     
       
               
                {/* </div> */}



                <div className='flex gap-x-4 mt-3'>
                {user ? <PaystackButton {...paymentProps} disabled={isLoading} className="border-2 border-black font-medium rounded-full px-12 py-2">{isLoading ? "Loading. . ." : "Buy Now"}</PaystackButton> : (<button onClick={()=> navigate('/login')} className="border-2 border-black font-medium rounded-full px-12 py-2">{isLoading ? "Loading..." : "Buy Now"}</button> )}
                    {/* <button className='border-2 border-black font-medium rounded-full px-12 py-2' onClick={handleBuyNow}>{isLoading2? "Loading . . ." : "Buy Now"}</button> */}
                    <button className='bg-[#5b3e31] text-white font-semibold rounded-full px-12 py-2' onClick={() => handleAddToCart(product, quantity)}>Add to Cart</button>
                </div>

                <div className='mt-4'>
        <div className='text-lg font-semibold'>Make a review</div>
        <div className='flex gap-x-4 mt-2'>

        <div onClick={handleFirst} onChange={(e) => setRating(e.target.value)}>{first? (<FaStar color='orange' size={20}/>) : (<GoStar size={20}/>)}</div>
        <div onClick={handleSecond} onChange={(e) => setRating(e.target.value)}>{second? (<FaStar color='orange' size={20} />) : (<GoStar size={20} />)}</div>
        <div onClick={handleThird} onChange={(e) => setRating(e.target.value)}>{third? (<FaStar color='orange' size={20} />) : (<GoStar size={20} />)}</div>
        <div onClick={handleFourth} onChange={(e) => setRating(e.target.value)}>{fourth? (<FaStar color='orange' size={20} />) : (<GoStar size={20} />)}</div>
        <div onClick={handleFifth} onChange={(e) => setRating(e.target.value)}>{fifth? (<FaStar color='orange' size={20}/>) : (<GoStar size={20}/>)}</div>

        </div>
        <textarea  onChange={(e) => setComment(e.target.value)}  className='border px-2 py-2 h-[100px] rounded-md w-[400px] text-gray-600 mt-2' placeholder='Write a comment'/>
     
        <div className='mt-2'><button onClick={handleReview} className='bg-black text-white rounded-md px-4 py-1'>Send Review</button></div>
        {message && <p className='text-green-600'>{message}</p>}


        </div>
        


            </div>


        </div>)}

       {/* iro top sellers */}
       <p className='mt-24 text-xl font-thin ml-2 md:ml-6'>SIMILAR COLLECTIONS</p>

       <div className='flex justify-center gap-x-48 mt-4'>

        <Link to={'/productdetails'}><BestSellerCard /></Link>
        <BestSellerCard />
        <BestSellerCard />

</div>



       
<div className='mb-12'></div>
        
        </div>
        
        </>
  )
}

export default ProductDetails