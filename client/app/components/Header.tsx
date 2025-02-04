import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white py-2 px-4 flex items-center justify-between">
      {/* サイト名 */}
      <div className="flex items-end  space-x-3">
        <Link href="/" className="pl-96 flex items-end ">
          <Image
            src="/headerlogo.png"
            alt="スクールレビュー"
            width={110}
            height={40}
            priority
          />
        </Link>

        <div className="text-gray-400 text-xs ">
          IT系スクールの口コミを探すなら
        </div>
      </div>

      {/* メニュー */}
      <nav className="pr-96 flex space-x-6 text-sm">
        <Link href="/sign-up" className="text-gray-500 hover:text-gray-700">
          ユーザー登録
        </Link>
        <Link href="/sign-in" className="text-gray-500 hover:text-gray-700">
          ログイン
        </Link>
      </nav>
    </header>
  );
};

export default Header;
