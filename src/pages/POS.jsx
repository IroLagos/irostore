import React, { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaTimes, FaShoppingCart } from 'react-icons/fa'
import { URL } from '../url'
import axios from 'axios'
import _ from 'lodash';
import notyet from '../assets/notyet.png'




export default function POS() {
  const [search, setSearch] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [customerSearchTerm, setCustomerSearchTerm] = useState('')
  const [productSearchTerm, setProductSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  const createCustomer = async () => {
    setLoading(true)
    const res = await axios.post(`${URL}/api/customers/create`, {firstName, lastName, email})
    if(res.status === 200){
      setSuccess(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    let timer
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false)
      }, 5000) // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timer) // Cleanup the timer
  }, [success])

  const fetchCustomers = async () => {
    const res = await axios.get(`${URL}/api/customers`)
    console.log('pos Customer', res.data)
    setCustomers(res.data)
 }

 useEffect(() => {
     fetchCustomers()
 }, [])

  const fetchProducts = async () => {
     const res = await axios.get(`${URL}/api/products`)
     console.log('pos products', res.data)
     setProducts(res.data)
  }

  useEffect(() => {
      fetchProducts()
  }, [])

  const fetchTitle = async (searchParams = {}) => {
    const {title} = searchParams;

    let url = `${URL}/api/products`;

    if(title){
      url += `?title=${encodeURIComponent(title)}`;
    }

    const res = await axios.get(url)
    console.log(res.data)
    setProducts(res.data)
  }

  const debounceFetchProducts = _.debounce(fetchTitle, 300);

  useEffect(() => {
    debounceFetchProducts({title:search});
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTitleFilter = (e) =>{
    setTitleFilter(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTitle({title:search});
  }


  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const handleQuantityChange = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const handlePurchase = async () => {
    if (cart.length === 0) {
      alert('Please add items to the cart before purchasing.')
      return
    }

    setLoading(true)
    try {
      for (let item of cart) {
        const payload = {
          title: item.title,
          email: item.email,
          price: item.price,
          description: item.description || "",
          color: item.color || "",
          size: item.size || "",
          // imageUrl: item.imageUrls?.[0] || "",
          quantity: item.quantity,
          totalPrice: (item.price * item.quantity).toFixed(2)
        }

        const res = await axios.post(`${URL}/api/purchases/create`, payload)
        if (res.status !== 200) {
          throw new Error(`Failed to purchase ${item.title}`)
        }
      }

      setPurchaseSuccess(true)
      setCart([])
      setTimeout(() => setPurchaseSuccess(false), 5000)
    } catch (error) {
      console.error('Error making purchase:', error)
      alert('There was an error making the purchase. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[100vh] bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">POS System</h1>
        
        {/* Customer Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Customer</h2>
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

          <p className='font-semibold text-lg'>Create Customer</p>

          <div className='flex gap-x-4 mt-4'>
       <input onChange={(e)=>setFirstName(e.target.value)} className='border rounded-md py-2 px-2 w-[300px]' placeholder='First Name' />
       <input onChange={(e)=>setLastName(e.target.value)} className='border rounded-md py-2 px-2 w-[300px]' placeholder='Last Name' />
       <input onChange={(e)=>setEmail(e.target.value)} className='border rounded-md py-2 px-2 w-[230px]' placeholder='Email' />
          </div>
          <button onClick={createCustomer} className='bg-[#5b3e31] text-white px-6 py-2 rounded-md mt-4'>{loading ? "Creating...":"Create Customer"}</button>

          
           {success && <p className='text-green-500 text-xl text-center'>Customer Created Successfully!!!</p>}
        
          
          {/* <form onSubmit={handleAddCustomer} className="flex space-x-2">
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
          </form> */}
        </div>

        {/* Product Selection */}
        <div>
        <div className='h-[350px] w-full flex flex-col'>
      <p className='text-lg font-semibold mb-4'>Search Products</p>
      <div className="flex-none mb-4">
        <input
          type="text"
          placeholder="Search products by title..."
          value={search}
          onChange={handleSearch}
          className="w-full px-2 py-2 border rounded"
        />
      </div>
      <div className='flex-grow overflow-auto'>
        <div className="grid grid-cols-2 gap-4">
          {products?.map((p) => (
            <div
              key={p.id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => handleAddToCart(p)}
            >
              <h3 className="font-semibold">{p.title}</h3>
              <p>{p.price.toFixed(2)}</p>
              {/* <img src={p.imageUrls ? p.imageUrls : notyet}/> */}
            </div>
          ))}
        </div>
      </div>
    </div>
</div>
        

        {/* Cart and Purchase */}
        <div className='mt-6'>
          <h2 className="text-xl font-semibold">Cart</h2>
          {selectedCustomer && (
            <p className="mb-2">
              Selected Customer: {selectedCustomer.name} ({selectedCustomer.email})
            </p>
          )}
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.cartId} className="flex justify-between items-center py-2 border-b">
                <span>{item.title}</span>
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
              Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </p>
            <button
              onClick={handlePurchase}
              disabled={loading || cart.length === 0}
              className={`bg-purple-500 text-white px-4 py-2 rounded flex items-center ${loading || cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaShoppingCart className="mr-2" />
              {loading ? 'Processing...' : 'Purchase'}
            </button>
          </div>
          {purchaseSuccess && (
            <p className="text-green-500 text-center mt-2">Purchase successful!</p>
          )}

         
        </div>
      </div>
    </div>
  )
}