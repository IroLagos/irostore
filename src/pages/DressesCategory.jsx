import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { URL } from '../url'
import axios from 'axios'
import BestSellerCard from '../components/BestSellerCard'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { RxCross1 } from "react-icons/rx"
import abstractbeauty from '../assets/abstractbeauty.jpg'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"

const DressesCategory = () => {
    const [products, setProduct] = useState([])
    const [search, setSearch] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    const fetchProducts = async () => {
        const res = await axios.get(`${URL}/api/products`)
        setProduct(res.data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchTitle = async (searchParams = {}) => {
        const { title } = searchParams
        let url = `${URL}/api/products`
        if (title) {
            url += `?title=${encodeURIComponent(title)}`
        }
        const res = await axios.get(url)
        setProduct(res.data)
    }

    const debounceFetchProducts = _.debounce(fetchTitle, 300)

    useEffect(() => {
        debounceFetchProducts({ title: search })
    }, [search])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchProducts({ title: search })
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 >= products.length ? 0 : prevIndex + 1
        )
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? products.length - 1 : prevIndex - 1
        )
    }

    const filteredDress = products?.filter((w) => w.Category.name == "Women")
    .sort((a, b) => {
        // Sort products with images first
        if (a.imageUrl && !b.imageUrl) return -1;
        if (!a.imageUrl && b.imageUrl) return 1;
        return 0;
    })

    return (
        <div className=''>
            <Banner />
            <Navbar />

            <div className='relative'>
                <img src={abstractbeauty} className='w-full h-[300px] md:h-[500px] object-cover' />
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-6xl md:text-[200px] font-semibold">DRESSES</p>
                </div>
            </div>

            <p className='mt-4 font-semibold text-xl md:text-2xl text-center px-4'>See All Our Amazing Beauty Collections</p>

            <div className='relative flex justify-center items-center mt-12'>
                <button
                    onClick={prevSlide}
                    className='absolute left-2 md:left-[20px] bg-gray-200 p-2 rounded-full z-10'
                >
                    <FaChevronLeft />
                </button>

                <div className='flex flex-col md:flex-row justify-center items-center md:gap-x-8 lg:gap-x-16 mt-4 px-4'>
                    {filteredDress?.slice(currentIndex, currentIndex + (window.innerWidth >= 768 ? 3 : 1))?.map(d => (
                        <Link to={`/productdetails/${d.id}`} key={d.id} className="w-full md:w-auto mb-8 md:mb-0">
                            <BestSellerCard
                                title={d.title}
                                heading={d.heading}
                                imageUrl={d?.imageUrl}
                                price={d.price}
                                discount={d?.discount}
                                description={d.description}
                                color={d.color}
                            />
                        </Link>
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className='absolute right-2 md:right-[20px] bg-gray-200 p-2 rounded-full z-10'
                >
                    <FaChevronRight />
                </button>
            </div>

            <div className='mb-24'></div>
        </div>
    )
}

export default DressesCategory