import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import Sidebar from '../components/Sidebar';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import umbrella from '../assets/umbrella.jpeg'

const ViewProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${URL}/api/products/${id}`);
        console.log('see products', product)
        setProduct(res.data);
        setError(null);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${URL}/api/products/${id}`);
        navigate('/products');
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-0 lg:ml-[270px] p-4 lg:p-9">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5b3e31]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-0 lg:ml-[270px] p-4 lg:p-9">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button 
              onClick={() => navigate('/producttable')}
              className="bg-[#5b3e31] text-white px-4 py-2 rounded-md hover:bg-[#4a3228]"
            >
              Return to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-0 lg:ml-[270px] p-4 lg:p-9">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/producttable')}
            className="flex items-center text-[#5b3e31] hover:text-[#4a3228] mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#5b3e31] mb-4 lg:mb-0">
              Product Details
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/editproduct/${id}`)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Product Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product?.imageUrls ? product?.imageUrls[0] : umbrella}
                  alt={product?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{product?.title}</h2>
                <p className="text-lg text-gray-600 mt-2">{product?.heading}</p>
        
              </div>

              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold">₦{product?.price}</span>
                  {product?.discount && (
                    <span className="text-red-500 font-medium">
                      Discount: ₦{product?.discount}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{product?.Category?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subcategory</p>
                    <p className="font-medium">{product?.sub}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sub-Subcategory</p>
                    <p className="font-medium">{product?.subsub}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Brand</p>
                    <p className="font-medium">{product?.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{product?.counter}</p>
                  </div>
                  
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Details</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(product || {}).map(([key, value]) => {
                    // Skip certain fields we've already displayed or complex objects
                    if (['id', 'imageUrl', 'title', 'heading', 'price', 'discount', 'Category', 'Sub'].includes(key) || 
                        typeof value === 'object') {
                      return null;
                    }
                    return (
                      <div key={key} className="border-b border-gray-100 pb-2">
                        <p className="text-sm text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="font-medium">{value?.toString() || 'N/A'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;