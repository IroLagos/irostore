import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { URL } from '../url';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import BlogCard from '../components/BlogCard';



const Blogs = () => {
    const navigate = useNavigate()
    const [posts, setPost] = useState([])

    const fetchPosts = async() => {
        try {
            const res = await axios.get(`${URL}/api/posts`)
            console.log(res.data)
            setPost(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchPosts()
    }, [])

  return (
    <>
    <Navbar/>
    <div>
        


        
    <p onClick={() => {navigate(-1)}} className='flex items-center gap-x-2 text-gray-500 px-16 mt-24 cursor-pointer'>Home <MdOutlineKeyboardArrowRight />Blog Posts</p>


    <div className="flex items-center justify-center">
<div className='grid md:grid-cols-3 gap-x-12 gap-y-9 mt-12'>
{posts.map(p => (

<Link to={`/blogdetails/${p.id}`}>
  <div key={p.id}>
  <BlogCard title={p.title} heading={p.heading} imageUrl={p?.imageUrl} text={p.text} createdAt={p.createdAt} />
  </div>
  </Link>
))}

</div>

</div>

<div className='mb-12'></div>

    </div>
    </>
  )
}

export default Blogs