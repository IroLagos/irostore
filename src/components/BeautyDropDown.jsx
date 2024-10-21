import React from 'react'

const BeautyDropDown = () => {
  return (
    <div className='bg-white mt-3 z-50 fixed left-0 right-0 w-full py-9'>

    <div className='flex justify-evenly'>

        <div>
          <p className='font-semibold text-md'>HOME ACCESSORIES</p>
          <p className='text-md mt-1'>HAIR SPRAYS</p>

        </div>

        <div>
          <p className='font-semibold text-md'>BATH & BODY</p>
          <p className='text-md mt-1'>HANDS & FEET</p>
          <p className='text-md mt-1'>BATH & BODY WASHES</p>
          <p className='text-md mt-1'>MOISTURIZERS</p>
          <p className='text-md mt-1'>BODY SCRUB & EXFOILATORS</p>
        </div>


        <div>
          <p className='font-semibold text-md'>SKIN CARE</p>
          <p className='text-md mt-1'>MASK & EXFOILATORS</p>

        </div>

        </div>

      </div>
  )
}

export default BeautyDropDown