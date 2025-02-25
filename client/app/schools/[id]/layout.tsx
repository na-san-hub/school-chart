import SchoolHeader from "./components/SchoolHeader";
import { getSchoolHeader } from "@/lib/school";

export default async function SchoolLayout(props: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  // props.params を await してから利用する
  const resolvedParams = await props.params;
  const id = resolvedParams.id;

  let school;
  let errorMessage = "";

  try {
    school = await getSchoolHeader(id);
  } catch (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  }

  return (
    <div>
      {school ? (
        <>
          <SchoolHeader school={school} />
          <main>{props.children}</main>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-red-500 font-bold">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
