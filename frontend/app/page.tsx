"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  Menu, X, ArrowRight, Play, Upload, BarChart2, Waypoints, Target, Route as RouteIcon,
  BrainCircuit, Gauge, ChevronRight, Activity, Award, Handshake as HandshakeIcon,
  Star, Sparkles, Layers
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

/* ─── Scroll-Aware Navbar Hook ─── */
function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function LandingPage() {
  const navHidden = useScrollDirection();
  const features = useInView();
  const howItWorks = useInView();
  const stats = useInView();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <div className="bg-white font-body text-slate-900 antialiased">
      {/* ═══════════ TOP NAVIGATION (Linear/Vercel style) ═══════════ */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80 transition-transform duration-300 ${
          navHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">SkillBridge</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="#features">Features</Link>
            <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="#how-it-works">How It Works</Link>
            <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="#platform">Platform</Link>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">
              Log in
            </Link>
            <Link
              href="/signup"
              className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
            <button 
              className="md:hidden p-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200/80 px-4 py-4 space-y-4 shadow-lg absolute w-full left-0 z-40">
            <div className="flex flex-col gap-4">
              <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="#platform" onClick={() => setMobileMenuOpen(false)}>Platform</Link>
              <div className="h-px bg-slate-200 w-full my-2" />
              <Link href="/login" className="text-sm font-medium text-indigo-600 transition-colors text-center w-full" onClick={() => setMobileMenuOpen(false)}>
                Log in
              </Link>
              <Link href="/signup" className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-center w-full shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ═══════════ HERO SECTION (Stripe quality) ═══════════ */}
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32" id="home">
          {/* Background decorations */}
          <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-indigo-50 to-transparent rounded-full opacity-80 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(238,242,255,0.8) 0%, transparent 70%)" }}
          />
          <div className="absolute top-20 right-[10%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left: Copy */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wider uppercase mb-6">
                AI-Powered Career Platform
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Bridge the Gap{" "}
                <br className="hidden sm:block" />
                Between Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Skills
                </span>{" "}
                <br className="hidden sm:block" />
                and Your Dream Job
              </h1>
              <p className="text-xl text-slate-500 max-w-xl leading-relaxed mb-10">
                Identify hidden skill gaps with our AI-driven engine and follow a personalized roadmap designed to land you the role you&apos;ve always wanted.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex -space-x-2">
                  {["Aisha Sharma", "Raj Kumar", "Elena Park", "Tomás Silva", "Maya Nguyen"].map((name) => (
                    <div key={name} className="ring-2 ring-white rounded-full">
                      <Avatar name={name} size="sm" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm font-semibold text-slate-700 ml-1">4.9</span>
                  </div>
                  <span className="text-xs text-slate-500">Trusted by 10,000+ students</span>
                </div>
              </div>
            </div>

            {/* Right: Floating Dashboard Mockup */}
            <div className="relative flex items-center justify-center">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-indigo-400/20 blur-3xl rounded-full scale-75 pointer-events-none" />

              {/* Dashboard Card */}
              <div className="animate-float relative bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden w-full max-w-lg">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 text-[10px] font-medium text-slate-400">SkillBridge Dashboard</span>
                </div>

                {/* Mini Dashboard UI */}
                <div className="p-5 space-y-4">
                  {/* Stat Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <p className="text-[9px] font-semibold text-indigo-600 uppercase tracking-wider">Readiness</p>
                      <p className="text-xl font-bold text-slate-900">72%</p>
                    </div>
                    <div className="bg-violet-50 rounded-lg p-3">
                      <p className="text-[9px] font-semibold text-violet-600 uppercase tracking-wider">Skills</p>
                      <p className="text-xl font-bold text-slate-900">15</p>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-3">
                      <p className="text-[9px] font-semibold text-cyan-600 uppercase tracking-wider">Matches</p>
                      <p className="text-xl font-bold text-slate-900">12</p>
                    </div>
                  </div>

                  {/* Mini Radar */}
                  <div className="bg-slate-50 rounded-lg p-4 flex items-center gap-4">
                    <div className="relative w-20 h-20 shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="url(#heroGrad)" strokeWidth="8" strokeDasharray="251.3" strokeDashoffset="70.4" strokeLinecap="round" />
                        <defs>
                          <linearGradient id="heroGrad" x1="0%" x2="100%">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-900">72%</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500">Python</span>
                        <span className="font-semibold text-slate-700">75%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: "75%" }} />
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500">SQL</span>
                        <span className="font-semibold text-slate-700">92%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Skill Badges */}
              <div className="absolute -top-2 -left-4 bg-white border border-slate-200 rounded-full px-3 py-1 text-sm font-medium shadow-sm animate-float-slow">
                Python
              </div>
              <div className="absolute top-12 -right-6 bg-white border border-slate-200 rounded-full px-3 py-1 text-sm font-medium shadow-sm animate-float-slow-delayed">
                SQL
              </div>
              <div className="absolute -bottom-2 -left-2 bg-white border border-slate-200 rounded-full px-3 py-1 text-sm font-medium shadow-sm animate-float-slow-delayed-2">
                Power BI
              </div>
              <div className="absolute bottom-16 -right-8 bg-white border border-slate-200 rounded-full px-3 py-1 text-sm font-medium shadow-sm animate-float-slow">
                Data Analysis
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FEATURES SECTION (Notion style) ═══════════ */}
        <section className="py-24" id="features" ref={features.ref}>
          <div className={`max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${features.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Everything You Need
              </span>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Intelligence at Every Step</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                A comprehensive ecosystem that handles the complexity of career planning so you can focus on learning.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
              {/* Featured Card — spans 2 cols */}
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Skill Analysis</h3>
                    <p className="text-slate-500 leading-relaxed max-w-md">
                      Our deep neural networks analyze industry trends in real-time to tell you which skills are trending up and which are fading out.
                    </p>
                  </div>
                  {/* Abstract gradient visual instead of AI image */}
                  <div className="mt-8 h-32 rounded-xl bg-gradient-to-br from-indigo-50 via-violet-50 to-cyan-50 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 grid-pattern opacity-60" />
                    <div className="flex gap-3 z-10">
                      {["Trending ↑", "In Demand", "Growing Fast"].map((label) => (
                        <span key={label} className="px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-full text-xs font-medium text-indigo-600 shadow-sm">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center text-violet-600 mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Personalized Roadmap</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Dynamic learning paths that adapt to your pace and existing knowledge base.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 mb-4">
                  <Gauge className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Readiness Score</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Get a real-time percentage of how prepared you are for a specific job title.</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                  <HandshakeIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Job Matching</h3>
                <p className="text-slate-500 text-sm leading-relaxed">We find &quot;Best Fit&quot; roles where you&apos;ll thrive from Day 1.</p>
              </div>

              {/* Card 5 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Progress Tracking</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Visual dashboards showing your journey from novice to industry expert.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ HOW IT WORKS (Loom style) ═══════════ */}
        <section className="py-24 bg-slate-50/50" id="how-it-works" ref={howItWorks.ref}>
          <div className={`max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${howItWorks.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-20">
              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Simple Process
              </span>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">How SkillBridge Empowers You</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Three simple steps to transition from where you are to where you want to be.</p>
            </div>

            <div className="space-y-20">
              {/* Step 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <span className="text-8xl font-black text-indigo-50 absolute -top-8 -left-4 select-none">01</span>
                  <div className="relative z-10 pt-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                      <Upload className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Upload Your Resume</h3>
                    <p className="text-slate-500 leading-relaxed max-w-md">
                      Simply drop your CV. Our AI parses your history, extracting expertise and identifying core competencies instantly.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 flex flex-col items-center text-center bg-indigo-50/30">
                    <Upload className="w-10 h-10 text-indigo-400 mb-3" />
                    <p className="text-sm font-medium text-slate-700">Drag & drop your resume</p>
                    <p className="text-xs text-slate-400 mt-1">PDF, DOCX supported</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Python", current: 75, required: 90 },
                      { name: "SQL", current: 92, required: 85 },
                      { name: "Tableau", current: 20, required: 80 },
                    ].map((skill) => (
                      <div key={skill.name} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-slate-600 w-16">{skill.name}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden relative">
                          <div className="absolute inset-y-0 left-0 bg-indigo-100 rounded-full" style={{ width: `${skill.required}%` }} />
                          <div className={`absolute inset-y-0 left-0 rounded-full ${skill.current >= skill.required ? "bg-emerald-500" : "bg-indigo-500"}`} style={{ width: `${skill.current}%` }} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 w-12 text-right">{skill.current}/{skill.required}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative">
                  <span className="text-8xl font-black text-indigo-50 absolute -top-8 -left-4 select-none">02</span>
                  <div className="relative z-10 pt-6">
                    <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 mb-6">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Get Skill Gap Analysis</h3>
                    <p className="text-slate-500 leading-relaxed max-w-md">
                      Compare your profile against thousands of real-world job descriptions to find exactly what you&apos;re missing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <span className="text-8xl font-black text-indigo-50 absolute -top-8 -left-4 select-none">03</span>
                  <div className="relative z-10 pt-6">
                    <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 mb-6">
                      <Waypoints className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Follow Your Learning Path</h3>
                    <p className="text-slate-500 leading-relaxed max-w-md">
                      Receive a curated curriculum of courses, projects, and mentorship opportunities to bridge those gaps effectively.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: "SQL Basics", status: "done" },
                      { title: "Power BI Fundamentals", status: "active" },
                      { title: "Statistics for Data", status: "locked" },
                    ].map((m) => (
                      <div key={m.title} className={`flex items-center gap-3 p-3 rounded-lg ${m.status === "active" ? "bg-indigo-50 border border-indigo-200" : m.status === "done" ? "bg-emerald-50" : "bg-slate-50 opacity-60"}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${m.status === "done" ? "bg-emerald-500" : m.status === "active" ? "bg-indigo-500" : "bg-slate-300"}`}>
                          {m.status === "done" ? "✓" : m.status === "active" ? "▶" : "🔒"}
                        </div>
                        <span className={`text-sm font-medium ${m.status === "locked" ? "text-slate-400" : "text-slate-700"}`}>{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ PLATFORM STATS & CTA ═══════════ */}
        <section className="py-24" id="platform" ref={stats.ref}>
          <div className={`max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${stats.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {/* Stat 1 */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-indigo-100">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-bold text-indigo-600 mb-2">10,000+</h3>
                <p className="text-slate-500 font-medium">Skills Mapped</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-indigo-100">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <RouteIcon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-bold text-indigo-600 mb-2">500+</h3>
                <p className="text-slate-500 font-medium">Career Paths</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-indigo-100">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-bold text-indigo-600 mb-2">95%</h3>
                <p className="text-slate-500 font-medium">Job Match Accuracy</p>
              </div>

              {/* Stat 4 */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-indigo-100">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-bold text-indigo-600 mb-2">4.9/5</h3>
                <p className="text-slate-500 font-medium">Average Rating</p>
              </div>
            </div>

            {/* Simple CTA Strip */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:shadow-md">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Start your career journey today</h3>
                <p className="text-slate-500 text-lg">Join thousands of students bridging their skill gaps</p>
              </div>
              <Link
                href="/signup"
                className="shrink-0 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ CTA SECTION ═══════════ */}
        <section className="py-24">
          <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-12 md:p-16 rounded-3xl relative overflow-hidden text-center shadow-2xl shadow-indigo-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <Sparkles className="w-10 h-10 text-indigo-200 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-white mb-4">Ready to Bridge Your Gap?</h2>
                <p className="text-indigo-100 text-lg mb-10 max-w-lg mx-auto">
                  Join 10,000+ professionals using SkillBridge to unlock their career potential.
                </p>
                <Link
                  href="/signup"
                  className="px-10 py-4 inline-flex bg-white text-indigo-600 rounded-xl font-semibold text-lg shadow-lg hover:bg-indigo-50 transition-all active:scale-95"
                >
                  Start My Free Analysis
                </Link>
                <p className="mt-6 text-sm text-indigo-200">No credit card required • 14-day premium trial</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-white w-full py-12 border-t border-slate-200">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-md flex items-center justify-center">
                <span className="text-white font-black text-[10px]">S</span>
              </div>
              <span className="font-bold text-slate-900">SkillBridge</span>
            </Link>
            <p className="text-xs text-slate-500 max-w-xs text-center md:text-left">
              Revolutionizing professional growth through ethical AI and human-centric career guidance.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/support" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Contact Support</Link>
          </div>
          <div className="text-xs text-slate-400">© 2026 SkillBridge AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
