import { configureStore } from "@reduxjs/toolkit";
import aiReducer from "../features/ai/ai.slice.ts";
import enquaryReducer from "../features/enquary/enquary.slice.ts";
import reviewReducer from "../features/review/review.slice.ts";

export const store = configureStore({
  reducer: {
    ai: aiReducer,
    enquary: enquaryReducer,
    review: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
