"use client";

import React from "react";
import Image from "next/image";
import data from "@/mock-data/shop-data.json";
import ItemDiv from "../components/item-div";

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
            <ItemDiv key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  );
}
