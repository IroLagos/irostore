import React, { useState, useEffect } from 'react';
import { URL } from '../url';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Sidebar from '../components/Sidebar'


const usersData = [
  { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'USA', date: '2023-01-01' },
  { firstName: 'James', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'Nigeria', date: '2023-01-01' },
  { firstName: 'Henry', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'London', date: '2023-01-01' },
  { firstName: 'Charles', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'Ghana', date: '2023-01-01' },
  { firstName: 'Manny', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'Japan', date: '2023-01-01' },
  { firstName: 'Simi', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'Egypt', date: '2023-01-01' },
  { firstName: 'Joshua', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'Morocco', date: '2023-01-01' },
  { firstName: 'Faith', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'Spain', date: '2023-01-01' },
  { firstName: 'Bassey', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', state: 'CA', country: 'USA', date: '2023-01-01' },
  // Add more user data here
];


const CategoryTable = () => {

  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);
  const [countryFilter, setCountryFilter] = useState('');
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    const res = await axios.get(`${URL}/api/categories`)
    console.log(res.data)
    setCategories(res.data)
  }

  useEffect(() => {
    fetchCategories()
  },[])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const handleCountryFilter = (e) => {
    setCountryFilter(e.target.value);
  };

  const handleDelete = async(itemId)=>{
    try{
      const res = await axios.delete(`${URL}/api/categories/${itemId}`)
      setCategories((prevData) => prevData.filter(item => item.id !== itemId));
      console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const filteredUsers = users.filter(user =>
    Object.keys(user).some(key =>
      user[key].toString().toLowerCase().includes(search.toLowerCase())
    ) && (!countryFilter || user.country === countryFilter)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOption === 'latest') {
      return new Date(b.date) - new Date(a.date);
    }
    return new Date(a.date) - new Date(b.date);
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const uniqueCountries = [...new Set(users.map(user => user.country))];


  return (
    <div>
        <Sidebar />
        <div className='flex-1 ml-[300px]'>
        <div className='p-9'>
        <p className='font-bold text-3xl text-blue-600'>Categories</p>
      <div className="mb-4 text-right mt-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className="p-2 border border-blue-400 rounded"
        />
        {/* <select value={sortOption} onChange={handleSort} className="ml-2 p-2 border border-gray-300 rounded">
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Date</option>
        </select> */}
        <select value={countryFilter} onChange={handleCountryFilter} className="ml-2 mr-2 p-2 border border-blue-400  rounded">
          <option value="">Filter</option>
          {uniqueCountries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>

        <Link to={'/createcategory'}><button className='bg-blue-500 text-white px-6 py-2 rounded-md'>Create Category</button></Link>
      </div>


      <table className="w-[1200px] bg-white border text-left border-gray-200 rounded-md mt-9">
        <thead className='bg-blue-200 text-blue-700  rounded-md'>
          <tr >
            <th scope="col" className="py-4 px-11 ">image</th>
            <th scope="col" className="py-4 px-11 ">name</th>
            <th scope="col" className="py-4 px-11 ">edit</th>
            <th scope="col" className="py-4 px-11 ">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* {currentUsers.map((user, index) => ( */}
          {categories.map((p, index) => (
            <tr key={p.id} className=' border-b border-gray-300'>
              <td className="py-4 px-11"><img src={p?.imageUrl} alt='' className='object-cover w-9 h-9'/></td>
              <td className="py-4 px-11">{p?.name?.slice(0,7)+'...'}</td>
              <Link to={`/editcategory/${p.id}`}><td className="py-4 px-11 pt-[25px]"><GrEdit /></td></Link>
          <td className="py-4 px-11" onClick={() => handleDelete(p.id)}><RiDeleteBinLine className='text-red-600' /></td>
                {/*   <td className="py-4 px-11">{user.date}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 border ${currentPage === i + 1 ? 'bg-gray-200' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
        </div>
    </div>
  )
}

export default CategoryTable