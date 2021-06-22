/** @format */

import React from "react";
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

interface IDishProps {
  description: string;
  name: string;
  price: number;
  photo: string | null;
  isCustomer?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
}

export const Dish: React.FC<IDishProps> = ({
  name,
  description,
  photo,
  price,
  isCustomer = false,
  options,
}) => {
  return (
    <div className="px-8 py-4 border hover:border-gray-800 cursor-pointer transition-all mb6">
      <div className="flex flex-col">
        <div
          style={{ backgroundImage: `url(${photo})` }}
          className="py-32 bg-cover mb-3"
        ></div>
        <div className="mb-3">
          <h3 className="text-lg font-medium">{name}</h3>
          <h4 className="font-medium">{description}</h4>
        </div>
        <span>${price}</span>
        {isCustomer && options && options?.length !== 0 && (
          <div>
            <h5 className="mt-3 mb1 font-medium">Dish options:</h5>
            {options?.map((option, index) => (
              <span className="flex items-center" key={index}>
                <h6 className="mr-2">{option.name}</h6>
                <h6 className="text-sm opacity-75">(${option.extra})</h6>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
