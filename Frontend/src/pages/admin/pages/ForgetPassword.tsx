import React, { useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

interface ForgetPasswordProps {
  onBackToLogin: () => void;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ onBackToLogin }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("admin@silverpixelsoft.com");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid admin email address.");
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setOtp("742918"); // Auto prefill demo OTP for convenience
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otp.trim() || otp.trim().length < 4) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-x-clip py-12">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-600/[0.1] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-8 z-10">
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Login</span>
        </button>

        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-400/20">
          Account Recovery
        </span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md rounded-3xl bg-[#090d18]/90 border border-white/10 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative z-10">
        {/* Step 1: Request Code */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Reset Password
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Enter your verified administrator email address to receive a secure 6-digit recovery PIN.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSendCode} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Admin Work Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@silverpixelsoft.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:shadow-[0_0_36px_rgba(99,102,241,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending code...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Enter OTP & Set New Password */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Enter Recovery Code
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                We sent a 6-digit code to <strong className="text-white">{email}</strong>.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* OTP Input */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    6-Digit Verification PIN
                  </label>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                    Demo Code: 742918
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="742918"
                  className="w-full text-center tracking-widest font-mono text-lg py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  New Secure Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:shadow-[0_0_36px_rgba(99,102,241,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Updating credentials...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm & Update Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-6 py-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                CREDENTIALS UPDATED
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-2">
                Password Reset Successfully
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Your administrator account security credentials have been updated. You can now log in with your new password.
              </p>
            </div>

            <button
              onClick={onBackToLogin}
              className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
