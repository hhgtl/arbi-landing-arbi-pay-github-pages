import { useGetGoogleReviewsQuery } from "./arbiPayApi";

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  createdAt: string;
  reviewUrl: string;
  source: string;
}

interface UseGetGoogleReviewsResult {
  data: GoogleReview[] | null;
  isLoading: boolean;
  error: Error | null;
}

const normalizeRtkQueryError = (error: unknown): Error | null => {
  if (!error) {
    return null;
  }

  if (error instanceof Error) {
    return error;
  }

  if (typeof error === "object" && error !== null) {
    if (
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    ) {
      return new Error((error as { message: string }).message);
    }

    if ("status" in error) {
      return new Error(
        `Failed to fetch google reviews: ${String(
          (error as { status: unknown }).status,
        )}`,
      );
    }
  }

  return new Error("Unknown fetch error");
};

export const useGetGoogleReviews = (): UseGetGoogleReviewsResult => {
  const { data, error, isLoading } = useGetGoogleReviewsQuery();

  return {
    data: data ?? null,
    isLoading,
    error: normalizeRtkQueryError(error),
  };
};
