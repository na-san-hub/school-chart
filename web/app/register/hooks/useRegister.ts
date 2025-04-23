import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AgeGroup, Gender } from "@prisma/client";
import { handleAuthEvent } from "@/actions/authActions";

export function useRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // フォーム入力値の状態
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | "">("");
  const [gender, setGender] = useState<Gender | "">("");

  // パスワード表示状態
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Supabaseクライアントを初期化
  const supabase = createClientComponentClient();

  // メールアドレスのバリデーション
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // パスワードの強度チェック
  const isStrongPassword = (password: string) => {
    // 8文字以上、かつ、数字と英字の両方を含む
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return password.length >= 8 && hasNumber && hasLetter;
  };

  // パスワード表示切り替え
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // 入力検証
    if (!name || !email || !password || !ageGroup || !gender) {
      setErrorMessage("全ての項目を入力してください");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("有効なメールアドレスを入力してください");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("パスワードが一致しません");
      setIsLoading(false);
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage(
        "パスワードは8文字以上で、少なくとも1つの数字と1つの英字を含む必要があります"
      );
      setIsLoading(false);
      return;
    }

    try {
      // Supabaseでユーザー登録
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name,
            gender,
            ageGroup,
          },
        },
      });

      if (error) {
        throw error;
      }

      // ユーザーIDを取得
      if (data.user?.id) {
        // ServerActionを使用してユーザー情報をデータベースに保存
        const formData = new FormData();
        formData.append("type", "SIGNED_UP");
        formData.append("authId", data.user.id);
        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("ageGroup", ageGroup);

        // ServerActionを直接呼び出す
        const userResult = await handleAuthEvent(formData);

        if (!userResult.success) {
          console.error("ユーザー情報の保存に失敗:", userResult.error);
          // エラーがあっても認証自体は成功しているのでメッセージは表示する
        }
      }

      setSuccessMessage("確認メールを送信しました。メールをご確認ください。");
      // 成功メッセージを表示後、3秒後にログインページへリダイレクト
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("登録エラー:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "アカウント登録中にエラーが発生しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Googleでサインアップ
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?registration=true`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Googleサインアップエラー:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Googleサインアップ中にエラーが発生しました"
      );
      setIsLoading(false);
    }
  };

  return {
    // 状態
    name,
    email,
    password,
    confirmPassword,
    ageGroup,
    gender,
    isLoading,
    errorMessage,
    successMessage,
    showPassword,
    showConfirmPassword,
    // セッター
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setAgeGroup,
    setGender,
    // 処理
    handleSubmit,
    handleGoogleSignUp,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
}
