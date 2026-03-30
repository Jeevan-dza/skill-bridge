"use client";

import {
  User, Mail, Target, FileText, Camera, ShieldCheck, CreditCard, ChevronRight, Sparkles
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export default function ProfilePage() {
  const handleAvatarUploadClick = () => {
    // Placeholder for avatar upload flow.
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Your Profile</h2>
          <p className="text-sm text-slate-500 font-medium">Manage your personal information and preferences.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all active:scale-95">
          Save Changes
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">

          {/* Avatar & Basic Info Card */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative group cursor-pointer shrink-0">
              <Avatar name="Alex Learner" size="lg" />
              <button type="button" onClick={handleAvatarUploadClick} aria-label="Upload avatar" className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all text-slate-400">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="fullName"
                    type="text"
                    defaultValue="Alex"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    defaultValue="alex@example.com"
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-500 text-sm font-medium rounded-lg opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Career Preferences */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 space-y-5">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-500" />
              Career Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="targetRole" className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Target Role</label>
                <select id="targetRole" className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none">
                  <option>Data Analyst</option>
                  <option>Data Scientist</option>
                  <option>Frontend Engineer</option>
                  <option>Product Manager</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="experienceLevel" className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Experience Level</label>
                <select id="experienceLevel" className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none">
                  <option>Entry Level</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Resume</label>
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Alex_Resume_v2.pdf</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider">Uploaded Oct 20, 2024</p>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">Replace</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-900 mb-5">Account Plan</h3>

            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200/30 mb-5">
              <div className="flex justify-between items-start mb-5">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/15 px-2 py-0.5 rounded flex items-center gap-1 border border-white/20 backdrop-blur-md">
                  <Sparkles className="w-3 h-3" /> Basic Plan
                </span>
                <span className="text-lg font-bold">Free</span>
              </div>
              <ul className="space-y-2 mb-5">
                <li className="text-[11px] font-medium flex items-center gap-2 opacity-90"><ShieldCheck className="w-3.5 h-3.5" /> 1 Parsing per month</li>
                <li className="text-[11px] font-medium flex items-center gap-2 opacity-90"><ShieldCheck className="w-3.5 h-3.5" /> Basic Skill Gap</li>
              </ul>
              <button className="w-full py-2 bg-white text-indigo-600 text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-indigo-50 transition-colors">
                Upgrade to Pro
              </button>
            </div>

            <div className="space-y-1">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-500 group-hover:text-slate-900">
                  <CreditCard className="w-4 h-4" />
                  Billing Details
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-500 group-hover:text-slate-900">
                  <ShieldCheck className="w-4 h-4" />
                  Security
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </section>

          <section className="bg-red-50/50 rounded-xl p-5 border border-red-100">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-red-600 mb-2">Danger Zone</h3>
            <p className="text-[11px] text-red-500/80 mb-4 leading-relaxed">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-[11px] font-semibold uppercase tracking-wider rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
              Delete Account
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}
