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
import EditCategory from './pages/Editcategory'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import CreateBanner from './pages/CreateBanner'
import PurchaseTable from './pages/PurchaseTable'
import Search from './pages/Search'
import Sales from './pages/Sales'
import Register from './pages/Register'

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
      <Route exact path='/admin' element={<AdminLogin />} />
      <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route exact path="/producttable" element={<ProtectedRoute><ProductTable /></ProtectedRoute>}/>
      <Route exact path="/categorytable" element={<ProtectedRoute><CategoryTable /></ProtectedRoute>}/>
      <Route exact path="/createcategory" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>}/>
      <Route exact path="/editcategory/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>}/>
      <Route exact path="/createProduct" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>}/>
      <Route exact path="/editproduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>}/>
      <Route exact path="/createbanner" element={<ProtectedRoute><CreateBanner /></ProtectedRoute>}/>
      <Route exact path="/purchasetable" element={<ProtectedRoute><PurchaseTable /></ProtectedRoute>}/>
      {/* <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/> */}
    </Routes>
  )
}

export default App