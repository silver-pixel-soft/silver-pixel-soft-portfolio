import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Inbox,
  CheckCircle2,
  Clock,
  DollarSign,
  Search,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Plus,
  MessageSquare,
  LogOut,
  Settings as SettingsIcon,
  BarChart3,
  Check,
  X,
  FileText,
  Star,
  Send,
} from "lucide-react";
import {
  type ProjectRequest,
  type ProjectStatus,
  getStoredRequests,
  saveStoredRequests,
  getAdminProfile,
} from "../adminData";
import { Settings } from "./Settings";
import { getMergedReviews, type ReviewItem } from "../../review/reviewData";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const profile = getAdminProfile();

  // Active Main Navigation Tab: 'requests' | 'analytics' | 'reviews' | 'settings'
  const [activeTab, setActiveTab] = useState<"requests" | "analytics" | "reviews" | "settings">("requests");

  // Requests state
  const [requests, setRequests] = useState<ProjectRequest[]>(() => getStoredRequests());


  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Notifications
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Lead Form state
  const [newClientName, setNewClientName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newService, setNewService] = useState("Web Development");
  const [newBudget, setNewBudget] = useState("$25,000 - $35,000");
  const [newEstimatedValue, setNewEstimatedValue] = useState("30000");
  const [newTimeline, setNewTimeline] = useState("4 - 6 Weeks");
  const [newDescription, setNewDescription] = useState("");

  // Internal notes editor in detail modal
  const [modalNotes, setModalNotes] = useState("");

  // Reviews from review system
  const [reviews] = useState<ReviewItem[]>(() => getMergedReviews());

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Status update handler
  const handleUpdateStatus = (id: string, newStatus: ProjectStatus) => {
    const updated = requests.map((req) => {
      if (req.id === id) {
        return { ...req, status: newStatus };
      }
      return req;
    });
    setRequests(updated);
    saveStoredRequests(updated);

    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }

    if (newStatus === "accepted") {
      triggerToast(`Project accepted! Added to active engineering pipeline.`);
    } else if (newStatus === "rejected") {
      triggerToast(`Proposal declined.`);
    } else if (newStatus === "in-discussion") {
      triggerToast(`Moved project to 'In Discussion' status.`);
    }
  };

  // Save internal notes
  const handleSaveNotes = (id: string) => {
    const updated = requests.map((req) => {
      if (req.id === id) {
        return { ...req, notes: modalNotes };
      }
      return req;
    });
    setRequests(updated);
    saveStoredRequests(updated);
    if (selectedRequest) {
      setSelectedRequest({ ...selectedRequest, notes: modalNotes });
    }
    triggerToast("Internal notes saved successfully.");
  };

  // Handle Create Lead
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newEmail || !newDescription) return;

    const newReq: ProjectRequest = {
      id: `req-${Date.now().toString().slice(-4)}`,
      clientName: newClientName.trim(),
      company: newCompany.trim() || "Independent / Startup",
      email: newEmail.trim(),
      service: newService,
      budget: newBudget,
      timeline: newTimeline,
      status: "pending",
      date: "Today",
      description: newDescription.trim(),
      estimatedValue: Number(newEstimatedValue) || 20000,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    };

    const updated = [newReq, ...requests];
    setRequests(updated);
    saveStoredRequests(updated);
    setShowNewLeadModal(false);
    triggerToast(`New project inquiry from ${newClientName} recorded!`);

    // Reset fields
    setNewClientName("");
    setNewCompany("");
    setNewEmail("");
    setNewDescription("");
  };

  // Metrics Calculation
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const accepted = requests.filter((r) => r.status === "accepted").length;
    const inDiscussion = requests.filter((r) => r.status === "in-discussion").length;

    const totalPipelineValue = requests.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);
    const acceptedValue = requests
      .filter((r) => r.status === "accepted")
      .reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

    return {
      total,
      pending,
      accepted,
      inDiscussion,
      totalPipelineValue,
      acceptedValue,
    };
  }, [requests]);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (selectedStatus !== "all" && r.status !== selectedStatus) return false;
      if (selectedService !== "all" && r.service !== selectedService) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = r.clientName.toLowerCase().includes(q);
        const matchCompany = r.company.toLowerCase().includes(q);
        const matchEmail = r.email.toLowerCase().includes(q);
        const matchService = r.service.toLowerCase().includes(q);
        const matchDesc = r.description.toLowerCase().includes(q);
        if (!matchName && !matchCompany && !matchEmail && !matchService && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [requests, selectedStatus, selectedService, searchQuery]);

  return (
    <div className="min-h-screen bg-[#030712] text-white w-full relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[300px] bg-indigo-600/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 left-10 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-white text-xs flex items-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.5)] backdrop-blur-xl animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ================= TOP ADMIN BAR ================= */}
      <header className="sticky top-0 z-40 bg-[#090d18]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Portal title */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group"
              title="Return to Public Portfolio"
            >
              <div className="relative flex h-9 w-9 items-center justify-center">
                <div className="absolute inset-0 bg-sky-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                <img
                  src="/SPS.png"
                  alt="Silver Pixel Soft Logo"
                  className="relative h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white tracking-tight">
                  Silver Pixel Soft
                </span>
                <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-mono font-bold flex items-center gap-1">
                  <span>Cockpit</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </span>
              </div>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5" />
            <input
              type="text"
              placeholder="Quick search client name, company, or request..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121624] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Actions & Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewLeadModal(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Inbound Request</span>
            </button>

            {/* Profile pill */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border border-indigo-400/40"
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">
                  {profile.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Super Admin
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
                title="Log Out of Admin Portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= SECONDARY SUB-NAVIGATION TABS ================= */}
      <div className="border-b border-white/[0.08] bg-[#0d101b]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2.5">
          {[
            {
              id: "requests",
              label: "Project Requests & Proposals",
              icon: Inbox,
              badge: stats.pending > 0 ? stats.pending : undefined,
            },
            { id: "analytics", label: "Pipeline & Analytics", icon: BarChart3 },
            { id: "reviews", label: "Reviews Moderation", icon: Star, badge: reviews.length },
            { id: "settings", label: "Admin Settings", icon: SettingsIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* ================= TAB 1: PROJECT REQUESTS & PROPOSALS ================= */}
        {activeTab === "requests" && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Total Inquiries */}
              <div className="p-5 rounded-2xl bg-[#121624] border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">Total Inbound Inquiries</span>
                  <Inbox className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">{stats.total}</div>
                <span className="text-[11px] font-mono text-indigo-300 mt-1 block">
                  All recorded inquiries
                </span>
              </div>

              {/* Pending Action */}
              <div className="p-5 rounded-2xl bg-[#121624] border border-amber-400/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between text-amber-300 mb-2">
                  <span className="text-xs font-semibold">Awaiting Review</span>
                  <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
                </div>
                <div className="text-3xl font-extrabold text-amber-400">{stats.pending}</div>
                <span className="text-[11px] font-mono text-amber-200 mt-1 block">
                  Action required: Accept / Decline
                </span>
              </div>

              {/* Accepted Projects */}
              <div className="p-5 rounded-2xl bg-[#121624] border border-emerald-400/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between text-emerald-300 mb-2">
                  <span className="text-xs font-semibold">Accepted Projects</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400">{stats.accepted}</div>
                <span className="text-[11px] font-mono text-emerald-200 mt-1 block">
                  ${(stats.acceptedValue / 1000).toFixed(0)}k Accepted Contracts
                </span>
              </div>

              {/* Total Pipeline Value */}
              <div className="p-5 rounded-2xl bg-[#121624] border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">Total Pipeline Value</span>
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  ${(stats.totalPipelineValue / 1000).toFixed(0)}k
                </div>
                <span className="text-[11px] font-mono text-cyan-300 mt-1 block">
                  Estimated deal volume
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-[#121624] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {[
                  { id: "all", label: "All Statuses" },
                  { id: "pending", label: "Pending Review", badge: stats.pending },
                  { id: "accepted", label: "Accepted", badge: stats.accepted },
                  { id: "in-discussion", label: "In Discussion" },
                  { id: "rejected", label: "Declined" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStatus(st.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedStatus === st.id
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-[#090d18] text-slate-400 hover:text-white border border-white/[0.06]"
                    }`}
                  >
                    <span>{st.label}</span>
                    {st.badge !== undefined && st.badge > 0 && (
                      <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full">
                        {st.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Service filter */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs text-slate-400 whitespace-nowrap">Service:</span>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Services</option>
                  <option value="AI & Agents">AI & Agents</option>
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Enterprise Systems">Enterprise Systems</option>
                  <option value="Mobile Apps">Mobile Apps</option>
                </select>
              </div>
            </div>

            {/* List of Requests */}
            {filteredRequests.length === 0 ? (
              <div className="p-16 rounded-3xl bg-[#121624]/40 border border-white/10 text-center space-y-3">
                <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No requests match this filter</h3>
                <p className="text-xs text-slate-400">
                  Try clearing your search query or selecting a different status filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedStatus("all");
                    setSelectedService("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredRequests.map((req) => {
                  const isPending = req.status === "pending";
                  const isAccepted = req.status === "accepted";
                  const isInDiscussion = req.status === "in-discussion";

                  return (
                    <div
                      key={req.id}
                      className={`p-6 rounded-2xl bg-[#0e121d] border transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                        isPending
                          ? "border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.06)]"
                          : isAccepted
                          ? "border-emerald-400/30"
                          : "border-white/[0.08]"
                      }`}
                    >
                      {/* Left Side: Client Info & Specs */}
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          {/* Status Badge */}
                          <span
                            className={`text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                              isPending
                                ? "bg-amber-400/15 text-amber-300 border border-amber-400/30 animate-pulse"
                                : isAccepted
                                ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30"
                                : isInDiscussion
                                ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/30"
                                : "bg-rose-400/15 text-rose-300 border border-rose-400/30"
                            }`}
                          >
                            {isPending && <Clock className="w-3 h-3" />}
                            {isAccepted && <Check className="w-3 h-3" />}
                            {req.status}
                          </span>

                          {/* Service Pill */}
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-400/25 text-indigo-300 font-semibold">
                            {req.service}
                          </span>

                          {/* Budget Pill */}
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 font-semibold flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-cyan-400" />
                            {req.budget}
                          </span>

                          {/* Timeline */}
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {req.timeline}
                          </span>

                          <span className="text-[10px] font-mono text-slate-500 ml-auto">
                            Received {req.date}
                          </span>
                        </div>

                        {/* Client details */}
                        <div className="flex items-center gap-3">
                          <img
                            src={req.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                            alt={req.clientName}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">
                                {req.clientName}
                              </h4>
                              <span className="text-xs text-indigo-300 font-medium">
                                @ {req.company}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                              <a
                                href={`mailto:${req.email}`}
                                className="hover:text-cyan-400 flex items-center gap-1"
                              >
                                <Mail className="w-3 h-3" />
                                {req.email}
                              </a>
                              {req.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {req.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description Preview */}
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          "{req.description}"
                        </p>

                        {/* Notes if present */}
                        {req.notes && (
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[11px] text-amber-200/90 font-mono">
                            <strong className="text-amber-400">Admin Note:</strong> {req.notes}
                          </div>
                        )}
                      </div>

                      {/* Right Side: Action Buttons */}
                      <div className="flex flex-wrap lg:flex-col items-stretch justify-center gap-2 lg:w-48 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/[0.08] lg:pl-6">
                        {/* ACCEPT BUTTON */}
                        {req.status !== "accepted" ? (
                          <button
                            onClick={() => handleUpdateStatus(req.id, "accepted")}
                            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept Project</span>
                          </button>
                        ) : (
                          <div className="py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Accepted ✓</span>
                          </div>
                        )}

                        {/* Discuss / In Review */}
                        {req.status === "pending" && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, "in-discussion")}
                            className="flex-1 py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/30 text-slate-300 hover:text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Schedule Call</span>
                          </button>
                        )}

                        {/* View Proposal Detail */}
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                            setModalNotes(req.notes || "");
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Full Details</span>
                        </button>

                        {/* Reject / Decline */}
                        {req.status !== "rejected" && req.status !== "accepted" && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, "rejected")}
                            className="py-1 px-2 text-[11px] text-slate-500 hover:text-rose-400 hover:underline transition-colors text-center"
                          >
                            Decline proposal
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: PIPELINE & ANALYTICS ================= */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Pipeline Analytics & Forecasting</h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time operational metrics across all inquiries and contracts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#121624] border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase text-slate-400">Proposal Acceptance Rate</span>
                <div className="text-4xl font-extrabold text-emerald-400">
                  {stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0}%
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{
                      width: `${stats.total > 0 ? (stats.accepted / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  {stats.accepted} accepted out of {stats.total} total inbound requests.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#121624] border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase text-slate-400">Average Deal Size</span>
                <div className="text-4xl font-extrabold text-cyan-400">
                  ${stats.total > 0 ? Math.round(stats.totalPipelineValue / stats.total).toLocaleString() : 0}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Based on estimated client budget scopes across full-stack engineering, AI, and design systems.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#121624] border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase text-slate-400">Active Engineering Pipeline</span>
                <div className="text-4xl font-extrabold text-indigo-400">
                  ${stats.acceptedValue.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Total committed contract value for currently accepted sprints and client retainers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: REVIEWS MODERATION ================= */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Client Reviews Moderation</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage incoming client reviews and testimonials displayed on the Wall of Love and Home page.
                </p>
              </div>
              <button
                onClick={() => navigate("/user/review")}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Public Wall of Love</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-2xl bg-[#0e121d] border border-white/10 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        {rev.verified ? "Verified Client" : "Standard"}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{rev.title}</h4>
                    <p className="text-xs text-slate-300 italic">"{rev.quote}"</p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{rev.author}</div>
                        <div className="text-[10px] text-slate-400">
                          {rev.role} • {rev.company}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500">
                      {rev.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SETTINGS ================= */}
        {activeTab === "settings" && <Settings />}
      </main>

      {/* ================= PROPOSAL DETAIL MODAL ================= */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-2xl w-full bg-[#121624] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">
                  INBOUND PROPOSAL DETAILS
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {selectedRequest.clientName} @ {selectedRequest.company}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#090d18] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-400 block">Service</span>
                <span className="text-xs font-bold text-white">{selectedRequest.service}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#090d18] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-400 block">Budget</span>
                <span className="text-xs font-bold text-cyan-400">{selectedRequest.budget}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#090d18] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-400 block">Timeline</span>
                <span className="text-xs font-bold text-white">{selectedRequest.timeline}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#090d18] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-400 block">Current Status</span>
                <span className="text-xs font-bold uppercase text-amber-400">
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            {/* Client Contact Info */}
            <div className="p-4 rounded-xl bg-[#090d18] border border-white/[0.06] space-y-2">
              <h4 className="text-xs font-bold uppercase font-mono text-slate-400">
                Direct Client Contact
              </h4>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <a
                  href={`mailto:${selectedRequest.email}`}
                  className="text-cyan-400 hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {selectedRequest.email}
                </a>
                {selectedRequest.phone && (
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {selectedRequest.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase font-mono text-slate-400">
                Project Scope & Specifications
              </h4>
              <div className="p-4 rounded-xl bg-[#090d18] border border-white/[0.06] text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedRequest.description}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase font-mono text-slate-400">
                  Internal Engineering & Sprint Notes
                </h4>
                <button
                  type="button"
                  onClick={() => handleSaveNotes(selectedRequest.id)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Save Notes
                </button>
              </div>
              <textarea
                rows={3}
                value={modalNotes}
                onChange={(e) => setModalNotes(e.target.value)}
                placeholder="Add sprint notes, NDA status, or tech stack requirements..."
                className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedRequest.status !== "accepted" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedRequest.id, "accepted")}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Project</span>
                  </button>
                )}

                {selectedRequest.status !== "in-discussion" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedRequest.id, "in-discussion")}
                    className="px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Set In Discussion
                  </button>
                )}

                {selectedRequest.status !== "rejected" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedRequest.id, "rejected")}
                    className="px-4 py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Decline
                  </button>
                )}
              </div>

              <a
                href={`mailto:${selectedRequest.email}?subject=Silver Pixel Soft Proposal: ${selectedRequest.company}`}
                className="px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email to Client</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= NEW INBOUND LEAD MODAL ================= */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full bg-[#121624] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Record Inbound Request</h3>
                <p className="text-xs text-slate-400">Manually log a new client lead into the system.</p>
              </div>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Liam Sterling"
                    className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Lumina Tech"
                    className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Service Category
                  </label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="AI & Agents">AI & Agents</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Enterprise Systems">Enterprise Systems</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Budget Range
                  </label>
                  <select
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="$5,000 - $10,000">$5k - $10k</option>
                    <option value="$10,000 - $25,000">$10k - $25k</option>
                    <option value="$25,000 - $35,000">$25k - $35k</option>
                    <option value="$35,000 - $50,000">$35k - $50k</option>
                    <option value="$50,000+">$50k+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Timeline Target
                  </label>
                  <input
                    type="text"
                    value={newTimeline}
                    onChange={(e) => setNewTimeline(e.target.value)}
                    placeholder="e.g. 4 - 6 Weeks"
                    className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Est. Value (USD)
                  </label>
                  <input
                    type="number"
                    value={newEstimatedValue}
                    onChange={(e) => setNewEstimatedValue(e.target.value)}
                    placeholder="30000"
                    className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Project Scope & Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the client's engineering requirements..."
                  className="w-full px-3 py-2 rounded-xl bg-[#090d18] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold shadow-md"
                >
                  Save Inbound Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
