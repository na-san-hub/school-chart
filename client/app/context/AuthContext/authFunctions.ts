import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";

export type SignInFunction = (
  email: string,
  password: string
) => Promise<{
  error: Error | null;
  data: Session | null;
}>;

export const signIn: SignInFunction = async (email, password) => {
  try {
    // createClientComponentClient を使用
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data: data.session, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export type SignOutFunction = () => Promise<void>;

export const signOut: SignOutFunction = async () => {
  try {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error("サインアウトエラー:", error);
  }
};

export type SignInWithOAuthFunction = (
  provider: "google" | "facebook" | "twitter",
  redirectTo?: string
) => Promise<{ error: Error | null }>;

export const signInWithOAuth: SignInWithOAuthFunction = async (
  provider,
  redirectTo
) => {
  try {
    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    });

    return { error };
  } catch (error) {
    console.error(`${provider}サインインエラー:`, error);
    return { error: error as Error };
  }
};
