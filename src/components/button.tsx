/** @format */

import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <button
      className={`text-lg font-medium focus:outline-none transition-colors text-white py-4 ${
        canClick
          ? "bg-lime-600 hover:bg-lime-800"
          : "bg-gray-400 pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
