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

export function getMergedReviews(): ReviewItem[] {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (stored) {
        const parsed = JSON.parse(stored) as ReviewItem[];
        return [...parsed, ...INITIAL_REVIEWS];
      }
    }
  } catch {
    // ignore
  }
  return INITIAL_REVIEWS;
}

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Vikram Malhotra",
    role: "Founder & CEO",
    company: "ApexFlow Technologies",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    subRatings: { communication: 5, speed: 5, quality: 5, value: 5 },
    title: "Delivered three weeks ahead of schedule with flawless UX",
    quote: "Silver Pixel Soft delivered our SaaS platform three weeks ahead of schedule. Their attention to UX micro-interactions, responsive physics, and sub-100ms API response times is truly unmatched in the agency landscape.",
    service: "Web Development",
    tags: ["React 19", "Node.js", "Docker", "Stripe Connect"],
    metric: "3 Weeks Ahead of Deadline",
    date: "October 2026",
    verified: true,
    likes: 38,
    clientUrl: "https://apexflow.io"
  },
  {
    id: "rev-2",
    author: "Sarah Jenkins",
    role: "Head of Product",
    company: "NovaScale Health",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    subRatings: { communication: 5, speed: 5, quality: 5, value: 5 },
    title: "Boosted client onboarding conversion by 42%",
    quote: "Working with the SPS team was effortless. They didn't just build our patient intake portal; they challenged our UX assumptions, eliminated 4 redundant steps, and helped us increase onboarding conversion by 42%.",
    service: "UI/UX Design",
    tags: ["Design System", "Next.js", "Figma", "Tailwind CSS"],
    metric: "+42% Onboarding Conversion",
    date: "September 2026",
    verified: true,
    likes: 47,
    clientUrl: "https://novascale.health"
  },
  {
    id: "rev-3",
    author: "Rahul Sharma",
    role: "VP of Engineering",
    company: "DataPulse AI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    subRatings: { communication: 5, speed: 4, quality: 5, value: 5 },
    title: "The cleanest codebase we've ever received from any studio",
    quote: "Zero technical debt, 100% strict TypeScript typing, complete Docker compose files, and comprehensive Swagger documentation. They operate like senior staff engineers embedded within our team.",
    service: "AI & Agents",
    tags: ["Autonomous Agents", "FastAPI", "Vector DB", "PostgreSQL"],
    metric: "Zero Technical Debt",
    date: "August 2026",
    verified: true,
    likes: 29,
  },
  {
    id: "rev-4",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Veloce Financial",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    subRatings: { communication: 5, speed: 5, quality: 5, value: 4 },
    title: "Bank-grade security combined with modern motion aesthetics",
    quote: "Our fintech app required stringent compliance, biometric multi-factor authentication, and sub-second payment settlement. Silver Pixel Soft passed every penetration test on the first audit.",
    service: "Enterprise Systems",
    tags: ["Fintech", "Zero-Knowledge", "PCI-DSS", "WebSockets"],
    metric: "100% Security Audit Pass",
    date: "July 2026",
    verified: true,
    likes: 22,
    clientUrl: "https://velocefin.com"
  },
  {
    id: "rev-5",
    author: "Marcus Chen",
    role: "Co-Founder",
    company: "Hyperion Robotics",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    subRatings: { communication: 5, speed: 5, quality: 5, value: 5 },
    title: "Real-time telemetry dashboard in WebGL and WebSockets",
    quote: "We needed a 60fps real-time digital twin to monitor autonomous warehouse fleet robots across 12 facilities. The SPS team crafted a jaw-dropping UI with instant reactivity.",
    service: "Web Development",
    tags: ["Three.js", "WebSockets", "Go", "Real-Time"],
    metric: "60 FPS Fleet Monitoring",
    date: "June 2026",
    verified: true,
    likes: 31,
  },
  {
    id: "rev-6",
    author: "Amara Okonjo",
    role: "Director of Product Growth",
    company: "Zenith Commerce",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    subRatings: { communication: 5, speed: 5, quality: 5, value: 5 },
    title: "Headless Shopify transformation with 99 Google Lighthouse score",
    quote: "Our previous store was sluggish and dropped cart completions. SPS rebuilt our frontend on Next.js 15, bringing our mobile Lighthouse performance score from 48 to a consistent 99.",
    service: "UI/UX Design",
    tags: ["Headless Commerce", "Shopify Plus", "Edge Caching", "Tailwind"],
    metric: "48 -> 99 Lighthouse Score",
    date: "May 2026",
    verified: true,
    likes: 41,
    clientUrl: "https://zenithcommerce.co"
  }
];

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
