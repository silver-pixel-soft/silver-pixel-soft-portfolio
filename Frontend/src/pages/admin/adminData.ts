export type ProjectStatus = "pending" | "accepted" | "in-discussion" | "rejected";

export interface ProjectRequest {
  id: string;
  clientName: string;
  company: string;
  email: string;
  phone?: string;
  service: string;
  budget: string;
  timeline: string;
  status: ProjectStatus;
  date: string;
  description: string;
  notes?: string;
  tags?: string[];
  avatar?: string;
  estimatedValue: number; // in USD for pipeline calculation
}

export interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
  agencyName: string;
  notificationsEnabled: boolean;
  twoFactorEnabled: boolean;
}

export const STORAGE_KEY_ADMIN_AUTH = "sps_admin_session";
export const STORAGE_KEY_ADMIN_REQUESTS = "sps_admin_requests";
export const STORAGE_KEY_ADMIN_PROFILE = "sps_admin_profile";

export const DEFAULT_ADMIN: AdminUser = {
  name: "Akshay Verma",
  email: "admin@silverpixelsoft.com",
  role: "Principal Director & Lead Architect",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  agencyName: "Silver Pixel Soft Studio & Labs",
  notificationsEnabled: true,
  twoFactorEnabled: false,
};

export const INITIAL_PROJECT_REQUESTS: ProjectRequest[] = [
  {
    id: "req-101",
    clientName: "David Sterling",
    company: "Aetherial AI Labs",
    email: "david.s@aetherial.ai",
    phone: "+1 (555) 382-9102",
    service: "AI & Agents",
    budget: "$35,000 - $50,000",
    timeline: "4 - 6 Weeks",
    status: "pending",
    date: "Oct 23, 2026",
    description: "We are developing an autonomous multi-agent orchestration layer for legal document analysis. We require custom LLM tool-calling pipelines, vector indexing with sub-50ms latency, and a sleek dark-mode cockpit dashboard.",
    tags: ["Autonomous Agents", "FastAPI", "Vector DB", "React"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    estimatedValue: 42000,
  },
  {
    id: "req-102",
    clientName: "Sophia Dubois",
    company: "Monolith Fintech",
    email: "s.dubois@monolithpay.eu",
    phone: "+33 6 42 19 88 00",
    service: "Enterprise Systems",
    budget: "$50,000+",
    timeline: "8 - 12 Weeks",
    status: "in-discussion",
    date: "Oct 22, 2026",
    description: "Looking for complete front-office and back-office redesign of our multi-currency FX settlement platform. Must be bank-grade secure, compliant with EU regulations, and feature real-time WebSockets tickers.",
    notes: "NDA signed on Oct 22. Initial discovery call scheduled for Friday 3 PM CET.",
    tags: ["Fintech", "WebSockets", "Zero-Knowledge", "Next.js"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    estimatedValue: 65000,
  },
  {
    id: "req-103",
    clientName: "Marcus Vance",
    company: "Chronos Health Tech",
    email: "m.vance@chronoshealth.com",
    phone: "+1 (415) 890-2134",
    service: "UI/UX Design",
    budget: "$15,000 - $25,000",
    timeline: "3 - 4 Weeks",
    status: "accepted",
    date: "Oct 20, 2026",
    description: "We need an award-winning design system and high-fidelity interactive prototype for our patient intake mobile app. Focus on WCAG accessibility and fluid 60fps micro-interactions.",
    notes: "Contract deposit received. Sprint 1 started on Oct 21.",
    tags: ["Figma", "Design System", "Mobile UX", "Accessibility"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    estimatedValue: 22000,
  },
  {
    id: "req-104",
    clientName: "Amara Okonkwo",
    company: "Nexus Supply Logistics",
    email: "amara@nexussupply.co",
    phone: "+44 20 7946 0912",
    service: "Web Development",
    budget: "$25,000 - $35,000",
    timeline: "6 - 8 Weeks",
    status: "accepted",
    date: "Oct 19, 2026",
    description: "End-to-end container logistics tracking system with live map telemetry, driver dispatch dispatchers, and automated PDF bill-of-lading generation.",
    notes: "Architecture review passed. Sprint 2 underway.",
    tags: ["React 19", "Node.js", "Docker", "Mapbox GL"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    estimatedValue: 32000,
  },
  {
    id: "req-105",
    clientName: "Jason K.",
    company: "Stealth Crypto Gaming",
    email: "jasonk_stealth@proton.me",
    service: "Mobile Apps",
    budget: "$5,000 - $10,000",
    timeline: "1 - 2 Weeks",
    status: "rejected",
    date: "Oct 16, 2026",
    description: "Need full-stack blockchain play-to-earn game cloned in 10 days with smart contracts.",
    notes: "Declined due to unrealistic deadline and out-of-scope compliance liabilities.",
    tags: ["Web3", "Gaming"],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    estimatedValue: 8000,
  },
  {
    id: "req-106",
    clientName: "Rachel Tanaka",
    company: "Komorebi Media",
    email: "tanaka@komorebistudios.jp",
    phone: "+81 3 5555 0143",
    service: "Web Development",
    budget: "$20,000 - $30,000",
    timeline: "4 Weeks",
    status: "pending",
    date: "Oct 23, 2026",
    description: "High-end interactive 3D showcase site for our upcoming animated documentary release. Needs WebGL particle effects, audio reactivity, and sub-1s load times.",
    tags: ["Three.js", "WebGL", "GSAP", "Next.js"],
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80",
    estimatedValue: 26000,
  }
];

export function getStoredRequests(): ProjectRequest[] {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY_ADMIN_REQUESTS);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch {
    // ignore
  }
  return INITIAL_PROJECT_REQUESTS;
}

export function saveStoredRequests(requests: ProjectRequest[]): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_ADMIN_REQUESTS, JSON.stringify(requests));
    }
  } catch {
    // ignore
  }
}

export function getAdminProfile(): AdminUser {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY_ADMIN_PROFILE);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_ADMIN;
}

export function saveAdminProfile(profile: AdminUser): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_ADMIN_PROFILE, JSON.stringify(profile));
    }
  } catch {
    // ignore
  }
}

export function isAdminAuthenticated(): boolean {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === "true";
    }
  } catch {
    // ignore
  }
  return false;
}

export function setAdminAuthenticated(auth: boolean): void {
  try {
    if (typeof window !== "undefined") {
      if (auth) {
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, "true");
      } else {
        localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      }
    }
  } catch {
    // ignore
  }
}
