import { Suspense } from "react";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center flex-grow bg-gray-50 justify-center py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Suspense fallback={<div>読み込み中...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
