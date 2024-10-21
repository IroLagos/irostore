import React, { useEffect, useState } from "react";
import { URL } from '../url'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

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


const EditProduct = () => {
  const navigate = useNavigate()
  const { id: productId } = useParams()
  const [product, setProduct] = useState({
    title: "",
    heading:"",
    price: "",
    discount:"",
    description: "",
    color: "",
    size: "",
    availability:"",
    brand:"",
    imageUrls: [],
  })
  const [files, setFiles] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedAvailability, setSelectedAvailability]=useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCategories = async () => {
    const res = await axios.get(`${URL}/api/categories`)
    setCategories(res.data)
  }

  const fetchBrands = async () => {
    const res = await axios.get(`${URL}/api/brands`)
    console.log("see brand stuff",res.data)
    setBrands(res.data)
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${URL}/api/products/${productId}`)
      setProduct(res.data)
      setSelectedCategoryId(res.data.categoryId)
      setSelectedAvailability(res.data.availability)
    } catch (error) {
      console.error("Failed to fetch product:", error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
    fetchBrands()
  }, [productId])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0])
  // }

  const handleFileChange = (e) => {
    setFiles([...e.target.files])
  }

  const handleAvailability = (e) => {       
    setSelectedAvailability(e.target.value);
};

  const editProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")

    const updatedProduct = {
      title: product.title,
      heading: product.heading,
      price: parseFloat(product.price),
      discount: parseFloat(product.discount),
      description: product.description,
      color: product.color,
      size: product.size,
      categoryId: selectedCategoryId,
      brand:selectedBrand,
      availability:selectedAvailability
    }

    try {
      const res = await axios.put(`${URL}/api/products/${productId}`, updatedProduct, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.data) {
        navigate('/producttable')
      }
    } catch (error) {
      console.error("failed to update product:", error)
      setError("Failed to update product. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  const updateImages = async () => {
    setIsLoading(true)
    setError("")

    const formData = new FormData()
    if (files.length > 0) {
      files.forEach((file, index) => {
        formData.append('imageUrl', file)
      })
    } else {
      setError("Please select an images to upload")
      setIsLoading(false)
      return
    }

    try {
      const res = await axios.put(`${URL}/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        setProduct(prev => ({ ...prev, imageUrls: res.data.imageUrls }))
        setFiles([])
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
      const res = await axios.delete(`${URL}/api/products/${productId}/image`);
      if (res.data) {
        setProduct(prev => ({ ...prev, imageUrls: null }))
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
        <form onSubmit={editProduct}>
          <div className="flex flex-col gap-y-6">
            <p className="text-2xl text-center">Edit Product</p>
            {error && <p className="text-red-500">{error}</p>}
            <input name="title" value={product.title} onChange={handleInputChange} className="border border-black px-2 py-1 w-full md:w-[500px]" placeholder="Title" />
            <input name="heading" value={product.heading} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Heading" />
            <input name="price" value={product.price} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Price" />
            <input name="discount" value={product.discount} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="discounted Price" />
            <input name="description" value={product.description} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Description" />
            <input name="color" value={product.color} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Color " />
            <input name="size" value={product.size} onChange={handleInputChange} className="border border-black px-2 py-1" placeholder="Size " />
            <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} className="border border-black px-2 py-1">
              <option value="">Select Category:</option>
              {categories?.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>

            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="border border-black px-2 py-1">
              <option value="">Select Brand:</option>
              {brands?.map(item => (
                <option key={item.id} value={item.name}>{item.name}</option>
              ))}
            </select>

            <select value={selectedAvailability} onChange={handleAvailability} className="border border-black px-2 py-1">
              <option value="">Select Availability:</option>
              {available.map(item => (
                <option key={item.id} value={item.availability}>{item.availability}</option>
              ))}
            </select>
            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white py-1">{isLoading ? "Updating ..." : "Update Product Info"}</button>
          </div>
        </form>

        <div className="mt-8">
          {/* <p className="text-xl mb-4">Update Image</p>
          {product.imageUrl && (
            <div>
              <p>Current image:</p>
              <img src={product.imageUrl} alt="Product" className="w-32 h-32 object-cover mb-2" />

            </div>
          )}
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button onClick={updateImage} disabled={isLoading} className="bg-green-500 text-white px-3 py-1 rounded-md">
            {isLoading ? "Updating..." : "Update Image"}
          </button> */}

<div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {product.imageUrls?.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded" />
                <button onClick={() => removeImage(url)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">
                  X
                </button>
              </div>
            ))}
          </div>
          <input type="file" onChange={handleFileChange} multiple className="mb-2" />
          <button onClick={updateImages} disabled={isLoading} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
            {isLoading ? "Updating..." : "Update Images"}
          </button>
        </div>


        </div>
      </div>
    </div>
  );
};

export default EditProduct;
