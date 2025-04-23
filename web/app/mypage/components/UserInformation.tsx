import { UserCircle } from "lucide-react";

export default function UserInformation({
  displayName,
}: {
  displayName: string;
}) {
  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center">
        <UserCircle className=" mr-2 text-gray-700" />
        <h3 className="text-base text-gray-700">{displayName}さん</h3>
      </div>
    </div>
  );
}
