"use client";

import React from "react";
import Image from "next/image";
import data from "@/mock-data/shop-data.json";

type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
};

type Props = {
  query: string;
};

function matches(item: Product, q: string) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    (item.title && item.title.toLowerCase().includes(s)) ||
    (item.description && item.description.toLowerCase().includes(s))
  );
}

export default function SearchResults({ query }: Props) {
  const q = query.trim();
  const items = (data as Product[]).filter((item: Product) => matches(item, q));

  return (
    <div className="p-4">
      <h2 className="text-lg text-gray-700 font-semibold mb-2">Search results for &quot;{query}&quot;</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((item: Product) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <div className="h-40 w-full flex items-center justify-center mb-4">
                <Image src={item.image} alt={item.title} width={150} height={150} className="object-contain max-h-full" />
              </div>
              <h3 className="text-md text-gray-700 font-bold mb-1 text-center">{item.title}</h3>
              <p className="text-gray-700 mb-2">${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
