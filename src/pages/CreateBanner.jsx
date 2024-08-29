import React,{useEffect, useState} from "react";
import { URL } from '../url'
import axios from 'axios'
import {Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
  

const CreateBanner = () => {
  const navigate = useNavigate()

    const [title,setTitle] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    


//     const handlePost = async (e) => {
//     e.preventDefault();

//     setIsLoading(true)
//     const formData = new FormData();
//     formData.append('title', title);


//     const res = await axios.post(`${URL}/api/banners/create`, formData
//     //      {
//     //   headers:{
//     //     'Content-Type':'multipart/form-data'
//     //   }
//     // }
// );
//     if (res){
//       navigate('/dashboard')
//       setIsLoading(false)
//     }
  
//   }

const handlePost = async () => {
    const res = await axios.post(`${URL}/api/banners/create`, {title})
    if(res.status === 200){
        setIsLoading(false)
        navigate('/dashboard')
    }
}



      
   

    
  return (
    <div>
        <Sidebar />
    <div className="w-full flex-1">
    
      <div className="items-center h-[100vh] justify-center flex w-full">
 <div className="flex flex-col gap-y-6">
        <p className="text-2xl text-center">Create Post</p>
          <input onChange={(e)=>setTitle(e.target.value)} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Banner Message" />
          {/* <input onChange={(e)=>setHeading(e.target.value)} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Heading" />
          <textarea onChange={(e)=>setText(e.target.value)} className="border border-black px-2 py-1 w-full md:w-[500px] h-[200px]" placeholder="Text" />
          <label className='cursor-pointer'>
                  <input className='text-blue-500 underline' type="file" onChange={(e) => setFile(e.target.files[0])} />
          
                </label>
          */}
      


<button onClick={handlePost} className="bg-blue-500 text-white py-1">{isLoading ? "Creating ..." : "Create Post"}</button>

          
        </div>
       
      </div>
    </div>

    </div>
  );
};

export default CreateBanner;
