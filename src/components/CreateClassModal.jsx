import React, { useState } from "react";
import { X } from "lucide-react";

export default function CreateClassModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    teacherId: "",
    code: "",
    title: "",
    room: "",
    schedule: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Formats payload to match the expected API JSON schema
    const requestPayload = {
      teacherId: formData.teacherId ? Number(formData.teacherId) : null,
      classCode: formData.code,
      classTitle: formData.title,
      schedule: formData.schedule,
      classRoom: formData.room,
      description: formData.description,
    };

    onSubmit(requestPayload);
  };

  if (!isOpen) return null;

  const inputClasses =
    "w-full px-3.5 py-2 border border-slate-200 bg-slate-50/50 rounded-lg text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/10 transition-all";
  const labelClasses =
    "block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5";

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in-50 duration-250">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Create New Class</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in the details below to set up your class space.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Teacher ID field */}
          <div>
            <label className={labelClasses}>
              Teacher ID <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              placeholder="1"
              required
              className={inputClasses}
            />
          </div>

          {/* Two column grid for meta items */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className={labelClasses}>
                Class Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="WEB101"
                required
                className={inputClasses}
              />
            </div>

            <div className="col-span-2">
              <label className={labelClasses}>
                Class Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Web Development"
                required
                className={inputClasses}
              />
            </div>
          </div>

          {/* Two column grid for logistics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Schedule</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="Tuesday 13:00 - 15:00"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Room / Location</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="Lab B201"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="HTML, CSS, JavaScript and React"
              rows="3"
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0052cc] hover:bg-[#0043a8] text-white rounded-lg text-sm font-semibold shadow-sm shadow-[#0052cc]/20 transition-colors"
            >
              Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}