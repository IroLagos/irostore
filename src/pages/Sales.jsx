import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { URL } from '../url';
import axios from 'axios';
import BestSellerCard from '../components/BestSellerCard';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { RxCross1 } from "react-icons/rx";

const Sales = () => {
    const [products, setProduct] = useState([])
    const [search, setSearch] = useState('');

    const navigate = useNavigate()

    const fetchProducts = async () => {
        const res = await axios.get(`${URL}/api/products`)
        console.log(res.data)
        setProduct(res.data)
    }

    useEffect(() => {
        fetchProducts()
    },[])

    const fetchTitle = async (searchParams = {}) => {

        const {title} = searchParams;

        let url = `${URL}/api/products`;

        if(title){
            url += `?title=${encodeURIComponent(title)}`;
        }

        const res = await axios.get(url)
        console.log(res.data)
        setProduct(res.data)
    }

    const debounceFetchProducts = _.debounce(fetchTitle, 300);

    useEffect(() => {
      debounceFetchProducts({title: search});
    },[search])

    const handleSearch = (e) => {
        
        setSearch(e.target.value);
      };
    
    const handleSearchSubmit = (e) => {
     e.preventDefault();
    fetchProducts({title:search});
    }


    const discountedProducts = products?.filter(p => p.discount > 0 )  

  return (
    <div className='py-2 px-3 md:px-9'>

        <p className='mt-4 font-semibold text-2xl text-center'>See All Our Amazing Collections on Sale!!!!</p>

    <div className='pt-9 flex justify-between px-3'>
    <form onSubmit={handleSearchSubmit}>
            <input type='text' value={search}
              onChange={handleSearch} className='border border-black w-[400px] md:w-[1500px] py-3 rounded-full px-6 focus:outline-none text-xl' placeholder='Find a Product' />
            
    
    
    {/* <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                  Search
                </button> */}
    
                </form>
    
                <p onClick={() => navigate('/')} className='mt-3'><RxCross1 size={30} /></p>
            </div>
            
    
    <div className='flex justify-center mt-12'>
    
    <div className='grid grid-cols-3 gap-x-48 gap-y-12 '>
        { discountedProducts?.map((p, index) => (
            <Link to={`/productdetails/${p.id}`}>
      <div key={p.id}>
            <BestSellerCard title={p.title} heading={p.heading} price={p.price} discount={p.discount} imageUrl={p.imageUrl}/>
            </div>
      </Link>
        ))}
    
    
    </div>
    
    
    </div>
            
            
    
    <div className='mb-24'></div>

    </div>
  )
}

export default Sales