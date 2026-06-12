import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ArbiPayLandingPageResponse } from "./useGetArbiPayLandingData";
import type { GoogleReview } from "./useGetGoogleReviews";

export const arbiPayApi = createApi({
  reducerPath: "arbiPayApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getArbiPayLandingData: builder.query<ArbiPayLandingPageResponse, void>({
      query: () =>
        "https://arbipay.online/onboarding/api/public/page-builder/pages/by-slug/arbi-pay-landing",
    }),
    getGoogleReviews: builder.query<GoogleReview[], void>({
      query: () => "https://arbi-ex.com/landing/api/public/google-reviews",
    }),
  }),
});

export const {
  useGetArbiPayLandingDataQuery,
  useGetGoogleReviewsQuery,
} = arbiPayApi;
