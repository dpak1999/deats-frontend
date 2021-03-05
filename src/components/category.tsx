/** @format */
import React from "react";

interface ICategoryProps {
  coverImage?: string;
  categoryName?: string;
}

export const Category: React.FC<ICategoryProps> = ({
  coverImage,
  categoryName,
}) => (
  <div className="flex flex-col items-center cursor-pointer">
    <div
      className="w-14 h-14 bg-cover rounded-full hover:bg-gray-200"
      style={{ backgroundImage: `url(${coverImage})` }}
    ></div>
    <span className="text-sm text-center font-medium capitalize mt-2">
      {categoryName}
    </span>
  </div>
);
