"use client";

import React from "react";
import Navbar from "../components/nav-bar";
import { useCart } from "../components/cart-provider";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    return (
      <Navbar>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-[#d8043cff] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b70335] transition cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>
      </Navbar>
    );
  }

  if (cart.length === 0) {
    return (
      <Navbar>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Add some items to your cart to get started!</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-[#d8043cff] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b70335] transition cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Cart Items ({cart.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                          <p className="text-lg font-bold text-[#d8043cff] mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-black w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-black text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-black w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-600 hover:text-red-800 transition-colors mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  className="w-full bg-[#d8043cff] text-white py-3 px-4 rounded-lg font-semibold shadow hover:bg-[#b70335] transition cursor-pointer mb-4"
                  disabled
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full mt-4 bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
