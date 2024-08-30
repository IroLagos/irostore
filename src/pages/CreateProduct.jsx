import React,{useEffect, useState} from "react";
import { URL } from '../url'
import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'

  
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
    const [file, setFile] = useState(null)
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
    console.log(res.data)
    setBrand(res.data)
  }

  useEffect(() => {
    fetchBrands()
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
    formData.append('availability', selectedAvailability);
    if (file) {
      formData.append('imageUrl', file);
    }


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
          <label className='cursor-pointer'>
                  <input type="file" className="" onChange={(e) => setFile(e.target.files[0])} />
                  <span className='text-blue-500 underline'>Choose file</span>
                </label>
         
          <select value={selectedCategoryId} onChange={handleCategoryId} className="border border-black px-2 py-1">
            <option value="">Select Category:</option>
            {category.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ) )}
          </select>

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


<button onClick={handleProduct} className="bg-blue-500 text-white py-1">{isLoading ? <p>Creating ...</p> : <p>Create Product</p>}</button>

          
        </div>
       
      </div>
    </div>
  );
};

export default CreateProduct;
