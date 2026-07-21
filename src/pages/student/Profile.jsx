import { useEffect, useState } from "react";
import studentService from "../../services/studentService";

function Field({ label, value }) {
  return (
    <div>
      <p className="label-text mb-1 text-slate-500 text-xs uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm text-slate-200 font-medium">
        {value || "—"}
      </p>
    </div>
  );
}

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await studentService.getMyProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-slate-400">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Personal Information
        </h2>
        <p className="text-slate-400">
          Detailed overview of your account
        </p>
      </div>

      <div className="panel p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-xl bg-slate-800">
        <div className="sm:col-span-2 flex items-center gap-4 border-b border-slate-700 pb-4">
          <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {profile.name.charAt(0)}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {profile.name}
            </h3>
            <p className="text-slate-400">
              {profile.studentCode}
            </p>
          </div>
        </div>

        <Field label="Student Code" value={profile.studentCode} />
        <Field label="Email" value={profile.email} />
        <Field label="Class" value={profile.className} />
        <Field label="Phone" value={profile.phone} />
        <Field label="Date of Birth" value={profile.dateOfBirth} />
        <Field label="Guardian Name" value={profile.guardianName} />
        <Field label="Guardian Phone" value={profile.guardianPhone} />
      </div>
    </div>
  );
}