import axios from "axios";
import { notFound } from "next/navigation";
import CatDetails from "@/components/CatDetails";
import { Cat } from "@/types";

type Props = {
  params: {
    id: string;
  };
};

const getCat = async (id: string): Promise<Cat | null> => {
  try {
    const response = await axios.get(`http://127.0.0.1:8001/cats/${id}`);
    return response.data;
  } catch {
    return null;
  }
};

const CatPage = async ({ params }: Props) => {
  const awaitedParams = await params;
  const cat = await getCat(awaitedParams.id);

  if (!cat) return notFound();

  return <CatDetails cat={cat} />;
};

export default CatPage;
