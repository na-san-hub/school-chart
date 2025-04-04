import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white py-2">
      <div className="max-w-5xl w-full mx-auto my-1 flex items-center justify-between px-12">
        {/* サイト名 */}
        <div className="flex items-end space-x-3">
          <Link href="/" className="flex items-end">
            <Image
              src="/logo.png"
              alt="スクチャIT"
              width={115}
              height={40}
              priority
            />
          </Link>
          <div className="text-gray-500 text-xs">
            IT系スクールの口コミを探すなら
          </div>
        </div>

        {/* メニュー */}
        <nav className="flex space-x-6 text-sm font-semibold tracking-wide">
          <Link href="#" className="text-gray-500 hover:text-gray-700">
            ユーザー登録
          </Link>
          <Link href="#" className="text-gray-500 hover:text-gray-700">
            ログイン
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
