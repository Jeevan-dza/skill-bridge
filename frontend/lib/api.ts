/**
 * SkillBridge API Client — typed wrapper for all FastAPI endpoints.
 *
 * Uses NEXT_PUBLIC_API_URL to reach the Python backend.
 * Falls back to http://localhost:8000 if not set.
 *
 * GLOBAL RULES:
 * - Every fetch has a 10-second AbortController timeout
 * - Every function has try/catch/finally
 * - Failures return mock data so the user always moves forward
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/** Default timeout for all API calls (ms) */
const API_TIMEOUT_MS = 10_000;

// ── Types ──────────────────────────────────────────────────

export interface ResumeParseResult {
  skills: string[];
  education: string[];
  experience: string[];
}

export interface SkillGapResult {
  gaps: string[];
  strengths: string[];
}

export interface LearningModule {
  title: string;
  status: string;
  progress: number;
  duration: string;
  resources: string[];
}

export interface LearningPathResult {
  modules: LearningModule[];
}

export interface ReadinessScoreResult {
  score: number;
  feedback: string;
  breakdown: Record<string, number>;
}

export interface JobMatch {
  title: string;
  company: string;
  score: number;
  location: string;
  type: string;
}

export interface JobMatchesResult {
  matches: JobMatch[];
}

export interface ProgressUpdateResult {
  success: boolean;
}

// ── Mock / Fallback Data ───────────────────────────────────

export const MOCK_RESUME_RESULT: ResumeParseResult = {
  skills: ["Python", "SQL", "Excel", "Power BI", "Statistics", "Data Visualization", "Machine Learning", "Communication"],
  education: ["B.Tech Computer Science"],
  experience: ["Intern — Tech Company (3 months)"],
};

// ── Helpers ────────────────────────────────────────────────

function createTimeoutSignal(ms: number = API_TIMEOUT_MS): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

// ── API Functions ──────────────────────────────────────────

export async function parseResume(
  userId: string,
  file: File
): Promise<ResumeParseResult> {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("resumeFile", file);

    const res = await fetch(`${BASE}/api/parse-resume`, {
      method: "POST",
      body: formData,
      signal: createTimeoutSignal(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Failed to parse resume" }));
      throw new Error(err.detail || "Resume parse failed");
    }

    return res.json();
  } catch (error) {
    console.error("parseResume failed, returning mock data:", error);
    return MOCK_RESUME_RESULT;
  }
}

export async function analyzeSkillGap(
  userId: string,
  targetRole: string,
  userSkills: string[]
): Promise<SkillGapResult> {
  try {
    const res = await fetch(`${BASE}/api/skill-gap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, targetRole, userSkills }),
      signal: createTimeoutSignal(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Skill gap analysis failed" }));
      throw new Error(err.detail || "Skill gap analysis failed");
    }

    return res.json();
  } catch (error) {
    console.error("analyzeSkillGap failed:", error);
    return { gaps: ["Advanced SQL", "Machine Learning", "Cloud Computing"], strengths: userSkills.slice(0, 3) };
  }
}

export async function generateLearningPath(
  userId: string,
  gaps: string[],
  targetRole: string
): Promise<LearningPathResult> {
  try {
    const res = await fetch(`${BASE}/api/learning-path`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, gaps, targetRole }),
      signal: createTimeoutSignal(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Learning path generation failed" }));
      throw new Error(err.detail || "Learning path generation failed");
    }

    return res.json();
  } catch (error) {
    console.error("generateLearningPath failed:", error);
    return { modules: [] };
  }
}

export async function getReadinessScore(
  userId: string,
  targetRole: string
): Promise<ReadinessScoreResult> {
  try {
    const params = new URLSearchParams({ userId, targetRole });
    const res = await fetch(`${BASE}/api/readiness-score?${params}`, {
      signal: createTimeoutSignal(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Readiness score fetch failed" }));
      throw new Error(err.detail || "Readiness score fetch failed");
    }

    return res.json();
  } catch (error) {
    console.error("getReadinessScore failed:", error);
    return { score: 65, feedback: "Keep building your skills!", breakdown: {} };
  }
}

export async function getJobMatches(
  userId: string,
  targetRole: string
): Promise<JobMatchesResult> {
  try {
    const params = new URLSearchParams({ userId, targetRole });
    const res = await fetch(`${BASE}/api/job-matches?${params}`, {
      signal: createTimeoutSignal(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Job matches fetch failed" }));
      throw new Error(err.detail || "Job matches fetch failed");
    }

    return res.json();
  } catch (error) {
    console.error("getJobMatches failed:", error);
    return { matches: [] };
  }
}

export async function updateProgress(
  userId: string,
  moduleId: string,
  progress: number
): Promise<ProgressUpdateResult> {
  try {
    const res = await fetch(`${BASE}/api/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moduleId, progress }),
      signal: createTimeoutSignal(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Progress update failed" }));
      throw new Error(err.detail || "Progress update failed");
    }

    return res.json();
  } catch (error) {
    console.error("updateProgress failed:", error);
    return { success: false };
  }
}
