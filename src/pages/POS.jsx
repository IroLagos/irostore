import React, { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaTimes, FaShoppingCart } from 'react-icons/fa'
import { URL } from '../url'
import axios from 'axios'

// Simulated product database
const productDatabase = [
  { id: 1, name: 'T-Shirt', price: 19.99 },
  { id: 2, name: 'Jeans', price: 49.99 },
  { id: 3, name: 'Sneakers', price: 79.99 },
  { id: 4, name: 'Hat', price: 14.99 },
  { id: 5, name: 'Jacket', price: 89.99 },
]

export default function POS() {
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [newCustomer, setNewCustomer] = useState({firstName: '', lastName:'', email: '' })
  const [customerSearchTerm, setCustomerSearchTerm] = useState('')
  const [productSearchTerm, setProductSearchTerm] = useState('')
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)


  const handleAddCustomer = async () => {
    setLoading(true)
    const res = await axios.post(`${URL}/api/customers/create`, newCustomer)
    if(res.status === 200){
        setLoading(false)
        setNewCustomer({ firstName: '', lastName:'', email: '' })
    }
   
  }

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer)
    setCustomerSearchTerm('')
  }

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }])
    setProductSearchTerm('')
  }

  const handleRemoveFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId))
  }

  const handlePurchase = () => {
    if (selectedCustomer && cart.length > 0) {
      alert(`Purchase completed for ${selectedCustomer.name}!\nTotal: $${cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)}`)
      setCart([])
      setSelectedCustomer(null)
    } else {
      alert('Please select a customer and add items to the cart before purchasing.')
    }
  }

  const filteredProducts = productDatabase.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">POS System</h1>
        
        {/* Customer Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
          <div className="flex space-x-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search customers..."
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
                className="w-full px-3 py-2 pl-10 border rounded"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button onClick={() => setCustomerSearchTerm('')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
              <FaTimes />
            </button>
          </div>
          <div className="mb-4">
            {customers
              .filter((c) => c.name.toLowerCase().includes(customerSearchTerm.toLowerCase()))
              .map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => handleSelectCustomer(customer)}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                >
                  {customer.name} ({customer.email})
                </div>
              ))}
          </div>
          <form onSubmit={handleAddCustomer} className="flex space-x-2">
            <input
              type="text"
              placeholder="First Name"
              value={newCustomer.firstName}
              onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
              className="flex-grow px-3 py-2 border rounded"
              required
            />
              <input
              type="text"
              placeholder="Last Name"
              value={newCustomer.lastName}
              onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
              className="flex-grow px-3 py-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              className="flex-grow px-3 py-2 border rounded"
              required
            />
            <button type="submit" disabled={loading} onClick={handleAddCustomer} className="bg-blue-500 text-white px-4 py-2 rounded">
              {loading ? 'loading...' : <FaPlus />}
            </button>
          </form>
        </div>

        {/* Product Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Product Selection</h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={productSearchTerm}
              onChange={(e) => setProductSearchTerm(e.target.value)}
              className="w-full px-3 py-2 pl-10 border rounded"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => handleAddToCart(product)}
              >
                <h3 className="font-semibold">{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart and Purchase */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Cart</h2>
          {selectedCustomer && (
            <p className="mb-2">
              Selected Customer: {selectedCustomer.name} ({selectedCustomer.email})
            </p>
          )}
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.cartId} className="flex justify-between items-center py-2 border-b">
                <span>{item.name}</span>
                <div>
                  <span className="mr-4">${Number(item.price).toFixed(2)}</span>
                  <button
                    onClick={() => handleRemoveFromCart(item.cartId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <p className="font-semibold">
              Total: ${cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)}
            </p>
            <button
              onClick={handlePurchase}
              className="bg-purple-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}