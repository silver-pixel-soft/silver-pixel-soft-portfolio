import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  type ReviewItem,
  STORAGE_KEY_REVIEWS,
  STORAGE_KEY_LIKES,
} from "../../pages/review/reviewData";

export interface CreateReviewPayload {
  overallReating: number;
  communication_transperincy?: number;
  turnaround_speed?: number;
  code_system_qualiy?: number;
  value_of_money?: number;
  fullname: string;
  role: string;
  project: string;
  email: string;
  product_link?: string;
  avatar: string;
  service_caterogyrvice: string;
  outcome?: string;
  review_heading: string;
  review_: string;
  tags_: string[];
}

export interface ReviewState {
  reviews: ReviewItem[];
  likedReviewIds: string[];
  isFetching: boolean;
  fetchError: string | null;
  isPosting: boolean;
  postSuccess: boolean;
  postError: string | null;
  lastCreatedReview: ReviewItem | null;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// Helper to convert backend document to Frontend ReviewItem
export const mapBackendReviewToItem = (raw: any): ReviewItem => {
  const tags: string[] = Array.isArray(raw?.tags_)
    ? raw.tags_
        .map((t: any) => (typeof t === "string" ? t : t?.tag || ""))
        .filter(Boolean)
    : Array.isArray(raw?.tags)
    ? raw.tags
    : ["Client Review"];

  const createdDate = raw?.createdAt ? new Date(raw.createdAt) : new Date();
  const dateFormatted = !isNaN(createdDate.getTime())
    ? createdDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  return {
    id: raw?._id || raw?.id || `rev-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    author: raw?.fullname || raw?.author || "Anonymous Client",
    role: raw?.role || "Client",
    company: raw?.project || raw?.company || "Confidential Project",
    avatar:
      raw?.avatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: Number(raw?.overallReating ?? raw?.rating ?? 5),
    subRatings: {
      communication: Number(
        raw?.communication_transperincy ?? raw?.subRatings?.communication ?? 5
      ),
      speed: Number(raw?.turnaround_speed ?? raw?.subRatings?.speed ?? 5),
      quality: Number(raw?.code_system_qualiy ?? raw?.subRatings?.quality ?? 5),
      value: Number(raw?.value_of_money ?? raw?.subRatings?.value ?? 5),
    },
    title: raw?.review_heading || raw?.title || "Outstanding Collaboration",
    quote: raw?.review_ || raw?.quote || "",
    service: raw?.service_caterogyrvice || raw?.service || "Web Development",
    tags: tags.length > 0 ? tags : ["Client Review"],
    metric: raw?.outcome || raw?.metric || undefined,
    date: dateFormatted,
    verified: true,
    isNew: raw?.isNew ?? false,
    likes: typeof raw?.likes === "number" ? raw.likes : 1,
    clientUrl: raw?.product_link || raw?.clientUrl || undefined,
  };
};

// Initial state loader
const getInitialState = (): ReviewState => {
  let initialLikes: string[] = [];
  let initialReviews: ReviewItem[] = [];

  try {
    if (typeof window !== "undefined") {
      const storedLikes = localStorage.getItem(STORAGE_KEY_LIKES);
      if (storedLikes) {
        initialLikes = JSON.parse(storedLikes);
      }
      const storedReviews = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (storedReviews) {
        const parsed = JSON.parse(storedReviews) as ReviewItem[];
        // Filter out any legacy pre-written review ids (rev-1 to rev-6)
        initialReviews = parsed.filter(
          (r) => !r.id?.match(/^rev-[1-6]$/)
        );
      }
    }
  } catch {
    // Ignore storage parsing errors
  }

  return {
    reviews: initialReviews,
    likedReviewIds: initialLikes,
    isFetching: false,
    fetchError: null,
    isPosting: false,
    postSuccess: false,
    postError: null,
    lastCreatedReview: null,
  };
};

const initialState: ReviewState = getInitialState();

// Async thunk: Fetch all reviews from backend
export const fetchReviews = createAsyncThunk<
  ReviewItem[],
  void,
  { rejectValue: string }
>("review/fetchReviews", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/review/get-review`, {
      withCredentials: true,
    });
    const rawData = response.data?.data;
    if (Array.isArray(rawData)) {
      return rawData.map(mapBackendReviewToItem);
    }
    return [];
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Failed to fetch reviews from server";
    return rejectWithValue(errorMessage);
  }
});

// Async thunk: Post a new review
export const postReview = createAsyncThunk<
  ReviewItem,
  CreateReviewPayload,
  { rejectValue: string }
>("review/postReview", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/review/review`, payload, {
      withCredentials: true,
    });
    const createdRaw = response.data?.data;
    const mapped = mapBackendReviewToItem(createdRaw);
    mapped.isNew = true;
    return mapped;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Failed to submit review. Please try again.";
    return rejectWithValue(errorMessage);
  }
});

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    toggleLikeReview: (state, action: PayloadAction<string>) => {
      const reviewId = action.payload;
      const isAlreadyLiked = state.likedReviewIds.includes(reviewId);

      if (isAlreadyLiked) {
        state.likedReviewIds = state.likedReviewIds.filter((id) => id !== reviewId);
        state.reviews = state.reviews.map((r) =>
          r.id === reviewId ? { ...r, likes: Math.max(0, r.likes - 1) } : r
        );
      } else {
        state.likedReviewIds.push(reviewId);
        state.reviews = state.reviews.map((r) =>
          r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
        );
      }

      try {
        localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(state.likedReviewIds));
      } catch {
        // Ignore storage write errors
      }
    },
    resetPostReviewStatus: (state) => {
      state.isPosting = false;
      state.postSuccess = false;
      state.postError = null;
    },
    clearReviewErrors: (state) => {
      state.fetchError = null;
      state.postError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch reviews
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isFetching = true;
        state.fetchError = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<ReviewItem[]>) => {
        state.isFetching = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isFetching = false;
        state.fetchError = action.payload || "Failed to load reviews";
      });

    // Post review
    builder
      .addCase(postReview.pending, (state) => {
        state.isPosting = true;
        state.postSuccess = false;
        state.postError = null;
      })
      .addCase(postReview.fulfilled, (state, action: PayloadAction<ReviewItem>) => {
        state.isPosting = false;
        state.postSuccess = true;
        state.lastCreatedReview = action.payload;
        // Prepend newly submitted review
        state.reviews = [action.payload, ...state.reviews.filter((r) => r.id !== action.payload.id)];

        // Persist locally for offline resilience
        try {
          const stored = localStorage.getItem(STORAGE_KEY_REVIEWS);
          const current = stored ? JSON.parse(stored) : [];
          localStorage.setItem(
            STORAGE_KEY_REVIEWS,
            JSON.stringify([action.payload, ...current.filter((r: any) => r.id !== action.payload.id)])
          );
        } catch {
          // Ignore
        }
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isPosting = false;
        state.postSuccess = false;
        state.postError = action.payload || "Failed to submit review";
      });
  },
});

export const { toggleLikeReview, resetPostReviewStatus, clearReviewErrors } =
  reviewSlice.actions;

export default reviewSlice.reducer;

