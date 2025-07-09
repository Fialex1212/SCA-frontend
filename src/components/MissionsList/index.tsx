"use client";

import React, { useEffect } from "react";
import { useMissionStore } from "../../store/useMissionStore";
import MissionItem from "../MissionItem";
import Link from "next/link";

const MissionsList: React.FC = () => {
  const { missions, loading, error, fetchMissions } = useMissionStore();

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  let content;

  if (loading) {
    content = (
      <div className="container mx-auto h-[200px] p-4 flex justify-center items-center">
        <p>Loading missions...</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="container mx-auto h-[200px] p-4 flex justify-center items-center">
        <p className="text-red-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center animate-pulse">
          Error: {error}
        </p>
      </div>
    );
  } else if (missions.length === 0) {
    content = (
      <div className="container mx-auto h-[200px] p-4 flex justify-center items-center">
        <p className="text-red-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center animate-pulse">
          No missions found.
        </p>
      </div>
    );
  } else {
    content = (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {missions.map((mission) => (
          <li key={mission.id}>
            <Link href={`/missions/${mission.id}`}>
              <MissionItem mission={mission} />
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
          href="/missions/new"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-400 transition"
        >
          Add New Mission
        </Link>
      </div>
    </div>
  );
};

export default MissionsList;
