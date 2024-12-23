import React,{useEffect, useState} from "react";
import { URL } from '../url'
import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

  
const available = [
  {
    id:1,
    availability:"In Stock"
  },
  {
    id:2,
    availability:"Out of Stock"
  }
]


const CreateProduct = () => {
  const navigate = useNavigate()

    const [title,setTitle]=useState("")
    const [heading,setHeading]=useState("")
    const [files, setFiles] = useState([])
    const [imageUrl,setImageUrl]=useState(null)
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("")
    const [color,setColor]=useState("")
    const [size,setSize]=useState("")
    // const [categoryId, setCategoryId]=useState("")
    const [selectedCategoryId, setSelectedCategoryId]=useState([])
    const [category, setCategory]=useState([])
    const [selectedBrand, setSelectedBrand]=useState([])
    const [brand, setBrand]=useState([])
    const [availability, setAvailability]=useState([])
    const [selectedAvailability, setSelectedAvailability]=useState([])
    const [sub, setSub]=useState([])
    const [selectedSub, setSelectedSub]=useState([])
    const [counter, setCounter]=useState(1)
    const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    const res = await axios.get(`${URL}/api/categories`)
    console.log(res.data)
    setCategory(res.data)
  }

  useEffect(() => {
    fetchCategories()
  },[])

  const fetchBrands = async () => {
    const res = await axios.get(`${URL}/api/brands`)
    console.log("see brand stuff",res.data)
    setBrand(res.data)
  }

  useEffect(() => {
    fetchBrands()
  },[])


  const fetchSubs = async () => {
    const res = await axios.get(`${URL}/api/subs`)
    console.log("see subcategories",res.data)
    setSub(res.data)
  }

  useEffect(() => {
    fetchSubs()
  },[])

    const handleCategoryId = (e) => {       
        setSelectedCategoryId(e.target.value);
    };

    const handleBrand = (e) => {       
      setSelectedBrand(e.target.value);
  };

    const handleAvailability = (e) => {       
      setSelectedAvailability(e.target.value);
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

    const handleProduct = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('heading', heading);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('color', color);
    formData.append('size', size);
    formData.append('categoryId', selectedCategoryId);
    formData.append('brand', selectedBrand);
    formData.append('sub', selectedSub);
    formData.append('availability', selectedAvailability);
    formData.append('counter', counter);

    files.forEach((file, index) => {
      formData.append('imageUrl', file);
    });


    const res = await axios.post(`${URL}/api/products/create`, formData, {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    });
    if (res){
      navigate('/producttable')
      setIsLoading(false)
    }
  
  }

 
  return (
    <div className="w-full">
    
      <div className="items-center h-[100vh] justify-center flex w-full">
 <div className="flex flex-col gap-y-6">
        <p className="text-2xl text-center">Create Product</p>
          <input onChange={(e)=>setTitle(e.target.value)} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Title" />
          <input onChange={(e)=>setHeading(e.target.value)} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Add a header message" />
          <input onChange={(e)=>setPrice(e.target.value)} className="border border-black px-2 py-1" placeholder="Price" />
          <input onChange={(e)=>setDescription(e.target.value)} className="border border-black px-2 py-1" placeholder="Description" />
          <input onChange={(e)=>setColor(e.target.value)} className="border border-black px-2 py-1" placeholder="Color " />
          <input onChange={(e)=>setSize(e.target.value)} className="border border-black px-2 py-1" placeholder="Size " />

          <p>Quantity</p>
          <div className="flex gap-x-9">
          <button className="bg-black text-white px-4"><HiOutlineMinus /></button>
          <p>{counter}</p>
          <button className="bg-black text-white px-4"><HiOutlinePlus /></button>
          </div>


                 <div className="flex items-center space-x-2">
            <label className='cursor-pointer bg-black text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileChange} 
                multiple 
              />
              Choose Files
            </label>
            <span>{files.length} file(s) selected</span>
          </div>
         
          <select value={selectedCategoryId} onChange={handleCategoryId} className="border border-black px-2 py-1">
            <option value="">Select Category:</option>
            {category.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ) )}
          </select>

          {/* <select value={selectedSub} onChange={handleCategoryId} className="border border-black px-2 py-1">
            <option value="">Select Sub Category:</option>
            {sub?.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ) )}
          </select> */}

          <select value={selectedBrand} onChange={handleBrand} className="border border-black px-2 py-1">
            <option value="">Select Brand:</option>
            {brand.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ) )}
          </select>

          <select value={selectedAvailability} onChange={handleAvailability} className="border border-black px-2 py-1">
            <option value="">Select Availability:</option>
            {available.map(item => (
              <option key={item.id} value={item.availability}>{item.availability}</option>
            ) )}
          </select>


<button onClick={handleProduct} className="bg-black text-white py-1">{isLoading ? <p>Creating ...</p> : <p>Create Product</p>}</button>

          
        </div>
       
      </div>
    </div>
  );
};

export default CreateProduct;
