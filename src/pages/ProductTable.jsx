// import React, { useState, useEffect } from 'react';
// import { URL } from '../url';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { GrEdit } from "react-icons/gr";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { CiViewList } from "react-icons/ci";
// import Sidebar from '../components/Sidebar'
// import _ from 'lodash';

// const ProductTable = () => {
//   const [search, setSearch] = useState('');
//   const [titleFilter, setTitleFilter] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [products, setProducts] = useState([]);

  
//   // const fetchCategory = async () => {

//   //   const res = await axios.get(`${URL}/api/categories/${categoryId}`)
//   //   console.log(res.data)
//   //   setCategoryTitle(res.data.title)
//   // }

//   // useEffect(() => {
//   //   fetchCategory()
//   // },[categoryId])
  




//   const fetchProducts = async () => {

//     const res = await axios.get(`${URL}/api/products`)
//     console.log("see products",res.data)
//     setProducts(res.data)
//   }

//   useEffect(() => {
//     fetchProducts()
//   },[])


//   const fetchTitle = async (searchParams = {}) => {
    
//     const {title} = searchParams;

//     let url = `${URL}/api/products`;

//     if(title){
//       url += `?title=${encodeURIComponent(title)}`;
//     }

//     const res = await axios.get(url)
//     console.log(res.data)
//     setProducts(res.data)
//   }

//   const debounceFetchProducts = _.debounce(fetchTitle, 300);

//   useEffect(() => {
//     debounceFetchProducts({title: search});
//   },[search])

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };


//   const handleTitleFilter = (e) => {
//     setTitleFilter(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     fetchTitle({title:search});
//   }

//   const handleDelete = async(itemId)=>{
//     try{
//       const res = await axios.delete(`${URL}/api/products/${itemId}`)
//       setProducts((prevData) => prevData.filter(item => item.id !== itemId));
//       console.log(res.data)
//     }
//     catch(err){
//       console.log(err)
//     }
//   }

//   const filteredProducts = products?.filter(p =>
//     Object?.keys(p)?.some(key =>
//       p[key]?.toString()?.toLowerCase()?.includes(search?.toLowerCase())
//     ) && (!titleFilter || p.title === titleFilter)
//   );

//   const uniqueTitle = [...new Set(products.map(p => p.title))];
//   return (
//     <div>
//         <Sidebar />
//         <div className='flex-1 ml-[270px]'>
//         <div className='p-9'>
//         <p className='font-bold text-3xl text-[#5b3e31]'>Products</p>
//       <div className="mb-4 text-right">
//         <form onSubmit={handleSearchSubmit} className='mb-4 text-right'>
//         <input
//           type="text"
//           placeholder="Search by title"
//           value={search}
//           onChange={handleSearch}
//           className="p-2 border border-[#5b3e31] rounded"
//         />

// <button type="submit" className="ml-2 bg-[#5b3e31] text-white px-4 py-2 rounded-md">
//               Search
//             </button>

//             </form>

//         <select value={titleFilter} onChange={handleTitleFilter} className="ml-2 mr-2 p-2 border border-[#5b3e31]  rounded">
//           <option value="">Filter</option>
//           {uniqueTitle.map((title, index) => (
//             <option key={index} value={title}>{title}</option>
//           ))}
//         </select>

//         <Link to={'/createproduct'}><button className='bg-[#5b3e31] text-white px-6 py-2 rounded-md'>Create Product</button></Link>
//       </div>


//       <table className="w-full bg-white border text-left border-gray-200 rounded-md">
//         <thead className='bg-[#EADDCA] text-[#5b3e31]  rounded-md'>
//           <tr >
//             <th scope="col" className="py-4 px-6 ">image</th>
//             <th scope="col" className="py-4 px-6 ">title</th>
//             <th scope="col" className="py-4 px-6 ">heading</th>
//             <th scope="col" className="py-4 px-6 ">price(₦)</th>
//             <th scope="col" className="py-4 px-6 ">discount(₦)</th>
//             <th scope="col" className="py-4 px-6 ">category</th>
//             <th scope="col" className="py-4 px-6 ">sub category</th>
//             <th scope="col" className="py-4 px-6 ">brand</th>
//             <th scope="col" className="py-4 px-6 ">View</th>
//             <th scope="col" className="py-4 px-6 ">edit</th>
//             <th scope="col" className="py-4 px-6 ">Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products?.map((p, index) => (
//             <tr key={p.id} className=' border-b border-gray-300'>
//               <td className="px-6"><img src={p?.imageUrl} alt='' className='object-cover w-9 h-9'/></td>
//               <td className="px-6">{p?.title?.slice(0,7)+'...'}</td>
//               <td className="px-6">{p?.heading?.slice(0,7)+'...'}</td>
//               <td className="px-6">{p?.price}</td>
//               <td className="px-6">{p?.discount ? p.discount : 'none'}</td>

//               <td className="px-6">
//                 {p?.Category?.name?.slice(0,6)+"..."}
//                 </td>
//                 <td className="px-6">
//                 {p?.Sub?.name?.slice(0,6)+"..."}
//                 </td>

//                 <td className="px-6">
//                 {p?.brand?.slice(0,6)+"..."}
//                 </td>
//                 <Link to={`/editproduct/${p.id}`}><td className="py-4 px-6 pt-[25px]"><CiViewList size={23}/></td></Link>
//               <Link to={`/editproduct/${p.id}`}><td className="py-4 px-6 pt-[25px]"><GrEdit /></td></Link>
//           <td className="py-4 px-11" onClick={() => handleDelete(p.id)}><RiDeleteBinLine className='text-red-600' /></td>
  
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//         </div>
//     </div>
//   )
// }

// export default ProductTable

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import Sidebar from '../components/Sidebar';
import _ from 'lodash';
import axios from 'axios';
import { URL } from '../url';
import umbrella from '../assets/umbrella.jpeg'

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subcategory: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${URL}/api/products`);
      console.log('see all products', products)
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${URL}/api/products/${itemId}`);
      setProducts(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.heading?.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.brand?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters.category || product.Category?.name === filters.category;
    const matchesSubcategory = !filters.subcategory || product.Sub?.name === filters.subcategory;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesPrice = (!filters.minPrice || product.price >= Number(filters.minPrice)) &&
                        (!filters.maxPrice || product.price <= Number(filters.maxPrice));

    return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && matchesPrice;
  });

  // Get unique values for filter dropdowns
  const uniqueCategories = [...new Set(products.map(p => p.Category?.name).filter(Boolean))];
  const uniqueSubcategories = [...new Set(products.map(p => p.Sub?.name).filter(Boolean))];
  const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-0 lg:ml-[270px] p-4 lg:p-9">
        <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <h1 className="font-bold text-2xl lg:text-3xl text-[#5b3e31] mb-4 lg:mb-0">Products</h1>
          <Link to="/createproduct">
            <button className="bg-[#5b3e31] text-white px-4 py-2 rounded-md hover:bg-[#4a3228] transition-colors">
              Create Product
            </button>
          </Link>
        </div>

        {/* Filters Section */}
        <div className="mb-6 space-y-4">
          <button 
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="lg:hidden w-full bg-[#5b3e31] text-white px-4 py-2 rounded-md"
          >
            {isFilterMenuOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className={`space-y-4 lg:space-y-0 lg:flex lg:space-x-4 ${isFilterMenuOpen ? 'block' : 'hidden lg:flex'}`}>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full lg:w-64 p-2 border border-[#5b3e31] rounded focus:outline-none focus:ring-2 focus:ring-[#5b3e31]"
            />
            
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full lg:w-40 p-2 border border-[#5b3e31] rounded"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filters.subcategory}
              onChange={(e) => handleFilterChange('subcategory', e.target.value)}
              className="w-full lg:w-40 p-2 border border-[#5b3e31] rounded"
            >
              <option value="">All Subcategories</option>
              {uniqueSubcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="w-full lg:w-40 p-2 border border-[#5b3e31] rounded"
            >
              <option value="">All Brands</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-24 p-2 border border-[#5b3e31] rounded"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-24 p-2 border border-[#5b3e31] rounded"
              />
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-[#EADDCA] text-[#5b3e31] text-left">
              <tr>
                <th className="hidden lg:table-cell py-4 px-6">Image</th>
                <th className="py-4 px-6">Product Info</th>
                <th className="hidden lg:table-cell py-4 px-6">Price</th>
                <th className="hidden lg:table-cell py-4 px-6">Category</th>
                <th className="hidden lg:table-cell py-4 px-6">Brand</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="hidden lg:table-cell py-4 px-6">
                    <img 
                      src={product?.imageUrls ? product?.imageUrls[0] : umbrella} 
                      alt={product.title} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex lg:hidden mb-2">
                      <img 
                        src={product?.imageUrls ? product?.imageUrls[0] : umbrella} 
                        alt={product.title} 
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.title}</div>
                      <div className="text-sm text-gray-500">{product.heading}</div>
                      <div className="lg:hidden text-sm text-gray-600 mt-1">
                        Price: ₦{product.price}
                        {product.discount && <span className="text-red-500 ml-2">-₦{product.discount}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell py-4 px-6">
                    <div>₦{product.price}</div>
                    {product.discount && (
                      <div className="text-sm text-red-500">₦{product.discount}</div>
                    )}
                  </td>
                  <td className="hidden lg:table-cell py-4 px-6">
                    <div>{product.Category?.name}</div>
                    <div className="text-sm text-gray-500">{product.Sub?.name}</div>
                  </td>
                  <td className="hidden lg:table-cell py-4 px-6">{product.brand}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-4">
                      <Link to={`/viewproduct/${product.id}`}>
                        <CiViewList className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                      </Link>
                      <Link to={`/editproduct/${product.id}`}>
                        <GrEdit className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)}>
                        <RiDeleteBinLine className="w-5 h-5 text-red-600 hover:text-red-800" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;