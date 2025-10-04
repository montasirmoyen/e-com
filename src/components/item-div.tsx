import React from "react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
};

interface ItemDivProps {
  item: Product;
}

export default function ItemDiv({ item }: ItemDivProps) {
  return (
    <div
      key={item.id}
      className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
    >
      <div className="h-40 w-full flex items-center justify-center mb-4">
        <Image
          src={item.image}
          alt={item.title}
          width={150}
          height={150}
          className="object-contain max-h-full"
        />
      </div>
      <h3 className="text-md text-gray-700 font-bold mb-1 text-center">
        {item.title}
      </h3>
      <p className="text-gray-700 mb-2">${item.price}</p>
      <button
        style={{ backgroundColor: "#d8043cff" }}
        className="text-white px-4 py-2 rounded mt-auto"
      >
        View Item
      </button>
    </div>
  );
}