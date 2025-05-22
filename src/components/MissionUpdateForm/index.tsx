"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

type TargetInput = {
  id?: string;
  name: string;
  country: string;
  notes?: string;
  is_complete?: boolean;
};

type MissionInput = {
  is_complete?: boolean;
  targets: TargetInput[];
};

type Props = {
  missionId: string;
};

export default function MissionUpdateForm({ missionId }: Props) {
  const router = useRouter();
  const { register, control, handleSubmit, reset } = useForm<MissionInput>({
    defaultValues: {
      is_complete: false,
      targets: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "targets",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMission() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8001/missions/${missionId}`
        );
        const mission = res.data;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const targetsWithId = mission.targets.map((t: any) => ({
          id: t.id,
          name: t.name,
          country: t.country,
          notes: t.notes || "",
          is_complete: t.is_complete,
        }));

        reset({
          is_complete: mission.is_complete,
          targets: targetsWithId,
        });
      } catch (err) {
        setError("Failed to load mission data");
        console.error(err);
      }
    }
    fetchMission();
  }, [missionId, reset]);

  const onSubmit = async (data: MissionInput) => {
    // Validate all targets have non-empty name and country before submit
    for (const target of data.targets) {
      if (!target.name.trim() || !target.country.trim()) {
        setError("Each target must have a name and a country.");
        return;
      }
    }

    try {
      setLoading(true);
      setError("");
      await axios.put(`http://127.0.0.1:8001/missions/${missionId}`, data);
      router.push(`/missions/${missionId}`);
    } catch (err) {
      setError("Failed to update mission. Check your input.");
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
      <h2 className="text-2xl font-bold">✏️ Update Mission</h2>

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
        {loading ? "Updating..." : "Update Mission"}
      </button>
    </form>
  );
}
