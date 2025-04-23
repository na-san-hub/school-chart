import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile, deleteUserAccount } from "@/actions/authActions";
import { useAuth } from "@/context/AuthContext/useAuth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AgeGroup, Gender } from "@prisma/client";

export function useProfileSettings() {
  const router = useRouter();
  const { user, userName } = useAuth();
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // フォーム入力値の状態
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.OTHER);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(AgeGroup.TWENTIES);
  const [email, setEmail] = useState("");

  // ユーザー情報の取得
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // メールアドレスを取得
        setEmail(user.email || "");

        // ユーザー名を設定
        if (userName) {
          setName(userName);
        }

        // ユーザーメタデータから性別と年齢を取得
        const { data: userData } = await supabase
          .from("user")
          .select("gender, ageGroup")
          .eq("auth_id", user.id)
          .single();

        if (userData) {
          setGender(userData.gender || Gender.OTHER);
          setAgeGroup(userData.ageGroup || AgeGroup.TWENTIES);
        }
      } catch (error) {
        console.error("ユーザー情報取得エラー:", error);
      }
    };

    fetchUserData();
  }, [user, userName, supabase]);

  // プロフィール更新処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name || !gender || !ageGroup) {
      setErrorMessage("すべての項目を入力してください");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("gender", gender);
      formData.append("ageGroup", ageGroup);

      const result = await updateUserProfile(formData);

      if (!result.success) {
        throw new Error(result.error || "プロフィールの更新に失敗しました");
      }

      setSuccessMessage("プロフィールを更新しました");
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "プロフィールの更新に失敗しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // アカウント削除処理
  const handleDeleteAccount = async () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      const result = await deleteUserAccount();

      if (!result.success) {
        throw new Error(result.error || "アカウントの削除に失敗しました");
      }

      setSuccessMessage("アカウントが削除されました。ログアウトします...");

      setTimeout(() => {
        router.push("/logout");
      }, 1000);
    } catch (error) {
      console.error("アカウント削除エラー:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "アカウントの削除に失敗しました"
      );
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  // 削除確認のキャンセル
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return {
    // 状態
    isLoading,
    isDeleting,
    errorMessage,
    successMessage,
    showConfirmation,
    name,
    gender,
    ageGroup,
    email,
    // メソッド
    setName,
    setGender,
    setAgeGroup,
    handleSubmit,
    handleDeleteAccount,
    handleCancelDelete,
  };
}
