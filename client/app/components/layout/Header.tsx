import React from "react";
import Link from "next/link";
import Image from "next/image";
import AuthStatus from "./AuthStatus";

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
          <AuthStatus />
        </nav>
      </div>
    </header>
  );
};

export default Header;
