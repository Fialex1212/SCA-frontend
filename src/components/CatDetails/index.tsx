import Link from "next/link";
import React from "react";
import { Cat } from "@/types"

interface CatDetailsProps {
  cat: Cat;
}

const CatDetails: React.FC<CatDetailsProps> = ({ cat }) => {
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <div className="flex gap-8 items-center">
        <h1 className="text-2xl font-bold mb-4">🐾 Spy Cat Details</h1>
        <Link href={`/cats/${cat.id}/update/`}>
          <span
            className="block px-4 py-2 text-center bg-[#191919] text-white rounded shadow cursor-pointer
             transition-colors transition-transform duration-300 ease-in-out
             hover:bg-[#3f3f3f] hover:scale-105"
          >
            Update Cat
          </span>
        </Link>
      </div>

      <div className="flex gap-2">
        <p className="font-bold">Name:</p> {cat.name}
      </div>
      <div className="flex gap-2">
        <p className="font-bold">Breed:</p> {cat.breed}
      </div>
      <div className="flex gap-2">
        <p className="font-bold">Salary:</p> ${cat.salary.toLocaleString()}
      </div>
    </div>
  );
};

export default CatDetails;
