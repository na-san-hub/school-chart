import Link from "next/link";
import GoogleLogo from "@/components/icons/GoogleLogo";
import { AgeGroup, Gender } from "@prisma/client";
import { ageGroupOptions, genderOptions } from "@/lib/staticLists";
import { Eye, EyeOff } from "lucide-react";

type RegisterFormUIProps = {
  // 状態
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  ageGroup: AgeGroup | "";
  gender: Gender | "";
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  showPassword: boolean;
  showConfirmPassword: boolean;
  // セッター
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setAgeGroup: (value: AgeGroup | "") => void;
  setGender: (value: Gender | "") => void;
  // 処理
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleGoogleSignUp: () => void;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
};

export default function RegisterFormUI({
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
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setAgeGroup,
  setGender,
  handleSubmit,
  handleGoogleSignUp,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
}: RegisterFormUIProps) {
  // テキスト入力フィールドの定義（パスワードフィールドを除く）
  const textFields = [
    {
      id: "name",
      label: "ユーザー名",
      type: "text",
      value: name,
      onChange: setName,
      placeholder: "例：田中 太郎",
      autoComplete: undefined,
    },
    {
      id: "email",
      label: "メールアドレス",
      type: "email",
      value: email,
      onChange: setEmail,
      placeholder: "example@example.com",
      autoComplete: "new-email",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 border border-gray-300 bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
        ユーザー登録
      </h1>

      <div className="mb-6">
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          <GoogleLogo />
          Googleで登録
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">または</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        {/* テキスト入力フィールド */}
        {textFields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label} <span className="text-red-500">*</span>
            </label>
            <input
              id={field.id}
              type={field.type}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required
            />
          </div>
        ))}

        {/* パスワード入力フィールド（表示/非表示切り替え付き） */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            パスワード <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="8文字以上の英数字"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* パスワード確認入力フィールド（表示/非表示切り替え付き） */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            パスワード（確認） <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="パスワードをもう一度入力"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* 年齢グループ */}
        <div>
          <label
            htmlFor="ageGroup"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            年齢 <span className="text-red-500">*</span>
          </label>
          <select
            id="ageGroup"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">選択してください</option>
            {ageGroupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 性別 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            性別 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 mt-2 mb-5">
            {genderOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={gender === option.value}
                  onChange={() => setGender(option.value)}
                  className="mr-2 h-4 w-4 text-cyan-600 focus:ring-blue-400"
                  required
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 利用規約 */}
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-cyan-600 focus:ring-blue-400 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            <Link href="/terms" className="text-cyan-600 hover:underline">
              利用規約
            </Link>
            と
            <Link href="/privacy" className="text-cyan-600 hover:underline">
              プライバシーポリシー
            </Link>
            に同意します
          </label>
        </div>

        {/* メッセージ表示 */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {successMessage}
          </div>
        )}

        {/* 登録ボタン */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "登録中..." : "登録する"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          すでにアカウントをお持ちの方は
          <Link href="/login" className="ml-1 text-cyan-600 hover:underline">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
