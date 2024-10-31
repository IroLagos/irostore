import React, { useEffect, useState } from "react";
import { URL } from '../url';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';


const sizes = [
  {id: 1,
    size:"small"
  },
  {id: 2,
    size:"medium"
  },
  {id: 3,
    size:"large"
  },
  {id: 4,
    size:"extra-large"
  },
  {id: 5,
    size:"one size"
  }

]



const EditProduct = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [product, setProduct] = useState({
    title: "",
    heading: "",
    price: "",
    discount: "",
    description: "",
    color: "",
    size: [],
    counter: "0", // Added counter field
    availability: "",
    brand: "",
    sub:"",
    subsub:"",
    imageUrls: [],
  });

  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");


  // Fetch all required data
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [categoriesRes, subsRes, subsubsRes, brandsRes, productRes] = await Promise.all([
          axios.get(`${URL}/api/categories`),
          axios.get(`${URL}/api/subs`),
          axios.get(`${URL}/api/subsubs`),
          axios.get(`${URL}/api/brands`),
          axios.get(`${URL}/api/products/${productId}`)
        ]);

        console.log('sub category', subCategories)
        setCategories(categoriesRes.data);
        setSubCategories(subsRes.data);
        setSubSubCategories(subsubsRes.data);
        setBrands(brandsRes.data);
        
        // Set product data
        const productData = productRes.data;
        setProduct(productData);
        setSelectedSizes(productData.size || []);
        setSelectedCategoryId(productData.categoryId);
        setSelectedSubCategory(productData.sub);
        setSelectedSubSubCategory(productData.subsub);
        setSelectedBrand(productData.brand);
      } catch (err) {
        setError("Failed to load product data. Please try again.");
        console.error("Data fetching error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [productId]);

  // Handle size selection
  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    if (selectedSize && !selectedSizes.includes(selectedSize)) {
      const newSizes = [...selectedSizes, selectedSize];
      setSelectedSizes(newSizes);
      setProduct(prev => ({
        ...prev,
        size: newSizes
      }));
    }
  };

  const removeSize = (sizeToRemove) => {
    const newSizes = selectedSizes.filter(size => size !== sizeToRemove);
    setSelectedSizes(newSizes);
    setProduct(prev => ({
      ...prev,
      size: newSizes
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const editProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const updatedProduct = {
      ...product,
      price: parseFloat(product.price),
      discount: parseFloat(product.discount) || 0,
      counter: parseInt(product.counter) || 0,
      size: selectedSizes,
      categoryId: selectedCategoryId,
      sub: selectedSubCategory,
      subsub: selectedSubSubCategory,
      brand: selectedBrand,
    };

    try {
      await axios.put(`${URL}/api/products/${productId}`, updatedProduct);
      navigate('/producttable');
    } catch (err) {
      setError("Failed to update product. Please try again.");
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateImages = async () => {
    if (!files.length) {
      setError("Please select images to upload");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('imageUrl', file));

    try {
      const res = await axios.put(`${URL}/api/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProduct(prev => ({ ...prev, imageUrls: res.data.imageUrls }));
      setFiles([]);
    } catch (err) {
      setError("Failed to update images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async (imageUrl) => {
    setIsLoading(true);
    try {
      const updatedUrls = product.imageUrls.filter(url => url !== imageUrl);
      const res = await axios.put(`${URL}/api/products/${productId}`, {
        imageUrls: updatedUrls
      });
      setProduct(prev => ({ ...prev, imageUrls: res.data.imageUrls }));
    } catch (err) {
      setError("Failed to remove image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !product.title) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5b3e31]"></div>
      </div>
    );
  }

  // Replace the size input in the form with this new multi-select component
  const SizeSelector = () => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Sizes</label>
      <div className="space-y-2">
        <select
          onChange={handleSizeChange}
          value=""
          className="w-full border rounded p-2"
        >
          <option value="">Add Size</option>
          {sizes.map(s => (
            <option 
              key={s.id} 
              value={s.size}
              disabled={selectedSizes.includes(s.size)}
            >
              {s.size}
            </option>
          ))}
        </select>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSizes.map((size, index) => (
            <div 
              key={index}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1"
            >
              <span className="text-sm">{size}</span>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        {selectedSizes.length === 0 && (
          <p className="text-sm text-gray-500 mt-1">No sizes selected</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button 
        onClick={() => navigate('/producttable')}
        className="flex items-center text-[#5b3e31] hover:text-[#4a3228] mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-[#5b3e31] mb-6">Edit Product</h1>
          {error && <p className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</p>}
          
          <form onSubmit={editProduct} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Title</label>
              <input
                name="title"
                value={product.title}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-[#5b3e31]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Heading</label>
              <input
                name="heading"
                value={product.heading}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Price (₦)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Discount (₦)</label>
                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Quantity in Stock</label>
                <input
                  type="number"
                  name="counter"
                  value={product.counter}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Availability</label>
                <select
                  value={product.availability}
                  onChange={(e) => setProduct(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Availability</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Color</label>
                <input
                  name="color"
                  value={product.color}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* <div className="space-y-2">
                <label className="block text-sm font-medium">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Size</option>
                  {sizes.map(s => (
                    <option key={s.id} value={s.size}>{s.size}</option>
                  ))}
                </select>
              </div> */}

              
        {/* New Size Selector Component */}
        <SizeSelector />

              <div className="space-y-2">
                <label className="block text-sm font-medium">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Category</label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value);
                  }}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Sub Category</label>
                <select
                  value={selectedSubCategory}
                  onChange={(e) => {
                    setSelectedSubCategory(e.target.value);
                   
                  }}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Sub Category</option>
                  {subCategories?.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Sub Sub-Category</label>
                <select
                  value={selectedSubSubCategory}
                  onChange={(e) => {
                    setSelectedSubSubCategory(e.target.value);
                   
                  }}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Sub-Category</option>
                  {subSubCategories?.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5b3e31] text-white py-2 rounded hover:bg-[#4a3228] transition-colors"
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>

        {/* Images Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-[#5b3e31] mb-6">Product Images</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {product.imageUrls?.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={() => removeImage(url)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              className="w-full"
              accept="image/*"
            />
            <button
              onClick={updateImages}
              disabled={isLoading || !files.length}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? "Updating..." : "Upload Images"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
