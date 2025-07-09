"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Breed, CatCreateData} from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CatCreateForm: React.FC = () => {
  const router = useRouter();
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [formData, setFormData] = useState<CatCreateData>({
    name: "",
    breed: "",
    salary: 0,
  });

  const [loading, setLoading] = useState(false);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // get breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoadingBreeds(true);
        const response = await axios.get<Breed[]>(
          "https://api.thecatapi.com/v1/breeds"
        );
        setBreeds(response.data);
        setLoadingBreeds(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setLoadingBreeds(false);
        setError("Failed to load breeds");
        console.log(err);
      }
    };
    fetchBreeds();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.name.trim() || !formData.breed || formData.salary <= 0) {
      setError("Please fill in all fields with valid data.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}cats/create/`,
        formData
      );
      const newCat = response.data;
      router.push(`/cats/${newCat.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.detail || err.message || "Failed to create cat."
      );
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Spy Cat</h2>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
          required
        />
      </label>

      <label className="block mb-2">
        Breed:
        {loadingBreeds ? (
          <p>Loading breeds...</p>
        ) : (
          <select
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select a breed</option>
            {breeds.map((breed) => (
              <option key={breed.id} value={breed.name}>
                {breed.name}
              </option>
            ))}
          </select>
        )}
      </label>

      <label className="block mb-4">
        Salary:
        <input
          type="number"
          name="salary"
          min={1}
          value={formData.salary || ""}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#191919] text-white py-2 rounded hover:bg-[#3f3f3f] transition duration-300"
      >
        {loading ? "Creating..." : "Create Cat"}
      </button>
    </form>
  );
};

export default CatCreateForm;
