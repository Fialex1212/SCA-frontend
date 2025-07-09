import axios from 'axios';
import { notFound } from 'next/navigation';
import UpdateSalaryForm from '@/components/UpdateSalaryForm';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Cat = {
  id: string;
  name: string;
  salary: number;
};

type Props = {
  params: {
    id: string;
  };
};

const getCat = async (id: string): Promise<Cat | null> => {
  try {
    const res = await axios.get(`${API_URL}cats/${id}`);
    return res.data;
  } catch (error) {
    return null;
    console.log(error);
    
  }
};

const UpdateCatSalaryPage = async ({ params }: Props) => {
  const cat = await getCat(params.id);

  if (!cat) return notFound();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">✏️ Update Salary for {cat.name}</h1>
      <UpdateSalaryForm catId={cat.id} currentSalary={cat.salary} />
    </div>
  );
};

export default UpdateCatSalaryPage;
