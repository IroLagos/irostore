import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './context/ProtectedRoute'
import AdminLogin from './pages/AdminLogin'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import ProductTable from './pages/ProductTable'
import Login from './pages/Login'
import CategoryTable from './pages/CategoryTable'
import CreateCategory from './pages/CreateCategory'
import EditCategory from './pages/EditCategory'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import CreateBanner from './pages/CreateBanner'
import PurchaseTable from './pages/PurchaseTable'
import Search from './pages/Search'
import Sales from './pages/Sales'
import Register from './pages/Register'
import EditBrand from './pages/EditBrand'
import CreateBrand from './pages/CreateBrand'
import BrandTable from './pages/BrandTable'
import Women from './pages/Women'
import Men from './pages/Men'
import HomeDecor from './pages/HomeDecor'
import Beauty from './pages/Beauty'
import BeautyCategory from './pages/BeautyCategory'
import HomeDecorCategory from './pages/HomeDecorCategory'
import DressesCategory from './pages/DressesCategory'
import POS from './pages/POS'
import Blogs from './pages/Blogs'
import BlogDetails from './pages/BlogDetails'
import ViewProduct from './pages/ViewProduct'
import CreateSubCategory from './pages/CreateSubCategory'
import SubCategoryTable from './pages/SubCategoryTable'
import CreateSubSubCategory from './pages/CreateSubSubCategory'
import SubSubCategoryTable from './pages/SubSubCategoryTable'

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/productdetails/:id' element={<ProductDetails />} />
      <Route exact path='/cart' element={<Cart />} />
      {/* <Route exact path="/login" element={<Login/>}/> */}
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/search" element={<Search/>}/>
      <Route exact path="/sales" element={<Sales/>}/>
      <Route exact path="/women" element={<Women/>}/>
      <Route exact path="/dressescategory" element={<DressesCategory />}/>
      <Route exact path="/men" element={<Men/>}/>
      <Route exact path="/homedecor" element={<HomeDecor/>}/>
      <Route exact path="/homedecorcategory" element={<HomeDecorCategory/>}/>
      <Route exact path="/beauty" element={<Beauty/>}/>
      <Route exact path="/beautycategory" element={<BeautyCategory/>}/>
      <Route exact path="/posts" element={<Blogs/>}/>
      <Route exact path="/blogdetails/:id" element={<BlogDetails/>}/>
      <Route exact path='/admin' element={<AdminLogin />} />
      <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route exact path="/producttable" element={<ProtectedRoute><ProductTable /></ProtectedRoute>}/>
      <Route exact path="/categorytable" element={<ProtectedRoute><CategoryTable /></ProtectedRoute>}/>
      <Route exact path="/createcategory" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>}/>
      <Route exact path="/editcategory/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>}/>
      <Route exact path="/subcategorytable" element={<ProtectedRoute><SubCategoryTable /></ProtectedRoute>}/>
      <Route exact path="/subsubcategorytable" element={<ProtectedRoute><SubSubCategoryTable /></ProtectedRoute>}/>
      <Route exact path="/createsubcategory" element={<ProtectedRoute><CreateSubCategory /></ProtectedRoute>}/>
      <Route exact path="/createsubsubcategory" element={<ProtectedRoute><CreateSubSubCategory /></ProtectedRoute>}/>
      <Route exact path="/createProduct" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>}/>
      <Route exact path="/viewproduct/:id" element={<ProtectedRoute><ViewProduct /></ProtectedRoute>}/>
      <Route exact path="/editproduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>}/>
      <Route exact path="/createbanner" element={<ProtectedRoute><CreateBanner /></ProtectedRoute>}/>
      <Route exact path="/purchasetable" element={<ProtectedRoute><PurchaseTable /></ProtectedRoute>}/>
      <Route exact path="/editbrand/:id" element={<ProtectedRoute><EditBrand /></ProtectedRoute>}/>
      <Route exact path="/createbrand" element={<ProtectedRoute><CreateBrand /></ProtectedRoute>}/>
      <Route exact path="/brandtable" element={<ProtectedRoute><BrandTable /></ProtectedRoute>}/>
      <Route exact path="/pos" element={<ProtectedRoute><POS /></ProtectedRoute>}/>
      {/* <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/> */}
    </Routes>
  )
}

export default App