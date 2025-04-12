"use client";

import { createContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";

import {
  signIn,
  signInWithOAuth,
  SignInFunction,
  SignInWithOAuthFunction,
} from "./authFunctions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userName: string | null;
  isLoading: boolean;
  signIn: SignInFunction;
  signInWithOAuth: SignInWithOAuthFunction;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // createClientComponentClient を使用してSupabaseクライアントを初期化
  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);
      try {
        // supabase ではなく supabaseClient を使用
        const {
          data: { session },
        } = await supabaseClient.auth.getSession();

        setSession(session);
        setUser(session?.user || null);

        if (session?.user) {
          const { data, error } = await supabaseClient
            .from("user")
            .select("name")
            .eq("auth_id", session.user.id)
            .single();

          if (data && !error) {
            setUserName(data.name);
          }
        }

        const {
          data: { subscription },
        } = await supabaseClient.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user || null);

          if (!session?.user) {
            setUserName(null);
          }
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("認証初期化エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, [supabaseClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userName,
        isLoading,
        signIn,
        signInWithOAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
