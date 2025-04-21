import { getSchoolHeader } from "@/lib/school";
import { getAllCoursesForList } from "@/lib/courses";
import ReviewForm from "../../components/reviews/ReviewForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function NewReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // paramsをawaitで解決
  const { id: schoolId } = await params;

  // Supabaseクライアントを作成して認証チェック
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    // ログインしていない場合はログインページにリダイレクト
    redirect(`/login?callbackUrl=/schools/${schoolId}/reviews/new`);
  }

  // スクール情報とコース一覧を取得
  const [school, courses] = await Promise.all([
    getSchoolHeader(schoolId),
    getAllCoursesForList(schoolId),
  ]);

  if (!school) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-bold">スクールが見つかりません</p>
      </div>
    );
  }

  // コースがない場合でもフォームを表示（「その他」オプションで投稿可能）
  return (
    <div className="w-full border-t border-gray-400 mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-6 text-gray-700">
          {school.name}のレビューを投稿する
        </h1>

        <ReviewForm schoolId={schoolId} courses={courses} />
      </div>
    </div>
  );
}
