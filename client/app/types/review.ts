import { Gender, AgeGroup } from "@prisma/client";
export type { Gender, AgeGroup };

export interface ReviewWithUser {
  id: string;
  createdAt: Date;
  comment: string | null;

  commentCurriculum: string;
  commentInstructor: string;
  commentCost: string;
  commentSupport: string;
  commentCommunity: string;

  ratingCurriculum: number;
  ratingInstructor: number;
  ratingCost: number;
  ratingSupport: number;
  ratingCommunity: number;

  user: {
    gender: Gender;
    ageGroup: AgeGroup;
  };
  course: {
    name: string;
  };
}

// マイページなどで使用する拡張されたレビュー型
export interface ExtendedReviewWithUser extends ReviewWithUser {
  course: {
    name: string;
    school?: {
      id: string;
      name: string;
    };
  };
}

// マイページでの表示用レビュー型
export interface UserReviewDisplay {
  id: string;
  schoolId: string;
  schoolName: string;
  courseName: string;
  rating: number;
  createdAt: Date;
}
