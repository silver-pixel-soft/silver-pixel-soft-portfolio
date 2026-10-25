import { configureStore } from "@reduxjs/toolkit";
import aiReducer from "../features/ai/ai.slice.ts";
import enquaryReducer from "../features/enquary/enquary.slice.ts";

export const store = configureStore({
  reducer: {
    ai: aiReducer,
    enquary: enquaryReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;