import React, { useEffect, useState } from "react";
import { URL } from '../url'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditCategory = () => {
  const navigate = useNavigate()
  const { id: categoryId } = useParams()
  const [category, setCategory] = useState({
    name: "",
    imageUrl: null,
  })
  const [file, setFile] = useState(null)
//   const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${URL}/api/categories/${categoryId}`)
      setCategory(res.data)
    } catch (error) {
      console.error("Failed to fetch category:", error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [categoryId])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const editCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")

    const updatedCategory = {
      name: category.name,
    }

    try {
      const res = await axios.put(`${URL}/api/categories/${categoryId}`, updatedCategory, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.data) {
        navigate('/categorytable')
      }
    } catch (error) {
      console.error("failed to update category:", error)
      setError("Failed to update category. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  const updateImage = async () => {
    setIsLoading(true)
    setError("")

    const formData = new FormData()
    if (file) {
      formData.append('imageUrl', file)
    } else {
      setError("Please select an image to upload")
      setIsLoading(false)
      return
    }

    try {
      const res = await axios.put(`${URL}/api/categories/${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        setCategory(prev => ({ ...prev, imageUrl: res.data.imageUrl }))
        setFile(null)
      }
    } catch (error) {
      console.error("failed to update image:", error)
      setError("Failed to update image. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  const removeImage = async () => {
    setIsLoading(true)
    setError("")

    try {
      const res = await axios.delete(`${URL}/api/categories/${categoryId}`);
      if (res.data) {
        setCategory(prev => ({ ...prev, imageUrl: null }))
      }
    } catch (error) {
      console.error("failed to remove image:", error)
      setError("Failed to remove image. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="items-center h-[100vh] gap-x-9 justify-center flex w-full">
        <form onSubmit={editCategory}>
          <div className="flex flex-col gap-y-6">
            <p className="text-2xl text-center">Edit Category</p>
            {error && <p className="text-red-500">{error}</p>}
            <input name="name" value={category.name} onChange={handleInputChange} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="name" />
            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white py-1">{isLoading ? "Updating ..." : "Update category name"}</button>
          </div>
        </form>

        <div className="mt-8">
          <p className="text-xl mb-4">Update Image</p>
          {category.imageUrl && (
            <div>
              <p>Current image:</p>
              <img src={category.imageUrl} alt="category" className="w-32 h-32 object-cover mb-2" />
              {/* <button onClick={removeImage} className="bg-red-500 text-white px-3 py-1 rounded-md mb-4">Remove Image</button> */}
            </div>
          )}
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button onClick={updateImage} disabled={isLoading} className="bg-green-500 text-white px-3 py-1 rounded-md">
            {isLoading ? "Updating..." : "Update Image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
