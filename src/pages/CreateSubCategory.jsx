import React,{useEffect, useState} from "react";
import { URL } from '../url'
import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'
  

const CreateSubCategory = () => {
  const navigate = useNavigate()

    const [name,setName]=useState("")
    // const [file, setFile] = useState(null)
    // const [imageUrl,setImageUrl]=useState(null)
    const [isLoading, setIsLoading] = useState(false)
    


    const handleSubCategory = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${URL}/api/subs/create`, {name}, {
      headers:{
        'Content-Type':'application/json'
      }
    });
    if (res){
      navigate('/subcategorytable')
    }
  }
    
  return (
    <div className="w-full">
    
      <div className="items-center h-[100vh] justify-center flex w-full">
 <div className="flex flex-col gap-y-6">
        <p className="text-2xl text-center">Create Sub-Category</p>
          <input onChange={(e)=>setName(e.target.value)} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Name" />



<button onClick={handleSubCategory} className="bg-blue-500 text-white py-1">{isLoading ? "Creating ..." : "Create Sub Category"}</button>

          
        </div>
       
      </div>
    </div>
  );
};

export default CreateSubCategory;
