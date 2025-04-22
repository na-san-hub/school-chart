import { AgeGroup, Gender } from "@prisma/client";
import { ageGroupOptions, genderOptions } from "@/lib/staticLists";

type ProfileSettingsUIProps = {
  // 状態
  isLoading: boolean;
  isDeleting: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  showConfirmation: boolean;
  name: string;
  gender: Gender;
  ageGroup: AgeGroup;
  email: string;
  // メソッド
  setName: (name: string) => void;
  setGender: (gender: Gender) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleDeleteAccount: () => Promise<void>;
  handleCancelDelete: () => void;
};

export default function ProfileSettingsUI({
  isLoading,
  isDeleting,
  errorMessage,
  successMessage,
  showConfirmation,
  name,
  gender,
  ageGroup,
  email,
  setName,
  setGender,
  setAgeGroup,
  handleSubmit,
  handleDeleteAccount,
  handleCancelDelete,
}: ProfileSettingsUIProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-6">プロフィール設定</h2>

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

      {/* プロフィール更新フォーム */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* メールアドレス（変更不可） */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            メールアドレスは変更できません
          </p>
        </div>

        {/* ユーザー名 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ユーザー名
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        {/* 年齢グループ */}
        <div>
          <label
            htmlFor="ageGroup"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            年齢
          </label>
          <select
            id="ageGroup"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          >
            {ageGroupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 性別 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            性別
          </label>
          <div className="flex gap-4">
            {genderOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={gender === option.value}
                  onChange={() => setGender(option.value)}
                  className="mr-2 h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                  required
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 更新ボタン */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md text-white bg-cyan-600 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "更新中..." : "プロフィールを更新する"}
          </button>
        </div>
      </form>

      {/* アカウント削除セクション */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-bold text-red-600 mb-2">
          アカウントの削除
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          アカウントを削除すると、すべてのデータが完全に削除され、復元できなくなります。
        </p>

        {showConfirmation ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-sm text-red-700 mb-4">
              本当にアカウントを削除しますか？この操作は取り消せません。
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className={`py-2 px-4 bg-red-600 text-sm text-white rounded-md hover:bg-red-700 ${
                  isDeleting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? "削除中..." : "削除する"}
              </button>
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="py-2 px-4 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleDeleteAccount}
            className="py-2 px-4 bg-white border text-sm border-red-300 text-red-600 rounded-md hover:bg-red-50"
          >
            アカウントを削除する
          </button>
        )}
      </div>
    </div>
  );
}
