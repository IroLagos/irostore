import React, { useState, useEffect } from 'react';
import { URL } from '../url';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Sidebar from '../components/Sidebar'
import _ from 'lodash';

const ProductTable = () => {
  const [search, setSearch] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {

    const res = await axios.get(`${URL}/api/products`)
    console.log(res.data)
    setProducts(res.data)
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
    setProducts(res.data)
  }

  const debounceFetchProducts = _.debounce(fetchTitle, 300);

  useEffect(() => {
    debounceFetchProducts({title: search});
  },[search])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  const handleTitleFilter = (e) => {
    setTitleFilter(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTitle({title:search});
  }

  const handleDelete = async(itemId)=>{
    try{
      const res = await axios.delete(`${URL}/api/products/${itemId}`)
      setProducts((prevData) => prevData.filter(item => item.id !== itemId));
      console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const filteredProducts = products?.filter(p =>
    Object?.keys(p)?.some(key =>
      p[key]?.toString()?.toLowerCase()?.includes(search?.toLowerCase())
    ) && (!titleFilter || p.title === titleFilter)
  );

  const uniqueTitle = [...new Set(products.map(p => p.title))];
  return (
    <div>
        <Sidebar />
        <div className='flex-1 ml-[270px]'>
        <div className='p-9'>
        <p className='font-bold text-3xl text-blue-600'>Products</p>
      <div className="mb-4 text-right">
        <form onSubmit={handleSearchSubmit} className='mb-4 text-right'>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={handleSearch}
          className="p-2 border border-blue-400 rounded"
        />

<button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
              Search
            </button>

            </form>

        <select value={titleFilter} onChange={handleTitleFilter} className="ml-2 mr-2 p-2 border border-blue-400  rounded">
          <option value="">Filter</option>
          {uniqueTitle.map((title, index) => (
            <option key={index} value={title}>{title}</option>
          ))}
        </select>

        <Link to={'/createproduct'}><button className='bg-blue-500 text-white px-6 py-2 rounded-md'>Create Product</button></Link>
      </div>


      <table className="w-full bg-white border text-left border-gray-200 rounded-md">
        <thead className='bg-blue-200 text-blue-700  rounded-md'>
          <tr >
            <th scope="col" className="py-4 px-6 ">image</th>
            <th scope="col" className="py-4 px-6 ">title</th>
            <th scope="col" className="py-4 px-6 ">heading</th>
            <th scope="col" className="py-4 px-6 ">price(₦)</th>
            <th scope="col" className="py-4 px-6 ">discount(₦)</th>
            <th scope="col" className="py-4 px-6 ">color</th>
            <th scope="col" className="py-4 px-6 ">size</th>
            <th scope="col" className="py-4 px-6 ">category</th>
            <th scope="col" className="py-4 px-6 ">edit</th>
            <th scope="col" className="py-4 px-6 ">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((p, index) => (
            <tr key={p.id} className=' border-b border-gray-300'>
              <td className="px-6"><img src={p?.imageUrl} alt='' className='object-cover w-9 h-9'/></td>
              <td className="px-6">{p?.title?.slice(0,7)+'...'}</td>
              <td className="px-6">{p?.heading?.slice(0,7)+'...'}</td>
              <td className="px-6">{p?.price}</td>
              <td className="px-6">{p?.discount ? p.discount : 'none'}</td>
              <td className="px-6">{p?.color ? p.color : 'none'}</td>
              <td className="px-6">{p?.size ? p.size : 'none'}</td>
              <td className="px-6">{p?.categoryId?.slice(0,6)+"..."}</td>
              <Link to={`/editproduct/${p.id}`}><td className="py-4 px-11 pt-[25px]"><GrEdit /></td></Link>
          <td className="py-4 px-11" onClick={() => handleDelete(p.id)}><RiDeleteBinLine className='text-red-600' /></td>
  
            </tr>
          ))}
        </tbody>
      </table>

    </div>
        </div>
    </div>
  )
}

export default ProductTable