import GoogleLogo from "@/components/icons/GoogleLogo";
import Link from "next/link";

type Props = {
  email: string;
  password: string;
  isLoading: boolean;
  errorMessage: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleGoogleSignIn: () => void;
};

export default function LoginFormUI({
  email,
  password,
  isLoading,
  errorMessage,
  setEmail,
  setPassword,
  handleSubmit,
  handleGoogleSignIn,
}: Props) {
  return (
    <div className="w-full max-w-md mx-auto p-6 border border-gray-300 bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
        ログイン
      </h1>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      <div className="mb-6">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <GoogleLogo />
          Googleでログイン
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

      <form onSubmit={handleSubmit} className="space-y-4">
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
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="example@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              ログイン状態を保持する
            </label>
          </div>

          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="text-cyan-600 hover:underline"
            >
              パスワードをお忘れですか？
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          アカウントをお持ちでない方は
          <Link href="/register" className="ml-1 text-cyan-600 hover:underline">
            ユーザー登録
          </Link>
        </p>
      </div>
    </div>
  );
}
