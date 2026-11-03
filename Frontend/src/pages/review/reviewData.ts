export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  subRatings?: {
    communication: number;
    speed: number;
    quality: number;
    value: number;
  };
  title: string;
  quote: string;
  service: string;
  tags: string[];
  metric?: string;
  date: string;
  verified: boolean;
  isNew?: boolean;
  likes: number;
  clientUrl?: string;
}

export const STORAGE_KEY_REVIEWS = "sps_user_reviews";
export const STORAGE_KEY_LIKES = "sps_review_likes";

const LEGACY_PREWRITTEN_IDS = new Set([
  "rev-1",
  "rev-2",
  "rev-3",
  "rev-4",
  "rev-5",
  "rev-6",
]);

export function getMergedReviews(): ReviewItem[] {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (stored) {
        const parsed = JSON.parse(stored) as ReviewItem[];
        return parsed.filter((r) => !LEGACY_PREWRITTEN_IDS.has(r.id));
      }
    }
  } catch {
    // ignore
  }
  return [];
}

export const INITIAL_REVIEWS: ReviewItem[] = [];

export const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
];

export const SERVICE_OPTIONS = [
  "Web Development",
  "AI & Agents",
  "UI/UX Design",
  "Mobile Apps",
  "Enterprise Systems",
  "Cloud & DevOps"
];

export const PROMPT_CHIPS = [
  "Code quality exceeded expectations",
  "Delivered weeks before deadline",
  "Flawless communication throughout sprints",
  "Measurable surge in user engagement",
  "Zero technical debt and full test coverage",
  "Would strongly recommend to any founder"
];

export const BADGE_OPTIONS = [
  "Clean Code",
  "On-Time Delivery",
  "High Communication",
  "Innovative AI",
  "Pixel-Perfect UI",
  "Production Ready",
  "High ROI",
  "Enterprise Grade"
];
