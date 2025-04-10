"use client";

import { useAuth } from "@/context/AuthContext/useAuth";
import { Heart, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MypageSidebar() {
  const { signOut } = useAuth();
  const pathname = usePathname();

  // パスからアクティブなタブを特定する
  const isActive = (path: string): boolean => {
    if (path === "/mypage" && pathname === "/mypage") return true;
    if (path !== "/mypage" && pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const navItems = [
    {
      path: "/mypage",
      label: "マイページトップ",
      icon: null,
    },
    {
      path: "/mypage/favorites",
      label: "気になるスクール",
      icon: <Heart className="w-4 h-4 mr-2" />,
    },
    {
      path: "/mypage/settings",
      label: "各種設定",
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* サイドメニュー */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-3 border-b border-gray-100">
          <h2 className="font-bold text-gray-700 text-base">メニュー</h2>
        </div>
        <div className="p-2">
          <nav className="space-y-1">
            {navItems.map(({ path, label, icon }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive(path)
                    ? "bg-gray-100 text-gray-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}

            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </button>
          </nav>
        </div>
      </div>

      {/* ヘルプ */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-600">
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:underline">
                よくある質問
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
