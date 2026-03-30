"use client";

import { useEffect, useState, useId, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, AlertCircle } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getReadinessScore, type ReadinessScoreResult } from "@/lib/api";
import { CardSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import { toast } from "@/components/ui/Toast";

interface PageData {
  score: number;
  feedback: string;
  targetRole: string;
  breakdown: Record<string, number>;
}

export default function JobReadinessPage() {
  const router = useRouter();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const gradientId = useId();
  const titleId = useId();
  const descId = useId();
  const textId = useId();

  const fetchData = useCallback(async (user: User) => {
    setLoading(true);
    setError("");

    try {
      const onboardDoc = await getDoc(doc(db, "onboardingData", user.uid));
      const onboardData = onboardDoc.exists() ? onboardDoc.data() : {};

      const skillDoc = await getDoc(doc(db, "skillProfiles", user.uid));
      const skillData = skillDoc.exists() ? skillDoc.data() : {};

      const targetRole = skillData.targetRole || onboardData.careerGoal || "Data Analyst";

      let score = 72;
      let feedback = "";
      let breakdown: Record<string, number> = {};

      try {
        const result: ReadinessScoreResult = await getReadinessScore(user.uid, targetRole);
        score = result.score;
        feedback = result.feedback;
        breakdown = result.breakdown;
      } catch {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        score = userData.jobReadiness || 72;
        feedback = `Great progress! You're on track for ${targetRole}. Focus on closing remaining skill gaps.`;
        breakdown = { "Technical Skills": 75, "Soft Skills": 85, "Experience": 55, "Education": 80, "Projects": 60 };
      }

      setData({ score, feedback, targetRole, breakdown });
      setLastUpdated(new Date().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      }) + " • " + new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit",
      }));
    } catch (err) {
      console.error("Job readiness fetch error:", err);
      setError("Failed to load readiness data.");
      setData({
        score: 72,
        feedback: "Loading your personalized insights...",
        targetRole: "Data Analyst",
        breakdown: { "Technical Skills": 75, "Soft Skills": 85, "Experience": 55, "Education": 80, "Projects": 60 },
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
        setLastUpdated("Oct 24, 2024 • 09:12 AM");
        setData({
          score: 72,
          feedback: "Sign in to see your personalized insights.",
          targetRole: "Data Analyst",
          breakdown: { "Technical Skills": 75, "Soft Skills": 85, "Experience": 55, "Education": 80, "Projects": 60 },
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

  const score = data?.score || 72;
  const remaining = 100 - score;
  const scoreLabel = score >= 80 ? "Excellent" : score >= 60 ? "Good Progress" : score >= 40 ? "Developing" : "Getting Started";

  const breakdownRows = useMemo(() => {
    if (!data) return [];
    const weightMap: Record<string, number> = {
      "Technical Skills": 30,
      "Soft Skills": 25,
      "Experience": 20,
      "Education": 15,
      "Projects": 10
    };
    return Object.entries(data.breakdown).map(([name, val]) => {
      const weight = weightMap[name] || 10;
      const contribution = ((val / 100) * weight).toFixed(1);
      const statusColor = val >= 85 ? "emerald" : val >= 70 ? "blue" : val >= 50 ? "orange" : "red";
      const status = val >= 85 ? "MASTERED" : val >= 70 ? "ON TRACK" : val >= 50 ? "ATTENTION" : "CRITICAL";
      return { name, weight: `${weight}%`, score: `${val}/100`, contribution: `${contribution} pts`, status, statusColor };
    });
  }, [data]);

  return (
    <>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5">Job Readiness Score</h2>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full border border-indigo-100">
                {loading ? "Loading..." : `${data?.targetRole} Role`}
              </span>
              <span className="text-slate-400 text-xs font-medium">Targeting: Mid-Level FinTech</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleRetry} className="p-2.5 bg-slate-50 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors" aria-label="Refresh data">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <div className="text-left md:text-right">
              <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Last Updated</p>
              <p className="text-slate-900 font-medium text-sm">{lastUpdated}</p>
            </div>
          </div>
        </header>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={handleRetry} className="text-xs font-medium text-red-600 hover:underline">Retry</button>
          </div>
        )}

        {/* Hero Score Display */}
        {loading ? (
          <div className="mb-8"><ChartSkeleton /></div>
        ) : (
          <section className="bg-white rounded-xl p-10 border border-slate-200 mb-8 flex flex-col items-center">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <div aria-hidden="true" className="absolute inset-0 rounded-full opacity-10" style={{ background: 'conic-gradient(#ef4444 0% 40%, #f97316 40% 70%, #6366f1 70% 100%)' }} />
              <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                role="img"
                aria-labelledby={`${titleId} ${descId} ${textId}`}
              >
                <title id={titleId}>Job Readiness Score Gauge</title>
                <desc id={descId}>Your current readiness is</desc>
                <circle aria-hidden="true" className="text-slate-100" cx="112" cy="112" fill="transparent" r="100" stroke="currentColor" strokeWidth="14" />
                <circle aria-hidden="true" cx="112" cy="112" fill="transparent" r="100" stroke={`url(#${gradientId})`} strokeDasharray="628.3" strokeDashoffset={628.3 * (1 - score / 100)} strokeLinecap="round" strokeWidth="14" />
                <defs>
                  <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="40%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center z-10 flex flex-col items-center" aria-hidden="true">
                <span id={textId} className="block text-5xl font-bold text-slate-900 tracking-tight">{score}%</span>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-1">{scoreLabel}</span>
              </div>
            </div>

            {/* Milestone Bar */}
            <div className="w-full max-w-xl mt-10 relative px-4">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-red-500" style={{ width: "40%" }} />
                <div className="h-full bg-orange-500" style={{ width: "30%" }} />
                <div className="h-full bg-indigo-500" style={{ width: "30%" }} />
              </div>
              <div className="absolute top-[-8px]" style={{ left: `${score}%` }}>
                <div className="w-0.5 h-5 bg-slate-900" />
                <div className="absolute top-[-22px] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">YOU</div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-red-500">Beginner</p>
                  <p className="text-[9px] text-slate-400">0-40%</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-orange-500">Developing</p>
                  <p className="text-[9px] text-slate-400">40-70%</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-indigo-600">Job Ready</p>
                  <p className="text-[9px] text-slate-400">70-100%</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gaps vs Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              {/* Gaps */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">What&apos;s Holding You Back</h3>
                  <span className="text-[10px] font-semibold text-red-500 uppercase tracking-wider">3 Urgent Gaps</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-5 rounded-xl border-l-4 border-red-500 border border-slate-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">Advanced SQL Optimization</h4>
                        <p className="text-xs text-slate-500">Critical for Mid-Level Roles</p>
                      </div>
                      <span className="text-[10px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">-12% Impact</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: "35%" }} />
                      </div>
                      <span className="text-xs font-medium text-slate-500">35 / 80</span>
                    </div>
                    <button type="button" onClick={() => router.push("/learning-path")} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors">Fix This Gap</button>
                  </div>

                  <div className="bg-white p-5 rounded-xl border-l-4 border-orange-500 border border-slate-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">Python for Automation</h4>
                        <p className="text-xs text-slate-500">Core Technical Skill</p>
                      </div>
                      <span className="text-[10px] font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">-8% Impact</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: "55%" }} />
                      </div>
                      <span className="text-xs font-medium text-slate-500">55 / 75</span>
                    </div>
                    <button type="button" onClick={() => router.push("/learning-path")} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors">Fix This Gap</button>
                  </div>
                </div>
              </section>

              {/* Strengths */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">What You&apos;ve Nailed</h3>
                  <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">Top Strengths</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Tableau Visualizations", level: "Expert", contribution: "+15%" },
                    { name: "Statistical Modeling", level: "Advanced", contribution: "+12%" },
                    { name: "Stakeholder Reporting", level: "Skilled", contribution: "+10%" },
                  ].map((strength) => (
                    <div key={strength.name} className="bg-white p-5 rounded-xl border-l-4 border-emerald-500 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{strength.name}</h4>
                          <p className="text-xs text-emerald-600 font-medium">Proficiency: {strength.level}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-semibold text-emerald-600">{strength.contribution}</p>
                        <p className="text-[9px] text-slate-400">Contribution</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        {/* Score Breakdown Table */}
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-base font-semibold text-slate-900">Full Score Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3">Skill Category</th>
                  <th className="px-6 py-3">Weight</th>
                  <th className="px-6 py-3">Your Score</th>
                  <th className="px-6 py-3">Contribution</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {breakdownRows.map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-sm text-slate-900">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.weight}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.score}</td>
                    <td className={`px-6 py-4 text-sm font-semibold ${row.statusColor === "emerald" ? "text-emerald-600" : row.statusColor === "red" ? "text-red-500" : row.statusColor === "orange" ? "text-orange-600" : "text-slate-700"}`}>{row.contribution}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 text-[9px] font-semibold rounded-full
                        ${row.statusColor === "emerald" ? "bg-emerald-50 text-emerald-600" :
                          row.statusColor === "blue" ? "bg-blue-50 text-blue-600" :
                          row.statusColor === "orange" ? "bg-orange-50 text-orange-600" :
                          row.statusColor === "red" ? "bg-red-50 text-red-600" :
                          "bg-slate-100 text-slate-600"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-2xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-indigo-500/10">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2 tracking-tight">You are {remaining}% away from being Job Ready.</h3>
            <p className="text-indigo-100/80 text-sm">{data?.feedback || "Based on your progress, bridge this gap in 4 weeks with your personalized learning path."}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button type="button" onClick={() => router.push("/learning-path")} className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all active:scale-95 text-sm">Continue Learning Path</button>
            <button type="button" onClick={() => router.push("/dashboard")} className="px-6 py-3 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all active:scale-95 text-sm">View Job Matches</button>
          </div>
        </section>
      </div>
    </>
  );
}
