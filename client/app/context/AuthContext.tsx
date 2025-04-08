"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signOut: () => Promise<void>;
  // 追加: OAuthによるサインイン
  signInWithOAuth: (provider: "google" | "facebook" | "twitter") => Promise<{
    error: Error | null;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // セッション情報の初期化
    const initSession = async () => {
      setIsLoading(true);
      try {
        // 現在のセッションを取得
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user || null);

        // セッション変更の監視
        const {
          data: { subscription },
        } = await supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("セッション初期化エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, []);

  // メールとパスワードでサインイン
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { data: data.session, error };
    } catch (error) {
      console.error("サインインエラー:", error);
      return { data: null, error: error as Error };
    }
  };

  // サインアウト
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("サインアウトエラー:", error);
    }
  };

  // OAuthによるサインイン
  const signInWithOAuth = async (
    provider: "google" | "facebook" | "twitter"
  ) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      return { error };
    } catch (error) {
      console.error(`${provider}サインインエラー:`, error);
      return { error: error as Error };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signOut,
    signInWithOAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthはAuthProviderの中で使用する必要があります");
  }
  return context;
}
