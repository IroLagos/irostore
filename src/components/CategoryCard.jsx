// import React from 'react'
// import jewelry from '../assets/jewelry.jpg'

// const CategoryCard = ({title}) => {
//   return (
//     <div>
//          <div className='mt-6 w-[370px] h-[450px] '>
//   <img src={jewelry} className='w-[370px] h-[350px] rounded' />
//   <p className='text-xl mt-1'>{title}</p>

//   </div>
//     </div>
//   )
// }

// export default CategoryCard

import React from 'react'
import jewelry from '../assets/jewelry.jpg'

const CategoryCard = ({ image,title }) => {
  return (
    <div className="relative">
      <img src={image} className="w-[500px] h-[350px] object-cover" alt={title} />
      <div className="absolute flex items-center justify-start mt-[-50px] ml-4">
        <p className="text-xl text-white font-semibold">{title}</p>
      </div>
    </div>
  )
}

export default CategoryCard