import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { setAdminAuthenticated } from "../adminData";

interface LoginProps {
  onLoginSuccess: () => void;
  onForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onForgotPassword }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDemoFill = () => {
    setEmail("admin@silverpixelsoft.com");
    setPassword("admin123");
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    // Simulate authenticating against credentials
    setTimeout(() => {
      // Demo credentials check (also accepts any valid format if testing)
      if (
        (email.toLowerCase() === "admin@silverpixelsoft.com" &&
          password === "admin123") ||
        email.includes("@")
      ) {
        setSuccess(true);
        setAdminAuthenticated(true);
        setTimeout(() => {
          onLoginSuccess();
        }, 500);
      } else {
        setIsLoading(false);
        setError("Invalid credentials. Please verify your email and password.");
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-x-clip py-12">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/[0.12] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar / Back button */}
      <div className="w-full max-w-md flex items-center justify-between mb-8 z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>

        <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-400/20">
          Admin Portal v3.2
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md rounded-3xl bg-[#090d18]/90 border border-white/10 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="relative inline-flex h-14 w-14 items-center justify-center mb-4">
            <div className="absolute inset-0 bg-sky-500/30 rounded-2xl blur-lg animate-pulse" />
            <img
              src="/SPS.png"
              alt="Silver Pixel Soft Logo"
              className="relative h-12 w-12 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Admin Cockpit
          </h1>
          <p className="text-xs text-slate-400 mt-1.5">
            Sign in to manage client proposals, accept projects, and monitor operations.
          </p>
        </div>

        {/* Demo Credentials Quick-Fill Pill */}
        <div className="mb-6 p-3 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-indigo-300">
            <KeyRound className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-[11px] leading-tight">
              Demo: <strong className="text-white">admin@silverpixelsoft.com</strong> / <strong className="text-white">admin123</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-[10px] font-mono uppercase font-bold text-cyan-300 hover:text-white px-2 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors whitespace-nowrap cursor-pointer"
          >
            Auto-Fill
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success notification */}
        {success && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Authenticated successfully. Redirecting to dashboard...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Work Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type="email"
                placeholder="admin@silverpixelsoft.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
              />
              <span>Remember this workstation</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:shadow-[0_0_36px_rgba(99,102,241,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security badge footer */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
          <p className="text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>End-to-End Encrypted Session • TLS 1.3</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
