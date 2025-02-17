import SchoolHeader from "../components/SchoolHeader";
import { getSchoolById } from "@/lib/school";

export default async function SchoolLayout(props: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  // props.params を await してから利用する
  const resolvedParams = await props.params;
  const id = resolvedParams.id;

  const school = await getSchoolById(id);

  return (
    <div>
      <SchoolHeader school={school} />
      <main>{props.children}</main>
    </div>
  );
}
