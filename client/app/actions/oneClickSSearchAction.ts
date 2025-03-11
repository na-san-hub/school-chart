"use server";

import { redirect } from "next/navigation";

export async function oneClickSSearchAction(formData: FormData) {
  // FormData からすべての値を URLSearchParams に変換
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    params.append(key, value as string);
  }

  redirect(`/search?${params.toString()}`);
}
