import { Suspense } from "react";
import ProfileSettings from "./ProfileSettings";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-700 mb-5">各種設定</h1>

      <Suspense fallback={<div className="animate-pulse">読み込み中...</div>}>
        <ProfileSettings />
      </Suspense>
    </div>
  );
}
