"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext/useAuth";
import LoginFormUI from "./LoginFormUI";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { signIn, signInWithOAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMessage("メールアドレスまたはパスワードが正しくありません");
        return;
      }
      router.push(callbackUrl);
    } catch (error) {
      console.error("ログインエラー:", error);
      setErrorMessage("ログイン処理中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await signInWithOAuth("google", callbackUrl);
      if (error) {
        setErrorMessage("Googleログイン処理中にエラーが発生しました");
        console.error("Googleログインエラー:", error);
      }
    } catch (error) {
      console.error("Googleログインエラー:", error);
      setErrorMessage("ログイン処理中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginFormUI
      email={email}
      password={password}
      isLoading={isLoading}
      errorMessage={errorMessage}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      handleGoogleSignIn={handleGoogleSignIn}
    />
  );
}
