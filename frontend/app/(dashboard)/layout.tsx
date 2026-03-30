"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  LayoutDashboard, BarChart2, Route, Gauge, User, LogOut, Menu, X, Sparkles
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

const navSections = [
  {
    label: "Overview",
    links: [
      { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    ],
  },
  {
    label: "Analysis",
    links: [
      { name: "Skill Gap", href: "/skill-gap", icon: <BarChart2 className="w-4 h-4" /> },
      { name: "Learning Path", href: "/learning-path", icon: <Route className="w-4 h-4" /> },
      { name: "Job Readiness", href: "/job-readiness", icon: <Gauge className="w-4 h-4" /> },
    ],
  },
  {
    label: "Account",
    links: [
      { name: "Profile", href: "/profile", icon: <User className="w-4 h-4" /> },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userRole, setUserRole] = useState("Member");

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!mounted) return;

      setUser(currentUser);
      if (!currentUser) {
        if (mounted) setUserRole("Member");
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const role = userDoc.exists() ? (userDoc.data().role as string | undefined) : undefined;
        if (mounted) setUserRole(role || "Member");
      } catch (error) {
        if (mounted) setUserRole("Member");
        console.error("Failed to load user role", error);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [router]);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userInitials = useMemo(() => {
    const source = user?.displayName || user?.email || "User";
    const parts = source.trim().split(/\s+/);
    const initials = parts.slice(0, 2).map((part) => part[0]).join("");
    return initials.toUpperCase();
  }, [user?.displayName, user?.email]);

  const handleLogout = useCallback(async () => {
    setLogoutError("");
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (!response.ok) throw new Error("Failed to clear session cookie.");
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      setLogoutError("Logout failed. Please try again.");
      console.error("Logout failed", error);
    }
  }, [router]);

  return (
    <div className="bg-white text-slate-900 antialiased min-h-screen flex">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        role="navigation"
        className={`h-screen w-[260px] fixed left-0 top-0 z-40 bg-slate-50 flex flex-col border-r border-slate-200 transform transition-transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-slate-200/60">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">S</span>
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight">SkillBridge</span>
          </Link>
          <button
            type="button"
            className="md:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-white shadow-sm border border-slate-200 text-indigo-600 font-medium"
                          : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="px-3 pb-4 space-y-3 border-t border-slate-200/60 pt-4">
          {/* Upgrade CTA */}
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-lg text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
            <Sparkles className="w-3.5 h-3.5" />
            Upgrade to Pro
          </button>

          {/* User Card */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/60 transition-colors">
            <Avatar name={displayName} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{displayName}</p>
              <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                {userRole}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-500 transition-all duration-200 rounded-lg hover:bg-red-50 text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
          {logoutError && <p className="text-xs text-red-500 px-3">{logoutError}</p>}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-[260px] flex-1 min-w-0 w-full p-6 md:p-8 min-h-screen flex flex-col bg-white">
        <div className="md:hidden mb-6">
          <button
            type="button"
            aria-label="Open sidebar"
            aria-expanded={isSidebarOpen}
            className="p-2.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        {children}

        {/* Footer */}
        <footer className="mt-auto pt-12 border-t border-slate-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-900 text-sm">SkillBridge AI</span>
              <span className="text-xs text-slate-400">© 2026</span>
            </div>
            <div className="flex gap-6">
              <Link className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="/privacy">Privacy</Link>
              <Link className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="/terms">Terms</Link>
              <Link className="text-xs text-slate-400 hover:text-slate-600 transition-colors" href="/support">Support</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
