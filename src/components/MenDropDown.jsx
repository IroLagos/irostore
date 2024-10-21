import React from 'react'

const MenDropDown = () => {
  return (
    <div className='bg-white mt-3 z-50 fixed left-0 right-0 w-full py-9 uppercase'>

    <div className='flex justify-evenly'>

    <div>
          <p className='font-semibold text-md'>Clothing</p>
          <p className='text-md mt-1'>Trousers</p>
          <p className='text-md mt-1'>Sets</p>
          <p className='text-md mt-1'>Shorts</p>
          <p className='text-md mt-1'>Tops</p>
     
        </div>

        <div>
          <p className='font-semibold text-md'>Ties</p>
          <p className='text-md mt-1'>Long ties</p>
          <p className='text-md mt-1'>Bow-ties</p>
        </div>


        <div>
          <p className='font-semibold text-md'>Jewelry</p>
          <p className='text-md mt-1'>Rings</p>
          <p className='text-md mt-1'>Necklaces</p>
          <p className='text-md mt-1'>Bracelets</p>

        </div>


        <div>
          <p className='font-semibold text-md'>Footwear</p>
          <p className='text-md mt-1'>Sandals</p>
          <p className='text-md mt-1'>Shoes</p>
          <p className='text-md mt-1'>Slippers</p>
     
        </div>



        </div>

      </div>
  )
}

export default MenDropDown