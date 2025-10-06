"use client";

import React, { useState } from "react";
import Navbar from "../../components/nav-bar";
import data from "../../mock-data/shop-data.json";
import Image from "next/image";
import { useCart } from "../../components/cart-provider";
import { useAuth0 } from "@auth0/auth0-react";

type Rating = { rate: number; count: number };
type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  rating?: Rating;
};

export default function ItemPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const items = data as Product[];
  const item = items.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [buyLoading, setBuyLoading] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: item!.id,
      title: item!.title,
      price: item!.price,
      image: item!.image,
      category: item!.category
    });
    
    const button = document.querySelector('[data-add-to-cart]') as HTMLButtonElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.classList.add('bg-green-500', 'hover:bg-green-600');
      button.classList.remove('hover:bg-[#d8043cff]');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-500', 'hover:bg-green-600');
        button.classList.add('hover:bg-[#d8043cff]');
      }, 1500);
    }
  };

  if (!item) {
    return (
      <Navbar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-6">Item not found.</div>
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:flex">
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
            <Image src={item.image} alt={item.title} width={450} height={450} className="object-contain" />
          </div>

          <div className="md:w-1/2 p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{item.title}</h1>
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-extrabold text-[#d8043cff]">${item.price}</div>
              <div className="text-sm text-gray-500">{item.category}</div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-yellow-500">{renderStars(item.rating?.rate ?? 0)}</div>
              <div className="text-sm text-gray-500">({item.rating?.count ?? 0} reviews)</div>
            </div>

            <p className="text-gray-700">{item.description}</p>

            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={async () => {
                  if (!isAuthenticated) {
                    await loginWithRedirect();
                    return;
                  }

                  setBuyLoading(true);
                  try {
                    const origin = window.location.origin;
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ items: [{ id: item!.id, title: item!.title, price: item!.price, quantity: 1 }], origin }),
                    });

                    const json = await res.json();
                    if (json?.url) {
                      window.location.href = json.url;
                    } else {
                      console.error('Checkout creation failed', json);
                      alert('Failed to create checkout session');
                    }
                  } catch (err) {
                    console.error('Checkout exception', err);
                    alert('An error occurred creating the checkout session');
                  } finally {
                    setBuyLoading(false);
                  }
                }}
                className={`bg-[#d8043cff] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b70335] transition cursor-pointer ${buyLoading ? 'opacity-60 cursor-wait' : ''}`}
                disabled={buyLoading}
              >
                {buyLoading ? 'Processing...' : 'Buy now'}
              </button>
              <button 
                data-add-to-cart
                onClick={handleAddToCart}
                className="bg-white text-black border border-gray-300 px-5 py-3 rounded-lg font-semibold shadow hover:bg-[#d8043cff] hover:text-white transition cursor-pointer"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </Navbar>
  );
}

function renderStars(rate: number) {
  const full = Math.round(rate);
  return Array.from({ length: 5 }).map((_, i) => (i < full ? '★' : '☆')).join('');
}
