import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-300 py-6'>
        <div className='flex flex-col md:flex-row justify-evenly mt-6 px-4 md:px-0'>
            <div className=''>
            <p className='font-semibold'>SHOPPING ONLINE</p>
            <p className='mt-2'>Delivery & Returns</p>
            <p className='mt-2'>Order History</p>
            <p className='mt-2'>Payments</p>
            </div>

            <div className=''>
            <p className='font-semibold'>STORE INFORMATION</p>
            <p className='mt-2'>Directions</p>
            <p className='mt-2'>Store Services</p>
            <p className='mt-2'>Store events</p>
            </div>

         
            <div className=''>
            <p className='font-semibold'>CUSTOMER SERVICES</p>
            <p className='mt-2'>Email Customer Services</p>
            <p className='mt-2'>Telephone +234 (0)2033893 3062</p>
            <p className='mt-2'>Monday-Saturday: 9am - 7pm</p>
            </div>
  

        </div>
    </div>
  )
}

export default Footer