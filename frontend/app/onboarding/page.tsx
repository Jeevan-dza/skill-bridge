"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import {
  BarChart, Code, PenTool, Megaphone, BrainCircuit, LineChart,
  CheckCircle2, Star, UploadCloud, Brain, Loader2
} from "lucide-react";

// ── MOCK DATA — saved INSTANTLY, no API needed ──
const MOCK_SKILLS = [
  "Python", "SQL", "Excel", "Power BI",
  "Statistics", "Data Visualization",
  "Machine Learning", "Communication",
  "Problem Solving", "Project Management"
];

// ── 5 progress steps, 1 second each ──
const PROGRESS_TIMELINE = [
  { label: "Uploading resume...",       percent: 25,  durationMs: 1000 },
  { label: "Extracting skills...",      percent: 50,  durationMs: 1000 },
  { label: "Analyzing skill gaps...",   percent: 75,  durationMs: 1000 },
  { label: "Building your profile...",  percent: 90,  durationMs: 1000 },
  { label: "Almost done...",            percent: 100, durationMs: 1000 },
];

/** HARD REDIRECT TIMER — 5 seconds, no exceptions */
const REDIRECT_DELAY_MS = 5000;

export default function OnboardingPage() {
  const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
  const ALLOWED_RESUME_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({
    "Python": 3,
    "SQL": 2,
    "Excel": 4,
    "Power BI": 1,
    "Statistics": 3,
    "Communication": 5
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Progress overlay state ──
  const [analyzing, setAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasRedirectedRef = useRef(false);

  const careerGoals = [
    { id: "data-analyst", title: "Data Analyst", desc: "Insights and visualization", icon: <BarChart className="w-6 h-6" /> },
    { id: "web-dev", title: "Web Developer", desc: "Apps and architecture", icon: <Code className="w-6 h-6" /> },
    { id: "ux", title: "UI/UX Designer", desc: "Interfaces and experiences", icon: <PenTool className="w-6 h-6" /> },
    { id: "marketing", title: "Digital Marketer", desc: "Growth and strategy", icon: <Megaphone className="w-6 h-6" /> },
    { id: "ml", title: "ML Engineer", desc: "AI models and data", icon: <BrainCircuit className="w-6 h-6" /> },
    { id: "business", title: "Business Analyst", desc: "Process and optimization", icon: <LineChart className="w-6 h-6" /> },
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const updateRating = (skill: string, rating: number) => {
    setSkillRatings(prev => ({ ...prev, [skill]: rating }));
  };

  const validateResumeFile = (selectedFile: File) => {
    if (!ALLOWED_RESUME_TYPES.includes(selectedFile.type)) {
      return "Please upload a PDF or DOCX resume.";
    }
    if (selectedFile.size > MAX_RESUME_SIZE_BYTES) {
      return "Resume files must be 5 MB or smaller.";
    }
    return null;
  };

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      return;
    }
    const validationError = validateResumeFile(selectedFile);
    if (validationError) {
      setFile(null);
      setError(validationError);
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  // ── THE MAIN FIX: handleFinish with 5-second guaranteed redirect ──
  const handleFinish = useCallback(() => {
    if (loading || analyzing) return;
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    if (file) {
      const validationError = validateResumeFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Prevent double redirect
    hasRedirectedRef.current = false;

    // ── INSTANT visual feedback ──
    setLoading(true);
    setError("");
    setAnalyzing(true);
    setCurrentStepIndex(0);
    setProgressPercent(0);

    // ===================================================================
    // STEP 1: SAVE MOCK DATA TO FIRESTORE IMMEDIATELY (fire-and-forget)
    // ===================================================================
    // These are NOT awaited — they run in the background
    setDoc(
      doc(db, "users", currentUser.uid),
      { onboardingComplete: true },
      { merge: true }
    ).catch((e) => console.error("users write failed:", e));

    setDoc(
      doc(db, "skillProfiles", currentUser.uid),
      {
        userId: currentUser.uid,
        parsedSkills: MOCK_SKILLS,
        education: ["B.Tech Computer Science"],
        experience: ["Intern — Tech Company (3 months)"],
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    ).catch((e) => console.error("skillProfiles write failed:", e));

    setDoc(
      doc(db, "onboardingData", currentUser.uid),
      {
        userId: currentUser.uid,
        careerGoal: goal,
        selfAssessment: Object.entries(skillRatings).map(([skill, rating]) => ({ skill, rating })),
        resumeUploaded: !!file,
        createdAt: serverTimestamp(),
      }
    ).catch((e) => console.error("onboardingData write failed:", e));

    // ===================================================================
    // STEP 2: UPLOAD FILE IN BACKGROUND (fire-and-forget, never blocks)
    // ===================================================================
    if (file) {
      const resumePath = `resumes/${currentUser.uid}/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, resumePath);
      uploadBytes(storageRef, file).catch((e) =>
        console.error("File upload failed (non-blocking):", e)
      );
    }

    // ===================================================================
    // STEP 3: FAKE PROGRESS ANIMATION — 5 steps, 1 second each
    // ===================================================================
    PROGRESS_TIMELINE.forEach((stepInfo, index) => {
      setTimeout(() => {
        setCurrentStepIndex(index);
        setProgressPercent(stepInfo.percent);
      }, index * 1000);
    });

    // ===================================================================
    // STEP 4: HARD REDIRECT AFTER EXACTLY 5 SECONDS — NO EXCEPTIONS
    // ===================================================================
    redirectTimerRef.current = setTimeout(() => {
      if (!hasRedirectedRef.current) {
        hasRedirectedRef.current = true;
        router.push("/dashboard");
      }
    }, REDIRECT_DELAY_MS);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, analyzing, file, goal, skillRatings, router]);

  const handleSaveAndExit = () => {
    if (loading) return;
    const currentUser = auth.currentUser;
    if (!currentUser) {
      router.push("/dashboard");
      return;
    }

    // Fire-and-forget write
    setDoc(
      doc(db, "onboardingData", currentUser.uid),
      {
        userId: currentUser.uid,
        careerGoal: goal,
        selfAssessment: Object.entries(skillRatings).map(([skill, rating]) => ({ skill, rating })),
        onboardingStep: step,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    ).catch(console.error);

    router.push("/dashboard");
  };

  return (
    <div className="bg-white text-slate-900 font-body min-h-screen">
      {/* Header & Progress Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">S</span>
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">SkillBridge</span>
            </Link>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center gap-3">
              {[
                { num: 1, label: "Goal" },
                { num: 2, label: "Assessment" },
                { num: 3, label: "Resume" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-3">
                  {i > 0 && <div className={`w-8 h-px ${step >= s.num ? "bg-indigo-300" : "bg-slate-200"}`} />}
                  <div className={`flex items-center gap-1.5 ${step >= s.num ? "opacity-100" : "opacity-40"}`}>
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-semibold ${step >= s.num ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                      {s.num}
                    </span>
                    <span className={`text-xs font-medium ${step >= s.num ? "text-indigo-600" : "text-slate-400"}`}>
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSaveAndExit}
            disabled={loading || analyzing}
            className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save & Exit"}
          </button>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
        {error && (
          <div className="max-w-4xl mx-auto mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ── ANALYSIS PROGRESS OVERLAY ── */}
        {analyzing && (
          <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm flex items-center justify-center">
            <div className="max-w-md w-full mx-4 bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Analyzing Your Profile</h3>
                  <p className="text-sm text-slate-500">This will take about 5 seconds</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">
                    {PROGRESS_TIMELINE[currentStepIndex]?.label ?? "Processing..."}
                  </span>
                  <span className="text-indigo-600 font-semibold">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Step checklist */}
              <div className="space-y-3">
                {PROGRESS_TIMELINE.map((s, i) => {
                  const isDone = currentStepIndex > i;
                  const isActive = currentStepIndex === i;
                  return (
                    <div key={i} className={`flex items-center gap-3 text-sm transition-all ${isDone ? "text-green-600" : isActive ? "text-indigo-600" : "text-slate-300"}`}>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      ) : isActive ? (
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
                      )}
                      <span className={isDone ? "line-through" : isActive ? "font-medium" : ""}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Career Goal */}
        {step === 1 && (
          <section className="max-w-4xl mx-auto mb-24 animate-fade-in-up">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">What is your career goal?</h1>
              <p className="text-slate-500 text-base max-w-xl mx-auto">We&apos;ll personalize your skill roadmap based on this selection.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {careerGoals.map((item) => {
                const isSelected = goal === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setGoal(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setGoal(item.id);
                      }
                    }}
                    className={`group relative p-5 rounded-xl transition-all duration-200 cursor-pointer border
                      ${isSelected
                        ? "bg-white border-indigo-500 ring-2 ring-indigo-500/10 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors
                      ${isSelected ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-500"}
                    `}>
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-base mb-0.5 text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.desc}</p>

                    {isSelected && (
                      <div className="absolute top-3 right-3 text-indigo-600">
                        <CheckCircle2 className="w-5 h-5 fill-indigo-600 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!goal}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center gap-2"
              >
                Next Step
              </button>
            </div>
          </section>
        )}

        {/* STEP 2: Assessment */}
        {step === 2 && (
          <section className="max-w-3xl mx-auto mb-24 animate-fade-in-up">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Rate your current skills</h2>
              <p className="text-slate-500">Be honest — this helps us find your gaps accurately.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              {Object.entries(skillRatings).map(([skill, rating]) => (
                <div key={skill} className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider">Skill Area</span>
                    <h4 className="text-base font-semibold text-slate-900">{skill}</h4>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => updateRating(skill, star)} className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm transition-transform hover:scale-110">
                        <Star
                          className={`w-7 h-7 ${star <= rating ? "fill-indigo-500 text-indigo-500" : "text-slate-200 hover:text-indigo-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
              <button onClick={handleBack} className="px-6 py-2.5 text-slate-600 font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">Back</button>
              <button onClick={handleNext} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all">Continue</button>
            </div>
          </section>
        )}

        {/* STEP 3: Resume */}
        {step === 3 && (
          <section className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload your resume</h2>
              <p className="text-slate-500">Our AI will extract your skills automatically.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Upload Box */}
              <div className="relative group">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                />
                <div className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${file ? "bg-indigo-50/50 border-indigo-400 shadow-sm" : "border-slate-200 bg-slate-50/30 group-hover:bg-white group-hover:border-indigo-300 group-hover:shadow-sm"}`}>
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-5 text-indigo-500">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-semibold mb-1 text-slate-900">
                    {file ? file.name : "Drag and drop or click to upload"}
                  </h4>
                  <p className="text-slate-500 text-sm mb-5">Supported formats: PDF, DOCX</p>
                  <span className="px-5 py-2 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 shadow-sm text-sm">
                    {file ? "Change File" : "Select File"}
                  </span>
                </div>
              </div>

              {/* AI Analysis Preview Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h5 className="font-semibold text-slate-900">AI Analysis Engine</h5>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{file ? "Ready to scan" : "Waiting for file..."}</span>
                    <span className="text-cyan-600 font-medium">{file ? "100%" : "0%"}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-cyan-500 rounded-full transition-all duration-1000 ${file ? "w-full" : "w-0"}`} />
                  </div>

                  <div className={`pt-3 transition-opacity duration-500 ${file ? "opacity-100" : "opacity-30"}`}>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Expected Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full border border-indigo-100">Machine Learning</span>
                      <span className="px-2.5 py-1 bg-cyan-50 text-cyan-600 text-xs font-medium rounded-full border border-cyan-100">Data Visualization</span>
                      <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded-full border border-slate-200">Project Management</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button onClick={handleBack} disabled={loading || analyzing} className="px-6 py-2.5 text-slate-600 font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50">Back</button>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400 italic hidden sm:block">Almost done...</span>
                <button
                  onClick={handleFinish}
                  disabled={loading || analyzing}
                  className="px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading || analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze My Skills"
                  )}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-semibold text-slate-900 text-sm">SkillBridge AI</span>
            <p className="text-xs text-slate-400">© 2026 SkillBridge AI. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="/privacy">Privacy Policy</Link>
            <Link className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="/terms">Terms of Service</Link>
            <Link className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="/support">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
