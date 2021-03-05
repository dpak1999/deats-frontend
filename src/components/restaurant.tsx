/** @format */

import React from "react";

interface IRestaurantProps {
  id: string;
  coverImage: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  coverImage,
  name,
  categoryName,
}) => (
  <div className="flex flex-col">
    <div
      style={{ backgroundImage: `url(${coverImage})` }}
      className="py-32 bg-cover mb-3"
    ></div>
    <h3 className="text-xl font-medium">{name}</h3>
    <span className="border-t py-2 mt-2 text-xs opacity-50 border-gray-400">
      {categoryName}
    </span>
  </div>
);
