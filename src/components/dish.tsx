/** @format */

import React from "react";
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

interface IDishProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  photo: string | null;
  isCustomer?: boolean;
  orderStarted?: boolean;
  isSelected?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  name,
  description,
  price,
  photo,
  isCustomer = false,
  orderStarted = false,
  isSelected,
  options,
  addItemToOrder,
  removeFromOrder,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }

      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };

  return (
    <div
      className={`px-8 py-4 border cursor-pointer transition-all mb-6 ${
        isSelected ? "border-black" : "hover:border-gray-800"
      }`}
    >
      <div className="flex flex-col">
        <div
          style={{ backgroundImage: `url(${photo})` }}
          className="py-32 bg-cover mb-3"
        ></div>
        <div className="mb-3">
          <h3 className="text-lg font-medium">
            {name}{" "}
            {orderStarted && (
              <button
                onClick={onClick}
                className={`px-3 py-1 rounded text-white${
                  isSelected ? " bg-red-500" : " bg-lime-600"
                }`}
              >
                {isSelected ? "Remove" : "Add"}
              </button>
            )}
          </h3>
          <h4 className="font-medium">{description}</h4>
        </div>
        <span>${price}</span>
        {isCustomer && options && options?.length !== 0 && (
          <div>
            <h5 className="mt-3 mb1 font-medium">Dish options:</h5>
            {dishOptions}
          </div>
        )}
      </div>
    </div>
  );
};
