import Link from "next/link";
import { Mission } from "@/types"; 

type Props = {
  mission: Mission;
};

const MissionDetails = ({ mission }: Props) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <div className="flex gap-8">
        <h2 className="text-2xl font-bold mb-4">🎯 Mission Details</h2>
        <Link href={`/missions/${mission.id}/update/`}>
          <span
            className="block px-4 py-2 text-center bg-[#191919] text-white rounded shadow cursor-pointer
             transition-colors transition-transform duration-300 ease-in-out
             hover:bg-[#3f3f3f] hover:scale-105"
          >
            Update Mission
          </span>
        </Link>
      </div>

      <div className="flex gap-2">
        <p className="font-bold">Mission ID:</p> {mission.id}
      </div>

      <div className="flex gap-2">
        <p className="font-bold">Cat ID:</p> {mission.cat_id || "Yet assigned"}
      </div>

      <div className="flex gap-2">
        <p className="font-bold">Is Complete:</p>{" "}
        {mission.is_complete ? "✅ Yes" : "❌ No"}
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Targets</h2>
      {mission.targets.length > 0 ? (
        <ul className="list-disc pl-5">
          {mission.targets.map((target) => (
            <li key={target.id} className="mb-2">
              <div className="flex gap-2">
                <p className="font-bold">Name:</p>
                {target.name}
              </div>

              <div className="flex gap-2">
                <p className="font-bold">Country:</p>
                {target.country}
              </div>

              {target.notes && (
                <div className="flex gap-2">
                  <p className="font-bold">Notes:</p>
                  {target.notes}
                </div>
              )}

              <div className="flex gap-2">
                <p className="font-bold">Complete:</p>
                {target.is_complete ? "✅" : "❌"}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No targets assigned yet.</p>
      )}
    </div>
  );
};

export default MissionDetails;
