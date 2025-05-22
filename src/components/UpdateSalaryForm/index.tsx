"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  catId: string;
  currentSalary: number;
};

const UpdateSalaryForm = ({ catId, currentSalary }: Props) => {
  const router = useRouter();
  const [salary, setSalary] = useState(currentSalary);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await axios.put(`http://127.0.0.1:8001/cats/${catId}`, {
        salary,
      });
      setSuccess(true);
      router.push(`/cats/${catId}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Failed to update salary.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 border rounded-md shadow-md bg-gray-50"
    >
      <h2 className="text-lg font-semibold mb-2">💰 Update Salary</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="salary">
          New Salary
        </label>
        <input
          id="salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Updating..." : "Update Salary"}
      </button>
      {success && <p className="text-green-600 mt-2">Salary updated!</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
};

export default UpdateSalaryForm;
