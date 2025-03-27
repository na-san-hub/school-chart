import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-2 pb-4">
      <div className="max-w-4xl mx-auto px-4 py-4 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <Image
          src="/logo.png"
          alt="スクチャIT"
          width={115}
          height={40}
          priority
        />
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">
            運営会社
          </a>
          <a href="#" className="hover:underline">
            プライバシーポリシー
          </a>
          <a href="#" className="hover:underline">
            お問い合わせ
          </a>
        </div>
      </div>
      <div className="py-2 text-center">
        <p className="text-xs text-gray-500">
          &copy; 2025 スクチャIT. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
