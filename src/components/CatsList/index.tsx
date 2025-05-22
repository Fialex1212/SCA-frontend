"use client";

import React, { useEffect } from "react";
import { useCatStore } from "../../store/useCatStore";
import CatItem from "../CatItem";
import Link from "next/link";

const CatsList: React.FC = () => {
  const { cats, fetchCats, loading, error } = useCatStore();

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  if (loading)
    return (
      <div className="container">
        <p>Loading spy cats...</p>
      </div>
    );
  if (error)
    return (
      <div className="container">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  if (cats.length === 0) {
    return (
      <div className="container">
        <p className="text-gray-500">No spy cats found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cats.map((cat) => (
          <li key={cat.id}>
            <Link href={`/cats/${cat.id}`}>
              <CatItem cat={cat} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatsList;
