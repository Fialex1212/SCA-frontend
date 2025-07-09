import React from "react";
import {Cat} from "@/types"

type CatItemProps = {
  cat: Cat;
};

const CatItem: React.FC<CatItemProps> = ({ cat }) => {
  return (
    <div className="p-4 rounded-xl shadow-md bg-white border">
      <h2 className="text-xl font-bold text-gray-800">{cat.name}</h2>
      <p className="text-gray-600">Breed: {cat.breed}</p>
      <p className="text-gray-600 mb-[20px]">Salary: ${cat.salary}</p>
      <p className="text-xs text-gray-400">ID: {cat.id}</p>
    </div>
  );
};

export default CatItem;
