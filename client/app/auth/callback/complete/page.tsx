import { Suspense } from "react";
import AuthCallbackContent from "./AuthCallbackContent";

export default function AuthCallbackCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          ロード中...
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
