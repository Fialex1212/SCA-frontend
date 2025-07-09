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

  let content;

  if (loading) {
    content = (
      <div className="h-[200px] p-4 flex justify-center items-center">
        <p>Loading spy cats...</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="h-[200px] p-4 flex justify-center items-center">
        <p className="text-red-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center animate-pulse">
          Error: {error}
        </p>
      </div>
    );
  } else if (cats.length === 0) {
    content = (
      <div className="h-[200px] p-4 flex justify-center items-center">
        <p className="text-red-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center animate-pulse">
          No spy cats found.
        </p>
      </div>
    );
  } else {
    content = (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cats.map((cat) => (
          <li key={cat.id}>
            <Link href={`/cats/${cat.id}`}>
              <CatItem cat={cat} />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {content}

      <div className="mt-8 flex justify-center">
        <Link
          href="/cats/new"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-400 transition"
        >
          Add New Spy Cat
        </Link>
      </div>
    </div>
  );
};

export default CatsList;
