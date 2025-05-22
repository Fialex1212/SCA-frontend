import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-[200px]">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Spy Cat Agency 🐾
      </h1>
      <p className="text-lg mb-4">
        Looking for the perfect spy cat to handle your secret missions? You’ve
        come to the right place! At Spy Cat Agency, we specialize in matching
        stealthy, talented spy cats with important missions.
      </p>
      <p className="text-lg mb-4">
        Browse our available{" "}
        <Link href="/cats" passHref>
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline">
            cats
          </span>
        </Link>
        , assign missions, and keep track of progress as your feline agents
        gather intel and complete targets. Whether you’re hiring new cats or
        managing ongoing operations, our system makes it easy and efficient.
      </p>
      <p className="text-lg">
        Ready to find your next spy cat or launch a new mission? Explore the app
        to get started!
      </p>
    </div>
  );
};

export default page;
