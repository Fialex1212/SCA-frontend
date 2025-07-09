"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type TargetInput = {
  name: string;
  country: string;
  notes?: string;
  is_complete?: boolean;
};

type MissionInput = {
  is_complete?: boolean;
  targets: TargetInput[];
};

export default function MissionCreateForm() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<MissionInput>({
    defaultValues: {
      is_complete: false,
      targets: [{ name: "", country: "", notes: "", is_complete: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "targets",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: MissionInput) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}missions/create/`,
        data
      );
      const mission = response.data;
      router.push(`/missions/${mission.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Failed to create mission. Check your input.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold">🎯 Create Mission</h2>

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("is_complete")} />
        Mark mission as complete
      </label>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Targets</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded space-y-2 bg-gray-50"
          >
            <input
              placeholder="Name"
              {...register(`targets.${index}.name` as const)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              placeholder="Country"
              {...register(`targets.${index}.country` as const)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Notes"
              {...register(`targets.${index}.notes` as const)}
              className="w-full p-2 border rounded"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(`targets.${index}.is_complete` as const)}
              />
              Complete
            </label>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 text-sm mt-2"
            >
              Remove Target
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({ name: "", country: "", notes: "", is_complete: false })
          }
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          ➕ Add Target
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Creating..." : "Create Mission"}
      </button>
    </form>
  );
}
