import { BarChart2, Target, Map, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-white text-slate-900 antialiased overflow-hidden">
      {/* Left Half: Editorial Branding & Stats Showcase */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]">
        {/* Logo Top Left */}
        <div className="z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">SkillBridge</span>
          </div>
        </div>

        {/* Stats Showcase — replaces AI person illustration */}
        <div className="z-10 flex flex-col items-center justify-center space-y-8">
          {/* Floating Stat Cards */}
          <div className="relative w-full max-w-md">
            {/* Card 1 */}
            <div className="animate-float-slow bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg mb-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                <BarChart2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">10,000+</p>
                <p className="text-sm text-white/70">Skills Mapped</p>
              </div>
            </div>

            {/* Card 2 — offset right */}
            <div className="animate-float-slow-delayed bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg mb-4 ml-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-sm text-white/70">Job Match Rate</p>
              </div>
            </div>

            {/* Card 3 — offset left */}
            <div className="animate-float-slow-delayed-2 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg ml-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                <Map className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-white/70">Career Paths</p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight mb-3">
              Bridge the gap between where you are and where you want to be
            </h1>
            <p className="text-white/60 text-sm leading-relaxed">
              AI-powered career intelligence trusted by thousands of professionals
            </p>
          </div>
        </div>

        {/* Subtle Bottom Detail */}
        <div className="z-10 text-white/50 text-sm">
          © 2026 SkillBridge AI Platform
        </div>

        {/* Background Dot Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient blur blobs */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-violet-400/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Right Half: Authentication Form Outlet */}
      <section className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 md:p-12">
        {children}
      </section>
    </main>
  );
}
