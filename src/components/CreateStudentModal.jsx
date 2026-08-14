import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function CreateStudentModal({
  isOpen,
  onClose,
  onSubmit,
  classes = [],
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentCode: "",
    classId: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const studentRequest = {
      name: formData.name,
      studentCode: formData.studentCode,
      email: formData.email,
      gender:formData.gender,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      classId: formData.classId,
    };

    onSubmit(studentRequest);

    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "",
      confirmPassword: "",
      studentCode: "",
      classId: "",
      phoneNumber: "",
      dateOfBirth: "",
    });
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  if (!isOpen) return null;

  const inputClasses = `
    w-full 
    px-3 
    py-2 
    border 
    border-slate-200 
    bg-slate-50/30 
    rounded-lg 
    text-sm 
    transition-all
    placeholder:text-slate-400
    focus:bg-white 
    focus:outline-none 
    focus:border-blue-600
    focus:ring-2
    focus:ring-blue-100
  `;

  const labelClasses = `
    block 
    text-xs 
    font-semibold 
    text-slate-500 
    uppercase 
    tracking-wider
    mb-1.5
  `;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Register Student
            </h2>
            <p className="text-xs text-slate-400">
              Add a new student profile and assign their details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form
          id="create-student-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-1 p-6 space-y-6"
        >
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1 border-b border-slate-100">
              Academic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Student Code *</label>
                <input
                  type="text"
                  name="studentCode"
                  placeholder="e.g. STU10294"
                  value={formData.studentCode}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className={labelClasses}>Assign Class *</label>
                <select
                  name="classId"
                  value={formData.classId}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1 border-b border-slate-100">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelClasses}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClasses}>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className={labelClasses}>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Date Of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1 border-b border-slate-100">
              Account Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClasses} pr-10`}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClasses}>Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`${inputClasses} pr-10`}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 font-medium rounded-lg text-sm bg-white hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-student-form"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg text-sm transition-colors shadow-sm"
          >
            Create Student
          </button>
        </div>
      </div>
    </div>
  );
}
