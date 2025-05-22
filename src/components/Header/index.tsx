"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
  const headerItems = [
    { name: "Cats", slug: "/cats" },
    { name: "Missions", slug: "/missions" },
    { name: "New Cat", slug: "/cats/new" },
    { name: "New Mission", slug: "/missions/new" },
  ];

  return (
    <header className="container p-4 bg-gray-100 shadow">
      <nav>
        <ul className="flex flex-wrap justify-center gap-8 py-4">
          {headerItems.map((item) => (
            <li key={item.slug}>
              <Link href={item.slug}>
                <span
                  className="block px-4 py-2 text-center bg-[#191919] text-white rounded shadow cursor-pointer
             transition-colors transition-transform duration-300 ease-in-out
             hover:bg-[#3f3f3f] hover:scale-105"
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
