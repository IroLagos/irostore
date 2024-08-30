import React from 'react'
import perfume from '../assets/perfume.jpg'
import notyet from '../assets/notyet.png'

const BestSellerCard = ({title, heading, price, discount, description, imageUrl, color}) => {
  return (
    <div>
        <div className=' mt-6 w-[370px] h-[450px] '>
  <img src={imageUrl ? imageUrl : notyet} className='w-[370px] h-[350px] rounded' />
  <p className='text-xl mt-1'>{title}</p>
  <p className='text-sm mt-1'>{heading?.length <= 39 ? heading?.slice(0, 39) : heading?.slice(0, 39)+"..."} </p>
 

<div className='flex justify-between'>
  <div className='flex gap-4 mt-2'>
      {discount ? <p className='line-through text-red-500 font-semibold'>₦{price}</p> : <p className='font-semibold'>₦{price}</p>  }

    {!discount ? null : <p className='font-semibold'>₦{discount}</p> }

     </div>
     <p className='text-lg'>{color}</p>
     </div>

</div>
    </div>
  )
}

export default BestSellerCard