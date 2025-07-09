"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Cat } from "@/types";
import axios from "axios";
import Popup from "../Popup";

interface CatDetailsProps {
  cat: Cat;
}

const CatDetails: React.FC<CatDetailsProps> = ({ cat }) => {
  const router = useRouter();
  const [erorr, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopup, setIsPopup] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const deleteCat = async (id: string | number) => {
    try {
      await axios.delete(`${API_URL}cats/${id}/`);
      router.push(`/cats/`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.detail || err.message || "Failed to delete cat."
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <div className="flex gap-8 items-center mb-[20px]">
        <h2 className="text-2xl font-bold">🐾 Spy Cat Details</h2>
        <Link href={`/cats/${cat.id}/update/`}>
          <span
            className="block px-4 py-2 text-center bg-[#191919] text-white rounded shadow cursor-pointer
              transition-transform duration-300 ease-in-out
             hover:bg-[#3f3f3f] hover:scale-105"
          >
            Update Cat
          </span>
        </Link>
        <button
          onClick={() => setIsPopup(true)}
          className="block px-4 py-2 text-center bg-red-500 text-white rounded shadow cursor-pointer
              transition-transform duration-300 ease-in-out
             hover:bg-red-400 hover:scale-105"
        >
          Delete Cat
        </button>
        <Popup isOpen={isPopup} onClose={() => setIsPopup(false)}>
          <div className="flex flex-col gap-[20px] justify-center items-center">
            <h2 className="text-[20px]">Are you sure that you want delete {cat.name} </h2>
            <button
              onClick={() => deleteCat(cat.id)}
              className="block px-4 py-2 text-center bg-red-500 text-white rounded shadow cursor-pointer
              transition-transform duration-300 ease-in-out
             hover:bg-red-400 hover:scale-105"
            >
              Delete Cat
            </button>
          </div>
        </Popup>
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
      <div className="flex gap-2">
        <p className="font-bold">Id:</p> {cat.id}
      </div>
    </div>
  );
};

export default CatDetails;
