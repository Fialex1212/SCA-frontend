import MissionUpdateForm from "../../../../../components/MissionUpdateForm";

type Props = {
  params: {
    id: string;
  };
};

const UpdateMissionPage = ({ params }: Props) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <MissionUpdateForm missionId={params.id} />
    </div>
  );
};

export default UpdateMissionPage;
