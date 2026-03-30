"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, Clock, TrendingUp, CheckCircle2, Lock, BookOpen, FileText, Code2, RefreshCw, AlertCircle } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { generateLearningPath, updateProgress, type LearningModule as APIModule } from "@/lib/api";
import { ModuleSkeleton, CardSkeleton } from "@/components/ui/Skeleton";
import { toast } from "@/components/ui/Toast";
import React from "react";

interface PageData {
  targetRole: string;
  modules: APIModule[];
  overallProgress: number;
}

export default function LearningPathPage() {
  const router = useRouter();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleReviewContent = useCallback((moduleIndex: number) => router.push(`/learning-path/module/${moduleIndex}/review`), [router]);
  const handleContinueLearning = useCallback((moduleIndex: number) => router.push(`/learning-path/module/${moduleIndex}`), [router]);
  const handleViewAllResources = useCallback(() => router.push("/learning-paths"), [router]);
  const handleMessageMarcus = useCallback(() => router.push("/messages/marcus"), [router]);

  const fetchData = useCallback(async (user: User) => {
    setLoading(true);
    setError("");

    try {
      const onboardDoc = await getDoc(doc(db, "onboardingData", user.uid));
      const onboardData = onboardDoc.exists() ? onboardDoc.data() : {};

      const skillDoc = await getDoc(doc(db, "skillProfiles", user.uid));
      const skillData = skillDoc.exists() ? skillDoc.data() : {};

      const targetRole = skillData.targetRole || onboardData.careerGoal || "Data Analyst";
      const gaps = skillData.gaps || ["Advanced SQL", "Data Visualization", "Predictive Modeling"];

      let modules: APIModule[];

      try {
        const result = await generateLearningPath(user.uid, gaps, targetRole);
        modules = result.modules;
      } catch {
        const pathDoc = await getDoc(doc(db, "learningPaths", user.uid));
        if (pathDoc.exists() && pathDoc.data().modules) {
          modules = pathDoc.data().modules as APIModule[];
        } else {
          modules = [
            { title: "SQL Basics for Data Analysis", status: "Completed", progress: 100, duration: "4h 30m", resources: ["Video Tutorial", "Interactive Exercise", "Quiz"] },
            { title: "Excel Advanced: Modeling & Macros", status: "In Progress", progress: 60, duration: "6h", resources: ["Video Tutorial", "Practice Lab"] },
            { title: "Power BI Fundamentals", status: "Locked", progress: 0, duration: "8h", resources: ["Video Tutorial", "Dashboard Lab"] },
            { title: "Statistics for Data Science", status: "Locked", progress: 0, duration: "12h", resources: ["Interactive Exercise", "Quiz"] },
            { title: "Capstone: Retail Analytics Project", status: "Locked", progress: 0, duration: "20h", resources: ["Project Brief", "Dataset", "Rubric"] },
          ];
        }
      }

      const completed = modules.filter((m) => m.status === "Completed").length;
      const overallProgress = Math.round((completed / Math.max(modules.length, 1)) * 100);

      setData({ targetRole, modules, overallProgress });
    } catch (err) {
      console.error("Learning path fetch error:", err);
      setError("Failed to load learning path.");
      setData({
        targetRole: "Data Analyst",
        overallProgress: 40,
        modules: [
          { title: "SQL Basics for Data Analysis", status: "Completed", progress: 100, duration: "4h 30m", resources: [] },
          { title: "Excel Advanced: Modeling & Macros", status: "In Progress", progress: 60, duration: "6h", resources: [] },
          { title: "Power BI Fundamentals", status: "Locked", progress: 0, duration: "8h", resources: [] },
          { title: "Statistics for Data Science", status: "Locked", progress: 0, duration: "12h", resources: [] },
          { title: "Capstone: Retail Analytics Project", status: "Locked", progress: 0, duration: "20h", resources: [] },
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
          overallProgress: 40,
          modules: [
            { title: "SQL Basics for Data Analysis", status: "Completed", progress: 100, duration: "4h 30m", resources: [] },
            { title: "Excel Advanced: Modeling & Macros", status: "In Progress", progress: 60, duration: "6h", resources: [] },
            { title: "Power BI Fundamentals", status: "Locked", progress: 0, duration: "8h", resources: [] },
            { title: "Statistics for Data Science", status: "Locked", progress: 0, duration: "12h", resources: [] },
            { title: "Capstone: Retail Analytics Project", status: "Locked", progress: 0, duration: "20h", resources: [] },
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

  const handleCompleteModule = useCallback(async (moduleTitle: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await updateProgress(user.uid, moduleTitle, 100);
      toast("Module marked as complete!", "success");
      fetchData(user);
    } catch {
      toast("Failed to update progress", "error");
    }
  }, [fetchData]);

  const overallProgress = data?.overallProgress || 0;
  const modules = data?.modules || [];

  const { activePhaseIdx, phases, formattedEstDate } = useMemo(() => {
    const completedModules = modules.filter((m) => m.status === "Completed").length;
    const phaseNames = ["Foundation", "Core Skills", "Advanced Tools", "Projects", "Job Ready"];
    const idx = Math.min(completedModules, phaseNames.length - 1);

    const parseHours = (str: string) => {
      const match = str.match(/(\d+)h/);
      return match ? parseInt(match[1]) : 0;
    };
    const tHours = modules.reduce((acc, m) => acc + parseHours(m.duration || ""), 0);
    const dToComplete = Math.max(Math.ceil(tHours / 2), 1);
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + dToComplete);
    
    return {
      activePhaseIdx: idx,
      phases: phaseNames,
      formattedEstDate: tHours > 0 ? estDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD"
    };
  }, [modules]);

  return (
    <>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your Learning Path</h2>
            <p className="text-sm text-slate-500 font-medium">{loading ? "Loading..." : `${data?.targetRole} Roadmap`}</p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <button onClick={handleRetry} className="p-2 bg-slate-50 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors" aria-label="Refresh data">
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-500">
                <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                Est. Completion: {formattedEstDate}
              </div>
            </div>
            <div className="w-full md:w-56 space-y-1.5">
              <div className="flex justify-between items-center px-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">Path Progress</span>
                <span className="text-xs font-semibold text-slate-700">{overallProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${overallProgress}%` }} />
              </div>
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

        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1 space-y-8 min-w-0">
            {/* Progress Timeline */}
            <section className="relative bg-white p-6 rounded-xl border border-slate-200 overflow-x-auto">
              <div className="absolute top-1/2 left-10 right-10 h-px dotted-progress-line -translate-y-[12px] z-0 min-w-[500px]" />

              <div className="relative z-10 flex justify-between items-start min-w-[500px]">
                {phases.map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-2.5 w-20">
                    {i < activePhaseIdx ? (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : i === activePhaseIdx ? (
                      <div className="w-8 h-8 rounded-full bg-white border-[3px] border-indigo-500 flex items-center justify-center ring-4 ring-indigo-500/10">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 border-[3px] border-slate-200" />
                    )}
                    <span className={`text-[10px] font-semibold text-center ${
                      i < activePhaseIdx ? "text-slate-700" :
                      i === activePhaseIdx ? "text-indigo-600" : "text-slate-400"
                    }`}>{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum Modules */}
            <section className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-0.5">Curriculum Modules</h3>

              {loading ? (
                <>
                  <ModuleSkeleton />
                  <ModuleSkeleton />
                  <ModuleSkeleton />
                </>
              ) : (
                modules.map((mod, idx) => {
                  const isCompleted = mod.status === "Completed";
                  const isActive = mod.status === "In Progress";
                  const isLocked = !isCompleted && !isActive;
                  const phaseLabels = ["Foundation", "Core Skills", "Advanced Tools", "Advanced Tools", "Projects"];

                  if (isCompleted) {
                    return (
                      <div key={mod.title} className="group flex bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all flex-col md:flex-row">
                        <div className="h-1.5 md:h-auto md:w-1.5 bg-indigo-500 shrink-0" />
                        <div className="flex-1 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                          <div className="space-y-1.5 max-w-lg">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider">Module {String(idx + 1).padStart(2, '0')}</span>
                              <span className="bg-indigo-50 text-indigo-600 text-[9px] font-medium px-2 py-0.5 rounded">{phaseLabels[idx] || "Module"}</span>
                            </div>
                            <h4 className="text-base font-semibold text-slate-900">{mod.title}</h4>
                            <div className="flex items-center gap-4 pt-1">
                              <div className="flex items-center gap-1 text-[11px] text-slate-400"><Clock className="w-3 h-3" /> {mod.duration}</div>
                              <div className="flex items-center gap-1 text-[11px] text-slate-400"><TrendingUp className="w-3 h-3" /> Beginner</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                              <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                              <span className="text-xs font-medium">Completed</span>
                            </div>
                            <button type="button" onClick={() => handleReviewContent(idx + 1)} className="text-xs font-medium text-indigo-600 hover:underline">Review Content</button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (isActive) {
                    return (
                      <div key={mod.title} className="group flex bg-white rounded-xl overflow-hidden border border-indigo-200 transition-all flex-col md:flex-row">
                        <div className="h-1.5 md:h-auto md:w-1.5 bg-violet-500 shrink-0" />
                        <div className="flex-1 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                          <div className="space-y-1.5 max-w-lg w-full">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[10px] font-semibold text-violet-500 uppercase tracking-wider">Module {String(idx + 1).padStart(2, '0')}</span>
                              <span className="bg-violet-50 text-violet-600 text-[9px] font-medium px-2 py-0.5 rounded">{phaseLabels[idx] || "Module"}</span>
                            </div>
                            <h4 className="text-base font-semibold text-slate-900">{mod.title}</h4>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3">
                              <div className="h-full bg-violet-500 rounded-full" style={{ width: `${mod.progress}%` }} />
                            </div>
                            <div className="flex justify-between text-[10px] font-medium text-violet-600">
                              <span>Progress</span>
                              <span>{mod.progress}% Complete</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                            <button type="button" onClick={() => handleContinueLearning(idx + 1)} className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors">
                              Continue Learning
                            </button>
                            <button type="button" onClick={() => handleCompleteModule(mod.title)} className="text-xs font-medium text-emerald-600 hover:underline">
                              Mark Complete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Locked
                  return (
                    <div key={mod.title} className="group flex bg-slate-50/50 rounded-xl overflow-hidden border border-slate-200 opacity-60 flex-col md:flex-row">
                      <div className="h-1.5 md:h-auto md:w-1.5 bg-slate-300 shrink-0" />
                      <div className="flex-1 p-5 flex items-start md:items-center justify-between gap-5">
                        <div className="space-y-1.5 max-w-lg">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Module {String(idx + 1).padStart(2, '0')}</span>
                            <span className="bg-slate-100 text-slate-400 text-[9px] font-medium px-2 py-0.5 rounded">
                              {phaseLabels[idx] || "Module"}
                            </span>
                          </div>
                          <h4 className="text-base font-semibold text-slate-500">{mod.title}</h4>
                          <p className="text-sm text-slate-400">Content unlocks once prerequisites are completed.</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                          <Lock className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full xl:w-[280px] shrink-0 space-y-6">
            {loading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                {/* Resources */}
                <section className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Resources</h3>
                    <button type="button" onClick={handleViewAllResources} className="text-[10px] font-medium text-indigo-600 hover:underline">View All</button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Data Storytelling: Presenting Like a Pro", type: "Video", time: "12 Min", icon: <BookOpen className="w-5 h-5" />, color: "bg-cyan-50 text-cyan-600" },
                      { title: "SQL Joins: A Visual Cheat Sheet", type: "Article", time: "5 Min Read", icon: <FileText className="w-5 h-5" />, color: "bg-violet-50 text-violet-600" },
                      { title: "Interactive Practice: SQL Subqueries", type: "Exercise", time: "20 Min", icon: <Code2 className="w-5 h-5" />, color: "bg-indigo-50 text-indigo-600" },
                    ].map((resource) => (
                      <button key={resource.title} type="button" className="w-full text-left flex gap-3 items-start group cursor-pointer">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${resource.color}`}>
                          {resource.icon}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-[11px] font-medium leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 text-slate-700">
                            {resource.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-[9px] font-medium text-slate-400">
                            <span className="text-indigo-500">{resource.type}</span> — {resource.time}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Role Mentor */}
                <section className="bg-gradient-to-br from-violet-50 to-indigo-50 p-5 rounded-xl border border-indigo-100">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-violet-600 mb-4">Role Mentor</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar name="Marcus Chen" size="md" showVerified />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Marcus Chen</p>
                      <p className="text-[10px] text-slate-500">Sr. Analyst @ Fintech Corp</p>
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500 italic mb-4">
                    &quot;The jump from Module 2 to 3 is where most students struggle. Focus on DAX syntax early!&quot;
                  </p>
                  <button type="button" onClick={handleMessageMarcus} className="w-full py-2 bg-white text-[10px] font-semibold text-violet-600 rounded-lg border border-violet-200 hover:bg-violet-600 hover:text-white transition-all">
                    Message Marcus
                  </button>
                </section>
              </>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
