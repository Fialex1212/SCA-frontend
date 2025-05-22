import React from "react";
import { Mission } from "@/types"; 

type Props = {
  mission: Mission;
};

const MissionItem: React.FC<Props> = ({ mission }) => {
  return (
    <div className="border rounded p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Mission ID: {mission.id}</h3>
      <p>
        Assigned Cat ID: {mission.cat_id ? mission.cat_id : <em>Unassigned</em>}
      </p>
      <p>Status: {mission.is_complete ? "Completed" : "In Progress"}</p>
      <div className="mt-3">
        <h4 className="font-semibold">Targets:</h4>
        <ul className="list-disc ml-5">
          {mission.targets.map((target) => (
            <li key={target.id}>
              <strong>{target.name}</strong> ({target.country}) —{" "}
              {target.is_complete ? "Completed" : "Pending"}
              <p className="italic text-sm">Notes: {target.notes}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MissionItem;
