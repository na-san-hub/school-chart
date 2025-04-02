export type Gender = "MALE" | "FEMALE" | "OTHER";
export type AgeGroup =
  | "TEENS"
  | "TWENTIES"
  | "THIRTIES"
  | "FORTIES"
  | "FIFTIES"
  | "SIXTIES";

export interface ReviewWithUser {
  id: string;
  comment?: string;
  createdAt: Date;
  ratingCurriculum: number;
  ratingInstructor: number;
  ratingCost: number;
  ratingSupport: number;
  ratingCommunity: number;
  course: { name: string };
  user: {
    gender: Gender;
    ageGroup: AgeGroup;
  };
}
