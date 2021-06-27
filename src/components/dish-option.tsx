/** @format */

import React from "react";

interface IDishOptionProps {
  dishId: number;
  isSelected: boolean;
  name: string;
  extra?: number | null;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  dishId,
  isSelected,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };

  return (
    <span
      onClick={onClick}
      className={`flex items-center py-1 px-2 rounded-sm ${
        isSelected
          ? "w-max bg-lime-600 text-white mb-2"
          : "border rounded-md border-black w-max mb-2"
      }`}
    >
      <h6 className="mr-2">{name}</h6>
      {extra && <h6 className="text-sm opacity-75">(${extra})</h6>}
    </span>
  );
};
