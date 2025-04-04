export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum AgeGroup {
  TEENS = "TEENS",
  TWENTIES = "TWENTIES",
  THIRTIES = "THIRTIES",
  FORTIES = "FORTIES",
  FIFTIES = "FIFTIES",
  SIXTIES = "SIXTIES",
}

export interface ReviewWithUser {
  id: string;
  createdAt: Date;
  comment: string | null;

  // カテゴリごとのコメントは必須
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
