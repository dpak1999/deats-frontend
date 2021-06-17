/** @format */

import React from "react";

interface IDishProps {
  description: string;
  name: string;
  price: number;
  photo: string | null;
}

export const Dish: React.FC<IDishProps> = ({
  name,
  description,
  photo,
  price,
}) => {
  return (
    <div className="px-8 py-4 border hover:border-gray-800 cursor-pointer transition-all mb6">
      <div className="flex flex-col">
        <div
          style={{ backgroundImage: `url(${photo})` }}
          className="py-32 bg-cover mb-3"
        ></div>
        <div className="mb-5">
          <h3 className="text-lg font-medium">{name}</h3>
          <h4 className="font-medium">{description}</h4>
        </div>
        <span>${price}</span>
      </div>
    </div>
  );
};
