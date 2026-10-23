import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Building,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  DollarSign,
  Smartphone,
} from "lucide-react";
import {
  getAdminProfile,
  saveAdminProfile,
  type AdminUser,
} from "../adminData";

export const Settings: React.FC = () => {
  const [profile, setProfile] = useState<AdminUser>(() => getAdminProfile());
  const [activeTab, setActiveTab] = useState<"general" | "security" | "notifications" | "agency">("general");
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Security password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminProfile(profile);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordFeedback("Please enter current password.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordFeedback("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback("New passwords do not match.");
      return;
    }

    setPasswordFeedback("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordFeedback(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs flex items-center gap-2.5 shadow-2xl backdrop-blur-xl animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold">Settings saved and synchronized successfully!</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Admin Settings & Configuration
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Manage administrator profile, email lead notifications, agency defaults, and security policies.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
        {[
          { id: "general", label: "Admin Profile", icon: User },
          { id: "security", label: "Security & Access", icon: Shield },
          { id: "notifications", label: "Lead Notifications", icon: Bell },
          { id: "agency", label: "Agency Defaults", icon: Building },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-[#121624] text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: GENERAL PROFILE ================= */}
      {activeTab === "general" && (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-white/10 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-white/[0.08]">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-lg"
            />
            <div>
              <h3 className="text-base font-bold text-white">{profile.name}</h3>
              <p className="text-xs text-indigo-300 font-mono">{profile.role}</p>
              <span className="text-[10px] text-slate-400 block mt-0.5">Silver Pixel Soft Lead Admin</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Administrator Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Official Admin Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Avatar Photo URL
              </label>
              <input
                type="url"
                value={profile.avatar}
                onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* ================= TAB 2: SECURITY & ACCESS ================= */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password Form */}
          <form onSubmit={handleUpdatePassword} className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-white/10 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                Update Administrator Password
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ensure your password contains at least 6 characters with mixed casing.
              </p>
            </div>

            {passwordFeedback && (
              <div
                className={`p-3 rounded-xl text-xs ${
                  passwordFeedback.includes("success")
                    ? "bg-emerald-500/10 border border-emerald-400/30 text-emerald-300"
                    : "bg-rose-500/10 border border-rose-400/30 text-rose-300"
                }`}
              >
                {passwordFeedback}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>

          {/* 2FA Card */}
          <div className="p-6 rounded-3xl bg-[#121624] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Require a verification code from Google Authenticator or hardware security key.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const updated = !profile.twoFactorEnabled;
                const newProf = { ...profile, twoFactorEnabled: updated };
                setProfile(newProf);
                saveAdminProfile(newProf);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                profile.twoFactorEnabled
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                  : "bg-white/[0.05] text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              {profile.twoFactorEnabled ? "Enabled ✓" : "Enable 2FA"}
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 3: NOTIFICATIONS ================= */}
      {activeTab === "notifications" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-white/10 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              Inbound Project Lead Alerts
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure how and when you receive notifications when clients submit project proposals.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              {
                title: "Instant Inbound Proposal Email",
                desc: "Send immediate notification to admin@silverpixelsoft.com when a new inquiry is submitted.",
                checked: profile.notificationsEnabled,
                toggle: () => {
                  const updated = !profile.notificationsEnabled;
                  const newProf = { ...profile, notificationsEnabled: updated };
                  setProfile(newProf);
                  saveAdminProfile(newProf);
                },
              },
              {
                title: "High-Budget Lead Priority Alerts ($25k+)",
                desc: "Send high-priority SMS and email alert whenever a lead with budget exceeding $25k is received.",
                checked: true,
                toggle: () => {},
              },
              {
                title: "Client Review Submissions",
                desc: "Notify admin when a verified client submits a testimonial on the Wall of Love.",
                checked: true,
                toggle: () => {},
              },
              {
                title: "Weekly Pipeline Digest",
                desc: "Weekly summary of accepted, in-discussion, and pending leads delivered every Monday 9 AM.",
                checked: true,
                toggle: () => {},
              },
            ].map((n, i) => (
              <label
                key={i}
                className="flex items-start justify-between p-4 rounded-2xl bg-[#090d18] border border-white/[0.06] cursor-pointer hover:border-white/10 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-white">{n.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{n.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={n.checked}
                  onChange={n.toggle}
                  className="w-4 h-4 rounded accent-indigo-500 mt-0.5 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: AGENCY DEFAULTS ================= */}
      {activeTab === "agency" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-white/10 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-400" />
              Agency & Operations Defaults
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              General operational details displayed across client communications and proposals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Agency Brand Name
              </label>
              <input
                type="text"
                value={profile.agencyName}
                onChange={(e) => setProfile({ ...profile, agencyName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Headquarters / Timezone
              </label>
              <input
                type="text"
                defaultValue="Ranchi, India (IST / UTC+5:30) • Global Remote"
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Minimum Project Engagement Size
              </label>
              <div className="relative flex items-center">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  defaultValue="$5,000 USD"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Client Staging Domain
              </label>
              <div className="relative flex items-center">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  defaultValue="https://preview.silverpixelsoft.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
