import SchoolHeader from "../components/SchoolHeader";
import { getSchoolById } from "@/lib/school";

export default async function SchoolLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const school = await getSchoolById(params.id);

  return (
    <div>
      <SchoolHeader school={school} />
      <main>{children}</main>
    </div>
  );
}
