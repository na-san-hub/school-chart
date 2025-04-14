"use client";
import { createContext, useState, useEffect } from "react";
import { Session, User, AuthError } from "@supabase/supabase-js";
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
  authError: string | null;
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
  const [authError, setAuthError] = useState<string | null>(null);

  // createClientComponentClient を使用してSupabaseクライアントを初期化
  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);
      try {
        // セッション取得
        const { data, error } = await supabaseClient.auth.getSession();

        // 特定のエラーは無視する（リフレッシュトークンエラー）
        if (error instanceof AuthError) {
          if (!error.message.includes("Invalid Refresh Token")) {
            setAuthError("認証情報の取得に問題が発生しました");
          }
        } else if (error) {
          setAuthError("認証情報の取得に問題が発生しました");
        }

        const session = data.session;
        setSession(session);
        setUser(session?.user || null);

        if (session?.user) {
          const { data: userData, error: userError } = await supabaseClient
            .from("user")
            .select("name")
            .eq("auth_id", session.user.id)
            .single();

          if (userData && !userError) {
            setUserName(userData.name);
          } else if (userError) {
            setAuthError("ユーザー情報の取得に問題が発生しました");
          }
        }

        // 認証状態変更リスナー
        const {
          data: { subscription },
        } = await supabaseClient.auth.onAuthStateChange(
          async (event, currentSession) => {
            setSession(currentSession);
            setUser(currentSession?.user || null);

            if (currentSession?.user) {
              const { data, error } = await supabaseClient
                .from("user")
                .select("name")
                .eq("auth_id", currentSession.user.id)
                .single();

              if (data && !error) {
                setUserName(data.name);
              } else {
                // エラーはUIに表示せず、ただ処理を続行
                setUserName(null);
              }
            } else {
              setUserName(null);
            }
          }
        );

        return () => subscription.unsubscribe();
      } catch {
        // UIにエラーを表示
        setAuthError("アプリケーションの初期化中にエラーが発生しました");
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, [supabaseClient]);

  // エラーがある場合、UIにエラーバナーを表示
  const renderErrorBanner = () => {
    if (!authError) return null;
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {authError}
        <button
          className="ml-4 text-red-700 font-bold"
          onClick={() => setAuthError(null)}
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userName,
        isLoading,
        authError,
        signIn,
        signInWithOAuth,
      }}
    >
      {authError && renderErrorBanner()}
      {children}
    </AuthContext.Provider>
  );
}
