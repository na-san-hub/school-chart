import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
  redirect("/");
}
