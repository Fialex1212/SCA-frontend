import axios from "axios";
import { notFound } from "next/navigation";
import MissionDetails from "../../../../components/MissionDetail";

type Target = {
  id: string;
  name: string;
  country: string;
  notes?: string;
  is_complete: boolean;
  mission_id: string;
};

type Mission = {
  id: string;
  cat_id: string;
  is_complete: boolean;
  targets: Target[];
};

type Props = {
  params: {
    id: string;
  };
};

const getMission = async (id: string): Promise<Mission | null> => {
  try {
    const response = await axios.get(`http://127.0.0.1:8001/missions/${id}`);
    return response.data;
  } catch {
    return null;
  }
};

const MissionPage = async ({ params }: Props) => {
  const awaitedParams = await params;
  const mission = await getMission(awaitedParams.id);

  if (!mission) return notFound();

  return <MissionDetails mission={mission} />;
};

export default MissionPage;
