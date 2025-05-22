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

  if (loading)
    return (
      <div className="container mx-auto p-4">
        <p>Loading missions...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  if (missions.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-gray-500">No missions found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {missions.map((mission) => (
          <li key={mission.id}>
            <Link href={`/missions/${mission.id}`}>
              <MissionItem mission={mission} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionsList;
