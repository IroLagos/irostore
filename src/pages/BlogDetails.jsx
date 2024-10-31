import React,{ useState, useEffect, useContext } from 'react'
import umbrella from '../assets/umbrella.jpeg'
import { useNavigate, useParams } from 'react-router-dom'
import { HiArrowNarrowLeft } from "react-icons/hi";
import Navbar from '../components/Navbar';
import { URL } from '../url';
import axios from 'axios';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const BlogDetails = () => {
    const postId = useParams().id
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [text, setText] = useState('')
    const [heading, setHeading] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchPosts = async() => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${URL}/api/posts/${postId}`)
            console.log(res.data)
            setTitle(res.data.title)
            setImageUrl(res.data.imageUrl)
            setText(res.data.text)
            setHeading(res.data.heading)
            setCreatedAt(res.data.createdAt)
           
        }
        catch(err) {
            console.log(err)
        }
        finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        fetchPosts()
    }, [postId]);



    const navigate = useNavigate()
  return (
    <>
    <Navbar />
    <div>

<p onClick={() => {navigate(-1)}} className='flex items-center gap-x-2 text-gray-500 px-4 md:px-16 mt-24 cursor-pointer'>Home <MdOutlineKeyboardArrowRight /> Blog details</p>

    <div onClick={() => navigate(-1)} className=''></div>

        <div className='px-4 md:px-0 flex flex-col justify-center items-center'>
            <div className='max-w-[750px]'>
        <p className='text-gray-400 mt-12'>{new Date(createdAt).toDateString()}</p>
        <p className='font-semibold text-3xl mt-3'>{title}</p>
        <p className='text-gray-500 italic mt-2'>{heading}</p>
        <div className='mt-16'><img src={imageUrl ? imageUrl : umbrella} className='object-cover w-[750px] h-[450px]' /></div>
        {/* <p className='text-gray-500 font-semibold mt-2 text-center'>San Francisco, USA </p> */}

        <p className='mt-6'>{text}</p>

        <p className='mt-6'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
        
        </div>
        </div>


<div className='mb-12'></div>
    </div>
    </>
  )
}

export default BlogDetails