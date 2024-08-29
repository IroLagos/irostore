

import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import { URL } from '../url';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart?.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    }

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            // Create a single purchase object
            const purchase = {
                title: cart.map(item => item.product.title).join(', '),
                price: parseFloat(calculateTotal()),
                description: `Purchase of ${cart.length} item(s)`,
                imageUrl: cart[0].product.imageUrl, // Use the first item's image or omit if not required
                color: cart.map(item => item.product.color).join(', '),
                size: cart.map(item => item.product.size).join(', '),
                quantity: cart.reduce((total, item) => total + item.quantity, 0),
                totalPrice: parseFloat(calculateTotal())
            };

            const res = await axios.post(`${URL}/api/purchases/create`, purchase);
            console.log("Purchase successful:", res.data);
            alert('Purchase successful!');
            clearCart();
            navigate('/'); // or navigate to a confirmation page
        } catch (error) {
            console.error('Error creating purchase:', error);
            alert('Failed to complete purchase. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8">
                <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
                {cart?.length === 0 ? (
                    <p>Your cart is empty. <Link to="/" className="text-blue-600">Go shopping</Link></p>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-2/3">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border p-4 text-left">Product</th>
                                        <th className="border p-4 text-left">Price</th>
                                        <th className="border p-4 text-left">Quantity</th>
                                        <th className="border p-4 text-left">Total</th>
                                        <th className="border p-4 text-left">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.map(item => (
                                        <tr key={item.product.id} className="border-t">
                                            <td className="p-4">{item.product.title}</td>
                                            <td className="p-4">${item.product.price.toFixed(2)}</td>
                                            <td className="p-4">{item.quantity}</td>
                                            <td className="p-4">${(item.product.price * item.quantity).toFixed(2)}</td>
                                            <td className="p-4 text-red-600 cursor-pointer" onClick={() => removeFromCart(item.product.id)}>
                                                <FaTrash />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
                            <p className="text-xl">Total Price: ${calculateTotal()}</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-6 w-full"
                            onClick={handleCheckout}
                            disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Checkout'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;