import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      // Redirect to appropriate dashboard based on role
      const dashboard =
        user.role.toLowerCase() === "teacher" ? "/teacher" : "/student";
      navigate(dashboard);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-tr from-[#f3f6ff] via-[#f8faff] to-[#edf2ff] p-4 font-sans text-[#334155]">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="w-14 h-14 bg-[#0052cc] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
          <GraduationCap className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">
          EduAttend
        </h1>
        <p className="text-sm text-[#64748b] font-medium mt-0.5">
          Student Attendance Portal
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-110 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-[#475569] tracking-wide uppercase"
            >
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-5 h-5 text-[#94a3b8]" />
              <input
                id="email"
                type="email"
                placeholder="student@eduattend.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder-[#94a3b8] focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-[#475569] tracking-wide uppercase"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-5 h-5 text-[#94a3b8]" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder-[#94a3b8] focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/10 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-[#94a3b8] hover:text-[#475569] transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Options (Remember Me / Register Link) */}
          <div className="flex items-center justify-between pt-1 text-sm">
            <label className="flex items-center space-x-2 cursor-pointer select-none text-[#64748b]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#0052cc] focus:ring-[#0052cc]/20 accent-[#0052cc]"
              />
              <span>Remember Me</span>
            </label>
            <Link
              to="/register"
              className="font-semibold text-[#0052cc] hover:underline transition-all"
            >
              Register Form
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#0052cc] hover:bg-[#0043a8] disabled:bg-[#94a3b8] text-white font-bold rounded-xl transition-colors duration-200 shadow-md shadow-blue-600/10 active:scale-[0.99] transform disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <div className="mt-6 text-sm text-[#64748b]">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#0052cc] hover:underline"
        >
          Register Here
        </Link>
      </div>
    </div>
  );
}