import React,{useEffect, useState} from "react";
import { URL } from '../url'
import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'
  

const CreateBrand = () => {
  const navigate = useNavigate()

    const [name,setName]=useState("")
    const [file, setFile] = useState(null)
    const [imageUrl,setImageUrl]=useState(null)
    const [isLoading, setIsLoading] = useState(false)
    


    const handleBrand = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    // formData.append('price', price);
    // formData.append('description', description);
    // formData.append('color', color);
    // formData.append('size', size);
    // formData.append('categoryId', selectedCategoryId);
    if (file) {
      formData.append('imageUrl', file);
    }


    const res = await axios.post(`${URL}/api/brands/create`, formData, {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    });
    if (res){
      navigate('/brandtable')
    }
  
  }



      
   

    
  return (
    <div className="w-full">
    
      <div className="items-center h-[100vh] justify-center flex w-full">
 <div className="flex flex-col gap-y-6">
        <p className="text-2xl text-center">Create Brand</p>
          <input onChange={(e)=>setName(e.target.value)} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Name" />
          <label className='cursor-pointer'>
                  <input className='text-blue-500 underline' type="file" onChange={(e) => setFile(e.target.files[0])} />
          
                </label>
         
      


<button onClick={handleBrand} className="bg-blue-500 text-white py-1">{isLoading ? "Creating ..." : "Create Brand"}</button>

          
        </div>
       
      </div>
    </div>
  );
};

export default CreateBrand;
