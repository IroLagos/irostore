import React, {useState} from 'react'
import perfume from '../assets/perfume.jpg'
import notyet from '../assets/notyet.png'

const BestSellerCard = ({title, heading, price, discount, description, imageUrls, color}) => {
  const [isHovered, setIsHovered] = useState(false)

  console.log("checking this picture")

  return (
    <div onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
        <div className=' mt-6 w-[370px] h-[450px]'   
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        
        >
  <img src={imageUrls ? (isHovered ? imageUrls[1] : imageUrls[0]) : notyet}
   className='w-[370px] h-[350px] rounded' />
  <p className={`text-xl mt-1 ${isHovered ? 'text-white' : 'text-black'}`}>{title}</p>
  <p className={`text-sm mt-1 ${isHovered ? 'text-white' : 'text-black'}`}>{heading?.length <= 39 ? heading?.slice(0, 39) : heading?.slice(0, 39)+"..."} </p>
 

<div className='flex justify-between'>
  <div className='flex gap-4 mt-1'>
      {discount ? <p className={`line-through text-red-500 font-semibold ${isHovered ? 'text-white' : 'text-black'}`}>₦{price}</p> : <p className={`font-semibold ${isHovered ? 'text-white' : 'text-black'}`}>₦{price}</p>  }

    {!discount ? null : <p className={`font-semibold ${isHovered ? 'text-white' : 'text-black'}`}>₦{discount}</p> }

     </div>
     <p className={`text-lg mt-1 ${isHovered ? 'text-white' : 'text-black'}`}>{color}</p>
     </div>

</div>

<div className='top-24'> 
<button className={`w-full ${isHovered ? 'bg-[#5b3e31]' : 'bg-white'} text-white font-semibold rounded-full px-6 py-2 text-center`} onClick={() => handleAddToCart(product, quantity)}>
Add to Cart
</button>
</div>


    </div>
  )
}

export default BestSellerCard




// import React, { useState } from 'react'
// import notyet from '../assets/notyet.png'

// const BestSellerCard = ({ title, heading, price, discount, description, imageUrls, color }) => {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <div className="relative mt-6 w-[370px] h-[450px]"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img 
//         src={imageUrls && imageUrls.length > 1 ? (isHovered ? imageUrls[1] : imageUrls[0]) : notyet}
//         className="w-[370px] h-[350px] rounded"
//         alt={title}
//       />
      
//       <div className={`absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
//         <div>
//           <p className="text-xl mt-1">{title}</p>
//           <p className="text-sm mt-1">{heading?.length <= 39 ? heading?.slice(0, 39) : heading?.slice(0, 39) + "..."}</p>
//         </div>
        
//         <div className="flex justify-between">
//           <div className="flex gap-4 mt-2">
//             {discount ? (
//               <p className="line-through text-red-500 font-semibold">₦{price}</p>
//             ) : (
//               <p className="font-semibold">₦{price}</p>
//             )}
//             {!discount ? null : <p className="font-semibold">₦{discount}</p>}
//           </div>
//           <p className="text-lg">{color}</p>
//         </div>
//       </div>
      
//       <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//         <button 
//           className="w-full sm:w-auto bg-[#5b3e31] hover:bg-[#4a3227] text-white font-semibold rounded-full px-6 py-2 text-center"
//           onClick={() => handleAddToCart(product, quantity)}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   )
// }

// export default BestSellerCard