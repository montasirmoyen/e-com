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
  title: string;
  subtitle?: string;
  ids?: number[];
  className?: string;
};

export default function Recommendations({ title, subtitle, ids, className }: Props) {
  const items: Product[] = ids && ids.length > 0 ? (data as Product[]).filter((i: Product) => ids.includes(i.id)) : (data as Product[]);

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl text-gray-700 font-bold">{title}</h2>
        {subtitle ? <p className="text-gray-500 mb-2">{subtitle}</p> : null}
      </div>

      <main className={className ?? "p-2"}>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-6">
          {items.map((item: Product) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <div className="h-48 w-full flex items-center justify-center mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="object-contain max-h-full"
                />
              </div>
              <h2 className="text-xl text-gray-700 font-bold mb-2 text-center">
                {item.title}
              </h2>
              <p className="text-gray-700 mb-2">${item.price}</p>
              <button
                style={{ backgroundColor: "#d8043cff" }}
                className="text-white px-4 py-2 rounded mt-auto"
              >
                View Item
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
