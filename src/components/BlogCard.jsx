import React from 'react'
import umbrella from '../assets/umbrella.jpeg'
import { FaLongArrowAltRight } from "react-icons/fa";

const BlogCard = ({title, imageUrl, text, heading}) => {
  return (
    <div className=''>
        <img src={imageUrl ? imageUrl : umbrella} className='object-cover max-w-[350px] min-w-[320px] h-[180px]' />

        <p className='font-bold text-[22px] py-2 w-[320px]'>{title}</p>
        <p className='text-gray-500 w-[320px]'>{text.slice(0,200)}</p>

        <div className='flex items-center py-3'>
        <p className='font-semibold min-w-[150px]'>Continue Reading </p><div className='mt-1'><FaLongArrowAltRight /></div>
        </div>

    </div>
  )
}

export default BlogCard