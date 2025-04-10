"use client";

import { createContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  signIn,
  signOut,
  signInWithOAuth,
  SignInFunction,
  SignOutFunction,
  SignInWithOAuthFunction,
} from "./authFunctions";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userName: string | null;
  isLoading: boolean;
  signIn: SignInFunction;
  signOut: SignOutFunction;
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

  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);

      if (session?.user) {
        const { data, error } = await supabase
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
      } = await supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user || null);
      });

      return () => subscription.unsubscribe();
    };

    initSession().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userName,
        isLoading,
        signIn,
        signOut,
        signInWithOAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
