"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Pencil, ListChecks, Sparkles, Clock, ArrowRight, RefreshCw, AlertCircle
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { analyzeSkillGap, type SkillGapResult } from "@/lib/api";
import { CardSkeleton, TableRowSkeleton } from "@/components/ui/Skeleton";
import { toast } from "@/components/ui/Toast";
import React from "react";

interface SkillDetail {
  name: string;
  current: number;
  required: number;
  status: string;
  color: string;
}

interface PageData {
  targetRole: string;
  gaps: string[];
  strengths: string[];
  totalRequired: number;
  skillDetails: SkillDetail[];
}

export default function SkillGapPage() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (user: User) => {
    setLoading(true);
    setError("");

    try {
      const onboardDoc = await getDoc(doc(db, "onboardingData", user.uid));
      const onboardData = onboardDoc.exists() ? onboardDoc.data() : {};

      const skillDoc = await getDoc(doc(db, "skillProfiles", user.uid));
      const skillData = skillDoc.exists() ? skillDoc.data() : {};

      const targetRole = skillData.targetRole || onboardData.careerGoal || "Data Analyst";
      const userSkills: string[] = skillData.parsedSkills || ["Python", "SQL", "Excel", "Communication", "Problem Solving", "Data Analysis", "Project Management"];

      let gaps: string[];
      let strengths: string[];

      try {
        const result: SkillGapResult = await analyzeSkillGap(user.uid, targetRole, userSkills);
        gaps = result.gaps;
        strengths = result.strengths;
      } catch {
        gaps = skillData.gaps || ["Tableau", "Predictive Modeling", "A/B Testing", "NumPy", "Data Cleaning"];
        strengths = skillData.strengths || ["Python", "SQL", "Excel", "Statistics"];
      }

      const totalRequired = gaps.length + strengths.length;

      const skillDetails: SkillDetail[] = [
        ...strengths.slice(0, 4).map((s, i) => ({
          name: s,
          current: [100, 90, 85, 75][i % 4],
          required: [100, 90, 80, 70][i % 4],
          status: i === 0 ? "Completed" : "In Progress",
          color: i === 0 ? "emerald" : "indigo",
        })),
        ...gaps.slice(0, 3).map((s) => ({
          name: s,
          current: (s.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 30) + 5,
          required: 80,
          status: "Not Started",
          color: "red",
        })),
      ];

      setData({ targetRole, gaps, strengths, totalRequired, skillDetails });
    } catch (err) {
      console.error("Skill gap fetch error:", err);
      setError("Failed to load skill gap data.");
      setData({
        targetRole: "Data Analyst",
        gaps: ["Tableau", "Predictive Modeling", "A/B Testing", "NumPy", "Data Cleaning", "Power BI", "Data Visualization"],
        strengths: ["Python", "SQL", "Excel", "Communication", "Problem Solving", "Data Analysis", "Statistics", "Project Management"],
        totalRequired: 15,
        skillDetails: [
          { name: "Python", current: 75, required: 90, status: "In Progress", color: "indigo" },
          { name: "SQL", current: 100, required: 100, status: "Completed", color: "emerald" },
          { name: "Tableau", current: 10, required: 80, status: "Not Started", color: "red" },
          { name: "Statistics", current: 50, required: 70, status: "In Progress", color: "indigo" },
        ],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user);
      } else {
        setLoading(false);
        setData({
          targetRole: "Data Analyst",
          gaps: ["Tableau", "Predictive Modeling", "A/B Testing", "NumPy", "Data Cleaning", "Power BI", "Data Visualization"],
          strengths: ["Python", "SQL", "Excel", "Communication", "Problem Solving", "Data Analysis", "Statistics", "Project Management"],
          totalRequired: 15,
          skillDetails: [
            { name: "Python", current: 75, required: 90, status: "In Progress", color: "indigo" },
            { name: "SQL", current: 100, required: 100, status: "Completed", color: "emerald" },
            { name: "Tableau", current: 10, required: 80, status: "Not Started", color: "red" },
            { name: "Statistics", current: 50, required: 70, status: "In Progress", color: "indigo" },
          ],
        });
      }
    });
    return () => unsubscribe();
  }, [fetchData]);

  const handleRetry = useCallback(() => {
    const user = auth.currentUser;
    if (user) fetchData(user);
    else toast("Please sign in first", "error");
  }, [fetchData]);

  const matchPct = data && data.totalRequired > 0 ? Math.round((data.strengths.length / data.totalRequired) * 100) : 0;

  return (
    <>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1.5">Skill Gap Analysis</h2>
            <div className="flex items-center gap-2.5">
              <span className="text-sm text-slate-500 font-medium">{loading ? "Loading..." : `${data?.targetRole} Role`}</span>
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full">Target Role</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleRetry} className="p-2.5 bg-slate-50 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors" aria-label="Refresh data">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2">
              <Pencil className="w-3.5 h-3.5" />
              Change Role
            </button>
          </div>
        </header>

        {/* Error Banner */}
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={handleRetry} className="text-xs font-medium text-red-600 hover:underline">Retry</button>
          </div>
        )}

        {/* Gap Summary Banner */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <div className="bg-indigo-600 p-5 rounded-xl text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                  <ListChecks className="w-12 h-12" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wider opacity-70 mb-0.5">Total Skills Required</p>
                <h3 className="text-4xl font-bold">{data?.totalRequired}</h3>
                <div className="mt-3 h-0.5 w-10 bg-white/30 rounded-full" />
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-cyan-500">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">Skills You Have</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold text-slate-900">{data?.strengths.length}</h3>
                </div>
                <div
                  className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label="Skill progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={matchPct}
                >
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${matchPct}%` }} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-violet-500">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">Skills to Learn</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold text-slate-900">{data?.gaps.length}</h3>
                  <span className="text-violet-600 font-medium text-xs">Critical Gap</span>
                </div>
                <div className="mt-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-1.5 w-full rounded-full ${i < Math.min(data?.gaps.length || 0, 5) ? "bg-violet-500" : "bg-slate-100"}`} />
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        {/* Split Layout */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Skill Table */}
          <div className="col-span-1 xl:col-span-7 bg-white rounded-xl p-6 border border-slate-200 overflow-x-auto">
            <h4 className="text-base font-semibold text-slate-900 mb-6">Detailed Competency Breakdown</h4>
            <div className="min-w-[500px]">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="pb-3">Skill Name</th>
                    <th className="pb-3">Current vs Required</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <>
                      <TableRowSkeleton />
                      <TableRowSkeleton />
                      <TableRowSkeleton />
                      <TableRowSkeleton />
                    </>
                  ) : (
                    data?.skillDetails.map((skill) => (
                      <tr key={skill.name} className="group">
                        <td className="py-5 font-medium text-sm text-slate-900">{skill.name}</td>
                        <td className="py-5 w-1/2">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full relative">
                              <div className={`absolute inset-y-0 left-0 rounded-full ${skill.color === "emerald" ? "bg-emerald-100" : skill.color === "red" ? "bg-red-100" : "bg-indigo-100"}`} style={{ width: `${skill.required}%` }} />
                              <div className={`absolute inset-y-0 left-0 rounded-full ${skill.color === "emerald" ? "bg-emerald-500" : skill.color === "red" ? "bg-red-500" : "bg-indigo-500"}`} style={{ width: `${skill.current}%` }} />
                            </div>
                            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{skill.current}/{skill.required}</span>
                          </div>
                        </td>
                        <td className="py-5 text-right">
                          <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full whitespace-nowrap
                            ${skill.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                              skill.color === "red" ? "bg-red-50 text-red-600" :
                              "bg-indigo-50 text-indigo-600"}`}>
                            {skill.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="col-span-1 xl:col-span-5 bg-white rounded-xl p-6 border border-slate-200 flex flex-col items-center">
            <div className="flex justify-between w-full mb-6">
              <h4 className="text-base font-semibold text-slate-900">Competency Map</h4>
              <div className="flex flex-col gap-1 items-end">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm" />
                  <span className="text-[10px] font-medium text-slate-400">Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 border-2 border-violet-400 rounded-sm" />
                  <span className="text-[10px] font-medium text-slate-400">Required</span>
                </div>
              </div>
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 radar-grid bg-slate-100 opacity-20" />
              <div className="absolute inset-4 radar-grid bg-slate-100 opacity-20" />
              <div className="absolute inset-8 radar-grid bg-slate-100 opacity-20" />
              <div className="absolute w-[80%] h-[80%] radar-grid border-2 border-violet-300 opacity-40" />
              <div className="absolute w-[50%] h-[50%] radar-grid bg-indigo-500/20 border-2 border-indigo-500 flex items-center justify-center">
                <span className="text-[10px] text-indigo-600 font-semibold">MATCH: {matchPct}%</span>
              </div>

              {(data?.skillDetails || []).slice(0, 6).map((skill, i) => {
                const positions = [
                  "absolute -top-3",
                  "absolute top-1/4 -right-10",
                  "absolute bottom-1/4 -right-12",
                  "absolute -bottom-3",
                  "absolute bottom-1/4 -left-10",
                  "absolute top-1/4 -left-8",
                ];
                return (
                  <span key={skill.name} className={`${positions[i]} text-[10px] font-medium text-slate-500`}>{skill.name}</span>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                {data && data.strengths.length > 0 && data.gaps.length > 0 ? (
                  <>
                    Your foundations in <span className="text-emerald-600 font-medium">{data.strengths[0]}</span> and <span className="text-indigo-600 font-medium">{data.strengths[1] || data.strengths[0]}</span> are strong. Prioritize <span className="text-violet-600 font-medium">{data.gaps[0]}</span>.
                  </>
                ) : "Analyzing your skill profile..."}
              </p>
            </div>
          </div>
        </section>

        {/* Recommended Next Steps */}
        <section>
          <h4 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Recommended Next Steps
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(data?.gaps.slice(0, 3) || []).map((gap, i) => {
              const configs = [
                { priority: "High", time: "12h", color: "red", desc: "Bridge your largest gap by focusing on this critical skill." },
                { priority: "Medium", time: "8h", color: "cyan", desc: "Deepen your understanding to strengthen your competitive edge." },
                { priority: "Core", time: "4h", color: "violet", desc: "Build complementary knowledge to round out your skillset." },
              ];
              const cfg = configs[i % 3];
              return (
                <div key={gap} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-sm hover:border-slate-300 transition-all flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full
                      ${cfg.color === "red" ? "bg-red-50 text-red-600" :
                        cfg.color === "cyan" ? "bg-cyan-50 text-cyan-600" :
                        "bg-violet-50 text-violet-600"}`}>
                      Priority: {cfg.priority}
                    </span>
                    <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {cfg.time}
                    </span>
                  </div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-1.5">Mastering {gap}</h5>
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed flex-1">{cfg.desc}</p>
                  <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5">
                    Start Learning <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
