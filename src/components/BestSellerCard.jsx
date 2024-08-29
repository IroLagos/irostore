import React from 'react'
import perfume from '../assets/perfume.jpg'

const BestSellerCard = ({title, heading, price, discount, description, imageUrl}) => {
  return (
    <div>
        <div className=' mt-6 w-[270px]'>
  <img src={imageUrl ? imageUrl : "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"} className='w-[270px] h-[350px] rounded' />
  <p className='text-xl mt-1'>{title}</p>
  <p className='text-sm mt-1'>{heading?.length <= 39 ? heading?.slice(0, 39) : heading?.slice(0, 39)+"..."} </p>
 


  <div className='flex gap-4 mt-2'>
      {discount ? <p className='line-through text-red-500 font-semibold'>₦{price}</p> : <p className='font-semibold'>₦{price}</p>  }

    {!discount ? null : <p className='font-semibold'>₦{discount}</p> }
     </div>
</div>
    </div>
  )
}

export default BestSellerCard