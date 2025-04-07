import { Gender, AgeGroup } from "@prisma/client";

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
