import { PenSquare } from "lucide-react";

const ReviewsButton = () => {
  return (
    <button className="w-full py-3 bg-cyan-600 border border-cyan-600 text-white text-sm rounded-md flex items-center justify-center hover:opacity-90">
      <PenSquare className="w-4 h-4 mr-2" />
      口コミを投稿する
    </button>
  );
};

export default ReviewsButton;
